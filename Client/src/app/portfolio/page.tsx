'use client';
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import "./PortfolioPage.css";

const ESP_LIST = ["All ESPs", "Mailchimp", "Klaviyo", "HubSpot", "Zoho", "ActiveCampaign", "SendGrid", "Other"];

export default function PortfolioPage() {
    const [items, setItems] = useState<any[]>([]);
    const [featuredItems, setFeaturedItems] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({ total: 400, emailTemplates: 0, emailSignatures: 0, caseStudies: 0 });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeTab, setActiveTab] = useState('');
    const [activeEsp, setActiveEsp] = useState('All ESPs');
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('latest');
    const [viewMode, setViewMode] = useState('grid');
    const limit = 9;

    useEffect(() => {
        fetch('http://localhost:5000/api/portfolio/counts')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
            
        fetch('http://localhost:5000/api/portfolio/featured')
            .then(res => res.json())
            .then(data => setFeaturedItems(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            let url = `http://localhost:5000/api/portfolio?page=${page}&limit=${limit}&sort=${sort}`;
            if (activeTab) url += `&type=${activeTab}`;
            if (activeEsp !== 'All ESPs') url += `&esp=${activeEsp}`;
            if (searchQuery) url += `&q=${searchQuery}`;

            try {
                const res = await fetch(url);
                const data = await res.json();
                setItems(data.items || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error(err);
            }
        };
        const timer = setTimeout(fetchItems, 300);
        return () => clearTimeout(timer);
    }, [page, activeTab, activeEsp, sort, searchQuery]);

    const getGradient = (bg: string) => {
        switch(bg) {
            case 'navy': return '#1e1a5e';
            case 'dark-navy': return '#0f172a';
            case 'dark-green': return '#14532d';
            case 'dark-red': return '#450a0a';
            default: return '#1e1a5e';
        }
    };

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
                                <span className="stat-val text-orange">180+</span>
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

            <section className="portfolio-main">
                <div className="container">
                    <div className="filter-bar-wrapper">
                        <div className="filter-bar">
                            <div className="tabs">
                                <button className={`tab-btn ${activeTab === '' ? 'active' : ''}`} onClick={() => { setActiveTab(''); setPage(1); }}>
                                    All Work <span className="count">{stats.total}</span>
                                </button>
                                <button className={`tab-btn ${activeTab === 'Email Template' ? 'active' : ''}`} onClick={() => { setActiveTab('Email Template'); setPage(1); }}>
                                    Email Templates <span className="count">{stats.emailTemplates}</span>
                                </button>
                                <button className={`tab-btn ${activeTab === 'Email Signature' ? 'active' : ''}`} onClick={() => { setActiveTab('Email Signature'); setPage(1); }}>
                                    Email Signatures <span className="count">{stats.emailSignatures}</span>
                                </button>
                                <button className={`tab-btn ${activeTab === 'Case Study' ? 'active' : ''}`} onClick={() => { setActiveTab('Case Study'); setPage(1); }}>
                                    Case Studies <span className="count">{stats.caseStudies}</span>
                                </button>
                            </div>
                            
                            <div className="toolbar">
                                <div className="search-box">
                                    <span className="search-icon">🔍</span>
                                    <input 
                                        type="text" 
                                        placeholder="Search templates..." 
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                                    />
                                </div>
                                <select className="sort-dropdown" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                                    <option value="latest">Latest</option>
                                    <option value="popular">Most Viewed</option>
                                </select>
                                <div className="view-toggle">
                                    <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
                                    <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>≣</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="esp-filters">
                        {ESP_LIST.map(esp => (
                            <button 
                                key={esp} 
                                className={`esp-pill ${activeEsp === esp ? 'active' : ''}`}
                                onClick={() => { setActiveEsp(esp); setPage(1); }}
                            >
                                {esp}
                            </button>
                        ))}
                    </div>

                    {/* Featured Item */}
                    {page === 1 && featuredItems.length > 0 && (
                        <div className="featured-portfolio-item">
                            <span className="featured-badge">★ Featured</span>
                            <div className="featured-info">
                                <h2>{featuredItems[0].title}</h2>
                                <p>{featuredItems[0].shortDescription || "Fully responsive HTML email template for a Canadian home improvement brand. Mobile-first layout tested in Gmail, Outlook 365, Apple Mail, and 30+ clients."}</p>
                                
                                <div className="featured-metrics">
                                    <div className="metric-item">👤 {featuredItems[0].clientName}</div>
                                    <div className="metric-item">✉️ {featuredItems[0].esp || "Mailchimp"}</div>
                                    {featuredItems[0].results?.deliveryTime && <div className="metric-item">⏱️ {featuredItems[0].results.deliveryTime}</div>}
                                    {featuredItems[0].results?.openRate && <div className="metric-item">📈 {featuredItems[0].results.openRate} Open Rate</div>}
                                </div>
                                
                                <div className="featured-actions">
                                    <Link href={`/portfolio/${featuredItems[0].slug}`} className="btn-primary-orange">View Project →</Link>
                                    <Link href="/quote" className="btn-secondary-outline">Get Similar</Link>
                                </div>
                            </div>
                            <div className="featured-image-wrapper">
                                <Image src={featuredItems[0].coverImage || "/mockup.png"} alt={featuredItems[0].title} width={500} height={350} className="featured-img" />
                            </div>
                        </div>
                    )}

                    <div className="section-title-wrapper">
                        <h3 className="section-title-small">ALL PORTFOLIO ITEMS</h3>
                    </div>

                    <div className={`portfolio-items ${viewMode}`}>
                        {items.length === 0 ? (
                            <div className="no-results">No portfolio items found.</div>
                        ) : (
                            items.map((item, idx) => (
                                <div key={idx} className="portfolio-card">
                                    <div className="portfolio-preview" style={{ background: getGradient(item.cardBackground) }}>
                                        {item.type === 'Case Study' && item.results ? (
                                            <div className="case-study-preview">
                                                <div className="cs-stats">
                                                    <div className="cs-stat-box">
                                                        <div className="cs-val text-red">{item.results.openRate || '19%'}</div>
                                                        <div className="cs-lbl">Before</div>
                                                    </div>
                                                    <span className="cs-arrow">→</span>
                                                    <div className="cs-stat-box">
                                                        <div className="cs-val text-green">{item.results.clickRate || '42%'}</div>
                                                        <div className="cs-lbl">After</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mockup-wrapper">
                                                <Image
                                                    src={item.coverImage || "/mockup.png"}
                                                    alt={item.title}
                                                    width={300}
                                                    height={200}
                                                    className="mockup-img"
                                                />
                                            </div>
                                        )}
                                        
                                        <div className="card-overlay">
                                            <Link href={`/portfolio/${item.slug}`} className="btn-preview-light">View Project</Link>
                                        </div>
                                    </div>
                                    
                                    <div className="portfolio-info">
                                        <div className="card-meta">
                                            <span className={`card-type-badge badge-${(item.type || 'Template').replace(' ', '-').toLowerCase()}`}>
                                                {(item.type || 'Template').toUpperCase()}
                                            </span>
                                            <span className="card-esp">{item.esp}</span>
                                        </div>
                                        <h3 className="card-title">{item.title}</h3>
                                        <div className="card-bottom-meta">
                                            <span className="card-client">👤 {item.clientName}</span>
                                            <div className="card-compatibility">
                                                {(item.compatibility || []).slice(0,2).map((tag: string, i: number) => (
                                                    <span key={i} className="compatibility-tag">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {totalPages > 0 && (
                        <div className="pagination">
                            <button 
                                className="page-btn nav-btn" 
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            >
                                ← Prev
                            </button>
                            <div className="page-numbers">
                                {Array.from({ length: totalPages }).map((_, i) => {
                                    if (totalPages > 5 && i !== 0 && i !== totalPages - 1 && Math.abs(page - (i + 1)) > 1) {
                                        if (i === 1 && page > 3) return <span key={i} className="page-dots">...</span>;
                                        if (i === totalPages - 2 && page < totalPages - 2) return <span key={i} className="page-dots">...</span>;
                                        return null;
                                    }
                                    return (
                                        <button 
                                            key={i} 
                                            className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                                            onClick={() => setPage(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    );
                                })}
                            </div>
                            <button 
                                className="page-btn nav-btn" 
                                disabled={page === totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            </section>
            
            <section className="portfolio-cta">
                <div className="cta-container text-center">
                    <div className="section-pill cta-pill">+ READY TO START?</div>
                    <h2>Need a Custom Email Template?</h2>
                    <p>Get a hand-coded, pixel-perfect HTML email template tested across Gmail, Outlook, and all major email clients. Delivered in 24-48 hours.</p>
                    <div className="cta-buttons">
                        <Link href="/quote" className="btn-primary-orange">Get Free Quote →</Link>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="btn-whatsapp">
                            <span className="whatsapp-icon">💬</span> Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
