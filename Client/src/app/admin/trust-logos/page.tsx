'use client';

import { useState, useEffect, useRef } from 'react';
import './trust-logos.css';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

interface Logo {
    _id: string;
    name: string;
    url: string;
    logoUrl: string;
    active: boolean;
    order: number;
}

interface Settings {
    speed: 'Slow' | 'Normal' | 'Fast';
    showStats: boolean;
}

function initials(name: string) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function TrustLogosAdmin() {
    const [logos,       setLogos]       = useState<Logo[]>([]);
    const [settings,    setSettings]    = useState<Settings>({ speed: 'Normal', showStats: true });
    const [loading,     setLoading]     = useState(true);
    const [editId,      setEditId]      = useState<string | null>(null);
    const [editData,    setEditData]    = useState<Partial<Logo>>({});
    const [editFile,    setEditFile]    = useState<File | null>(null);
    const [saving,      setSaving]      = useState(false);
    const [deleting,    setDeleting]    = useState<string | null>(null);

    // Add form state
    const [form,        setForm]        = useState({ name: '', url: '' });
    const [formFile,    setFormFile]    = useState<File | null>(null);
    const [formPreview, setFormPreview] = useState<string>('');
    const [formSaving,  setFormSaving]  = useState(false);
    const [showForm,    setShowForm]    = useState(true);

    const editFileRef = useRef<HTMLInputElement>(null);
    const formFileRef = useRef<HTMLInputElement>(null);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [lr, sr] = await Promise.all([
                fetch(`${API}/api/trust-logos?all=1`, { credentials: 'include' }),
                fetch(`${API}/api/trust-logos/settings`, { credentials: 'include' }),
            ]);
            if (lr.ok) setLogos(await lr.json());
            if (sr.ok) setSettings(await sr.json());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, []);

    // ── Settings handlers ──────────────────────────────────────
    const patchSettings = async (patch: Partial<Settings>) => {
        const next = { ...settings, ...patch };
        setSettings(next);
        await fetch(`${API}/api/trust-logos/settings`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(next),
        });
    };

    // ── Toggle active ──────────────────────────────────────────
    const toggleActive = async (logo: Logo) => {
        const fd = new FormData();
        fd.append('active', String(!logo.active));
        const res = await fetch(`${API}/api/trust-logos/${logo._id}`, {
            method: 'PATCH', credentials: 'include', body: fd,
        });
        if (res.ok) fetchAll();
    };

    // ── Delete ─────────────────────────────────────────────────
    const handleDelete = async (id: string) => {
        if (!confirm('Delete this logo?')) return;
        setDeleting(id);
        await fetch(`${API}/api/trust-logos/${id}`, { method: 'DELETE', credentials: 'include' });
        setDeleting(null);
        fetchAll();
    };

    // ── Edit ───────────────────────────────────────────────────
    const startEdit = (logo: Logo) => {
        setEditId(logo._id);
        setEditData({ name: logo.name, url: logo.url, logoUrl: logo.logoUrl });
        setEditFile(null);
    };

    const saveEdit = async () => {
        if (!editId) return;
        setSaving(true);
        const fd = new FormData();
        fd.append('name', editData.name || '');
        fd.append('url',  editData.url  || '');
        if (editFile) fd.append('logo', editFile);
        else fd.append('logoUrl', editData.logoUrl || '');
        const res = await fetch(`${API}/api/trust-logos/${editId}`, {
            method: 'PATCH', credentials: 'include', body: fd,
        });
        setSaving(false);
        if (res.ok) { setEditId(null); fetchAll(); }
    };

    // ── Add form ───────────────────────────────────────────────
    const handleFormFile = (file: File) => {
        setFormFile(file);
        setFormPreview(URL.createObjectURL(file));
    };

    const handleAdd = async () => {
        if (!form.name.trim()) return;
        setFormSaving(true);
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('url',  form.url);
        if (formFile) fd.append('logo', formFile);
        const res = await fetch(`${API}/api/trust-logos`, {
            method: 'POST', credentials: 'include', body: fd,
        });
        setFormSaving(false);
        if (res.ok) {
            setForm({ name: '', url: '' });
            setFormFile(null);
            setFormPreview('');
            if (formFileRef.current) formFileRef.current.value = '';
            fetchAll();
        }
    };

    const activeCount = logos.filter(l => l.active).length;

    return (
        <div className="tl-page">

            {/* ── Settings bar ── */}
            <div className="tl-settings-bar">
                <div className="tl-settings-left">
                    <span className="tl-settings-icon">↻</span>
                    <label className="tl-settings-label">Marquee speed</label>
                    <select
                        className="tl-settings-select"
                        value={settings.speed}
                        onChange={e => patchSettings({ speed: e.target.value as any })}
                    >
                        <option value="Slow">Slow</option>
                        <option value="Normal">Normal</option>
                        <option value="Fast">Fast</option>
                    </select>
                </div>
                <div className="tl-settings-right">
                    <label className="tl-settings-label">Show stats strip</label>
                    <button
                        className={`tl-toggle ${settings.showStats ? 'on' : ''}`}
                        onClick={() => patchSettings({ showStats: !settings.showStats })}
                        aria-label="Toggle stats strip"
                    >
                        <span className="tl-toggle-knob" />
                    </button>
                </div>
            </div>

            {/* ── Header row ── */}
            <div className="tl-header">
                <div className="tl-header-left">
                    <h1 className="tl-title">Trust Logos</h1>
                    <span className="tl-count-badge">{activeCount} logos</span>
                </div>
            </div>

            {/* ── Logo grid ── */}
            {loading ? (
                <div className="tl-loading">Loading…</div>
            ) : (
                <div className="tl-grid">
                    {logos.map(logo => (
                        <div key={logo._id}>
                            <div className={`tl-card ${editId === logo._id ? 'tl-card-editing' : ''}`}>
                                {/* Top row: thumb + info */}
                                <div className="tl-card-top">
                                    <div className="tl-thumb">
                                        {logo.logoUrl
                                            ? <img src={logo.logoUrl} alt={logo.name} />
                                            : <span>{initials(logo.name)}</span>
                                        }
                                    </div>
                                    <div className="tl-card-info">
                                        <span className="tl-card-name">{logo.name}</span>
                                        <span className="tl-card-url">{logo.url || '—'}</span>
                                    </div>
                                </div>

                                {/* Bottom row: status + actions */}
                                <div className="tl-card-bottom">
                                    <button
                                        className={`tl-status-badge ${logo.active ? 'active' : 'hidden'}`}
                                        onClick={() => toggleActive(logo)}
                                        title="Click to toggle"
                                    >
                                        {logo.active ? 'Active' : 'Hidden'}
                                    </button>
                                    <div className="tl-card-actions">
                                        <button
                                            className="tl-icon-btn edit"
                                            onClick={() => editId === logo._id ? setEditId(null) : startEdit(logo)}
                                            title="Edit"
                                        >✏️</button>
                                        <button
                                            className="tl-icon-btn delete"
                                            onClick={() => handleDelete(logo._id)}
                                            disabled={deleting === logo._id}
                                            title="Delete"
                                        >🗑️</button>
                                    </div>
                                </div>
                            </div>

                            {/* Inline edit form */}
                            {editId === logo._id && (
                                <div className="tl-inline-edit">
                                    <div className="tl-form-row">
                                        <div className="tl-form-group">
                                            <label>Company Name</label>
                                            <input
                                                value={editData.name || ''}
                                                onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                                                placeholder="e.g. HubSpot"
                                            />
                                        </div>
                                        <div className="tl-form-group">
                                            <label>Website URL</label>
                                            <input
                                                value={editData.url || ''}
                                                onChange={e => setEditData(d => ({ ...d, url: e.target.value }))}
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                    <div className="tl-form-group">
                                        <label>Replace Logo Image</label>
                                        {editData.logoUrl && !editFile && (
                                            <img src={editData.logoUrl} alt="" className="tl-edit-preview" />
                                        )}
                                        {editFile && (
                                            <img src={URL.createObjectURL(editFile)} alt="" className="tl-edit-preview" />
                                        )}
                                        <input
                                            ref={editFileRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setEditFile(e.target.files?.[0] || null)}
                                        />
                                    </div>
                                    <div className="tl-edit-actions">
                                        <button className="tl-btn-save" onClick={saveEdit} disabled={saving}>
                                            {saving ? 'Saving…' : '✓ Save Changes'}
                                        </button>
                                        <button className="tl-btn-cancel" onClick={() => setEditId(null)}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Add logo placeholder card */}
                    <div className="tl-add-placeholder" onClick={() => { setShowForm(true); document.getElementById('tl-add-form')?.scrollIntoView({ behavior: 'smooth' }); }}>
                        <span className="tl-add-plus">+</span>
                        <span>Add logo</span>
                    </div>
                </div>
            )}

            {/* ── Add New Logo Form ── */}
            <div className="tl-add-form" id="tl-add-form">
                <h2 className="tl-add-title"><span>+</span> Add New Logo</h2>

                <div className="tl-form-row">
                    <div className="tl-form-group">
                        <label>COMPANY NAME</label>
                        <input
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="e.g. HubSpot"
                        />
                    </div>
                    <div className="tl-form-group">
                        <label>WEBSITE URL</label>
                        <input
                            value={form.url}
                            onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div className="tl-form-group">
                    <label>LOGO IMAGE</label>
                    <div
                        className="tl-upload-box"
                        onClick={() => formFileRef.current?.click()}
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFormFile(f); }}
                    >
                        {formPreview ? (
                            <img src={formPreview} alt="Preview" className="tl-upload-preview" />
                        ) : (
                            <>
                                <span className="tl-upload-icon">↑</span>
                                <span>Click to upload (PNG, SVG, WebP)</span>
                            </>
                        )}
                        <input
                            ref={formFileRef}
                            type="file"
                            accept="image/png,image/svg+xml,image/webp,image/jpeg"
                            style={{ display: 'none' }}
                            onChange={e => { const f = e.target.files?.[0]; if (f) handleFormFile(f); }}
                        />
                    </div>
                </div>

                <div className="tl-form-footer">
                    <button className="tl-btn-ghost" onClick={() => { setForm({ name: '', url: '' }); setFormFile(null); setFormPreview(''); }}>
                        Cancel
                    </button>
                    <button className="tl-btn-primary" onClick={handleAdd} disabled={formSaving || !form.name.trim()}>
                        {formSaving ? 'Saving…' : '✓ Save Logo'}
                    </button>
                </div>
            </div>
        </div>
    );
}
