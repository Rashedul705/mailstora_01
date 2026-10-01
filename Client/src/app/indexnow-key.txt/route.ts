// IndexNow key file (https://mailstora.com/indexnow-key.txt). The key is created in Admin › SEO › General Settings.
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function GET() {
    try {
        const res = await fetch(`${API}/api/seo/settings`, { cache: "no-store" });
        const s = res.ok ? await res.json() : {};
        if (s.indexNowKey) return new Response(s.indexNowKey, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    } catch {
        // fall through
    }
    return new Response("Not configured", { status: 404 });
}
