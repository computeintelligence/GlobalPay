import React, { useState } from 'react';
import {
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { PAYMENT_CORRIDORS } from '../data/mockData';
import { useNavigation } from '../context/NavigationContext';

const REGIONAL_COUNTRIES = [
  { region: 'Europe', countries: ['United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Switzerland', 'Sweden', 'Poland', 'Ireland', 'Portugal', 'Norway'] },
  { region: 'Americas', countries: ['United States', 'Canada', 'Brazil', 'Mexico', 'Argentina', 'Colombia', 'Chile', 'Peru'] },
  { region: 'Asia-Pacific', countries: ['Singapore', 'Australia', 'Japan', 'Hong Kong', 'India', 'South Korea', 'New Zealand', 'Indonesia', 'Thailand', 'Philippines', 'Vietnam', 'Malaysia'] },
  { region: 'Middle East & Africa', countries: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Nigeria', 'South Africa', 'Kenya', 'Egypt', 'Ghana'] },
];

export const NetworkPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-950/50 text-[#0052FF] dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200/60 dark:border-cyan-800/60">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>Worldwide Clearing Mesh</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Global Payment Network & Corridors
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Direct integration with central bank real-time gross settlement systems and decentralized liquidity protocols across 180+ countries.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigateTo('get-started')}
            className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Get Started with Global Transfers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Corridors Grid */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              High-Volume Payment Corridors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Direct routes with sub-second execution and up to 92% fee reduction.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
            Real-Time Settlement
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAYMENT_CORRIDORS.map((corridor) => (
            <div
              key={corridor.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Route visual */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{corridor.fromFlag}</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{corridor.fromCountry}</span>
                  </div>

                  <div className="flex-1 mx-3 border-t-2 border-dashed border-cyan-500/40 relative">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0052FF] flex items-center justify-center text-[9px] text-white">
                      →
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{corridor.toFlag}</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{corridor.toCountry}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Settlement Speed</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{corridor.speed}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Fee Savings</div>
                    <div className="font-bold text-[#0052FF] dark:text-cyan-400 mt-0.5">
                      Save ~{corridor.feeSavedPercent}% vs SWIFT
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-slate-400">
                  {corridor.routeType.replace('-', ' → ')}
                </span>
                <button
                  onClick={() => navigateTo('get-started')}
                  className="text-xs font-bold text-[#0052FF] dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Send via this route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Countries Directory */}
      <div className="bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              180+ Supported Countries & Territories
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Send, receive, and spend in local domestic currencies without borders.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Europe', 'Americas', 'Asia-Pacific', 'Middle East & Africa'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[#0052FF] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGIONAL_COUNTRIES.filter((r) => selectedRegion === 'All' || r.region === selectedRegion).map((reg) => (
            <div key={reg.region} className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                {reg.region}
              </h4>
              <ul className="space-y-1.5">
                {reg.countries.map((c) => (
                  <li key={c} className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Looking for a specific jurisdiction or regulatory clearance? All 180+ regions are supported in the GlobalPay app.
          </div>
          <button
            onClick={() => navigateTo('get-started')}
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0052FF] to-[#00D2B4] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Open Global Account • Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
