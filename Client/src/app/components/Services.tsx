import './Services.css';

export default function Services() {
    return (
        <section className="services-section section">
            <div className="container">
                <div className="services-header text-center">
                    <h2 className="section-title">Professional Email Development Services</h2>
                    <p className="section-subtitle">Premium HTML email coding for modern businesses.</p>
                </div>

                <div className="services-grid">
                    {/* Card 1 */}
                    <div className="service-card">
                        <div className="service-icon primary-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                        </div>
                        <h3 className="service-title">Responsive HTML Email Templates</h3>
                        <ul className="service-features">
                            <li>
                                <span className="check-icon">✓</span> Hand-coded clean HTML
                            </li>
                            <li>
                                <span className="check-icon">✓</span> Pixel-perfect conversion
                            </li>
                            <li>
                                <span className="check-icon">✓</span> Tested in major clients
                            </li>
                            <li>
                                <span className="check-icon">✓</span> Platform-ready
                            </li>
                            <li>
                                <span className="check-icon">✓</span> Performance optimized
                            </li>
                        </ul>
                        <a href="#prices" className="service-card-btn">
                            Check Price →
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="service-card">
                        <div className="service-icon secondary-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <h3 className="service-title">Professional HTML Email Signatures</h3>
                        <ul className="service-features">
                            <li>
                                <span className="check-icon">✓</span> Fully clickable
                            </li>
                            <li>
                                <span className="check-icon">✓</span> Outlook & Gmail compatible
                            </li>
                            <li>
                                <span className="check-icon">✓</span> Company-wide ready
                            </li>
                            <li>
                                <span className="check-icon">✓</span> Hosted images
                            </li>
                            <li>
                                <span className="check-icon">✓</span> Clean structure
                            </li>
                        </ul>
                        <a href="#prices" className="service-card-btn">
                            Check Price →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
