import React, { useState } from 'react';
import {
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building2,
  Sparkles,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const PricingPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      id: 'standard',
      name: 'Global Standard',
      priceMonthly: 0,
      priceAnnual: 0,
      description: 'Ideal for frequent travelers, digital nomads, and personal international transfers.',
      popular: false,
      badge: 'Free Forever',
      features: [
        'Free multi-currency virtual debit card',
        'Hold and exchange 150+ fiat currencies',
        'Access to 40+ cryptocurrencies with 0.35% spread',
        'SEPA Instant & US FedNow support',
        'Free transfers between GlobalPay members',
        'Standard mobile biometric enclave security',
        'Monthly ATM withdrawal allowance up to $300 fee-free',
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'metal-pro',
      name: 'Metal Pro',
      priceMonthly: 14.99,
      priceAnnual: 11.99,
      description: 'Engineered for high-volume cross-border lifestyle, investors, and elite perks.',
      popular: true,
      badge: 'Most Popular',
      features: [
        'Everything in Global Standard',
        'Custom laser-engraved 18g stainless steel metal card',
        '1.5% instant crypto cashback on all purchases',
        'Unlimited fee-free international ATM withdrawals up to $1,200/mo',
        'Zero-spread weekend crypto-to-fiat conversions',
        'Global Airport LoungeKey pass with guest privilege',
        'Comprehensive worldwide travel & device insurance',
        'Priority 24/7 dedicated VIP concierge support',
      ],
      cta: 'Get Started with Metal Pro',
    },
    {
      id: 'business',
      name: 'Global Enterprise',
      priceMonthly: 59.00,
      priceAnnual: 49.00,
      description: 'Designed for international companies, e-commerce stores, and remote engineering teams.',
      popular: false,
      badge: 'Corporate Scale',
      features: [
        'Everything in Metal Pro',
        'Corporate multi-currency IBANs under legal company entity',
        'Unlimited team corporate physical & virtual cards with spending rules',
        'Batch automated payouts to 180+ countries via CSV or REST API',
        'Full REST API access & webhooks with 99.99% uptime SLA',
        'Direct integration with QuickBooks, Xero, and NetSuite',
        'Dedicated corporate relationship director & custom compliance',
        'Higher daily limits: up to $5,000,000 equivalent/day',
      ],
      cta: 'Get Started with Enterprise',
    },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-950/50 text-[#0052FF] dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200/60 dark:border-cyan-800/60">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Transparent Institutional Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Simple, Predictable Plans for Every Scale
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          No hidden fees, no predatory markups on weekends. Pick the plan that matches your cross-border lifestyle.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-[#07132B] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-[#0052FF] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] font-black bg-emerald-400 text-slate-900 px-1.5 py-0.5 rounded-md uppercase">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
        {plans.map((plan) => {
          const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 transition-all flex flex-col justify-between relative ${
                plan.popular
                  ? 'bg-white dark:bg-[#07132B] border-2 border-cyan-400 shadow-2xl ring-4 ring-cyan-400/20'
                  : 'bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  {!plan.popular && (
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    / month {billingCycle === 'annual' && price > 0 ? '(billed annually)' : ''}
                  </span>
                </div>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button: Every CTA is "Get Started" */}
              <div>
                <button
                  onClick={() => navigateTo('get-started')}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-lg shadow-cyan-500/25'
                      : 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Comparison with SWIFT Traditional Wire Banks */}
      <div className="bg-slate-50 dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 text-center">
          GlobalPay vs Traditional High Street Banks
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto mb-8">
          See the mathematical difference in transparency, speed, and real costs.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-500">
              <tr>
                <th className="pb-3 px-4">Feature / Metric</th>
                <th className="pb-3 px-4 text-[#0052FF] dark:text-cyan-400 font-black">GlobalPay</th>
                <th className="pb-3 px-4 text-slate-500">Traditional Banks (SWIFT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-4 font-semibold">Exchange Rate Model</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">Real Mid-Market Rate (Live)</td>
                <td className="py-3 px-4 text-rose-500">Hidden 3.0% to 5.5% markup</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Transfer Speed</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">Instant (0.25s - 10s)</td>
                <td className="py-3 px-4">3 - 5 business days</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Intermediary Correspondent Fees</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">$0.00 Guaranteed</td>
                <td className="py-3 px-4 text-rose-500">$25 - $50 deducted mid-route</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Crypto & Digital Asset Rail</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">Native instant off-ramp</td>
                <td className="py-3 px-4 text-rose-500">Often blocked or rejected</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('get-started')}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Stop Overpaying • Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
