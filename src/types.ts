export type PageId =
  | 'home'
  | 'features'
  | 'rates'
  | 'network'
  | 'pricing'
  | 'security'
  | 'faq'
  | 'get-started';

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
