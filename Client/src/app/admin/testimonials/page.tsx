'use client';

import { useEffect, useState, useRef } from 'react';
import './testimonials-admin.css';

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

const emptyForm: Partial<Testimonial> = {
    name: '',
    role: '',
    text: '',
    rating: 5,
    platform: 'direct',
    featured: false
};

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [stats, setStats] = useState<Stats>({ totalCount: 0, publishedCount: 0, pendingCount: 0, avgRating: 0 });
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<Partial<Testimonial>>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

    const fetchData = async () => {
        try {
            const res = await fetch(`${API}/api/testimonials`);
            const json = await res.json();
            setTestimonials(json.data || []);
            setStats(json.stats || { totalCount: 0, publishedCount: 0, pendingCount: 0, avgRating: 0 });
        } catch (err) {
            console.error('Error fetching testimonials:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleEdit = (t: Testimonial) => {
        setFormData({ ...t });
        setEditingId(t._id);
        scrollToForm();
    };

    const handleCancel = () => {
        setFormData(emptyForm);
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        await fetch(`${API}/api/testimonials/${id}`, { method: 'DELETE' });
        fetchData();
    };

    const handlePublish = async (id: string) => {
        await fetch(`${API}/api/testimonials/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'published' })
        });
        fetchData();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PATCH' : 'POST';
        const url = editingId ? `${API}/api/testimonials/${editingId}` : `${API}/api/testimonials`;
        
        // Auto publish if creating/editing from admin
        const payload = { ...formData, status: 'published' };

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        handleCancel();
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="admin-container">
            {/* Stats Row */}
            <div className="admin-testi-stats">
                <div className="admin-testi-stat-card">
                    <span className="admin-testi-stat-label">Total Reviews</span>
                    <span className="admin-testi-stat-value">{stats.totalCount}</span>
                </div>
                <div className="admin-testi-stat-card">
                    <span className="admin-testi-stat-label">Avg Rating</span>
                    <span className="admin-testi-stat-value highlight">{stats.avgRating.toFixed(1)}</span>
                </div>
                <div className="admin-testi-stat-card">
                    <span className="admin-testi-stat-label">Published</span>
                    <span className="admin-testi-stat-value">{stats.publishedCount}</span>
                </div>
                <div className="admin-testi-stat-card">
                    <span className="admin-testi-stat-label">Pending</span>
                    <span className="admin-testi-stat-value">{stats.pendingCount}</span>
                </div>
            </div>

            {/* Top Bar */}
            <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ color: '#2d287b', margin: 0 }}>Testimonials <span style={{ color: '#f97316' }}>({stats.totalCount})</span></h1>
                <button onClick={scrollToForm} className="admin-btn-save">Add Review</button>
            </div>

            {/* List */}
            <div className="admin-testi-list">
                {loading ? (
                    <><div className="admin-testi-row skeleton" /><div className="admin-testi-row skeleton" /></>
                ) : testimonials.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '12px', color: '#6b7280' }}>
                        No testimonials found.
                    </div>
                ) : testimonials.map(t => {
                    const colors = getAvatarColors(t.name);
                    return (
                        <div key={t._id} className="admin-testi-row">
                            <div className="admin-testi-avatar" style={{ background: colors.bg, color: colors.color }}>
                                {t.avatarInitials}
                            </div>
                            <div className="admin-testi-info">
                                <div className="admin-testi-name-wrap">
                                    <span className="admin-testi-name">{t.name}</span>
                                    <span className={`admin-testi-badge ${t.status}`}>{t.status}</span>
                                    {t.featured && <span className="admin-testi-badge featured">Featured</span>}
                                </div>
                                <span className="admin-testi-sub">{t.role} • {t.platform}</span>
                            </div>
                            <div className="admin-testi-preview">{t.text}</div>
                            <div className="admin-testi-stars">
                                {[1,2,3,4,5].map(s => (
                                    <svg key={s} viewBox="0 0 20 20" fill={s <= t.rating ? 'currentColor' : '#e5e7eb'}>
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="admin-testi-actions">
                                {t.status === 'pending' && (
                                    <button className="admin-action-btn publish" title="Publish" onClick={() => handlePublish(t._id)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </button>
                                )}
                                <button className="admin-action-btn edit" title="Edit" onClick={() => handleEdit(t)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </button>
                                <button className="admin-action-btn delete" title="Delete" onClick={() => handleDelete(t._id)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Form */}
            <div className="admin-testi-form-card" ref={formRef}>
                <h2 style={{ color: '#2d287b', marginBottom: '24px' }}>{editingId ? 'Edit Review' : 'Add New Review'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="admin-form-grid">
                        <div className="admin-form-group">
                            <label className="admin-form-label">Client Name</label>
                            <input required className="admin-form-input" placeholder="e.g. John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Role / Company</label>
                            <input className="admin-form-input" placeholder="e.g. Marketing Director, USA" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                        </div>
                        <div className="admin-form-group full">
                            <label className="admin-form-label">Review Text</label>
                            <textarea required className="admin-form-input" rows={4} placeholder="What did they say?" value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} />
                        </div>
                        
                        <div className="admin-form-group">
                            <label className="admin-form-label">Rating</label>
                            <div className="admin-star-picker">
                                {[1,2,3,4,5].map(star => (
                                    <svg key={star} onClick={() => setFormData({...formData, rating: star})} viewBox="0 0 20 20" fill={star <= (formData.rating || 5) ? '#f97316' : '#e5e7eb'}>
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">Platform</label>
                            <div className="admin-platform-picker">
                                {['upwork', 'fiverr', 'direct'].map(p => (
                                    <button 
                                        key={p} 
                                        type="button" 
                                        className={`admin-platform-btn ${formData.platform === p ? 'selected' : ''}`}
                                        onClick={() => setFormData({...formData, platform: p as any})}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="admin-form-group full">
                            <div className="admin-checkbox-group">
                                <input type="checkbox" id="featuredCheck" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                                <label htmlFor="featuredCheck">Mark as Featured (Appears first with TOP REVIEW badge)</label>
                            </div>
                        </div>
                    </div>

                    <div className="admin-form-actions">
                        <button type="button" className="admin-btn-cancel" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="admin-btn-save">Save & Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
