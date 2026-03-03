import './Legal.css';

export default function Privacy() {
    return (
        <section className="legal-section section" id="privacy">
            <div className="container">
                <div className="legal-wrapper">
                    <h2 className="legal-title">Privacy Policy</h2>
                    <div className="legal-content">
                        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
                        <p>MailStora respects your privacy. This policy outlines how we collect, use, and protect your information when you visit our website or use our services.</p>

                        <h3>1. Information Collection</h3>
                        <p>We only collect information necessary to fulfill your project requirements, such as your email address, branding assets, and project briefs when you contact us.</p>

                        <h3>2. Data Usage</h3>
                        <p>Your data is used strictly for communication and project development purposes. We do not sell, trade, or otherwise transfer your personal information to outside parties.</p>

                        <h3>3. Security</h3>
                        <p>We implement a variety of security measures to maintain the safety of your personal and company information. All final assets are securely transferred and stored.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
