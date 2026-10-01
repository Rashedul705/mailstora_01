"use client";

import { useState } from 'react';
import Link from 'next/link';
import './Pricing.css';

export default function Pricing({ data }: { data?: any }) {
    const [activeTab, setActiveTab] = useState<string>(data?.settings?.defaultTab || 'template');

    // Default fallback structure if API returns empty array or null
    const safeData = data && !Array.isArray(data) ? data : {
        settings: {
            showTemplateTab: true,
            showSignatureTab: true,
            showKlaviyoFlowTab: true,
            showEspCampaignTab: true,
            showShopifyTab: true,
            showSocialMediaTab: true,
            defaultTab: 'template',
            sectionTitle: 'Simple, Transparent Pricing',
            sectionSubtitle: 'One-time project pricing. No subscriptions, no hidden fees. Pay per project and get a pixel-perfect result every time.'
        },
        template: [],
        signature: [],
        klaviyo_flow: [],
        esp_campaign: [],
        shopify: [],
        social_media: []
    };

    const { settings } = safeData;

    const availableTabs = [
        { id: 'template', label: '📧 Email Templates', show: settings.showTemplateTab !== false },
        { id: 'signature', label: '✍ Email Signatures', show: settings.showSignatureTab !== false },
        { id: 'klaviyo_flow', label: '⚡ Klaviyo Automation', show: settings.showKlaviyoFlowTab !== false },
        { id: 'esp_campaign', label: '🚀 ESP Campaigns', show: settings.showEspCampaignTab !== false },
        { id: 'shopify', label: '🛒 Shopify Development', show: settings.showShopifyTab !== false },
        { id: 'social_media', label: '📱 Social Media', show: settings.showSocialMediaTab !== false }
    ].filter(tab => tab.show);

    // Safety fallback: if current activeTab is not in availableTabs, set it to the first available
    if (availableTabs.length > 0 && !availableTabs.find(t => t.id === activeTab)) {
        setActiveTab(availableTabs[0].id);
    }

    const activePackages = safeData[activeTab] || [];

    return (
        <section className="pricing-section section" id="prices">
            <div className="container" style={{ maxWidth: '1040px' }}>
                <div className="pricing-header text-center">
                    <h2 className="section-title" dangerouslySetInnerHTML={{
                        __html: settings.sectionTitle.replace('Transparent Pricing', '<span class="text-orange">Transparent Pricing</span>')
                    }}>
                    </h2>
                    <p className="section-subtitle">{settings.sectionSubtitle}</p>

                    {availableTabs.length > 1 && (
                        <div className="pricing-toggle-wrapper">
                            <div className="pricing-toggle" style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '5px' }}>
                                {availableTabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        className={`toggle-btn ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
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
