"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BookingModal from "./BookingModal";
import "./Hero.css";

const DEFAULT_HERO = {
    title: "Custom <span>HTML Email Templates</span> That Work Perfectly in Outlook, Gmail & 30+ Email Clients",
    subtitle: "Stop losing engagement due to broken formatting. Get hand-coded, pixel-perfect email templates and professional signatures tested across all major email clients, delivered in 24-48 hours.",
    cta_text: "Get a Free Quote",
    cta_link: "#contact",
    background_image: "/consultation-photo-v2.png"
};

export default function Hero({ data }: { data?: any }) {
    const heroData = data || DEFAULT_HERO;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="hero section">
            {/* Animated background blobs */}
            <div className="hero-blob hero-blob-1" />
            <div className="hero-blob hero-blob-2" />

            <div className="container hero-container">
                {/* ── LEFT: Copy & CTAs ── */}
                <div className="hero-content">
                    <span className="hero-badge">✦ Professional Email Development</span>

                    <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: heroData.title }}></h1>

                    <p className="hero-subtitle">
                        {heroData.subtitle}
                    </p>

                    <div className="hero-buttons">
                        <Link href="/quote" className="btn btn-primary">{heroData.cta_text}</Link>
                        <a href="https://wa.me/8801744350705?text=Hi,%20I'm%20interested%20in%20your%20email%20template%20services" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{display: 'inline-flex', gap: '8px', alignItems: 'center'}}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                            </svg>
                            Chat on WhatsApp
                        </a>
                        <a href="/#portfolio" className="btn btn-secondary">View Portfolio</a>
                    </div>



                    {/* Platform Logos */}
                    <div className="hero-platforms">
                        <span className="hero-platforms-label">Works with</span>
                        <div className="hero-platforms-logos">
                            {/* Gmail */}
                            <div className="platform-logo" title="Gmail">
                                <svg viewBox="0 0 48 48" width="28" height="28">
                                    <path fill="#4caf50" d="M 45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                                    <path fill="#1e88e5" d="M 3,16.2l3.714,1.638L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                                    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                                    <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
                                    <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
                                </svg>
                                <span>Gmail</span>
                            </div>
                            {/* Outlook */}
                            <div className="platform-logo" title="Outlook">
                                <svg viewBox="0 0 48 48" width="28" height="28">
                                    <path fill="#1565c0" d="M29,7H19C10.716,7,4,13.716,4,22v4c0,8.284,6.716,15,15,15h10c8.284,0,15-6.716,15-15v-4C44,13.716,37.284,7,29,7z" />
                                    <path fill="#fff" d="M24,31c-5.514,0-10-4.486-10-10s4.486-10,10-10s10,4.486,10,10S29.514,31,24,31z" />
                                    <path fill="#1565c0" d="M24,13c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S28.411,13,24,13z" />
                                    <ellipse cx="24" cy="21" rx="5" ry="6" fill="#fff" />
                                </svg>
                                <span>Outlook</span>
                            </div>
                            {/* Mailchimp */}
                            <div className="platform-logo" title="Mailchimp">
                                <svg viewBox="0 0 48 48" width="28" height="28">
                                    <circle cx="24" cy="24" r="20" fill="#FFE01B" />
                                    <path fill="#241C15" d="M24,14c-5.523,0-10,4.477-10,10s4.477,10,10,10s10-4.477,10-10S29.523,14,24,14z M24,31 c-3.866,0-7-3.134-7-7s3.134-7,7-7s7,3.134,7,7S27.866,31,24,31z" />
                                    <circle cx="21" cy="23" r="1.5" fill="#241C15" />
                                    <circle cx="27" cy="23" r="1.5" fill="#241C15" />
                                    <path fill="#241C15" d="M21,27c0,0,1,2,3,2s3-2,3-2H21z" />
                                </svg>
                                <span>Mailchimp</span>
                            </div>
                            {/* Klaviyo */}
                            <div className="platform-logo" title="Klaviyo">
                                <svg viewBox="0 0 48 48" width="28" height="28">
                                    <rect width="48" height="48" rx="8" fill="#121212" />
                                    <path fill="#fff" d="M12 12h8v24h-8zM28 12l8 12-8 12h-9l8-12-8-12z" />
                                </svg>
                                <span>Klaviyo</span>
                            </div>
                            {/* HubSpot */}
                            <div className="platform-logo" title="HubSpot">
                                <svg viewBox="0 0 48 48" width="28" height="28">
                                    <circle cx="24" cy="24" r="20" fill="#FF7A59" />
                                    <path fill="#fff" d="M28,18.5V15h-3v3.5c-2.3,0.6-4,2.7-4,5.2c0,2,1.1,3.8,2.7,4.8L22,31h4l-1.7-2.9 c0.5,0.1,1.1,0.2,1.7,0.2c3,0,5.5-2.4,5.5-5.5C31.5,20.8,30,19,28,18.5z M24,25.8c-1.5,0-2.8-1.2-2.8-2.8s1.2-2.8,2.8-2.8 s2.8,1.2,2.8,2.8S25.5,25.8,24,25.8z" />
                                </svg>
                                <span>HubSpot</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Personal Card ── */}
                <div className="hero-profile-side">
                    <div className="hero-ring-wrapper">
                        <div className="hero-ring-dots" />
                        <div className="hero-photo-frame">
                            <Image
                                src={heroData.background_image || "/consultation-photo-v2.png"}
                                alt="Rashedul Islam – Founder & Lead Mailstora"
                                width={320}
                                height={320}
                                className="hero-photo"
                                priority
                            />
                        </div>
                    </div>

                    <div className="hero-profile-info">
                        <p className="hero-profile-name">Rashedul Islam</p>
                        <p className="hero-profile-role">Founder &amp; Lead Mailstora</p>
                    </div>

                    {/* Trust Stats under name */}
                    <div className="hero-stats">
                        <div className="hero-stat-row">
                            <div className="hero-stat">
                                <span className="hero-stat-number">3+</span>
                                <span className="hero-stat-label">Years Experience</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <span className="hero-stat-number">400+</span>
                                <span className="hero-stat-label">Templates Built</span>
                            </div>
                        </div>
                        <div className="hero-stat-row">
                            <div className="hero-stat">
                                <span className="hero-stat-number">30+</span>
                                <span className="hero-stat-label">Email Clients Tested</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <span className="hero-stat-number">24h</span>
                                <span className="hero-stat-label">Fast Turnaround</span>
                            </div>
                        </div>
                    </div>

                    <Link href="/schedule" className="hero-schedule-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Schedule a Consultation
                    </Link>

                    <div className="hero-float-pill">
                        <span className="hero-float-pill-dot" />
                        100+ Happy Clients
                    </div>
                </div>
            </div>

            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
