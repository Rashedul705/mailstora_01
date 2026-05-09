'use client';
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import "./PortfolioPage.css";

export default function PortfolioPage() {
    const [items, setItems] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({ total: 400, emailTemplates: 0, emailSignatures: 0, caseStudies: 0 });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeTab, setActiveTab] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('latest');
    const [viewMode, setViewMode] = useState('grid');
    const limit = 9;

    useEffect(() => {
        fetch('http://localhost:5000/api/portfolio/counts')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            let url = `http://localhost:5000/api/portfolio?page=${page}&limit=${limit}&sort=${sort}`;
            if (activeTab) url += `&type=${activeTab}`;
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
        const timer = setTimeout(fetchItems, 300); // debounce search
        return () => clearTimeout(timer);
    }, [page, activeTab, sort, searchQuery]);

    const getGradient = (bg: string) => {
        switch(bg) {
            case 'navy': return 'linear-gradient(150deg, #2d287b, #1e1a5e)';
            case 'dark-navy': return 'linear-gradient(150deg, #0f172a, #1e293b)';
            case 'dark-green': return 'linear-gradient(150deg, #14532d, #1e1a5e)';
            case 'dark-red': return 'linear-gradient(150deg, #7c2d12, #1a1a2e)';
            default: return 'linear-gradient(150deg, #2d287b, #1e1a5e)';
        }
    };

    return (
        <div className="portfolio-page-wrapper">
            <Navbar />
            
            <section className="portfolio-hero">
                <div className="container">
                    <div className="hero-content text-center">
                        <div className="section-pill hero-pill">✦ Our Portfolio</div>
                        <h1 className="hero-title">400+ Templates Built. Every One Pixel-Perfect.</h1>
                        <p className="hero-subtitle">Hand-coded HTML email templates tested across Gmail, Outlook, Apple Mail, and 30+ email clients.</p>
                        
                        <div className="hero-stats">
                            <div className="hero-stat-item">
                                <span className="stat-val">{stats.total}+</span>
                                <span className="stat-lbl">Total Templates</span>
                            </div>
                            <div className="hero-stat-item">
                                <span className="stat-val">180+</span>
                                <span className="stat-lbl">Happy Clients</span>
                            </div>
                            <div className="hero-stat-item">
                                <span className="stat-val">30+</span>
                                <span className="stat-lbl">ESPs Supported</span>
                            </div>
                            <div className="hero-stat-item">
                                <span className="stat-val">100%</span>
                                <span className="stat-lbl">Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="portfolio-main">
                <div className="container">
                    <div className="filter-bar">
                        <div className="tabs">
                            <button className={`tab-btn ${activeTab === '' ? 'active' : ''}`} onClick={() => { setActiveTab(''); setPage(1); }}>
                                All Work <span className="count">({stats.total})</span>
                            </button>
                            <button className={`tab-btn ${activeTab === 'Email Template' ? 'active' : ''}`} onClick={() => { setActiveTab('Email Template'); setPage(1); }}>
                                Email Templates <span className="count">({stats.emailTemplates})</span>
                            </button>
                            <button className={`tab-btn ${activeTab === 'Email Signature' ? 'active' : ''}`} onClick={() => { setActiveTab('Email Signature'); setPage(1); }}>
                                Email Signatures <span className="count">({stats.emailSignatures})</span>
                            </button>
                            <button className={`tab-btn ${activeTab === 'Case Study' ? 'active' : ''}`} onClick={() => { setActiveTab('Case Study'); setPage(1); }}>
                                Case Studies <span className="count">({stats.caseStudies})</span>
                            </button>
                        </div>
                        
                        <div className="toolbar">
                            <div className="search-box">
                                <span className="search-icon">🔍</span>
                                <input 
                                    type="text" 
                                    placeholder="Search by title, client..." 
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                                />
                            </div>
                            <select className="sort-dropdown" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                                <option value="latest">Latest</option>
                                <option value="popular">Most Viewed</option>
                            </select>
                            <div className="view-toggle">
                                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>⊞ Grid</button>
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>≣ List</button>
                            </div>
                        </div>
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
                                                        <div className="cs-val">{item.results.openRate}</div>
                                                        <div className="cs-lbl">Open Rate</div>
                                                    </div>
                                                    <div className="cs-stat-box">
                                                        <div className="cs-val">{item.results.clickRate}</div>
                                                        <div className="cs-lbl">Click Rate</div>
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
                                            <Link href={`/portfolio/${item.slug}`} className="btn-preview">👁 Preview</Link>
                                            <Link href="/quote" className="btn-similar">Get Similar →</Link>
                                        </div>
                                    </div>
                                    
                                    <div className="portfolio-info">
                                        <div className="card-meta">
                                            <span className="card-type">{item.type}</span>
                                            <span className="card-esp">{item.esp}</span>
                                        </div>
                                        <h3 className="card-title">{item.title}</h3>
                                        <p className="card-client">👤 {item.clientName}</p>
                                        <div className="card-tags">
                                            {(item.compatibility || []).slice(0,3).map((tag: string, i: number) => (
                                                <span key={i} className="compatibility-tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                className="page-btn nav-btn" 
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            >
                                ← Prev
                            </button>
                            <div className="page-numbers">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button 
                                        key={i} 
                                        className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
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
            
            <Footer />
        </div>
    );
}
