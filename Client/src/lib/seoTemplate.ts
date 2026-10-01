import { getSeoSettings } from "./seo";

// Title and description templates from Admin › SEO › General › Titles & Meta Templates.
// Used only when a blog post, portfolio item or case study has no SEO title/description of its own.

export type TemplateKind = "blog" | "portfolio" | "caseStudy";
export type TemplateVars = { title?: string; category?: string; client?: string; platform?: string; excerpt?: string; year?: string };

const DEFAULTS: Record<TemplateKind, { title: string; description: string }> = {
    blog: { title: "%title% %sep% %sitename%", description: "%excerpt%" },
    portfolio: { title: "%title%: HTML Email Example %sep% %sitename%", description: "%title%: a custom %platform% email built by %sitename% for %client%, hand-coded and tested in 50+ email clients." },
    caseStudy: { title: "%client% Case Study %sep% %sitename%", description: "%excerpt%" },
};

/** Replace %variables% and tidy spaces left by empty values. */
export function fillTemplate(tpl: string, vars: TemplateVars & { sitename?: string; sep?: string }): string {
    return tpl
        .replace(/%(\w+)%/g, (_m, k: string) => String((vars as Record<string, string | undefined>)[k] ?? ""))
        .replace(/\s+([,.:;])/g, "$1")
        .replace(/\s{2,}/g, " ")
        .replace(/^[\s|:–-]+|[\s|:–-]+$/g, "")
        .trim();
}

/** Shorten at a word boundary so titles stay within 60 and descriptions within 160 characters. */
export const clamp = (s: string, max: number) => (s.length <= max ? s : s.slice(0, max - 1).replace(/\s+\S*$/, "") + "…");

export async function templateMeta(kind: TemplateKind, vars: TemplateVars): Promise<{ title: string; description: string }> {
    const s = (await getSeoSettings()) as { templates?: Partial<Record<TemplateKind, { title?: string; description?: string }>>; siteName?: string; titleSeparator?: string };
    const t = { ...DEFAULTS[kind], ...(s.templates?.[kind] || {}) };
    const all = { ...vars, sitename: s.siteName || "MailStora", sep: s.titleSeparator || "|" };
    let title = fillTemplate(t.title || DEFAULTS[kind].title, all);
    // If the pattern is too long, fall back to "<title> | <site>" before cutting words
    if (title.length > 60) title = fillTemplate("%title% %sep% %sitename%", all);
    return { title: clamp(title, 60), description: clamp(fillTemplate(t.description || DEFAULTS[kind].description, all), 160) };
}
