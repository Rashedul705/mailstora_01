'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './quote.css';

export default function QuotePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        service_type: 'HTML Email Template',
        template_count: '1-3 Templates',
        timeline: 'Within 1 Week',
        budget: 'Less than $100',
        project_description: ''
    });

    const [attachment, setAttachment] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            let attachmentUrl = '';

            // 1. Upload file if it exists
            if (attachment) {
                const fileData = new FormData();
                fileData.append('file', attachment);

                const uploadRes = await fetch('http://127.0.0.1:5000/api/upload-file', {
                    method: 'POST',
                    body: fileData
                });

                if (uploadRes.ok) {
                    const uploadJson = await uploadRes.json();
                    attachmentUrl = `http://127.0.0.1:5000/api/file/${uploadJson.fileId}`;
                } else {
                    console.error('File upload failed');
                }
            }

            // 2. Submit quote data
            const quoteRes = await fetch('http://127.0.0.1:5000/api/quotes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    attachment: attachmentUrl
                })
            });

            if (quoteRes.ok) {
                setStatus('success');
            } else {
                const errJson = await quoteRes.json();
                throw new Error(errJson.error || errJson.message || 'Failed to submit quote');
            }

        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'An error occurred while submitting your request.');
        }
    };

    return (
        <main>
            <Navbar />

            <section className="quote-page">
                <div className="container">

                    {status === 'success' ? (
                        <div className="quote-success">
                            <div className="quote-success-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <h2>Thank You!</h2>
                            <p>Your quote request has been received. We will contact you soon.</p>
                            <button className="quote-submit-btn" style={{ maxWidth: '300px', margin: '0 auto', display: 'block' }} onClick={() => window.location.href = '/'}>
                                Return Home
                            </button>
                        </div>
                    ) : (
                        <div className="quote-form-container">
                            <div className="quote-header">
                                <h1 className="quote-title">Get a Free Quote</h1>
                                <p className="quote-subtitle">Tell us about your project and we'll get back to you with a custom proposal and pricing within 24 hours.</p>
                            </div>

                            {status === 'error' && (
                                <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <h2 className="quote-section-title">Client Information</h2>
                                <div className="quote-grid">
                                    <div className="quote-field">
                                        <label className="quote-label">Full Name <span className="required">*</span></label>
                                        <input type="text" name="name" className="quote-input" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                                    </div>
                                    <div className="quote-field">
                                        <label className="quote-label">Email Address <span className="required">*</span></label>
                                        <input type="email" name="email" className="quote-input" required value={formData.email} onChange={handleChange} placeholder="john@company.com" />
                                    </div>
                                    <div className="quote-field">
                                        <label className="quote-label">Company Name <span className="optional">(Optional)</span></label>
                                        <input type="text" name="company" className="quote-input" value={formData.company} onChange={handleChange} placeholder="Acme Corp" />
                                    </div>
                                    <div className="quote-field">
                                        <label className="quote-label">Phone Number <span className="optional">(Optional)</span></label>
                                        <input type="tel" name="phone" className="quote-input" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>

                                <h2 className="quote-section-title" style={{ marginTop: '3rem' }}>Project Details</h2>
                                <div className="quote-grid">
                                    <div className="quote-field">
                                        <label className="quote-label">Service Type <span className="required">*</span></label>
                                        <select name="service_type" className="quote-select" required value={formData.service_type} onChange={handleChange}>
                                            <option value="HTML Email Template">HTML Email Template</option>
                                            <option value="Email Signature">Email Signature</option>
                                            <option value="Email Campaign">Email Campaign</option>
                                            <option value="Custom Email Development">Custom Email Development</option>
                                        </select>
                                    </div>
                                    <div className="quote-field">
                                        <label className="quote-label">Number of Templates <span className="required">*</span></label>
                                        <select name="template_count" className="quote-select" required value={formData.template_count} onChange={handleChange}>
                                            <option value="1 Template">1 Template</option>
                                            <option value="2-3 Templates">2-3 Templates</option>
                                            <option value="4-10 Templates">4-10 Templates</option>
                                            <option value="10+ Templates">10+ Templates</option>
                                        </select>
                                    </div>
                                    <div className="quote-field">
                                        <label className="quote-label">Timeline / Deadline <span className="required">*</span></label>
                                        <select name="timeline" className="quote-select" required value={formData.timeline} onChange={handleChange}>
                                            <option value="Rush (24-48 Hours)">Rush (24-48 Hours)</option>
                                            <option value="Within 1 Week">Within 1 Week</option>
                                            <option value="1-2 Weeks">1-2 Weeks</option>
                                            <option value="Flexible">Flexible</option>
                                        </select>
                                    </div>
                                    <div className="quote-field">
                                        <label className="quote-label">Budget Range <span className="required">*</span></label>
                                        <select name="budget" className="quote-select" required value={formData.budget} onChange={handleChange}>
                                            <option value="Less than $100">Less than $100</option>
                                            <option value="$100 - $300">$100 - $300</option>
                                            <option value="$300 - $1,000">$300 - $1,000</option>
                                            <option value="$1,000+">$1,000+</option>
                                        </select>
                                    </div>

                                    <div className="quote-field full">
                                        <label className="quote-label">Project Description <span className="required">*</span></label>
                                        <textarea name="project_description" className="quote-textarea" required value={formData.project_description} onChange={handleChange} placeholder="Please describe your email requirements, target audience, and any specific design/technical details..."></textarea>
                                    </div>

                                    <div className="quote-field full">
                                        <label className="quote-label">File Upload <span className="optional">(Optional - Max 5MB)</span></label>
                                        <input type="file" className="quote-input" onChange={handleFileChange} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.fig" style={{ padding: '0.625rem' }} />
                                    </div>
                                </div>

                                <button type="submit" className="quote-submit-btn" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Submitting Request...' : 'Request Quote'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
