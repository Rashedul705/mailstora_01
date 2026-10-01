import type { Metadata } from "next";
import { SERVICES } from "./services";

// Target keywords per service page: primary keyword first, then close variants and long-tail terms.
// Used for the meta keywords tag (read by Bing and some AI crawlers; Google ignores it) and kept here as the keyword plan.
export const SERVICE_KEYWORDS: Record<string, string[]> = {
    "html-email-template-development": ["HTML email template development", "custom HTML email templates", "HTML email developer", "responsive email templates", "hand-coded email templates", "email template coding service", "HTML email development agency"],
    "html-email-signature-design": ["HTML email signature design", "custom email signature", "HTML email signature developer", "clickable email signature", "email signature for teams", "professional email signature service"],
    "klaviyo-flow-setup": ["Klaviyo flow setup", "Klaviyo automation flows", "Klaviyo welcome series", "Klaviyo abandoned cart flow", "Klaviyo expert", "Klaviyo email automation service"],
    "klaviyo-campaign-management": ["Klaviyo campaign management", "Klaviyo email campaigns", "Klaviyo campaign manager", "Mailchimp campaign management", "email campaign management service"],
    "figma-to-html-email": ["Figma to HTML email", "PSD to HTML email", "design to HTML email conversion", "Adobe XD to HTML email", "email template slicing", "convert Figma to email template"],
    "outlook-email-rendering-fix": ["Outlook email rendering fix", "fix HTML email in Outlook", "Outlook email template issues", "email rendering testing", "Litmus email testing", "dark mode email fix"],
    "shopify-development": ["Shopify store development", "Shopify development", "Shopify store setup", "Shopify theme customization", "Shopify developer", "Shopify email integration"],
    "seo-aeo-geo-services": ["SEO services", "AEO services", "GEO services", "answer engine optimization", "generative engine optimization", "technical SEO", "on-page SEO", "AI search optimization"],
    "performance-marketing": ["performance marketing agency", "Meta ads management", "TikTok ads management", "Google Ads management", "ChatGPT ads", "paid social agency"],
    "social-media-management": ["social media management", "Instagram management", "Instagram growth service", "social media content management", "organic Instagram growth"],
    "klaviyo-email-templates": ["Klaviyo email templates", "custom Klaviyo templates", "Klaviyo template design", "Klaviyo HTML template", "Klaviyo drag and drop template", "Klaviyo template developer"],
    "mailchimp-email-templates": ["Mailchimp email templates", "custom Mailchimp template", "Mailchimp template design", "Mailchimp HTML template", "Mailchimp editable template"],
    "hubspot-email-templates": ["HubSpot email templates", "custom HubSpot email template", "HubSpot HubL email module", "HubSpot email template developer", "HubSpot drag and drop email template"],
    "newsletter-email-templates": ["newsletter email templates", "custom newsletter template", "HTML newsletter design", "email newsletter template design", "responsive newsletter template"],
    "transactional-email-templates": ["transactional email templates", "order confirmation email template", "Shopify notification templates", "SendGrid email templates", "password reset email template"],
    "gmail-email-signature": ["Gmail email signature", "HTML signature for Gmail", "Gmail signature design", "Google Workspace email signature", "custom Gmail signature"],
    "outlook-email-signature": ["Outlook email signature", "HTML signature for Outlook", "Outlook signature design", "Microsoft 365 email signature", "custom Outlook signature"],
    "white-label-email-development": ["white-label email development", "white label email templates", "email development for agencies", "outsource email development", "white label Klaviyo services"],
};

/** Complete metadata for a service page: title, description, keywords, canonical, Open Graph and Twitter. */
export function serviceMetadata(slug: string): Metadata {
    const s = SERVICES[slug];
    const url = `https://mailstora.com/${slug}/`;
    const image = s.heroImage ? { url: `https://mailstora.com${s.heroImage}`, alt: s.heroAlt } : undefined;
    return {
        title: s.metaTitle,
        description: s.metaDescription,
        keywords: SERVICE_KEYWORDS[slug] || [s.name],
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            siteName: "MailStora",
            title: s.metaTitle,
            description: s.metaDescription,
            url,
            ...(image ? { images: [image] } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: s.metaTitle,
            description: s.metaDescription,
            ...(image ? { images: [image.url] } : {}),
        },
    };
}
