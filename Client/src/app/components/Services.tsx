import Link from 'next/link';
import './Services.css';

const CORE_SERVICES = [
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
        link: "/html-email-template-development/"
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
        link: "/html-email-signature-design/"
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
        title: "Klaviyo Automation Flows",
        features: [
            "Welcome, cart abandon & browse flow",
            "Audience segmentation & tagging",
            "Advanced dynamic product logic",
            "Multi-step customer journey mapping",
            "Revenue-optimized triggered emails",
            "A/B testing for optimal conversion",
        ],
        link: "/klaviyo-flow-setup/"
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
        title: "Klaviyo Campaigns",
        features: [
            "Full campaign scheduling & deployment",
            "Promotional & newsletter creation",
            "Audience targeted list segmentation",
            "Subject line & preview text optimization",
            "Performance tracking & analytics",
            "QA testing before every send",
        ],
        link: "/klaviyo-campaign-management/"
    }
];

const SECONDARY_SERVICES = [
    {
        title: "White-Label Email Development",
        desc: "I work behind the scenes as your agency's developer — your clients never see my name.",
        link: "/white-label-email-development/"
    },
    {
        title: "Shopify Store Development",
        desc: "Custom theme customization, speed optimization, and high-converting product layouts.",
        link: "/shopify-development/"
    },
    {
        title: "Social Media Management",
        desc: "Consistent posting, branded content creation, and monthly performance reporting.",
        link: "/social-media-management/"
    }
];

export default function Services({ data = [] }: { data?: any[] }) {
    return (
        <section className="services-section section" id="services">
            <div className="container">
                <div className="services-header text-center" style={{ maxWidth: '800px', margin: '0 auto 50px auto' }}>
                    <h2 className="section-title">My Core Expertise</h2>
                    <p className="section-subtitle">You work directly with me — the person who writes every line of code — not a project manager.</p>
                </div>

                {/* Main 4 Services */}
                <div className="services-grid">
                    {CORE_SERVICES.map((service, idx) => (
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
                            <Link href={service.link} className="service-card-btn">
                                Learn More →
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Secondary Services */}
                <div style={{ marginTop: '80px' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Also available</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {SECONDARY_SERVICES.map((service, idx) => (
                            <div key={idx} style={{ padding: '24px', background: '#f8f9fc', borderRadius: '12px', border: '1px solid #e2e4f0' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>{service.title}</h4>
                                <p style={{ color: '#666', marginBottom: '16px', fontSize: '14px', lineHeight: '1.5' }}>{service.desc}</p>
                                <Link href={service.link} style={{ color: '#0d6efd', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>
                                    View Service →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
