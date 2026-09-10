import React from 'react';
import { Check, X, ShieldAlert, Sparkles, Smartphone, ArrowRight } from 'lucide-react';
import { COMPARISON_DATA } from '../data/mockData';

interface FeeComparisonProps {
  onOpenGetApp: () => void;
}

export const FeeComparison: React.FC<FeeComparisonProps> = ({ onOpenGetApp }) => {
  return (
    <section id="comparison" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Unfair Banking Markups End Here</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How GlobalPay Compares
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            See why millions of international travelers, expats, crypto traders, and freelancers manage their money through the GlobalPay mobile app.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px] bg-white dark:bg-[#07132B] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 p-6 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 font-bold text-sm">
              <div className="col-span-4 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
                Feature / Metric
              </div>
              
              {/* Highlighted GlobalPay Column */}
              <div className="col-span-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#0052FF] to-[#10DF62] text-white text-xs font-black shadow-sm">
                  <span>GlobalPay App</span>
                </div>
              </div>

              <div className="col-span-2 text-center text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Traditional Banks
              </div>

              <div className="col-span-2 text-center text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                Standard Wire Apps
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {COMPARISON_DATA.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-5 items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors text-sm"
                >
                  <div className="col-span-4 font-semibold text-slate-900 dark:text-white">
                    {row.metric}
                  </div>

                  <div className="col-span-4 text-center">
                    <span className="font-extrabold text-sm text-[#0052FF] dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1.5 rounded-xl inline-block">
                      {row.globalPay}
                    </span>
                  </div>

                  <div className="col-span-2 text-center text-xs text-slate-500 dark:text-slate-400">
                    {row.traditionalBanks}
                  </div>

                  <div className="col-span-2 text-center text-xs text-slate-500 dark:text-slate-400">
                    {row.standardApps}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#002B7A] via-[#0052FF] to-[#00C2CB] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl font-black">
              Ready to stop overpaying on foreign transfers?
            </h3>
            <p className="text-sm text-cyan-100">
              Download the GlobalPay App now on iOS and Android. Zero monthly maintenance fees.
            </p>
          </div>

          <button
            onClick={onOpenGetApp}
            className="px-6 py-3.5 rounded-2xl font-extrabold text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 text-slate-900" />
            <span>Get Started</span>
          </button>
        </div>

      </div>
    </section>
  );
};
