import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight, Menu, X, LogOut } from 'lucide-react';
import { GlobalPayLogo } from './GlobalPayLogo';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import { useAccount } from '../context/AccountContext';
import { PageId } from '../types';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentPage, navigateTo } = useNavigation();
  const { currentUser, signOut } = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; page: PageId }[] = [
    { name: 'Home', page: 'home' },
    { name: 'Personal', page: 'personal' },
    { name: 'Business', page: 'business' },
    { name: 'How It Works', page: 'how-it-works' },
    { name: 'Pricing', page: 'pricing' },
    { name: 'Security', page: 'security' },
    { name: 'FAQ', page: 'faq' },
  ];

  const handleNav = (page: PageId) => {
    setMobileMenuOpen(false);
    navigateTo(page);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#030B1B]/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-3'
          : 'bg-white/70 dark:bg-[#030B1B]/70 backdrop-blur-sm py-4 md:py-4.5 border-b border-slate-200/40 dark:border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo - Clicking goes to Home */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 cursor-pointer text-left bg-transparent border-none p-0 shrink-0"
          aria-label="GlobalPay Home"
        >
          <GlobalPayLogo size="md" showTagline={true} />
        </button>

        {/* Desktop Nav Links - Clickable separate pages */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                id={`nav-link-${link.page}`}
                onClick={() => handleNav(link.page)}
                className={`text-sm font-semibold transition-all cursor-pointer relative py-1 px-1.5 ${
                  isActive
                    ? 'text-[#0052FF] dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0052FF] to-[#00D2B4] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Theme + User Account status + Get Started */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Light/Dark Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center cursor-pointer"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#002D8A]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* User Account State: Logged In vs Logged Out */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                id="navbar-user-dashboard-btn"
                onClick={() => setSignInOpen(!signInOpen)}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D2B4] flex items-center justify-center text-[10px] text-white font-black">
                  {currentUser.fullName.charAt(0)}
                </div>
                <span className="hidden md:inline">{currentUser.fullName.split(' ')[0]}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0052FF]/10 dark:bg-cyan-500/20 text-[#0052FF] dark:text-cyan-300 uppercase font-black">
                  {currentUser.tier}
                </span>
              </button>

              <button
                id="navbar-signout-btn"
                onClick={() => {
                  signOut();
                  handleNav('home');
                }}
                title="Sign out of account"
                className="p-2 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="navbar-signin-btn"
                onClick={() => handleNav('get-started')}
                className="hidden md:inline-flex items-center text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#0052FF] dark:hover:text-cyan-400 px-3 py-2 cursor-pointer transition-colors"
              >
                Sign In
              </button>
              {signInOpen && <div className="absolute top-14 right-28 z-10 w-44 rounded-xl bg-white dark:bg-[#07132B] border border-slate-200 dark:border-slate-700 shadow-lg p-2"><button onClick={() => handleNav('personal-signin')} className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">Personal</button><button onClick={() => handleNav('business-signin')} className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">Business</button></div>}

              {/* Universal Get Started CTA */}
              <button
                id="navbar-get-started-btn"
                onClick={() => handleNav('get-started')}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden bg-white dark:bg-[#07132B] border-b border-slate-200 dark:border-slate-800 px-5 pt-4 pb-6 space-y-3 shadow-xl"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`px-3 py-2.5 text-left text-sm font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 dark:bg-cyan-950/40 text-[#0052FF] dark:text-cyan-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#0052FF] dark:bg-cyan-400" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleNav('personal-signin')} className="py-2.5 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800">Sign In: Personal</button>
              <button onClick={() => handleNav('business-signin')} className="py-2.5 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800">Sign In: Business</button>
            </div>
            <button
              id="mobile-drawer-get-started-btn"
              onClick={() => handleNav('get-started')}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] text-center flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
