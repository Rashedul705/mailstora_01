"use client";

import { useState } from "react";
import { API } from "../../seo/seoApi";
import "../../seo/seo-admin.css";

export default function ChangePasswordPage() {
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [busy, setBusy] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.newPassword !== form.confirm) return setMsg({ ok: false, text: "The new passwords do not match." });
        setBusy(true);
        setMsg(null);
        try {
            const res = await fetch(`${API}/api/auth/change-password`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || "Could not change password.");
            setForm({ currentPassword: "", newPassword: "", confirm: "" });
            setMsg({ ok: true, text: "Password updated. Use the new password next time you log in." });
        } catch (err) {
            setMsg({ ok: false, text: (err as Error).message });
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="seo-page" style={{ maxWidth: 560 }}>
            <header className="seo-head">
                <h1>Change Password</h1>
                <p>Use at least 10 characters. A passphrase of several words is easiest to remember.</p>
            </header>
            {msg && <p className={`seo-msg ${msg.ok ? "seo-msg--ok" : "seo-msg--err"}`}>{msg.text}</p>}
            <form className="seo-card" onSubmit={submit} style={{ display: "grid", gap: "1rem" }}>
                <div className="seo-field">
                    <label htmlFor="cp">Current password</label>
                    <input id="cp" type="password" autoComplete="current-password" required value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
                </div>
                <div className="seo-field">
                    <label htmlFor="np">New password</label>
                    <input id="np" type="password" autoComplete="new-password" minLength={10} required value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
                </div>
                <div className="seo-field">
                    <label htmlFor="np2">Confirm new password</label>
                    <input id="np2" type="password" autoComplete="new-password" minLength={10} required value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
                </div>
                <div>
                    <button className="seo-btn" disabled={busy}>{busy ? "Saving..." : "Update Password"}</button>
                </div>
            </form>
        </div>
    );
}
