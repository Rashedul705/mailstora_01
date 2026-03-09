import './Services.css';

const services = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
        ),
        iconClass: "primary-icon",
        title: "Responsive HTML Email Templates",
        features: [
            "Hand-coded clean HTML, no drag & drop",
            "Pixel-perfect conversion from Figma or PSD",
            "Fully mobile responsive design",
            "Tested across 30+ email clients",
            "Compatible with Mailchimp, Klaviyo & HubSpot",
            "Fast 24–48h delivery",
        ],
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
        ),
        iconClass: "secondary-icon",
        title: "Professional HTML Email Signatures",
        features: [
            "Fully clickable links & social icons",
            "Outlook & Gmail compatible",
            "Company-wide deployment ready",
            "Brand-consistent design system",
            "Hosted images, no broken assets",
            "Clean, minimal code structure",
        ],
    },
];

export default function Services({ data = [] }: { data?: any[] }) {
    const defaultServices = data.length > 0 ? data : services;

    return (
        <section className="services-section section" id="services">
            <div className="container">
                <div className="services-header text-center">
                    <h2 className="section-title">Professional Email Development Services</h2>
                    <p className="section-subtitle">Premium, hand-coded HTML email solutions for modern businesses.</p>
                </div>

                <div className="services-grid">
                    {defaultServices.map((service, idx) => (
                        <div key={idx} className="service-card">
                            <div className={`service-icon ${service.iconClass}`}>
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <ul className="service-features">
                                {service.features?.map((feature: string, fIdx: number) => (
                                    <li key={fIdx}>
                                        <span className="check-icon">✓</span> {feature}
                                    </li>
                                ))}
                            </ul>
                            <a href="#prices" className="service-card-btn">
                                Check Pricing →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
