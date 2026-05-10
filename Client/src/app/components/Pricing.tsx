"use client";

import { useState } from 'react';
import Link from 'next/link';
import './Pricing.css';

export default function Pricing({ data }: { data?: any }) {
    // Determine active tab initially
    const [activeTab, setActiveTab] = useState<'template' | 'signature'>(data?.settings?.defaultTab || 'template');

    // Default fallback structure if API returns empty array or null
    const safeData = data && !Array.isArray(data) ? data : {
        settings: {
            showTemplateTab: true,
            showSignatureTab: true,
            defaultTab: 'template',
            sectionTitle: 'Simple, Transparent Pricing',
            sectionSubtitle: 'One-time project pricing. No subscriptions, no hidden fees. Pay per project and get a pixel-perfect result every time.'
        },
        template: [],
        signature: []
    };

    const { settings, template, signature } = safeData;

    // Show toggle if both are true, otherwise just show whichever is active (and set it if not matching)
    const showToggle = settings.showTemplateTab && settings.showSignatureTab;
    
    // Safety fallback: if only one tab is shown, force that active tab
    if (!settings.showTemplateTab && activeTab === 'template' && settings.showSignatureTab) {
        setActiveTab('signature');
    }
    if (!settings.showSignatureTab && activeTab === 'signature' && settings.showTemplateTab) {
        setActiveTab('template');
    }

    const activePackages = activeTab === 'template' ? template : signature;

    return (
        <section className="pricing-section section" id="prices">
            <div className="container" style={{ maxWidth: '1040px' }}>
                <div className="pricing-header text-center">
                    <div className="pricing-label-pill">✦ Pricing</div>
                    <h2 className="section-title" dangerouslySetInnerHTML={{
                        __html: settings.sectionTitle.replace('Transparent Pricing', '<span class="text-orange">Transparent Pricing</span>')
                    }}>
                    </h2>
                    <p className="section-subtitle">{settings.sectionSubtitle}</p>

                    {showToggle && (
                        <div className="pricing-toggle-wrapper">
                            <div className="pricing-toggle">
                                <button
                                    className={`toggle-btn ${activeTab === 'template' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('template')}
                                >
                                    📧 Email Templates
                                </button>
                                <button
                                    className={`toggle-btn ${activeTab === 'signature' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('signature')}
                                >
                                    ✍ Email Signatures
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="pricing-grid">
                    {activePackages.map((pkg: any) => {
                        const isNumber = !isNaN(parseFloat(pkg.price)) && isFinite(pkg.price);
                        const displayPrice = isNumber ? `$${pkg.price}` : pkg.price;
                        const ctaLink = pkg.ctaStyle === 'custom' 
                            ? `https://wa.me/8801744350705?text=Hi,%20I'm%20interested%20in%20the%20${pkg.name}%20package` 
                            : `/quote?plan=${pkg.name.toLowerCase().replace(/\s+/g, '-')}`;

                        return (
                            <div key={pkg._id || pkg.name} className={`pricing-card ${pkg.isPopular ? 'popular-card' : ''}`}>
                                {pkg.isPopular && <div className="popular-badge">{pkg.badgeText || 'Most Popular'}</div>}
                                
                                <div className="pricing-info">
                                    <div className="pricing-icon-wrapper" data-style={pkg.ctaStyle}>
                                        <span className="pricing-icon">{pkg.icon}</span>
                                    </div>
                                    {pkg.label && <span className="package-label">{pkg.label}</span>}
                                    <h3 className="package-name">{pkg.name}</h3>
                                    <p className="package-desc">{pkg.description}</p>
                                    
                                    <div className="package-price-row">
                                        {displayPrice === 'Custom' ? (
                                            <div className="custom-price-block">
                                                <span className={`price-amount ${pkg.isPopular ? 'text-orange' : ''}`}>{displayPrice}</span>
                                                <span className="price-period">Get a tailored quote</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span className={`price-amount ${pkg.isPopular ? 'text-orange' : ''}`}>{displayPrice}</span>
                                                <span className="price-period">{pkg.priceUnit}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                
                                <ul className="package-features">
                                    {pkg.features?.sort((a:any, b:any) => a.order - b.order).map((feature: any, fIdx: number) => (
                                        <li key={fIdx} className={feature.included ? 'included' : 'excluded'}>
                                            <span className="feature-icon">
                                                {feature.included ? (
                                                    <span className="check-circle">✓</span>
                                                ) : (
                                                    <span className="dash-circle">—</span>
                                                )}
                                            </span>
                                            <span className="feature-text">{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="pricing-action">
                                    <Link 
                                        href={ctaLink} 
                                        className={`btn full-width ${
                                            pkg.ctaStyle === 'outline' ? 'btn-outline-orange' : 'btn-primary'
                                        }`}
                                    >
                                        {pkg.ctaText}
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="pricing-trust-row">
                    <div className="trust-item"><span className="trust-icon">✓</span> No subscription required</div>
                    <div className="trust-item"><span className="trust-icon">🔄</span> Unlimited revisions on all plans</div>
                    <div className="trust-item"><span className="trust-icon">⚡</span> 24–48hr turnaround</div>
                    <div className="trust-item"><span className="trust-icon">💬</span> WhatsApp support included</div>
                    <div className="trust-item"><span className="trust-icon">🔒</span> 100% satisfaction guarantee</div>
                </div>
            </div>
        </section>
    );
}
