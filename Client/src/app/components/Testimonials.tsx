'use client';

import { useEffect, useState, useRef } from 'react';
import './Testimonials.css';

interface Testimonial {
    _id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
    platform: 'upwork' | 'fiverr' | 'direct';
    featured: boolean;
    status: 'pending' | 'published';
    avatarInitials: string;
    createdAt: string;
}

interface Stats {
    totalCount: number;
    publishedCount: number;
    pendingCount: number;
    avgRating: number;
}

const AVATAR_PALETTE = ['#ede9fe','#dcfce7','#fef9c3','#fee2e2','#dbeafe','#fce7f3'];
const TEXT_PALETTE = ['#4c1d95','#14532d','#713f12','#7f1d1d','#1e3a8a','#831843'];

function getAvatarColors(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AVATAR_PALETTE.length;
    return { bg: AVATAR_PALETTE[index], color: TEXT_PALETTE[index] };
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
                const res = await fetch(`${API}/api/testimonials?status=published`);
                if (!res.ok) throw new Error('Failed to fetch');
                const json = await res.json();
                setTestimonials(json.data || []);
                setStats(json.stats || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    const scrollTo = (index: number) => {
        if (!trackRef.current) return;
        const cardWidth = trackRef.current.children[0].clientWidth;
        trackRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        setCurrentIndex(index);
    };

    if (!loading && testimonials.length === 0) return null; // Graceful hide

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="testimonials-container">
                {/* Header */}
                <p className="testimonials-label">CLIENT REVIEWS</p>
                <h2 className="testimonials-heading">What Our Clients Say</h2>
                <p className="testimonials-subtitle">Real feedback from real businesses — no copy-paste marketing fluff.</p>
                <div className="testimonials-divider" />

                {/* Stats Bar */}
                <div className="testi-stats-strip">
                    <div className="testi-stats-rating">
                        <span className="testi-stats-number">{stats ? stats.avgRating.toFixed(1) : '5.0'}</span>
                        <div className="testi-stats-stars-col">
                            <div className="testi-stats-stars">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <svg key={star} viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="testi-stats-count">Based on {stats ? stats.publishedCount : '0'}+ reviews</span>
                        </div>
                    </div>

                    <div className="testi-stats-divider" />

                    <div className="testi-stats-platforms">
                        <div className="testi-platform-pill">
                            <div className="testi-platform-dot" style={{ background: '#14a800' }} />
                            Upwork
                        </div>
                        <div className="testi-platform-pill">
                            <div className="testi-platform-dot" style={{ background: '#1dbf73' }} />
                            Fiverr
                        </div>
                        <div className="testi-platform-pill">
                            <div className="testi-platform-dot" style={{ background: '#f97316' }} />
                            Direct
                        </div>
                    </div>
                </div>

                {/* Grid Wrapper */}
                <div className="testi-grid-wrapper">
                    {testimonials.length > 1 && (
                        <>
                            <button className="testi-nav-btn testi-nav-prev" onClick={() => scrollTo(Math.max(0, currentIndex - 1))}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button className="testi-nav-btn testi-nav-next" onClick={() => scrollTo(Math.min(testimonials.length - 1, currentIndex + 1))}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </>
                    )}

                    <div className="testi-grid" ref={trackRef}>
                        {loading ? (
                            <>
                                <div className="testi-skeleton" />
                                <div className="testi-skeleton" />
                                <div className="testi-skeleton" />
                            </>
                        ) : (
                            testimonials.map((testi) => {
                                const colors = getAvatarColors(testi.name);
                                return (
                                    <div key={testi._id} className={`testi-card ${testi.featured ? 'featured' : ''}`}>
                                        {testi.featured && <div className="testi-featured-badge">Top Review</div>}
                                        <div className="testi-quote-mark">“</div>
                                        <p className="testi-text">{testi.text}</p>
                                        <div className="testi-card-stars">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <svg key={star} viewBox="0 0 20 20" fill={star <= testi.rating ? "currentColor" : "#e5e7eb"}>
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <div className="testi-footer">
                                            <div className="testi-avatar" style={{ backgroundColor: colors.bg, color: colors.color }}>
                                                {testi.avatarInitials}
                                            </div>
                                            <div className="testi-meta">
                                                <div className="testi-name">{testi.name}</div>
                                                <div className="testi-role">{testi.role}</div>
                                            </div>
                                            <div className="testi-platform-badge">{testi.platform}</div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Pagination Dots (Mobile) */}
                {!loading && testimonials.length > 1 && (
                    <div className="testi-pagination">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                className={`testi-dot ${i === currentIndex ? 'active' : ''}`}
                                onClick={() => scrollTo(i)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
