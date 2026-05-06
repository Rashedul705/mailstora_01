'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TipTapEditor from './TipTapEditor';

export default function PostEditor({ initialData = null }: { initialData?: any }) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [status, setStatus] = useState(initialData?.status || 'draft');
    const [publishedAt, setPublishedAt] = useState(initialData?.publishedAt ? new Date(initialData.publishedAt).toISOString().slice(0, 16) : '');
    const [authorName, setAuthorName] = useState(initialData?.author?.name || 'Rashedul Islam');
    const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
    const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
    const [category, setCategory] = useState(initialData?.category || 'Email Marketing');
    const [tags, setTags] = useState<string[]>(initialData?.tags || []);
    const [tagInput, setTagInput] = useState('');
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const categories = ["Email Marketing", "Digital Marketing", "Business Growth", "Tutorial", "Case Study"];

    useEffect(() => {
        if (!initialData && title && !slug) {
            const generatedSlug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
            setSlug(generatedSlug);
        }
    }, [title, initialData, slug]);

    const handleSave = async (forceStatus?: string) => {
        setIsSaving(true);
        const saveStatus = forceStatus || status;
        setStatus(saveStatus);

        const postData = {
            title,
            slug,
            excerpt,
            content,
            status: saveStatus,
            publishedAt: saveStatus === 'published' || saveStatus === 'scheduled' ? new Date(publishedAt || Date.now()) : undefined,
            author: { name: authorName },
            metaTitle,
            metaDescription,
            category,
            tags,
            coverImage
        };

        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const url = initialData ? `${API_BASE}/api/admin/blog/${initialData._id}` : `${API_BASE}/api/admin/blog`;
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
                credentials: 'omit'
            });

            if (res.ok) {
                const savedPost = await res.json();
                setLastSaved(new Date());
                if (!initialData) {
                    router.push(`/admin/blog/${savedPost._id}/edit`);
                }
            } else {
                const err = await res.json();
                alert(`Error saving post: ${err.error}`);
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save post.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_BASE}/api/admin/blog/upload-image`, {
                method: 'POST',
                body: formData,
                credentials: 'omit'
            });
            if (res.ok) {
                const data = await res.json();
                setCoverImage(data.url);
            } else {
                alert('Image upload failed. Ensure ImgBB key is set in .env');
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    // Calculate SEO Score
    let seoScore = 0;
    if (metaTitle.length >= 50 && metaTitle.length <= 60) seoScore += 20;
    if (metaDescription.length >= 140 && metaDescription.length <= 160) seoScore += 20;
    if (coverImage) seoScore += 20;
    if (wordCount >= 300) seoScore += 20;
    if (slug && !/[^a-z0-9-]/.test(slug)) seoScore += 20;

    return (
        <div style={{ display: 'flex', gap: '2rem', height: '100%', alignItems: 'flex-start' }}>
            {/* Editor Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link href="/admin/blog" className="admin-btn" style={{ background: '#E2E8F0', padding: '0.5rem 1rem' }}>← All Posts</Link>
                        <span style={{ color: '#64748B' }}>Blog / {initialData ? 'Edit Post' : 'New Post'}</span>
                        <span className={`badge ${status === 'published' ? 'badge-completed' : status === 'scheduled' ? 'badge-progress' : 'badge-pending'}`}>{status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => handleSave('draft')} disabled={isSaving} className="admin-btn" style={{ background: '#E2E8F0' }}>
                            {isSaving ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button onClick={() => handleSave('published')} disabled={isSaving} className="admin-btn admin-btn-primary">
                            Publish →
                        </button>
                    </div>
                </div>

                <div className="admin-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '80vh' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                        <span style={{ color: '#64748B', marginRight: '0.5rem' }}>URL</span>
                        <span style={{ fontFamily: 'monospace' }}>mailstora.com/blog/</span>
                        <input 
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: 'monospace', color: '#0F172A', flex: 1 }}
                        />
                    </div>

                    <textarea 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title..."
                        style={{ fontSize: '2rem', fontWeight: 800, border: 'none', outline: 'none', resize: 'none', width: '100%', color: '#0F172A' }}
                        rows={1}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                        }}
                    />

                    <textarea 
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Write a short excerpt..."
                        style={{ fontSize: '1.125rem', color: '#64748B', border: 'none', outline: 'none', resize: 'none', width: '100%' }}
                        rows={2}
                    />

                    <div style={{ height: '1px', background: '#E2E8F0', margin: '1rem 0' }}></div>

                    <TipTapEditor 
                        content={content} 
                        onChange={setContent} 
                        onWordCountChange={setWordCount}
                        onCharCountChange={setCharCount}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.875rem', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span>{wordCount} words</span>
                        <span>~{Math.ceil(wordCount / 200) || 1} min read</span>
                        <span>{charCount} characters</span>
                    </div>
                    {lastSaved && <span>✓ Saved {lastSaved.toLocaleTimeString()}</span>}
                </div>
            </div>

            {/* Settings Panel */}
            <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Status & Publish */}
                <div className="admin-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '1rem' }}>Post Settings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="scheduled">Scheduled</option>
                            </select>
                        </div>
                        {status === 'scheduled' && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Publish Date</label>
                                <input type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }} />
                            </div>
                        )}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Author</label>
                            <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }} />
                        </div>
                    </div>
                </div>

                {/* SEO Tab */}
                <div className="admin-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#64748B' }}>SEO</h3>
                        <span style={{ fontWeight: 800, color: seoScore >= 70 ? '#16A34A' : seoScore >= 40 ? '#CA8A04' : '#DC2626' }}>{seoScore}/100</span>
                    </div>
                    
                    <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px', marginBottom: '1.5rem' }}>
                        <div style={{ width: `${seoScore}%`, height: '100%', borderRadius: '2px', background: seoScore >= 70 ? '#16A34A' : seoScore >= 40 ? '#CA8A04' : '#DC2626', transition: 'width 0.3s' }}></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <label style={{ fontWeight: 600 }}>Meta Title</label>
                                <span style={{ color: metaTitle.length > 60 ? '#DC2626' : '#64748B' }}>{metaTitle.length}/60</span>
                            </div>
                            <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <label style={{ fontWeight: 600 }}>Meta Description</label>
                                <span style={{ color: metaDescription.length > 160 ? '#DC2626' : '#64748B' }}>{metaDescription.length}/160</span>
                            </div>
                            <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', resize: 'none' }} />
                        </div>
                    </div>
                </div>

                {/* Category & Tags */}
                <div className="admin-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '1rem' }}>Category & Tags</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600 }}>Tags</label>
                            <div style={{ border: '1px solid #E2E8F0', borderRadius: '0.5rem', padding: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {tags.map(tag => (
                                    <span key={tag} style={{ background: '#F1F5F9', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        {tag}
                                        <button onClick={() => removeTag(tag)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748B' }}>×</button>
                                    </span>
                                ))}
                                <input 
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder="Add tag..."
                                    style={{ border: 'none', outline: 'none', flex: 1, minWidth: '100px', fontSize: '0.875rem' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media */}
                <div className="admin-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '1rem' }}>Cover Image</h3>
                    {coverImage ? (
                        <div style={{ position: 'relative' }}>
                            <img src={coverImage} alt="Cover" style={{ width: '100%', borderRadius: '0.5rem', objectFit: 'cover' }} />
                            <button 
                                onClick={() => setCoverImage('')}
                                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', border: '2px dashed #CBD5E1', borderRadius: '0.5rem', cursor: 'pointer', color: '#64748B', fontSize: '0.875rem' }}>
                            <span>Click to upload image</span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                        </label>
                    )}
                </div>

            </div>
        </div>
    );
}
