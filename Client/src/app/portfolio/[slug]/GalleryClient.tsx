'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";

export default function GalleryClient({ item }: { item: any }) {
    const [galleryTab, setGalleryTab] = useState('All');
    const [activeGalleryImage, setActiveGalleryImage] = useState<any>(null);

    const allGalleryItems: any[] = [];
    if (item.angleViews) {
        allGalleryItems.push(...item.angleViews.filter((a: any) => a.imageUrl && a.imageUrl.trim() !== ''));
    }
    if (item.desktopImages) {
        item.desktopImages.forEach((url: string, i: number) => {
            if (url && url.trim() !== '') {
                allGalleryItems.push({ label: `Desktop View ${i+1}`, device: 'desktop', imageUrl: url });
            }
        });
    }
    if (item.mobileImages) {
        item.mobileImages.forEach((url: string, i: number) => {
            if (url && url.trim() !== '') {
                allGalleryItems.push({ label: `Mobile View ${i+1}`, device: 'mobile', imageUrl: url });
            }
        });
    }

    useEffect(() => {
        if (allGalleryItems.length > 0 && !activeGalleryImage) {
            setActiveGalleryImage(allGalleryItems[0]);
        }
    }, [item]);

    const filteredGalleryItems = allGalleryItems.filter(img => {
        if (galleryTab === 'All') return true;
        if (galleryTab === 'Desktop' && img.device === 'desktop') return true;
        if (galleryTab === 'Mobile' && img.device === 'mobile') return true;
        if (galleryTab === 'Sections' && img.device !== 'desktop' && img.device !== 'mobile') return true;
        return false;
    });

    return (
        <section className="sp-gallery container">
            <div className="gallery-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <h2>🖼 Template Gallery</h2>
                </div>
                <div className="gallery-tabs">
                    {['All', 'Desktop', 'Mobile'].map(tab => (
                        <button 
                            key={tab} 
                            className={`g-tab-btn ${galleryTab === tab ? 'active' : ''}`}
                            onClick={() => setGalleryTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                    {item.fullTemplateFile && (
                        <button 
                            className={`g-tab-btn ${galleryTab === 'Full Template' ? 'active' : ''}`}
                            onClick={() => setGalleryTab('Full Template')}
                        >
                            Full Template
                        </button>
                    )}
                </div>
            </div>
            
            <div className="main-preview-box">
                {galleryTab === 'Full Template' ? (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                        <img 
                            src={item.fullTemplateFile} 
                            alt="Full Template" 
                            style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                ) : (
                    <>
                        {activeGalleryImage && activeGalleryImage.imageUrl ? (
                            <img 
                                src={activeGalleryImage.imageUrl} 
                                alt={activeGalleryImage.label} 
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        ) : (
                            <div className="placeholder-preview">No image selected</div>
                        )}
                        <div className="preview-overlay">
                            <div className="preview-label">{activeGalleryImage?.label || ''}</div>
                            <div className="preview-nav">
                                <button className="nav-arrow" onClick={() => {
                                    const idx = filteredGalleryItems.findIndex(i => i.imageUrl === activeGalleryImage.imageUrl);
                                    if(idx > 0) setActiveGalleryImage(filteredGalleryItems[idx - 1]);
                                }}>←</button>
                                <button className="nav-arrow" onClick={() => {
                                    const idx = filteredGalleryItems.findIndex(i => i.imageUrl === activeGalleryImage.imageUrl);
                                    if(idx < filteredGalleryItems.length - 1) setActiveGalleryImage(filteredGalleryItems[idx + 1]);
                                }}>→</button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {galleryTab !== 'Full Template' && (
                <div className="thumbnail-strip">
                {filteredGalleryItems.map((img, idx) => (
                    <div 
                        key={idx} 
                        className={`thumbnail ${activeGalleryImage?.imageUrl === img.imageUrl ? 'active' : ''}`}
                        onClick={() => setActiveGalleryImage(img)}
                    >
                        <div className="thumb-img-wrapper">
                            {img.imageUrl && (
                                <Image 
                                    src={img.imageUrl} 
                                    alt={img.label} 
                                    fill 
                                    sizes="120px"
                                    className="thumb-img" 
                                />
                            )}
                        </div>
                        <div className={`thumb-label ${img.device === 'mobile' ? 'mobile-lbl' : 'desktop-lbl'}`}>
                            {img.label}
                        </div>
                    </div>
                ))}
            </div>
            )}
        </section>
    );
}
