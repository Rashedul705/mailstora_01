"use client";

import './Contact.css';

export default function Contact() {
    return (
        <section className="contact-section section" id="contact">
            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-info text-center">
                        <h2 className="section-title">Contact Us</h2>
                        <p className="section-subtitle">
                            Ready to start your project or have questions? We're here to help.
                        </p>
                        <div className="contact-details">
                            <a href="mailto:hello@mailstora.com" className="contact-email">
                                hello@mailstora.com
                            </a>
                            <p className="contact-response">We typically respond within 24 hours.</p>
                        </div>

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
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows={4} placeholder="Tell us about your project..." required></textarea>
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
