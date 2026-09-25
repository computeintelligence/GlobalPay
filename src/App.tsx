/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
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
  const [displayPage, setDisplayPage] = useState(currentPage);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (currentPage === displayPage) return;
    setIsExiting(true);
    const timer = window.setTimeout(() => {
      setDisplayPage(currentPage);
      setIsExiting(false);
    }, 150);
    return () => window.clearTimeout(timer);
  }, [currentPage, displayPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  useEffect(() => {
    const page = document.querySelector<HTMLElement>('.site-page');
    if (!page) return;
    const sections = Array.from(page.querySelectorAll<HTMLElement>('section'));
    const targets = sections.length ? sections : [page];
    targets.forEach((element) => { element.dataset.reveal = ''; });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [displayPage]);

  const renderPage = () => {
    switch (displayPage) {
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
        <div key={displayPage} className={`site-page-shell ${isExiting ? 'route-page-exit' : 'route-page-enter'}`}>
          <div className="site-page">{renderPage()}</div>
        </div>
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
