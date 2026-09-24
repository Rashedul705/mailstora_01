import { Metadata } from 'next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import "./SinglePortfolio.css";
import HeroViewerClient from "./HeroViewerClient";
import GalleryClient from "./GalleryClient";

async function getPortfolioItem(slug: string) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    try {
        const res = await fetch(`${API_BASE}/api/portfolio/${slug}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        return null;
    }
}

async function getRelatedItems(type: string, currentId: string) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    try {
        const res = await fetch(`${API_BASE}/api/portfolio?type=${encodeURIComponent(type)}&limit=4`, { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        return (data.items || []).filter((r: any) => r._id !== currentId).slice(0, 3);
    } catch (e) {
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const item = await getPortfolioItem(slug);
    
    if (!item) {
        return { title: 'Portfolio Item Not Found' };
    }
    
    return {
        title: `${item.title} - MailStora Portfolio`,
        description: item.shortDescription || `View our recent ${item.type} project for ${item.clientName}.`,
        alternates: {
            canonical: `https://mailstora.com/portfolio/${slug}`
        },
        openGraph: {
            title: `${item.title} - MailStora Portfolio`,
            description: item.shortDescription || `View our recent ${item.type} project for ${item.clientName}.`,
            images: item.coverImage ? [item.coverImage] : []
        }
    };
}

export default async function SinglePortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = await getPortfolioItem(slug);

    if (!item) {
        return (
            <div className="single-portfolio-page">
                <Navbar />
                <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <h1>Item Not Found</h1>
                    <Link href="/portfolio">← Back to Portfolio</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const relatedItems = await getRelatedItems(item.type, item._id);

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
                        
                        <HeroViewerClient item={item} />
                    </div>
                </div>
            </section>

            <GalleryClient item={item} />

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
                        <a href="https://wa.me/8801744350705" target="_blank" rel="noopener noreferrer" className="btn-wa">💬 WhatsApp</a>
                    </div>
                </div>
            </section>
            
            {relatedItems.length > 0 && (
                <section className="related-items container">
                    <h2>More Portfolio Items</h2>
                    <div className="portfolio-items grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        {relatedItems.map((rel: any, idx: number) => (
                            <div key={idx} className="portfolio-card" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '13px' }}>
                                <div className="portfolio-preview" style={{ height: '150px', background: '#2d287b', position: 'relative', overflow: 'hidden' }}>
                                    <Image 
                                        src={rel.coverImage || '/mockup.png'} 
                                        alt={rel.title} 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        style={{ objectFit: 'cover' }} 
                                    />
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
