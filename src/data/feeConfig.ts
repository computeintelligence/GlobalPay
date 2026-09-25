import { FeeConfig } from '../types';

export const feeConfig: FeeConfig = {
  currency: 'ZAR', lastUpdated: '2026-09-24', vatRate: 0.15, minAmount: 10,
  vatOnGlobalpayFee: false, vatOnCryptoPartnerFee: false, payoutMode: 'split',
  notes: {
    vatOnGlobalpayFee: '[CONFIRM WITH ACCOUNTANT]', vatOnCryptoPartnerFee: '[CONFIRM]',
    payoutMode: 'split = no extra payout fee; transfer = add transferOut.fixed. [CONFIRM WITH PAYMENT PARTNER]',
    minAmount: '[CONFIRM minimum and maximum amounts]',
  },
  globalpay: {
    business: { eft: { pct: 0.5, min: 2, cap: 50 }, card: { pct: 0.75, min: 2, cap: 75 }, intlCard: { pct: 1, min: 2, cap: 100 } },
    personal: { localSend: { pct: 0.5, min: 2, cap: 25 }, intlSend: { pct: 1, min: 10, cap: 250 } },
    crypto: {
      buySell: { pct: 1, min: 3, cap: 250 }, stablecoin: { pct: 0.75, min: 3, cap: 150 },
      swap: { pct: 0.5, min: 3, cap: 100 }, sendOut: { pct: 0.5, min: 5, cap: 50 }, receive: { pct: 0, min: 0, cap: 0 },
    },
  },
  partner: {
    card: { pct: 2.9, min: 0, cap: 0, fixed: 1, fixedWaivedBelow: 10 }, eft: { pct: 2, min: 0, cap: 0, fixed: 0 },
    intlCard: { pct: 3.1, min: 0, cap: 0, fixed: 1, fixedWaivedBelow: 10, note: '[CONFIRM in provider dashboard]' },
    transferOut: { fixed: 3 },
    international: { defaultPct: 1.1, minFee: 0, conversionMarginPct: 0.5, routes: {} },
    crypto: { buySellPct: 0.6, stablecoinPct: 0.2, swapPct: 0.1, note: 'Lowest-volume-tier public rates. [CONFIRM partner terms]' },
  },
  fxRates: {
    source: 'free public daily reference rates with a static fallback table if the request fails', note: 'Indicative daily rates only',
    fallback: { ZAR: 1, USD: 0.055, EUR: 0.051, GBP: 0.043 },
  },
};

export const SUPPORTED_FIAT_CURRENCIES = ['ZAR', 'USD', 'EUR', 'GBP'] as const;
