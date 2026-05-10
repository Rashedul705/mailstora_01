"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './PricingAdmin.css';

export default function PricingAdminClient() {
    const [packages, setPackages] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>({});
    const [activeTab, setActiveTab] = useState<'template' | 'signature'>('template');
    
    const [editingPkg, setEditingPkg] = useState<any>(null);
    const [isReordering, setIsReordering] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetch('/api/admin/pricing');
        const data = await res.json();
        setPackages(data.packages || []);
        setSettings(data.settings || {});
    };

    const updateSettings = async (newSettings: any) => {
        const merged = { ...settings, ...newSettings };
        setSettings(merged);
        await fetch('/api/admin/pricing/settings/update', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSettings)
        });
    };

    const handleSavePackage = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const method = editingPkg._id ? 'PUT' : 'POST';
        const url = editingPkg._id ? `/api/admin/pricing/${editingPkg._id}` : '/api/admin/pricing';
        
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingPkg)
        });

        if (res.ok) {
            setEditingPkg(null);
            fetchData();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this package? This cannot be undone.")) {
            await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    const handleToggleVisibility = async (id: string) => {
        await fetch(`/api/admin/pricing/${id}/toggle`, { method: 'PATCH' });
        fetchData();
    };

    const handleAddFeature = () => {
        setEditingPkg({
            ...editingPkg,
            features: [...(editingPkg.features || []), { text: '', included: true, order: (editingPkg.features?.length || 0) + 1 }]
        });
    };

    const handleFeatureChange = (index: number, field: string, value: any) => {
        const newFeatures = [...editingPkg.features];
        newFeatures[index][field] = value;
        setEditingPkg({ ...editingPkg, features: newFeatures });
    };

    const handleRemoveFeature = (index: number) => {
        const newFeatures = [...editingPkg.features];
        newFeatures.splice(index, 1);
        setEditingPkg({ ...editingPkg, features: newFeatures });
    };

    // Reorder simple logic
    const movePackage = async (index: number, direction: number) => {
        const currentList = packages.filter(p => p.serviceType === activeTab);
        if (index + direction < 0 || index + direction >= currentList.length) return;
        
        const newList = [...currentList];
        const temp = newList[index];
        newList[index] = newList[index + direction];
        newList[index + direction] = temp;
        
        // Optimistic UI update
        const otherPackages = packages.filter(p => p.serviceType !== activeTab);
        setPackages([...otherPackages, ...newList]);
        
        // Save order
        const orderedIds = newList.map(p => p._id);
        await fetch('/api/admin/pricing/reorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderedIds })
        });
        fetchData();
    };

    const currentPackages = packages.filter(p => p.serviceType === activeTab).sort((a,b) => a.sortOrder - b.sortOrder);

    return (
        <div className="admin-pricing-page">
            <div className="admin-header">
                <div>
                    <h1>Pricing Management</h1>
                    <p>Edit packages — changes reflect live on the site instantly</p>
                </div>
                <div className="admin-actions">
                    <Link href="/#prices" target="_blank" className="btn-ghost">Preview Live →</Link>
                    <button 
                        className="btn-orange" 
                        onClick={() => setEditingPkg({
                            serviceType: activeTab,
                            name: '',
                            price: '',
                            priceUnit: '/project',
                            features: [],
                            ctaText: 'Get Started →',
                            ctaStyle: 'primary',
                            isVisible: true,
                            isPopular: false
                        })}
                    >
                        + Add Package
                    </button>
                </div>
            </div>

            <div className="settings-row card">
                <div className="setting-item">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={settings.showTemplateTab !== false} 
                            onChange={(e) => updateSettings({ showTemplateTab: e.target.checked })}
                        />
                        Show Email Templates tab
                    </label>
                </div>
                <div className="setting-item">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={settings.showSignatureTab !== false} 
                            onChange={(e) => updateSettings({ showSignatureTab: e.target.checked })}
                        />
                        Show Email Signatures tab
                    </label>
                </div>
                <div className="setting-item flex-item">
                    <label>Currency:</label>
                    <select 
                        value={settings.currency || 'USD'} 
                        onChange={(e) => updateSettings({ currency: e.target.value })}
                    >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                    </select>
                </div>
            </div>

            <div className="service-tabs">
                <button 
                    className={activeTab === 'template' ? 'active' : ''} 
                    onClick={() => setActiveTab('template')}
                >
                    📧 Email Template Packages
                </button>
                <button 
                    className={activeTab === 'signature' ? 'active' : ''} 
                    onClick={() => setActiveTab('signature')}
                >
                    ✍ Email Signature Packages
                </button>
                
                <button 
                    className={`reorder-toggle ${isReordering ? 'active' : ''}`} 
                    onClick={() => setIsReordering(!isReordering)}
                >
                    {isReordering ? 'Done Reordering' : '🔄 Reorder'}
                </button>
            </div>

            {editingPkg && editingPkg.serviceType === activeTab && (
                <div className="edit-form-card">
                    <h3>{editingPkg._id ? 'Edit Package' : 'Add New Package'}</h3>
                    <form onSubmit={handleSavePackage}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Package Name *</label>
                                <input required type="text" value={editingPkg.name || ''} onChange={e => setEditingPkg({...editingPkg, name: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Subtitle / Label</label>
                                <input type="text" value={editingPkg.label || ''} onChange={e => setEditingPkg({...editingPkg, label: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Price * (Number or "Custom")</label>
                                <input required type="text" value={editingPkg.price || ''} onChange={e => setEditingPkg({...editingPkg, price: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Price Unit</label>
                                <input type="text" value={editingPkg.priceUnit || ''} onChange={e => setEditingPkg({...editingPkg, priceUnit: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Badge Text</label>
                                <input type="text" placeholder="e.g. Most Popular" value={editingPkg.badgeText || ''} onChange={e => setEditingPkg({...editingPkg, badgeText: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Icon Emoji</label>
                                <input type="text" value={editingPkg.icon || ''} onChange={e => setEditingPkg({...editingPkg, icon: e.target.value})} />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Short Description</label>
                            <textarea value={editingPkg.description || ''} onChange={e => setEditingPkg({...editingPkg, description: e.target.value})} rows={2}></textarea>
                        </div>

                        <div className="features-editor">
                            <div className="features-header">
                                <h4>Features</h4>
                                <button type="button" onClick={handleAddFeature} className="btn-small-outline">+ Add Feature</button>
                            </div>
                            
                            <div className="features-list">
                                {(editingPkg.features || []).map((feat: any, idx: number) => (
                                    <div key={idx} className="feature-row">
                                        <span className="drag-handle">⠿</span>
                                        <input 
                                            type="text" 
                                            value={feat.text} 
                                            onChange={e => handleFeatureChange(idx, 'text', e.target.value)} 
                                            placeholder="Feature text"
                                            className="feature-text-input"
                                        />
                                        <label className="feature-checkbox">
                                            <input 
                                                type="checkbox" 
                                                checked={feat.included} 
                                                onChange={e => handleFeatureChange(idx, 'included', e.target.checked)} 
                                            />
                                            Included
                                        </label>
                                        <button type="button" onClick={() => handleRemoveFeature(idx)} className="btn-remove">✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>CTA Button Text</label>
                                <input type="text" value={editingPkg.ctaText || ''} onChange={e => setEditingPkg({...editingPkg, ctaText: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>CTA Button Style</label>
                                <select value={editingPkg.ctaStyle || 'primary'} onChange={e => setEditingPkg({...editingPkg, ctaStyle: e.target.value})}>
                                    <option value="primary">Orange Primary</option>
                                    <option value="outline">Outline Orange</option>
                                    <option value="custom">Navy Dark</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Highlight as Popular</label>
                                <select value={editingPkg.isPopular ? 'yes' : 'no'} onChange={e => setEditingPkg({...editingPkg, isPopular: e.target.value === 'yes'})}>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select value={editingPkg.isVisible ? 'published' : 'draft'} onChange={e => setEditingPkg({...editingPkg, isVisible: e.target.value === 'published'})}>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft (Hidden)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={() => setEditingPkg(null)} className="btn-cancel">Cancel</button>
                            <button type="submit" className="btn-save">Save & Publish →</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="packages-grid">
                {currentPackages.map((pkg, idx) => (
                    <div key={pkg._id} className={`admin-package-card ${pkg.isPopular ? 'popular' : ''}`}>
                        {isReordering && (
                            <div className="reorder-controls">
                                <button type="button" onClick={() => movePackage(idx, -1)} disabled={idx === 0}>▲</button>
                                <button type="button" onClick={() => movePackage(idx, 1)} disabled={idx === currentPackages.length - 1}>▼</button>
                            </div>
                        )}
                        <div className="card-header">
                            <div className="title-row">
                                <span className="icon">{pkg.icon}</span>
                                <h4>{pkg.name}</h4>
                            </div>
                            {pkg.badgeText && <span className="badge">{pkg.badgeText}</span>}
                        </div>
                        
                        <div className="price-row">
                            <span className="price">{pkg.price === 'Custom' ? 'Custom' : `$${pkg.price}`}</span>
                            <span className="unit">{pkg.priceUnit}</span>
                        </div>

                        <div className="status-indicator">
                            <span className={`dot ${pkg.isVisible ? 'green' : 'gray'}`}></span>
                            {pkg.isVisible ? 'Published' : 'Draft'}
                        </div>

                        <p className="desc">{pkg.description}</p>
                        
                        <ul className="mini-features">
                            {pkg.features?.slice(0,4).map((f:any, i:number) => (
                                <li key={i} className={f.included ? 'inc' : 'exc'}>
                                    {f.included ? '✓' : '—'} {f.text}
                                </li>
                            ))}
                            {pkg.features?.length > 4 && <li>+ {pkg.features.length - 4} more</li>}
                        </ul>

                        {!isReordering && (
                            <div className="card-actions">
                                <button onClick={() => setEditingPkg(pkg)} className="btn-edit">Edit</button>
                                <button onClick={() => handleToggleVisibility(pkg._id)} className="btn-toggle">
                                    {pkg.isVisible ? 'Hide' : 'Show'}
                                </button>
                                <button onClick={() => handleDelete(pkg._id)} className="btn-delete">Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
