import React, { useState } from 'react';
import { Check, Landmark, ReceiptText, ShieldCheck } from 'lucide-react';

const personalSteps = ['Create a Personal account', 'Verify your identity with an ID and selfie', 'Send or receive payments'];
const businessSteps = ['Create a Business account', 'Verify your business and its directors', 'Set up payment tools and start accepting payments'];
const needs = {
  personal: ['A government-issued ID (passport or national ID)', 'A device with a camera, for the selfie check', 'About 5 minutes to complete verification'],
  business: ['Company registration documents', 'ID for each listed director', 'Proof of business address'],
};
const paymentMethods = ['Card', 'EFT / Bank transfer', 'Crypto wallet', 'ZAR', 'USD', 'EUR', 'GBP', '+ more'];
const faqs = [
  ['How long does verification take?', 'Most Personal accounts are verified within minutes once your ID and selfie are submitted. Business verification can take longer, since it includes checks on the company and its directors.'],
  ['Does GlobalPay hold my money?', 'No. GlobalPay is an orchestration layer, not a bank or wallet - funds are moved directly through our licensed payment partners.'],
  ['Which currencies can I send and receive?', 'Local South African payments plus a growing list of international currencies and crypto assets - the exact list depends on your account type and the destination.'],
  ["What if my verification is rejected?", "You'll see the reason in your account and can resubmit your documents. Contact support if you're not sure what's needed."],
];

export const HowItWorksPage: React.FC = () => {
  const [type, setType] = useState<'personal' | 'business'>('personal');
  const steps = type === 'personal' ? personalSteps : businessSteps;
  const activeNeeds = needs[type];

  return <div className="how-it-works-page pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <section className="how-intro text-center" data-content-review="legal-signoff-required">
      <h1 className="text-4xl sm:text-5xl font-semibold text-[#0B0F19]">How it works</h1>
      <p className="mt-4 text-lg text-[#57607A]">GlobalPay connects you to trusted, licensed payment partners so you can send and receive money safely - locally, internationally, and in crypto. Every account is verified before it can move funds.</p>
    </section>

    <section className="how-steps-section" aria-labelledby="steps-heading">
      <div className="how-toggle" role="tablist" aria-label="Choose account type">
        <button onClick={() => setType('personal')} className={type === 'personal' ? 'is-active' : ''} role="tab" aria-selected={type === 'personal'}>Personal</button>
        <button onClick={() => setType('business')} className={type === 'business' ? 'is-active' : ''} role="tab" aria-selected={type === 'business'}>Business</button>
      </div>
      <h2 id="steps-heading" className="sr-only">Steps to get started</h2>
      <div className="how-step-grid">{steps.map((step, index) => <article key={step} className="how-step-card"><span>0{index + 1}</span><Check aria-hidden="true" /><p>{step}</p></article>)}</div>
    </section>

    <section className="how-needs-section" aria-labelledby="needs-heading">
      <h2 id="needs-heading">What you'll need</h2>
      <div className="needlist">{activeNeeds.map((need) => <div className="needitem" key={need}><div className="dot" aria-hidden="true" /><span>{need}</span></div>)}</div>
    </section>

    <section className="trust-band" aria-labelledby="trust-heading">
      <h2 id="trust-heading" className="sr-only">Why GlobalPay</h2>
      <article><div className="trust-icon"><Landmark aria-hidden="true" /></div><h3>Licensed partners</h3><p>Payments are processed through regulated payment partners - GlobalPay never holds your funds directly.</p></article>
      <article><div className="trust-icon"><ShieldCheck aria-hidden="true" /></div><h3>Verified accounts only</h3><p>Every account completes identity verification before it can send or receive a single payment.</p></article>
      <article><div className="trust-icon"><ReceiptText aria-hidden="true" /></div><h3>Transparent fees</h3><p>See the exact cost before you pay with the live fee calculator - no surprise deductions.</p></article>
    </section>

    <section className="payment-methods" aria-labelledby="payment-methods-heading">
      <h2 id="payment-methods-heading">Ways to pay and get paid</h2>
      <p>Choose the payment method and currency that fit your needs.</p>
      <div className="payment-chips">{paymentMethods.map((method) => <span key={method}>{method}</span>)}</div>
    </section>

    <section className="how-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Common questions</h2>
      <div>{faqs.map(([question, answer], index) => <details className="qa" key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>

    <div className="ctaband" aria-labelledby="cta-heading">
      <h2 id="cta-heading">Ready to send your first payment?</h2>
      <p>Get started with a verified GlobalPay account.</p>
    </div>
  </div>;
};
