// Site navigation shared by the header mega menu and the footer.
export type NavLink = { label: string; href: string; desc?: string };
export type NavGroup = { title: string; links: NavLink[] };

export const SERVICE_GROUPS: NavGroup[] = [
    {
        title: "Email Development",
        links: [
            { label: "HTML Email Templates", href: "/html-email-template-development/", desc: "Hand-coded, responsive templates" },
            { label: "Figma & PSD to HTML", href: "/figma-to-html-email/", desc: "Designs converted to HTML email" },
            { label: "Email Testing & Outlook Fixes", href: "/outlook-email-rendering-fix/", desc: "Tested in 50+ email clients" },
            { label: "Newsletter Templates", href: "/newsletter-email-templates/" },
            { label: "Transactional Templates", href: "/transactional-email-templates/" },
        ],
    },
    {
        title: "Klaviyo & ESP",
        links: [
            { label: "Klaviyo Flow Setup", href: "/klaviyo-flow-setup/", desc: "Welcome, cart and post-purchase flows" },
            { label: "Klaviyo & Mailchimp Campaigns", href: "/klaviyo-campaign-management/", desc: "Campaigns designed and scheduled" },
            { label: "Klaviyo Templates", href: "/klaviyo-email-templates/" },
            { label: "Mailchimp Templates", href: "/mailchimp-email-templates/" },
            { label: "HubSpot Templates", href: "/hubspot-email-templates/" },
        ],
    },
    {
        title: "Signatures & More",
        links: [
            { label: "HTML Email Signatures", href: "/html-email-signature-design/", desc: "Clickable, on-brand signatures" },
            { label: "Gmail Signatures", href: "/gmail-email-signature/" },
            { label: "Outlook Signatures", href: "/outlook-email-signature/" },
            { label: "White-Label for Agencies", href: "/white-label-email-development/" },
            { label: "Shopify Development", href: "/shopify-development/" },
            { label: "Social Media Management", href: "/social-media-management/" },
            { label: "SEO, AEO & GEO", href: "/seo-aeo-geo-services/" },
            { label: "Performance Marketing", href: "/performance-marketing/" },
        ],
    },
];

export const RESOURCE_LINKS: NavLink[] = [
    { label: "About", href: "/about/", desc: "The founder and our story" },
    { label: "Contact", href: "/contact/", desc: "Get in touch with the team" },
    { label: "Case Studies", href: "/case-studies/", desc: "Real projects and their results" },
    { label: "Blog", href: "/blog/", desc: "HTML email tips and guides" },
    { label: "FAQs", href: "/faq/", desc: "Answers to common questions" },
]

export const COMPANY_LINKS: NavLink[] = [
    { label: "About", href: "/about/" },
    { label: "All Services", href: "/services/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Portfolio", href: "/portfolio/" },
    { label: "Case Studies", href: "/case-studies/" },
    { label: "Client Reviews", href: "/reviews/" },
    { label: "White-Label for Agencies", href: "/white-label-email-development/" },
    { label: "Blog", href: "/blog/" },
    { label: "FAQ", href: "/faq/" },
];
