import React, { useState } from 'react';
import { Smartphone, Apple, Play, QrCode, CheckCircle, ArrowRight, ShieldCheck, Download, Send } from 'lucide-react';
import { GlobalPayLogo } from './GlobalPayLogo';

export const AppDownloadSection: React.FC = () => {
  const [storeNotice, setStoreNotice] = useState<string | null>(null);
  const [contactInput, setContactInput] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleStoreClick = (storeName: string) => {
    setStoreNotice(`Redirecting to ${storeName}... You can also click Get Started above to access your account immediately.`);
    setTimeout(() => setStoreNotice(null), 4000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;
    setIsSent(true);
  };

  return (
    <section id="download" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0052FF]/5 to-[#00D2B4]/10 dark:via-[#0052FF]/10 dark:to-[#020B1C] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-gradient-to-br from-[#021844] via-[#052668] to-[#043485] rounded-[36px] p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-cyan-500/30 overflow-hidden relative">
          
          {/* Subtle Accent Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00D2B4]/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#10DF62]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, Value, App Store Buttons */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold backdrop-blur-xs">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Available Worldwide on iOS & Android</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Get GlobalPay Now.{' '}
                <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
                  Pay Anywhere.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-blue-100 max-w-xl leading-relaxed">
                Join over 3.4 million individuals and businesses who send money, convert 150+ currencies, and trade crypto with zero unnecessary fees.
              </p>

              {/* Store Download Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="section-app-store-btn"
                  onClick={() => handleStoreClick('Apple App Store')}
                  className="w-full sm:w-auto flex items-center gap-3 px-5 py-3.5 bg-black/50 hover:bg-black/70 text-white rounded-2xl border border-white/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <Apple className="w-7 h-7 text-white shrink-0" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-300 uppercase tracking-wider">Download on the</div>
                    <div className="text-sm font-bold leading-tight">Apple App Store</div>
                  </div>
                </button>

                <button
                  id="section-play-store-btn"
                  onClick={() => handleStoreClick('Google Play Store')}
                  className="w-full sm:w-auto flex items-center gap-3 px-5 py-3.5 bg-black/50 hover:bg-black/70 text-white rounded-2xl border border-white/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <Play className="w-6 h-6 text-emerald-400 fill-emerald-400 shrink-0" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-300 uppercase tracking-wider">Get it on</div>
                    <div className="text-sm font-bold leading-tight">Google Play</div>
                  </div>
                </button>
              </div>

              {storeNotice && (
                <div className="p-3 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-xs text-cyan-200">
                  {storeNotice}
                </div>
              )}

              {/* SMS / Email Direct Link Form */}
              <div className="pt-4 border-t border-white/10 max-w-md mx-auto lg:mx-0">
                <div className="text-xs font-semibold text-cyan-200 mb-2">
                  Or text a download link directly to your mobile phone:
                </div>

                {isSent ? (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-xs flex items-center gap-2 text-emerald-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Download link sent to {contactInput}! Open the message on your phone.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSend} className="flex gap-2">
                    <input
                      id="section-contact-input"
                      type="text"
                      required
                      value={contactInput}
                      onChange={(e) => setContactInput(e.target.value)}
                      placeholder="+1 (555) 000-0000 or email"
                      className="flex-1 px-4 py-2.5 bg-black/40 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <span>Send Link</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* Right Column: Dynamic QR Code Box for Desktop Visitors */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="p-6 bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-cyan-500/30 text-slate-900 dark:text-white text-center w-full max-w-sm">
                
                <div className="text-xs font-bold uppercase tracking-wider text-[#0052FF] dark:text-cyan-400 mb-2">
                  Instant Mobile Install
                </div>

                <h3 className="text-lg font-black mb-4">
                  Scan with Your Phone Camera
                </h3>

                {/* Stylized QR Code Visual */}
                <div className="w-52 h-52 mx-auto bg-slate-950 p-3 rounded-2xl border-2 border-dashed border-cyan-400/60 shadow-inner flex items-center justify-center relative">
                  <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="11" y="11" width="14" height="14" rx="2" fill="currentColor" />
                    <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="75" y="11" width="14" height="14" rx="2" fill="currentColor" />
                    <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="11" y="75" width="14" height="14" rx="2" fill="currentColor" />
                    <rect x="36" y="8" width="6" height="6" />
                    <rect x="46" y="8" width="6" height="6" />
                    <rect x="56" y="8" width="6" height="6" />
                    <rect x="36" y="18" width="6" height="6" />
                    <rect x="50" y="18" width="12" height="6" />
                    <rect x="8" y="36" width="6" height="6" />
                    <rect x="18" y="44" width="6" height="6" />
                    <rect x="28" y="36" width="6" height="12" />
                    <rect x="8" y="50" width="12" height="6" />
                    <rect x="68" y="36" width="6" height="6" />
                    <rect x="78" y="44" width="14" height="6" />
                    <rect x="86" y="36" width="6" height="6" />
                    <rect x="68" y="50" width="10" height="6" />
                    <rect x="36" y="68" width="8" height="6" />
                    <rect x="48" y="68" width="6" height="14" />
                    <rect x="36" y="82" width="6" height="6" />
                    <rect x="58" y="76" width="6" height="12" />
                    <rect x="72" y="68" width="12" height="6" />
                    <rect x="68" y="82" width="8" height="6" />
                    <rect x="84" y="80" width="8" height="8" />
                    <rect x="38" y="38" width="24" height="24" rx="6" fill="#0052FF" />
                    <circle cx="50" cy="50" r="7" fill="#00E676" />
                  </svg>
                </div>

                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Direct link to App Store & Google Play</span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  Supported: iOS 15.0+ • Android 9.0+ • HarmonyOS
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
