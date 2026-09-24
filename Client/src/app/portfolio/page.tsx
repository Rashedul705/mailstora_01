import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import "./PortfolioPage.css";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
    title: "Portfolio | HTML Email Templates & Signatures | MailStora",
    description: "Browse 400+ custom HTML email templates and signatures built for Klaviyo, Mailchimp, HubSpot, and more. Tested in 30+ email clients.",
};

async function getPortfolioData() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    
    try {
        const [statsRes, featuredRes, itemsRes] = await Promise.all([
            fetch(`${API_BASE}/api/portfolio/counts`, { cache: 'no-store' }).catch(() => null),
            fetch(`${API_BASE}/api/portfolio/featured`, { cache: 'no-store' }).catch(() => null),
            fetch(`${API_BASE}/api/portfolio?page=1&limit=9&sort=latest`, { cache: 'no-store' }).catch(() => null)
        ]);

        return {
            stats: statsRes && statsRes.ok ? await statsRes.json() : { total: 400, emailTemplates: 0, emailSignatures: 0, caseStudies: 0 },
            featured: featuredRes && featuredRes.ok ? await featuredRes.json() : [],
            itemsData: itemsRes && itemsRes.ok ? await itemsRes.json() : { items: [], totalPages: 1 }
        };
    } catch (e) {
        return {
            stats: { total: 400, emailTemplates: 0, emailSignatures: 0, caseStudies: 0 },
            featured: [],
            itemsData: { items: [], totalPages: 1 }
        };
    }
}

export default async function PortfolioPage() {
    const { stats, featured, itemsData } = await getPortfolioData();

    return (
        <div className="portfolio-page-wrapper">
            <Navbar />
            
            <section className="portfolio-hero">
                <div className="hero-pattern-bg"></div>
                <div className="container relative z-10">
                    <div className="hero-content text-center">
                        <div className="section-pill hero-pill">+ OUR PORTFOLIO</div>
                        <h1 className="hero-title">400+ Templates Built.<br/><span className="text-orange">Every One Pixel-Perfect.</span></h1>
                        <p className="hero-subtitle">Hand-coded HTML email templates and signatures tested across Gmail, Outlook, Apple Mail, and 30+ email clients — built for real businesses, delivered on time.</p>
                        
                        <div className="hero-stats-row">
                            <div className="hero-stat-block">
                                <span className="stat-val text-orange">{stats.total}+</span>
                                <span className="stat-lbl">Templates Built</span>
                            </div>
                            <div className="hero-stat-block">
                                <span className="stat-val text-orange">200+</span>
                                <span className="stat-lbl">Happy Clients</span>
                            </div>
                            <div className="hero-stat-block">
                                <span className="stat-val text-orange">30+</span>
                                <span className="stat-lbl">ESPs Supported</span>
                            </div>
                            <div className="hero-stat-block">
                                <span className="stat-val text-orange">100%</span>
                                <span className="stat-lbl">Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PortfolioClient 
                initialItems={itemsData.items} 
                initialStats={stats} 
                initialFeatured={featured} 
                initialTotalPages={itemsData.totalPages} 
            />
            
            <section className="portfolio-cta">
                <div className="cta-container text-center">
                    <div className="section-pill cta-pill">+ READY TO START?</div>
                    <h2>Need a Custom Email Template?</h2>
                    <p>Get a hand-coded, pixel-perfect HTML email template tested across Gmail, Outlook, and all major email clients. Delivered in 24-48 hours.</p>
                    <div className="cta-buttons">
                        <Link href="/quote" className="btn-primary-orange">Get Free Quote →</Link>
                        <a href="https://wa.me/8801744350705" target="_blank" rel="noreferrer" className="btn-whatsapp">
                            <span className="whatsapp-icon">💬</span> Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
