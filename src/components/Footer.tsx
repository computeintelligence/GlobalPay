import React from 'react';
import { GlobalPayLogo } from './GlobalPayLogo';
import { useNavigation } from '../context/NavigationContext';

const primaryLinks: [string, Parameters<ReturnType<typeof useNavigation>['navigateTo']>[0]][] = [
	['Personal', 'personal'],
	['Business', 'business'],
	['How It Works', 'how-it-works'],
	['Pricing', 'pricing'],
	['Security', 'security'],
	['FAQ', 'faq'],
];
const secondaryLinks: [string, Parameters<ReturnType<typeof useNavigation>['navigateTo']>[0]][] = [
	['Contact', 'contact'],
	['Terms', 'terms'],
	['Privacy', 'privacy'],
	['AML/KYC Policy', 'aml-kyc'],
];

export const Footer: React.FC = () => {
	const { navigateTo } = useNavigation();
	return <footer className="site-footer"><div className="site-footer-inner"><div className="site-footer-main"><div className="site-footer-brand"><button onClick={() => navigateTo('home')} aria-label="GlobalPay Home"><GlobalPayLogo size="lg" showTagline={false} /></button><p>GlobalPay connects individuals and businesses to trusted payment partners for multi-currency and crypto payments.</p></div><nav className="footlinks" aria-label="Footer navigation"><div>{primaryLinks.map(([label, page]) => <button key={page} onClick={() => navigateTo(page)}>{label}</button>)}</div><div>{secondaryLinks.map(([label, page]) => <button key={page} className="muted" onClick={() => navigateTo(page)}>{label}</button>)}</div><div className="hidden sm:block" aria-hidden="true" /></nav></div><div className="site-footer-legal"><p>All accounts must complete identity verification (KYC) before sending or receiving payments. GlobalPay does not hold customer funds; transactions are processed through licensed payment partners.</p><p>© {new Date().getFullYear()} GlobalPay. All rights reserved.</p></div></div></footer>;
};
