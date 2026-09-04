'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './quote.css';
import { COUNTRY_CODES } from './countries';

const SERVICES = [
    { id: 'HTML Email Templates', title: 'HTML Email Templates', desc: 'Hand-coded clean HTML, fully responsive', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
    ) },
    { id: 'HTML Email Signatures', title: 'HTML Email Signatures', desc: 'Professional, clickable & brand-consistent', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
    ) },
    { id: 'Klaviyo Automation Flow', title: 'Klaviyo Automation Flow', desc: 'Welcome, abandon cart & browse flows', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    ) },
    { id: 'Campaign Setup', title: 'Campaign Setup', desc: 'Full campaign scheduling & deployment', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    ) },
    { id: 'Shopify Store Development', title: 'Shopify Development', desc: 'Custom themes, fast & high-converting', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
    ) },
    { id: 'Social Media Management', title: 'Social Media', desc: 'Branded content & community growth', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
    ) }
];

const EMAIL_TYPES = ['Newsletter', 'Promotional', 'Welcome Email', 'Transactional', 'Abandoned Cart', 'Drip / Sequence', 'Event Invitation', 'Other'];
const PLATFORMS = ['Mailchimp', 'Klaviyo', 'HubSpot', 'Zoho', 'ActiveCampaign', 'Constant Contact', 'SendGrid', 'Brevo', 'MailerLite', 'GetResponse', 'ConvertKit', 'Other'];
const FLOWS = ['Welcome Series', 'Abandoned Cart', 'Browse Abandonment', 'Post-Purchase', 'Win-back', 'Birthday/Anniversary', 'Sunset/Re-engagement', 'Other'];
const SOCIAL_PLATFORMS = ['Instagram', 'Facebook', 'X (Twitter)', 'TikTok', 'Pinterest', 'LinkedIn', 'Other'];
const CONTENT_TYPES = ['Posts', 'Reels/Short-form Video', 'Stories', 'Captions Only'];

export default function QuotePage() {
    const [formData, setFormData] = useState({
        name: '', email: '', countryCode: '+1', whatsapp: '', company: '',
        budget: '', timeline: '',
        services: [] as string[],
        serviceDetails: {
            'HTML Email Templates': { designStatus: '', templateCount: '', emailTypes: [] as string[], esp: [] as string[], projectDetails: '' },
            'HTML Email Signatures': { designStatus: '', signatureCount: '', logoReady: '', projectDetails: '' },
            'Klaviyo Automation Flow': { flowsNeeded: [] as string[], emailsPerFlow: '', designStatus: '', projectDetails: '' },
            'Campaign Setup': { designStatus: '', campaignsNeeded: '', projectDetails: '' },
            'Shopify Store Development': { designReady: '', designLink: '', themePicked: '', storeType: '', productCount: '', customLiquid: '', customLiquidDetails: '', projectDetails: '' },
            'Social Media Management': { platforms: [] as string[], handles: {} as Record<string, string>, contentTypes: [] as string[], frequency: '', projectDetails: '' }
        } as Record<string, any>,
        overallProjectDetails: '',
        attachmentUrl: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleService = (serviceId: string) => {
        setFormData(prev => {
            const arr = prev.services;
            const updated = arr.includes(serviceId) ? arr.filter(s => s !== serviceId) : [...arr, serviceId];
            return { ...prev, services: updated };
        });
    };

    const handleServiceDetailChange = (serviceId: string, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            serviceDetails: {
                ...prev.serviceDetails,
                [serviceId]: {
                    ...prev.serviceDetails[serviceId],
                    [field]: value
                }
            }
        }));
    };

    const toggleServiceDetailArray = (serviceId: string, field: string, value: string) => {
        setFormData(prev => {
            const arr = prev.serviceDetails[serviceId][field] || [];
            const updated = arr.includes(value) ? arr.filter((v: string) => v !== value) : [...arr, value];
            return {
                ...prev,
                serviceDetails: {
                    ...prev.serviceDetails,
                    [serviceId]: {
                        ...prev.serviceDetails[serviceId],
                        [field]: updated
                    }
                }
            }
        });
    };

    const handleSocialHandleChange = (platform: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            serviceDetails: {
                ...prev.serviceDetails,
                'Social Media Management': {
                    ...prev.serviceDetails['Social Media Management'],
                    handles: {
                        ...(prev.serviceDetails['Social Media Management']?.handles || {}),
                        [platform]: value
                    }
                }
            }
        }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 20 * 1024 * 1024) {
            alert('File size must be less than 20MB');
            return;
        }

        setUploading(true);
        setFileName(file.name);

        const isImage = file.type.startsWith('image/');
        const uploadEndpoint = isImage ? '/api/upload-imgbb' : '/api/upload-file';
        const fileParam = isImage ? 'image' : 'file';

        try {
            const formDataUpload = new FormData();
            formDataUpload.append(fileParam, file);

            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_BASE}${uploadEndpoint}`, { method: 'POST', body: formDataUpload });

            if (!res.ok) throw new Error('Failed to upload file');
            const data = await res.json();
            
            const fileUrl = data.imageUrl || `${API_BASE}/api/file/${data.fileId}`;
            setFormData(prev => ({ ...prev, attachmentUrl: fileUrl }));
        } catch (error) {
            console.error('Upload error:', error);
            alert('File upload failed. Please try again.');
            setFileName('');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const payload = {
                ...formData,
                whatsapp: `${formData.countryCode} ${formData.whatsapp}`
            };

            const res = await fetch('/api/quotes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errJson = await res.json().catch(() => ({}));
                throw new Error(errJson.error || 'Unknown error');
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
                </div>
            </div>

            {status === 'success' ? (
                <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
                    <div className="quote-success-card">
                        <div className="success-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <h2>Quote Request Sent!</h2>
                        <p>Thank you for reaching out. We will review your project details and get back to you with a custom proposal within 2-4 hours on your email and WhatsApp.</p>
                        <button className="btn-return" onClick={() => window.location.href = '/'}>Return to Homepage</button>
                    </div>
                </div>
            ) : (
                <div className="container quote-layout">
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
                                        <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
                                            <select 
                                                name="countryCode" 
                                                value={formData.countryCode} 
                                                onChange={handleChange} 
                                                style={{ border: 'none', background: '#f3f4f6', padding: '0.75rem', width: '90px', borderRight: '1px solid #d1d5db', outline: 'none' }}
                                            >
                                                {COUNTRY_CODES.map(c => (
                                                    <option key={`${c.code}-${c.country}`} value={c.code}>
                                                        {c.code} ({c.country})
                                                    </option>
                                                ))}
                                            </select>
                                            <input type="tel" name="whatsapp" required placeholder="234 567 8900" value={formData.whatsapp} onChange={handleChange} style={{ border: 'none', flex: 1, borderRadius: 0, outline: 'none' }} />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label>Company / Website</label>
                                        <input type="text" name="company" placeholder="Optional" value={formData.company} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            {/* SERVICES REQUIRED */}
                            <div className="form-card">
                                <div className="card-header">
                                    <span className="card-icon">📋</span>
                                    <h3 className="card-title">SERVICES REQUIRED (SELECT ALL THAT APPLY)</h3>
                                </div>
                                <div className="service-grid">
                                    {SERVICES.map((srv) => (
                                        <label key={srv.id} className={`service-card-modern ${formData.services.includes(srv.id) ? 'active' : ''}`}>
                                            <input 
                                                type="checkbox" 
                                                checked={formData.services.includes(srv.id)} 
                                                onChange={() => toggleService(srv.id)} 
                                                style={{ display: 'none' }}
                                            />
                                            <div className="scm-icon">{srv.icon}</div>
                                            <div className="scm-content">
                                                <h4>{srv.title}</h4>
                                                <p>{srv.desc}</p>
                                            </div>
                                            <div className="scm-check">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* DYNAMIC SERVICE QUESTIONS */}
                            {formData.services.includes('HTML Email Templates') && (
                                <div className="form-card">
                                    <div className="card-header"><span className="card-icon">💻</span><h3 className="card-title">HTML EMAIL TEMPLATES DETAILS</h3></div>
                                    <div className="input-group full mb-4">
                                        <label>Design Status <span className="req">*</span></label>
                                        <select required value={formData.serviceDetails['HTML Email Templates'].designStatus} onChange={(e) => handleServiceDetailChange('HTML Email Templates', 'designStatus', e.target.value)} className="w-full p-2 border rounded">
                                            <option value="">Select option</option>
                                            <option value="I have a design (PSD/Figma/Image)">I have a design (PSD/Figma/Image)</option>
                                            <option value="I only have brand guidelines">I only have brand guidelines</option>
                                            <option value="I need everything from scratch">I need everything from scratch</option>
                                        </select>
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>How many templates are needed? <span className="req">*</span></label>
                                        <input type="text" required placeholder="e.g. 3 templates" value={formData.serviceDetails['HTML Email Templates'].templateCount} onChange={(e) => handleServiceDetailChange('HTML Email Templates', 'templateCount', e.target.value)} />
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>Email Type (Select all that apply) <span className="req">*</span></label>
                                        <div className="checkbox-grid">
                                            {EMAIL_TYPES.map(type => (
                                                <label key={type} className={`checkbox-btn ${formData.serviceDetails['HTML Email Templates'].emailTypes.includes(type) ? 'active' : ''}`}>
                                                    <input type="checkbox" checked={formData.serviceDetails['HTML Email Templates'].emailTypes.includes(type)} onChange={() => toggleServiceDetailArray('HTML Email Templates', 'emailTypes', type)} />
                                                    <span className="check-box">{formData.serviceDetails['HTML Email Templates'].emailTypes.includes(type) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}</span>
                                                    {type}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>Email Platform (ESP) (Select all that apply) <span className="req">*</span></label>
                                        <div className="platform-grid">
                                            {PLATFORMS.map(plat => (
                                                <label key={plat} className={`platform-btn ${formData.serviceDetails['HTML Email Templates'].esp.includes(plat) ? 'active' : ''}`}>
                                                    <input type="checkbox" style={{ display: 'none' }} checked={formData.serviceDetails['HTML Email Templates'].esp.includes(plat)} onChange={() => toggleServiceDetailArray('HTML Email Templates', 'esp', plat)} />
                                                    {plat}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group full">
                                        <label>Template Project Details</label>
                                        <textarea placeholder="Any specific requirements for these templates?" rows={3} value={formData.serviceDetails['HTML Email Templates'].projectDetails} onChange={(e) => handleServiceDetailChange('HTML Email Templates', 'projectDetails', e.target.value)}></textarea>
                                    </div>
                                </div>
                            )}

                            {formData.services.includes('HTML Email Signatures') && (
                                <div className="form-card">
                                    <div className="card-header"><span className="card-icon">📝</span><h3 className="card-title">HTML EMAIL SIGNATURES DETAILS</h3></div>
                                    <div className="input-group full mb-4">
                                        <label>Design Status <span className="req">*</span></label>
                                        <select required value={formData.serviceDetails['HTML Email Signatures'].designStatus} onChange={(e) => handleServiceDetailChange('HTML Email Signatures', 'designStatus', e.target.value)} className="w-full p-2 border rounded">
                                            <option value="">Select option</option>
                                            <option value="I have a design">I have a design</option>
                                            <option value="I only have brand guidelines">I only have brand guidelines</option>
                                            <option value="I need everything from scratch">I need everything from scratch</option>
                                        </select>
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>How many signatures are needed? <span className="req">*</span></label>
                                        <input type="text" required placeholder="e.g. Just for me, or Team of 10" value={formData.serviceDetails['HTML Email Signatures'].signatureCount} onChange={(e) => handleServiceDetailChange('HTML Email Signatures', 'signatureCount', e.target.value)} />
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>Is logo and brand color ready? <span className="req">*</span></label>
                                        <select required value={formData.serviceDetails['HTML Email Signatures'].logoReady} onChange={(e) => handleServiceDetailChange('HTML Email Signatures', 'logoReady', e.target.value)} className="w-full p-2 border rounded">
                                            <option value="">Select option</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="input-group full">
                                        <label>Signature Project Details</label>
                                        <textarea placeholder="Any specific social links, banners, or layout ideas?" rows={3} value={formData.serviceDetails['HTML Email Signatures'].projectDetails} onChange={(e) => handleServiceDetailChange('HTML Email Signatures', 'projectDetails', e.target.value)}></textarea>
                                    </div>
                                </div>
                            )}

                            {formData.services.includes('Klaviyo Automation Flow') && (
                                <div className="form-card">
                                    <div className="card-header"><span className="card-icon">⚙️</span><h3 className="card-title">KLAVIYO AUTOMATION FLOW DETAILS</h3></div>
                                    <div className="input-group full mb-4">
                                        <label>Which flows are needed? (Select all that apply) <span className="req">*</span></label>
                                        <div className="checkbox-grid">
                                            {FLOWS.map(flow => (
                                                <label key={flow} className={`checkbox-btn ${formData.serviceDetails['Klaviyo Automation Flow'].flowsNeeded.includes(flow) ? 'active' : ''}`}>
                                                    <input type="checkbox" checked={formData.serviceDetails['Klaviyo Automation Flow'].flowsNeeded.includes(flow)} onChange={() => toggleServiceDetailArray('Klaviyo Automation Flow', 'flowsNeeded', flow)} />
                                                    <span className="check-box">{formData.serviceDetails['Klaviyo Automation Flow'].flowsNeeded.includes(flow) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}</span>
                                                    {flow}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>Roughly how many emails per flow? <span className="req">*</span></label>
                                        <select required value={formData.serviceDetails['Klaviyo Automation Flow'].emailsPerFlow} onChange={(e) => handleServiceDetailChange('Klaviyo Automation Flow', 'emailsPerFlow', e.target.value)} className="w-full p-2 border rounded">
                                            <option value="">Select option</option>
                                            <option value="1-2 emails">1-2 emails</option>
                                            <option value="3-4 emails">3-4 emails</option>
                                            <option value="5+ emails">5+ emails</option>
                                        </select>
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>Is the email template already designed? <span className="req">*</span></label>
                                        <select required value={formData.serviceDetails['Klaviyo Automation Flow'].designStatus} onChange={(e) => handleServiceDetailChange('Klaviyo Automation Flow', 'designStatus', e.target.value)} className="w-full p-2 border rounded">
                                            <option value="">Select option</option>
                                            <option value="Template is already designed">Template is already designed</option>
                                            <option value="I need it designed">I need it designed</option>
                                            <option value="I only have a design guide/branding">I only have a design guide/branding</option>
                                        </select>
                                    </div>
                                    <div className="input-group full">
                                        <label>Flow Project Details</label>
                                        <textarea placeholder="Specific triggers, timing, or dynamic content needed?" rows={3} value={formData.serviceDetails['Klaviyo Automation Flow'].projectDetails} onChange={(e) => handleServiceDetailChange('Klaviyo Automation Flow', 'projectDetails', e.target.value)}></textarea>
                                    </div>
                                </div>
                            )}

                            {formData.services.includes('Campaign Setup') && (
                                <div className="form-card">
                                    <div className="card-header"><span className="card-icon">🚀</span><h3 className="card-title">CAMPAIGN SETUP DETAILS</h3></div>
                                    <div className="input-group full mb-4">
                                        <label>Is the email template already designed? <span className="req">*</span></label>
                                        <select required value={formData.serviceDetails['Campaign Setup'].designStatus} onChange={(e) => handleServiceDetailChange('Campaign Setup', 'designStatus', e.target.value)} className="w-full p-2 border rounded">
                                            <option value="">Select option</option>
                                            <option value="Template is already designed">Template is already designed</option>
                                            <option value="I need it designed">I need it designed</option>
                                            <option value="I only have a design guide">I only have a design guide</option>
                                        </select>
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>How many campaigns are needed, and frequency? <span className="req">*</span></label>
                                        <input type="text" required placeholder="e.g. One-time send, or 2 sends per week" value={formData.serviceDetails['Campaign Setup'].campaignsNeeded} onChange={(e) => handleServiceDetailChange('Campaign Setup', 'campaignsNeeded', e.target.value)} />
                                    </div>
                                    <div className="input-group full">
                                        <label>Campaign Project Details</label>
                                        <textarea placeholder="Details on audience segmentation, scheduling, or A/B testing?" rows={3} value={formData.serviceDetails['Campaign Setup'].projectDetails} onChange={(e) => handleServiceDetailChange('Campaign Setup', 'projectDetails', e.target.value)}></textarea>
                                    </div>
                                </div>
                            )}

                            {formData.services.includes('Shopify Store Development') && (
                                <div className="form-card">
                                    <div className="card-header"><span className="card-icon">🛍️</span><h3 className="card-title">SHOPIFY DEVELOPMENT DETAILS</h3></div>
                                    <div className="input-group full mb-4">
                                        <label>Is there a design idea ready? <span className="req">*</span></label>
                                        <select required value={formData.serviceDetails['Shopify Store Development'].designReady} onChange={(e) => handleServiceDetailChange('Shopify Store Development', 'designReady', e.target.value)} className="w-full p-2 border rounded">
                                            <option value="">Select option</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    {formData.serviceDetails['Shopify Store Development'].designReady === 'Yes' && (
                                        <div className="input-group full mb-4">
                                            <label>Reference Link (Optional)</label>
                                            <input type="url" placeholder="https://example.com" value={formData.serviceDetails['Shopify Store Development'].designLink} onChange={(e) => handleServiceDetailChange('Shopify Store Development', 'designLink', e.target.value)} />
                                        </div>
                                    )}
                                    <div className="input-group full mb-4">
                                        <label>Is a theme already picked? <span className="req">*</span></label>
                                        <input type="text" required placeholder="Yes, Dawn theme / No, need suggestions" value={formData.serviceDetails['Shopify Store Development'].themePicked} onChange={(e) => handleServiceDetailChange('Shopify Store Development', 'themePicked', e.target.value)} />
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>Is this a new store or a redesign? <span className="req">*</span></label>
                                        <select required value={formData.serviceDetails['Shopify Store Development'].storeType} onChange={(e) => handleServiceDetailChange('Shopify Store Development', 'storeType', e.target.value)} className="w-full p-2 border rounded">
                                            <option value="">Select option</option>
                                            <option value="New Store">New Store</option>
                                            <option value="Redesign existing store">Redesign existing store</option>
                                        </select>
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>Roughly how many products? <span className="req">*</span></label>
                                        <input type="text" required placeholder="e.g. 50 products" value={formData.serviceDetails['Shopify Store Development'].productCount} onChange={(e) => handleServiceDetailChange('Shopify Store Development', 'productCount', e.target.value)} />
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>Are custom Liquid sections/features needed? <span className="req">*</span></label>
                                        <select required value={formData.serviceDetails['Shopify Store Development'].customLiquid} onChange={(e) => handleServiceDetailChange('Shopify Store Development', 'customLiquid', e.target.value)} className="w-full p-2 border rounded">
                                            <option value="">Select option</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    {formData.serviceDetails['Shopify Store Development'].customLiquid === 'Yes' && (
                                        <div className="input-group full mb-4">
                                            <label>Describe custom features briefly <span className="req">*</span></label>
                                            <input type="text" required placeholder="e.g. custom product bundle section" value={formData.serviceDetails['Shopify Store Development'].customLiquidDetails} onChange={(e) => handleServiceDetailChange('Shopify Store Development', 'customLiquidDetails', e.target.value)} />
                                        </div>
                                    )}
                                    <div className="input-group full">
                                        <label>Shopify Project Details</label>
                                        <textarea placeholder="Any specific apps required, timeline, or references?" rows={3} value={formData.serviceDetails['Shopify Store Development'].projectDetails} onChange={(e) => handleServiceDetailChange('Shopify Store Development', 'projectDetails', e.target.value)}></textarea>
                                    </div>
                                </div>
                            )}

                            {formData.services.includes('Social Media Management') && (
                                <div className="form-card">
                                    <div className="card-header"><span className="card-icon">📱</span><h3 className="card-title">SOCIAL MEDIA MANAGEMENT DETAILS</h3></div>
                                    <div className="input-group full mb-4">
                                        <label>Which platforms are needed? (Select all that apply) <span className="req">*</span></label>
                                        <div className="checkbox-grid">
                                            {SOCIAL_PLATFORMS.map(plat => (
                                                <label key={plat} className={`checkbox-btn ${formData.serviceDetails['Social Media Management'].platforms.includes(plat) ? 'active' : ''}`}>
                                                    <input type="checkbox" checked={formData.serviceDetails['Social Media Management'].platforms.includes(plat)} onChange={() => toggleServiceDetailArray('Social Media Management', 'platforms', plat)} />
                                                    <span className="check-box">{formData.serviceDetails['Social Media Management'].platforms.includes(plat) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}</span>
                                                    {plat}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {formData.serviceDetails['Social Media Management'].platforms.length > 0 && (
                                        <div className="input-group full mb-4" style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                            <label style={{ marginBottom: '1rem', display: 'block' }}>Handles / Usernames <span className="req">*</span></label>
                                            {formData.serviceDetails['Social Media Management'].platforms.map((plat: string) => (
                                                <div key={plat} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '1rem' }}>
                                                    <strong style={{ width: '120px' }}>{plat}:</strong>
                                                    <input type="text" required style={{ flex: 1, padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="URL or @username" value={formData.serviceDetails['Social Media Management'].handles[plat] || ''} onChange={(e) => handleSocialHandleChange(plat, e.target.value)} />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="input-group full mb-4">
                                        <label>What content type is needed? (Select all that apply) <span className="req">*</span></label>
                                        <div className="checkbox-grid">
                                            {CONTENT_TYPES.map(type => (
                                                <label key={type} className={`checkbox-btn ${formData.serviceDetails['Social Media Management'].contentTypes.includes(type) ? 'active' : ''}`}>
                                                    <input type="checkbox" checked={formData.serviceDetails['Social Media Management'].contentTypes.includes(type)} onChange={() => toggleServiceDetailArray('Social Media Management', 'contentTypes', type)} />
                                                    <span className="check-box">{formData.serviceDetails['Social Media Management'].contentTypes.includes(type) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}</span>
                                                    {type}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="input-group full mb-4">
                                        <label>Desired posting frequency <span className="req">*</span></label>
                                        <input type="text" required placeholder="e.g. 3 posts per week" value={formData.serviceDetails['Social Media Management'].frequency} onChange={(e) => handleServiceDetailChange('Social Media Management', 'frequency', e.target.value)} />
                                    </div>
                                    <div className="input-group full">
                                        <label>Social Media Project Details</label>
                                        <textarea placeholder="Specific goals, aesthetics, or current challenges?" rows={3} value={formData.serviceDetails['Social Media Management'].projectDetails} onChange={(e) => handleServiceDetailChange('Social Media Management', 'projectDetails', e.target.value)}></textarea>
                                    </div>
                                </div>
                            )}



                            {/* OVERALL PROJECT DETAILS & UPLOAD */}
                            <div className="form-card">
                                <div className="card-header">
                                    <span className="card-icon">📂</span>
                                    <h3 className="card-title">OVERALL DETAILS & ATTACHMENTS</h3>
                                </div>
                                <div className="input-group full mb-4">
                                    <label>Overall Project Summary (Optional)</label>
                                    <textarea 
                                        name="overallProjectDetails" 
                                        placeholder="Is there anything else we should know about this project as a whole?"
                                        value={formData.overallProjectDetails} 
                                        onChange={handleChange}
                                        rows={4}
                                    ></textarea>
                                </div>

                                <div className="upload-area">
                                    <p className="upload-label">Upload a design file or brief (Optional)</p>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                        accept=".psd,.png,.jpg,.jpeg,.pdf,.docx,.zip"
                                    />
                                    <div className="upload-box" onClick={() => fileInputRef.current?.click()} style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}>
                                        {uploading ? (
                                            <div style={{ color: 'var(--primary-orange)' }}>Uploading... Please wait.</div>
                                        ) : fileName ? (
                                            <div style={{ color: '#059669', fontWeight: 'bold' }}>✅ File Uploaded: {fileName}</div>
                                        ) : (
                                            <>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                                <p><strong>Click to upload</strong></p>
                                                <span>PSD, Figma export, PNG, JPG, PDF, DOCX, ZIP — max 20MB</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className="form-submit-card">
                                <div className="submit-text">
                                    <h4>Ready to send your quote request?</h4>
                                    <p>You'll receive a detailed quote within 2-4 hours on your email and WhatsApp.</p>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn-submit" 
                                    disabled={status === 'submitting' || uploading || formData.services.length === 0}
                                >
                                    {status === 'submitting' ? 'Submitting...' : 'Send Quote Request ➔'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar Column (unchanged) */}
                    <div className="quote-sidebar">
                        <div className="sidebar-sticky">
                            <div className="sidebar-card dark">
                                <Image src="https://i.ibb.co/ZRyRSNND/e37672fd303e.png" alt="MailStora Logo" width={220} height={45} style={{ objectFit: 'contain', marginBottom: '1.5rem', marginLeft: '-10px' }} />
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
                                            <strong>13 Years Experience</strong>
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
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
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
