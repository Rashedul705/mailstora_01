'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './quote.css';

const SERVICES = [
    { id: 'Responsive HTML Email Template', title: 'Responsive HTML Email Template', desc: 'Custom coded templates — works in Gmail, Outlook, Apple Mail, & more' },
    { id: 'HTML Email Signature', title: 'HTML Email Signature', desc: 'Professional signature with logo, social links & clickable banner' },
    { id: 'PSD / Figma to HTML Email', title: 'PSD / Figma to HTML Email', desc: 'Convert your existing design into a pixel-perfect coded email' },
    { id: 'Multiple Templates / Bulk Order', title: 'Multiple Templates / Bulk Order', desc: 'Need 5+ templates? Ask for a custom bulk pricing' }
];

const EMAIL_TYPES = [
    'Newsletter', 'Promotional', 'Welcome Email', 'Transactional',
    'Abandoned Cart', 'Drip / Sequence', 'Event Invitation', 'Other'
];

const PLATFORMS = [
    'Mailchimp', 'Klaviyo', 'HubSpot', 'Zoho',
    'ActiveCampaign', 'Constant Contact', 'SendGrid', 'Brevo',
    'MailerLite', 'GetResponse', 'ConvertKit', 'Other'
];

export default function QuotePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        company: '',
        service_type: '',
        email_types: [] as string[],
        esp: '',
        design_status: '',
        project_description: '',
        deadline: '',
        budget: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (field: string, value: string) => {
        const arr = formData[field as keyof typeof formData] as string[];
        const updated = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
        setFormData({ ...formData, [field]: updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('whatsapp', formData.whatsapp);
            submitData.append('company', formData.company);
            submitData.append('service_type', formData.service_type);
            submitData.append('email_types', JSON.stringify(formData.email_types));
            submitData.append('esp', formData.esp);
            submitData.append('design_status', formData.design_status);
            submitData.append('project_description', `${formData.project_description}\n\nDeadline: ${formData.deadline}\nBudget: ${formData.budget}`);

            const res = await fetch('/api/quotes', {
                method: 'POST',
                body: submitData
            });

            if (!res.ok) {
                const errJson = await res.json().catch(() => ({}));
                throw new Error('Failed to save quote: ' + (errJson.error || 'Unknown error'));
            }

            setStatus('success');
            window.scrollTo(0, 0);
        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'An error occurred while submitting your request.');
        }
    };

    return (
        <main className="bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="quote-hero">
                <div className="container text-center">
                    <p className="quote-breadcrumbs">Home &gt; <span className="text-orange">Get Free Quote</span></p>
                    <h1 className="quote-hero-title">Get Your <span className="text-orange">Free Quote</span> Today</h1>
                    <p className="quote-hero-desc">Fill in the details below and receive a custom quote within 2-4 hours. No commitment required.</p>
                    
                    <div className="quote-progress">
                        <div className="progress-step active">
                            <span className="step-icon">✔</span> Your Info
                        </div>
                        <div className="progress-line"></div>
                        <div className="progress-step active">
                            <span className="step-icon orange">2</span> Project Details
                        </div>
                        <div className="progress-line dark"></div>
                        <div className="progress-step inactive">
                            <span className="step-icon outline">3</span> Review & Send
                        </div>
                    </div>
                </div>
            </div>

            {status === 'success' ? (
                <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
                    <div className="quote-success-card">
                        <div className="success-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h2>Quote Request Sent!</h2>
                        <p>Thank you for reaching out. We will review your project details and get back to you with a custom proposal within 2-4 hours.</p>
                        <button className="btn-return" onClick={() => window.location.href = '/'}>Return to Homepage</button>
                    </div>
                </div>
            ) : (
                <div className="container quote-layout">
                    {/* Main Form Column */}
                    <div className="quote-main">
                        {status === 'error' && (
                            <div className="error-banner">
                                <span>⚠️</span> {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} id="quote-form">
                            
                            {/* CLIENT INFORMATION */}
                            <div className="form-card">
                                <div className="card-header">
                                    <span className="card-icon">👤</span>
                                    <h3 className="card-title">CLIENT INFORMATION</h3>
                                </div>
                                <div className="form-grid">
                                    <div className="input-group">
                                        <label>Full Name <span className="req">*</span></label>
                                        <input type="text" name="name" required placeholder="e.g. John Smith" value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className="input-group">
                                        <label>Email Address <span className="req">*</span></label>
                                        <input type="email" name="email" required placeholder="john@company.com" value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className="input-group">
                                        <label>WhatsApp Number <span className="req">*</span></label>
                                        <input type="tel" name="whatsapp" required placeholder="+1 234 567 8900" value={formData.whatsapp} onChange={handleChange} />
                                    </div>
                                    <div className="input-group">
                                        <label>Company / Website</label>
                                        <input type="text" name="company" placeholder="Optional" value={formData.company} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            {/* SERVICE REQUIRED */}
                            <div className="form-card">
                                <div className="card-header">
                                    <span className="card-icon">📋</span>
                                    <h3 className="card-title">SERVICE REQUIRED</h3>
                                </div>
                                <div className="radio-list">
                                    {SERVICES.map((srv) => (
                                        <label key={srv.id} className={`radio-card ${formData.service_type === srv.id ? 'active' : ''}`}>
                                            <div className="radio-btn">
                                                <div className="inner-dot"></div>
                                            </div>
                                            <div className="radio-content">
                                                <input 
                                                    type="radio" 
                                                    name="service_type" 
                                                    value={srv.id} 
                                                    checked={formData.service_type === srv.id} 
                                                    onChange={handleChange} 
                                                    required 
                                                    style={{ display: 'none' }}
                                                />
                                                <h4>{srv.title}</h4>
                                                <p>{srv.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* EMAIL TYPE */}
                            <div className="form-card">
                                <div className="card-header">
                                    <span className="card-icon">✉️</span>
                                    <h3 className="card-title">EMAIL TYPE (SELECT ALL THAT APPLY)</h3>
                                </div>
                                <div className="checkbox-grid">
                                    {EMAIL_TYPES.map(type => (
                                        <label key={type} className={`checkbox-btn ${formData.email_types.includes(type) ? 'active' : ''}`}>
                                            <input 
                                                type="checkbox" 
                                                checked={formData.email_types.includes(type)} 
                                                onChange={() => handleCheckboxChange('email_types', type)} 
                                            />
                                            <span className="check-box">
                                                {formData.email_types.includes(type) && (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                )}
                                            </span>
                                            {type}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* EMAIL PLATFORM */}
                            <div className="form-card">
                                <div className="card-header">
                                    <span className="card-icon">🛠</span>
                                    <h3 className="card-title">EMAIL PLATFORM (ESP)</h3>
                                </div>
                                <p className="label-text">Which platform will you send from? <span className="req">*</span></p>
                                <div className="platform-grid">
                                    {PLATFORMS.map(plat => (
                                        <label key={plat} className={`platform-btn ${formData.esp === plat ? 'active' : ''}`}>
                                            <input 
                                                type="radio" 
                                                name="esp" 
                                                value={plat} 
                                                checked={formData.esp === plat} 
                                                onChange={handleChange} 
                                                required 
                                                style={{ display: 'none' }}
                                            />
                                            {plat}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* DESIGN STATUS */}
                            <div className="form-card">
                                <div className="card-header">
                                    <span className="card-icon">🎨</span>
                                    <h3 className="card-title">DESIGN STATUS</h3>
                                </div>
                                <div className="radio-list">
                                    <label className={`radio-card compact ${formData.design_status === 'have_design' ? 'active' : ''}`}>
                                        <div className="radio-btn"><div className="inner-dot"></div></div>
                                        <div className="radio-content">
                                            <input type="radio" name="design_status" value="have_design" checked={formData.design_status === 'have_design'} onChange={handleChange} required style={{ display: 'none' }} />
                                            <h4>I have a design (PSD / Figma / Image)</h4>
                                            <p>Upload your file below — we'll code it pixel-perfect.</p>
                                        </div>
                                    </label>
                                    <label className={`radio-card compact ${formData.design_status === 'guidelines_only' ? 'active' : ''}`}>
                                        <div className="radio-btn"><div className="inner-dot"></div></div>
                                        <div className="radio-content">
                                            <input type="radio" name="design_status" value="guidelines_only" checked={formData.design_status === 'guidelines_only'} onChange={handleChange} required style={{ display: 'none' }} />
                                            <h4>I have brand guidelines only</h4>
                                            <p>Provide your logo, colors and fonts — we'll design & code.</p>
                                        </div>
                                    </label>
                                    <label className={`radio-card compact ${formData.design_status === 'from_scratch' ? 'active' : ''}`}>
                                        <div className="radio-btn"><div className="inner-dot"></div></div>
                                        <div className="radio-content">
                                            <input type="radio" name="design_status" value="from_scratch" checked={formData.design_status === 'from_scratch'} onChange={handleChange} required style={{ display: 'none' }} />
                                            <h4>I need everything from scratch</h4>
                                            <p>Just describe your needs — we handle design and development.</p>
                                        </div>
                                    </label>
                                </div>

                                <div className="upload-area mt-4">
                                    <p className="upload-label">Upload your design file</p>
                                    <div className="upload-box">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                        </svg>
                                        <p><strong>Click to upload</strong> or drag & drop</p>
                                        <span>PSD, Figma export, PNG, JPG, PDF — max 25MB</span>
                                    </div>
                                </div>
                            </div>

                            {/* PROJECT DETAILS */}
                            <div className="form-card">
                                <div className="card-header">
                                    <span className="card-icon">📝</span>
                                    <h3 className="card-title">PROJECT DETAILS</h3>
                                </div>
                                <div className="input-group full">
                                    <label>Describe Your Project <span className="req">*</span></label>
                                    <textarea 
                                        name="project_description" 
                                        required 
                                        placeholder="Tell us about your project — what kind of email, your target audience, any special requirements, references you like, etc."
                                        value={formData.project_description} 
                                        onChange={handleChange}
                                        rows={5}
                                    ></textarea>
                                </div>
                                <div className="form-grid mt-4">
                                    <div className="input-group">
                                        <label>Preferred Deadline</label>
                                        <select name="deadline" value={formData.deadline} onChange={handleChange}>
                                            <option value="">Select a timeframe</option>
                                            <option value="Within 24 hours">Within 24 hours</option>
                                            <option value="Within 48 hours">Within 48 hours</option>
                                            <option value="1 Week">1 Week</option>
                                            <option value="Flexible">Flexible</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Budget Range</label>
                                        <select name="budget" value={formData.budget} onChange={handleChange}>
                                            <option value="">Select budget...</option>
                                            <option value="Under $50">Under $50</option>
                                            <option value="$50 - $100">$50 - $100</option>
                                            <option value="$100 - $300">$100 - $300</option>
                                            <option value="$300+">$300+</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className="form-submit-card">
                                <div className="submit-text">
                                    <h4>Ready to send your quote request?</h4>
                                    <p>You'll receive a detailed quote within 2-4 hours on your email and WhatsApp.</p>
                                </div>
                                <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Submitting...' : 'Send Quote Request ➔'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar Column */}
                    <div className="quote-sidebar">
                        <div className="sidebar-sticky">
                            <div className="sidebar-card dark">
                                <h3>Why Choose MailStora?</h3>
                                
                                <ul className="why-list">
                                    <li>
                                        <span className="check-circle">✔</span>
                                        <div>
                                            <strong>Outlook & Gmail Guaranteed</strong>
                                            <p>Tested on 30+ email clients before delivery</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="check-circle">⚡</span>
                                        <div>
                                            <strong>24-48 Hour Delivery</strong>
                                            <p>Fast turnaround on all standard projects</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="check-circle">♾️</span>
                                        <div>
                                            <strong>Unlimited Revisions</strong>
                                            <p>We don't stop until you're 100% happy</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="check-circle">★</span>
                                        <div>
                                            <strong>10+ Years Experience</strong>
                                            <p>Specialist, not a generalist</p>
                                        </div>
                                    </li>
                                </ul>

                                <div className="stats-grid">
                                    <div className="stat-box"><strong>400+</strong><span>Templates built</span></div>
                                    <div className="stat-box"><strong>180+</strong><span>Happy clients</span></div>
                                    <div className="stat-box"><strong>100%</strong><span>Satisfaction</span></div>
                                    <div className="stat-box"><strong>24h</strong><span>Avg Response</span></div>
                                </div>

                                <a href="https://wa.me/8801744350705?text=Hi,%20I'm%20interested%20in%20your%20email%20template%20services" target="_blank" rel="noopener noreferrer" className="btn-whatsapp-sidebar">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                    </svg>
                                    Chat on WhatsApp
                                </a>
                                <p className="whatsapp-note">Usually replies within 30 minutes</p>
                            </div>

                            <div className="sidebar-card light">
                                <h3>Quick Contact</h3>
                                <div className="quick-contact-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                    <span>hello@mailstora.com</span>
                                </div>
                                <div className="quick-contact-item">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#6b7280"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                                    <span>WhatsApp: +880 1744 350 705</span>
                                </div>
                                <div className="quick-contact-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    <span>Mon-Sat, 9am–10pm (EST)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </main>
    );
}
