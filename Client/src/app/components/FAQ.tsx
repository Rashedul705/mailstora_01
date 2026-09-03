'use client';

import { useState } from 'react';
import './FAQ.css';

const faqs = [
    {
        q: "Which email and e-commerce platforms do you support?",
        a: "We deeply specialize in Klaviyo and Shopify for e-commerce. For email templates, we support all major ESPs including Mailchimp, HubSpot, Campaign Monitor, ActiveCampaign, and Salesforce.",
    },
    {
        q: "What is included in your Klaviyo Automation setups?",
        a: "We set up complete, revenue-generating lifecycle flows. This includes Welcome Series, Abandoned Cart, Browse Abandonment, and Post-Purchase sequences, fully equipped with dynamic product logic and audience segmentation.",
    },
    {
        q: "Do you offer custom Shopify store development?",
        a: "Yes, we build fast, high-converting custom Shopify stores. We handle theme customization, speed optimization, seamless app integrations, and mobile-first checkout experiences.",
    },
    {
        q: "How does your Social Media Management work?",
        a: "We handle your social presence end-to-end. This includes a consistent posting schedule, branded content creation, hashtag optimization, community engagement, and detailed monthly performance reporting.",
    },
    {
        q: "How long does delivery take?",
        a: "HTML email templates and signatures are typically delivered within 24–48 hours. Comprehensive Klaviyo flow setups or ESP campaigns take 3–5 days, while full Shopify store development timelines depend on your specific project scope.",
    },
    {
        q: "Do you work from Figma or PSD designs?",
        a: "Absolutely. We can convert your Figma, Adobe XD, or PSD files into pixel-perfect HTML emails or fully functional Shopify themes. If you don't have a design, we can create one for you!",
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
                <div className="faq-split-layout">
                    {/* Left Column: Title and CTA card */}
                    <div className="faq-sidebar">
                        <h2 className="faq-title">Frequently Asked Questions</h2>
                        <p className="faq-subtitle">Everything you need to know before getting started.</p>
                        
                        <div className="faq-cta-card">
                            <h3>Still have questions?</h3>
                            <p>Can't find the answers you need? Get in touch and we'll reply in minutes.</p>
                            <a href="https://wa.me/8801744350705?text=Hi,%20I've%20read%20the%20FAQs%20but%20have%20a%20few%20questions..." target="_blank" rel="noopener noreferrer" className="faq-cta-btn">
                                💬 Ask on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Accordions List */}
                    <div className="faq-list-wrap">
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
                </div>
            </div>
        </section>
    );
}
