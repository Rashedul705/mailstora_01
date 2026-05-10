'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { generateSlug } from '../../../../utils/slugify';
import './PortfolioEditor.css';

const defaultAngles = [
    { label: 'Hero Section', device: 'desktop' },
    { label: 'Product Grid', device: 'desktop' },
    { label: 'CTA Section', device: 'desktop' },
    { label: 'Mobile Hero', device: 'mobile' },
    { label: 'Mobile Stack', device: 'mobile' },
    { label: 'Mobile CTA', device: 'mobile' }
];

const emailClients = ['Gmail', 'Outlook 365', 'Outlook 2019', 'Apple Mail', 'iOS Mail', 'Android Gmail', 'Yahoo Mail', 'Samsung Mail', 'Outlook 2016', 'Thunderbird'];

export default function PortfolioEditor({ initialData = null }: { initialData?: any }) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('settings');
    const [tagInput, setTagInput] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        clientName: '',
        type: 'Email Template',
        esp: 'Mailchimp',
        industry: '',
        year: new Date().getFullYear().toString(),
        shortDescription: '',
        fullDescription: '',
        whatWasIncluded: '',
        coverImage: '',
        cardBackground: 'navy',
        desktopImages: [] as string[],
        mobileImages: [] as string[],
        angleViews: defaultAngles.map(a => ({ ...a, imageUrl: '' })),
        compatibility: [] as string[],
        results: { openRate: '', clickRate: '', deliveryTime: '', customMetric: '' },
        tags: [] as string[],
        status: 'draft',
        featuredOnLanding: false,
        sortOrder: 1,
        metaTitle: '',
        metaDescription: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({
                ...prev,
                ...initialData,
                angleViews: initialData.angleViews?.length > 0 ? initialData.angleViews : prev.angleViews
            }));
        }
    }, [initialData]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
    };

    const handleImageUpload = async (file: File) => {
        const data = new FormData();
        data.append('image', file);
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}`;
        const res = await fetch(`${API_BASE}/api/admin/portfolio/upload-image`, {
            method: 'POST',
            body: data
        });
        const json = await res.json();
        return json.url;
    };

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const url = await handleImageUpload(e.target.files[0]);
        if (url) setFormData(prev => ({ ...prev, coverImage: url }));
    };

    const handleArrayUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'desktopImages' | 'mobileImages') => {
        if (!e.target.files) return;
        const newUrls: string[] = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const url = await handleImageUpload(e.target.files[i]);
            if (url) newUrls.push(url);
        }
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ...newUrls] }));
    };

    const handleAngleUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (!e.target.files?.[0]) return;
        const url = await handleImageUpload(e.target.files[0]);
        if (url) {
            const newAngles = [...formData.angleViews];
            newAngles[index].imageUrl = url;
            setFormData(prev => ({ ...prev, angleViews: newAngles }));
        }
    };

    const removeArrayImage = (field: 'desktopImages' | 'mobileImages', index: number) => {
        const arr = [...formData[field]];
        arr.splice(index, 1);
        setFormData(prev => ({ ...prev, [field]: arr }));
    };

    const toggleClient = (client: string) => {
        setFormData(prev => {
            const arr = [...prev.compatibility];
            if (arr.includes(client)) {
                return { ...prev, compatibility: arr.filter(c => c !== client) };
            } else {
                return { ...prev, compatibility: [...arr, client] };
            }
        });
    };

    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            }
            setTagInput('');
        }
    };

    const save = async (statusOverride?: string) => {
        setIsSaving(true);
        const payload = { ...formData };
        if (statusOverride) payload.status = statusOverride;

        const method = initialData ? 'PUT' : 'POST';
        const url = initialData ? `/api/admin/portfolio/${initialData._id}` : `/api/admin/portfolio`;
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}`;

        try {
            const res = await fetch(`${API_BASE}${url}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                router.push('/admin/portfolio');
            } else {
                alert('Failed to save');
            }
        } catch (error) {
            console.error(error);
        }
        setIsSaving(false);
    };

    return (
        <div className="portfolio-editor">
            <div className="editor-topbar">
                <div className="topbar-left">
                    <Link href="/admin/portfolio" className="btn-back">← Back</Link>
                    <h1 className="editor-title">{initialData ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h1>
                    <span className="status-pill">{formData.status}</span>
                </div>
                <div className="topbar-right">
                    <button className="btn-save-draft" onClick={() => save('draft')} disabled={isSaving}>Save Draft</button>
                    <button className="btn-publish" onClick={() => save('published')} disabled={isSaving}>Publish →</button>
                </div>
            </div>

            <div className="editor-layout">
                <div className="editor-main">
                    <section className="ed-section">
                        <h2>📝 BASIC INFORMATION</h2>
                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Project Title *</label>
                                <input type="text" value={formData.title} onChange={handleTitleChange} placeholder="e.g. Canadian Choice — Promo Email" />
                            </div>
                            <div className="form-group">
                                <label>Client Name *</label>
                                <input type="text" value={formData.clientName} onChange={e => setFormData(prev => ({...prev, clientName: e.target.value}))} placeholder="e.g. Canadian Choice" />
                            </div>
                            <div className="form-group">
                                <label>Type *</label>
                                <select value={formData.type} onChange={e => setFormData(prev => ({...prev, type: e.target.value}))}>
                                    <option>Email Template</option>
                                    <option>Email Signature</option>
                                    <option>Case Study</option>
                                    <option>PSD to HTML</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>ESP *</label>
                                <select value={formData.esp} onChange={e => setFormData(prev => ({...prev, esp: e.target.value}))}>
                                    <option>Mailchimp</option>
                                    <option>Klaviyo</option>
                                    <option>HubSpot</option>
                                    <option>Zoho</option>
                                    <option>ActiveCampaign</option>
                                    <option>SendGrid</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Industry</label>
                                <input type="text" value={formData.industry} onChange={e => setFormData(prev => ({...prev, industry: e.target.value}))} />
                            </div>
                            <div className="form-group">
                                <label>Year Completed</label>
                                <input type="text" value={formData.year} onChange={e => setFormData(prev => ({...prev, year: e.target.value}))} />
                            </div>
                        </div>
                        <div className="form-group mt-1">
                            <label>Short Description (1-2 lines for card)</label>
                            <textarea rows={2} value={formData.shortDescription} onChange={e => setFormData(prev => ({...prev, shortDescription: e.target.value}))}></textarea>
                        </div>
                        <div className="form-group mt-1">
                            <label>Full Project Description</label>
                            <textarea rows={4} value={formData.fullDescription} onChange={e => setFormData(prev => ({...prev, fullDescription: e.target.value}))}></textarea>
                        </div>
                        <div className="form-group mt-1">
                            <label>What Was Included (one per line)</label>
                            <textarea rows={4} value={formData.whatWasIncluded} onChange={e => setFormData(prev => ({...prev, whatWasIncluded: e.target.value}))}></textarea>
                        </div>
                    </section>

                    <section className="ed-section">
                        <h2>🖼 IMAGES & GALLERY</h2>
                        <div className="form-group">
                            <label>Cover Image (card preview) *</label>
                            <div className="upload-box dashed">
                                {formData.coverImage ? (
                                    <div className="uploaded-preview">
                                        <Image src={formData.coverImage} alt="Cover" width={200} height={100} style={{objectFit: 'cover'}} />
                                        <button onClick={() => setFormData(prev => ({...prev, coverImage: ''}))} className="btn-remove">×</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="upload-text">Click to upload cover image (1200x630px)</div>
                                        <input type="file" onChange={handleCoverUpload} accept="image/*" className="file-input-hidden" id="cover-upload" />
                                        <label htmlFor="cover-upload" className="btn-upload-orange">Upload Cover Image</label>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="upload-cols">
                            <div className="upload-col desk-col">
                                <div className="col-header">
                                    <h3>🖥 Desktop Views</h3>
                                    <p>Full width renders (600px+)</p>
                                </div>
                                <div className="upload-box desk-box">
                                    <input type="file" multiple onChange={(e) => handleArrayUpload(e, 'desktopImages')} accept="image/*" id="desk-upload" className="file-input-hidden" />
                                    <label htmlFor="desk-upload" className="btn-upload-orange">+ Add Desktop Images</label>
                                </div>
                                <div className="preview-grid">
                                    {formData.desktopImages.map((img, i) => (
                                        <div key={i} className="mini-preview desk-preview">
                                            <span className="lbl desk-lbl">DESK</span>
                                            <Image src={img} alt="" fill style={{objectFit: 'cover'}} />
                                            <button onClick={() => removeArrayImage('desktopImages', i)} className="btn-remove-mini">×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="upload-col mob-col">
                                <div className="col-header">
                                    <h3>📱 Mobile Views</h3>
                                    <p>Responsive renders (375px)</p>
                                </div>
                                <div className="upload-box mob-box">
                                    <input type="file" multiple onChange={(e) => handleArrayUpload(e, 'mobileImages')} accept="image/*" id="mob-upload" className="file-input-hidden" />
                                    <label htmlFor="mob-upload" className="btn-upload-orange">+ Add Mobile Images</label>
                                </div>
                                <div className="preview-grid">
                                    {formData.mobileImages.map((img, i) => (
                                        <div key={i} className="mini-preview mob-preview">
                                            <span className="lbl mob-lbl">MOB</span>
                                            <Image src={img} alt="" fill style={{objectFit: 'cover'}} />
                                            <button onClick={() => removeArrayImage('mobileImages', i)} className="btn-remove-mini">×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <h3 className="angles-title">Specific Angle Views</h3>
                        <div className="angles-grid">
                            {formData.angleViews.map((angle, i) => (
                                <div key={i} className="angle-slot">
                                    <div className="angle-header">
                                        <span>{angle.label}</span>
                                        <span className={`badge ${angle.device === 'desktop' ? 'badge-desk' : 'badge-mob'}`}>{angle.device}</span>
                                    </div>
                                    <div className="angle-upload-box">
                                        {angle.imageUrl ? (
                                            <div className="uploaded-angle">
                                                <Image src={angle.imageUrl} alt="" fill style={{objectFit: 'cover'}} />
                                                <button onClick={() => {
                                                    const newAngles = [...formData.angleViews];
                                                    newAngles[i].imageUrl = '';
                                                    setFormData(prev => ({ ...prev, angleViews: newAngles }));
                                                }} className="btn-remove">×</button>
                                            </div>
                                        ) : (
                                            <>
                                                <input type="file" onChange={(e) => handleAngleUpload(e, i)} accept="image/*" id={`angle-${i}`} className="file-input-hidden" />
                                                <label htmlFor={`angle-${i}`} className="angle-label-upload">+</label>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="ed-section">
                        <h2>✓ EMAIL CLIENT COMPATIBILITY</h2>
                        <div className="clients-grid">
                            {emailClients.map(client => (
                                <div 
                                    key={client} 
                                    className={`client-checkbox ${formData.compatibility.includes(client) ? 'active' : ''}`}
                                    onClick={() => toggleClient(client)}
                                >
                                    <input type="checkbox" checked={formData.compatibility.includes(client)} readOnly />
                                    <span>{client}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="ed-section">
                        <h2>📈 RESULTS (OPTIONAL)</h2>
                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Open Rate</label>
                                <input type="text" value={formData.results.openRate} onChange={e => setFormData(prev => ({...prev, results: {...prev.results, openRate: e.target.value}}))} placeholder="e.g. 42%" />
                            </div>
                            <div className="form-group">
                                <label>Click Rate</label>
                                <input type="text" value={formData.results.clickRate} onChange={e => setFormData(prev => ({...prev, results: {...prev.results, clickRate: e.target.value}}))} placeholder="e.g. 3x" />
                            </div>
                            <div className="form-group">
                                <label>Delivery Time</label>
                                <input type="text" value={formData.results.deliveryTime} onChange={e => setFormData(prev => ({...prev, results: {...prev.results, deliveryTime: e.target.value}}))} placeholder="e.g. 36 hours" />
                            </div>
                            <div className="form-group">
                                <label>Custom Metric</label>
                                <input type="text" value={formData.results.customMetric} onChange={e => setFormData(prev => ({...prev, results: {...prev.results, customMetric: e.target.value}}))} placeholder="e.g. +121% improvement" />
                            </div>
                        </div>
                    </section>

                    <section className="ed-section">
                        <h2>🏷 TAGS</h2>
                        <div className="form-group">
                            <input 
                                type="text" 
                                value={tagInput} 
                                onChange={e => setTagInput(e.target.value)} 
                                onKeyDown={addTag}
                                placeholder="Type a tag and press Enter..." 
                            />
                            <div className="tags-display mt-1">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="tag-pill">
                                        {tag}
                                        <button onClick={() => setFormData(prev => ({...prev, tags: prev.tags.filter(t => t !== tag)}))}>×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="editor-settings">
                    <div className="settings-tabs">
                        <button className={`st-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
                        <button className={`st-tab ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')}>SEO</button>
                    </div>

                    {activeTab === 'settings' && (
                        <div className="settings-panel">
                            <button className="btn-publish full" onClick={() => save('published')} disabled={isSaving}>Publish Portfolio Item →</button>
                            <button className="btn-save-draft full mt-1" onClick={() => save('draft')} disabled={isSaving}>Save as Draft</button>

                            <div className="form-group mt-2">
                                <label>Status</label>
                                <select value={formData.status} onChange={e => setFormData(prev => ({...prev, status: e.target.value}))}>
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <div className="form-group mt-1">
                                <label>Featured on Landing Page</label>
                                <select value={formData.featuredOnLanding ? 'yes' : 'no'} onChange={e => setFormData(prev => ({...prev, featuredOnLanding: e.target.value === 'yes'}))}>
                                    <option value="yes">Yes — show in grid</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="form-group mt-1">
                                <label>Sort Order (1 = first)</label>
                                <input type="number" value={formData.sortOrder} onChange={e => setFormData(prev => ({...prev, sortOrder: parseInt(e.target.value) || 0}))} />
                            </div>

                            <div className="form-group mt-2">
                                <label>Card Background Gradient</label>
                                <select value={formData.cardBackground} onChange={e => setFormData(prev => ({...prev, cardBackground: e.target.value}))}>
                                    <option value="navy">Navy Blue</option>
                                    <option value="dark-navy">Dark Navy</option>
                                    <option value="dark-green">Dark Green</option>
                                    <option value="dark-red">Dark Red</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === 'seo' && (
                        <div className="settings-panel">
                            <div className="form-group">
                                <label>URL Slug</label>
                                <input type="text" value={formData.slug} onChange={e => setFormData(prev => ({...prev, slug: e.target.value}))} />
                            </div>
                            <div className="form-group mt-1">
                                <label>Meta Title</label>
                                <input type="text" value={formData.metaTitle} onChange={e => setFormData(prev => ({...prev, metaTitle: e.target.value}))} />
                            </div>
                            <div className="form-group mt-1">
                                <label>Meta Description</label>
                                <textarea rows={4} value={formData.metaDescription} onChange={e => setFormData(prev => ({...prev, metaDescription: e.target.value}))}></textarea>
                                <div className="char-count">{formData.metaDescription.length}/160</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
