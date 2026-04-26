import './WhyChooseUs.css';

export default function WhyChooseUs() {
    const features = [
        {
            title: "Hand-coded precision",
            description: "No page builders or drag-and-drop tools. We write clean, optimized HTML from scratch for maximum compatibility.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            )
        },
        {
            title: "Dark mode optimized",
            description: "Every template is rigorously tested to ensure perfect rendering across both light and dark mode environments.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            )
        },
        {
            title: "Tested across 30+ clients",
            description: "We verify rendering across Litmus and Email on Acid to guarantee perfection in Outlook, Gmail, and Apple Mail.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            )
        },
        {
            title: "Fast turnaround",
            description: "Get your fully coded and tested HTML email template delivered within 24 to 48 hours without compromising quality.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            )
        },
        {
            title: "Agency ready",
            description: "White-label support available. We seamlessly integrate with your agency workflow to deliver to your clients.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            )
        }
    ];

    return (
        <section className="why-choose-section section section-alt" id="why-choose">
            <div className="container">
                <div className="why-choose-header text-center">
                    <h2 className="section-title">Why Choose MailStora?</h2>
                    <p className="section-subtitle">
                        We build robust email templates that look great everywhere, so you can focus on your content.
                    </p>
                </div>
                
                <div className="why-choose-grid">
                    {features.map((feature, idx) => (
                        <div key={idx} className="why-choose-card">
                            <div className="why-choose-icon">
                                {feature.icon}
                            </div>
                            <div className="why-choose-content">
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
