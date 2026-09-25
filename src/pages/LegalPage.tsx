import React, { FormEvent, useEffect, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

type LegalSection = { heading: string; body: string };

const legalContent: Record<string, LegalSection[]> = {
	'Terms of Service': [
		{ heading: '1. Acceptance of Terms', body: 'Using GlobalPay means you agree to these terms.' },
		{ heading: '2. What GlobalPay Is', body: 'GlobalPay is an orchestration layer that connects you to regulated third-party payment partners. GlobalPay does not hold customer funds.' },
		{ heading: '3. Eligibility & Account Types', body: 'GlobalPay offers Personal and Business accounts, each with its own onboarding and verification requirements.' },
		{ heading: '4. Verification', body: 'Every account must complete identity verification before sending or receiving payments. Business accounts additionally verify the company and its directors.' },
		{ heading: '5. Fees', body: 'GlobalPay fee from 0.5% per transaction, plus partner fees. Exact costs are shown before you pay via the fee calculator. Estimates are not final until confirmed.' },
		{ heading: '6. Prohibited Uses', body: 'You may not use GlobalPay for fraud, money laundering, transactions involving sanctioned parties or jurisdictions, or illegal goods or services.' },
		{ heading: '7. Crypto Disclaimer', body: 'Crypto prices are volatile and you can lose money. Crypto services depend on verification and partner availability.' },
		{ heading: '8. Liability', body: 'GlobalPay is not liable for delays or losses caused by third-party payment partners, network issues, or user error such as incorrect recipient details.' },
		{ heading: '9. Suspension & Termination', body: 'Accounts may be suspended or closed for failed verification, suspected fraud, or breach of these terms.' },
		{ heading: '10. Changes to These Terms', body: 'GlobalPay may update these terms from time to time. Continued use of the service means you accept the changes.' },
		{ heading: '11. Governing Law', body: 'These terms are governed by the laws of South Africa.' },
	],
	'Privacy Policy': [
		{ heading: '1. Information We Collect', body: 'We collect identity details, ID/verification documents, transaction data, and device and usage data.' },
		{ heading: '2. How We Use It', body: 'We use your information for identity verification, fraud prevention, processing payments, complying with legal obligations, and improving the service.' },
		{ heading: '3. Who We Share It With', body: 'We share information with regulated payment partners, only as needed to process your transaction, and with regulators or authorities where legally required. GlobalPay does not sell personal data.' },
		{ heading: '4. Data Retention', body: 'Verification and transaction records are kept for as long as required by applicable financial regulations.' },
		{ heading: '5. Your Rights', body: "Under South Africa's Protection of Personal Information Act (POPIA), you can request access to, correction of, or deletion of your personal information, subject to our regulatory record-keeping obligations." },
		{ heading: '6. Security', body: 'We use encryption in transit and at rest, access controls, and monitoring to protect your information.' },
		{ heading: '7. Cookies', body: 'We use cookies for website functionality and analytics.' },
		{ heading: '8. Contact / Information Officer', body: 'For data-related requests, contact our Information Officer at [INFORMATION OFFICER NAME/EMAIL — REQUIRED BY POPIA, NOT YET SET].' },
	],
	'AML/KYC Policy': [
		{ heading: '1. Purpose', body: 'GlobalPay verifies every account to help prevent money laundering, fraud, and the financing of illegal activity, in line with the Financial Intelligence Centre Act (FIC Act).' },
		{ heading: '2. Personal Verification', body: 'Personal accounts require a valid government-issued ID and a live selfie check.' },
		{ heading: '3. Business Verification', body: 'Business accounts require company registration documents, ID for each listed director, and proof of business address.' },
		{ heading: '4. Ongoing Monitoring', body: 'Transactions may be reviewed for unusual activity, and further documentation can be requested at any time.' },
		{ heading: '5. Reporting Obligations', body: 'GlobalPay may be required to report suspicious activity to the relevant authorities.' },
		{ heading: '6. Consequences of Non-Verification', body: 'Unverified or under-verified accounts cannot send or receive payments and may be restricted or closed.' },
		{ heading: '7. How Verification Data Is Handled', body: 'Verification data is stored securely, used only for compliance and fraud-prevention purposes, and retained per regulatory requirements.' },
	],
};

const slugify = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const ContactPage: React.FC = () => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

	return <div className="contact-page">
		<div className="contact-intro">
			<p className="eyebrow">GlobalPay support</p>
			<h1>Get in touch</h1>
			<p>Questions about your account, a transaction, or how GlobalPay works — reach us directly.</p>
			<div className="contact-details">
				<div><Phone aria-hidden="true" /><span><strong>Phone</strong><a href="tel:0160230129">016-023-0129</a></span></div>
				<div><Mail aria-hidden="true" /><span><strong>Email</strong><a href="mailto:admin@globalinvestments.online">admin@globalinvestments.online</a></span></div>
				<div><MapPin aria-hidden="true" /><span><strong>Address</strong><span>14 Volta Str, CW. 2, Vanderbijlpark, Gauteng, 1900</span></span></div>
			</div>
		</div>
		<form className="contact-form" onSubmit={handleSubmit}>
			<label>Name<input name="name" type="text" autoComplete="name" required /></label>
			<label>Email<input name="email" type="email" autoComplete="email" required /></label>
			<label>Subject<select name="subject" defaultValue="General question"><option>General question</option><option>Account &amp; verification</option><option>Payment issue</option><option>Business enquiry</option><option>Other</option></select></label>
			<label>Message<textarea name="message" rows={6} required /></label>
			<button className="cta-primary" type="submit">Send message</button>
		</form>
	</div>;
};

const LegalDocument: React.FC<{ title: string; sections: LegalSection[] }> = ({ title, sections }) => {
	const [activeSection, setActiveSection] = useState(slugify(sections[0].heading));

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
			if (entry.isIntersecting) setActiveSection(entry.target.id);
		}), { rootMargin: '-100px 0px -60% 0px' });
		sections.forEach((section) => {
			const element = document.getElementById(slugify(section.heading));
			if (element) observer.observe(element);
		});
		return () => observer.disconnect();
	}, [sections]);

	return <div className="legal-page">
		<aside className="legal-sidebar" aria-label={`${title} sections`}>
			{sections.map((section) => { const id = slugify(section.heading); return <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} onClick={(event) => { event.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }}>{section.heading}</a>; })}
		</aside>
		<article className="legal-content">
			<h1>{title}</h1>
			<p className="updated">Last updated: [DATE]</p>
			{sections.map((section) => <section key={section.heading} id={slugify(section.heading)}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
		</article>
	</div>;
};

export const LegalPage: React.FC<{ title: string }> = ({ title }) => title === 'Contact'
	? <ContactPage />
	: <LegalDocument title={title} sections={legalContent[title] ?? []} />;
