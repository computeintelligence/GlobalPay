import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  Coins
} from 'lucide-react';
import { SUPPORTED_CURRENCIES } from '../data/mockData';
import { CurrencyItem } from '../types';
import { useNavigation } from '../context/NavigationContext';

export const RatesPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'fiat' | 'crypto' | 'popular'>('all');

  // Interactive Live Swap Box
  const [amount, setAmount] = useState('1000');
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');

  const fromCurrency = SUPPORTED_CURRENCIES.find((c) => c.code === fromCode) || SUPPORTED_CURRENCIES[0];
  const toCurrency = SUPPORTED_CURRENCIES.find((c) => c.code === toCode) || SUPPORTED_CURRENCIES[1];

  const parsedAmount = parseFloat(amount) || 0;
  const inUSD = parsedAmount * fromCurrency.rateToUSD;
  const outputAmount = toCurrency.rateToUSD > 0 ? inUSD / toCurrency.rateToUSD : 0;
  const transparentFee = inUSD * 0.0035; // 0.35%
  const traditionalBankFee = inUSD * 0.039 + 35; // 3.9% spread + $35 wire
  const savedAmount = Math.max(0, traditionalBankFee - transparentFee);

  const filteredCurrencies = SUPPORTED_CURRENCIES.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterType === 'fiat') return c.type === 'fiat';
    if (filterType === 'crypto') return c.type === 'crypto';
    if (filterType === 'popular') return c.popular === true;
    return true;
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-950/50 text-[#0052FF] dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200/60 dark:border-cyan-800/60">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real Mid-Market Data Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Live Exchange Rates & Currency Terminal
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          GlobalPay charges zero hidden FX markups. We exchange at real mid-market rates with complete transparency.
        </p>
      </div>

      {/* Main Converter Terminal Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-xl mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Simulate Instant Transfer & Conversion
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* You Send */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 font-semibold mb-1">You Send</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent font-mono text-2xl font-black text-slate-900 dark:text-white focus:outline-none"
                  />
                  <select
                    value={fromCode}
                    onChange={(e) => setFromCode(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm text-slate-900 dark:text-white"
                  >
                    {SUPPORTED_CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.icon} {c.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Recipient Gets */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 font-semibold mb-1">Recipient Gets</div>
                <div className="flex items-center gap-2">
                  <div className="w-full font-mono text-2xl font-black text-slate-900 dark:text-white">
                    {toCurrency.type === 'crypto'
                      ? outputAmount.toFixed(4)
                      : outputAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <select
                    value={toCode}
                    onChange={(e) => setToCode(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm text-slate-900 dark:text-white"
                  >
                    {SUPPORTED_CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.icon} {c.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span>Real Mid-Market Rate:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  1 {fromCode} = {(toCurrency.rateToUSD > 0 ? fromCurrency.rateToUSD / toCurrency.rateToUSD : 0).toFixed(4)} {toCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Transparent GlobalPay Fee (0.35%):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ${transparentFee.toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Bank Markup Fee:</span>
                <span className="text-rose-500 font-semibold line-through">
                  ${traditionalBankFee.toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-blue-200/50 dark:border-slate-800 font-bold">
                <span className="text-emerald-600 dark:text-emerald-400">You Save With GlobalPay:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">
                  +${savedAmount.toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>

          {/* Action CTA box */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left space-y-4 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-6 lg:pt-0">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Lock In This Exchange Rate
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Open your GlobalPay account today to enjoy guaranteed mid-market rates and instant settlement to 180+ countries.
            </p>
            <button
              onClick={() => navigateTo('get-started')}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Get Started & Transfer Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] text-slate-400 text-center">
              Settles via SEPA Instant, FedNow, or Polygon in seconds.
            </div>
          </div>

        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 150+ currencies or crypto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#07132B] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
          {(['all', 'fiat', 'crypto', 'popular'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl font-bold capitalize transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-white dark:bg-[#07132B] text-[#0052FF] dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Currency Table */}
      <div className="bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/80 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="py-4 px-6">Asset / Currency</th>
                <th className="py-4 px-4">Rate (USD)</th>
                <th className="py-4 px-4">24h Change</th>
                <th className="py-4 px-4 hidden md:table-cell">Type</th>
                <th className="py-4 px-4 hidden lg:table-cell">Network / Clearing</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCurrencies.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl">{c.icon}</span>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {c.code}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {c.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {c.type === 'crypto'
                      ? `$${c.rateToUSD.toLocaleString()}`
                      : `$${c.rateToUSD.toFixed(3)}`}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 font-bold text-xs ${
                        c.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {c.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span>{c.change24h >= 0 ? '+' : ''}{c.change24h.toFixed(2)}%</span>
                    </span>
                  </td>

                  <td className="py-4 px-4 hidden md:table-cell">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.type === 'crypto'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {c.type}
                    </span>
                  </td>

                  <td className="py-4 px-4 hidden lg:table-cell text-xs text-slate-500 dark:text-slate-400">
                    {c.network || 'Tier-1 Central Bank Rails'}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => navigateTo('get-started')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#0052FF] dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-950/40 border border-blue-200 dark:border-cyan-900 transition-colors cursor-pointer"
                    >
                      Exchange • Get Started
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
