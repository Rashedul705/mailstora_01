import { siteConfig } from "../utils/siteConfig";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

// Deep-merge admin values over the defaults in utils/siteConfig.ts. Empty strings keep the default.
export function mergeSite(target: Record<string, unknown>, src: Record<string, unknown>) {
    for (const [k, v] of Object.entries(src || {})) {
        if (v === "" || v === null || v === undefined) continue;
        if (typeof v === "object" && !Array.isArray(v) && typeof target[k] === "object" && target[k]) mergeSite(target[k] as Record<string, unknown>, v as Record<string, unknown>);
        else target[k] = v;
    }
}

/** Admin › Site Settings values (cached 60s). Also applies them to the shared siteConfig object on the server. */
export async function loadSiteSettings(): Promise<Record<string, unknown>> {
    try {
        const res = await fetch(`${API}/api/seo/site`, { next: { revalidate: 60 } });
        const data = res.ok ? await res.json() : {};
        mergeSite(siteConfig as unknown as Record<string, unknown>, data);
        return data;
    } catch {
        return {};
    }
}
