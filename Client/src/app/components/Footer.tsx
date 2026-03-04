import Link from 'next/link';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>MailStora</h3>
                        <p>Professional HTML email templates & signatures.</p>
                    </div>
                    <div className="footer-links-group">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#services">Custom Templates</a></li>
                            <li><a href="#services">Email Signatures</a></li>
                            <li><a href="#prices">Pricing</a></li>
                        </ul>
                    </div>
                    <div className="footer-links-group">
                        <h4>Legal</h4>
                        <ul>
                            <li><Link href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links-group">
                        <h4>Contact</h4>
                        <ul>
                            <li><a href="mailto:hello@mailstora.com">hello@mailstora.com</a></li>
                            <li>
                                <div className="social-icons">
                                    <a href="mailto:hello@mailstora.com" aria-label="Email">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </svg>
                                    </a>
                                    <a href="https://wa.me/your-whatsapp-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                            <path stroke="none" fill="currentColor" d="M15.4 13.9c-.3.8-1.5 1.5-2.2 1.6-.7.1-1.3-.1-3.7-1.1-3.1-1.3-5.1-4.5-5.3-4.7-.1-.3-1.3-1.7-1.3-3.2 0-1.5.8-2.3 1.1-2.6.3-.3.7-.4 1-.4h.3c.3 0 .7.1.9.7.3.8 1 2.5 1.1 2.7.1.3.1.6 0 .8-.1.2-.2.3-.4.5l-.4.5c-.2.2-.4.4-.2.9.2.4 1 1.7 2.1 2.7 1.4 1.2 2.6 1.6 3 1.8.4.2.7.2 .9 0s1.1-1.3 1.4-1.7c.3-.4.7-.3 1.1-.2.4.1 2.3 1.1 2.7 1.3.4.2.6.3.7.5.1.5.1 1.3-.2 2.1z" />
                                        </svg>
                                    </a>
                                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                            <rect x="2" y="9" width="4" height="12"></rect>
                                            <circle cx="4" cy="4" r="2"></circle>
                                        </svg>
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
