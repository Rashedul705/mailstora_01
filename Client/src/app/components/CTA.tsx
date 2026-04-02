import Link from 'next/link';
import './CTA.css';

export default function CTA() {
    return (
        <section className="cta-section text-center">
            <div className="cta-content">
                <div className="cta-badge">⚡ Ready When You Are</div>
                <h2 className="cta-title">Ready to Launch Your Next Email Campaign?</h2>
                <p className="cta-subtitle">
                    Get a pixel-perfect, cross-client HTML email template delivered in 24–48 hours.
                    No broken layouts. No Outlook surprises. Just results.
                </p>
                <div className="cta-buttons">
                    <Link href="/checkout" className="btn btn-primary cta-button">
                        Start Your Project
                    </Link>
                    <Link href="/quote" className="btn btn-secondary cta-button">Get a Free Quote</Link>
                </div>
                <p className="cta-note">✦ No commitment required &nbsp;·&nbsp; Response within 24h</p>
            </div>
        </section>
    );
}
