import React, { useEffect, useState } from 'react';
import { Calculator, CircleAlert } from 'lucide-react';
import { feeConfig, SUPPORTED_FIAT_CURRENCIES } from '../data/feeConfig';
import { calculateCryptoFee, calculateFee, calculateInternationalFee, formatZar, getReferenceExchangeRate, parseAmountToCents } from '../utils/feeEngine';
import { CryptoFeeMethod, FeePaymentMethod, FeeResult, FeeRoute } from '../types';

interface FeeCalculatorProps { route?: FeeRoute; compact?: boolean; }
type PersonalMode = 'local' | 'international' | 'crypto';

const methodLabels: Record<FeePaymentMethod, string> = { eft: 'Bank payment', card: 'Card', intlCard: 'International card' };
const cryptoLabels: Record<CryptoFeeMethod, string> = { buySell: 'Buy or sell crypto', stablecoin: 'Buy or sell stablecoins', swap: 'Swap crypto', sendOut: 'Send crypto', receive: 'Receive crypto' };
const inputClass = 'mt-2 w-full rounded-xl border border-[#E7EAF3] bg-[#F5F8FF] px-4 py-3 font-bold text-[#0B0F19] outline-none transition focus:border-[#2F6FF0] focus:ring-2 focus:ring-[#2F6FF0]/15 dark:border-slate-700 dark:bg-slate-900 dark:text-white';

const ResultPanel: React.FC<{ result: FeeResult; international?: boolean }> = ({ result, international }) => {
  if (result.status !== 'ready') return <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"><div className="flex gap-2 font-bold"><CircleAlert className="h-4 w-4 shrink-0" />Fees need attention</div><p className="mt-2">{result.message}</p></div>;
  return <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/70"><div className="flex items-center justify-between"><h3 className="font-black text-slate-900 dark:text-white">Estimated result</h3><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700">Estimated</span></div>{international && result.exchangeRate && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Estimated exchange rate: <b>1 source unit = {result.exchangeRate.toFixed(4)} destination units</b></p>}<dl className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">{result.lines.map((line) => <div key={line.label} className={`flex justify-between gap-4 ${line.label === 'Total fees' ? 'border-t border-slate-200 pt-2 dark:border-slate-700' : ''}`}><dt>{line.label}</dt><dd className="font-bold text-slate-900 dark:text-white">{formatZar(line.cents)}</dd></div>)}<div className="flex justify-between gap-4"><dt>Total as % of amount</dt><dd className="font-bold text-slate-900 dark:text-white">{(result.totalPercentage ?? 0).toFixed(2)}%</dd></div></dl>{result.recipientAmountCents !== undefined && <p className="mt-4 border-t border-slate-200 pt-3 text-sm font-bold text-slate-900 dark:border-slate-700 dark:text-white">Recipient receives: {result.recipientCurrency ?? result.currency} {international ? (result.recipientAmountCents / 100).toFixed(2) : formatZar(result.recipientAmountCents)}</p>}{result.note && <p className="mt-4 text-xs font-bold text-slate-600 dark:text-slate-300">{result.note}</p>}<p className="mt-3 text-xs text-slate-500">Rates last updated: {feeConfig.lastUpdated}</p><p className="mt-1 text-xs text-slate-500">Estimate only. Your final fee is confirmed before you pay.</p></div>;
};

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({ route = 'personal-local', compact = false }) => {
  const isBusiness = route === 'business';
    const [personalMode, setPersonalMode] = useState<PersonalMode>(route === 'personal-international' ? 'international' : route === 'personal-crypto' ? 'crypto' : 'local');
  const [amount, setAmount] = useState('1000');
  const [method, setMethod] = useState<FeePaymentMethod>('card');
  const [cryptoMethod, setCryptoMethod] = useState<CryptoFeeMethod>('buySell');
  const [fromCurrency, setFromCurrency] = useState('ZAR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState<FeeResult>(() => calculateFee(isBusiness ? 'business' : 'personal-local', 100000, 'card'));

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => {
      const amountCents = parseAmountToCents(amount);
      if (amountCents === null) { setResult({ status: 'invalid', message: 'Enter a positive amount.', estimated: true, currency: feeConfig.currency, amountCents: 0, lines: [] }); return; }
      if (!isBusiness && personalMode === 'crypto') { setResult(calculateCryptoFee(amountCents, cryptoMethod)); return; }
      if (!isBusiness && personalMode === 'international') { void getReferenceExchangeRate(fromCurrency, toCurrency).then((rate) => { if (!cancelled) setResult(calculateInternationalFee(amountCents, fromCurrency, toCurrency, method, feeConfig, rate)); }); return; }
      setResult(calculateFee(isBusiness ? 'business' : 'personal-local', amountCents, method));
    }, 250);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [amount, cryptoMethod, fromCurrency, isBusiness, method, personalMode, toCurrency]);

  const title = isBusiness ? 'Fee per sale' : personalMode === 'international' ? 'Send money abroad' : personalMode === 'crypto' ? 'Crypto fees' : 'Send money in South Africa';
  const tabClass = (active: boolean) => `rounded-xl px-3 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FF0] focus-visible:ring-offset-2 ${active ? 'bg-gradient-to-r from-[#2F6FF0] to-[#14B8A6] text-white' : 'bg-transparent text-slate-600 hover:text-[#2F6FF0] dark:text-slate-300'}`;
  return <section className={`fee-calculator-card rounded-[18px] border border-[#E7EAF3] bg-white p-5 shadow-[0_24px_60px_rgba(20,30,60,0.10)] dark:border-slate-800 dark:bg-[#07132B] ${compact ? '' : 'p-6 sm:p-8'}`}><div><div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2F6FF0] dark:text-cyan-400"><Calculator className="h-4 w-4" />Fee calculator</div><h2 className="mt-2 text-2xl font-black text-[#0B0F19] dark:text-white">{compact ? 'Know your fee before you pay.' : title}</h2>{!compact && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">All results are estimates. The final amount is confirmed before you pay.</p>}</div>{!isBusiness && <div className="mt-5 flex flex-wrap gap-2 rounded-2xl bg-[#F5F8FF] p-1" role="tablist" aria-label="Personal fee calculator type"><button className={tabClass(personalMode === 'local')} onClick={() => setPersonalMode('local')} role="tab" aria-selected={personalMode === 'local'}>Local</button><button className={tabClass(personalMode === 'international')} onClick={() => setPersonalMode('international')} role="tab" aria-selected={personalMode === 'international'}>International</button><button className={tabClass(personalMode === 'crypto')} onClick={() => setPersonalMode('crypto')} role="tab" aria-selected={personalMode === 'crypto'}>Crypto</button></div>}
    <div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Amount ({!isBusiness && personalMode === 'international' ? fromCurrency : 'ZAR'})<input aria-label={`Amount in ${!isBusiness && personalMode === 'international' ? fromCurrency : 'ZAR'}`} value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" type="text" className={inputClass} /></label>{(!isBusiness && personalMode === 'crypto') ? <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">Crypto action<select value={cryptoMethod} onChange={(event) => setCryptoMethod(event.target.value as CryptoFeeMethod)} className={inputClass}>{Object.entries(cryptoLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label> : <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">How you pay<select value={method} onChange={(event) => setMethod(event.target.value as FeePaymentMethod)} className={inputClass}>{(isBusiness ? ['eft', 'card', 'intlCard'] : ['eft', 'card']).map((value) => <option key={value} value={value}>{methodLabels[value as FeePaymentMethod]}</option>)}</select></label>}</div>
    {!isBusiness && personalMode === 'international' && <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-bold text-slate-700 dark:text-slate-200">From currency<select value={fromCurrency} onChange={(event) => setFromCurrency(event.target.value)} className={inputClass}>{SUPPORTED_FIAT_CURRENCIES.map((currency) => <option key={currency}>{currency}</option>)}</select></label><label className="block text-sm font-bold text-slate-700 dark:text-slate-200">To currency<select value={toCurrency} onChange={(event) => setToCurrency(event.target.value)} className={inputClass}>{SUPPORTED_FIAT_CURRENCIES.map((currency) => <option key={currency}>{currency}</option>)}</select></label></div>}
    {!isBusiness && personalMode === 'crypto' && <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">Crypto prices can go up and down. You can lose money. Crypto services depend on verification and availability. Crypto services are provided through registered third-party partners in line with applicable regulations.</p>}
    <ResultPanel result={result} international={!isBusiness && personalMode === 'international'} />
  </section>;
};
