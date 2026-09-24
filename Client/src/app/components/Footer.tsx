import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo-link">
                            <Image src="/images/e37672fd303e.png" alt="MailStora Logo" width={180} height={38} style={{ objectFit: 'contain' }} />
                        </Link>
                        <p>Premium omnichannel digital <br /> solutions for modern brands.</p>
                    </div>
                    <div className="footer-links-group">
                        <h4 className="footer-heading">SERVICES</h4>
                        <ul className="footer-list">
                            <li><Link href="/html-email-template-development/">HTML Email Templates</Link></li>
                            <li><Link href="/html-email-signature-design/">HTML Email Signatures</Link></li>
                            <li><Link href="/klaviyo-flow-setup/">Klaviyo Automation Flows</Link></li>
                            <li><Link href="/klaviyo-campaign-management/">Klaviyo Campaigns</Link></li>
                            <li><Link href="/white-label-email-development/">White-Label Email Development</Link></li>
                            <li><Link href="/shopify-development/">Shopify Store Development</Link></li>
                            <li><Link href="/social-media-management/">Social Media Management</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links-group">
                        <h4 className="footer-heading">COMPANY</h4>
                        <ul className="footer-list">
                            <li><Link href="/about/">About Me</Link></li>
                            <li><Link href="/pricing/">Pricing</Link></li>
                            <li><Link href="/portfolio/">Portfolio</Link></li>
                            <li><Link href="/process/">How I Work</Link></li>
                            <li><Link href="/reviews/">Client Reviews</Link></li>
                            <li><Link href="/blog/">Blog</Link></li>
                            <li><Link href="/faq/">FAQ</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links-group">
                        <h4 className="footer-heading">GET IN TOUCH</h4>
                        <ul className="footer-list">
                            <li><Link href="/quote/">Get a Free Quote</Link></li>
                            <li><Link href="/contact/">Contact Me</Link></li>
                            <li><a href="https://www.upwork.com/freelancers/rashedul705" target="_blank" rel="noopener">My Upwork Profile</a></li>
                            <li><a href="https://pro.fiverr.com/freelancers/rashedul_mr" target="_blank" rel="noopener">My Fiverr Profile</a></li>
                            <li><a href="https://www.linkedin.com/in/rashedulafl/" target="_blank" rel="noopener">LinkedIn</a></li>
                            <li><a href="mailto:rashedulmr@gmail.com">Email</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-legal">
                        <Link href="/terms/">Terms</Link>
                        <span>|</span>
                        <Link href="/privacy/">Privacy</Link>
                    </div>
                    <p>&copy; {new Date().getFullYear()} MailStora — Rashedul Islam</p>
                </div>
            </div>
        </footer>
    );
}
