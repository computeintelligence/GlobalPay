import React, { useState } from 'react';
import {
  ArrowRight,
  Zap,
  Globe,
  Sparkles,
  Check,
  RefreshCw,
  CreditCard,
  ChevronRight,
  Landmark,
  Lock,
  Cpu,
  Coins,
  ArrowUpRight,
  TrendingUp,
  Building2,
  Users,
  Smartphone,
  Star,
  CheckCircle2
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { SUPPORTED_CURRENCIES, TRUST_STATS, PAYMENT_CORRIDORS } from '../data/mockData';
import { LiveTickerStrip } from '../components/LiveTickerStrip';

export const HomePage: React.FC = () => {
  const { navigateTo } = useNavigation();

  // Quick interactive exchange simulator in hero
  const [calcAmount, setCalcAmount] = useState('2500');
  const [calcFrom, setCalcFrom] = useState('USD');
  const [calcTo, setCalcTo] = useState('EUR');

  // Interactive Card Tier selector
  const [selectedCardTier, setSelectedCardTier] = useState<'virtual' | 'metal' | 'emerald'>('metal');

  const fromCurr = SUPPORTED_CURRENCIES.find((c) => c.code === calcFrom) || SUPPORTED_CURRENCIES[0];
  const toCurr = SUPPORTED_CURRENCIES.find((c) => c.code === calcTo) || SUPPORTED_CURRENCIES[1];

  const amountNum = parseFloat(calcAmount) || 0;
  const fromUsdVal = amountNum * fromCurr.rateToUSD;
  const convertedVal = toCurr.rateToUSD > 0 ? fromUsdVal / toCurr.rateToUSD : 0;
  const transparentFee = fromUsdVal * 0.0035; // 0.35%
  const bankMarkupFee = fromUsdVal * 0.038 + 35; // ~3.8% + $35 wire
  const totalSavings = Math.max(0, bankMarkupFee - transparentFee);

  return (
    <div className="pt-24 md:pt-28 pb-16 overflow-hidden">
      
      {/* 1. Pro Level Fintech Hero */}
      <section className="relative pt-6 pb-20 md:py-24">
        {/* Luminous Brand Glow Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-[#0052FF]/10 via-[#00D2B4]/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-1/4 right-5 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-1/3 left-5 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Eyebrow Strip */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10DF62] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-cyan-300">
                Next-Gen Global Financial Infrastructure
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Bold Copy & Direct Account Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                The Global Financial Account For{' '}
                <span className="bg-gradient-to-r from-[#0052FF] via-[#00C4C8] to-[#10DF62] bg-clip-text text-transparent">
                  Borderless Living.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Manage 150+ currencies and digital assets in a single verified account. Receive local IBANs, convert at real mid-market exchange rates, and spend globally with zero foreign transaction fees.
              </p>

              {/* Action Buttons: Get Started & Live Rates */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-primary-get-started-btn"
                  onClick={() => navigateTo('get-started')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-explore-rates-btn"
                  onClick={() => navigateTo('rates')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-base text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#0052FF] dark:text-cyan-400" />
                  <span>Explore Live Rates</span>
                </button>
              </div>

              {/* Verified Value Micro Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>2-minute setup</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No monthly maintenance fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>$1,000 welcome credit</span>
                </div>
              </div>

              {/* High Impact Metrics Row */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-5">
                {TRUST_STATS.map((stat, idx) => (
                  <div key={idx} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Interactive Real-Time FX Calculator Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-[#07132B] rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-2xl relative">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Live Mid-Market Exchange
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-[#0052FF] dark:text-cyan-400">
                    Real Time FX
                  </span>
                </div>

                {/* From Input */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    <span>You Send</span>
                    <span>1 {calcFrom} ≈ ${(fromCurr.rateToUSD).toFixed(3)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(e.target.value)}
                      className="w-full bg-transparent font-mono text-2xl font-black text-slate-900 dark:text-white focus:outline-none"
                    />
                    <select
                      value={calcFrom}
                      onChange={(e) => setCalcFrom(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white"
                    >
                      <option value="USD">🇺🇸 USD</option>
                      <option value="EUR">🇪🇺 EUR</option>
                      <option value="GBP">🇬🇧 GBP</option>
                      <option value="USDT">₮ USDT</option>
                      <option value="BTC">₿ BTC</option>
                      <option value="AUD">🇦🇺 AUD</option>
                    </select>
                  </div>
                </div>

                {/* Mid-Market Route Info */}
                <div className="py-3 px-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-l-2 border-[#0052FF] my-2 ml-4">
                  <div className="space-y-0.5">
                    <div>
                      GlobalPay transparent fee (0.35%):{' '}
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        ${transparentFee.toFixed(2)}
                      </strong>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Typical bank wire markup saved: <strong className="text-slate-700 dark:text-slate-200">~${totalSavings.toFixed(2)}</strong>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const temp = calcFrom;
                      setCalcFrom(calcTo);
                      setCalcTo(temp);
                    }}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#0052FF] transition-colors cursor-pointer"
                    title="Swap directions"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* To Input */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    <span>Recipient Receives</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Guaranteed Rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-full font-mono text-2xl font-black text-slate-900 dark:text-white">
                      {toCurr.type === 'crypto'
                        ? convertedVal.toFixed(4)
                        : convertedVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <select
                      value={calcTo}
                      onChange={(e) => setCalcTo(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white"
                    >
                      <option value="EUR">🇪🇺 EUR</option>
                      <option value="USD">🇺🇸 USD</option>
                      <option value="GBP">🇬🇧 GBP</option>
                      <option value="USDT">₮ USDT</option>
                      <option value="BTC">₿ BTC</option>
                      <option value="SGD">🇸🇬 SGD</option>
                      <option value="JPY">🇯🇵 JPY</option>
                    </select>
                  </div>
                </div>

                {/* Instant Action Button */}
                <button
                  id="hero-widget-get-started-btn"
                  onClick={() => navigateTo('get-started')}
                  className="mt-5 w-full py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Started with this Rate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-3 text-center text-[11px] text-slate-400">
                  Instant settlement via SEPA Instant, FedNow, or Polygon rails.
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Live Rates Ticker Strip */}
      <LiveTickerStrip />

      {/* 3. Global Rails & Institutional Clearing Partners Bar */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#020713]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
            Connected to Tier-1 Financial Clearing Rails & Digital Networks
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 dark:opacity-60 grayscale hover:grayscale-0 transition-all text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><Landmark className="w-4 h-4" /> SEPA Instant</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> US FedNow</span>
            <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> Faster Payments UK</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Pix Brazil</span>
            <span className="flex items-center gap-1.5"><Coins className="w-4 h-4" /> Arbitrum & Polygon</span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> Fireblocks MPC</span>
          </div>
        </div>
      </section>

      {/* 4. Core Pillars / Bento Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-950/50 text-[#0052FF] dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200/60 dark:border-cyan-800/60">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full-Stack Global Finance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              One Unified Account. Infinite Global Reach.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Traditional banking and high-velocity crypto exchange brought together with bank-grade security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#0052FF] dark:text-cyan-400 flex items-center justify-center mb-6">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Multi-Currency IBANs
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Get personal and business account numbers in USD, EUR, GBP, AUD, and CAD. Receive wires and salaries like a local resident anywhere in the world.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#0052FF] dark:text-cyan-400">
                <span>0% incoming wire fee</span>
                <button onClick={() => navigateTo('features')} className="flex items-center gap-1 hover:underline cursor-pointer">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#00D2B4]/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-[#00D2B4] flex items-center justify-center mb-6">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Sub-Second Crypto Engine
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Swap BTC, ETH, SOL, USDT, and USDC directly into fiat balances in under a second. Spend your crypto yields anywhere Visa and Mastercard are accepted.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Zero slippage liquidity</span>
                <button onClick={() => navigateTo('features')} className="flex items-center gap-1 hover:underline cursor-pointer text-[#0052FF] dark:text-cyan-400">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mb-6">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Contactless Metal Cards
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Precision-milled 18g stainless steel contactless cards. Spend in 150+ currencies with automatic real-time conversion at mid-market rates and 1.5% cashback.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#0052FF] dark:text-cyan-400">
                <span>Apple Pay & Google Pay</span>
                <button onClick={() => navigateTo('pricing')} className="flex items-center gap-1 hover:underline cursor-pointer">
                  <span>View Card Tiers</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Interactive Card Showcase Section */}
      <section className="py-16 bg-slate-50/70 dark:bg-[#020713]/80 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Card Tier Options */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-cyan-300">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Global Contactless Physical & Virtual Cards</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Spend in 150+ Countries With Zero Hidden Markups.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Whether you prefer an instant digital card on Apple Wallet or a solid laser-engraved stainless steel metal card, GlobalPay eliminates predatory foreign transaction fees.
              </p>

              {/* Tiers Switcher */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setSelectedCardTier('virtual')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedCardTier === 'virtual'
                      ? 'border-[#0052FF] bg-white dark:bg-[#07132B] shadow-md ring-2 ring-[#0052FF]/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">Instant Virtual Card</div>
                    <div className="text-xs text-slate-500">Ready in 30 seconds. Connect to Apple Pay & Google Wallet.</div>
                  </div>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">Included Free</span>
                </button>

                <button
                  onClick={() => setSelectedCardTier('metal')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedCardTier === 'metal'
                      ? 'border-cyan-500 bg-white dark:bg-[#07132B] shadow-md ring-2 ring-cyan-400/40'
                      : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">Matte Black 18g Metal</div>
                    <div className="text-xs text-slate-500">Solid brushed stainless steel, 1.5% crypto cashback, lounge access.</div>
                  </div>
                  <span className="text-xs font-black text-[#0052FF] dark:text-cyan-400">Metal Pro</span>
                </button>

                <button
                  onClick={() => setSelectedCardTier('emerald')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedCardTier === 'emerald'
                      ? 'border-emerald-500 bg-white dark:bg-[#07132B] shadow-md ring-2 ring-emerald-400/40'
                      : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">Emerald Elite Commercial Card</div>
                    <div className="text-xs text-slate-500">Multi-employee cards, automated receipts, higher ATM limits.</div>
                  </div>
                  <span className="text-xs font-black text-emerald-500">Business</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  id="cards-get-started-btn"
                  onClick={() => navigateTo('get-started')}
                  className="px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] to-[#00D2B4] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Order Your Card • Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right: Card Render */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                className={`w-full max-w-md aspect-[1.58/1] rounded-3xl p-7 text-white shadow-2xl relative overflow-hidden transition-all duration-500 flex flex-col justify-between ${
                  selectedCardTier === 'virtual'
                    ? 'bg-gradient-to-tr from-[#0052FF] via-[#0084FF] to-[#00D2B4]'
                    : selectedCardTier === 'metal'
                    ? 'bg-gradient-to-tr from-[#030A19] via-[#0C1E45] to-[#122B60] border border-cyan-400/40 shadow-cyan-900/40'
                    : 'bg-gradient-to-tr from-[#021815] via-[#063327] to-[#0B5C40] border border-emerald-400/40 shadow-emerald-900/40'
                }`}
              >
                {/* Chip & Logo */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-inner flex items-center justify-center border border-amber-200/40">
                    <div className="w-7 h-5 border border-amber-900/50 rounded-xs" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black tracking-widest text-cyan-200">GLOBALPAY</div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-300">
                      {selectedCardTier === 'virtual' ? 'Virtual Debit' : selectedCardTier === 'metal' ? 'Metal Pro' : 'Commercial Elite'}
                    </div>
                  </div>
                </div>

                {/* Card Number */}
                <div className="my-3">
                  <div className="font-mono text-xl sm:text-2xl tracking-widest font-bold drop-shadow-md">
                    •••• •••• •••• 8921
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-400">Cardholder</div>
                    <div className="font-bold tracking-wider text-sm">ALEX VANCE</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-widest text-slate-400">Valid Thru</div>
                    <div className="font-bold text-sm">09/29</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-rose-500/80 -mr-3" />
                    <div className="w-7 h-7 rounded-full bg-amber-500/80" />
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. High-Converting Bottom Banner */}
      <section className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-14 rounded-[36px] bg-gradient-to-br from-[#021844] via-[#052668] to-[#043485] text-white shadow-2xl border border-cyan-500/30 relative overflow-hidden text-center max-w-5xl mx-auto">
            
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#00D2B4]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#10DF62]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-cyan-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ready to Go Borderless?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Open Your GlobalPay Account in Under 2 Minutes.
              </h2>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Join over 3.4 million individuals and companies who send money globally, manage 150+ currencies, and invest in digital assets without predatory banking markups.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  id="bottom-banner-get-started-btn"
                  onClick={() => navigateTo('get-started')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base text-slate-950 bg-gradient-to-r from-cyan-300 via-emerald-300 to-green-400 hover:opacity-95 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('pricing')}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
                >
                  <span>Compare Plans & Perks</span>
                </button>
              </div>

              <div className="text-xs text-blue-200 pt-2 flex items-center justify-center gap-3">
                <span>✓ Zero credit check</span>
                <span>•</span>
                <span>✓ Instant virtual card</span>
                <span>•</span>
                <span>✓ Free $1,000 welcome credit</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
