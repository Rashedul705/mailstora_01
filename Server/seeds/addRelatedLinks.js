// Adds a "Related guides" block to the older posts, linking them to the newer guides.
// Edits seeds/expanded/<slug>.html in place (skips links a post already has), then run applyExpanded.js.
// Usage (from the Server folder): node seeds/addRelatedLinks.js
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'expanded');

const TITLES = {
    'new-outlook-vs-classic-outlook-email-rendering': 'New Outlook vs classic Outlook: what changes for your emails',
    'new-outlook-breaking-html-email': 'Why new Outlook breaks some HTML emails',
    'klaviyo-email-looks-different-in-outlook': 'Klaviyo email looks different in Outlook? How to fix it',
    'outlook-background-images-vml': 'Background images in Outlook with VML',
    'bulletproof-email-buttons': 'Bulletproof email buttons that work everywhere',
    'email-images-not-showing': 'Email images not showing: 7 causes and fixes',
    'responsive-email-not-working-mobile': 'Email not responsive on mobile? How to fix it',
    'accessible-email-design': 'Accessible email design for marketers',
    'klaviyo-custom-html-template': 'Custom HTML templates in Klaviyo that stay editable',
    'import-custom-html-template-mailchimp': 'How to import a custom HTML template into Mailchimp',
    'hubspot-custom-coded-email-template': 'HubSpot custom coded email templates',
    'customize-shopify-order-confirmation-email': 'How to customize Shopify order confirmation emails',
    'why-emails-go-to-spam': 'Why your emails go to spam and how to fix it',
    'dmarc-setup-klaviyo': 'DMARC setup for Klaviyo, step by step',
    'klaviyo-sending-domain-warm-up': 'How to warm up a new Klaviyo sending domain',
    'klaviyo-fake-signups-bots': 'How to stop fake and bot signups in Klaviyo',
    'email-open-rates-apple-mail-privacy': 'Are email open rates still reliable?',
    'klaviyo-vs-mailchimp-for-shopify': 'Klaviyo vs Mailchimp for Shopify stores',
    'hire-email-developer-vs-agency': 'Hire an email developer or an agency?',
    'ai-generated-email-templates': 'AI-generated email templates: do they work?',
};

// Older post -> newer guides that fit its topic (first four not already linked are used)
const MAP = {
    'fix-html-emails-breaking-in-outlook': ['new-outlook-vs-classic-outlook-email-rendering', 'new-outlook-breaking-html-email', 'outlook-background-images-vml', 'bulletproof-email-buttons', 'klaviyo-email-looks-different-in-outlook'],
    'klaviyo-abandoned-cart-flow': ['klaviyo-custom-html-template', 'klaviyo-fake-signups-bots', 'email-open-rates-apple-mail-privacy', 'klaviyo-vs-mailchimp-for-shopify', 'dmarc-setup-klaviyo'],
    'figma-to-html-email-handoff-checklist': ['bulletproof-email-buttons', 'responsive-email-not-working-mobile', 'accessible-email-design', 'ai-generated-email-templates', 'outlook-background-images-vml'],
    'html-email-template-cost': ['hire-email-developer-vs-agency', 'ai-generated-email-templates', 'klaviyo-custom-html-template', 'import-custom-html-template-mailchimp', 'hubspot-custom-coded-email-template'],
    'add-html-signature-gmail': ['email-images-not-showing', 'why-emails-go-to-spam', 'accessible-email-design', 'new-outlook-vs-classic-outlook-email-rendering'],
    'add-html-signature-outlook': ['new-outlook-vs-classic-outlook-email-rendering', 'new-outlook-breaking-html-email', 'email-images-not-showing', 'outlook-background-images-vml'],
    'best-custom-email-template-development-agencies': ['hire-email-developer-vs-agency', 'ai-generated-email-templates', 'klaviyo-custom-html-template', 'hubspot-custom-coded-email-template', 'import-custom-html-template-mailchimp'],
    'gmail-clipping-102kb-limit': ['why-emails-go-to-spam', 'email-images-not-showing', 'responsive-email-not-working-mobile', 'ai-generated-email-templates', 'klaviyo-email-looks-different-in-outlook'],
    'klaviyo-welcome-series': ['klaviyo-fake-signups-bots', 'klaviyo-sending-domain-warm-up', 'email-open-rates-apple-mail-privacy', 'klaviyo-custom-html-template', 'dmarc-setup-klaviyo'],
    'dark-mode-email-design': ['accessible-email-design', 'new-outlook-breaking-html-email', 'bulletproof-email-buttons', 'email-images-not-showing', 'outlook-background-images-vml'],
    'email-testing-checklist': ['new-outlook-vs-classic-outlook-email-rendering', 'email-images-not-showing', 'responsive-email-not-working-mobile', 'accessible-email-design', 'why-emails-go-to-spam', 'bulletproof-email-buttons'],
    'white-label-email-development-agencies': ['hire-email-developer-vs-agency', 'ai-generated-email-templates', 'hubspot-custom-coded-email-template', 'klaviyo-custom-html-template', 'import-custom-html-template-mailchimp'],
};

const MARK = '<h2>Related Guides</h2>';

for (const [slug, targets] of Object.entries(MAP)) {
    const file = path.join(DIR, `${slug}.html`);
    let html = fs.readFileSync(file, 'utf8');
    if (html.includes(MARK)) { console.log(`${slug}: already has related guides`); continue; }
    const picks = targets.filter((t) => !html.includes(`/blog/${t}/`)).slice(0, 4);
    if (!picks.length) { console.log(`${slug}: nothing new to add`); continue; }
    const block = `${MARK}\n<p>Keep reading with these guides on related problems:</p>\n<ul>\n${picks.map((t) => `<li><a href="/blog/${t}/">${TITLES[t]}</a></li>`).join('\n')}\n</ul>\n\n`;
    const at = html.search(/<h2[^>]*>\s*Frequently Asked Questions/i);
    html = at === -1 ? html + '\n' + block : html.slice(0, at) + block + html.slice(at);
    fs.writeFileSync(file, html);
    console.log(`${slug}: +${picks.length} (${picks.join(', ')})`);
}
