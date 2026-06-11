import './Services.css';

const HARDCODED_SERVICES = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
        ),
        iconClass: "primary-icon",
        cardClass: "border-orange",
        title: "HTML Email Templates",
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
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
        ),
        iconClass: "secondary-icon",
        cardClass: "border-blue",
        title: "Responsive HTML Email Signatures",
        features: [
            "Fully clickable links & social icons",
            "Outlook & Gmail compatible",
            "Company-wide deployment ready",
            "Brand-consistent design system",
            "Hosted images, no broken assets",
            "Clean, minimal code structure",
        ],
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
        ),
        iconClass: "tertiary-icon",
        cardClass: "border-purple",
        title: "Klaviyo & ESP Automation",
        features: [
            "Welcome, cart abandon & browse flow setup",
            "Audience segmentation & tagging",
            "Sign-up form & popup integration",
            "Dynamic product recommendation blocks",
            "Performance tracking & analytics dashboards",
            "A/B testing setup for headlines & offers",
        ],
    },

];

export default function Services({ data = [] }: { data?: any[] }) {
    // We override API data here to enforce the new 3-card design
    const services = HARDCODED_SERVICES;

    return (
        <section className="services-section section" id="services">
            <div className="container">
                <div className="services-header text-center">
                    <h2 className="section-title">Professional Email Development Services</h2>
                    <p className="section-subtitle">Premium, hand-coded HTML email solutions for modern businesses.</p>
                </div>

                <div className="services-grid">
                    {services.map((service, idx) => (
                        <div key={idx} className={`service-card ${service.cardClass}`}>
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
