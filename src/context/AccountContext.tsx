import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, AccountTransaction } from '../types';

interface AccountContextType {
  currentUser: UserAccount | null;
  accounts: UserAccount[];
  createAccount: (data: {
    fullName: string;
    email: string;
    accountType: 'personal' | 'business';
    companyName?: string;
    tier: 'standard' | 'metal' | 'business';
    country: string;
    baseCurrency: string;
    phone: string;
    password?: string;
  }) => UserAccount;
  signIn: (email: string) => boolean;
  signOut: () => void;
  depositFunds: (currency: string, amount: number) => void;
  sendFunds: (recipient: string, currency: string, amount: number, note?: string) => boolean;
  toggleCardFreeze: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const STORAGE_KEY_ACCOUNTS = 'globalpay_accounts_v1';
const STORAGE_KEY_USER = 'globalpay_current_user_v1';

// Seed demo account so users can also preview an established account if they want
const INITIAL_DEMO_ACCOUNT: UserAccount = {
  id: 'GP-9428-1102',
  fullName: 'Alex Vance',
  email: 'alex.vance@example.com',
  accountType: 'personal',
  tier: 'metal',
  country: 'United States',
  baseCurrency: 'USD',
  phone: '+1 (555) 382-9910',
  iban: 'US89 GPAY 0210 0002 9182 33',
  accountNumber: '4091820491',
  routingNumber: '021000021',
  balances: {
    USD: 14850.25,
    EUR: 5240.80,
    GBP: 3120.50,
    BTC: 0.145,
    USDT: 2500.0,
    ETH: 1.85,
  },
  createdAt: '2026-01-15T10:00:00.000Z',
  isVerified: true,
  card: {
    cardNumber: '4289 8812 3490 8921',
    expiry: '09/29',
    cvv: '849',
    isFrozen: false,
    cardHolder: 'ALEX VANCE',
    cardTier: 'metal',
  },
  transactions: [
    {
      id: 'tx-1',
      type: 'deposit',
      title: 'Direct Deposit / Wire',
      amount: 4500.0,
      currency: 'USD',
      counterparty: 'Acme Global Payroll',
      date: 'Today, 09:14 AM',
      status: 'completed',
    },
    {
      id: 'tx-2',
      type: 'send',
      title: 'SEPA Instant Transfer',
      amount: -650.0,
      currency: 'EUR',
      counterparty: 'Sofia Lindqvist (Berlin)',
      date: 'Yesterday, 04:32 PM',
      status: 'completed',
    },
    {
      id: 'tx-3',
      type: 'convert',
      title: 'FX Swap USD → USDT',
      amount: 1000.0,
      currency: 'USDT',
      counterparty: 'GlobalPay FX Engine',
      date: 'Sep 06, 2026',
      status: 'completed',
    },
    {
      id: 'tx-4',
      type: 'card_spend',
      title: 'Contactless Card Payment',
      amount: -78.5,
      currency: 'USD',
      counterparty: 'Blue Bottle Coffee San Francisco',
      date: 'Sep 05, 2026',
      status: 'completed',
    },
  ],
};

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [INITIAL_DEMO_ACCOUNT];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY_USER);
      if (savedId) {
        const savedAccounts = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
        const list: UserAccount[] = savedAccounts ? JSON.parse(savedAccounts) : [INITIAL_DEMO_ACCOUNT];
        const match = list.find((a) => a.id === savedId || a.email === savedId);
        if (match) return match;
      }
    } catch {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
    } catch {
      // ignore
    }
  }, [accounts]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, currentUser.id);
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const createAccount = (data: {
    fullName: string;
    email: string;
    accountType: 'personal' | 'business';
    companyName?: string;
    tier: 'standard' | 'metal' | 'business';
    country: string;
    baseCurrency: string;
    phone: string;
    password?: string;
  }): UserAccount => {
    const randomIdSuffix = Math.floor(1000 + Math.random() * 9000);
    const randomCardSuffix = Math.floor(1000 + Math.random() * 9000);
    const randomAccount = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    // Initial sign-up bonus or base balance
    const initialBalances: Record<string, number> = {
      [data.baseCurrency]: 1000.0, // Complimentary $1000 starter credit in base currency!
      USD: data.baseCurrency === 'USD' ? 1000.0 : 250.0,
      EUR: data.baseCurrency === 'EUR' ? 1000.0 : 200.0,
      USDT: 50.0,
    };

    const newAccount: UserAccount = {
      id: `GP-${randomIdSuffix}-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      accountType: data.accountType,
      companyName: data.companyName,
      tier: data.tier,
      country: data.country,
      baseCurrency: data.baseCurrency,
      phone: data.phone,
      iban: `GB82 GPAY 0400 04${Math.floor(10000000 + Math.random() * 90000000)}`,
      accountNumber: randomAccount,
      routingNumber: '021000021',
      balances: initialBalances,
      createdAt: new Date().toISOString(),
      isVerified: true,
      card: {
        cardNumber: `4152 7720 ${Math.floor(1000 + Math.random() * 9000)} ${randomCardSuffix}`,
        expiry: '08/30',
        cvv: Math.floor(100 + Math.random() * 900).toString(),
        isFrozen: false,
        cardHolder: data.fullName.toUpperCase(),
        cardTier: data.tier === 'standard' ? 'virtual' : 'metal',
      },
      transactions: [
        {
          id: `tx-init-${Date.now()}`,
          type: 'deposit',
          title: 'Account Opening Welcome Bonus',
          amount: 1000.0,
          currency: data.baseCurrency,
          counterparty: 'GlobalPay Welcome Program',
          date: 'Just now',
          status: 'completed',
          note: 'Verified account creation welcome credit',
        },
      ],
    };

    setAccounts((prev) => [newAccount, ...prev.filter((a) => a.email !== data.email)]);
    setCurrentUser(newAccount);
    return newAccount;
  };

  const signIn = (email: string): boolean => {
    const found = accounts.find(
      (a) => a.email.toLowerCase().trim() === email.toLowerCase().trim()
    );
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  const depositFunds = (currency: string, amount: number) => {
    if (!currentUser || amount <= 0) return;

    const newTx: AccountTransaction = {
      id: `tx-dep-${Date.now()}`,
      type: 'deposit',
      title: 'Instant Card / Wire Deposit',
      amount: amount,
      currency: currency,
      counterparty: 'Bank Card / Instant Rail',
      date: 'Just now',
      status: 'completed',
    };

    const updatedUser: UserAccount = {
      ...currentUser,
      balances: {
        ...currentUser.balances,
        [currency]: (currentUser.balances[currency] || 0) + amount,
      },
      transactions: [newTx, ...currentUser.transactions],
    };

    setCurrentUser(updatedUser);
    setAccounts((prev) => prev.map((a) => (a.id === updatedUser.id ? updatedUser : a)));
  };

  const sendFunds = (recipient: string, currency: string, amount: number, note?: string): boolean => {
    if (!currentUser || amount <= 0) return false;
    const currentBal = currentUser.balances[currency] || 0;
    if (currentBal < amount) {
      return false; // insufficient funds
    }

    const newTx: AccountTransaction = {
      id: `tx-send-${Date.now()}`,
      type: 'send',
      title: `Transfer to ${recipient}`,
      amount: -amount,
      currency: currency,
      counterparty: recipient,
      date: 'Just now',
      status: 'completed',
      note: note,
    };

    const updatedUser: UserAccount = {
      ...currentUser,
      balances: {
        ...currentUser.balances,
        [currency]: currentBal - amount,
      },
      transactions: [newTx, ...currentUser.transactions],
    };

    setCurrentUser(updatedUser);
    setAccounts((prev) => prev.map((a) => (a.id === updatedUser.id ? updatedUser : a)));
    return true;
  };

  const toggleCardFreeze = () => {
    if (!currentUser) return;
    const updatedUser: UserAccount = {
      ...currentUser,
      card: {
        ...currentUser.card,
        isFrozen: !currentUser.card.isFrozen,
      },
    };
    setCurrentUser(updatedUser);
    setAccounts((prev) => prev.map((a) => (a.id === updatedUser.id ? updatedUser : a)));
  };

  return (
    <AccountContext.Provider
      value={{
        currentUser,
        accounts,
        createAccount,
        signIn,
        signOut,
        depositFunds,
        sendFunds,
        toggleCardFreeze,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
