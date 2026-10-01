// On-page SEO analysis, run in the admin browser against the live page HTML (like Rank Math's content analysis).

export type PageData = {
    url: string;
    status: number;
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    robots: string;
    h1: string[];
    h2: string[];
    words: number;
    text: string;
    firstParagraph: string;
    images: number;
    imagesNoAlt: number;
    internalLinks: number;
    externalLinks: number;
    schemaTypes: string[];
    schemaBlocks: string[];
    ogImage: string;
};

export type Check = { ok: boolean; label: string; tip?: string; weight: number };

const SITE_HOST = "mailstora.com";

export async function fetchPage(path: string): Promise<PageData> {
    const res = await fetch(path, { cache: "no-store", credentials: "omit" });
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const meta = (sel: string) => doc.querySelector(sel)?.getAttribute("content")?.trim() || "";
    // Main content only: skip header, footer and navigation
    const main = doc.querySelector("main") || doc.body;
    main.querySelectorAll("script,style,nav,footer,header").forEach((n) => n.remove());
    const text = (main.textContent || "").replace(/\s+/g, " ").trim();
    const links = Array.from(main.querySelectorAll("a[href]")).map((a) => a.getAttribute("href") || "");
    const isInternal = (h: string) => h.startsWith("/") || h.includes(SITE_HOST) || h.startsWith("#");
    const imgs = Array.from(main.querySelectorAll("img"));
    const blocks = Array.from(doc.querySelectorAll('script[type="application/ld+json"]')).map((s) => s.textContent || "");
    const types = new Set<string>();
    for (const b of blocks) {
        try {
            const collect = (o: unknown): void => {
                if (Array.isArray(o)) return o.forEach(collect);
                if (o && typeof o === "object") {
                    const t = (o as Record<string, unknown>)["@type"];
                    if (typeof t === "string") types.add(t);
                    if (Array.isArray(t)) t.forEach((x) => types.add(String(x)));
                    Object.values(o).forEach(collect);
                }
            };
            collect(JSON.parse(b));
        } catch {
            types.add("Invalid JSON");
        }
    }
    return {
        url: path,
        status: res.status,
        title: doc.querySelector("title")?.textContent?.trim() || "",
        description: meta('meta[name="description"]'),
        keywords: meta('meta[name="keywords"]'),
        canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
        robots: meta('meta[name="robots"]'),
        h1: Array.from(doc.querySelectorAll("h1")).map((h) => (h.textContent || "").trim()),
        h2: Array.from(main.querySelectorAll("h2")).map((h) => (h.textContent || "").trim()),
        words: text ? text.split(" ").length : 0,
        text,
        firstParagraph: (main.querySelector("p")?.textContent || "").trim(),
        images: imgs.length,
        imagesNoAlt: imgs.filter((i) => !i.getAttribute("alt") && i.getAttribute("aria-hidden") !== "true" && i.getAttribute("alt") !== "").length,
        internalLinks: links.filter(isInternal).length,
        externalLinks: links.filter((h) => /^https?:/.test(h) && !h.includes(SITE_HOST)).length,
        schemaTypes: Array.from(types).filter((t) => !["PostalAddress", "ListItem", "Answer", "Offer", "Rating", "AggregateRating", "ImageObject", "PropertyValue"].includes(t)),
        schemaBlocks: blocks,
        ogImage: meta('meta[property="og:image"]'),
    };
}

export function checks(d: PageData, keyword: string, override?: { title?: string; description?: string }): Check[] {
    const title = override?.title || d.title;
    const desc = override?.description || d.description;
    const kw = keyword.trim().toLowerCase();
    const has = (s: string) => kw && s.toLowerCase().includes(kw);
    const count = kw ? d.text.toLowerCase().split(kw).length - 1 : 0;
    const density = d.words ? (count * kw.split(" ").length * 100) / d.words : 0;
    const noindex = /noindex/i.test(d.robots);

    const list: Check[] = [
        { weight: 10, ok: title.length >= 30 && title.length <= 60, label: `Title length is ${title.length} characters`, tip: "Aim for 30 to 60 characters so Google shows it in full." },
        { weight: 10, ok: desc.length >= 120 && desc.length <= 160, label: `Meta description length is ${desc.length} characters`, tip: "Aim for 120 to 160 characters." },
        { weight: 8, ok: d.h1.length === 1, label: d.h1.length === 1 ? "Page has exactly one H1" : `Page has ${d.h1.length} H1 headings`, tip: "Use one H1 per page." },
        { weight: 6, ok: d.words >= 600, label: `Content is ${d.words} words long`, tip: "Service and blog pages rank better with 600+ words of useful content." },
        { weight: 6, ok: d.imagesNoAlt === 0, label: d.imagesNoAlt === 0 ? "All images have alt text" : `${d.imagesNoAlt} image(s) without alt text`, tip: "Describe each image for accessibility and image search." },
        { weight: 5, ok: d.internalLinks >= 3, label: `${d.internalLinks} internal links`, tip: "Link to at least 3 related pages." },
        { weight: 3, ok: d.externalLinks >= 1, label: `${d.externalLinks} external links`, tip: "An authoritative outbound link can add context." },
        { weight: 8, ok: d.schemaTypes.length > 0 && !d.schemaTypes.includes("Invalid JSON"), label: d.schemaTypes.length ? `Schema found: ${d.schemaTypes.join(", ")}` : "No schema found", tip: "Add structured data in the Schema tab." },
        { weight: 6, ok: !!d.canonical, label: d.canonical ? "Canonical URL is set" : "No canonical URL", tip: "Set a canonical to avoid duplicate content." },
        { weight: 4, ok: !!d.ogImage, label: d.ogImage ? "Social share image is set" : "No social share image", tip: "Add an image in the Social tab." },
        { weight: 10, ok: !noindex, label: noindex ? "Page is set to noindex" : "Page can be indexed", tip: "Remove noindex in Advanced if this page should rank." },
    ];

    if (kw) {
        list.push(
            { weight: 10, ok: !!has(title), label: has(title) ? "Focus keyword is in the title" : "Focus keyword is not in the title", tip: "Put the keyword near the start of the title." },
            { weight: 8, ok: !!has(desc), label: has(desc) ? "Focus keyword is in the meta description" : "Focus keyword is not in the meta description" },
            { weight: 6, ok: !!has(d.h1.join(" ")), label: has(d.h1.join(" ")) ? "Focus keyword is in the H1" : "Focus keyword is not in the H1" },
            { weight: 5, ok: !!has(d.h2.join(" ")), label: has(d.h2.join(" ")) ? "Focus keyword appears in an H2" : "Focus keyword is not in any H2" },
            { weight: 5, ok: !!has(d.firstParagraph), label: has(d.firstParagraph) ? "Focus keyword is in the first paragraph" : "Focus keyword is not in the first paragraph" },
            { weight: 5, ok: !!has(d.url.replace(/-/g, " ")), label: has(d.url.replace(/-/g, " ")) ? "Focus keyword is in the URL" : "Focus keyword is not in the URL" },
            { weight: 5, ok: density >= 0.5 && density <= 2.5, label: `Keyword density is ${density.toFixed(2)}% (${count} times)`, tip: "Aim for 0.5% to 2.5%. Avoid keyword stuffing." }
        );
    } else {
        list.push({ weight: 10, ok: false, label: "No focus keyword set", tip: "Add the main search phrase this page should rank for." });
    }
    return list;
}

export function score(list: Check[]): number {
    const total = list.reduce((n, c) => n + c.weight, 0);
    const got = list.reduce((n, c) => n + (c.ok ? c.weight : 0), 0);
    return total ? Math.round((got / total) * 100) : 0;
}

export const scoreColor = (s: number) => (s >= 80 ? "#16a34a" : s >= 50 ? "#f59e0b" : "#dc2626");

/** Every public URL from the live sitemap, as paths. */
export async function sitemapPaths(): Promise<string[]> {
    const res = await fetch("/sitemap.xml", { cache: "no-store" });
    const xml = await res.text();
    return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => {
        try {
            return new URL(m[1]).pathname;
        } catch {
            return m[1];
        }
    });
}

/** Run `fn` over `items` with at most `limit` in flight; results keep the input order. */
export async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T, i: number) => Promise<R>, onProgress?: (done: number) => void): Promise<R[]> {
    const out: R[] = new Array(items.length);
    let next = 0, done = 0;
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (next < items.length) {
            const i = next++;
            out[i] = await fn(items[i], i);
            onProgress?.(++done);
        }
    }));
    return out;
}
