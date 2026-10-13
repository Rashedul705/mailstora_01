// robots.txt is edited in Admin › SEO › Webmaster Tools. Falls back to a safe default if the API is down.
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const FALLBACK = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /Email_Template/
Disallow: /Email_Template_Index/

Sitemap: https://mailstora.com/sitemap.xml`;

export const revalidate = 60;

export async function GET() {
    let body = FALLBACK;
    try {
        const res = await fetch(`${API}/api/seo/settings`, { next: { revalidate: 60 } });
        if (res.ok) {
            const s = await res.json();
            if (typeof s.robots === "string" && s.robots.trim()) body = s.robots;
        }
    } catch {
        // keep fallback
    }
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
