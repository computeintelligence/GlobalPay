import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  ArrowRight,
  Sparkles,
  MessageCircleQuestion
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { useNavigation } from '../context/NavigationContext';

export const FAQPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Getting Started', 'Currencies', 'Security', 'Fees'];

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Getting Started') return faq.category === 'app' || faq.category === 'general';
    if (selectedCategory === 'Currencies') return faq.category === 'currencies';
    if (selectedCategory === 'Security') return faq.category === 'security';
    if (selectedCategory === 'Fees') return faq.category === 'fees';
    return true;
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-950/50 text-[#0052FF] dark:text-cyan-300 text-xs font-bold mb-3 border border-blue-200/60 dark:border-cyan-800/60">
          <MessageCircleQuestion className="w-3.5 h-3.5 text-cyan-400" />
          <span>Knowledge Base & Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Everything you need to know about opening accounts, cross-border settlement, crypto exchange, and card limits.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search questions (e.g. 'How fast do transfers settle?', 'Are my funds insured?')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-[#07132B] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0052FF] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#0052FF]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="mt-16 text-center p-8 rounded-3xl bg-slate-50 dark:bg-[#07132B] border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Still Have Questions?
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          Our VIP customer support team is available 24/7 in the app and ready to help you onboard.
        </p>
        <button
          onClick={() => navigateTo('get-started')}
          className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0052FF] via-[#00B4D8] to-[#10DF62] hover:opacity-95 shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Get Started & Open Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
