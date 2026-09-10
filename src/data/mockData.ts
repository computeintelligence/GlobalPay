import { CurrencyItem, PaymentCorridor, AppFeature, ComparisonItem, FAQItem } from '../types';

export const SUPPORTED_CURRENCIES: CurrencyItem[] = [
  // Major Fiat
  { code: 'USD', name: 'US Dollar', symbol: '$', type: 'fiat', rateToUSD: 1.0, change24h: 0.0, icon: '🇺🇸', popular: true },
  { code: 'EUR', name: 'Euro', symbol: '€', type: 'fiat', rateToUSD: 1.09, change24h: +0.24, icon: '🇪🇺', popular: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', type: 'fiat', rateToUSD: 1.28, change24h: -0.12, icon: '🇬🇧', popular: true },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', type: 'fiat', rateToUSD: 0.0067, change24h: +0.35, icon: '🇯🇵', popular: true },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', type: 'fiat', rateToUSD: 0.74, change24h: +0.05, icon: '🇨🇦', popular: true },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', type: 'fiat', rateToUSD: 0.66, change24h: -0.18, icon: '🇦🇺', popular: true },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', type: 'fiat', rateToUSD: 1.13, change24h: +0.10, icon: '🇨🇭', popular: false },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', type: 'fiat', rateToUSD: 0.75, change24h: +0.15, icon: '🇸🇬', popular: true },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', type: 'fiat', rateToUSD: 0.272, change24h: 0.0, icon: '🇦🇪', popular: true },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', type: 'fiat', rateToUSD: 0.18, change24h: +0.82, icon: '🇧🇷', popular: false },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', type: 'fiat', rateToUSD: 0.012, change24h: -0.04, icon: '🇮🇳', popular: true },

  // Crypto Assets
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', type: 'crypto', rateToUSD: 68450.0, change24h: +3.42, icon: '🪙', network: 'Bitcoin', popular: true },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', type: 'crypto', rateToUSD: 3620.0, change24h: +2.18, icon: '⟠', network: 'Ethereum', popular: true },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', type: 'crypto', rateToUSD: 178.5, change24h: +5.64, icon: '◎', network: 'Solana', popular: true },
  { code: 'USDT', name: 'Tether USD', symbol: 'USDT', type: 'crypto', rateToUSD: 1.0, change24h: +0.02, icon: '₮', network: 'Multi-Chain', popular: true },
  { code: 'USDC', name: 'USD Coin', symbol: 'USDC', type: 'crypto', rateToUSD: 1.0, change24h: +0.01, icon: '💲', network: 'Multi-Chain', popular: true },
  { code: 'AVAX', name: 'Avalanche', symbol: 'AVAX', type: 'crypto', rateToUSD: 34.2, change24h: +1.95, icon: '🔺', network: 'Avalanche', popular: false },
  { code: 'BNB', name: 'BNB Chain', symbol: 'BNB', type: 'crypto', rateToUSD: 590.0, change24h: +0.87, icon: '🟡', network: 'BNB Chain', popular: false },
  { code: 'XRP', name: 'XRP', symbol: 'XRP', type: 'crypto', rateToUSD: 0.62, change24h: +4.10, icon: '✕', network: 'XRPL', popular: true },
];

export const PAYMENT_CORRIDORS: PaymentCorridor[] = [
  {
    id: 'c1',
    fromCountry: 'United States',
    fromCode: 'USD',
    fromFlag: '🇺🇸',
    toCountry: 'United Kingdom',
    toCode: 'GBP',
    toFlag: '🇬🇧',
    speed: '< 30 seconds',
    feeSavedPercent: 88,
    routeType: 'fiat-fiat',
  },
  {
    id: 'c2',
    fromCountry: 'Germany (Eurozone)',
    fromCode: 'EUR',
    fromFlag: '🇪🇺',
    toCountry: 'Japan',
    toCode: 'JPY',
    toFlag: '🇯🇵',
    speed: '< 45 seconds',
    feeSavedPercent: 82,
    routeType: 'fiat-fiat',
  },
  {
    id: 'c3',
    fromCountry: 'Global Wallet',
    fromCode: 'BTC',
    fromFlag: '🌐',
    toCountry: 'Singapore',
    toCode: 'SGD',
    toFlag: '🇸🇬',
    speed: 'Instant (Lightning)',
    feeSavedPercent: 94,
    routeType: 'crypto-fiat',
  },
  {
    id: 'c4',
    fromCountry: 'Canada',
    fromCode: 'CAD',
    fromFlag: '🇨🇦',
    toCountry: 'Brazil',
    toCode: 'USDC / BRL',
    toFlag: '🇧🇷',
    speed: '< 20 seconds',
    feeSavedPercent: 91,
    routeType: 'fiat-crypto',
  },
  {
    id: 'c5',
    fromCountry: 'Australia',
    fromCode: 'AUD',
    fromFlag: '🇦🇺',
    toCountry: 'United Arab Emirates',
    toCode: 'AED',
    toFlag: '🇦🇪',
    speed: '< 1 minute',
    feeSavedPercent: 85,
    routeType: 'fiat-fiat',
  },
];

export const APP_FEATURES: AppFeature[] = [
  {
    id: 'multi-currency',
    badge: '150+ Currencies',
    title: 'Hold & Spend Like a Local',
    tagline: 'Multi-Currency Global Accounts',
    description: 'Get dedicated local bank account details (IBAN, ACH, Sort Code, BSB) in minutes. Receive salary, payments, and client transfers with zero international receiving fees.',
    bullets: [
      'Instant conversion between 150+ world currencies at mid-market rates',
      'Dedicated local accounts in USD, EUR, GBP, AUD, and JPY',
      'Real-time transaction alerts and smart auto-conversion rules',
    ],
    iconName: 'Globe',
    accentColor: '#0066FF',
  },
  {
    id: 'crypto-exchange',
    badge: 'Sub-second Swaps',
    title: 'Seamless Crypto Meets Fiat',
    tagline: 'Regulated Hybrid Exchange Engine',
    description: 'Swap seamlessly between Bitcoin, Ethereum, Solana, and top stablecoins right from your phone. Deposit fiat, get crypto instantly, or off-ramp directly to your card.',
    bullets: [
      'Zero gas fee headaches with our optimized layer-2 routing',
      'Instant off-ramp: convert crypto to spendable fiat in 2 taps',
      'Institutional-grade cold storage custody backed by $250M insurance',
    ],
    iconName: 'Coins',
    accentColor: '#00D2B4',
  },
  {
    id: 'global-card',
    badge: 'Apple Pay & Google Pay',
    title: 'The GlobalPay Contactless Card',
    tagline: 'Spend Anywhere Visa Is Accepted',
    description: 'Create disposable virtual cards for secure online shopping or order a laser-etched metal card. Tap to pay worldwide with intelligent dynamic balance selection.',
    bullets: [
      'Auto-converts at the moment of payment with 0% foreign transaction markup',
      'Freeze, unfreeze, and set granular category limits in the app with one tap',
      'Earn up to 3% crypto cashback on international travel and dining',
    ],
    iconName: 'CreditCard',
    accentColor: '#10DF62',
  },
  {
    id: 'p2p-instant',
    badge: 'Free & Instant',
    title: 'Send via @GlobalTag or QR Code',
    tagline: 'Zero-Fee Peer to Peer Transfers',
    description: 'Split bills with friends across continents or pay international merchants seamlessly. No routing codes or IBANs required—just their tag, email, or QR code.',
    bullets: [
      'Send fiat or crypto to any GlobalPay user worldwide with 0% fees',
      'Cross-currency settlement: you send EUR, they receive JPY instantly',
      'Interactive payment requests and recurring split-bill automation',
    ],
    iconName: 'Zap',
    accentColor: '#0099FF',
  },
];

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    metric: 'Transfer Speed',
    globalPay: 'Instant to 60 Seconds',
    globalPayHighlight: true,
    traditionalBanks: '3 to 5 Business Days',
    standardApps: '1 to 2 Business Days',
  },
  {
    metric: 'FX Exchange Rate',
    globalPay: 'Real Mid-Market Rate (0% Markup)',
    globalPayHighlight: true,
    traditionalBanks: '3.5% – 5.5% Hidden Markup',
    standardApps: '1.5% – 2.5% Hidden Spread',
  },
  {
    metric: 'Crypto & Fiat Integration',
    globalPay: 'Native unified wallet & instant off-ramp',
    globalPayHighlight: true,
    traditionalBanks: 'Blocked or not supported',
    standardApps: 'Separate app or high gas fees',
  },
  {
    metric: 'Cross-Border Transfer Fee',
    globalPay: 'From $0.00 (Free between users)',
    globalPayHighlight: true,
    traditionalBanks: '$25 – $50 Wire Fee + Intermediaries',
    standardApps: '$3 – $15 + % of transfer',
  },
  {
    metric: 'Contactless Global Card',
    globalPay: 'Virtual & Metal card with 0% FX fees',
    globalPayHighlight: true,
    traditionalBanks: '3% Foreign Transaction Fee',
    standardApps: 'Selected countries only',
  },
  {
    metric: '24/7 Weekend Transfers',
    globalPay: 'Always Live (24/7/365 instant routing)',
    globalPayHighlight: true,
    traditionalBanks: 'Closed weekends & bank holidays',
    standardApps: 'Delayed on weekends',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'app',
    question: 'How do I open an account on GlobalPay?',
    answer: 'Click "Get Started" anywhere on this website to create your account in under 2 minutes. You can choose your preferred base currency (USD, EUR, GBP), select your card tier, and immediately gain access to your verified dashboard.',
  },
  {
    id: 'faq-2',
    category: 'currencies',
    question: 'Which currencies and cryptocurrencies does GlobalPay support?',
    answer: 'GlobalPay supports over 150 fiat currencies (including USD, EUR, GBP, JPY, CAD, AUD, CHF, SGD, AED, INR, and BRL) and 40+ premier digital assets (including Bitcoin, Ethereum, Solana, USDT, USDC, and Ripple) with real-time conversion at transparent mid-market rates.',
  },
  {
    id: 'faq-3',
    category: 'security',
    question: 'How is my money and crypto protected?',
    answer: 'GlobalPay adheres to stringent international banking standards. Customer fiat balances are held in segregated tier-1 regulated banking reserves. Digital assets are secured with multi-party computation (MPC) cold storage systems with SOC 2 Type II certification and institutional insurance underwriting.',
  },
  {
    id: 'faq-4',
    category: 'general',
    question: 'What do I receive when I get started?',
    answer: 'When you get started, your verified multi-currency account is provisioned immediately with a complimentary $1,000 credit, an instant virtual card for Apple Pay/Google Wallet, dedicated local IBAN numbers, and access to the full crypto swap engine.',
  },
  {
    id: 'faq-5',
    category: 'fees',
    question: 'Are there hidden foreign exchange markups?',
    answer: 'None. GlobalPay uses the transparent interbank mid-market exchange rate without surprise inflated markups. Any nominal routing fee is displayed in advance down to the cent before you confirm any transfer.',
  },
];

export const TRUST_STATS = [
  { label: 'Annual Volume Processed', value: '$14.8B+' },
  { label: 'Active App Users', value: '3.4M+' },
  { label: 'Supported Countries', value: '180+' },
  { label: 'App Store Rating', value: '4.9 ★' },
];
