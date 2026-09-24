/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AccountProvider } from './context/AccountContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { PersonalPage } from './pages/PersonalPage';
import { BusinessPage } from './pages/BusinessPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';
import { SecurityPage } from './pages/SecurityPage';
import { FAQPage } from './pages/FAQPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { PersonalSignupPage, BusinessSignupPage, PersonalSigninPage, BusinessSigninPage } from './pages/SignupPages';
import { LegalPage } from './pages/LegalPage';

const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'personal':
        return <PersonalPage />;
      case 'business':
        return <BusinessPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'pricing':
        return <PricingPage />;
      case 'security':
        return <SecurityPage />;
      case 'faq':
        return <FAQPage />;
      case 'get-started':
        return <GetStartedPage />;
      case 'personal-signup':
        return <PersonalSignupPage />;
      case 'business-signup':
        return <BusinessSignupPage />;
      case 'personal-signin':
        return <PersonalSigninPage />;
      case 'business-signin':
        return <BusinessSigninPage />;
      case 'contact':
        return <LegalPage title="Contact" />;
      case 'terms':
        return <LegalPage title="Terms of Service" />;
      case 'privacy':
        return <LegalPage title="Privacy Policy" />;
      case 'aml-kyc':
        return <LegalPage title="AML/KYC Policy" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030B1B] text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-cyan-500 selection:text-white flex flex-col justify-between">
      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Active Page Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Multi-Page Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AccountProvider>
          <AppContent />
        </AccountProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}
