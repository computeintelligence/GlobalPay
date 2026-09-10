import React from 'react';
import { ShieldCheck, Lock, Landmark, Cpu, FileCheck, EyeOff } from 'lucide-react';

export const SecurityCompliance: React.FC = () => {
  const securityPillars = [
    {
      title: 'Segregated Client Reserves',
      description: 'Your fiat funds are held 1:1 in segregated accounts with tier-1 regulated banking institutions. We never lend or gamble with your deposits.',
      icon: <Landmark className="w-5 h-5 text-[#0066FF]" />,
    },
    {
      title: 'MPC Cold Storage Custody',
      description: 'Digital assets are safeguarded using Multi-Party Computation (MPC) hardware vaults with $250M institutional insurance backing.',
      icon: <Lock className="w-5 h-5 text-[#00D2B4]" />,
    },
    {
      title: 'Biometric Mobile Enclave',
      description: 'All transactions require biometric FaceID/TouchID confirmation processed directly on your smartphone’s secure hardware enclave.',
      icon: <Cpu className="w-5 h-5 text-[#10DF62]" />,
    },
    {
      title: 'Global Regulatory Compliance',
      description: 'Registered Money Services Business (FinCEN, FCA authorized partners, and VASP licensed digital asset frameworks).',
      icon: <FileCheck className="w-5 h-5 text-[#0099FF]" />,
    },
  ];

  return (
    <section id="security" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Bank-Grade Security Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built from the Ground Up for Safety
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Because payments and crypto are executed strictly inside the native GlobalPay App, your credentials are never exposed to browser extensions or web vulnerabilities.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all"
            >
              <div className="p-3 w-fit rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-around gap-6 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>SOC 2 Type II Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#0066FF]" />
            <span>PCI-DSS Level 1 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-cyan-500" />
            <span>ISO/IEC 27001 Standard</span>
          </div>
          <div className="flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-500" />
            <span>Zero-Knowledge Privacy Architecture</span>
          </div>
        </div>

      </div>
    </section>
  );
};
