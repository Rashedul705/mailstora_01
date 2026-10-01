import Link from "next/link";
import { currentPath } from "@/lib/seo";
import "./HomeLink.css";

// One contextual link to the homepage from every page, to build the homepage's topical authority.
// Anchor mix: about 60% the exact target keyword, 40% related / LSI keywords and the brand name.
// Each page always gets the same anchor (chosen from its path), so the mix is stable.

export const TARGET = "HTML email development agency";

const VARIANTS: { anchor: string; before: string; after: string }[] = [
    // exact target keyword (used on ~60% of pages)
    { anchor: TARGET, before: "MailStora is a founder-led ", after: " that hand-codes email templates, Klaviyo flows and signatures for brands and agencies." },
    { anchor: TARGET, before: "Looking for a reliable ", after: "? MailStora builds emails that work in every inbox, delivered in 24–48 hours." },
    { anchor: TARGET, before: "Work with an ", after: " that tests every email in 50+ clients before it reaches you." },
    // related and LSI keywords (~40%)
    { anchor: "custom HTML email templates", before: "See how MailStora builds ", after: " that stay on-brand in Gmail, Outlook and Apple Mail." },
    { anchor: "email template development company", before: "MailStora is an ", after: " trusted by brands and agencies worldwide." },
    { anchor: "hand-coded email templates", before: "Every project follows the same process behind our ", after: ", from brief to tested delivery." },
    { anchor: "responsive email design agency", before: "Need a ", after: "? MailStora designs and codes emails that adapt to every screen." },
    { anchor: "MailStora", before: "Learn more about ", after: ", the email development team behind these projects." },
];

/** Stable 0–99 bucket from a path. */
function bucket(path: string) {
    let h = 2166136261;
    for (let i = 0; i < path.length; i++) h = Math.imul(h ^ path.charCodeAt(i), 16777619);
    return (h >>> 0) % 100;
}

// Fixed assignment for existing pages (exactly 60% target keyword, related anchors rotated evenly).
// Regenerate it when many pages are added; new pages fall back to the hash below.
import ASSIGNED from "./home-anchors.json";

export function homeAnchorFor(path: string) {
    const fixed = (ASSIGNED as Record<string, number>)[path];
    if (fixed !== undefined) return VARIANTS[fixed];
    const b = bucket(path);
    if (b < 60) return VARIANTS[b % 3]; // exact keyword
    return VARIANTS[3 + (b % 5)]; // related keywords
}

export default async function HomeLink({ inline = false }: { inline?: boolean }) {
    const path = await currentPath();
    if (path === "/") return null;
    const v = homeAnchorFor(path);
    const p = (
        <p className="home-link-note">
            {v.before}
            <Link href="/">{v.anchor}</Link>
            {v.after}
        </p>
    );
    return inline ? p : <div className="container home-link-wrap">{p}</div>;
}
