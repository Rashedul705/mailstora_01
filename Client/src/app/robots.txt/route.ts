// robots.txt is edited in Admin › SEO › Webmaster Tools. Falls back to a safe default if the API is down.
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

// Used when the API is down. Keep in sync with Admin › SEO › Webmaster Tools.
const FALLBACK = "# robots.txt for mailstora.com\n# Search engines and AI assistants are welcome on all public pages.\n# /Email_Template/ holds client email files: blocked here, and it also sends a \"noindex\" header.\n\nUser-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /Email_Template/\nDisallow: /Email_Template_Index/\n\n# AI search and assistant crawlers (listed so they are clearly allowed)\nUser-agent: GPTBot\nUser-agent: OAI-SearchBot\nUser-agent: ChatGPT-User\nUser-agent: ClaudeBot\nUser-agent: Claude-SearchBot\nUser-agent: Claude-User\nUser-agent: PerplexityBot\nUser-agent: Perplexity-User\nUser-agent: Google-Extended\nUser-agent: Applebot-Extended\nUser-agent: Bingbot\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /Email_Template/\nDisallow: /Email_Template_Index/\n\nSitemap: https://mailstora.com/sitemap.xml";

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
