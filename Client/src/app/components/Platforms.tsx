import './Platforms.css';

export default function Platforms() {
    const platforms = [
        { name: "Mailchimp", color: "#FFE01B", textColor: "#241C15" },
        { name: "Klaviyo", color: "#282C34", textColor: "#FFFFFF" },
        { name: "HubSpot", color: "#FF7A59", textColor: "#FFFFFF" },
        { name: "Zoho", color: "#0A4694", textColor: "#FFFFFF" },
        { name: "ActiveCampaign", color: "#356AE6", textColor: "#FFFFFF" },
        { name: "Constant Contact", color: "#0055A5", textColor: "#FFFFFF" },
        { name: "SendGrid", color: "#0263E0", textColor: "#FFFFFF" },
        { name: "Brevo", color: "#0092FF", textColor: "#FFFFFF" }
    ];

    return (
        <section className="platforms-section section">
            <div className="container">
                <div className="platforms-header text-center">
                    <h2 className="section-title">Platforms We Support</h2>
                    <p className="section-subtitle">
                        Our templates are rigorously tested and fully compatible with all major email marketing platforms.
                    </p>
                </div>
                
                <div className="platforms-grid">
                    {platforms.map((platform, idx) => (
                        <div 
                            key={idx} 
                            className="platform-badge"
                            style={{ 
                                '--hover-bg': platform.color,
                                '--hover-text': platform.textColor
                            } as React.CSSProperties}
                        >
                            <span className="platform-name">{platform.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
