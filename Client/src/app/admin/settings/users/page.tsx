"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../../seo/seoApi";
import "../../seo/seo-admin.css";

type User = { _id: string; username: string; email: string; role?: string; createdAt?: string };
type Log = { _id: string; user: string; role: string; method: string; path: string; status: number; createdAt: string };

const ROLES: Record<string, string> = {
    admin: "Admin: everything, including users, leads and orders",
    editor: "Editor: blog, portfolio, reviews, FAQ, services, media and SEO",
    seo: "SEO: SEO screens and blog only",
};

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [logs, setLogs] = useState<Log[]>([]);
    const [form, setForm] = useState({ username: "", email: "", password: "", role: "editor" });
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

    const load = () => {
        adminFetch<User[]>("/users").then(setUsers).catch((e) => setMsg({ ok: false, text: e.message }));
        adminFetch<Log[]>("/activity?limit=300").then(setLogs).catch(() => {});
    };
    useEffect(load, []);

    const run = async (fn: () => Promise<unknown>, ok: string) => {
        try { await fn(); setMsg({ ok: true, text: ok }); load(); } catch (e) { setMsg({ ok: false, text: (e as Error).message }); }
    };

    return (
        <div className="seo-page">
            <header className="seo-head">
                <h1>Users, Roles & Activity</h1>
                <p>Give your team their own login with limited access, and see every change made in the admin.</p>
            </header>
            {msg && <p className={`seo-msg ${msg.ok ? "seo-msg--ok" : "seo-msg--err"}`}>{msg.text}</p>}

            <section className="seo-card">
                <h2>Users</h2>
                <table className="seo-table">
                    <thead><tr><th>Username</th><th>Email</th><th>Role</th><th></th></tr></thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>
                                    <select value={u.role || "admin"} onChange={(e) => run(() => adminFetch(`/users/${u._id}`, { method: "PATCH", body: JSON.stringify({ role: e.target.value }) }), "Role updated.")}>
                                        {Object.keys(ROLES).map((r) => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </td>
                                <td style={{ whiteSpace: "nowrap" }}>
                                    <button type="button" className="seo-btn seo-btn--ghost" onClick={() => {
                                        const p = prompt(`New password for ${u.username} (10+ characters)`);
                                        if (p) run(() => adminFetch(`/users/${u._id}`, { method: "PATCH", body: JSON.stringify({ password: p }) }), "Password changed.");
                                    }}>Reset password</button>{" "}
                                    <button type="button" className="seo-btn seo-btn--danger" onClick={() => confirm(`Delete ${u.username}?`) && run(() => adminFetch(`/users/${u._id}`, { method: "DELETE" }), "User deleted.")}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="seo-card">
                <h2>Add User</h2>
                <div className="seo-field"><label>Username</label><input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div>
                <div className="seo-field"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div className="seo-field"><label>Password (10+ characters)</label><input type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
                <div className="seo-field">
                    <label>Role</label>
                    <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                        {Object.entries(ROLES).map(([r, l]) => <option key={r} value={r}>{l}</option>)}
                    </select>
                </div>
                <button type="button" className="seo-btn" onClick={() => run(async () => { await adminFetch("/users", { method: "POST", body: JSON.stringify(form) }); setForm({ username: "", email: "", password: "", role: "editor" }); }, "User added.")}>Add User</button>
            </section>

            <section className="seo-card">
                <div className="seo-row" style={{ justifyContent: "space-between" }}>
                    <h2>Activity Log</h2>
                    <button type="button" className="seo-btn seo-btn--ghost" onClick={() => confirm("Clear the whole log?") && run(() => adminFetch("/activity", { method: "DELETE" }), "Log cleared.")}>Clear log</button>
                </div>
                {logs.length === 0 ? <p className="seo-empty">No changes recorded yet.</p> : (
                    <table className="seo-table">
                        <thead><tr><th>When</th><th>User</th><th>Action</th><th>Result</th></tr></thead>
                        <tbody>
                            {logs.map((l) => (
                                <tr key={l._id}>
                                    <td style={{ whiteSpace: "nowrap" }}>{new Date(l.createdAt).toLocaleString()}</td>
                                    <td>{l.user} <small>({l.role})</small></td>
                                    <td><strong>{l.method}</strong> <code>{l.path}</code></td>
                                    <td><span className={`seo-pill ${l.status < 400 ? "seo-pill--on" : "seo-pill--off"}`}>{l.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}
