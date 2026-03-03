'use client';

import { useState, useEffect } from 'react';
import './portfolio.css';

interface PortfolioItem {
    id: number;
    title: string;
    type: string;
    image: string;
}

export default function PortfolioManagement() {
    const [items, setItems] = useState<PortfolioItem[]>([
        { id: 1, title: 'Corporate Newsletter', type: 'Email Template', image: '/mockup.png' },
        { id: 2, title: 'Tech Signature', type: 'Email Signature', image: '/mockup.png' },
        { id: 3, title: 'Retail Promo', type: 'Email Template', image: '/mockup.png' },
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<PortfolioItem>>({});
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('adminPortfolio');
        if (stored) {
            setItems(JSON.parse(stored));
        } else {
            localStorage.setItem('adminPortfolio', JSON.stringify(items));
        }
    }, []);

    const saveItems = (newItems: PortfolioItem[]) => {
        setItems(newItems);
        localStorage.setItem('adminPortfolio', JSON.stringify(newItems));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:5000/api/upload-imgbb', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            setCurrentItem(prev => ({ ...prev, image: data.imageUrl }));
        } catch (error) {
            alert('Error uploading image. Please try again.');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (item: PortfolioItem) => {
        setCurrentItem(item);
        setIsEditing(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            const updated = items.filter(item => item.id !== id);
            saveItems(updated);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentItem.id) {
            // Update
            const updated = items.map(item => item.id === currentItem.id ? (currentItem as PortfolioItem) : item);
            saveItems(updated);
        } else {
            // Add
            if (!currentItem.image) {
                alert('Please upload an image first');
                return;
            }
            const newItem = {
                ...currentItem,
                id: Date.now(),
            } as PortfolioItem;
            saveItems([...items, newItem]);
        }
        setIsEditing(false);
        setCurrentItem({});
    };

    return (
        <div className="portfolio-mgmt-page">
            <header className="admin-header">
                <h1 className="admin-title">Portfolio Management</h1>
                <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => { setCurrentItem({}); setIsEditing(true); }}
                >
                    + Add New Item
                </button>
            </header>

            {isEditing && (
                <div className="modal-overlay">
                    <div className="admin-card modal-card">
                        <h2>{currentItem.id ? 'Edit Portfolio Item' : 'Add New Item'}</h2>
                        <form onSubmit={handleSave} className="admin-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={currentItem.title || ''}
                                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                                    required
                                    placeholder="Enter project title"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={currentItem.type || 'Email Template'}
                                    onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                                >
                                    <option value="Email Template">Email Template</option>
                                    <option value="Email Signature">Email Signature</option>
                                    <option value="Case Study">Case Study</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Project Image</label>
                                <div className="file-upload-wrapper" onClick={() => document.getElementById('file-input')?.click()}>
                                    {isUploading ? (
                                        <div className="upload-status">Uploading...</div>
                                    ) : currentItem.image ? (
                                        <div className="upload-preview">
                                            <img src={currentItem.image} alt="Preview" />
                                            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--admin-primary)' }}>Click to change</p>
                                        </div>
                                    ) : (
                                        <div className="upload-placeholder">
                                            <p>Click to upload project screenshot</p>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>PNG, JPG up to 10MB</span>
                                        </div>
                                    )}
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="admin-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={isUploading}>
                                    {currentItem.id ? 'Save Changes' : 'Create Item'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="items-grid">
                {items.map((item) => (
                    <div key={item.id} className="admin-card item-card">
                        <div className="item-preview">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="item-info">
                            <div className="item-category">{item.type}</div>
                            <h3 className="item-title">{item.title}</h3>
                        </div>
                        <div className="item-actions">
                            <button className="admin-btn" onClick={() => handleEdit(item)}>Edit</button>
                            <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
