import Image from "next/image";
import "./Hero.css";

export default function Hero() {
    return (
        <section className="hero section">
            {/* Animated background blobs */}
            <div className="hero-blob hero-blob-1" />
            <div className="hero-blob hero-blob-2" />

            <div className="container hero-container">
                {/* ── LEFT: Copy & CTAs ── */}
                <div className="hero-content">
                    <span className="hero-badge">✦ Free Consultation</span>

                    <h1 className="hero-title">
                        Level Up Your&nbsp;
                        <span className="hero-title-highlight">Email Strategy</span>
                        &nbsp;with Expert Consultation
                    </h1>

                    <p className="hero-subtitle">
                        Stop losing engagement due to broken formatting. Get responsive,
                        perfectly rendered email templates and professional signatures built
                        for real-world email clients.
                    </p>

                    <div className="hero-buttons">
                        <button className="btn btn-primary">Get a Free Quote</button>
                        <button className="btn btn-secondary">View Portfolio</button>
                    </div>

                    <p className="hero-trust">
                        Tested in Outlook, Gmail, Apple Mail, Klaviyo &amp; HubSpot
                    </p>
                </div>

                {/* ── RIGHT: Personal Card ── */}
                <div className="hero-profile-side">
                    {/* Dotted decorative ring */}
                    <div className="hero-ring-wrapper">
                        <div className="hero-ring-dots" />
                        <div className="hero-photo-frame">
                            <Image
                                src="/consultation-photo-v2.png"
                                alt="Rashedul Islam – Founder & Lead Mailstora"
                                width={320}
                                height={320}
                                className="hero-photo"
                                priority
                            />
                        </div>
                    </div>

                    {/* Name & position */}
                    <div className="hero-profile-info">
                        <p className="hero-profile-name">Rashedul Islam</p>
                        <p className="hero-profile-role">Founder &amp; Lead Mailstora</p>
                    </div>

                    {/* Schedule button */}
                    <button className="hero-schedule-btn">
                        {/* Calendar icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Schedule a Consultation
                    </button>

                    {/* Floating email-client trust pill */}
                    <div className="hero-float-pill">
                        <span className="hero-float-pill-dot" />
                        100+ Happy Clients
                    </div>
                </div>
            </div>
        </section>
    );
}
