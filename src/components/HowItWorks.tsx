import React from 'react';
import { Smartphone, UserCheck, Wallet, Send, ArrowRight, Check } from 'lucide-react';

interface HowItWorksProps {
  onOpenGetApp: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenGetApp }) => {
  const steps = [
    {
      num: '01',
      title: 'Download the App',
      description: 'Get GlobalPay from the iOS App Store or Google Play. Works seamlessly across phone and tablet devices.',
      icon: <Smartphone className="w-6 h-6 text-[#0066FF]" />,
    },
    {
      num: '02',
      title: '2-Minute Onboarding',
      description: 'Instant automated KYC verification with your government ID. No waiting days for approval.',
      icon: <UserCheck className="w-6 h-6 text-[#00D2B4]" />,
    },
    {
      num: '03',
      title: 'Deposit Fiat or Crypto',
      description: 'Add funds with local bank transfer (ACH, SEPA, Faster Payments), card, or deposit digital assets.',
      icon: <Wallet className="w-6 h-6 text-[#10DF62]" />,
    },
    {
      num: '04',
      title: 'Pay Anywhere Globally',
      description: 'Send funds instantly across 180+ countries, exchange at mid-market rates, or tap to pay with your card.',
      icon: <Send className="w-6 h-6 text-[#0052FF]" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/50 dark:bg-[#040E24]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-cyan-300 text-xs font-semibold mb-3 border border-slate-200 dark:border-slate-700">
            <span>Fast & Straightforward</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How GlobalPay Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Start sending money and managing your crypto portfolio globally in four effortless steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-[#0052FF] dark:group-hover:text-cyan-400 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Instant App Activation</span>
              </div>
            </div>
          ))}
        </div>

        {/* Get App Action Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenGetApp}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <Smartphone className="w-5 h-5" />
            <span>Install the App to Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
