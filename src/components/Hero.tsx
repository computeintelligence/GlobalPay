import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, ArrowRight, ShieldCheck, Zap, Globe, Sparkles, Check, RefreshCw, CreditCard, ChevronRight, Apple, Play } from 'lucide-react';
import { TRUST_STATS } from '../data/mockData';

interface HeroProps {
  onOpenGetApp: () => void;
  onScrollToRates: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGetApp, onScrollToRates }) => {
  const [activeScreenTab, setActiveScreenTab] = useState<'balance' | 'swap' | 'card'>('balance');

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Decorative Gradients matching the Logo Colors */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-tr from-[#0052FF]/15 via-[#00D2B4]/15 to-[#10DF62]/10 blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-600/10 dark:bg-blue-600/15 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Value Proposition, Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#10DF62] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] bg-clip-text text-transparent whitespace-nowrap">
                Pay Anywhere • Anytime • Globally
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Send Money & Crypto Worldwide.{' '}
              <span className="bg-gradient-to-r from-[#0052FF] via-[#00C4C8] to-[#10DF62] bg-clip-text text-transparent">
                In Seconds.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              The next-generation global payment app that unites multi-currency banking and crypto exchange into one intuitive mobile experience. Real mid-market rates, instant cross-border routing, and zero hidden fees.
            </p>

            {/* App Exclusivity Notice Pill */}
            <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/50 rounded-2xl flex items-center gap-3 text-left max-w-xl mx-auto lg:mx-0">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#00D2B4] text-white shrink-0 shadow-sm">
                <Smartphone className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white font-semibold">Native Mobile Security:</strong> Money and crypto transfers are made via the official <span className="font-semibold text-[#0052FF] dark:text-cyan-400">GlobalPay App</span> on iOS and Android for biometric authorization.
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-get-started-btn"
                onClick={onOpenGetApp}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-see-rates-btn"
                onClick={onScrollToRates}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-base text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-[#0052FF] dark:text-cyan-400" />
                <span>Compare Live Rates</span>
              </button>
            </div>

            {/* App Store Micro Badges */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Apple className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span>iOS App Store 4.9 ★</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1">
                <Play className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                <span>Google Play 4.8 ★</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>SOC 2 Type II</span>
              </span>
            </div>

            {/* Trust Metric Stats Strip */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TRUST_STATS.map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Creative Interactive Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
              
              {/* Outer Phone Glow / Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0052FF] via-[#00D2B4] to-[#10DF62] rounded-[48px] opacity-75 blur-xl group-hover:opacity-100 transition duration-1000 -z-10" />

              {/* Phone Hardware Chassis */}
              <div className="relative bg-slate-950 p-3 rounded-[44px] shadow-2xl border-4 border-slate-800/90">
                
                {/* Dynamic Island / Camera Notch */}
                <div className="w-28 h-5 bg-black rounded-full mx-auto mb-2 flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800/90" />
                  <div className="w-2 h-2 rounded-full bg-blue-900/60" />
                </div>

                {/* Phone Screen Display */}
                <div className="bg-slate-900 text-white rounded-[34px] overflow-hidden p-4 min-h-[580px] flex flex-col justify-between border border-slate-800">
                  
                  {/* Phone App Header */}
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0052FF] via-[#00D2B4] to-[#10DF62] p-0.5">
                          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-xs text-cyan-400">
                            GP
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold">Alexander Vance</div>
                          <div className="text-[10px] text-cyan-400">@alex.global • Verified</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800 text-[10px] text-emerald-400 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Live App</span>
                      </div>
                    </div>

                    {/* Interactive App Screen View Selector */}
                    <div className="flex gap-1 p-1 bg-slate-950 rounded-xl mt-3">
                      <button
                        onClick={() => setActiveScreenTab('balance')}
                        className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                          activeScreenTab === 'balance'
                            ? 'bg-[#0052FF] text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Balances
                      </button>
                      <button
                        onClick={() => setActiveScreenTab('swap')}
                        className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                          activeScreenTab === 'swap'
                            ? 'bg-[#0052FF] text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Swap
                      </button>
                      <button
                        onClick={() => setActiveScreenTab('card')}
                        className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                          activeScreenTab === 'card'
                            ? 'bg-[#0052FF] text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Card
                      </button>
                    </div>

                    {/* Screen View: Balances */}
                    {activeScreenTab === 'balance' && (
                      <div className="mt-4 space-y-3">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#061B48] via-[#052668] to-[#043485] border border-cyan-500/30">
                          <div className="text-[10px] uppercase font-bold text-cyan-300/80 tracking-wider">Total Combined Portfolio</div>
                          <div className="text-2xl font-extrabold mt-0.5 text-white tracking-tight">$48,250.80</div>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-semibold">
                            <span>+$1,420.35 (+3.03%)</span>
                            <span className="text-slate-400 font-normal">past 24h</span>
                          </div>
                        </div>

                        {/* Sub Accounts / Assets in App */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">🇺🇸</span>
                              <div>
                                <div className="text-xs font-bold">USD Balance</div>
                                <div className="text-[10px] text-slate-400">ACH: •••• 4912</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold">$14,500.00</div>
                              <div className="text-[10px] text-slate-400">Available</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">🇪🇺</span>
                              <div>
                                <div className="text-xs font-bold">EUR Balance</div>
                                <div className="text-[10px] text-slate-400">IBAN: •••• DE89</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold">€12,380.00</div>
                              <div className="text-[10px] text-slate-400">Available</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">🪙</span>
                              <div>
                                <div className="text-xs font-bold">Bitcoin (BTC)</div>
                                <div className="text-[10px] text-emerald-400">+3.42%</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold">0.312 BTC</div>
                              <div className="text-[10px] text-slate-400">≈ $21,356.40</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Screen View: Instant Swap Simulator */}
                    {activeScreenTab === 'swap' && (
                      <div className="mt-4 space-y-3">
                        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                          <div className="text-[10px] text-slate-400">You Pay</div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-xl font-bold text-white">1,000.00</div>
                            <div className="px-2 py-1 rounded-lg bg-blue-600/30 border border-blue-500/50 text-xs font-bold flex items-center gap-1">
                              <span>🇺🇸</span> USD
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center -my-1 relative z-10">
                          <div className="p-1.5 rounded-full bg-[#00D2B4] text-slate-950 shadow-md">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                          <div className="text-[10px] text-slate-400">You Receive Instantly</div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-xl font-bold text-emerald-400">0.01460</div>
                            <div className="px-2 py-1 rounded-lg bg-emerald-600/30 border border-emerald-500/50 text-xs font-bold flex items-center gap-1">
                              <span>🪙</span> BTC
                            </div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-800/40 text-[10px] text-slate-400 space-y-1">
                          <div className="flex justify-between">
                            <span>Rate:</span>
                            <span className="text-slate-200">1 BTC = $68,450.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Exchange fee:</span>
                            <span className="text-emerald-400 font-bold">$0.00 (Promo)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Screen View: GlobalPay Card */}
                    {activeScreenTab === 'card' && (
                      <div className="mt-4 space-y-3">
                        {/* 3D-styled GlobalPay Virtual Card */}
                        <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#002D8A] via-[#0066FF] to-[#00D2B4] text-white shadow-xl relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black tracking-wider">GlobalPay</span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">Virtual Platinum</span>
                          </div>

                          <div className="mt-5 flex items-center gap-2">
                            {/* Chip */}
                            <div className="w-7 h-5 rounded-sm bg-amber-200/90 border border-amber-300" />
                            {/* Contactless waves */}
                            <div className="text-xs font-bold">))))</div>
                          </div>

                          <div className="mt-4 text-sm font-mono tracking-widest text-slate-100">
                            •••• •••• •••• 8842
                          </div>

                          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-200">
                            <span>ALEXANDER VANCE</span>
                            <span>EXP 09/29</span>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-800/50 rounded-xl text-center">
                          <div className="text-[11px] text-cyan-300 font-semibold">Contactless Apple / Google Pay Enabled</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Auto-converts at POS with 0% foreign FX fee</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone App Footer Button Trigger */}
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <button
                      onClick={onOpenGetApp}
                      className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#0052FF] via-[#00D2B4] to-[#10DF62] text-center flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Download App to Send Now</span>
                    </button>
                    <div className="text-[9px] text-center text-slate-500 mt-1.5">
                      Fast 2-minute sign up on iOS & Android
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Floating Pill Badges around Phone */}
              <div className="absolute -top-3 -right-4 bg-white dark:bg-slate-800 p-2.5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 hidden sm:flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">Instant Global Transfer</div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-400">Completed in 2.8s</div>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-4 bg-white dark:bg-slate-800 p-2.5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 hidden sm:flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold text-xs">
                  ⚡
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">Mid-Market FX Rate</div>
                  <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">0% Hidden Spread</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
