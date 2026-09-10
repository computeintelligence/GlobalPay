import React from 'react';
import {
  Landmark,
  Coins,
  CreditCard,
  Send,
  Code2,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Smartphone,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const FeaturesPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  const featurePillars = [
    {
      id: 'multi-currency',
      icon: <Landmark className="w-8 h-8 text-[#0052FF]" />,
      badge: 'Local Banking Coordinates',
      title: 'Dedicated Multi-Currency Accounts & Local IBANs',
      description:
        'Open accounts in 10+ major world currencies with your own legal name on the account. Receive payments via domestic ACH, SEPA Instant, UK Faster Payments, and EFT without paying international SWIFT wire fees.',
      points: [
        'EUR IBAN with direct SEPA Instant credit in <10 seconds',
        'US Account & Routing numbers powered by FedNow & ACH',
        'UK Sort Code & Account Number for instant Faster Payments',
        'Australian BSB and Canadian Transit numbers for local payroll',
      ],
      highlight: '0% Incoming Domestic Fees',
    },
    {
      id: 'crypto-engine',
      icon: <Coins className="w-8 h-8 text-[#00D2B4]" />,
      badge: 'High-Velocity Digital Assets',
      title: 'Sub-Second Crypto-to-Fiat Liquidity Engine',
      description:
        'Seamlessly bridge traditional finance with digital assets. Buy, store, and swap 40+ cryptocurrencies (Bitcoin, Ethereum, Solana, USDT, USDC) and instantly route your crypto yields directly into spendable fiat debit card balances.',
      points: [
        'Real-time deep liquidity with 0.25% transparent spread',
        'Instant off-ramp directly into your GlobalPay Visa/Mastercard',
        'Multi-chain deposits on Ethereum, Arbitrum, Polygon, and Solana',
        'Institutional MPC cold custody with $250M insurance backing',
      ],
      highlight: '< 0.5s Execution Speed',
    },
    {
      id: 'metal-cards',
      icon: <CreditCard className="w-8 h-8 text-[#10DF62]" />,
      badge: 'Spend Anywhere',
      title: 'Contactless Metal & Virtual Multi-Currency Cards',
      description:
        'Spend in 150+ countries with automatic currency detection at real mid-market exchange rates. No more inflated 3-5% foreign transaction fees while traveling or shopping overseas.',
      points: [
        '18g precision-milled stainless steel with laser engraved details',
        'Instant digital card activation ready for Apple Pay & Google Wallet',
        'Up to 1.5% instant crypto cashback on all worldwide purchases',
        'One-click instant freeze/unfreeze and dynamic digital CVV protection',
      ],
      highlight: 'Zero Foreign Transaction Fee',
    },
    {
      id: 'p2p-invoicing',
      icon: <Send className="w-8 h-8 text-[#0099FF]" />,
      badge: 'Global P2P & Commerce',
      title: 'Instant Peer-to-Peer Payments & Global Invoicing',
      description:
        'Send money across borders in seconds using just an email address, phone number, or @GlobalPay tag. Perfect for paying overseas contractors, remote freelancers, or splitting dinner with friends globally.',
      points: [
        'Free 0% fee peer-to-peer transfers between GlobalPay members',
        'Generate multi-currency invoices with embedded payment links',
        'Real-time push notifications when recipient accepts funds',
        'Automatic reconciliation and QuickBooks / Xero export',
      ],
      highlight: '100% Free Between Members',
    },
    {
      id: 'developer-api',
      icon: <Code2 className="w-8 h-8 text-[#0052FF]" />,
      badge: 'Fintech Infrastructure',
      title: 'Robust Developer APIs, Webhooks & SDKs',
      description:
        'Integrate GlobalPay rails directly into your web applications, marketplaces, and platforms. Programmatically issue virtual cards, execute mass payouts to 180+ countries, and listen to real-time payment webhooks.',
      points: [
        'RESTful APIs with client libraries for Node.js, Python, Go, and Ruby',
        'Idempotent payment requests with sub-100ms API latency',
        'Sandbox environment with simulated clearing networks',
        'Automated 1099 and cross-border tax compliance exports',
      ],
      highlight: '99.99% API Uptime SLA',
    },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-950/50 text-[#0052FF] dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200/60 dark:border-cyan-800/60">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Complete Financial Superapp</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Enterprise-Grade Features for Borderless Wealth
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Discover how GlobalPay reengineers international banking, crypto exchange, and global payments into one cohesive platform.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigateTo('get-started')}
            className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feature Blocks */}
      <div className="space-y-12">
        {featurePillars.map((pillar, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={pillar.id}
              className={`p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-[#0052FF] dark:text-cyan-400">
                  {pillar.badge}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {pillar.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => navigateTo('get-started')}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0052FF] to-[#00D2B4] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Activate Feature • Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {pillar.highlight}
                  </span>
                </div>
              </div>

              {/* Graphic / Visual Pillar Box */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-center space-y-4 shadow-inner">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center mx-auto">
                    {pillar.icon}
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">
                    {pillar.badge}
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 text-left">
                    <div className="text-emerald-500 font-bold mb-1">● Status: Production Operational</div>
                    <div>Latency: 140ms</div>
                    <div>Encryption: Hardware Enclave</div>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-r from-[#0052FF]/10 via-[#00D2B4]/10 to-[#10DF62]/10 border border-cyan-500/30">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
          Experience All Features with Zero Risk
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
          Create your verified account in 2 minutes. Receive $1,000 complimentary credit and access our full multi-currency suite.
        </p>
        <button
          onClick={() => navigateTo('get-started')}
          className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
