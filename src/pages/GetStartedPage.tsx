import React, { useState } from 'react';
import {
  UserCheck,
  Building2,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  Sparkles,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Check,
  Send,
  PlusCircle,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import { useNavigation } from '../context/NavigationContext';

const POPULAR_COUNTRIES = [
  { name: 'United States', code: 'US', flag: '🇺🇸', currency: 'USD' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', currency: 'GBP' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', currency: 'EUR' },
  { name: 'France', code: 'FR', flag: '🇫🇷', currency: 'EUR' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', currency: 'CAD' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', currency: 'AUD' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬', currency: 'SGD' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', currency: 'JPY' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭', currency: 'CHF' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', currency: 'AED' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷', currency: 'BRL' },
  { name: 'India', code: 'IN', flag: '🇮🇳', currency: 'INR' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', currency: 'EUR' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱', currency: 'EUR' },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽', currency: 'MXN' },
];

export const GetStartedPage: React.FC = () => {
  const { currentUser, accounts, createAccount, signIn, signOut, depositFunds, sendFunds, toggleCardFreeze } = useAccount();
  const { navigateTo } = useNavigation();

  // Mode: 'register' | 'signin'
  const [authMode, setAuthMode] = useState<'register' | 'signin'>('register');

  // Registration Form State
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [tier, setTier] = useState<'standard' | 'metal' | 'business'>('metal');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('United States');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [phone, setPhone] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInError, setSignInError] = useState('');

  // Creation loading simulation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState('');

  // Dashboard modal states
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('500');
  const [depositCurrency, setDepositCurrency] = useState('USD');
  const [depositSuccess, setDepositSuccess] = useState(false);

  const [isSendOpen, setIsSendOpen] = useState(false);
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('150');
  const [sendCurrency, setSendCurrency] = useState('USD');
  const [sendNote, setSendNote] = useState('Invoice payment');
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  // Card view state
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setSubmitStep('Verifying applicant identity with automated KYC...');

    setTimeout(() => {
      setSubmitStep('Generating dedicated multi-currency IBAN & routing codes...');
    }, 700);

    setTimeout(() => {
      setSubmitStep('Activating biometric hardware enclave & digital card...');
    }, 1400);

    setTimeout(() => {
      createAccount({
        fullName,
        email,
        accountType,
        companyName: accountType === 'business' ? companyName : undefined,
        tier,
        country,
        baseCurrency,
        phone: phone || '+1 (555) 000-1234',
        password,
      });
      setIsSubmitting(false);
    }, 2100);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');
    if (!signInEmail) return;

    const success = signIn(signInEmail);
    if (!success) {
      setSignInError('No account found with this email. Please create a new account or check demo accounts.');
    }
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(depositAmount);
    if (isNaN(val) || val <= 0) return;

    depositFunds(depositCurrency, val);
    setDepositSuccess(true);
    setTimeout(() => {
      setDepositSuccess(false);
      setIsDepositOpen(false);
    }, 1200);
  };

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSendError('');
    const val = parseFloat(sendAmount);
    if (isNaN(val) || val <= 0) {
      setSendError('Please enter a valid amount.');
      return;
    }
    if (!sendRecipient) {
      setSendError('Please enter a recipient email, phone, or GlobalPay Tag.');
      return;
    }

    const success = sendFunds(sendRecipient, sendCurrency, val, sendNote);
    if (!success) {
      setSendError('Insufficient funds in your ' + sendCurrency + ' balance.');
      return;
    }

    setSendSuccess(true);
    setTimeout(() => {
      setSendSuccess(false);
      setIsSendOpen(false);
      setSendRecipient('');
    }, 1200);
  };

  // If user is logged in, show the live Account Dashboard
  if (currentUser) {
    const totalUSDValue = (Object.entries(currentUser.balances) as [string, number][]).reduce(
      (sum: number, [curr, amt]: [string, number]): number => {
        const val = Number(amt) || 0;
        if (curr === 'USD' || curr === 'USDT' || curr === 'USDC') return sum + val;
        if (curr === 'EUR') return sum + val * 1.09;
        if (curr === 'GBP') return sum + val * 1.28;
        if (curr === 'BTC') return sum + val * 65400;
        if (curr === 'ETH') return sum + val * 3450;
        return sum + val;
      },
      0
    );

    return (
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-black tracking-wider uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Account Verified</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ID: {currentUser.id}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#0052FF]/10 text-[#0052FF] dark:text-cyan-300 font-bold uppercase">
                {currentUser.tier} Plan
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Welcome back, {currentUser.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Your multi-currency IBANs and contactless payment cards are active.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              id="dashboard-deposit-btn"
              onClick={() => setIsDepositOpen(true)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0052FF] to-[#00D2B4] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Funds</span>
            </button>

            <button
              id="dashboard-send-btn"
              onClick={() => setIsSendOpen(true)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Send className="w-4 h-4 text-[#0052FF] dark:text-cyan-400" />
              <span>Send Money</span>
            </button>

            <button
              id="dashboard-signout-btn"
              onClick={signOut}
              className="p-2.5 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Left 8 Cols: Net Worth + Currency Wallets + Bank Account Codes + Recent Transactions */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Total Balance Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#021844] via-[#052668] to-[#083b9c] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D2B4]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-200 mb-1">
                    Total Estimated Net Balance
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                    ${totalUSDValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-emerald-300 font-semibold mt-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Includes $1,000 welcome credit & verified reserves</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDepositOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                    <span>Deposit</span>
                  </button>
                  <button
                    onClick={() => setIsSendOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <ArrowUpRight className="w-4 h-4 text-cyan-300" />
                    <span>Transfer</span>
                  </button>
                </div>
              </div>

              {/* Multi-Currency Balances Pills */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Object.entries(currentUser.balances).map(([curr, bal]) => (
                  <div
                    key={curr}
                    className="p-3 rounded-2xl bg-black/25 backdrop-blur-xs border border-white/10"
                  >
                    <div className="text-[11px] font-bold text-slate-300">{curr}</div>
                    <div className="text-sm font-black text-white mt-0.5">
                      {typeof bal === 'number'
                        ? bal.toLocaleString(undefined, {
                            minimumFractionDigits: curr === 'BTC' || curr === 'ETH' ? 3 : 2,
                            maximumFractionDigits: curr === 'BTC' || curr === 'ETH' ? 4 : 2,
                          })
                        : bal}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dedicated Multi-Currency Clearing Details (IBAN, Routing) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Assigned Multi-Currency Bank Details
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Use these local coordinates to receive salary, wires, and client payments with 0% incoming fee.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#0052FF] dark:text-cyan-400 text-[11px] font-bold">
                  SEPA & FedNow Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* EUR / Global IBAN */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    <span>Global EUR IBAN (SEPA Instant)</span>
                    <button
                      onClick={() => handleCopy(currentUser.iban, 'iban')}
                      className="text-[#0052FF] dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'iban' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'iban' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                    {currentUser.iban}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Bank: GlobalPay EMI London (BIC: GPAYGB2L)</div>
                </div>

                {/* USD Routing & Account */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    <span>USD Account & Routing (ACH / FedNow)</span>
                    <button
                      onClick={() => handleCopy(`${currentUser.routingNumber} / ${currentUser.accountNumber}`, 'usd')}
                      className="text-[#0052FF] dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'usd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'usd' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                    {currentUser.accountNumber} <span className="text-slate-400 font-normal">| Routing:</span> {currentUser.routingNumber}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Bank: JPMorgan Chase NA Partner Rails</div>
                </div>
              </div>
            </div>

            {/* Transactions Activity */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Recent Activity & Settlements
                </h3>
                <span className="text-xs text-slate-400">
                  {currentUser.transactions.length} Transactions
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {currentUser.transactions.map((tx) => (
                  <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                          tx.amount > 0
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : 'bg-blue-50 text-[#0052FF] dark:bg-blue-950/40 dark:text-cyan-400'
                        }`}
                      >
                        {tx.amount > 0 ? (
                          <ArrowDownLeft className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">
                          {tx.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {tx.counterparty} • {tx.date}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`font-mono text-sm font-bold ${
                          tx.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {tx.amount > 0 ? '+' : ''}
                        {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}{' '}
                        {tx.currency}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-500 uppercase">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right 4 Cols: Contactless Card & Quick Security Controls */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Interactive Physical / Virtual Card Preview */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0052FF] dark:text-cyan-400">
                  {currentUser.card.cardTier === 'metal' ? '18g Solid Metal Card' : 'Virtual Multi-Currency Card'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    currentUser.card.isFrozen
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {currentUser.card.isFrozen ? 'FROZEN' : 'ACTIVE'}
                </span>
              </div>

              {/* Card visual */}
              <div
                className={`w-full aspect-[1.58/1] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  currentUser.card.isFrozen
                    ? 'bg-slate-700 grayscale'
                    : currentUser.card.cardTier === 'metal'
                    ? 'bg-gradient-to-tr from-[#020B1C] via-[#0B1E48] to-[#12285E] border border-cyan-400/30'
                    : 'bg-gradient-to-tr from-[#0052FF] to-[#00D2B4]'
                }`}
              >
                {/* Chip and Contactless Wave */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-inner flex items-center justify-center border border-amber-200/40">
                    <div className="w-6 h-4 border border-amber-800/40 rounded-sm" />
                  </div>
                  <div className="text-right text-xs font-bold text-cyan-200 tracking-wider">
                    GLOBALPAY
                  </div>
                </div>

                {/* Card Number */}
                <div className="my-2">
                  <div className="font-mono text-base sm:text-lg tracking-widest font-semibold drop-shadow-md">
                    {showCardNumber
                      ? currentUser.card.cardNumber
                      : `•••• •••• •••• ${currentUser.card.cardNumber.slice(-4)}`}
                  </div>
                </div>

                {/* Expiry & Cardholder */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">Cardholder</div>
                    <div className="font-bold tracking-wider">{currentUser.card.cardHolder}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">Expires</div>
                    <div className="font-bold">{currentUser.card.expiry}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">CVV</div>
                    <div className="font-mono font-bold">
                      {showCardNumber ? currentUser.card.cvv : '•••'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {showCardNumber ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showCardNumber ? 'Hide Details' : 'Reveal Numbers'}</span>
                </button>

                <button
                  onClick={toggleCardFreeze}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    currentUser.card.isFrozen
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{currentUser.card.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}</span>
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Apple Pay & Google Wallet:</span>
                  <span className="text-emerald-500 font-bold">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily contactless limit:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">$10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>ATM zero-fee allowance:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">$1,000 / mo</span>
                </div>
              </div>

            </div>

            {/* Switch / Sign Out Box */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-3">
              <div className="font-bold text-slate-900 dark:text-white">Account Management</div>
              <p>
                Logged in as <strong className="text-slate-900 dark:text-white">{currentUser.email}</strong>.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={signOut}
                  className="w-full py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  Sign Out of Account
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Deposit Modal */}
        {isDepositOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#07132B] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Simulate Instant Deposit
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Add funds directly to your live GlobalPay balances via debit card, SEPA, or FedNow instant wire.
              </p>

              {depositSuccess ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <div className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                    Deposit of +{depositAmount} {depositCurrency} Successful!
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400">
                    Your balance has been credited instantly.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDepositSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Currency
                    </label>
                    <select
                      value={depositCurrency}
                      onChange={(e) => setDepositCurrency(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="USDT">USDT - Tether USD</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Amount to Add
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      required
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsDepositOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0052FF] to-[#00D2B4] hover:opacity-95 shadow-md cursor-pointer"
                    >
                      Confirm Deposit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Send Modal */}
        {isSendOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#07132B] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Send Money Globally
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Instantly transfer funds to another GlobalPay user, IBAN, or crypto address with 0% fee.
              </p>

              {sendSuccess ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <div className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                    Payment of {sendAmount} {sendCurrency} Sent!
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400">
                    Settled instantly to {sendRecipient}.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendSubmit} className="space-y-4">
                  {sendError && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{sendError}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Recipient (Email, Phone, or @GlobalPay Tag)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. maria@techcorp.io or @sofia"
                      value={sendRecipient}
                      onChange={(e) => setSendRecipient(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Currency
                      </label>
                      <select
                        value={sendCurrency}
                        onChange={(e) => setSendCurrency(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                      >
                        <option value="USD">USD (Bal: ${currentUser.balances['USD']?.toFixed(2) || '0'})</option>
                        <option value="EUR">EUR (Bal: €{currentUser.balances['EUR']?.toFixed(2) || '0'})</option>
                        <option value="GBP">GBP (Bal: £{currentUser.balances['GBP']?.toFixed(2) || '0'})</option>
                        <option value="USDT">USDT (Bal: {currentUser.balances['USDT']?.toFixed(2) || '0'})</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="any"
                        required
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-bold text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Note / Reference
                    </label>
                    <input
                      type="text"
                      value={sendNote}
                      onChange={(e) => setSendNote(e.target.value)}
                      placeholder="e.g. Design consulting"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSendOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0052FF] to-[#00D2B4] hover:opacity-95 shadow-md cursor-pointer"
                    >
                      Send Instantly
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    );
  }

  // If user is NOT logged in: Show the Account Creation & Sign In Flow
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-950/50 text-[#0052FF] dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200/60 dark:border-cyan-800/60">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          <span>Open Account in 2 Minutes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Get Started with GlobalPay
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Create your verified multi-currency account, receive local IBANs, and access instant crypto exchange.
        </p>

        {/* Tab Switcher: Create Account vs Sign In */}
        <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <button
            id="tab-create-account"
            type="button"
            onClick={() => setAuthMode('register')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-white dark:bg-[#07132B] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create New Account
          </button>
          <button
            id="tab-sign-in"
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              authMode === 'signin'
                ? 'bg-white dark:bg-[#07132B] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In to Existing
          </button>
        </div>
      </div>

      {/* Mode 1: Create Account Form */}
      {authMode === 'register' ? (
        <div className="bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          {/* Submission Simulation Overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-white/95 dark:bg-[#07132B]/95 z-20 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Opening Your GlobalPay Account...
              </h3>
              <p className="text-sm font-semibold text-[#0052FF] dark:text-cyan-400 max-w-sm">
                {submitStep}
              </p>
              <div className="text-xs text-slate-400">
                Allocating $1,000 welcome credit to your new balance...
              </div>
            </div>
          )}

          <form onSubmit={handleCreateAccount} className="space-y-6">
            
            {/* 1. Account Type Picker */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Step 1: Choose Account Purpose
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType('personal')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    accountType === 'personal'
                      ? 'border-[#0052FF] bg-blue-50/50 dark:bg-cyan-950/30 text-slate-900 dark:text-white ring-2 ring-[#0052FF]/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-slate-800 text-[#0052FF] dark:text-cyan-400 shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Personal Account</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Travelers, nomads, freelancers, crypto investors
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('business')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    accountType === 'business'
                      ? 'border-[#0052FF] bg-blue-50/50 dark:bg-cyan-950/30 text-slate-900 dark:text-white ring-2 ring-[#0052FF]/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-slate-800 text-[#0052FF] dark:text-cyan-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Business Account</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Companies, global contractor payroll, e-commerce
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Plan Tier Selection */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Step 2: Select Card Tier & Benefits
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTier('standard')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    tier === 'standard'
                      ? 'border-[#0052FF] bg-blue-50/50 dark:bg-cyan-950/30 text-slate-900 dark:text-white ring-2 ring-[#0052FF]/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Standard Plan</div>
                  <div className="text-base font-black mt-0.5">$0 <span className="text-xs font-normal">/ month</span></div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Free Virtual Multi-Currency Card, mid-market FX.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('metal')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    tier === 'metal'
                      ? 'border-cyan-500 bg-blue-50/50 dark:bg-cyan-950/30 text-slate-900 dark:text-white ring-2 ring-cyan-400/50'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D2B4] text-white text-[9px] font-black uppercase">
                    Most Popular
                  </span>
                  <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400">Metal Pro Plan</div>
                  <div className="text-base font-black mt-0.5">$12.99 <span className="text-xs font-normal">/ month</span></div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    18g Solid Metal Card, 1.5% crypto cashback, lounge access.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('business')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    tier === 'business'
                      ? 'border-[#0052FF] bg-blue-50/50 dark:bg-cyan-950/30 text-slate-900 dark:text-white ring-2 ring-[#0052FF]/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Enterprise Rail</div>
                  <div className="text-base font-black mt-0.5">$49.00 <span className="text-xs font-normal">/ month</span></div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Corporate expense cards, batch mass payroll, developer API.
                  </div>
                </button>
              </div>
            </div>

            {/* 3. Applicant Details */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Step 3: Identity & Account Coordinates
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Full Legal Name
                  </label>
                  <input
                    id="input-fullname"
                    type="text"
                    required
                    placeholder="e.g. Jordan Smith"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  />
                </div>

                {accountType === 'business' ? (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Company Legal Entity Name
                    </label>
                    <input
                      id="input-company"
                      type="text"
                      required
                      placeholder="e.g. Acme Innovations LLC"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Primary Email Address
                    </label>
                    <input
                      id="input-email"
                      type="email"
                      required
                      placeholder="e.g. jordan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                    />
                  </div>
                )}

                {accountType === 'business' && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Work Email Address
                    </label>
                    <input
                      id="input-work-email"
                      type="email"
                      required
                      placeholder="e.g. finance@acme.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Country of Residence / Incorporation
                  </label>
                  <select
                    id="input-country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      const match = POPULAR_COUNTRIES.find((c) => c.name === e.target.value);
                      if (match) setBaseCurrency(match.currency);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  >
                    {POPULAR_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.name}>
                        {c.flag} {c.name} ({c.currency})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Primary Base Currency
                  </label>
                  <select
                    id="input-currency"
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  >
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="AUD">AUD ($) - Australian Dollar</option>
                    <option value="CAD">CAD ($) - Canadian Dollar</option>
                    <option value="SGD">SGD ($) - Singapore Dollar</option>
                    <option value="JPY">JPY (¥) - Japanese Yen</option>
                    <option value="CHF">CHF (Fr) - Swiss Franc</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Mobile Phone (for Biometric MFA)
                  </label>
                  <input
                    id="input-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Account Password
                  </label>
                  <input
                    id="input-password"
                    type="password"
                    required
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#0052FF] focus:ring-[#0052FF]"
                />
                <span>
                  I confirm the accuracy of my details and accept the GlobalPay Customer Agreement, Electronic Funds Disclosure, and Privacy Policy.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>256-bit encrypted KYC • No credit score impact</span>
              </div>

              <button
                id="submit-create-account-btn"
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Complete Registration & Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>
      ) : (
        /* Mode 2: Sign In to Existing Account */
        <div className="bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Sign In to Your GlobalPay Account
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Enter your registered email address to access your multi-currency balances and contactless cards.
          </p>

          {signInError && (
            <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{signInError}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address
              </label>
              <input
                id="signin-email"
                type="email"
                required
                placeholder="e.g. alex.vance@example.com"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Password
              </label>
              <input
                id="signin-password"
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              />
            </div>

            <button
              id="signin-submit-btn"
              type="submit"
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md transition-all cursor-pointer mt-2"
            >
              Sign In to Account
            </button>
          </form>

          {/* Quick Demo Logins Helper */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-400 mb-2">Or test with demo account:</div>
            <button
              type="button"
              onClick={() => {
                setSignInEmail('alex.vance@example.com');
                signIn('alex.vance@example.com');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 text-left flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Alex Vance (Metal Tier, $18,740 Balance)</span>
              <span className="text-[#0052FF] dark:text-cyan-400 font-bold">1-Click Sign In →</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
