'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './quote.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);


const STEPS = [
    { label: 'Client Info', icon: '👤' },
    { label: 'Service Details', icon: '📋' },
    { label: 'Technical Setup', icon: '⚙️' },
    { label: 'Project Brief', icon: '📝' }
];

const EMAIL_TYPE_OPTIONS = [
    'Newsletters',
    'Transactional (Receipts, Shipping, OTPs)',
    'Promotional / Marketing',
    'Automated Flows (Welcome Series, Abandoned Cart)'
];

const ESP_OPTIONS = [
    'Mailchimp',
    'Klaviyo',
    'SendGrid',
    'HubSpot',
    'ActiveCampaign',
    'Custom / Other'
];

const QUANTITY_OPTIONS = ['1', '2–3', '4–5', '6–10', '10+'];

export default function QuotePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        company: '',
        website: '',
        service_type: '',
        email_types: [] as string[],
        template_quantity: '',
        esp: '',
        esp_custom: '',
        design_status: '',
        design_brief: '',
        project_description: ''
    });

    const [attachments, setAttachments] = useState<File[]>([]);
    const [designFiles, setDesignFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error for this field
        if (stepErrors[e.target.name]) {
            setStepErrors(prev => { const n = { ...prev }; delete n[e.target.name]; return n; });
        }
    };

    const handleCheckboxChange = (field: string, value: string) => {
        const arr = formData[field as keyof typeof formData] as string[];
        const updated = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
        setFormData({ ...formData, [field]: updated });
    };

    const handleDesignStatus = (value: string) => {
        setFormData({ ...formData, design_status: value });
        if (stepErrors['design_status']) {
            setStepErrors(prev => { const n = { ...prev }; delete n['design_status']; return n; });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'attachment' | 'design') => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (type === 'attachment') {
                setAttachments(prev => [...prev, ...files]);
            } else {
                setDesignFiles(prev => [...prev, ...files]);
            }
        }
        e.target.value = '';
    };

    const removeFile = (index: number, type: 'attachment' | 'design') => {
        if (type === 'attachment') {
            setAttachments(prev => prev.filter((_, i) => i !== index));
        } else {
            setDesignFiles(prev => prev.filter((_, i) => i !== index));
        }
    };

    const validateStep = (step: number): boolean => {
        const errors: Record<string, string> = {};
        switch (step) {
            case 0:
                if (!formData.name.trim()) errors.name = 'Full Name is required';
                if (!formData.email.trim()) errors.email = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
                if (!formData.whatsapp.trim()) errors.whatsapp = 'WhatsApp number is required';
                break;
            case 1:
                if (!formData.service_type) errors.service_type = 'Please select a service';
                if (!formData.template_quantity) errors.template_quantity = 'Please select quantity';
                break;
            case 2:
                if (!formData.design_status) errors.design_status = 'Please select your design status';
                break;
            case 3:
                if (!formData.project_description.trim()) errors.project_description = 'Project description is required';
                break;
        }
        setStepErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
        }
    };

    const prevStep = () => {
        setStepErrors({});
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep(currentStep)) return;
        setStatus('submitting');
        setErrorMessage('');

        try {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('whatsapp', formData.whatsapp);
            submitData.append('company', formData.company);
            submitData.append('website', formData.website);
            submitData.append('service_type', formData.service_type);
            submitData.append('email_types', JSON.stringify(formData.email_types));
            submitData.append('template_quantity', formData.template_quantity);
            submitData.append('esp', formData.esp);
            submitData.append('esp_custom', formData.esp_custom);
            submitData.append('design_status', formData.design_status);
            submitData.append('design_brief', formData.design_brief);
            submitData.append('project_description', formData.project_description);

            // Append all attachments
            attachments.forEach(file => {
                submitData.append('attachments', file);
            });

            // Append all design files
            designFiles.forEach(file => {
                submitData.append('design_attachments', file);
            });

            const res = await fetch('/api/quotes', {
                method: 'POST',
                body: submitData
            });

            if (!res.ok) {
                const errJson = await res.json();
                throw new Error('Failed to save quote: ' + (errJson.error || 'Unknown error'));
            }

            alert('Your quote has been successfully submitted!');
            setStatus('success');
        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'An error occurred while submitting your request.');
        }
    };

    const renderStepIndicator = () => (
        <div className="step-indicator">
            {STEPS.map((step, index) => (
                <div
                    key={index}
                    className={`step-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                    onClick={() => { if (index < currentStep) setCurrentStep(index); }}
                >
                    <div className="step-circle">
                        {index < currentStep ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                            <span>{step.icon}</span>
                        )}
                    </div>
                    <span className="step-label">{step.label}</span>
                    {index < STEPS.length - 1 && <div className="step-connector" />}
                </div>
            ))}
        </div>
    );

    const renderFieldError = (field: string) => (
        stepErrors[field] ? <span className="field-error">{stepErrors[field]}</span> : null
    );

    const renderStep0 = () => (
        <div className="step-content">
            <h2 className="quote-section-title">Client Information</h2>
            <p className="quote-section-desc">Tell us about yourself so we can get in touch.</p>
            <div className="quote-grid">
                <div className={`quote-field ${stepErrors.name ? 'has-error' : ''}`}>
                    <label className="quote-label">Full Name <span className="required">*</span></label>
                    <input type="text" name="name" className="quote-input" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                    {renderFieldError('name')}
                </div>
                <div className={`quote-field ${stepErrors.email ? 'has-error' : ''}`}>
                    <label className="quote-label">Email Address <span className="required">*</span></label>
                    <input type="email" name="email" className="quote-input" required value={formData.email} onChange={handleChange} placeholder="john@company.com" />
                    {renderFieldError('email')}
                </div>
                <div className={`quote-field ${stepErrors.whatsapp ? 'has-error' : ''}`}>
                    <label className="quote-label">WhatsApp Number <span className="required">*</span></label>
                    <input type="tel" name="whatsapp" className="quote-input" required value={formData.whatsapp} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                    {renderFieldError('whatsapp')}
                </div>
                <div className="quote-field">
                    <label className="quote-label">Company Name <span className="optional">(Optional)</span></label>
                    <input type="text" name="company" className="quote-input" value={formData.company} onChange={handleChange} placeholder="Acme Corp" />
                </div>
                <div className="quote-field full">
                    <label className="quote-label">Website URL <span className="optional">(Optional)</span></label>
                    <input type="url" name="website" className="quote-input" value={formData.website} onChange={handleChange} placeholder="https://example.com" />
                </div>
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="step-content">
            <h2 className="quote-section-title">Service &amp; Requirements</h2>
            <p className="quote-section-desc">What kind of email services do you need?</p>
            <div className="quote-grid" ref={dropdownRef}>
                <div className={`quote-field ${stepErrors.service_type ? 'has-error' : ''}`}>
                    <label className="quote-label">Service Needed <span className="required">*</span></label>
                    <div
                        id="service-type-dropdown"
                        className={`custom-select ${openDropdown === 'service_type' ? 'open' : ''} ${stepErrors.service_type ? 'select-error' : ''}`}
                        onClick={() => setOpenDropdown(openDropdown === 'service_type' ? null : 'service_type')}
                    >
                        <span className={formData.service_type ? 'selected-text' : 'placeholder-text'}>
                            {formData.service_type || 'Select a service'}
                        </span>
                        <span className="select-arrow">▾</span>
                        {openDropdown === 'service_type' && (
                            <ul className="custom-select-options">
                                {['Email Template', 'Email Signature', 'Both'].map(opt => (
                                    <li
                                        key={opt}
                                        id={`service-opt-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                                        className={`custom-select-option ${formData.service_type === opt ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFormData({ ...formData, service_type: opt });
                                            if (stepErrors['service_type']) setStepErrors(prev => { const n = { ...prev }; delete n['service_type']; return n; });
                                            setOpenDropdown(null);
                                        }}
                                    >{opt}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {renderFieldError('service_type')}
                </div>
                <div className={`quote-field ${stepErrors.template_quantity ? 'has-error' : ''}`}>
                    <label className="quote-label">Number of Templates <span className="required">*</span></label>
                    <div
                        id="template-quantity-dropdown"
                        className={`custom-select ${openDropdown === 'template_quantity' ? 'open' : ''} ${stepErrors.template_quantity ? 'select-error' : ''}`}
                        onClick={() => setOpenDropdown(openDropdown === 'template_quantity' ? null : 'template_quantity')}
                    >
                        <span className={formData.template_quantity ? 'selected-text' : 'placeholder-text'}>
                            {formData.template_quantity || 'Select quantity'}
                        </span>
                        <span className="select-arrow">▾</span>
                        {openDropdown === 'template_quantity' && (
                            <ul className="custom-select-options">
                                {QUANTITY_OPTIONS.map(q => (
                                    <li
                                        key={q}
                                        id={`qty-opt-${q.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                                        className={`custom-select-option ${formData.template_quantity === q ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFormData({ ...formData, template_quantity: q });
                                            if (stepErrors['template_quantity']) setStepErrors(prev => { const n = { ...prev }; delete n['template_quantity']; return n; });
                                            setOpenDropdown(null);
                                        }}
                                    >{q}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {renderFieldError('template_quantity')}
                </div>
            </div>

            <div className="checkbox-section">
                <label className="quote-label" style={{ marginBottom: '1rem', display: 'block' }}>Type of Emails <span className="optional">(Select all that apply)</span></label>
                <div className="checkbox-grid">
                    {EMAIL_TYPE_OPTIONS.map(type => (
                        <label key={type} className={`checkbox-card ${formData.email_types.includes(type) ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                checked={formData.email_types.includes(type)}
                                onChange={() => handleCheckboxChange('email_types', type)}
                            />
                            <span className="checkbox-checkmark">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </span>
                            <span className="checkbox-text">{type}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="step-content">
            <h2 className="quote-section-title">Technical Setup</h2>
            <p className="quote-section-desc">Help us understand your tools and design status.</p>

            <div className="quote-grid">
                <div className="quote-field full">
                    <label className="quote-label">Email Service Provider (ESP) <span className="optional">(Optional)</span></label>
                    <select name="esp" className="quote-select" value={formData.esp} onChange={handleChange}>
                        <option value="">Select your ESP</option>
                        {ESP_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>

                {formData.esp === 'Custom / Other' && (
                    <div className="quote-field full conditional-field">
                        <label className="quote-label">Enter your ESP name</label>
                        <input type="text" name="esp_custom" className="quote-input" value={formData.esp_custom} onChange={handleChange} placeholder="Your ESP platform name" />
                    </div>
                )}
            </div>

            <div className={`design-status-section ${stepErrors.design_status ? 'has-error' : ''}`}>
                <label className="quote-label" style={{ marginBottom: '1rem', display: 'block' }}>Design Status <span className="required">*</span></label>
                <div className="design-status-options">
                    <label
                        className={`design-card ${formData.design_status === 'have_design' ? 'selected' : ''}`}
                        onClick={() => handleDesignStatus('have_design')}
                    >
                        <div className="design-card-icon">🎨</div>
                        <div className="design-card-content">
                            <strong>I have a complete design</strong>
                            <span>Design files, mockups, or screenshots ready</span>
                        </div>
                        <div className="design-card-radio">
                            <div className={`radio-dot ${formData.design_status === 'have_design' ? 'active' : ''}`} />
                        </div>
                    </label>
                    <label
                        className={`design-card ${formData.design_status === 'need_design' ? 'selected' : ''}`}
                        onClick={() => handleDesignStatus('need_design')}
                    >
                        <div className="design-card-icon">✏️</div>
                        <div className="design-card-content">
                            <strong>I need design support</strong>
                            <span>I don&apos;t have a design yet</span>
                        </div>
                        <div className="design-card-radio">
                            <div className={`radio-dot ${formData.design_status === 'need_design' ? 'active' : ''}`} />
                        </div>
                    </label>
                </div>
                {renderFieldError('design_status')}
            </div>

            {formData.design_status === 'have_design' && (
                <div className="conditional-field" style={{ marginTop: '1.5rem' }}>
                    <div className="quote-field full">
                        <label className="quote-label">Upload Your Design Files <span className="optional">(Optional)</span></label>
                        <div className="file-upload-zone" onClick={() => document.getElementById('designFileInput')?.click()}>
                            <div className="upload-icon">🎨</div>
                            <p>Click to upload your design files, mockups, or screenshots</p>
                            <span>PNG, JPG, PDF, AI, FIG, PSD, SKETCH – Max 5MB each</span>
                        </div>
                        <input id="designFileInput" type="file" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'design')} accept=".pdf,.png,.jpg,.jpeg,.ai,.fig,.sketch,.psd" multiple />
                        {designFiles.length > 0 && (
                            <div className="file-list">
                                {designFiles.map((file, i) => (
                                    <div key={i} className="file-item">
                                        <span>📎 {file.name}</span>
                                        <button type="button" className="file-remove" onClick={() => removeFile(i, 'design')}>✕</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {formData.design_status === 'need_design' && (
                <div className="conditional-field" style={{ marginTop: '1.5rem' }}>
                    <div className="quote-field full">
                        <label className="quote-label">Design Brief <span className="optional">(Optional)</span></label>
                        <textarea
                            name="design_brief"
                            className="quote-textarea"
                            value={formData.design_brief}
                            onChange={handleChange}
                            placeholder="Describe your preferred style, colors, brand guidelines, inspiration links, etc."
                        />
                    </div>
                    <div className="quote-field full" style={{ marginTop: '1rem' }}>
                        <label className="quote-label">Reference Files <span className="optional">(Optional)</span></label>
                        <div className="file-upload-zone" onClick={() => document.getElementById('refFileInput')?.click()}>
                            <div className="upload-icon">📁</div>
                            <p>Click to upload reference images or files</p>
                            <span>PNG, JPG, PDF, AI, FIG – Max 5MB each</span>
                        </div>
                        <input id="refFileInput" type="file" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'design')} accept=".pdf,.png,.jpg,.jpeg,.ai,.fig,.sketch" multiple />
                        {designFiles.length > 0 && (
                            <div className="file-list">
                                {designFiles.map((file, i) => (
                                    <div key={i} className="file-item">
                                        <span>📎 {file.name}</span>
                                        <button type="button" className="file-remove" onClick={() => removeFile(i, 'design')}>✕</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    const renderStep3 = () => (
        <div className="step-content">
            <h2 className="quote-section-title">Project Description</h2>
            <p className="quote-section-desc">Give us the full picture of what you need.</p>

            <div className={`quote-field full ${stepErrors.project_description ? 'has-error' : ''}`}>
                <label className="quote-label">Describe your project in detail <span className="required">*</span></label>
                <textarea
                    name="project_description"
                    className="quote-textarea"
                    required
                    value={formData.project_description}
                    onChange={handleChange}
                    placeholder="Please describe your email requirements, target audience, special features, integrations needed, and any other important details..."
                    style={{ minHeight: '180px' }}
                />
                {renderFieldError('project_description')}
            </div>

            <div className="quote-field full" style={{ marginTop: '1.5rem' }}>
                <label className="quote-label">Attachments <span className="optional">(Optional)</span></label>
                <div className="file-upload-zone" onClick={() => document.getElementById('attachmentFileInput')?.click()}>
                    <div className="upload-icon">📂</div>
                    <p>Click to upload files related to your project</p>
                    <span>PDF, DOC, PNG, JPG, FIG – Max 5MB each</span>
                </div>
                <input id="attachmentFileInput" type="file" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'attachment')} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.fig" multiple />
                {attachments.length > 0 && (
                    <div className="file-list">
                        {attachments.map((file, i) => (
                            <div key={i} className="file-item">
                                <span>📎 {file.name}</span>
                                <button type="button" className="file-remove" onClick={() => removeFile(i, 'attachment')}>✕</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0: return renderStep0();
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            default: return null;
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
                            <p>Your quote request has been submitted successfully. Our team will review your project details and get back to you within 24 hours.</p>
                            <button className="quote-submit-btn" style={{ maxWidth: '300px', margin: '0 auto', display: 'block' }} onClick={() => window.location.href = '/'}>
                                Return Home
                            </button>
                        </div>
                    ) : (
                        <div className="quote-form-container">
                            <div className="quote-header">
                                <h1 className="quote-title">Get a Free Quote</h1>
                                <p className="quote-subtitle">Tell us about your project and we&apos;ll get back to you with a custom proposal and pricing within 24 hours.</p>
                            </div>

                            {renderStepIndicator()}

                            {status === 'error' && (
                                <div className="error-banner">
                                    <span>⚠️</span> {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="step-wrapper">
                                    {renderCurrentStep()}
                                </div>

                                <div className="step-navigation">
                                    {currentStep > 0 && (
                                        <button type="button" className="quote-nav-btn quote-nav-prev" onClick={prevStep}>
                                            ← Previous
                                        </button>
                                    )}
                                    <div className="step-nav-spacer" />
                                    {currentStep < STEPS.length - 1 ? (
                                        <button type="button" className="quote-nav-btn quote-nav-next" onClick={nextStep}>
                                            Next Step →
                                        </button>
                                    ) : (
                                        <button type="submit" className="quote-submit-btn" disabled={status === 'submitting'}>
                                            {status === 'submitting' ? 'Uploading...' : '🚀 Request Quote'}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
