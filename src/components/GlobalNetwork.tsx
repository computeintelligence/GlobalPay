import React, { useState } from 'react';
import { Globe, ArrowRight, Zap, CheckCircle2, Shield, Smartphone } from 'lucide-react';
import { PAYMENT_CORRIDORS } from '../data/mockData';
import { PaymentCorridor } from '../types';

interface GlobalNetworkProps {
  onOpenGetApp: () => void;
}

export const GlobalNetwork: React.FC<GlobalNetworkProps> = ({ onOpenGetApp }) => {
  const [selectedCorridor, setSelectedCorridor] = useState<PaymentCorridor>(PAYMENT_CORRIDORS[0]);

  return (
    <section id="network" className="py-20 md:py-28 bg-slate-50/70 dark:bg-[#030B1B]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/50 text-[#0052FF] dark:text-cyan-300 text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>180+ Countries • 0 Border Delays</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Next-Generation Global Rail Network
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            By combining high-speed local banking clearing systems with liquid layer-1 crypto settlement rails, GlobalPay delivers funds in seconds rather than business days.
          </p>
        </div>

        {/* Global Network Map Graphic & Interactive Corridors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Corridors List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Select High-Volume Global Corridors
            </h3>

            {PAYMENT_CORRIDORS.map((corridor) => {
              const isSelected = corridor.id === selectedCorridor.id;
              return (
                <div
                  key={corridor.id}
                  onClick={() => setSelectedCorridor(corridor)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#07132B] border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-500/20'
                      : 'bg-white/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                      <span>{corridor.fromFlag} {corridor.fromCode}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span>{corridor.toFlag} {corridor.toCode}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      Save {corridor.feeSavedPercent}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#0052FF] dark:text-cyan-400" />
                      <span>Speed: {corridor.speed}</span>
                    </span>
                    <span className="text-[11px] capitalize text-slate-400">
                      {corridor.fromCountry} to {corridor.toCountry}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <button
                onClick={onOpenGetApp}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Access all 2,400+ corridors in the app</span>
              </button>
            </div>
          </div>

          {/* Right Column: World Map Visualizer with Animated Node Arcs */}
          <div className="lg:col-span-7 bg-[#020B1C] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4 text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>GLOBALPAY CORRIDOR ACTIVE: {selectedCorridor.fromCode} → {selectedCorridor.toCode}</span>
              </div>
              <span className="text-slate-400 text-[11px]">Average speed: {selectedCorridor.speed}</span>
            </div>

            {/* SVG Stylized World Map with Nodes & Pulses */}
            <div className="relative w-full aspect-[16/9] flex items-center justify-center">
              <svg
                viewBox="0 0 800 450"
                className="w-full h-full opacity-90 select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Arc Gradient */}
                  <linearGradient id="routeArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#0052FF" />
                    <stop offset="50%" stop-color="#00E5FF" />
                    <stop offset="100%" stop-color="#10DF62" />
                  </linearGradient>

                  <filter id="nodeGlow">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#00E5FF" flood-opacity="0.8" />
                  </filter>
                </defs>

                {/* Stylized Landmass Dotted Clusters */}
                <g fill="#1E293B" opacity="0.6">
                  {/* North America */}
                  <path d="M 120,110 Q 180,80 240,110 Q 230,190 190,220 Q 130,170 120,110 Z" />
                  {/* South America */}
                  <path d="M 230,240 Q 280,250 260,340 Q 220,380 210,310 Q 210,260 230,240 Z" />
                  {/* Europe */}
                  <path d="M 380,100 Q 450,90 470,140 Q 430,180 380,160 Q 370,120 380,100 Z" />
                  {/* Africa */}
                  <path d="M 390,190 Q 480,190 460,300 Q 410,340 390,270 Q 380,220 390,190 Z" />
                  {/* Asia */}
                  <path d="M 480,100 Q 640,70 690,170 Q 620,230 520,200 Q 480,150 480,100 Z" />
                  {/* Australia */}
                  <path d="M 620,290 Q 690,280 700,340 Q 640,370 610,330 Q 610,300 620,290 Z" />
                </g>

                {/* Major Global Node Coordinates:
                    New York: (210, 150)
                    London: (400, 125)
                    Frankfurt: (425, 130)
                    Tokyo: (670, 160)
                    Singapore: (590, 240)
                    Sao Paulo: (260, 310)
                    Dubai: (495, 190)
                    Sydney: (680, 330)
                */}

                {/* Global Corridor Lines */}
                <path d="M 210,150 Q 305,80 400,125" stroke="url(#routeArcGrad)" strokeWidth="2.5" fill="none" strokeDasharray="6 4" className="animate-pulse" />
                <path d="M 400,125 Q 495,70 590,240" stroke="url(#routeArcGrad)" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M 425,130 Q 550,80 670,160" stroke="url(#routeArcGrad)" strokeWidth="2.5" fill="none" strokeDasharray="8 4" />
                <path d="M 210,150 Q 235,230 260,310" stroke="url(#routeArcGrad)" strokeWidth="2" fill="none" opacity="0.5" />
                <path d="M 495,190 Q 580,270 680,330" stroke="url(#routeArcGrad)" strokeWidth="2" fill="none" opacity="0.6" />

                {/* City Nodes */}
                {[
                  { name: 'New York', x: 210, y: 150 },
                  { name: 'London', x: 400, y: 125 },
                  { name: 'Frankfurt', x: 425, y: 130 },
                  { name: 'Dubai', x: 495, y: 190 },
                  { name: 'Singapore', x: 590, y: 240 },
                  { name: 'Tokyo', x: 670, y: 160 },
                  { name: 'Sao Paulo', x: 260, y: 310 },
                  { name: 'Sydney', x: 680, y: 330 },
                ].map((node) => (
                  <g key={node.name} transform={`translate(${node.x}, ${node.y})`}>
                    <circle r="6" fill="#0052FF" opacity="0.3" className="animate-ping" />
                    <circle r="3.5" fill="#00E5FF" filter="url(#nodeGlow)" />
                    <text y="14" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="600" fontFamily="sans-serif">
                      {node.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Bottom Real-Time Performance Metric Strip */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-[10px] text-slate-400">Settlement Finality</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">Sub-Minute</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Intermediary Banks</div>
                <div className="text-sm font-bold text-white mt-0.5">0 (Direct Rails)</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Supported Currencies</div>
                <div className="text-sm font-bold text-cyan-400 mt-0.5">150+ Fiat & 40+ Crypto</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
