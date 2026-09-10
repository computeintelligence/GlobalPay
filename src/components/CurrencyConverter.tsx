import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, Smartphone, TrendingUp, Info, Check, ShieldCheck, ArrowRight, Zap, QrCode } from 'lucide-react';
import { SUPPORTED_CURRENCIES } from '../data/mockData';
import { CurrencyItem } from '../types';

interface CurrencyConverterProps {
  onOpenGetApp: () => void;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ onOpenGetApp }) => {
  const [sendAmount, setSendAmount] = useState<number>(1000);
  const [fromCode, setFromCode] = useState<string>('USD');
  const [toCode, setToCode] = useState<string>('EUR');
  const [filterType, setFilterType] = useState<'all' | 'fiat' | 'crypto'>('all');

  const fromCurrency = useMemo(
    () => SUPPORTED_CURRENCIES.find((c) => c.code === fromCode) || SUPPORTED_CURRENCIES[0],
    [fromCode]
  );

  const toCurrency = useMemo(
    () => SUPPORTED_CURRENCIES.find((c) => c.code === toCode) || SUPPORTED_CURRENCIES[1],
    [toCode]
  );

  // Conversion logic:
  // fromAmount * fromCurrency.rateToUSD = USD value
  // USD value / toCurrency.rateToUSD = toAmount
  const exchangeRate = useMemo(() => {
    return fromCurrency.rateToUSD / toCurrency.rateToUSD;
  }, [fromCurrency, toCurrency]);

  const receivedAmount = useMemo(() => {
    return sendAmount * exchangeRate;
  }, [sendAmount, exchangeRate]);

  // Traditional bank fee simulation (typically 3.5% FX markup + $25 flat international wire fee)
  const traditionalBankMarkup = 0.038;
  const traditionalFlatWire = 25;
  const traditionalBankNetUSD = Math.max(0, sendAmount * fromCurrency.rateToUSD * (1 - traditionalBankMarkup) - traditionalFlatWire);
  const traditionalBankReceived = traditionalBankNetUSD / toCurrency.rateToUSD;
  const savingsAmount = Math.max(0, receivedAmount - traditionalBankReceived);
  const savingsPercent = Math.min(94, Math.round(((receivedAmount - traditionalBankReceived) / receivedAmount) * 100) || 75);

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const filteredCurrencies = useMemo(() => {
    if (filterType === 'all') return SUPPORTED_CURRENCIES;
    return SUPPORTED_CURRENCIES.filter((c) => c.type === filterType);
  }, [filterType]);

  const quickPillCodes = ['USD', 'EUR', 'GBP', 'BTC', 'ETH', 'SOL', 'USDT', 'JPY'];

  return (
    <section id="rates" className="py-16 md:py-24 bg-slate-50/50 dark:bg-[#040E24]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-[#0066FF] dark:text-cyan-400" />
            <span>Real-Time Mid-Market Rates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Transparent Currency & Crypto Exchange
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Check live conversion rates across 150+ fiat currencies and 40+ cryptocurrencies. No inflated margins, no predatory wire charges.
          </p>
        </div>

        {/* Converter Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: The Converter Calculator Card */}
          <div className="lg:col-span-7 bg-white dark:bg-[#07132B] rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
            
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0052FF] via-[#00D2B4] to-[#10DF62]" />

            {/* Quick Filter Selection */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800/80 flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Rate Calculator
              </span>
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                    filterType === 'all'
                      ? 'bg-white dark:bg-slate-800 text-[#0052FF] dark:text-cyan-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  All (190+)
                </button>
                <button
                  onClick={() => setFilterType('fiat')}
                  className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                    filterType === 'fiat'
                      ? 'bg-white dark:bg-slate-800 text-[#0052FF] dark:text-cyan-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Fiat Currencies
                </button>
                <button
                  onClick={() => setFilterType('crypto')}
                  className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                    filterType === 'crypto'
                      ? 'bg-white dark:bg-slate-800 text-[#0052FF] dark:text-cyan-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Crypto Assets
                </button>
              </div>
            </div>

            {/* Input Box 1: You Send */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                <span>You Send</span>
                <span>Source Balance</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <input
                  id="send-amount-input"
                  type="number"
                  min="1"
                  step="any"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full text-2xl sm:text-3xl font-extrabold bg-transparent text-slate-900 dark:text-white focus:outline-none"
                />
                
                {/* Currency Selector */}
                <select
                  id="from-currency-select"
                  aria-label="Select source currency"
                  value={fromCode}
                  onChange={(e) => setFromCode(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  {filteredCurrencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.icon} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button & Rate Indicator */}
            <div className="flex items-center justify-between my-3 px-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">
                  1 {fromCurrency.code} = {exchangeRate < 0.001 ? exchangeRate.toFixed(6) : exchangeRate.toFixed(4)} {toCurrency.code}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold">
                  Mid-Market
                </span>
              </div>

              <button
                id="swap-currencies-btn"
                onClick={handleSwap}
                aria-label="Swap currencies"
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0052FF] dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-transform active:rotate-180 duration-300"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Input Box 2: Recipient Gets */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                <span>Recipient Gets (Guaranteed in App)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">0% Hidden FX Spread</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 truncate">
                  {toCurrency.type === 'crypto'
                    ? receivedAmount < 0.01
                      ? receivedAmount.toFixed(6)
                      : receivedAmount.toFixed(4)
                    : receivedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                {/* Currency Selector */}
                <select
                  id="to-currency-select"
                  aria-label="Select recipient currency"
                  value={toCode}
                  onChange={(e) => setToCode(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                >
                  {filteredCurrencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.icon} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Currency Selection Chips */}
            <div className="mt-4 flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400 font-medium mr-1">Popular:</span>
              {quickPillCodes.map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    if (code === fromCode) {
                      setToCode('USD');
                    } else {
                      setToCode(code);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    toCode === code
                      ? 'bg-[#0052FF] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Fee Transparency Breakdown */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>GlobalPay Transfer Fee (App):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">$0.00 (Free between users)</span>
              </div>
              <div className="flex justify-between">
                <span>Guaranteed Delivery Speed:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Instant to &lt; 60 seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Bank Wire Equivalent:</span>
                <span className="line-through text-rose-500">
                  ≈ {(sendAmount * traditionalBankMarkup + traditionalFlatWire).toFixed(2)} USD in fees
                </span>
              </div>
            </div>

            {/* Trigger CTA pointing user to mobile app */}
            <div className="mt-6">
              <button
                id="converter-get-app-btn"
                onClick={onOpenGetApp}
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <Smartphone className="w-5 h-5" />
                <span>Send {sendAmount} {fromCode} in the GlobalPay App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2">
                🔒 Transfers and exchanges are cryptographically secured inside the mobile app.
              </p>
            </div>

          </div>

          {/* Right Column: Comparative Value & QR Preview */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Savings Callout Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#002B7A] via-[#0047BA] to-[#0070FF] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-cyan-200 text-xs font-semibold backdrop-blur-xs mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Cost Efficiency Benchmark</span>
                </div>
                <h3 className="text-2xl font-black">
                  Save up to {savingsPercent}% vs Traditional Bank Wires
                </h3>
                <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                  Traditional banks bury 3% to 6% in obscured exchange rate spreads and tack on $25–$50 intermediary fees. GlobalPay gives you interbank liquidity straight to your mobile wallet.
                </p>

                <div className="mt-5 p-3.5 bg-black/20 rounded-2xl border border-white/10 backdrop-blur-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200">GlobalPay P2P Rate:</span>
                    <span className="font-bold text-emerald-300">100% Transparent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200">Settlement Finality:</span>
                    <span className="font-bold text-white">Under 60 Seconds</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200">Crypto Swaps:</span>
                    <span className="font-bold text-cyan-200">Instant In-App Engine</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick App Scan Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-md flex items-center gap-5">
              <div className="p-3 bg-slate-900 text-white rounded-2xl shrink-0 shadow-inner flex items-center justify-center">
                <QrCode className="w-16 h-16 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#0052FF] dark:text-cyan-400">
                  Ready to Transfer?
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                  Scan to Install the App
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Open your camera to download GlobalPay for iOS or Android. Available in 180+ countries.
                </p>
                <button
                  id="card-open-get-app-modal"
                  onClick={onOpenGetApp}
                  className="mt-2 text-xs font-bold text-[#0052FF] dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>More download options</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
