export type PageId =
  | 'home'
  | 'personal'
  | 'business'
  | 'how-it-works'
  | 'pricing'
  | 'security'
  | 'faq'
  | 'get-started'
  | 'personal-signup'
  | 'business-signup'
  | 'personal-signin'
  | 'business-signin'
  | 'contact'
  | 'terms'
  | 'privacy'
  | 'aml-kyc';

export type CurrencyType = 'fiat' | 'crypto';

export interface CurrencyItem {
  code: string;
  name: string;
  symbol: string;
  type: CurrencyType;
  rateToUSD: number; // 1 unit in USD
  change24h: number; // percentage
  icon: string; // emoji or identifier
  network?: string;
  popular?: boolean;
}

export interface PaymentCorridor {
  id: string;
  fromCountry: string;
  fromCode: string;
  fromFlag: string;
  toCountry: string;
  toCode: string;
  toFlag: string;
  speed: string;
  feeSavedPercent: number;
  routeType: 'fiat-fiat' | 'fiat-crypto' | 'crypto-fiat';
}

export interface AppFeature {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  iconName: string;
  accentColor: string;
}

export interface ComparisonItem {
  metric: string;
  globalPay: string;
  globalPayHighlight?: boolean;
  traditionalBanks: string;
  standardApps: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'currencies' | 'app' | 'security' | 'fees';
}

export type FeeRoute = 'business' | 'personal-local' | 'personal-international' | 'personal-crypto';
export type FeePaymentMethod = 'card' | 'eft' | 'intlCard';
export type CryptoFeeMethod = 'buySell' | 'stablecoin' | 'swap' | 'sendOut' | 'receive';
export type FeeSource = 'config' | 'public-reference' | 'fallback';

export interface FeeRule { pct: number; min: number; cap: number; fixed?: number; fixedWaivedBelow?: number; note?: string; }

export interface FeeConfig {
  currency: string;
  vatRate: number;
  lastUpdated: string;
  minAmount: number;
  vatOnGlobalpayFee: boolean;
  vatOnCryptoPartnerFee: boolean;
  payoutMode: 'split' | 'transfer';
  notes: Record<string, string>;
  globalpay: {
    business: { eft: FeeRule; card: FeeRule; intlCard: FeeRule };
    personal: { localSend: FeeRule; intlSend: FeeRule };
    crypto: Record<CryptoFeeMethod, FeeRule>;
  };
  partner: {
    card: FeeRule;
    eft: FeeRule;
    intlCard: FeeRule;
    transferOut: { fixed: number };
    international: { defaultPct: number | string; minFee: number; conversionMarginPct: number; routes: Record<string, { pct: number | string }> };
    crypto: { buySellPct: number; stablecoinPct: number; swapPct: number; note: string };
  };
  fxRates: {
    source: string;
    note: string;
    fallback: Record<string, number>;
  };
}

export interface FeeLine {
  label: string;
  cents: number;
}

export interface FeeResult {
  status: 'ready' | 'unavailable' | 'invalid' | 'quote_required';
  message?: string;
  estimated: boolean;
  currency: string;
  amountCents: number;
  lines: FeeLine[];
  totalFeesCents?: number;
  totalPercentage?: number;
  recipientAmountCents?: number;
  recipientCurrency?: string;
  exchangeRate?: number;
  rateSource?: FeeSource;
  note?: string;
}

export interface SecurityBadge {
  title: string;
  description: string;
  icon: string;
}

export interface AccountTransaction {
  id: string;
  type: 'deposit' | 'send' | 'convert' | 'card_spend';
  title: string;
  amount: number;
  currency: string;
  counterparty: string;
  date: string;
  status: 'completed' | 'pending';
  note?: string;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  accountType: 'personal' | 'business';
  companyName?: string;
  tier: 'standard' | 'metal' | 'business';
  country: string;
  baseCurrency: string;
  phone: string;
  iban: string;
  accountNumber: string;
  routingNumber: string;
  balances: Record<string, number>;
  createdAt: string;
  isVerified: boolean;
  card: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    isFrozen: boolean;
    cardHolder: string;
    cardTier: 'virtual' | 'metal';
  };
  transactions: AccountTransaction[];
}
