import React from 'react';
import { ShieldCheck, Globe, Apple, Play, ExternalLink, ArrowRight } from 'lucide-react';
import { GlobalPayLogo } from './GlobalPayLogo';
import { useNavigation } from '../context/NavigationContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-slate-900 dark:bg-[#020713] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => navigateTo('home')}>
              <GlobalPayLogo size="lg" showTagline={true} />
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed mt-3">
              The borderless financial platform connecting traditional multi-currency banking with high-speed digital asset exchange. Pay anywhere, anytime, globally.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('get-started')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Get Started • Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold text-xs">
                Global Rails Status: Operational (99.99%)
              </span>
            </div>
          </div>

          {/* Column 1: Navigation Pages */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Platform Pages
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Home (Fintech Pro)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('features')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Features & Multi-Currency
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('rates')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Live Rates & FX Terminal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('network')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Global Corridors Map
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('pricing')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Plans & Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Security & Assets */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Security & Assets
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('security')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Security Architecture
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('rates')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  150+ Fiat Currencies
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('rates')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  40+ Crypto Assets
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('security')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  $250M MPC Custody Insurance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  FAQ & Knowledge Base
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Account & Access */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Account & Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('get-started')} className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors text-left cursor-pointer">
                  Get Started (Sign Up / In)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('pricing')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Order Metal Card
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('get-started')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Personal Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('security')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  SOC 2 Type II Compliance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  24/7 VIP Support
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-3">
          <p>
            <strong>Important Regulatory Notice:</strong> GlobalPay is a financial technology software company, not a bank. Banking services and payment transactions are provided by licensed, regulated banking partners and authorized Electronic Money Institutions (EMIs). Crypto asset exchange, custodial wallets, and staking services are provided in accordance with applicable Virtual Asset Service Provider (VASP) registrations.
          </p>
          <p>
            To begin using the GlobalPay ecosystem, select <strong>Get Started</strong> to open and verify your multi-currency account.
          </p>
        </div>

        {/* Copyright & Bottom Badges */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} GlobalPay Technologies Inc. All rights reserved. Pay Anywhere • Anytime • Globally.
          </div>

          <div className="flex items-center gap-6">
            <span onClick={() => navigateTo('security')} className="hover:text-white transition-colors cursor-pointer">Security Center</span>
            <span onClick={() => navigateTo('faq')} className="hover:text-white transition-colors cursor-pointer">Privacy & Terms</span>
            <span onClick={() => navigateTo('get-started')} className="hover:text-white transition-colors cursor-pointer font-semibold text-cyan-400">Get Started</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
