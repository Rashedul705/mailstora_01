'use client';
// Create (/admin/case-studies/new) or edit a case study. Case studies are separate from portfolio projects;
// "Linked project" only adds a link between the two pages.
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CaseStudyEditor, { type CaseStudy } from '../CaseStudyEditor';
import { generateSlug } from '../../../../utils/slugify';
import '../../portfolio/components/PortfolioEditor.css';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const EMPTY = {
    title: '', slug: '', clientName: '', industry: '', type: 'Email Campaign', esp: 'Klaviyo', year: String(new Date().getFullYear()),
    coverImage: '', portfolioSlug: '', whatWasIncluded: '', compatibility: [] as string[], tags: [] as string[],
    status: 'draft', sortOrder: 0,
    headline: '', seoTitle: '', seoDescription: '', summary: '', challenge: '', solution: '', approach: '', results: '',
    duration: '', testimonialQuote: '', testimonialAuthor: '', testimonialRole: '',
};
type Form = typeof EMPTY;

export default function CaseStudyEdit({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const isNew = id === 'new';
    const router = useRouter();
    const [f, setF] = useState<Form>(EMPTY);
    const [projects, setProjects] = useState<{ slug: string; title: string; clientName: string }[]>([]);
    const [saving, setSaving] = useState(false);
    const [slugTouched, setSlugTouched] = useState(!isNew);

    useEffect(() => {
        fetch(`${API}/api/admin/portfolio`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : [])).then(setProjects).catch(() => {});
        if (!isNew) {
            fetch(`${API}/api/admin/case-studies/${id}`, { credentials: 'include' })
                .then((r) => r.json())
                .then((d) => setF({ ...EMPTY, ...d }));
        }
    }, [id, isNew]);

    const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

    // Copy client, platform, cover and details from the linked portfolio project
    const linkProject = async (slug: string) => {
        set('portfolioSlug', slug);
        if (!slug) return;
        const p = await fetch(`${API}/api/portfolio/${slug}`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
        if (!p) return;
        setF((prev) => ({
            ...prev,
            clientName: prev.clientName || p.clientName || '',
            industry: prev.industry || p.industry || '',
            esp: prev.esp || p.esp || '',
            year: prev.year || p.year || '',
            coverImage: prev.coverImage || p.coverImage || '',
            whatWasIncluded: prev.whatWasIncluded || p.whatWasIncluded || '',
            compatibility: prev.compatibility.length ? prev.compatibility : p.compatibility || [],
        }));
    };

    const upload = async (file: File) => {
        const body = new FormData();
        body.append('image', file);
        const res = await fetch(`${API}/api/admin/portfolio/upload-image`, { method: 'POST', body, credentials: 'include' });
        const d = await res.json();
        if (d.url) set('coverImage', d.url);
        else alert('Upload failed');
    };

    const save = async (status: 'draft' | 'published') => {
        if (!f.title || !f.slug || !f.clientName) return alert('Title, slug and client are required.');
        setSaving(true);
        const res = await fetch(`${API}/api/admin/case-studies${isNew ? '' : `/${id}`}`, {
            method: isNew ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ...f, status }),
        });
        setSaving(false);
        if (res.ok) router.push('/admin/case-studies');
        else {
            const e = await res.json().catch(() => null);
            alert(`Failed to save: ${e?.error || e?.message || res.statusText}`);
        }
    };

    const story: CaseStudy = {
        enabled: true, headline: f.headline, seoTitle: f.seoTitle, seoDescription: f.seoDescription, summary: f.summary,
        challenge: f.challenge, solution: f.solution, approach: f.approach, results: f.results, duration: f.duration,
        testimonialQuote: f.testimonialQuote, testimonialAuthor: f.testimonialAuthor, testimonialRole: f.testimonialRole,
    };

    return (
        <div className="portfolio-editor">
            <div className="editor-topbar">
                <div className="topbar-left">
                    <Link href="/admin/case-studies" className="btn-back">← Back</Link>
                    <h1 className="editor-title">{isNew ? 'Add Case Study' : 'Edit Case Study'}</h1>
                    <span className="status-pill">{f.status}</span>
                </div>
                <div className="topbar-right">
                    <button className="btn-save-draft" onClick={() => save('draft')} disabled={saving}>Save Draft</button>
                    <button className="btn-publish" onClick={() => save('published')} disabled={saving}>Publish →</button>
                </div>
            </div>

            <div className="editor-layout">
                <div className="editor-main">
                    <section className="ed-section">
                        <h2>📝 BASIC INFORMATION</h2>
                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Title *</label>
                                <input type="text" value={f.title} placeholder="e.g. Canadian Choice campaign email"
                                    onChange={(e) => { set('title', e.target.value); if (!slugTouched) set('slug', generateSlug(e.target.value)); }} />
                            </div>
                            <div className="form-group">
                                <label>URL slug *</label>
                                <input type="text" value={f.slug} onChange={(e) => { setSlugTouched(true); set('slug', generateSlug(e.target.value)); }} />
                            </div>
                            <div className="form-group">
                                <label>Client name *</label>
                                <input type="text" value={f.clientName} onChange={(e) => set('clientName', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Linked portfolio project <small>(optional)</small></label>
                                <select value={f.portfolioSlug} onChange={(e) => linkProject(e.target.value)}>
                                    <option value="">None</option>
                                    {projects.map((p) => <option key={p.slug} value={p.slug}>{p.title} ({p.clientName})</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <input type="text" value={f.type} onChange={(e) => set('type', e.target.value)} placeholder="Email Campaign, Klaviyo Flow, Signature…" />
                            </div>
                            <div className="form-group">
                                <label>Platform</label>
                                <input type="text" value={f.esp} onChange={(e) => set('esp', e.target.value)} placeholder="Klaviyo, Mailchimp, HubSpot…" />
                            </div>
                            <div className="form-group">
                                <label>Industry</label>
                                <input type="text" value={f.industry} onChange={(e) => set('industry', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Year</label>
                                <input type="text" value={f.year} onChange={(e) => set('year', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Sort order <small>(lower shows first)</small></label>
                                <input type="number" value={f.sortOrder} onChange={(e) => set('sortOrder', Number(e.target.value))} />
                            </div>
                            <div className="form-group">
                                <label>Tested in <small>(comma separated)</small></label>
                                <input type="text" value={f.compatibility.join(', ')} onChange={(e) => set('compatibility', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} />
                            </div>
                        </div>
                        <div className="form-group mt-1">
                            <label>What was delivered (one per line)</label>
                            <textarea rows={4} value={f.whatWasIncluded} onChange={(e) => set('whatWasIncluded', e.target.value)} />
                        </div>
                    </section>

                    <section className="ed-section">
                        <h2>🖼 COVER IMAGE</h2>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input type="text" value={f.coverImage} onChange={(e) => set('coverImage', e.target.value)} placeholder="/images/... or https://..." />
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
                        {f.coverImage && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={f.coverImage} alt="Cover preview" style={{ marginTop: 12, maxWidth: 320, borderRadius: 12, border: '1px solid #e2e8f0' }} />
                        )}
                    </section>

                    <CaseStudyEditor
                        value={story}
                        onChange={(next) => { const { enabled, ...rest } = next; void enabled; setF((p) => ({ ...p, ...rest })); }}
                        slug={f.slug}
                        title={f.title}
                        client={f.clientName}
                        cover={f.coverImage}
                    />
                </div>
            </div>
        </div>
    );
}
