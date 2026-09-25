import assert from 'node:assert/strict';
import test from 'node:test';
import { feeConfig } from '../data/feeConfig';
import { calculateCryptoFee, calculateFee, calculateInternationalFee, formatZar } from './feeEngine';

const amount = (value: number) => value * 100;
const total = (result: ReturnType<typeof calculateFee>) => formatZar(result.totalFeesCents ?? 0);

test('calculates business bank, card and international card fees', () => {
  assert.equal(total(calculateFee('business', amount(1000), 'eft')), 'R28.00');
  assert.equal(total(calculateFee('business', amount(1000), 'card')), 'R42.00');
  assert.equal(total(calculateFee('business', amount(1000), 'intlCard')), 'R46.80');
});

test('applies minimums, caps and card fixed fee waiver', () => {
  assert.equal(total(calculateFee('business', amount(100), 'eft')), 'R4.30');
  assert.equal(total(calculateFee('business', amount(20000), 'eft')), 'R510.00');
  assert.equal(total(calculateFee('business', amount(100), 'card')), 'R6.49');
});

test('supports split and transfer payout modes for personal local sends', () => {
  assert.equal(total(calculateFee('personal-local', amount(1000), 'eft')), 'R28.00');
  assert.equal(total(calculateFee('personal-local', amount(1000), 'eft', { ...feeConfig, payoutMode: 'transfer' })), 'R31.45');
});

test('calculates crypto partner and GlobalPay fees', () => {
  assert.equal(total(calculateCryptoFee(amount(1000), 'buySell')), 'R16.00');
  assert.equal(total(calculateCryptoFee(amount(1000), 'stablecoin')), 'R9.50');
  assert.equal(total(calculateCryptoFee(amount(1000), 'swap')), 'R6.00');
  assert.equal(total(calculateCryptoFee(amount(100), 'buySell')), 'R3.60');
  const send = calculateCryptoFee(amount(1000), 'sendOut');
  assert.equal(total(send), 'R5.00');
  assert.equal(send.note, 'Network fee: shown before you confirm');
});

test('enforces the configured minimum amount', () => {
  const result = calculateFee('business', amount(9), 'eft');
  assert.equal(result.status, 'invalid');
  assert.equal(result.message, 'Minimum amount is R10');
});

test('calculates an international fee breakdown from the reference rate', () => {
  const result = calculateInternationalFee(amount(1000), 'ZAR', 'USD', 'card', feeConfig, { rate: 0.055, source: 'public-reference' });
  assert.equal(result.status, 'ready');
  assert.deepEqual(result.lines.map((line) => line.label), ['Payment partner fee', 'Currency conversion margin', 'GlobalPay fee', 'Total fees']);
  assert.equal(total(result), 'R26.00');
  assert.equal(result.recipientCurrency, 'USD');
  assert.equal(result.recipientAmountCents, 5_357);
});

test('explains when an international currency pair has no rate', () => {
  const result = calculateInternationalFee(amount(1000), 'ZAR', 'JPY', 'card');
  assert.equal(result.status, 'unavailable');
  assert.equal(result.message, 'No live rate available for ZAR → JPY yet.');
});