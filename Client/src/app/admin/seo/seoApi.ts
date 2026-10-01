// Small helper for SEO admin screens. Sends the admin login cookie with every call.
export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function seoFetch<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API}/api/seo${path}`, {
        ...init,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((data as { error?: string; message?: string }).error || (data as { message?: string }).message || `Request failed (${res.status})`);
    return data as T;
}

/** Same as seoFetch, for /api/admin/* system endpoints (users, activity, site settings, revisions, link checker). */
export async function adminFetch<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API}/api/admin${path}`, {
        ...init,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((data as { message?: string }).message || `Request failed (${res.status})`);
    return data as T;
}
