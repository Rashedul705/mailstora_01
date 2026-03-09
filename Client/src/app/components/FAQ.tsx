'use client';

import { useState } from 'react';
import './FAQ.css';

const faqs = [
    {
        q: "Do the emails work in Outlook?",
        a: "Yes. Every template is rigorously tested in Outlook 2016, 2019, 2021, and Outlook 365, the most challenging email clients to code for. We use table-based layouts and inline CSS to ensure pixel-perfect rendering.",
    },
    {
        q: "Which email platforms do you support?",
        a: "All major platforms including Mailchimp, Klaviyo, HubSpot, Campaign Monitor, ActiveCampaign, Salesforce Marketing Cloud, and more. Templates are delivered as clean HTML ready for any ESP.",
    },
    {
        q: "How long does delivery take?",
        a: "Most email templates are delivered within 24–48 hours. More complex templates or full design systems may take 3–5 business days. Turnaround time is always confirmed upfront.",
    },
    {
        q: "Can I request revisions?",
        a: "Absolutely. Each package includes revision rounds as specified. We work with you until you're 100% satisfied before final delivery.",
    },
    {
        q: "Do you work from Figma or PSD designs?",
        a: "Yes, we accept Figma, Adobe XD, PSD, or even simple PDF / image references. If you don't have a design, we can also create one based on your brand guidelines.",
    },
    {
        q: "What file formats do you deliver?",
        a: "You'll receive a clean .html file with all styles inlined, ready to import into your ESP. We also provide separate image assets and a quick-start guide for your platform.",
    },
];

export default function FAQ({ data = [] }: { data?: any[] }) {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const displayFaqs = data.length > 0 ? data : faqs;

    const toggle = (idx: number) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };

    return (
        <section className="faq-section section section-alt">
            <div className="container">
                <div className="faq-header text-center">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-subtitle">Everything you need to know before getting started.</p>
                </div>

                <div className="faq-list">
                    {displayFaqs.map((faq, idx) => (
                        <div key={idx} className={`faq-item ${openIdx === idx ? 'open' : ''}`}>
                            <button
                                className="faq-question"
                                onClick={() => toggle(idx)}
                                aria-expanded={openIdx === idx}
                            >
                                <span>{faq.question || faq.q}</span>
                                <span className="faq-chevron">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </span>
                            </button>
                            {openIdx === idx && (
                                <div className="faq-answer">
                                    <p>{faq.answer || faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
