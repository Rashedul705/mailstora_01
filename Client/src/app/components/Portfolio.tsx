'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import "./Portfolio.css";

export default function Portfolio() {
    const [items, setItems] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalTemplates: 400 });
    const [activeFilter, setActiveFilter] = useState('All Work');

    useEffect(() => {
        // Fetch featured items
        fetch('http://localhost:5000/api/portfolio/featured')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setItems(data);
            })
            .catch(err => console.error(err));

        // Fetch stats
        fetch('http://localhost:5000/api/portfolio/stats')
            .then(res => res.json())
            .then(data => {
                if (data.totalTemplates) setStats(data);
            })
            .catch(err => console.error(err));
    }, []);

    const filters = ['All Work', 'Email Templates', 'Email Signatures', 'Case Studies'];

    const filteredItems = items.filter(item => {
        if (activeFilter === 'All Work') return true;
        if (activeFilter === 'Email Templates') return item.type === 'Email Template';
        if (activeFilter === 'Email Signatures') return item.type === 'Email Signature';
        if (activeFilter === 'Case Studies') return item.type === 'Case Study';
        return true;
    });

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
        <section className="portfolio-section" id="portfolio">
            <div className="container">
                <div className="portfolio-header text-center">
                    <div className="section-pill">✦ Our Portfolio</div>
                    <h2 className="section-title">
                        Recent Work That <span className="text-orange">Delivers Results</span>
                    </h2>
                    <p className="section-subtitle">
                        Hand-coded HTML email templates tested across Gmail, Outlook, Apple Mail, and 30+ email clients.
                    </p>
                </div>

                <div className="stats-strip">
                    <div className="stat-item">
                        <span className="stat-value">{stats.totalTemplates}+</span>
                        <span className="stat-label">Templates Built</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">180+</span>
                        <span className="stat-label">Happy Clients</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">30+</span>
                        <span className="stat-label">ESPs Supported</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">100%</span>
                        <span className="stat-label">Satisfaction</span>
                    </div>
                </div>

                <div className="filter-chips">
                    {filters.map(f => (
                        <button 
                            key={f} 
                            className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="portfolio-grid">
                    {filteredItems.map((item, idx) => (
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
                    ))}
                </div>

                <div className="portfolio-action-bottom text-center">
                    <p className="cta-text">Want to see more? We have {stats.totalTemplates}+ templates across every industry and ESP.</p>
                    <div className="cta-buttons">
                        <Link href="/portfolio" className="btn-navy">View Full Portfolio →</Link>
                        <Link href="/quote" className="btn-orange">Get a Free Quote</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
