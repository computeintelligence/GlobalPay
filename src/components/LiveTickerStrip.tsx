import React from 'react';
import { SUPPORTED_CURRENCIES } from '../data/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const LiveTickerStrip: React.FC = () => {
  const tickerItems = [
    ...SUPPORTED_CURRENCIES.filter((c) => c.popular),
    ...SUPPORTED_CURRENCIES.filter((c) => c.popular), // duplicate for continuous seamless scroll effect
  ];

  return (
    <div
      id="live-rates-ticker-strip"
      className="w-full bg-slate-100/90 dark:bg-[#020919] border-y border-slate-200/80 dark:border-slate-800/80 py-2.5 overflow-hidden select-none"
    >
      <div className="flex items-center gap-8 animate-none overflow-x-auto no-scrollbar scroll-smooth px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-slate-300 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live FX & Crypto:</span>
        </div>

        <div className="flex items-center gap-6 shrink-0 flex-nowrap">
          {tickerItems.slice(0, 12).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs shrink-0 font-medium">
              <span className="text-sm">{item.icon}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{item.code}</span>
              <span className="text-slate-500 dark:text-slate-400">
                {item.type === 'crypto'
                  ? `$${item.rateToUSD.toLocaleString()}`
                  : `$${item.rateToUSD.toFixed(3)}`}
              </span>
              <span
                className={`flex items-center text-[10px] font-bold ${
                  item.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                {item.change24h >= 0 ? '+' : ''}
                {item.change24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
