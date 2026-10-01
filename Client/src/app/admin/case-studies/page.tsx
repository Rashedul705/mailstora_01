'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './admin-cs.css';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

type Row = { _id: string; title: string; slug: string; clientName: string; status: string; portfolioSlug?: string; headline?: string; updatedAt?: string };

export default function AdminCaseStudies() {
    const [rows, setRows] = useState<Row[]>([]);
    const [q, setQ] = useState('');
    const [status, setStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        const params = new URLSearchParams({ status, ...(q ? { q } : {}) });
        try {
            const res = await fetch(`${API}/api/admin/case-studies?${params}`, { credentials: 'include' });
            if (res.ok) setRows(await res.json());
        } catch {}
        setLoading(false);
    };

    useEffect(() => {
        const t = setTimeout(load, 300);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q, status]);

    const remove = async (id: string) => {
        if (!confirm('Delete this case study? This cannot be undone.')) return;
        const res = await fetch(`${API}/api/admin/case-studies/${id}`, { method: 'DELETE', credentials: 'include' });
        if (res.ok) setRows((r) => r.filter((x) => x._id !== id));
    };

    const published = rows.filter((r) => r.status === 'published').length;

    return (
        <div className="acs">
            <div className="acs-head">
                <div>
                    <h1>Case Studies</h1>
                    <p>Stories about client results, shown at /case-studies/. Separate from portfolio projects.</p>
                </div>
                <Link href="/admin/case-studies/new" className="acs-btn">+ Add Case Study</Link>
            </div>

            <div className="acs-stats">
                <div className="acs-stat"><span>Total</span><strong>{rows.length}</strong></div>
                <div className="acs-stat"><span>Published</span><strong>{published}</strong></div>
                <div className="acs-stat"><span>Drafts</span><strong>{rows.length - published}</strong></div>
            </div>

            <div className="acs-filters">
                <input type="text" placeholder="Search by title or client" value={q} onChange={(e) => setQ(e.target.value)} />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            </div>

            <table className="acs-table">
                <thead>
                    <tr><th>Case study</th><th>Client</th><th>Linked project</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {loading && <tr><td colSpan={5}>Loading…</td></tr>}
                    {!loading && rows.length === 0 && <tr><td colSpan={5}>No case studies yet. <Link href="/admin/case-studies/new">Add the first one</Link>.</td></tr>}
                    {rows.map((r) => (
                        <tr key={r._id}>
                            <td><strong>{r.headline || r.title}</strong><br /><small>/case-studies/{r.slug}/</small></td>
                            <td>{r.clientName}</td>
                            <td>{r.portfolioSlug ? <a href={`/portfolio/${r.portfolioSlug}/`} target="_blank" rel="noreferrer">{r.portfolioSlug}</a> : <small>None</small>}</td>
                            <td><span className={`acs-badge acs-badge--${r.status}`}>{r.status}</span></td>
                            <td>
                                <Link href={`/admin/case-studies/${r._id}`}>Edit</Link>
                                {r.status === 'published' && <> · <a href={`/case-studies/${r.slug}/`} target="_blank" rel="noreferrer">View</a></>}
                                {' · '}<button type="button" className="acs-del" onClick={() => remove(r._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
