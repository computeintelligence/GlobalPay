import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Smartphone, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

interface FAQSectionProps {
  onOpenGetApp: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenGetApp }) => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50/50 dark:bg-[#030B1B]/70 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-cyan-300 text-xs font-semibold mb-3 border border-slate-200 dark:border-slate-700">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We’ve Got Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Find out everything about using the GlobalPay App, our multi-currency framework, and crypto exchange security.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#07132B] border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-base text-slate-900 dark:text-white">
                    {item.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#0052FF] dark:text-cyan-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#07132B] border border-slate-200 dark:border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Ready to explore global payments?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Download the GlobalPay App to access 24/7 in-app live multilingual support.
            </p>
          </div>
          <button
            onClick={onOpenGetApp}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#0052FF] to-[#00D2B4] hover:opacity-95 shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
