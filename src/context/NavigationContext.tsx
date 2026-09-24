import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId } from '../types';

interface NavigationContextType {
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const VALID_PAGES: PageId[] = [
  'home',
  'personal',
  'business',
  'how-it-works',
  'pricing',
  'security',
  'faq',
  'get-started',
  'personal-signup',
  'business-signup',
  'personal-signin',
  'business-signin',
  'contact',
  'terms',
  'privacy',
  'aml-kyc',
];

const REDIRECTS: Partial<Record<string, PageId>> = {
  features: 'how-it-works',
  rates: 'home',
  network: 'personal',
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim() as PageId;
    if (VALID_PAGES.includes(hash)) {
      return hash;
    }
    if (REDIRECTS[hash]) {
      window.location.hash = `#/${REDIRECTS[hash]}`;
      return REDIRECTS[hash] as PageId;
    }
    return 'home';
  });

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim() as PageId;
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (REDIRECTS[hash]) {
        navigateTo(REDIRECTS[hash] as PageId);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
