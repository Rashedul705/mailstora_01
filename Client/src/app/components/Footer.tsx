import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../utils/siteConfig";
import { COMPANY_LINKS } from "./navData";
import "./Footer.css";

const { founder, stats, upwork } = siteConfig;

// The 6 main email services; everything else is on /services/
const FOOTER_SERVICES = [
    { label: "HTML Email Templates", href: "/html-email-template-development/" },
    { label: "Figma & PSD to HTML", href: "/figma-to-html-email/" },
    { label: "Email Testing & Outlook Fixes", href: "/outlook-email-rendering-fix/" },
    { label: "HTML Email Signatures", href: "/html-email-signature-design/" },
    { label: "Klaviyo Flow Setup", href: "/klaviyo-flow-setup/" },
    { label: "Klaviyo & Mailchimp Campaigns", href: "/klaviyo-campaign-management/" },
];

export const SOCIALS = () => [
    { label: "Upwork", href: founder.socials.upwork, path: "M24.75 17.542c-1.469 0-2.849-.61-4.081-1.638l.303-1.437.013-.066c.264-1.511 1.094-4.047 3.765-4.047 1.98 0 3.595 1.627 3.595 3.595 0 1.979-1.615 3.593-3.595 3.593zM24.75 8c-3.43 0-6.017 2.287-7.122 6.019-.838-1.548-1.459-3.414-1.838-4.985H12.9v5.967c0 1.905-.87 3.808-2.775 3.808-1.905 0-2.906-1.903-2.906-3.808l.011-5.967H4.25v5.967c0 3.748 1.95 6.722 5.875 6.722 3.925 0 5.918-3.15 5.918-6.906l-.003-.638c.35 1.104.831 2.276 1.438 3.293L15.56 26h2.97l1.123-5.447c1.203.813 2.593 1.301 4.097 1.301 3.748 0 6.75-3.027 6.75-6.75 0-3.722-3.002-6.104-5.75-6.104z", box: "0 0 32 32" },
    { label: "LinkedIn", href: founder.socials.linkedin, path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z", box: "0 0 24 24" },
    { label: "Fiverr", href: founder.socials.fiverr, path: "M13.5 7.5h-2v-.9c0-.8.5-1.1 1.2-1.1h.8V2.9h-1.4C9.6 2.9 8.3 4.3 8.3 6.8v.7H6.7v2.7h1.6v10.9h3.2V10.2h2v10.9h3.2V7.5zm1.6-3.3a1.9 1.9 0 1 0 3.8 0 1.9 1.9 0 0 0-3.8 0z", box: "0 0 24 24" },
    { label: "Facebook", href: founder.socials.facebook, path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z", box: "0 0 24 24" },
];

export default function Footer() {
    const year = new Date().getFullYear();
    const wa = `https://wa.me/${founder.whatsapp}`;

    return (
        <footer className="site-footer">
            {/* Faint decorative icons */}
            <div className="site-footer-deco" aria-hidden="true">
                <svg className="fd1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                <svg className="fd2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>
                <svg className="fd3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
                <svg className="fd4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" /></svg>
            </div>

            <div className="container">
                <div className="site-footer-grid">
                    <div className="site-footer-brand">
                        <Link href="/" className="site-footer-logo">
                            <Image src="/images/brand/mailstora-logo-2026.webp" alt="MailStora" width={200} height={37} />
                        </Link>
                        <p>
                            MailStora is a founder-led HTML email development agency. Led by {founder.name}, we build hand-coded
                            email templates, email signatures and Klaviyo automation for ecommerce brands and agencies worldwide.
                        </p>
                        <ul className="site-footer-stats">
                            <li><strong>{stats.yearsExperience}</strong> years</li>
                            <li><strong>{stats.templatesBuilt}</strong> templates</li>
                            <li><strong>{upwork.rating}/5</strong> on Upwork</li>
                        </ul>
                        <ul className="site-footer-socials">
                            {SOCIALS().map((s) => (
                                <li key={s.label}>
                                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`MailStora on ${s.label}`}>
                                        <svg viewBox={s.box} width="18" height="18" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav aria-label="Services" className="site-footer-col site-footer-col--wide">
                        <h3>Services</h3>
                        <ul>
                            {FOOTER_SERVICES.map((l) => (
                                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                            ))}
                        </ul>
                        <Link href="/services/" className="site-footer-all">View all services →</Link>
                    </nav>

                    <nav aria-label="Company" className="site-footer-col">
                        <h3>Company</h3>
                        <ul>
                            {COMPANY_LINKS.map((l) => (
                                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    <div className="site-footer-col">
                        <h3>Get in Touch</h3>
                        <ul className="site-footer-contact">
                            <li><Link href="/quote/">Request a free quote</Link></li>
                            <li><Link href="/schedule/">Book a consultation</Link></li>
                            <li><a href={`mailto:${founder.email}`}>{founder.email}</a></li>
                            <li><a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                            <li><a href={founder.socials.upwork} target="_blank" rel="noopener noreferrer">Hire on Upwork</a></li>
                        </ul>
                        <p className="site-footer-reply">Usually replies within 2 to 4 hours</p>
                    </div>
                </div>

                <div className="site-footer-bottom">
                    <p>© {year} MailStora. All rights reserved.</p>
                    <ul>
                        <li><Link href="/privacy/">Privacy Policy</Link></li>
                        <li><Link href="/terms/">Terms of Service</Link></li>
                        <li><Link href="/contact/">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
