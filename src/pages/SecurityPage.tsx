import React from 'react';
import {
  ShieldCheck,
  Lock,
  Landmark,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Cpu,
  KeyRound,
  EyeOff,
  Server
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const SecurityPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6 text-[#0052FF]" />,
      title: 'Institutional MPC Digital Custody',
      description:
        'Private keys never exist in full in any single memory location. Multi-Party Computation (MPC) splits key shards across multiple geographically isolated hardware security modules (HSMs).',
    },
    {
      icon: <Landmark className="w-6 h-6 text-[#00D2B4]" />,
      title: '100% Segregated Tier-1 Bank Reserves',
      description:
        'Your fiat funds are held in segregated accounts at Tier-1 regulated banking institutions (such as JPMorgan Chase and Deutsche Bank). GlobalPay never lends, rehypothecates, or speculates with customer deposits.',
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-[#10DF62]" />,
      title: '$250M Digital Asset Insurance',
      description:
        'Cryptocurrency and digital asset balances are protected by a comprehensive $250M insurance policy underwritten by leading Lloyd’s of London syndicates against third-party theft or hardware compromise.',
    },
    {
      icon: <KeyRound className="w-6 h-6 text-purple-500" />,
      title: 'Biometric Mobile Secure Enclave',
      description:
        'Every sensitive operation—including high-value transfers, new card issuance, and PIN reveals—requires hardware biometric validation (FaceID / TouchID) locked to your authenticated smartphone.',
    },
  ];

  const complianceBadges = [
    { name: 'SOC 2 Type II Certified', desc: 'Annual rigorous third-party audits of security, availability, and confidentiality.' },
    { name: 'FinCEN MSB Registered', desc: 'Compliant with US federal anti-money laundering and Bank Secrecy Act requirements.' },
    { name: 'PCI-DSS Level 1 Compliant', desc: 'The highest security standard recognized by Visa, Mastercard, and American Express.' },
    { name: 'GDPR & CCPA Compliant', desc: 'Strict zero-knowledge data encryption preserving your financial privacy.' },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200/60 dark:border-emerald-800/60">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Bank-Grade Security Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          How We Protect Your Wealth & Data
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Built from the ground up with military-grade encryption, segregated fiat reserves, and zero-knowledge privacy protocols.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigateTo('get-started')}
            className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Open a Secure Account • Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {securityFeatures.map((feat, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-md flex gap-5 items-start"
          >
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shrink-0">
              {feat.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance & Regulatory Strip */}
      <div className="bg-slate-50 dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-10 mb-16">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 text-center">
          Regulatory Compliance & Certifications
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 text-center mb-8 max-w-xl mx-auto">
          GlobalPay adheres strictly to global financial standards across all operational jurisdictions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceBadges.map((badge, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {badge.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {badge.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live System Status Indicator */}
      <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <div className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
              All Systems & Payment Rails 100% Operational
            </div>
            <div className="text-xs text-emerald-700 dark:text-emerald-400">
              SEPA Instant, FedNow, Faster Payments, and Blockchain Liquidity Gateways are executing normally.
            </div>
          </div>
        </div>

        <button
          onClick={() => navigateTo('get-started')}
          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shrink-0 cursor-pointer"
        >
          Get Started Now
        </button>
      </div>

    </div>
  );
};
