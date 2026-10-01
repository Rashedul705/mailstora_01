import { NextResponse, type NextRequest } from "next/server";

// Applies redirects managed in Admin › SEO › Redirections.
// The list is cached for 60 seconds so the API is not called on every request.

type Rule = { source: string; target: string; type: number };

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const TTL = 60_000;
let cache: { at: number; map: Map<string, Rule> } | null = null;

async function getRules(): Promise<Map<string, Rule>> {
    if (cache && Date.now() - cache.at < TTL) return cache.map;
    try {
        const res = await fetch(`${API}/api/seo/redirects`, { cache: "no-store" });
        const list: Rule[] = res.ok ? await res.json() : [];
        cache = { at: Date.now(), map: new Map(list.map((r) => [r.source, r])) };
    } catch {
        // API down: keep serving pages, reuse the last list if we have one
        cache = { at: Date.now(), map: cache?.map ?? new Map() };
    }
    return cache.map;
}

const norm = (p: string) => {
    let s = p.toLowerCase();
    if (!s.endsWith("/") && !/\.[a-z0-9]+$/.test(s)) s += "/";
    return s;
};

// Pass the path on so server components (SEO overrides, page schema) know which page they render
function next(req: NextRequest) {
    const h = new Headers(req.headers);
    h.set("x-pathname", norm(req.nextUrl.pathname));
    return NextResponse.next({ request: { headers: h } });
}

// ── Page Editor (Admin › Page Editor): text and image changes applied to the rendered page ──
type Edit = { kind: "text" | "img" | "alt"; original: string; value: string };
let editCache: { at: number; map: Map<string, Edit[]> } | null = null;

async function getEdits(): Promise<Map<string, Edit[]>> {
    if (editCache && Date.now() - editCache.at < TTL) return editCache.map;
    try {
        const res = await fetch(`${API}/api/page-edits`, { cache: "no-store" });
        const list: { path: string; edits: Edit[] }[] = res.ok ? await res.json() : [];
        editCache = { at: Date.now(), map: new Map(list.map((d) => [d.path, d.edits])) };
    } catch {
        editCache = { at: Date.now(), map: editCache?.map ?? new Map() };
    }
    return editCache.map;
}

const escHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const j = (s: string) => JSON.stringify(s).slice(1, -1); // as inside a JSON string
const jj = (s: string) => j(j(s)); // JSON inside a JS string (RSC data embedded in HTML)

// Replace the exact rendered forms only (text between tags, whole JSON strings), so short words elsewhere are not touched
function applyEdits(body: string, edits: Edit[], html: boolean): string {
    const swap = (from: string, to: string) => { if (from !== to) body = body.split(from).join(to); };
    for (const e of edits) {
        const o = e.original;
        const v = e.value;
        if (e.kind === "text") {
            if (html) {
                swap(`>${escHtml(o)}<`, `>${escHtml(v)}<`);
                swap(`\\"${jj(o)}\\"`, `\\"${jj(v)}\\"`);
            } else {
                swap(`"${j(o)}"`, `"${j(v)}"`);
            }
        } else if (e.kind === "img") {
            swap(`"${o}"`, `"${v}"`);
            swap(`\\"${o}\\"`, `\\"${v}\\"`);
            swap(`url=${encodeURIComponent(o)}&`, `url=${encodeURIComponent(v)}&`);
        } else if (e.kind === "alt") {
            swap(`alt="${escHtml(o)}"`, `alt="${escHtml(v)}"`);
            swap(`"alt":"${j(o)}"`, `"alt":"${j(v)}"`);
            swap(`\\"alt\\":\\"${jj(o)}\\"`, `\\"alt\\":\\"${jj(v)}\\"`);
        }
    }
    return body;
}

async function withPageEdits(req: NextRequest) {
    // x-ms-raw: the inner request below, and the admin editor reading the original page
    if (req.method !== "GET" || req.headers.get("x-ms-raw")) return next(req);
    const map = await getEdits();
    if (map.size === 0) return next(req);
    const edits = [...(map.get(norm(req.nextUrl.pathname)) || []), ...(map.get("*") || [])];
    if (edits.length === 0) return next(req);

    const h = new Headers(req.headers);
    h.set("x-ms-raw", "1");
    h.delete("accept-encoding");
    const res = await fetch(req.nextUrl.href, { headers: h, redirect: "manual", cache: "no-store" });
    const type = res.headers.get("content-type") || "";
    const isHtml = type.includes("text/html");
    if (!isHtml && !type.includes("text/x-component")) return res;

    const body = applyEdits(await res.text(), edits, isHtml);
    const out = new Headers(res.headers);
    out.delete("content-length");
    out.delete("content-encoding");
    out.delete("transfer-encoding");
    return new NextResponse(body, { status: res.status, headers: out });
}

export async function proxy(req: NextRequest) {
    const rules = await getRules();
    const rule = rules.size ? rules.get(norm(req.nextUrl.pathname)) : undefined;
    if (!rule) return withPageEdits(req);

    // Count the hit without delaying the visitor
    fetch(`${API}/api/seo/redirect-hit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: rule.source }),
    }).catch(() => {});

    if (rule.type === 410) {
        return new NextResponse("This page has been permanently removed.", { status: 410, headers: { "Content-Type": "text/plain" } });
    }
    const target = /^https?:\/\//.test(rule.target) ? rule.target : new URL(rule.target, req.url).toString();
    return NextResponse.redirect(target, rule.type as 301 | 302 | 307 | 308);
}

// Skip Next internals, API proxies, admin and static files
export const config = {
    matcher: ["/((?!_next/|api/|admin|images/|Email_Template|favicon|icon|apple-icon|robots.txt|sitemap.xml|indexnow-key.txt|.*\\.[a-zA-Z0-9]+$).*)"],
};
