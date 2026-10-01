import { currentPath, getSeoEntry, getSeoSettings } from "@/lib/seo";

const SITE = "https://mailstora.com";

// Keep "</script>" out of inline JSON-LD
const safe = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");

/**
 * Site-wide knowledge graph (Organization, founder, WebSite) from Admin › SEO › General Settings,
 * plus any custom JSON-LD added to the current page in Admin › SEO › Pages.
 * Page-specific schema built into each page (Service, FAQPage, BlogPosting...) still renders from the page itself.
 */
export default async function SiteSchema() {
    const [settings, path] = await Promise.all([getSeoSettings(), currentPath()]);
    const entry = await getSeoEntry(path);
    const o = (settings.organization || {}) as Record<string, string | string[]>;
    const str = (k: string) => (typeof o[k] === "string" ? (o[k] as string) : "");
    const sameAs = Array.isArray(o.sameAs) ? (o.sameAs as string[]).filter(Boolean) : [];

    const address = str("city") || str("street")
        ? {
              "@type": "PostalAddress",
              streetAddress: str("street") || undefined,
              addressLocality: str("city") || undefined,
              addressRegion: str("region") || undefined,
              postalCode: str("postalCode") || undefined,
              addressCountry: str("country") || undefined,
          }
        : str("country")
          ? { "@type": "PostalAddress", addressCountry: str("country") }
          : undefined;

    const graph = [
        {
            "@type": "Person",
            "@id": `${SITE}/#founder`,
            name: str("founderName") || "Rashedul Islam",
            jobTitle: str("founderTitle") || undefined,
            knowsAbout: ["HTML email development", "Klaviyo", "Outlook email rendering", "Email marketing"],
            image: str("founderImage") || undefined,
            worksFor: { "@id": `${SITE}/#mailstora` },
            sameAs: sameAs.length ? sameAs : undefined,
        },
        {
            // Always an Organization (the agency entity); the admin-chosen business type is added alongside
            "@type": !str("type") || str("type") === "Organization" ? "Organization" : ["Organization", str("type")],
            alternateName: "MailStora Email Development Agency",
            "@id": `${SITE}/#mailstora`,
            name: str("name") || "MailStora",
            url: str("url") || `${SITE}/`,
            logo: str("logo") || undefined,
            image: str("logo") || undefined,
            description: str("description") || undefined,
            email: str("email") || undefined,
            telephone: str("phone") || undefined,
            priceRange: str("priceRange") || undefined,
            address,
            areaServed: "Worldwide",
            ...(str("email") ? { contactPoint: { "@type": "ContactPoint", contactType: "sales", email: str("email"), availableLanguage: ["English", "Bengali"], areaServed: "Worldwide" } } : {}),
            slogan: "HTML emails that work in every inbox",
            knowsAbout: ["HTML email development", "Responsive email design", "Outlook email rendering", "Klaviyo", "Mailchimp", "HubSpot", "Email automation", "HTML email signatures", "Figma to HTML email", "Dark mode email design"],
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Email development services",
                itemListElement: [
                    ["HTML Email Template Development", "/html-email-template-development/"],
                    ["Figma to HTML Email", "/figma-to-html-email/"],
                    ["Klaviyo Flow Setup", "/klaviyo-flow-setup/"],
                    ["Klaviyo Campaign Management", "/klaviyo-campaign-management/"],
                    ["HTML Email Signature Design", "/html-email-signature-design/"],
                    ["Outlook Email Rendering Fix", "/outlook-email-rendering-fix/"],
                    ["White-Label Email Development", "/white-label-email-development/"],
                ].map(([name, url]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, url: `${SITE}${url}` } })),
            },
            founder: { "@id": `${SITE}/#founder` },
            sameAs: sameAs.length ? sameAs : undefined,
            ...(str("ratingValue") && str("ratingCount")
                ? { aggregateRating: { "@type": "AggregateRating", ratingValue: str("ratingValue"), reviewCount: str("ratingCount"), bestRating: "5" } }
                : {}),
        },
        {
            "@type": "WebSite",
            "@id": `${SITE}/#website`,
            url: `${SITE}/`,
            name: str("name") || "MailStora",
            publisher: { "@id": `${SITE}/#mailstora` },
        },
    ];

    let custom: unknown = null;
    if (entry?.schema) {
        try {
            custom = JSON.parse(entry.schema);
        } catch {
            custom = null;
        }
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe({ "@context": "https://schema.org", "@graph": graph }) }} />
            {custom !== null && <script type="application/ld+json" data-source="admin" dangerouslySetInnerHTML={{ __html: safe(custom) }} />}
        </>
    );
}
