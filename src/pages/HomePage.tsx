import React from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useNavigation } from "../context/NavigationContext";
import { FeeCalculator } from "../components/FeeCalculator";
import { NetworkIllustration } from "../components/NetworkIllustration";
import { LiveTickerStrip } from "../components/LiveTickerStrip";

const buttonClass =
  "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2F6FF0] to-[#14B8A6] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(47,111,240,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(20,184,166,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FF0] focus-visible:ring-offset-2";
const personalFeatures = [
  "Send and receive local payments",
  "Send money abroad in many currencies",
  "Buy, sell, swap, send and receive crypto",
  "See a clear estimated fee before you pay",
  "Verified accounts only",
];
const businessFeatures = [
  "Accept customer payments on your website, app or online store",
  "Payment links and invoices",
  "Clear fees per sale",
  "Verified businesses only",
];
const questions = [
  [
    "What does it cost?",
    "The GlobalPay fee is shown as a percentage with a small minimum and a maximum, plus partner fees.",
  ],
  [
    "Do I need to verify my identity?",
    "Everyone completes identity verification. Businesses also complete business verification.",
  ],
  [
    "Can I use one account for both?",
    "No. Personal and Business are separate accounts.",
  ],
];
const FeatureGrid: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {items.map((item) => (
      <div
        key={item}
        className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-bold text-slate-700 dark:border-slate-800 dark:bg-[#07132B] dark:text-slate-200"
      >
        <Check className="mb-3 h-5 w-5 text-emerald-500" />
        {item}
      </div>
    ))}
  </div>
);

export const HomePage: React.FC = () => {
  const { navigateTo } = useNavigation();
  return (
    <div className="pt-28 pb-20">
      <section className="home-hero relative overflow-hidden">
        <div className="hero-background" />
        <NetworkIllustration />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.8fr)] lg:px-8 lg:py-20">
          <div className="max-w-xl">
            <span className="hero-enter hero-enter-1 text-xs font-bold uppercase tracking-widest text-[#2F6FF0]">
              GlobalPay
            </span>
            <h1 className="hero-enter hero-enter-2 mt-4 font-semibold text-[#0B0F19]">
              Send and receive payments in many currencies.
            </h1>
            <p className="hero-enter hero-enter-3 mt-5 text-lg leading-relaxed text-slate-600">
              GlobalPay connects people and businesses to trusted payment
              partners for local, international, and crypto payments.
            </p>
            <div className="hero-enter hero-enter-4 mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo("get-started")}
                className={buttonClass}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigateTo("how-it-works")}
                className="hero-secondary-button"
              >
                How it works
              </button>
            </div>
            <p className="hero-enter hero-enter-5 mt-6 text-xs font-semibold text-slate-500">
              GlobalPay fee from 0.5% per transaction, plus partner fees.
            </p>
          </div>
          <div className="hero-enter hero-enter-6">
            <FeeCalculator compact />
          </div>
        </div>
      </section>
      <LiveTickerStrip />
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          For Personal
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Simple payment tools for everyday needs.
        </p>
        <FeatureGrid items={personalFeatures} />
        <button
          onClick={() => navigateTo("personal-signup")}
          className={`${buttonClass} mt-8`}
        >
          Create a Personal account <ArrowRight className="h-4 w-4" />
        </button>
      </section>
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          For Business
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Accept customer payments and keep your records in one place.
        </p>
        <FeatureGrid items={businessFeatures} />
        <button
          onClick={() => navigateTo("business-signup")}
          className={`${buttonClass} mt-8`}
        >
          Create a Business account <ArrowRight className="h-4 w-4" />
        </button>
      </section>
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Know your fee before you pay.
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            See the partner fee, VAT where it applies, GlobalPay fee, and total.
            Every result is an estimate.
          </p>
        </div>
        <FeeCalculator compact />
      </section>
      <section className="mx-auto mt-24 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-emerald-500" />
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Safety and verification
          </h2>
        </div>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Everyone completes identity verification before using the service.
          GlobalPay does not hold your funds. Payments are processed directly by our licensed payment partners, and every account must be verified before sending or receiving money.
        </p>
      </section>
      <section className="mx-auto mt-24 max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Common questions
        </h2>
        <div className="mt-8 space-y-4">
          {questions.map(([question, answer]) => (
            <div
              key={question}
              className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
            >
              <h3 className="font-black text-slate-900 dark:text-white">
                {question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
