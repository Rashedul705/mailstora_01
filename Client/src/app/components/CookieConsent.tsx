"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "ms-cookie-consent";

const read = () => {
    try { return localStorage.getItem(KEY); } catch { return null; }
};

/** Loads analytics (children) only after the visitor accepts. Shows a banner until they choose. */
export default function CookieConsent({ children, enabled }: { children: React.ReactNode; enabled: boolean }) {
    const [choice, setChoice] = useState<string | null>("pending");

    useEffect(() => setChoice(read()), []);

    const decide = (v: "granted" | "denied") => {
        try { localStorage.setItem(KEY, v); } catch { /* private mode */ }
        setChoice(v);
    };

    if (!enabled) return null;
    return (
        <>
            {choice === "granted" && children}
            {choice === null && (
                <div role="dialog" aria-live="polite" aria-label="Cookie consent" style={{ position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 9999, maxWidth: 560, margin: "0 auto", background: "#0f172a", color: "#e2e8f0", borderRadius: 12, padding: "1rem 1.25rem", boxShadow: "0 10px 30px rgba(0,0,0,.3)", fontSize: 14, lineHeight: 1.5 }}>
                    <p style={{ margin: "0 0 0.75rem" }}>
                        We use analytics cookies to understand how visitors use this site. No ads. See our <Link href="/privacy/" style={{ color: "#93c5fd" }}>Privacy Policy</Link>.
                    </p>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button type="button" onClick={() => decide("denied")} style={{ background: "transparent", color: "#e2e8f0", border: "1px solid #475569", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer" }}>Decline</button>
                        <button type="button" onClick={() => decide("granted")} style={{ background: "#2563eb", color: "#fff", border: 0, borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer" }}>Accept</button>
                    </div>
                </div>
            )}
        </>
    );
}
