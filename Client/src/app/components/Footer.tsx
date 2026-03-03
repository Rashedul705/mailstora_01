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
                    <div className="footer-links">
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
                                <li><a href="#terms">Terms & Conditions</a></li>
                                <li><a href="#privacy">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="footer-links-group">
                            <h4>Contact</h4>
                            <ul>
                                <li><a href="mailto:hello@mailstora.com">hello@mailstora.com</a></li>
                                <li>
                                    <div className="social-icons">
                                        <a href="#" aria-label="LinkedIn">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} MailStora. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
