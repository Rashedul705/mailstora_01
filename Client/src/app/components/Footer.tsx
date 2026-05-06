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
                            <Image src="https://i.ibb.co/WpyvpjQ3/7753c6e6d5e2.png" alt="MailStora Logo" width={380} height={85} style={{ objectFit: 'contain' }} />
                        </Link>
                        <p>Professional HTML email <br /> templates & signatures.</p>
                    </div>
                    <div className="footer-links-group">
                        <h4 className="footer-heading">SERVICES</h4>
                        <ul className="footer-list">
                            <li><a href="#services">Custom Templates</a></li>
                            <li><a href="#services">Email Signatures</a></li>
                            <li><a href="#prices">Pricing</a></li>
                        </ul>
                    </div>
                    <div className="footer-links-group">
                        <h4 className="footer-heading">LEGAL</h4>
                        <ul className="footer-list">
                            <li><Link href="/terms">Terms & Conditions</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links-group">
                        <h4 className="footer-heading">CONTACT</h4>
                        <ul className="footer-list">
                            <li className="contact-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                                01744350705
                            </li>
                            <li className="contact-item">
                                <a href="mailto:rashedulmr@gmail.com">rashedulmr@gmail.com</a>
                            </li>
                            <li className="footer-social-wrapper">
                                <div className="social-icons">
                                    <a href="mailto:rashedulmr@gmail.com" aria-label="Email">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                    </a>
                                    <a href="https://wa.me/+8801744350705" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                                    </a>
                                    <a href="https://www.facebook.com/Rashedul7050" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </a>
                                    <a href="https://www.linkedin.com/in/rislam05/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} MailStora. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
