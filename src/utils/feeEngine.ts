import { feeConfig } from '../data/feeConfig';
import { CryptoFeeMethod, FeeConfig, FeePaymentMethod, FeeResult, FeeRoute, FeeSource } from '../types';

const isPlaceholder = (value: unknown): value is string => typeof value === 'string' && value.includes('[CONFIRM');
const roundHalfUp = (value: number): number => Math.floor(value + 0.5);
const toCents = (amount: number): number => roundHalfUp(amount * 100);
const percentOf = (amountCents: number, percentage: number): number => roundHalfUp(amountCents * percentage / 100);
const clampFee = (amountCents: number, rule: { pct: number; min: number; cap: number }): number => {
  if (rule.pct === 0 && rule.cap === 0) return 0;
  const value = percentOf(amountCents, rule.pct);
  return Math.min(rule.cap ? toCents(rule.cap) : value, Math.max(value, toCents(rule.min)));
};

export const parseAmountToCents = (value: string): number | null => {
  if (!/^\d+(\.\d{1,2})?$/.test(value.trim())) return null;
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? toCents(amount) : null;
};

const invalidResult = (message: string): FeeResult => ({ status: 'invalid', message, estimated: true, currency: feeConfig.currency, amountCents: 0, lines: [] });
const unavailableResult = (message: string): FeeResult => ({ status: 'unavailable', message, estimated: true, currency: feeConfig.currency, amountCents: 0, lines: [] });
const validateAmount = (amountCents: number, config: FeeConfig): FeeResult | null => {
  if (!Number.isInteger(amountCents) || amountCents <= 0) return invalidResult('Enter a positive amount.');
  if (amountCents < toCents(config.minAmount)) return invalidResult(`Minimum amount is R${config.minAmount}`);
  return null;
};

const partnerRule = (method: FeePaymentMethod, config: FeeConfig) => method === 'eft' ? config.partner.eft : method === 'intlCard' ? config.partner.intlCard : config.partner.card;
const partnerMoneyFee = (amountCents: number, method: FeePaymentMethod, config: FeeConfig): number => {
  const rule = partnerRule(method, config);
  const fixed = rule.fixedWaivedBelow !== undefined && amountCents < toCents(rule.fixedWaivedBelow) ? 0 : toCents(rule.fixed ?? 0);
  return percentOf(amountCents, rule.pct) + fixed;
};

export const getPartnerFee = (route: FeeRoute, amountCents: number, method: FeePaymentMethod, config: FeeConfig = feeConfig): { cents: number; source: FeeSource } | FeeResult => {
  if (route === 'personal-international') {
    const configuredRoute = config.partner.international.routes[method];
    const percentage = configuredRoute?.pct ?? config.partner.international.defaultPct;
    if (isPlaceholder(percentage)) return unavailableResult('No international fee is configured for this payment method yet.');
    return { cents: Math.max(percentOf(amountCents, percentage), toCents(config.partner.international.minFee)), source: 'config' };
  }
  let cents = partnerMoneyFee(amountCents, method, config);
  if (route === 'personal-local' && config.payoutMode === 'transfer') cents += toCents(config.partner.transferOut.fixed);
  return { cents, source: 'config' };
};

const resultFromLines = (amountCents: number, lines: FeeResult['lines'], config: FeeConfig, extra: Partial<FeeResult> = {}): FeeResult => {
  const totalFeesCents = lines.reduce((sum, line) => sum + line.cents, 0);
  return { status: 'ready', estimated: true, currency: config.currency, amountCents, lines: [...lines, { label: 'Total fees', cents: totalFeesCents }], totalFeesCents, totalPercentage: amountCents ? totalFeesCents / amountCents * 100 : 0, recipientAmountCents: Math.max(0, amountCents - totalFeesCents), ...extra };
};

export const calculateFee = (route: FeeRoute, amountCents: number, method: FeePaymentMethod, config: FeeConfig = feeConfig): FeeResult => {
  const validation = validateAmount(amountCents, config);
  if (validation) return validation;
  if (route === 'personal-international' || route === 'personal-crypto') return unavailableResult('Choose a fee calculator route.');
  const partner = getPartnerFee(route, amountCents, method, config);
  if ('status' in partner) return partner;
  const partnerVat = roundHalfUp(partner.cents * config.vatRate);
  const rule = route === 'business' ? config.globalpay.business[method === 'eft' ? 'eft' : method === 'intlCard' ? 'intlCard' : 'card'] : config.globalpay.personal.localSend;
  const globalpay = clampFee(amountCents, rule);
  const lines = [{ label: 'Payment partner fee', cents: partner.cents }, { label: 'VAT on partner fee', cents: partnerVat }, { label: 'GlobalPay fee', cents: globalpay }];
  if (config.vatOnGlobalpayFee) lines.push({ label: 'VAT on GlobalPay fee', cents: roundHalfUp(globalpay * config.vatRate) });
  return resultFromLines(amountCents, lines, config);
};

export const calculateInternationalFee = (amountCents: number, fromCurrency: string, toCurrency: string, method: FeePaymentMethod, config: FeeConfig = feeConfig, referenceRate?: { rate: number; source: FeeSource }): FeeResult => {
  const validation = validateAmount(amountCents, config);
  if (validation) return validation;
  const partner = getPartnerFee('personal-international', amountCents, method, config);
  if ('status' in partner) return partner;
  const conversionMargin = percentOf(amountCents, config.partner.international.conversionMarginPct);
  const globalpay = clampFee(amountCents, config.globalpay.personal.intlSend);
  const fromRate = config.fxRates.fallback[fromCurrency];
  const toRate = config.fxRates.fallback[toCurrency];
  if (!fromRate || !toRate) return unavailableResult(`No live rate available for ${fromCurrency} → ${toCurrency} yet.`);
  const exchangeRate = referenceRate?.rate ?? toRate / fromRate;
  if (!Number.isFinite(exchangeRate) || exchangeRate <= 0) return unavailableResult(`No live rate available for ${fromCurrency} → ${toCurrency} yet.`);
  const result = resultFromLines(amountCents, [{ label: 'Payment partner fee', cents: partner.cents }, { label: 'Currency conversion margin', cents: conversionMargin }, { label: 'GlobalPay fee', cents: globalpay }], config, { exchangeRate, rateSource: referenceRate?.source ?? 'fallback', recipientCurrency: toCurrency });
  return { ...result, recipientAmountCents: roundHalfUp((result.recipientAmountCents ?? 0) * exchangeRate) };
};

export const calculateCryptoFee = (amountCents: number, method: CryptoFeeMethod, config: FeeConfig = feeConfig): FeeResult => {
  const validation = validateAmount(amountCents, config);
  if (validation) return validation;
  const rule = config.globalpay.crypto[method];
  const globalpay = clampFee(amountCents, rule);
  const partnerPct = method === 'buySell' ? config.partner.crypto.buySellPct : method === 'stablecoin' ? config.partner.crypto.stablecoinPct : method === 'swap' ? config.partner.crypto.swapPct : 0;
  const partner = percentOf(amountCents, partnerPct);
  const lines = method === 'sendOut' ? [{ label: 'Network fee', cents: 0 }, { label: 'GlobalPay fee', cents: globalpay }] : [{ label: 'Payment partner fee', cents: partner }, { label: 'GlobalPay fee', cents: globalpay }];
  if (method === 'receive') return resultFromLines(amountCents, [{ label: 'GlobalPay fee', cents: 0 }], config, { note: 'GlobalPay fee: R0. Network fees may apply.' });
  if (config.vatOnCryptoPartnerFee && partner) lines.splice(1, 0, { label: 'VAT on partner fee', cents: roundHalfUp(partner * config.vatRate) });
  return resultFromLines(amountCents, lines, config, { note: method === 'sendOut' ? 'Network fee: shown before you confirm' : 'Assumes you pay by bank transfer. Other payment methods may cost extra.' });
};

export const getReferenceExchangeRate = async (fromCurrency: string, toCurrency: string, config: FeeConfig = feeConfig): Promise<{ rate: number; source: FeeSource }> => {
  const fallbackFrom = config.fxRates.fallback[fromCurrency]; const fallbackTo = config.fxRates.fallback[toCurrency]; const fallbackRate = fallbackFrom && fallbackTo ? fallbackTo / fallbackFrom : 0;
  try { const response = await fetch(`https://api.frankfurter.app/latest?from=${encodeURIComponent(fromCurrency)}&to=${encodeURIComponent(toCurrency)}`); if (!response.ok) throw new Error('Reference rate request failed'); const data = await response.json() as { rates?: Record<string, number> }; const rate = data.rates?.[toCurrency]; if (!rate || !Number.isFinite(rate)) throw new Error('Reference rate was not returned'); return { rate, source: 'public-reference' }; } catch { return { rate: fallbackRate, source: 'fallback' }; }
};

export const formatZar = (cents: number): string => `R${(cents / 100).toFixed(2)}`;
