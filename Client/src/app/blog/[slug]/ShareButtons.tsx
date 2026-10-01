"use client";

import { useState } from "react";

// Share links are built from the canonical URL passed by the server, so they work before and after hydration.
export default function ShareButtons({ title, url }: { title: string; url: string }) {
    const [copied, setCopied] = useState(false);
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(title);

    const links = [
        { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, path: "M18.9 2H22l-7.2 8.2L23 22h-6.6l-5.2-6.8L5.3 22H2.2l7.7-8.8L1.8 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z" },
        { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" },
        { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" },
        { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, path: "M12.05 2C6.5 2 2.07 6.43 2.07 11.97c0 1.76.46 3.48 1.34 5L2 22l5.17-1.36a9.9 9.9 0 0 0 4.87 1.25h.01c5.54 0 9.97-4.44 9.97-9.98A9.94 9.94 0 0 0 12.05 2zm5.8 14.12c-.25.69-1.43 1.32-2 1.4-.51.08-1.16.11-1.87-.12-.43-.13-.99-.32-1.7-.62-2.98-1.29-4.93-4.29-5.08-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.6.84 2.06.92 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.66 2.06 1.13 1.01 2.09 1.33 2.39 1.48.3.15.47.12.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.74.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.18 1.41z" },
    ];

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.prompt("Copy this link:", url);
        }
    };

    return (
        <div className="bp-share">
            <span>Share</span>
            {links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d={l.path} /></svg>
                </a>
            ))}
            <button type="button" onClick={copy} aria-label="Copy link" title={copied ? "Copied!" : "Copy link"}>
                {copied ? (
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                ) : (
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
                )}
            </button>
        </div>
    );
}
