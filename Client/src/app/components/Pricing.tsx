"use client";

import { useState } from 'react';
import Link from 'next/link';
import './Pricing.css';

export default function Pricing() {
    const [activeTab, setActiveTab] = useState<'template' | 'signature'>('template');

    const templatePackages = [
        {
            name: "Single Template",
            price: "$199",
            description: "Perfect for a one-off newsletter or automated welcome email.",
            features: [
                "1 Custom HTML Email Template",
                "Tested in 90+ Email Clients",
                "Mobile Responsive Design",
                "1 Revision Round",
                "2-Day Turnaround"
            ],
            highlighted: false,
            buttonText: "Get Started"
        },
        {
            name: "Standard Package",
            price: "$499",
            description: "The most popular choice for growing businesses and agencies.",
            features: [
                "3 Custom HTML Email Templates",
                "1 Professional HTML Signature",
                "Tested in 90+ Email Clients",
                "Platform Integration (Klaviyo/Mailchimp)",
                "3 Revision Rounds",
                "Premium Support"
            ],
            highlighted: true,
            buttonText: "Choose Standard"
        },
        {
            name: "Enterprise Custom",
            price: "Custom",
            description: "Full service email architecture for complex design systems.",
            features: [
                "Unlimited Custom Templates",
                "Modular Email Design Systems",
                "Dedicated Account Manager",
                "Unlimited Revisions",
                "24/7 Priority Support"
            ],
            highlighted: false,
            buttonText: "Contact Us"
        }
    ];

    const signaturePackages = [
        {
            name: "Basic Signature",
            price: "$49",
            description: "A professional, clickable HTML signature for one person.",
            features: [
                "1 Custom HTML Signature",
                "Tested in major email clients",
                "Clickable links & social icons",
                "1 Revision Round",
                "24-Hour Turnaround"
            ],
            highlighted: false,
            buttonText: "Get Started"
        },
        {
            name: "Team Package",
            price: "$149",
            description: "Standardized signatures for small to medium teams.",
            features: [
                "Up to 5 HTML Signatures",
                "Consistent brand styling",
                "Tested in major email clients",
                "Clickable links & social icons",
                "2 Revision Rounds"
            ],
            highlighted: true,
            buttonText: "Choose Team"
        },
        {
            name: "Company-Wide",
            price: "Custom",
            description: "Scalable signature deployment for large organizations.",
            features: [
                "Unlimited HTML Signatures",
                "Dynamic data integration",
                "Company-Wide Deployment Strategy",
                "Dedicated Support",
                "Unlimited Revisions"
            ],
            highlighted: false,
            buttonText: "Contact Us"
        }
    ];

    const activePackages = activeTab === 'template' ? templatePackages : signaturePackages;

    return (
        <section className="pricing-section section" id="prices">
            <div className="container">
                <div className="pricing-header text-center">
                    <h2 className="section-title">Simple, Transparent Pricing</h2>
                    <p className="section-subtitle">Choose the package that fits your email development needs.</p>

                    <div className="pricing-toggle-wrapper">
                        <div className="pricing-toggle">
                            <button
                                className={`toggle-btn ${activeTab === 'template' ? 'active' : ''}`}
                                onClick={() => setActiveTab('template')}
                            >
                                Email Template
                            </button>
                            <button
                                className={`toggle-btn ${activeTab === 'signature' ? 'active' : ''}`}
                                onClick={() => setActiveTab('signature')}
                            >
                                Email Signature
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pricing-grid">
                    {activePackages.map((pkg, idx) => (
                        <div key={idx} className={`pricing-card ${pkg.highlighted ? 'highlighted' : ''}`}>
                            {pkg.highlighted && <div className="popular-badge">Most Popular</div>}
                            <div className="pricing-info">
                                <h3 className="package-name">{pkg.name}</h3>
                                <p className="package-desc">{pkg.description}</p>
                                <div className="package-price">
                                    <span className="price-amount">{pkg.price}</span>
                                    {pkg.price !== "Custom" && <span className="price-period">/{activeTab === 'template' ? 'project' : 'package'}</span>}
                                </div>
                            </div>
                            <ul className="package-features">
                                {pkg.features.map((feature, fIdx) => (
                                    <li key={fIdx}>
                                        <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="pricing-action">
                                <Link href="/checkout" style={{ width: '100%', display: 'block' }}>
                                    <button className={`btn ${pkg.highlighted ? 'btn-primary' : 'btn-secondary'} full-width`}>
                                        {pkg.buttonText}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
