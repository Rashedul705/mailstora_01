'use client';
import { useState, useEffect, use } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import "./SinglePortfolio.css";

export default function SinglePortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [item, setItem] = useState<any>(null);
    const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
    const [galleryTab, setGalleryTab] = useState('All');
    const [activeGalleryImage, setActiveGalleryImage] = useState<any>(null);
    const [relatedItems, setRelatedItems] = useState<any[]>([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/portfolio/${slug}`)
            .then(res => res.json())
            .then(data => {
                setItem(data);
                
                // Set initial gallery image
                const allImages = [];
                if (data.angleViews) allImages.push(...data.angleViews);
                if (data.desktopImages) data.desktopImages.forEach((url: string) => allImages.push({ label: 'Desktop View', device: 'desktop', imageUrl: url }));
                if (data.mobileImages) data.mobileImages.forEach((url: string) => allImages.push({ label: 'Mobile View', device: 'mobile', imageUrl: url }));
                
                if (allImages.length > 0) setActiveGalleryImage(allImages[0]);

                // Fetch related
                fetch(`http://localhost:5000/api/portfolio?type=${data.type}&limit=3`)
                    .then(res => res.json())
                    .then(relData => {
                        if (relData.items) {
                            setRelatedItems(relData.items.filter((r: any) => r._id !== data._id).slice(0, 3));
                        }
                    });
            })
            .catch(err => console.error(err));
    }, [slug]);

    if (!item) return <div className="loading-state">Loading...</div>;

    const allGalleryItems = [];
    if (item.angleViews) allGalleryItems.push(...item.angleViews);
    if (item.desktopImages) item.desktopImages.forEach((url: string, i: number) => allGalleryItems.push({ label: `Desktop View ${i+1}`, device: 'desktop', imageUrl: url }));
    if (item.mobileImages) item.mobileImages.forEach((url: string, i: number) => allGalleryItems.push({ label: `Mobile View ${i+1}`, device: 'mobile', imageUrl: url }));

    const filteredGalleryItems = allGalleryItems.filter(img => {
        if (galleryTab === 'All') return true;
        if (galleryTab === 'Desktop' && img.device === 'desktop') return true;
        if (galleryTab === 'Mobile' && img.device === 'mobile') return true;
        if (galleryTab === 'Sections' && img.device !== 'desktop' && img.device !== 'mobile') return true; // assuming specific angles might not be purely "desktop"/"mobile" or have specific labels
        return false;
    });

    return (
        <div className="single-portfolio-page">
            <Navbar />
            
            <div className="breadcrumb-bar container">
                <Link href="/portfolio">Portfolio</Link> › <span className="active">{item.title}</span>
            </div>

            <section className="sp-hero">
                <div className="container">
                    <div className="sp-hero-grid">
                        <div className="sp-hero-content">
                            <div className="badges">
                                <span className="badge-type">{item.type}</span>
                                <span className="badge-esp">{item.esp}</span>
                            </div>
                            <h1 className="sp-title">{item.title}</h1>
                            <p className="sp-short-desc">{item.shortDescription}</p>
                            
                            <div className="sp-meta-row">
                                <div className="sp-meta-item"><span>💼</span> {item.clientName}</div>
                                {item.results?.deliveryTime && <div className="sp-meta-item"><span>⏱</span> {item.results.deliveryTime} delivery</div>}
                                <div className="sp-meta-item"><span>✓</span> {item.compatibility?.length || 0} Clients Compatible</div>
                            </div>
                        </div>
                        
                        <div className="sp-hero-viewer">
                            <div className="viewer-controls">
                                <button 
                                    className={`viewer-btn ${deviceView === 'desktop' ? 'active' : ''}`}
                                    onClick={() => setDeviceView('desktop')}
                                >🖥 Desktop</button>
                                <button 
                                    className={`viewer-btn ${deviceView === 'mobile' ? 'active' : ''}`}
                                    onClick={() => setDeviceView('mobile')}
                                >📱 Mobile</button>
                            </div>
                            
                            <div className="device-frame">
                                {deviceView === 'desktop' ? (
                                    <div className="laptop-mockup">
                                        <div className="screen">
                                            <Image 
                                                src={(item.desktopImages && item.desktopImages[0]) || item.coverImage || "/mockup.png"} 
                                                alt="Desktop View" 
                                                width={600} 
                                                height={400} 
                                                className="mockup-inner-img"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="phone-mockup">
                                        <div className="screen">
                                            <Image 
                                                src={(item.mobileImages && item.mobileImages[0]) || item.coverImage || "/mockup.png"} 
                                                alt="Mobile View" 
                                                width={300} 
                                                height={600} 
                                                className="mockup-inner-img"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sp-gallery container">
                <div className="gallery-header">
                    <h2>🖼 Template Gallery</h2>
                    <div className="gallery-tabs">
                        {['All', 'Desktop', 'Mobile', 'Sections'].map(tab => (
                            <button 
                                key={tab} 
                                className={`g-tab-btn ${galleryTab === tab ? 'active' : ''}`}
                                onClick={() => setGalleryTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="main-preview-box">
                    {activeGalleryImage ? (
                        <Image 
                            src={activeGalleryImage.imageUrl} 
                            alt={activeGalleryImage.label} 
                            fill
                            className="main-preview-img"
                        />
                    ) : (
                        <div className="placeholder-preview">No image selected</div>
                    )}
                    <div className="preview-overlay">
                        <div className="preview-label">{activeGalleryImage?.label || ''}</div>
                        <div className="preview-nav">
                            <button className="nav-arrow">←</button>
                            <button className="nav-arrow">→</button>
                        </div>
                    </div>
                </div>

                <div className="thumbnail-strip">
                    {filteredGalleryItems.map((img, idx) => (
                        <div 
                            key={idx} 
                            className={`thumbnail ${activeGalleryImage?.imageUrl === img.imageUrl ? 'active' : ''}`}
                            onClick={() => setActiveGalleryImage(img)}
                        >
                            <div className="thumb-img-wrapper">
                                <Image src={img.imageUrl} alt={img.label} fill className="thumb-img" />
                            </div>
                            <div className={`thumb-label ${img.device === 'mobile' ? 'mobile-lbl' : 'desktop-lbl'}`}>
                                {img.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="sp-content container">
                <div className="sp-main-col">
                    <h2>About This Project</h2>
                    <p className="full-desc">{item.fullDescription}</p>

                    <h2>What Was Included</h2>
                    <ul className="included-list">
                        {(item.whatWasIncluded || '').split('\n').map((point: string, i: number) => (
                            point.trim() ? <li key={i}>{point}</li> : null
                        ))}
                    </ul>

                    {item.results && (item.results.openRate || item.results.clickRate) && (
                        <div className="results-box">
                            <h3 className="results-title">📈 Campaign Results</h3>
                            <div className="results-grid">
                                <div className="res-item">
                                    <div className="res-val">{item.results.openRate}</div>
                                    <div className="res-lbl">Open Rate</div>
                                </div>
                                <div className="res-item">
                                    <div className="res-val">{item.results.clickRate}</div>
                                    <div className="res-lbl">Click Rate</div>
                                </div>
                                <div className="res-item">
                                    <div className="res-val">{item.results.deliveryTime}</div>
                                    <div className="res-lbl">Delivery</div>
                                </div>
                                <div className="res-item">
                                    <div className="res-val">{item.results.customMetric}</div>
                                    <div className="res-lbl">Improvement</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <h2>Compatible With</h2>
                    <div className="compatibility-chips">
                        {(item.compatibility || []).map((client: string, i: number) => (
                            <span key={i} className="comp-chip">{client}</span>
                        ))}
                    </div>
                </div>

                <div className="sp-sidebar">
                    <div className="sidebar-card details-card">
                        <h3>Project Details</h3>
                        <div className="detail-row">
                            <span className="dlbl">Type</span>
                            <span className="dval">{item.type}</span>
                        </div>
                        <div className="detail-row">
                            <span className="dlbl">ESP</span>
                            <span className="dval">{item.esp}</span>
                        </div>
                        <div className="detail-row">
                            <span className="dlbl">Client</span>
                            <span className="dval">{item.clientName}</span>
                        </div>
                        <div className="detail-row">
                            <span className="dlbl">Industry</span>
                            <span className="dval">{item.industry}</span>
                        </div>
                        <div className="detail-row">
                            <span className="dlbl">Delivery</span>
                            <span className="dval">{item.results?.deliveryTime || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                            <span className="dlbl">Year</span>
                            <span className="dval">{item.year}</span>
                        </div>
                    </div>

                    <div className="sidebar-card cta-card">
                        <h3>Need Something Similar?</h3>
                        <p>Custom HTML email template tested across all clients. 24-48hr delivery.</p>
                        <Link href="/quote" className="btn-quote">Get Free Quote →</Link>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="btn-wa">💬 WhatsApp</a>
                    </div>
                </div>
            </section>
            
            {relatedItems.length > 0 && (
                <section className="related-items container">
                    <h2>More Portfolio Items</h2>
                    <div className="portfolio-items grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        {/* We reuse the portfolio card design here briefly */}
                        {relatedItems.map((rel, idx) => (
                            <div key={idx} className="portfolio-card" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '13px' }}>
                                <div className="portfolio-preview" style={{ height: '150px', background: '#2d287b', position: 'relative', overflow: 'hidden' }}>
                                    <Image src={rel.coverImage || '/mockup.png'} alt={rel.title} fill style={{ objectFit: 'cover' }} />
                                    <Link href={`/portfolio/${rel.slug}`} style={{ position: 'absolute', inset: 0 }}></Link>
                                </div>
                                <div className="portfolio-info" style={{ padding: '1rem' }}>
                                    <span style={{ fontSize: '0.7rem', color: '#f97316' }}>{rel.type}</span>
                                    <h4 style={{ margin: '0.5rem 0', fontSize: '1rem' }}>{rel.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
