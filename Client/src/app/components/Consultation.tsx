import React from 'react';
import Image from 'next/image';
import './Consultation.css';

export default function Consultation() {
    return (
        <section className="consultation-section section">
            <div className="container">
                <div className="consultation-card">
                    <div className="consultation-content">
                        <div className="consultation-text">
                            <span className="consultation-badge">Free Session</span>
                            <h2 className="consultation-title">Level Up Your Email Strategy with a Free Consultation</h2>
                            <p className="consultation-description">
                                Ready to transform your email presence? Let's discuss your goals, review your current designs, and map out a plan for higher conversions and better engagement.
                            </p>
                            <div className="consultation-buttons">
                                <a href="#contact" className="btn btn-primary">
                                    Contact Us
                                </a>
                                <a
                                    href="https://wa.me/your-whatsapp-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-whatsapp"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.199.3-.77.979-.945 1.179-.175.2-.35.225-.651.075-.3-.15-1.265-.467-2.41-1.488-.891-.795-1.492-1.777-1.668-2.076-.175-.3-.019-.462.13-.611.135-.133.301-.35.451-.524.151-.175.201-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.583-.491-.503-.675-.512-.174-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.115 3.23 5.125 4.532.715.311 1.275.497 1.71.636.717.227 1.369.195 1.885.118.575-.086 1.78-.726 2.03-1.427.25-.7.25-1.3.175-1.426-.075-.125-.275-.199-.575-.349z" />
                                    </svg>
                                    WhatsApp
                                </a>
                                <a href="#calendar" className="btn btn-secondary">
                                    Booking Calendar
                                </a>
                            </div>
                        </div>
                        <div className="consultation-image">
                            <div className="image-wrapper">
                                <Image
                                    src="/consultation-photo-v2.png"
                                    alt="Rashedul Islam - Founder & Lead Mailstora"
                                    width={400}
                                    height={400}
                                    className="profile-img"
                                />
                                <div className="status-badge">
                                    <span className="dot"></span>
                                    Available Now
                                </div>
                            </div>
                            <div className="consultation-info">
                                <h3 className="consultation-name">Rashedul Islam</h3>
                                <p className="consultation-pos">Founder & Lead Mailstora</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
