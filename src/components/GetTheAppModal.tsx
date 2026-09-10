import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Smartphone, Apple, Play, CheckCircle2, ShieldCheck, ArrowRight, Download, Send } from 'lucide-react';
import { GlobalPayLogo } from './GlobalPayLogo';

interface GetTheAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetTheAppModal: React.FC<GetTheAppModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'link' | 'direct'>('qr');
  const [contactInput, setContactInput] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [downloadingApk, setDownloadingApk] = useState(false);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      // keep success message visible
    }, 4000);
  };

  const handleApkDownload = () => {
    setDownloadingApk(true);
    setTimeout(() => {
      setDownloadingApk(false);
      alert('GlobalPay-v4.8.2.apk download initiated.');
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="get-app-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          {/* Backdrop Click to Close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl bg-white dark:bg-[#07132B] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
          >
            {/* Header with gradient accent line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0052FF] via-[#00D2B4] to-[#10DF62]" />
            
            <div className="p-6 md:p-8">
              {/* Top Row: Brand & Close */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800/80">
                <GlobalPayLogo size="sm" showTagline={false} />
                <button
                  id="close-get-app-modal"
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Explainer */}
              <div className="mt-5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-2">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Official Mobile App (iOS & Android)</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Get GlobalPay on Your Phone
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  To ensure maximum biometric & cryptographic security, all money transfers, live currency swaps, and crypto wallets operate exclusively in the GlobalPay App.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center justify-center gap-2 mt-6 p-1 bg-slate-100 dark:bg-slate-900/90 rounded-xl max-w-sm mx-auto">
                <button
                  id="tab-qr-code"
                  onClick={() => setActiveTab('qr')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'qr'
                      ? 'bg-white dark:bg-[#0E2045] text-[#0052FF] dark:text-cyan-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scan QR</span>
                </button>
                <button
                  id="tab-sms-link"
                  onClick={() => setActiveTab('link')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'link'
                      ? 'bg-white dark:bg-[#0E2045] text-[#0052FF] dark:text-cyan-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SMS / Email</span>
                </button>
                <button
                  id="tab-direct-download"
                  onClick={() => setActiveTab('direct')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'direct'
                      ? 'bg-white dark:bg-[#0E2045] text-[#0052FF] dark:text-cyan-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Stores & APK</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'qr' && (
                  <div className="flex flex-col items-center">
                    {/* Stylized QR Code Box with Logo in Center */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-2 border-dashed border-cyan-500/40 rounded-2xl shadow-inner relative group">
                      <div className="w-48 h-48 relative bg-slate-950 p-2 rounded-xl flex items-center justify-center">
                        {/* Realistic SVG QR Pattern */}
                        <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                          {/* Corner Targets */}
                          <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                          <rect x="11" y="11" width="14" height="14" rx="2" fill="currentColor" />
                          
                          <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                          <rect x="75" y="11" width="14" height="14" rx="2" fill="currentColor" />
                          
                          <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                          <rect x="11" y="75" width="14" height="14" rx="2" fill="currentColor" />

                          {/* Data Matrix Dots */}
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

                          {/* Center Brand Badge */}
                          <rect x="38" y="38" width="24" height="24" rx="6" fill="#0052FF" />
                          <circle cx="50" cy="50" r="7" fill="#00E676" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Point your phone camera to download instantly
                    </p>
                  </div>
                )}

                {activeTab === 'link' && (
                  <div className="max-w-md mx-auto">
                    {isSent ? (
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-200">
                          Download Link Sent!
                        </h4>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300/90 mt-1">
                          We sent the secure download link to <strong>{contactInput}</strong>. Tap the link on your mobile device to install.
                        </p>
                        <button
                          onClick={() => { setIsSent(false); setContactInput(''); }}
                          className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                        >
                          Send to another number or email
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSendLink} className="space-y-3">
                        <div>
                          <label htmlFor="contact-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Mobile Phone Number or Email
                          </label>
                          <div className="flex gap-2">
                            <input
                              id="contact-input"
                              type="text"
                              required
                              value={contactInput}
                              onChange={(e) => setContactInput(e.target.value)}
                              placeholder="+1 (555) 000-0000 or you@email.com"
                              className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                            />
                            <button
                              id="btn-send-download-link"
                              type="submit"
                              className="px-4 py-2.5 bg-gradient-to-r from-[#0052FF] to-[#00C2CB] hover:opacity-95 text-white font-semibold text-sm rounded-xl transition-all shrink-0 flex items-center gap-1.5"
                            >
                              <span>Send Link</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          We will never spam or share your information. Standard carrier SMS rates may apply.
                        </p>
                      </form>
                    )}
                  </div>
                )}

                {activeTab === 'direct' && (
                  <div className="space-y-3 max-w-md mx-auto">
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        id="modal-app-store-btn"
                        href="#app-store"
                        onClick={(e) => { e.preventDefault(); alert('Redirecting to Apple App Store for GlobalPay...'); }}
                        className="flex items-center gap-3 p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-700 transition-all hover:scale-[1.02]"
                      >
                        <Apple className="w-7 h-7 shrink-0 text-white" />
                        <div className="text-left">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Download on the</div>
                          <div className="text-sm font-bold leading-tight">App Store</div>
                        </div>
                      </a>

                      <a
                        id="modal-play-store-btn"
                        href="#google-play"
                        onClick={(e) => { e.preventDefault(); alert('Redirecting to Google Play Store for GlobalPay...'); }}
                        className="flex items-center gap-3 p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-700 transition-all hover:scale-[1.02]"
                      >
                        <Play className="w-6 h-6 shrink-0 text-emerald-400 fill-emerald-400" />
                        <div className="text-left">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Get it on</div>
                          <div className="text-sm font-bold leading-tight">Google Play</div>
                        </div>
                      </a>
                    </div>

                    {/* Direct APK for power users */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Direct Android APK</div>
                        <div className="text-[11px] text-slate-500">v4.8.2 • SHA-256 Verified • 48 MB</div>
                      </div>
                      <button
                        id="btn-download-apk"
                        onClick={handleApkDownload}
                        disabled={downloadingApk}
                        className="px-3 py-1.5 text-xs font-semibold bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-600 dark:text-cyan-400 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{downloadingApk ? 'Downloading...' : 'Download APK'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Security & App Stats Bottom */}
              <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>256-Bit SSL & FaceID / TouchID biometric protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">4.9 ★</span>
                  <span>(142K+ reviews)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
