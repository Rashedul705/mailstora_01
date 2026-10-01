// Semantic network for internal linking.
// Each service page is a topic hub. Blog posts link to hubs by their anchor phrases,
// and hubs list the posts that cover their topic.

export type Topic = { slug: string; name: string; anchors: string[] };

// Anchor phrases are matched case-insensitively in post text, longest first.
// Keep them specific: generic words ("email") would create spammy links.
export const TOPICS: Topic[] = [
    { slug: "html-email-template-development", name: "HTML Email Template Development", anchors: ["HTML email template development", "custom HTML email templates", "custom HTML email template", "HTML email templates", "responsive email templates"] },
    { slug: "figma-to-html-email", name: "Figma to HTML Email", anchors: ["Figma to HTML email", "Figma to HTML", "PSD to HTML email", "PSD to HTML", "design to HTML"] },
    { slug: "klaviyo-email-templates", name: "Klaviyo Email Templates", anchors: ["Klaviyo email templates", "Klaviyo templates", "Klaviyo template"] },
    { slug: "klaviyo-flow-setup", name: "Klaviyo Flow Setup", anchors: ["Klaviyo flow setup", "Klaviyo flows", "Klaviyo automation", "abandoned cart flow", "welcome series"] },
    { slug: "klaviyo-campaign-management", name: "Klaviyo Campaign Management", anchors: ["Klaviyo campaign management", "Klaviyo campaigns", "email campaign management"] },
    { slug: "mailchimp-email-templates", name: "Mailchimp Email Templates", anchors: ["Mailchimp email templates", "Mailchimp templates", "Mailchimp template"] },
    { slug: "hubspot-email-templates", name: "HubSpot Email Templates", anchors: ["HubSpot email templates", "HubSpot templates", "HubL modules"] },
    { slug: "newsletter-email-templates", name: "Newsletter Email Templates", anchors: ["newsletter email templates", "newsletter templates", "email newsletter template"] },
    { slug: "transactional-email-templates", name: "Transactional Email Templates", anchors: ["transactional email templates", "transactional emails", "order confirmation emails"] },
    { slug: "outlook-email-rendering-fix", name: "Outlook Email Rendering Fix", anchors: ["Outlook rendering", "Outlook email rendering", "broken in Outlook", "email testing", "dark mode"] },
    { slug: "html-email-signature-design", name: "HTML Email Signature Design", anchors: ["HTML email signatures", "HTML email signature", "email signature design", "email signatures"] },
    { slug: "gmail-email-signature", name: "Gmail Email Signature", anchors: ["Gmail signature", "Gmail email signature", "Google Workspace signature"] },
    { slug: "outlook-email-signature", name: "Outlook Email Signature", anchors: ["Outlook signature", "Outlook email signature", "Microsoft 365 signature"] },
    { slug: "white-label-email-development", name: "White-Label Email Development", anchors: ["white-label email development", "white label email development", "white-label", "white label"] },
    { slug: "shopify-development", name: "Shopify Development", anchors: ["Shopify development", "Shopify store"] },
];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const textOf = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").toLowerCase();

/** Service hubs a piece of HTML already links to or talks about, strongest first. */
export function topicsIn(html: string, extra: string[] = []): Topic[] {
    const text = `${textOf(html)} ${extra.join(" ").toLowerCase()}`;
    return TOPICS.map((t) => {
        const linked = html.includes(`/${t.slug}/`) ? 5 : 0;
        const hits = t.anchors.reduce((n, a) => n + (text.split(a.toLowerCase()).length - 1), 0);
        return { t, score: linked + hits };
    })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.t);
}

/**
 * Link the first mention of each topic to its service page, if the post does not link there yet.
 * Skips headings, existing links, code and figure captions. At most `max` new links per post.
 */
export function autoLink(html: string, max = 6): string {
    let added = 0;
    let out = html;
    const phrases = TOPICS.flatMap((t) => t.anchors.map((a) => ({ a, t }))).sort((x, y) => y.a.length - x.a.length);
    const done = new Set(TOPICS.filter((t) => html.includes(`/${t.slug}/`)).map((t) => t.slug));

    for (const { a, t } of phrases) {
        if (added >= max) break;
        if (done.has(t.slug)) continue;
        // Split into protected regions (headings, links, code, figcaption, tags) and plain text
        const parts = out.split(/(<(?:h[1-6]|a|code|pre|figcaption|button)\b[\s\S]*?<\/(?:h[1-6]|a|code|pre|figcaption|button)>|<[^>]+>)/i);
        const re = new RegExp(`\\b(${esc(a)})\\b`, "i");
        let linked = false;
        for (let i = 0; i < parts.length && !linked; i++) {
            if (i % 2 === 1) continue; // protected
            if (re.test(parts[i])) {
                parts[i] = parts[i].replace(re, `<a href="/${t.slug}/" class="bp-autolink">$1</a>`);
                linked = true;
            }
        }
        if (linked) {
            out = parts.join("");
            done.add(t.slug);
            added++;
        }
    }
    return out;
}

/** Posts that cover a service hub's topic (by links, anchors and tags). */
export function postsForTopic<P extends { content?: string; tags?: string[]; title: string }>(posts: P[], slug: string, limit = 3): P[] {
    return posts
        .map((p) => ({ p, rank: topicsIn(p.content || "", [p.title, ...(p.tags || [])]).findIndex((t) => t.slug === slug) }))
        .filter((x) => x.rank >= 0)
        .sort((a, b) => a.rank - b.rank)
        .slice(0, limit)
        .map((x) => x.p);
}
