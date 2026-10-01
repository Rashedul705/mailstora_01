// Service cards for the growth pages: one card per sub-service, each with the same shape and length
// (about 35 words of text, 4 bullets, one button). Each card names the real entities involved
// (tools, platforms, standards) so search engines and AI assistants can connect the service to them.
// Images: public/images/media/generated/<page slug>-guide-<id>.webp (scripts/image-gen/guide-images.js)

export type ServiceCard = {
    id: string;
    title: string;
    text: string;
    bullets: string[];
    entities: string[]; // named things the card is about, used in schema
    cta: { label: string; href: string };
};

export const SEO_CARDS: ServiceCard[] = [
    {
        id: "what-is-seo-aeo-geo",
        title: "SEO, AEO and GEO Strategy",
        text: "One plan for classic search, answer boxes and AI assistants. We map where your customers search, what they ask, and which pages should rank, answer or be cited on each platform.",
        bullets: ["Search Engine Optimisation for Google and Bing", "Answer Engine Optimisation for AI Overviews", "Generative Engine Optimisation for ChatGPT", "A 90-day roadmap with clear priorities"],
        entities: ["Search engine optimization", "Answer engine optimization", "Generative engine optimization", "Google Search", "Bing"],
        cta: { label: "Get My Free SEO Audit", href: "/quote/" },
    },
    {
        id: "technical-seo",
        title: "Technical SEO",
        text: "Search engines and AI crawlers must reach, read and index your pages before anything can rank. We audit and fix the technical foundations that decide whether your content is even seen.",
        bullets: ["Crawling, indexing and XML sitemaps", "Core Web Vitals: LCP, CLS and INP", "Canonicals, redirects and robots.txt", "Structured data with Schema.org"],
        entities: ["Core Web Vitals", "XML sitemap", "robots.txt", "Schema.org", "Google Search Console", "GPTBot"],
        cta: { label: "Fix My Technical SEO", href: "/quote/" },
    },
    {
        id: "on-page-seo",
        title: "On-Page SEO",
        text: "Each page should match one clear search intent. We research keywords and entities, then rewrite titles, headings, copy and internal links so every important page answers exactly what people search for.",
        bullets: ["Keyword and search intent research", "Titles, meta descriptions and one H1", "Entities and related topics covered", "Descriptive internal links and alt text"],
        entities: ["Keyword research", "Search intent", "Title tag", "Meta description", "Internal link"],
        cta: { label: "Optimise My Pages", href: "/quote/" },
    },
    {
        id: "content-seo",
        title: "Content Strategy and Topical Authority",
        text: "Search engines and AI tools trust sites that cover a topic in depth. We plan topic clusters, a pillar page with supporting guides, written for people first and linked together clearly.",
        bullets: ["Topic clusters and pillar pages", "Content calendar from real questions", "E-E-A-T: named authors and sources", "Regular updates to older posts"],
        entities: ["Topic cluster", "Pillar page", "E-E-A-T", "Content marketing"],
        cta: { label: "Plan My Content", href: "/quote/" },
    },
    {
        id: "off-page-seo",
        title: "Off-Page SEO and Digital PR",
        text: "Links and brand mentions from trusted sites tell Google, and increasingly AI assistants, that your business is credible. We earn relevant mentions through useful resources, never by buying links in bulk.",
        bullets: ["Digital PR and linkable resources", "Relevant industry directories", "Unlinked brand mentions turned into links", "Review and community profiles"],
        entities: ["Backlink", "Digital PR", "Brand mention", "Online reviews"],
        cta: { label: "Build My Authority", href: "/quote/" },
    },
    {
        id: "local-seo",
        title: "Local SEO",
        text: "For shops, clinics and service areas, local SEO puts you in the Google map pack and near-me searches. We optimise your profile, citations and reviews so nearby customers find and call you.",
        bullets: ["Google Business Profile optimisation", "Consistent name, address and phone", "Location pages with LocalBusiness schema", "A steady flow of genuine reviews"],
        entities: ["Google Business Profile", "Google Maps", "NAP citation", "LocalBusiness schema"],
        cta: { label: "Grow My Local Reach", href: "/quote/" },
    },
    {
        id: "ecommerce-seo",
        title: "Ecommerce and Shopify SEO",
        text: "Online stores fight duplicate URLs, thin categories and huge catalogues. We structure collections, product pages and feeds so Shopify and WooCommerce stores rank in search and Google Shopping.",
        bullets: ["Collection pages with useful copy", "Product and Review schema", "Faceted navigation under control", "Google Merchant Center product feeds"],
        entities: ["Shopify", "WooCommerce", "Google Merchant Center", "Google Shopping", "Product schema"],
        cta: { label: "Grow My Store Traffic", href: "/quote/" },
    },
    {
        id: "aeo",
        title: "Answer Engine Optimisation (AEO)",
        text: "AEO shapes your content so Google can lift a clear answer from it. That is how you win featured snippets, People Also Ask boxes, voice answers and a place in Google AI Overviews.",
        bullets: ["Answer-first paragraphs of 40 to 60 words", "Question-based headings", "FAQ, HowTo and Article schema", "Lists and tables that are easy to quote"],
        entities: ["Featured snippet", "People Also Ask", "Google AI Overviews", "FAQPage schema", "Voice search"],
        cta: { label: "Win More Answers", href: "/quote/" },
    },
    {
        id: "geo",
        title: "Generative Engine Optimisation (GEO)",
        text: "GEO helps AI assistants understand, trust and mention your brand. We make your business easy to verify, with consistent facts, quotable content and mentions on sources that ChatGPT, Perplexity and Gemini read.",
        bullets: ["Entity clarity with Organization schema", "Quotable facts, data and definitions", "Third-party mentions and reviews", "llms.txt and AI visibility tracking"],
        entities: ["ChatGPT", "Perplexity", "Google Gemini", "Microsoft Copilot", "llms.txt", "Organization schema"],
        cta: { label: "Get Cited by AI", href: "/quote/" },
    },
    {
        id: "measurement",
        title: "Reporting and Measurement",
        text: "You get one monthly report in plain English. It shows rankings, organic clicks, AI answer mentions and, most importantly, the leads and sales that search traffic actually brought in.",
        bullets: ["Google Search Console and GA4 data", "Rankings for your target keywords", "AI Overview and chatbot mentions", "Leads and revenue from organic search"],
        entities: ["Google Search Console", "Google Analytics 4", "Keyword ranking", "Organic traffic"],
        cta: { label: "See a Sample Report", href: "/schedule/" },
    },
];

export const ADS_CARDS: ServiceCard[] = [
    {
        id: "what-is-performance-marketing",
        title: "Performance Marketing Strategy",
        text: "Paid ads should be judged by what they return. We set targets around your margins, choose the right channels, and track every campaign against the numbers that decide profit.",
        bullets: ["ROAS and CPA targets from your margins", "Channel mix across Meta, TikTok and Google", "Customer acquisition cost and LTV", "A clear monthly testing plan"],
        entities: ["Performance marketing", "Return on ad spend", "Cost per acquisition", "Customer lifetime value"],
        cta: { label: "Get My Free Ads Review", href: "/quote/" },
    },
    {
        id: "meta-ads",
        title: "Meta Ads (Facebook and Instagram)",
        text: "Meta ads reach buyers on Facebook, Instagram, Messenger and Threads. We build campaigns for prospecting and retargeting, feed them fresh creative, and track results with the Pixel and Conversions API.",
        bullets: ["Advantage+ shopping campaigns", "Retargeting for visitors and carts", "Dynamic catalog ads from Shopify", "Meta Pixel plus Conversions API"],
        entities: ["Meta Platforms", "Facebook", "Instagram", "Meta Pixel", "Conversions API", "Advantage+"],
        cta: { label: "Start Meta Ads", href: "/quote/" },
    },
    {
        id: "tiktok-ads",
        title: "TikTok Ads",
        text: "TikTok rewards ads that feel like native content, not polished TV spots. We brief creators, boost winning organic posts with Spark Ads and track sales accurately with the TikTok Events API.",
        bullets: ["Hooks that land in two seconds", "Spark Ads and creator content", "TikTok Shop campaigns where relevant", "TikTok Pixel and Events API"],
        entities: ["TikTok", "TikTok Ads Manager", "Spark Ads", "TikTok Shop", "TikTok Events API"],
        cta: { label: "Start TikTok Ads", href: "/quote/" },
    },
    {
        id: "google-ads",
        title: "Google Ads",
        text: "Google Ads reach people already searching for what you sell. We manage Search, Shopping, Performance Max and YouTube campaigns, with tight keywords, clean product feeds and accurate conversion tracking.",
        bullets: ["Search campaigns and negative keywords", "Shopping and Performance Max", "YouTube and Demand Gen ads", "Enhanced conversions and GA4 goals"],
        entities: ["Google Ads", "Performance Max", "Google Shopping", "YouTube", "Google Merchant Center"],
        cta: { label: "Start Google Ads", href: "/quote/" },
    },
    {
        id: "chatgpt-ads",
        title: "ChatGPT and AI Search Ads",
        text: "Ads inside AI assistants are new. OpenAI has begun testing ads in ChatGPT in limited markets, and Microsoft shows ads in Copilot. We run small, measured tests where your market is eligible.",
        bullets: ["Test budgets, never core spend", "Conversational, helpful ad copy", "Compared with Google on cost per sale", "Paired with GEO for organic AI mentions"],
        entities: ["ChatGPT", "OpenAI", "Microsoft Copilot", "Microsoft Advertising"],
        cta: { label: "Ask About AI Ads", href: "/schedule/" },
    },
    {
        id: "tracking",
        title: "Tracking and Attribution",
        text: "Good decisions need numbers you can trust. Before scaling spend, we make sure GA4, Google Tag Manager and every ad platform record the same conversions, with consent respected.",
        bullets: ["GA4 ecommerce events and consent mode", "Google Tag Manager set up cleanly", "Server-side Conversions and Events APIs", "One blended view of spend and revenue"],
        entities: ["Google Analytics 4", "Google Tag Manager", "Consent mode", "Server-side tracking", "UTM parameters"],
        cta: { label: "Fix My Tracking", href: "/quote/" },
    },
    {
        id: "creative",
        title: "Creative Strategy and Testing",
        text: "On most ad platforms, creative is the biggest lever you control. We test new hooks, angles and formats every month, scale the winners and retire tired ads before costs start climbing.",
        bullets: ["Monthly hook and angle tests", "Video, carousel, static and UGC", "Ad copy written for each platform", "Winners scaled, losers paused fast"],
        entities: ["Ad creative", "A/B testing", "User-generated content", "Video advertising"],
        cta: { label: "Refresh My Creative", href: "/quote/" },
    },
    {
        id: "full-funnel",
        title: "Ads Plus Email and SMS",
        text: "Most ad visitors do not buy on the first visit. We capture them with sign-up forms and follow up with Klaviyo flows, so the clicks you already paid for keep turning into orders.",
        bullets: ["Pop-ups and landing pages for paid traffic", "Klaviyo welcome and abandoned cart flows", "Retargeting audiences from email data", "Post-purchase flows that raise LTV"],
        entities: ["Klaviyo", "Email marketing", "SMS marketing", "Landing page", "Retargeting"],
        cta: { label: "Connect Ads and Email", href: "/klaviyo-flow-setup/" },
    },
];
