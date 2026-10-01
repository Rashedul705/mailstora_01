import { TOPICS, topicsIn, type Topic } from "./topics";

export type WorkItem = { slug: string; title: string; type?: string; esp?: string; tags?: string[]; fullDescription?: string; shortDescription?: string; coverImage?: string };

const ESP: Record<string, string> = { klaviyo: "klaviyo-email-templates", mailchimp: "mailchimp-email-templates", hubspot: "hubspot-email-templates" };

/** Service hubs a portfolio item demonstrates: its platform first, then what its text and tags cover. */
export function itemTopics(item: WorkItem): Topic[] {
    const out: Topic[] = [];
    const add = (slug?: string) => {
        const t = TOPICS.find((x) => x.slug === slug);
        if (t && !out.includes(t)) out.push(t);
    };
    add(ESP[(item.esp || "").toLowerCase()]);
    const kind = `${item.type} ${item.title}`.toLowerCase();
    if (kind.includes("signature")) add("html-email-signature-design");
    if (/transactional|order|receipt|onboarding|welcome/.test(kind)) add("transactional-email-templates");
    if (kind.includes("newsletter")) add("newsletter-email-templates");
    topicsIn(`${item.fullDescription || ""} ${item.shortDescription || ""}`, [item.title, item.type || "", ...(item.tags || [])]).forEach((t) => add(t.slug));
    if (!kind.includes("signature")) add("html-email-template-development");
    return out.slice(0, 4);
}

export const workForTopic = (items: WorkItem[], slug: string, limit = 3) => items.filter((i) => itemTopics(i).some((t) => t.slug === slug)).slice(0, limit);
