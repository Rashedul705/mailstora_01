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
        title: "HTML Email Signatures",
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
        title: "Klaviyo Automation Flow",
        features: [
            "Welcome, cart abandon & browse flow",
            "Audience segmentation & tagging",
            "Advanced dynamic product logic",
            "Multi-step customer journey mapping",
            "Revenue-optimized triggered emails",
            "A/B testing for optimal conversion",
        ],
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
        ),
        iconClass: "primary-icon",
        cardClass: "border-orange",
        title: "Klaviyo & ESP Campaign Setup",
        features: [
            "Full campaign scheduling & deployment",
            "Promotional & newsletter creation",
            "Audience targeted list segmentation",
            "Subject line & preview text optimization",
            "Performance tracking & analytics",
            "QA testing before every send",
        ],
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
        ),
        iconClass: "secondary-icon",
        cardClass: "border-blue",
        title: "Shopify Store Development",
        features: [
            "Custom Shopify theme customization",
            "Fast page load speed optimization",
            "High-converting product page layout",
            "App integration and setup",
            "Mobile-first seamless checkout",
            "On-brand visual design system",
        ],
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
        ),
        iconClass: "tertiary-icon",
        cardClass: "border-purple",
        title: "Social Media Management",
        features: [
            "Consistent posting schedule",
            "Branded content creation & design",
            "Community engagement & moderation",
            "Platform-specific strategy execution",
            "Hashtag & growth optimization",
            "Monthly performance reporting",
        ],
    }
];

export default function Services({ data = [] }: { data?: any[] }) {
    // We override API data here to enforce the new 3-card design
    const services = HARDCODED_SERVICES;

    return (
        <section className="services-section section" id="services">
            <div className="container">
                <div className="services-header text-center">
                    <h2 className="section-title">Full-Service Digital Solutions</h2>
                    <p className="section-subtitle">Premium, hand-built solutions across email, e-commerce, and social — for modern businesses.</p>
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
                            <a href="#contact" className="service-card-btn">
                                Request Pricing →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
