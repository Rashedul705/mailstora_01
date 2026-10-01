"use client";

import { useEffect } from "react";

// Reports the missing URL to Admin › SEO › 404 Monitor (once per page view)
export default function NotFoundLogger() {
    useEffect(() => {
        const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        fetch(`${api}/api/seo/404`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: window.location.pathname, referrer: document.referrer }),
        }).catch(() => {});
    }, []);
    return null;
}
