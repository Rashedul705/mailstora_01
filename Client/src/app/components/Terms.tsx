import './Legal.css';

export default function Terms() {
    return (
        <section className="legal-section section" id="terms">
            <div className="container">
                <div className="legal-wrapper">
                    <h2 className="legal-title">Terms & Conditions</h2>
                    <div className="legal-content">
                        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
                        <p>Welcome to MailStora. By accessing our website and using our email template and signature development services, you agree to comply with and be bound by the following terms.</p>

                        <h3>1. Services Provided</h3>
                        <p>We provide custom HTML email development, including newsletters, automated sequences, and professional email signatures based on approved designs.</p>

                        <h3>2. Revisions and Approvals</h3>
                        <p>Each service package includes a specific number of revision rounds. Any additional changes requested after the final approval or beyond the included rounds may incur extra fees.</p>

                        <h3>3. Payment Terms</h3>
                        <p>For standard packages, full payment is required before the delivery of the final HTML source files. Enterprise projects are subject to custom invoice schedules as agreed upon in proposals.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
