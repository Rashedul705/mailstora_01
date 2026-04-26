"use client";

import './Contact.css';

export default function Contact() {
    return (
        <section className="contact-section section" id="contact">
            <div className="container">
                <div className="contact-header text-center">
                    <h2 className="section-title">Get in Touch</h2>
                    <p className="section-subtitle">
                        Ready to start your project or have questions? Fill in the form or contact us directly.
                    </p>
                </div>
                
                <div className="contact-grid">
                    <div className="contact-direct">
                        <h3>Or contact directly</h3>
                        <p className="contact-response-note">We usually reply within 2–4 hours</p>
                        
                        <div className="contact-methods">
                            <div className="contact-method">
                                <span className="contact-method-title">WhatsApp</span>
                                <a href="https://wa.me/8801744350705?text=Hi,%20I'm%20interested%20in%20your%20email%20template%20services" target="_blank" rel="noopener noreferrer" className="contact-method-link whatsapp-link">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                    </svg>
                                    01744350705
                                </a>
                            </div>
                            <div className="contact-method">
                                <span className="contact-method-title">Email</span>
                                <a href="mailto:rashedulmr@gmail.com" className="contact-method-link email-link">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                    rashedulmr@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="john@company.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="service">Service Needed</label>
                                <select id="service" name="service" required defaultValue="">
                                    <option value="" disabled>Select a service…</option>
                                    <option value="template">HTML Email Template</option>
                                    <option value="signature">Email Signature</option>
                                    <option value="both">Both (Template + Signature)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows={4} placeholder="Tell us about your project…" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary full-width form-submit">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
