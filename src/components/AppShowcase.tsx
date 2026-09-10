import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Coins, CreditCard, Zap, ShieldCheck, CheckCircle, Smartphone, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { APP_FEATURES } from '../data/mockData';

interface AppShowcaseProps {
  onOpenGetApp: () => void;
}

export const AppShowcase: React.FC<AppShowcaseProps> = ({ onOpenGetApp }) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(APP_FEATURES[0].id);

  const selectedFeature = APP_FEATURES.find((f) => f.id === selectedFeatureId) || APP_FEATURES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#0066FF]" />;
      case 'Coins':
        return <Coins className="w-6 h-6 text-[#00D2B4]" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-[#10DF62]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#0099FF]" />;
      default:
        return <Layers className="w-6 h-6 text-[#0052FF]" />;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0052FF]/10 dark:bg-[#0052FF]/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#10DF62]/10 dark:bg-[#10DF62]/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-cyan-300 text-xs font-semibold mb-3 border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-[#00D2B4]" />
            <span>Built for the Modern Global Citizen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need in One App
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Whether you are paying international contractors, sending funds to family abroad, or swapping crypto, the GlobalPay mobile app makes cross-border transactions effortless.
          </p>
        </div>

        {/* Feature Navigation Pill Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {APP_FEATURES.map((feature) => {
            const isSelected = feature.id === selectedFeatureId;
            return (
              <button
                key={feature.id}
                onClick={() => setSelectedFeatureId(feature.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] text-white shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{feature.tagline}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Display Card */}
        <div className="bg-white dark:bg-[#07132B] rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/80 dark:border-slate-800 relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Feature Story & Details */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    {getIcon(selectedFeature.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0052FF] dark:text-cyan-400">
                      {selectedFeature.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {selectedFeature.title}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedFeature.description}
                </p>

                {/* Bullet Points */}
                <div className="space-y-3 pt-2">
                  {selectedFeature.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 p-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* App CTA Trigger */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={onOpenGetApp}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Experience in the App</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    No web login required — install in 60s
                  </span>
                </div>

              </div>

              {/* Right Column: Visual UI Mockup Demonstration */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-md bg-slate-950 p-5 rounded-3xl border-2 border-slate-800 shadow-2xl text-white">
                  
                  {/* Mockup Screen Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold text-slate-300">GlobalPay Security Enclave</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono">v4.8.2 ACTIVE</span>
                  </div>

                  {/* Feature-Specific Graphic Display */}
                  <div className="py-6 space-y-4">
                    {selectedFeature.id === 'multi-currency' && (
                      <div className="space-y-3">
                        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🇪🇺</span>
                            <div>
                              <div className="text-xs font-bold">European IBAN Account</div>
                              <div className="text-[10px] font-mono text-slate-400">DE89 3704 0044 0532 0130 00</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-400">Active</span>
                        </div>

                        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🇬🇧</span>
                            <div>
                              <div className="text-xs font-bold">UK Account & Sort Code</div>
                              <div className="text-[10px] font-mono text-slate-400">Sort: 04-00-04 • Acc: 89432011</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-400">Active</span>
                        </div>

                        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🇺🇸</span>
                            <div>
                              <div className="text-xs font-bold">US ACH & Wire Routing</div>
                              <div className="text-[10px] font-mono text-slate-400">Routing: 021000021 • Checking</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-400">Active</span>
                        </div>
                      </div>
                    )}

                    {selectedFeature.id === 'crypto-exchange' && (
                      <div className="space-y-3">
                        <div className="p-4 bg-gradient-to-r from-blue-950/60 to-slate-900 rounded-2xl border border-blue-500/30">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Instant Liquidity Route</span>
                            <span className="text-emerald-400 font-mono">0.05% SPREAD</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">🪙</span>
                              <span className="font-bold text-white">1.00 BTC</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-cyan-400" />
                            <div className="flex items-center gap-2">
                              <span className="text-xl">💶</span>
                              <span className="font-bold text-emerald-400">€62,800.00</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                            <div className="text-[10px] text-slate-400">Execution</div>
                            <div className="font-bold text-cyan-300 mt-0.5">380 ms</div>
                          </div>
                          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                            <div className="text-[10px] text-slate-400">Slippage</div>
                            <div className="font-bold text-emerald-400 mt-0.5">&lt; 0.01%</div>
                          </div>
                          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                            <div className="text-[10px] text-slate-400">Off-Ramp</div>
                            <div className="font-bold text-white mt-0.5">Instant</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedFeature.id === 'global-card' && (
                      <div className="space-y-3">
                        {/* Realistic Card Showcase with Brand Logo Gradient */}
                        <div className="p-5 rounded-2xl bg-gradient-to-tr from-[#021A4D] via-[#0052FF] to-[#00D2B4] shadow-xl relative overflow-hidden text-white">
                          <div className="flex justify-between items-center">
                            <span className="font-black text-sm tracking-wider">GlobalPay Metal</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded-full">World Elite</span>
                          </div>

                          <div className="mt-6 flex items-center gap-3">
                            <div className="w-8 h-6 bg-amber-300 rounded border border-amber-400" />
                            <div className="text-xs font-mono font-bold tracking-widest">))))</div>
                          </div>

                          <div className="mt-5 font-mono text-base tracking-widest">
                            •••• •••• •••• 9924
                          </div>

                          <div className="mt-3 flex justify-between text-[10px] text-slate-200 uppercase font-mono">
                            <span>Alexander Vance</span>
                            <span>Valid Thru 11/30</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
                          <span>Auto-Currency Detection:</span>
                          <span className="text-emerald-400 font-bold">Enabled (0% Fee)</span>
                        </div>
                      </div>
                    )}

                    {selectedFeature.id === 'p2p-instant' && (
                      <div className="space-y-3">
                        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                          <div className="text-[10px] text-slate-400">Recipient</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                              @
                            </div>
                            <span className="font-bold text-sm text-white">@sarah.tokyo</span>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center">
                            <div>
                              <div className="text-[10px] text-slate-400">You Send: $250.00 USD</div>
                              <div className="text-xs font-bold text-emerald-400">Sarah Gets: ¥37,312 JPY</div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                              Delivered
                            </span>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-900/60 rounded-xl text-center text-xs text-slate-400">
                          ⚡ Zero network fees applied. Settled in 1.4 seconds.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mockup Security Stamp */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>End-to-End Cryptographic Security</span>
                    </span>
                    <span>256-Bit TLS</span>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
