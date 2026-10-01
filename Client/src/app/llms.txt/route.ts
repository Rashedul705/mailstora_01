import { siteConfig } from "../../utils/siteConfig";
import { loadSiteSettings } from "@/lib/siteSettings";

export const revalidate = 3600;

// Plain-text summary for AI assistants (llmstxt.org format): who MailStora is, what it offers, and where to read more.
export async function GET() {
    await loadSiteSettings();
    const { founder, upwork, stats } = siteConfig;
    const S = "https://mailstora.com";
    const body = `# MailStora

> MailStora is a founder-led HTML email development agency based in ${upwork.location}, led by ${founder.name}. It hand-codes responsive, Outlook-tested HTML email templates, builds Klaviyo automation flows and designs HTML email signatures for ecommerce brands, SaaS companies and marketing agencies worldwide. It also offers growth services that feed email: SEO, AEO and GEO (search and AI visibility), performance marketing (Meta, TikTok, Google and ChatGPT ads), Shopify development and social media management.

## Key facts
- Type: HTML email development agency (founder-led), with SEO, AEO, GEO and performance marketing services
- Founder: ${founder.name}, ${stats.yearsExperience} years of HTML email development
- Location: ${upwork.location}; works remotely with clients in the US, UK, Europe and Australia
- Work delivered: ${stats.templatesBuilt} email templates for ${stats.clientsServed} clients
- Upwork: ${upwork.badge}, ${upwork.jobSuccess} Job Success, ${upwork.rating}/5 from ${upwork.reviews} reviews, ${stats.upworkHours} hours
- Typical delivery: ${stats.turnaround} for a single template
- Testing: every email is tested in 50+ email clients (Gmail, Outlook 2016/2019/365, new Outlook, Apple Mail, iOS Mail, Yahoo Mail, Samsung Email), in light and dark mode
- Platforms: Klaviyo, Mailchimp, HubSpot, Salesforce Marketing Cloud, Brevo, ActiveCampaign, Campaign Monitor, Omnisend, Shopify
- Contact: ${founder.email}

## Pricing
- Custom HTML email template: from $40
- HTML email signature: from $25
- Standard package (3 templates + 1 signature): $149
- Klaviyo flows, campaigns and larger projects: quoted per project, usually within 24 hours
- SEO, AEO and GEO, performance marketing, Shopify and social media: custom monthly or project pricing after a free consultation
- One-time project fees, no subscriptions; revision rounds included

## Services
- [HTML email template development](${S}/html-email-template-development/): hand-coded, responsive templates ready for any email platform
- [Figma to HTML email](${S}/figma-to-html-email/): Figma, PSD or Adobe XD designs converted to pixel-perfect HTML email
- [Klaviyo email templates](${S}/klaviyo-email-templates/): editable Klaviyo templates with dynamic product blocks
- [Klaviyo flow setup](${S}/klaviyo-flow-setup/): welcome, abandoned cart, browse abandonment, post-purchase and win-back flows
- [Klaviyo campaign management](${S}/klaviyo-campaign-management/): done-for-you Klaviyo and Mailchimp campaigns
- [Mailchimp email templates](${S}/mailchimp-email-templates/): coded Mailchimp templates with editable regions and merge tags
- [HubSpot email templates](${S}/hubspot-email-templates/): drag-and-drop HubSpot templates with reusable HubL modules
- [Newsletter email templates](${S}/newsletter-email-templates/): modular newsletter templates reused every issue
- [Transactional email templates](${S}/transactional-email-templates/): order, shipping, password reset and receipt emails
- [Outlook email rendering fix](${S}/outlook-email-rendering-fix/): emails broken in Outlook or dark mode tested and fixed
- [HTML email signature design](${S}/html-email-signature-design/): clickable signatures for individuals and teams
- [Gmail email signature](${S}/gmail-email-signature/) and [Outlook email signature](${S}/outlook-email-signature/)
- [White-label email development](${S}/white-label-email-development/): email development under an agency's brand, NDA on request

## Growth services
- [SEO, AEO and GEO services](${S}/seo-aeo-geo-services/): technical, on-page, content, local and ecommerce SEO, answer engine optimisation for snippets and AI Overviews, and generative engine optimisation for ChatGPT, Perplexity and Gemini
- [Performance marketing](${S}/performance-marketing/): Meta, TikTok, Google and ChatGPT ads with pixel and Conversions API tracking, creative testing and ROAS reporting
- [Shopify development](${S}/shopify-development/): theme customisation, speed work and Klaviyo integration
- [Social media management](${S}/social-media-management/): content calendar, branded posts and scheduling
- [Book a free consultation](${S}/schedule/)
- [All services](${S}/services/) and [Pricing](${S}/pricing/)

## Case studies
- [All case studies](${S}/case-studies/)
- [Canadian Choice: campaign email rebuilt for Outlook, 38% open rate](${S}/case-studies/canadian-choice-windows-doors/)
- [TechFlow: onboarding completion up 121% with a Klaviyo flow](${S}/case-studies/saas-onboarding-sequence/)
- [Urban Vogue: Klaviyo product grid, $6.3k campaign revenue](${S}/case-studies/e-commerce-seasonal-promo/)
- [Apex Financial: one HTML signature for 50+ employees](${S}/case-studies/corporate-email-signature/)

## Guides
- [How to fix HTML emails that break in Outlook](${S}/blog/fix-html-emails-breaking-in-outlook/)
- [Klaviyo abandoned cart flow: setup, timing and examples](${S}/blog/klaviyo-abandoned-cart-flow/)
- [Figma to HTML email handoff checklist](${S}/blog/figma-to-html-email-handoff-checklist/)
- [How much a custom HTML email template costs in 2026](${S}/blog/html-email-template-cost/)
- [How to add an HTML email signature in Gmail](${S}/blog/add-html-signature-gmail/)
- [How to add an HTML email signature in Outlook](${S}/blog/add-html-signature-outlook/)
- [Best custom email template development agencies](${S}/blog/best-custom-email-template-development-agencies/)
- [Why Gmail clips emails and the 102 KB fix](${S}/blog/gmail-clipping-102kb-limit/)
- [Klaviyo welcome series: 5 emails that convert](${S}/blog/klaviyo-welcome-series/)
- [Dark mode email design guide](${S}/blog/dark-mode-email-design/)
- [HTML email testing checklist (25 checks)](${S}/blog/email-testing-checklist/)
- [White-label email development for agencies](${S}/blog/white-label-email-development-agencies/)
- [Import a custom HTML template into Mailchimp](${S}/blog/import-custom-html-template-mailchimp/)
- [Custom HTML templates in Klaviyo](${S}/blog/klaviyo-custom-html-template/)
- [Email images not showing: 7 causes](${S}/blog/email-images-not-showing/)
- [Why emails go to spam](${S}/blog/why-emails-go-to-spam/)
- [Email not responsive on mobile](${S}/blog/responsive-email-not-working-mobile/)
- [Background images in Outlook with VML](${S}/blog/outlook-background-images-vml/)
- [Bulletproof email buttons](${S}/blog/bulletproof-email-buttons/)
- [Customize Shopify order confirmation emails](${S}/blog/customize-shopify-order-confirmation-email/)
- [HubSpot custom coded email templates](${S}/blog/hubspot-custom-coded-email-template/)
- [Accessible email design](${S}/blog/accessible-email-design/)
- [New Outlook vs classic Outlook email rendering](${S}/blog/new-outlook-vs-classic-outlook-email-rendering/)
- [New Outlook breaking HTML emails](${S}/blog/new-outlook-breaking-html-email/)
- [Klaviyo email looks different in Outlook](${S}/blog/klaviyo-email-looks-different-in-outlook/)
- [DMARC setup for Klaviyo](${S}/blog/dmarc-setup-klaviyo/)
- [Warm up a new Klaviyo sending domain](${S}/blog/klaviyo-sending-domain-warm-up/)
- [Stop fake and bot signups in Klaviyo](${S}/blog/klaviyo-fake-signups-bots/)
- [Are email open rates still reliable?](${S}/blog/email-open-rates-apple-mail-privacy/)
- [Klaviyo vs Mailchimp for Shopify](${S}/blog/klaviyo-vs-mailchimp-for-shopify/)
- [Hire an email developer or an agency?](${S}/blog/hire-email-developer-vs-agency/)
- [AI-generated email templates](${S}/blog/ai-generated-email-templates/)

## Company
- [About MailStora](${S}/about/)
- [Portfolio](${S}/portfolio/)
- [Client reviews](${S}/reviews/)
- [FAQ](${S}/faq/)
- [Blog](${S}/blog/)
- [Contact](${S}/contact/) and [free quote](${S}/quote/)

## Profiles
- [Upwork](${founder.socials.upwork})
- [LinkedIn (founder)](${founder.socials.linkedin})
- [Fiverr](${founder.socials.fiverr})
`;
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
