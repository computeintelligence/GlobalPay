import React from 'react';
import { FeeCalculator } from '../components/FeeCalculator';
import { feeConfig } from '../data/feeConfig';
import { FeeRule } from '../types';

const rows: { group: string; name: string; rule: FeeRule }[] = [
  { group: 'Business', name: 'Bank payment', rule: feeConfig.globalpay.business.eft },
  { group: 'Business', name: 'Card', rule: feeConfig.globalpay.business.card },
  { group: 'Business', name: 'International card', rule: feeConfig.globalpay.business.intlCard },
  { group: 'Personal money transfers', name: 'Local send', rule: feeConfig.globalpay.personal.localSend },
  { group: 'Personal money transfers', name: 'International send', rule: feeConfig.globalpay.personal.intlSend },
  ...Object.entries(feeConfig.globalpay.crypto).map(([name, rule]) => ({ group: 'Personal crypto', name, rule })),
];
const formatPercent = (rule: FeeRule) => `${rule.pct}%`;
const formatRand = (value: number) => `R${value.toFixed(2)}`;

export const PricingPage: React.FC = () => <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl text-center"><h1 className="text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">Simple pricing</h1><p className="mt-5 text-xl font-black text-[#0052FF] dark:text-cyan-400">GlobalPay fee from 0.5% per transaction, plus partner fees.</p><p className="mt-3 text-lg text-slate-600 dark:text-slate-300">You always see the full fee before you pay.</p><p className="mt-4 text-sm font-bold text-slate-500">[CONFIRM FEE WORDING]</p></div><section className="mt-12 overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800"><div className="min-w-[640px] p-6"><h2 className="text-2xl font-black text-slate-900 dark:text-white">GlobalPay fees</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Rates last updated: {feeConfig.lastUpdated}</p><table className="mt-6 w-full text-left text-sm"><thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800"><tr><th className="py-3">Transaction</th><th>GlobalPay fee</th><th>Minimum</th><th>Cap</th></tr></thead><tbody>{rows.map((row, index) => <tr key={`${row.group}-${row.name}`} className={index === 0 || rows[index - 1].group !== row.group ? 'border-t border-slate-200 dark:border-slate-800' : ''}><td className="py-3 font-bold text-slate-900 dark:text-white">{row.name}</td><td>{formatPercent(row.rule)}</td><td>{formatRand(row.rule.min)}</td><td>{row.rule.cap ? formatRand(row.rule.cap) : 'No fee'}</td></tr>)}</tbody></table></div></section><section className="mx-auto mt-8 max-w-3xl"><h2 className="text-2xl font-black text-slate-900 dark:text-white">Partner fees</h2><p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Payment partners and networks charge their own fees. We show them next to our fee, so you see the full cost before you pay.</p></section><div className="mt-12 grid gap-8 lg:grid-cols-2"><FeeCalculator route="personal-local" /><FeeCalculator route="business" /><FeeCalculator route="personal-international" /><FeeCalculator route="personal-crypto" /></div></div>;
