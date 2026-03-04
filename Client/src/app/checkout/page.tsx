"use client";

import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './checkout.css';

// Base Prices
const PRICES = {
    template: 149,
    signature: 49,
    bundle: 168, // ~15% off 198
};

const ADDONS = {
    template: [
        { id: 'extra-variation', label: 'Extra Variation', price: 20 },
        { id: 'dark-mode', label: 'Dark Mode Version', price: 15 },
        { id: 'amp-version', label: 'AMP Version', price: 25 },
        { id: 'testing-report', label: 'Email Testing Report', price: 10 },
    ],
    signature: [
        { id: 'social-icons', label: 'Social Icons', price: 10 },
        { id: 'cta-button', label: 'CTA Button', price: 10 },
        { id: 'animated-banner', label: 'Animated Banner', price: 15 },
    ],
};

const DELIVERY = [
    { id: 'standard', label: 'Standard (3-4 days)', price: 0 },
    { id: 'express', label: 'Express (48 hours)', price: 25 },
    { id: 'rush', label: '24 Hour Rush', price: 45 },
];

const REVISIONS = [
    { id: 'free', label: '1 Revision', price: 0 },
    { id: 'unlimited', label: 'Unlimited Revisions', price: 20 },
];

export default function CheckoutPage() {
    // State
    const [service, setService] = useState<'template' | 'signature' | 'bundle'>('template');
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [delivery, setDelivery] = useState('standard');
    const [revisions, setRevisions] = useState('free');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Calculations
    const basePrice = PRICES[service];

    // Calculate addons price based on selected items
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
        let addon = ADDONS.template.find(a => a.id === addonId) || ADDONS.signature.find(a => a.id === addonId);
        return total + (addon ? addon.price : 0);
    }, 0);

    const deliveryPrice = DELIVERY.find(d => d.id === delivery)?.price || 0;
    const revisionsPrice = REVISIONS.find(r => r.id === revisions)?.price || 0;

    const subtotal = basePrice + addonsPrice + deliveryPrice + revisionsPrice;
    const total = subtotal; // Assuming no tax/fees for now

    // Handlers
    const togglePlatform = (p: string) => {
        setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
    };

    const toggleAddon = (addonId: string) => {
        setSelectedAddons(prev => prev.includes(addonId) ? prev.filter(x => x !== addonId) : [...prev, addonId]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            setUploadedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const removeFile = (indexToRemove: number) => {
        setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <main className="checkout-page-root">
            <Navbar />
            <div className="checkout-container">
                <div className="checkout-header">
                    <h1>Secure Checkout</h1>
                    <p>Complete your order securely below.</p>
                </div>

                <div className="checkout-grid">
                    {/* Left Column: Form */}
                    <div className="checkout-form">

                        {/* SECTION 1: Service Selection */}
                        <section className="checkout-section">
                            <h2>1. Select Service</h2>
                            <div className="radio-cards">
                                <label className={`radio-card ${service === 'template' ? 'active' : ''}`}>
                                    <input type="radio" name="service" value="template" checked={service === 'template'} onChange={() => setService('template')} />
                                    <div className="radio-card-content">
                                        <span className="radio-card-title">Custom HTML Email Template</span>
                                        <span className="radio-card-price">${PRICES.template}</span>
                                    </div>
                                </label>
                                <label className={`radio-card ${service === 'signature' ? 'active' : ''}`}>
                                    <input type="radio" name="service" value="signature" checked={service === 'signature'} onChange={() => setService('signature')} />
                                    <div className="radio-card-content">
                                        <span className="radio-card-title">Professional Email Signature</span>
                                        <span className="radio-card-price">${PRICES.signature}</span>
                                    </div>
                                </label>
                                <label className={`radio-card ${service === 'bundle' ? 'active' : ''}`}>
                                    <input type="radio" name="service" value="bundle" checked={service === 'bundle'} onChange={() => setService('bundle')} />
                                    <div className="radio-card-content">
                                        <div className="radio-card-title-wrap">
                                            <span className="radio-card-title">Bundle (Template + Signature)</span>
                                            <span className="badge">Save 15%</span>
                                        </div>
                                        <span className="radio-card-price">${PRICES.bundle}</span>
                                    </div>
                                </label>
                            </div>
                        </section>

                        {/* SECTION 2: Project Details */}
                        <section className="checkout-section">
                            <h2>2. Project Details</h2>
                            <div className="form-group">
                                <label>Describe your requirements</label>
                                <textarea rows={4} placeholder="E.g., I need a promotional newsletter template matching my website's branding..."></textarea>
                            </div>
                            <div className="form-group">
                                <label>Target Platform</label>
                                <div className="checkbox-grid">
                                    {['Mailchimp', 'Klaviyo', 'HubSpot', 'Outlook', 'Gmail', 'Other'].map(p => (
                                        <label key={p} className="checkbox-item">
                                            <input type="checkbox" checked={platforms.includes(p)} onChange={() => togglePlatform(p)} />
                                            <span>{p}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* SECTION 3: File Upload */}
                        <section className="checkout-section">
                            <h2>3. File Upload</h2>
                            <p className="section-desc">Upload your design files (Figma, XD, PSD) or brand assets (Logo, Fonts).</p>
                            <div
                                className={`upload-area ${isDragging ? 'drag-active' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    multiple
                                    className="hidden-file-input"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".zip,.pdf,.fig,.png,.jpg,.jpeg"
                                />
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="upload-icon">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <span><strong>Drag & drop files here</strong> or click to browse</span>
                                <small>Supported formats: ZIP, PDF, FIG, PNG, JPG (Max 50MB)</small>
                            </div>

                            {uploadedFiles.length > 0 && (
                                <ul className="file-preview-list">
                                    {uploadedFiles.map((file, index) => (
                                        <li key={index} className="file-preview-item">
                                            <div className="file-info">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                                <span className="file-name">{file.name}</span>
                                                <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-remove-file"
                                                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>

                        {/* SECTION 4: Add-ons */}
                        <section className="checkout-section">
                            <h2>4. Add-ons</h2>

                            {(service === 'template' || service === 'bundle') && (
                                <div className="addon-group">
                                    <h4 className="addon-group-title">Email Template Add-ons</h4>
                                    <div className="checkbox-cards">
                                        {ADDONS.template.map(addon => (
                                            <label key={addon.id} className={`checkbox-card ${selectedAddons.includes(addon.id) ? 'active' : ''}`}>
                                                <input type="checkbox" checked={selectedAddons.includes(addon.id)} onChange={() => toggleAddon(addon.id)} />
                                                <div className="checkbox-card-content">
                                                    <span>{addon.label}</span>
                                                    <span className="price-tag">+${addon.price}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(service === 'signature' || service === 'bundle') && (
                                <div className="addon-group">
                                    <h4 className="addon-group-title">Email Signature Add-ons</h4>
                                    <div className="checkbox-cards">
                                        {ADDONS.signature.map(addon => (
                                            <label key={addon.id} className={`checkbox-card ${selectedAddons.includes(addon.id) ? 'active' : ''}`}>
                                                <input type="checkbox" checked={selectedAddons.includes(addon.id)} onChange={() => toggleAddon(addon.id)} />
                                                <div className="checkbox-card-content">
                                                    <span>{addon.label}</span>
                                                    <span className="price-tag">+${addon.price}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* SECTION 5: Delivery Speed */}
                        <section className="checkout-section">
                            <h2>5. Delivery Speed</h2>
                            <div className="radio-cards column">
                                {DELIVERY.map(opt => (
                                    <label key={opt.id} className={`radio-card outline ${delivery === opt.id ? 'active' : ''}`}>
                                        <input type="radio" name="delivery" value={opt.id} checked={delivery === opt.id} onChange={() => setDelivery(opt.id)} />
                                        <div className="radio-card-content">
                                            <span className="radio-card-title">{opt.label}</span>
                                            <span className="radio-card-price">{opt.price === 0 ? 'Free' : `+$${opt.price}`}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* SECTION 6: Revisions */}
                        <section className="checkout-section">
                            <h2>6. Revisions</h2>
                            <div className="radio-cards column">
                                {REVISIONS.map(opt => (
                                    <label key={opt.id} className={`radio-card outline ${revisions === opt.id ? 'active' : ''}`}>
                                        <input type="radio" name="revisions" value={opt.id} checked={revisions === opt.id} onChange={() => setRevisions(opt.id)} />
                                        <div className="radio-card-content">
                                            <span className="radio-card-title">{opt.label}</span>
                                            <span className="radio-card-price">{opt.price === 0 ? 'Free' : `+$${opt.price}`}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* SECTION 7: Customer Info */}
                        <section className="checkout-section">
                            <h2>7. Customer Info</h2>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Full Name *</label>
                                    <input type="text" placeholder="John Doe" required />
                                </div>
                                <div className="form-group half">
                                    <label>Business Name (Optional)</label>
                                    <input type="text" placeholder="Acme Corp" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Email Address *</label>
                                    <input type="email" placeholder="john@example.com" required />
                                </div>
                                <div className="form-group half">
                                    <label>Phone (Optional)</label>
                                    <input type="tel" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                        </section>

                        {/* SECTION 8: Payment Section */}
                        <section className="checkout-section">
                            <h2>8. Payment Method</h2>
                            <div className="payment-options">
                                <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                    <div className="payment-option-content">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                            <line x1="1" y1="10" x2="23" y2="10"></line>
                                        </svg>
                                        <span>Credit / Debit Card</span>
                                    </div>
                                </label>
                                <label className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                                    <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
                                    <div className="payment-option-content">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7.144 19.532l1.049-5.751c.11-.606.691-1.002 1.304-1.002h2.839c3.24 0 5.05-1.53 5.432-4.633.327-2.651-1.053-4.322-3.876-4.322H9.053c-.613 0-1.194.396-1.304 1.002L5.05 19.532h2.094z"></path>
                                            <path d="M12.333 12.779h-2.839c-.613 0-1.194.396-1.304 1.002l-1.049 5.751h-2.094L7.746 4.825C7.856 4.218 8.44 3.822 9.053 3.822h4.839c2.823 0 4.203 1.671 3.876 4.322-.382 3.103-2.192 4.633-5.435 4.633z"></path>
                                        </svg>
                                        <span>PayPal</span>
                                    </div>
                                </label>
                            </div>

                            {/* Dummy Card Input */}
                            {paymentMethod === 'card' && (
                                <div className="card-input-wrapper">
                                    <div className="form-group">
                                        <label>Card Number</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="card-input" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group half">
                                            <label>Expiry Date</label>
                                            <input type="text" placeholder="MM/YY" />
                                        </div>
                                        <div className="form-group half">
                                            <label>CVC</label>
                                            <input type="text" placeholder="123" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="checkout-sidebar">
                        <div className="sticky-summary">
                            <h3>Order Summary</h3>

                            <div className="summary-list">
                                <div className="summary-item">
                                    <span className="summary-item-name">
                                        {service === 'template' ? 'Custom HTML Email Template' :
                                            service === 'signature' ? 'Professional Email Signature' :
                                                'Bundle (Template + Signature)'}
                                    </span>
                                    <span className="summary-item-price">${basePrice}</span>
                                </div>

                                {selectedAddons.map(addonId => {
                                    let addon = ADDONS.template.find(a => a.id === addonId) || ADDONS.signature.find(a => a.id === addonId);
                                    if (!addon) return null;
                                    return (
                                        <div key={addon.id} className="summary-item sm">
                                            <span className="summary-item-name">+ {addon.label}</span>
                                            <span className="summary-item-price">${addon.price}</span>
                                        </div>
                                    );
                                })}

                                {delivery !== 'standard' && (
                                    <div className="summary-item sm">
                                        <span className="summary-item-name">+ {DELIVERY.find(d => d.id === delivery)?.label}</span>
                                        <span className="summary-item-price">${deliveryPrice}</span>
                                    </div>
                                )}

                                {revisions !== 'free' && (
                                    <div className="summary-item sm">
                                        <span className="summary-item-name">+ {REVISIONS.find(r => r.id === revisions)?.label}</span>
                                        <span className="summary-item-price">${revisionsPrice}</span>
                                    </div>
                                )}
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-total">
                                <span>Total Due</span>
                                <span className="total-amount">${total}</span>
                            </div>

                            <button className="btn-checkout-submit">Complete Secure Order</button>

                            <div className="trust-badges">
                                <div className="badge-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                    <span>Secure 256-bit SSL Payment</span>
                                </div>
                                <div className="badge-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8l-8 8"></path><path d="M8 8l8 8"></path></svg>
                                    <span>100% Satisfaction Guarantee</span>
                                </div>
                                <div className="badge-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span>200+ Clients Served Globally</span>
                                </div>
                                <div className="badge-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="M2 10h20"></path></svg>
                                    <span>Tested in 30+ Email Clients</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
