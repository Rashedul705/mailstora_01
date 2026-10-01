import type { Metadata } from "next";
import { headers } from "next/headers";

// Reads per-page SEO set in Admin › SEO › Pages and merges it over a page's built-in metadata.

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export type SeoEntry = {
    path: string;
    title?: string;
    description?: string;
    focusKeyword?: string;
    keywords?: string;
    canonical?: string;
    noindex?: boolean;
    nofollow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    schema?: string;
};

export type SeoSettings = {
    webmaster?: Record<string, string>;
    analytics?: Record<string, string>;
    defaultOgImage?: string;
    twitterHandle?: string;
    organization?: Record<string, string | string[]>;
};

/** Current request path, set by src/proxy.ts. */
export async function currentPath(): Promise<string> {
    try {
        const h = await headers();
        return h.get("x-pathname") || "/";
    } catch {
        return "/";
    }
}

export async function getSeoEntry(path: string): Promise<SeoEntry | null> {
    try {
        const res = await fetch(`${API}/api/seo/entry?path=${encodeURIComponent(path)}`, { next: { revalidate: 60 } });
        return res.ok ? await res.json() : null;
    } catch {
        return null;
    }
}

export async function getSeoSettings(): Promise<SeoSettings> {
    try {
        const res = await fetch(`${API}/api/seo/settings`, { next: { revalidate: 60 } });
        return res.ok ? await res.json() : {};
    } catch {
        return {};
    }
}

/** Merge admin overrides over a page's built-in metadata. Empty admin fields keep the built-in value. */
export async function withSeo(base: Metadata, path?: string): Promise<Metadata> {
    const p = path || (await currentPath());
    const [e, s] = await Promise.all([getSeoEntry(p), getSeoSettings()]);
    const baseOg = (base.openGraph || {}) as Record<string, unknown>;
    const ogImage = e?.ogImage || (baseOg.images as unknown) || s.defaultOgImage;

    const title = e?.title || base.title;
    const description = e?.description || base.description;
    const hasRobots = e && (e.noindex || e.nofollow || e.noarchive || e.nosnippet || e.noimageindex);

    return {
        ...base,
        title,
        description,
        ...(e?.keywords ? { keywords: e.keywords.split(",").map((k) => k.trim()).filter(Boolean) } : {}),
        alternates: { ...(base.alternates || {}), canonical: e?.canonical || base.alternates?.canonical || `https://mailstora.com${p}` },
        ...(hasRobots
            ? {
                  robots: {
                      index: !e!.noindex,
                      follow: !e!.nofollow,
                      noarchive: e!.noarchive || undefined,
                      nosnippet: e!.nosnippet || undefined,
                      noimageindex: e!.noimageindex || undefined,
                  },
              }
            : {}),
        openGraph: {
            ...baseOg,
            type: (baseOg.type as "website" | "article") || "website",
            siteName: "MailStora",
            url: `https://mailstora.com${p}`,
            title: e?.ogTitle || (baseOg.title as string) || (title as string),
            description: e?.ogDescription || (baseOg.description as string) || (description as string),
            ...(ogImage ? { images: ogImage as string } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: e?.twitterTitle || e?.ogTitle || (title as string),
            description: e?.twitterDescription || e?.ogDescription || (description as string),
            ...(s.twitterHandle ? { site: s.twitterHandle } : {}),
            ...(ogImage ? { images: ogImage as string } : {}),
        },
    };
}
