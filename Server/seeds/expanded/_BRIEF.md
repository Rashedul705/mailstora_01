# Brief: expand MailStora blog posts

MailStora is an HTML email development agency. It sells hand-coded email templates, Klaviyo flows and templates, Outlook and email rendering fixes, and email signatures to ecommerce brands and agencies. Templates start at $40, are tested in 50+ clients and delivered in 24–48 hours. The author is Rashedul Islam.

## Your job
For each slug assigned to you:
1. Read the current post: `Server/seeds/expanded/_current_<slug>.txt` (HTML).
2. Write an expanded version to `Server/seeds/expanded/<slug>.html`. Aim for **1,200–1,500 words** of visible text.
3. Do NOT touch the database, other files or other slugs. Do NOT run any seed scripts.

## Rules for the content
- Plain HTML fragment only: p, h2, h3, ul, ol, li, table/thead/tbody/tr/th/td, strong, em, code, a. No html/head/body, no inline styles, no images, no h1.
- Keep the opening `<p><strong>Short answer:</strong> ...</p>` (you may improve it). It must answer the query in 2–4 sentences.
- Keep all existing sections and facts; expand them with depth: concrete steps, examples, code snippets in `<code>` (escape < and > as &lt; &gt;), common mistakes, a mini checklist or table where it helps, and a short real-world scenario.
- Must end with `<h2>Frequently Asked Questions</h2>` followed by 5–6 `<h3>` question + `<p>` answer pairs (the site builds FAQ schema from this). The last FAQ is about how MailStora can help and links to `/quote/`.
- Plain, simple English. Short sentences. No hype, no invented statistics, no made-up case study numbers, no fake quotes. If unsure a fact is current, phrase it cautiously ("at the time of writing", "check current pricing").
- Keep every existing internal link. Total internal links 8–14 per post, all with trailing slash. Use ONLY these URLs:
  - Services: /html-email-template-development/ /figma-to-html-email/ /klaviyo-email-templates/ /mailchimp-email-templates/ /hubspot-email-templates/ /transactional-email-templates/ /newsletter-email-templates/ /outlook-email-rendering-fix/ /html-email-signature-design/ /outlook-email-signature/ /gmail-email-signature/ /klaviyo-flow-setup/ /klaviyo-campaign-management/ /white-label-email-development/ /shopify-development/
  - Pages: /pricing/ /quote/ /portfolio/ /case-studies/ /about/
  - Case studies: /case-studies/canadian-choice-windows-doors/ /case-studies/saas-onboarding-sequence/ /case-studies/corporate-email-signature/ /case-studies/e-commerce-seasonal-promo/
  - Portfolio: /portfolio/order-confirmation-transactional-email/ /portfolio/saas-welcome-onboarding-email/ /portfolio/weekly-marketing-newsletter-email/ /portfolio/abandoned-cart-recovery-email/ /portfolio/black-friday-sale-email/ /portfolio/fashion-new-collection-launch-email/ /portfolio/professional-html-email-signature/
  - Blog posts: /blog/<slug>/ for any of: fix-html-emails-breaking-in-outlook klaviyo-abandoned-cart-flow figma-to-html-email-handoff-checklist html-email-template-cost add-html-signature-gmail add-html-signature-outlook best-custom-email-template-development-agencies gmail-clipping-102kb-limit klaviyo-welcome-series dark-mode-email-design email-testing-checklist white-label-email-development-agencies import-custom-html-template-mailchimp klaviyo-custom-html-template email-images-not-showing why-emails-go-to-spam responsive-email-not-working-mobile outlook-background-images-vml bulletproof-email-buttons customize-shopify-order-confirmation-email hubspot-custom-coded-email-template accessible-email-design new-outlook-vs-classic-outlook-email-rendering new-outlook-breaking-html-email klaviyo-email-looks-different-in-outlook dmarc-setup-klaviyo klaviyo-sending-domain-warm-up klaviyo-fake-signups-bots email-open-rates-apple-mail-privacy klaviyo-vs-mailchimp-for-shopify hire-email-developer-vs-agency ai-generated-email-templates
  - Never link a post to itself. Use descriptive anchors (no "click here").
- Add 1–2 natural mentions of MailStora's relevant service mid-article, not only at the end.

## Check before finishing
Run for each file: `node -e "const s=require('fs').readFileSync(process.argv[1],'utf8');console.log(s.replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean).length)" <file>` and confirm 1,200+ words. Confirm tags are balanced and the FAQ heading exists.

Report back: slug, word count, number of internal links. Nothing else.
