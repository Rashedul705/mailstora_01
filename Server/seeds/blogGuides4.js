// Publishes ten posts on the email topics people discuss most in 2026 (new Outlook, deliverability,
// Klaviyo list quality, metrics, hiring and AI templates). Safe to re-run: upserts by slug.
// Usage (from the Server folder): node seeds/blogGuides4.js
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../src/models/Post');

const IMG = '/images/media/generated/blog-';
const FAQ = (items) => '<h2>Frequently Asked Questions</h2>\n' + items.map(([q, a]) => `<h3>${q}</h3>\n<p>${a}</p>`).join('\n');
const QUOTE = '<a href="/quote/">Request a free quote</a> and get a price within 24 hours.';

const POSTS = [
/* ───────────── 1. New vs classic Outlook ───────────── */
{
    slug: 'new-outlook-vs-classic-outlook-email-rendering',
    title: 'New Outlook vs Classic Outlook: What Changes for Your Emails in 2026',
    metaTitle: 'New Outlook vs Classic Outlook Email Rendering (2026)',
    metaDescription: 'How new Outlook and classic Outlook render HTML emails differently, what Microsoft’s move to new Outlook means for your templates, and how to code for both.',
    excerpt: 'Microsoft is moving users from classic Outlook to new Outlook. Here is how the two render emails, and why you still need to code for both.',
    category: 'Tutorial',
    tags: ['new outlook', 'outlook email rendering', 'html email templates', 'email development'],
    coverImage: IMG + 'new-outlook-vs-classic-outlook-email-rendering.webp',
    publishedAt: '2026-10-02T08:00:00Z',
    content: `
<p><strong>Short answer:</strong> classic Outlook for Windows renders emails with the Microsoft Word engine, which supports very little modern CSS. New Outlook for Windows uses the same web-based engine as Outlook on the web, so it handles modern CSS much better. Microsoft is moving people to new Outlook, but many businesses will keep classic Outlook for years. For now, every email must work in both.</p>

<h2>How the Two Engines Differ</h2>
<table>
<thead><tr><th></th><th>Classic Outlook (Windows)</th><th>New Outlook / Outlook on the web</th></tr></thead>
<tbody>
<tr><td>Rendering engine</td><td>Microsoft Word</td><td>Web browser engine</td></tr>
<tr><td>CSS background images</td><td>No (needs VML)</td><td>Yes</td></tr>
<tr><td>border-radius, max-width</td><td>No</td><td>Yes</td></tr>
<tr><td>Media queries</td><td>No</td><td>Partial</td></tr>
<tr><td>MSO conditional comments</td><td>Yes</td><td>Ignored</td></tr>
<tr><td>Dark mode</td><td>Inverts colours</td><td>Adjusts colours</td></tr>
</tbody>
</table>

<h2>What Is Happening to Classic Outlook?</h2>
<p>Microsoft is making new Outlook the default for Windows and Microsoft 365 users, and older standalone Office versions have already left support. Classic Outlook in Microsoft 365 is still available, and large companies often delay switching. So the Word engine will stay in your audience for some time, even as its share falls. Check your own email platform's client report to see how many readers still use it.</p>

<h2>How to Code for Both</h2>
<ol>
<li><strong>Keep table-based layouts.</strong> They work in both engines.</li>
<li><strong>Keep MSO fixes</strong> (ghost tables, VML backgrounds and buttons) inside conditional comments. New Outlook ignores them, so they cause no harm.</li>
<li><strong>Use progressive enhancement:</strong> rounded corners and modern CSS for new Outlook, with a clean square fallback for classic.</li>
<li><strong>Test both versions</strong> separately. They can look very different. New Outlook also has its own quirks; see <a href="/blog/new-outlook-breaking-html-email/">why new Outlook breaks some HTML emails</a>.</li>
</ol>

<h2>When Can You Drop Classic Outlook Fixes?</h2>
<p>Only when your own data says so. If classic Outlook is under 1 to 2% of opens and your audience is consumers, you can simplify. B2B senders should keep the fixes longer. Our <a href="/outlook-email-rendering-fix/">Outlook email rendering fix service</a> tests in every Outlook version, and our guide to <a href="/blog/fix-html-emails-breaking-in-outlook/">fixing emails that break in Outlook</a> covers classic Outlook in detail.</p>

${FAQ([
    ['What is the difference between new Outlook and classic Outlook for emails?', 'Classic Outlook renders emails with Microsoft Word, which ignores most modern CSS. New Outlook uses a web engine like Outlook on the web and supports much more CSS.'],
    ['Do I still need Outlook fixes in my email code?', 'Yes, as long as part of your audience uses classic Outlook. The fixes sit in conditional comments that new Outlook ignores.'],
    ['Is classic Outlook going away?', 'Microsoft is moving users to new Outlook, but classic Outlook remains in use, especially in businesses. Check your own client data before dropping support.'],
    ['Can MailStora make my emails work in both versions?', 'Yes. We build and fix templates for classic Outlook, new Outlook and 50+ other clients. ' + QUOTE],
])}`,
},

/* ───────────── 2. New Outlook breaking emails ───────────── */
{
    slug: 'new-outlook-breaking-html-email',
    title: 'New Outlook Breaking Your HTML Emails? Common Causes and Fixes',
    metaTitle: 'New Outlook Breaking HTML Emails? Causes and Fixes',
    metaDescription: 'Why emails that looked fine in classic Outlook can break in new Outlook: rewritten styles, renamed classes, spacing and dark mode issues, and how to fix them.',
    excerpt: 'New Outlook fixes many old problems, but it adds some of its own. Here is what breaks and how to fix it.',
    category: 'Tutorial',
    tags: ['new outlook', 'outlook email rendering', 'email testing', 'html email templates'],
    coverImage: IMG + 'new-outlook-breaking-html-email.webp',
    publishedAt: '2026-10-02T09:00:00Z',
    content: `
<p><strong>Short answer:</strong> new Outlook processes your email before showing it. It can rename CSS classes, remove some styles in the head, change spacing and apply its own dark mode colours. Emails that depend on classes, embedded styles or tight spacing tricks are most at risk. The fix is to inline all important styles, avoid relying on class selectors, and test in new Outlook and Outlook on the web.</p>

<h2>What Commonly Breaks</h2>
<ul>
<li><strong>Head styles ignored or changed.</strong> Class names can be prefixed, so some selectors stop matching.</li>
<li><strong>Media queries unreliable.</strong> Mobile layouts may not switch as expected.</li>
<li><strong>Spacing shifts.</strong> Default margins on paragraphs and headings can appear if you didn't reset them inline.</li>
<li><strong>Dark mode colours.</strong> Backgrounds and text can be adjusted. See our <a href="/blog/dark-mode-email-design/">dark mode guide</a>.</li>
<li><strong>Old MSO-only tricks.</strong> Layouts that only worked because of Word quirks can fall apart in the web engine.</li>
</ul>

<h2>How to Fix It</h2>
<ol>
<li><strong>Inline critical styles:</strong> colours, fonts, widths, padding and margins on each element.</li>
<li><strong>Reset margins inline</strong> on <code>p</code> and heading tags, for example <code>style="margin:0 0 16px"</code>.</li>
<li><strong>Use the hybrid method</strong> for columns so layouts stack without media queries. See <a href="/blog/responsive-email-not-working-mobile/">responsive email fixes</a>.</li>
<li><strong>Keep Outlook-only code in conditional comments</strong> so it only affects classic Outlook.</li>
<li><strong>Test in three places:</strong> classic Outlook, new Outlook and Outlook on the web.</li>
</ol>

<h2>Why It Looks Right, Then Changes</h2>
<p>Some users report an email looking correct for a moment and then shifting. That happens when the client finishes processing styles after the first display. If your layout depends on head styles alone, the second pass can undo it. Inline styles solve most of these cases.</p>

<p>Background on the two engines is in <a href="/blog/new-outlook-vs-classic-outlook-email-rendering/">new Outlook vs classic Outlook</a>. If you need fixes done for you, our <a href="/outlook-email-rendering-fix/">Outlook rendering fix service</a> sends before-and-after screenshots, and every <a href="/html-email-template-development/">custom HTML email template</a> we build is tested in all Outlook versions.</p>

${FAQ([
    ['Why does my email look different in new Outlook?', 'New Outlook processes email HTML before display and can change classes, head styles, spacing and dark mode colours.'],
    ['Does new Outlook support media queries?', 'Support is limited and inconsistent. Use hybrid layouts that work without media queries.'],
    ['Should I remove my classic Outlook fixes for new Outlook?', 'No. Keep them in conditional comments. New Outlook ignores them, and classic Outlook still needs them.'],
    ['Can MailStora fix new Outlook issues?', 'Yes. We test and repair templates for new Outlook, classic Outlook and Outlook on the web. ' + QUOTE],
])}`,
},

/* ───────────── 3. Klaviyo in Outlook ───────────── */
{
    slug: 'klaviyo-email-looks-different-in-outlook',
    title: 'Klaviyo Email Looks Different in Outlook? How to Fix It',
    metaTitle: 'Klaviyo Email Looks Different in Outlook? Fix It',
    metaDescription: 'Why Klaviyo emails look fine in Gmail but break in Outlook: oversized images, split blocks, fonts and buttons. Practical fixes inside Klaviyo’s editor.',
    excerpt: 'Klaviyo emails often look perfect in Gmail and broken in Outlook. These are the usual causes and how to fix them in the editor.',
    category: 'Tutorial',
    tags: ['klaviyo email templates', 'outlook email rendering', 'klaviyo', 'email testing'],
    coverImage: IMG + 'klaviyo-email-looks-different-in-outlook.webp',
    publishedAt: '2026-10-02T10:00:00Z',
    content: `
<p><strong>Short answer:</strong> Klaviyo emails break in Outlook mainly because classic Outlook ignores modern CSS. The common symptoms are images showing at full size, split or column blocks misaligned, fonts switching to Times New Roman, text cut off, and buttons losing their shape. Most can be fixed inside Klaviyo by setting image widths, simplifying blocks and using web-safe fallback fonts. Persistent problems need a custom-coded template.</p>

<h2>Common Symptoms and Fixes</h2>
<table>
<thead><tr><th>Symptom in Outlook</th><th>Cause</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Images huge or stretched</td><td>No fixed width</td><td>Set a width in the image block and resize the file</td></tr>
<tr><td>Columns misaligned</td><td>Nested split blocks</td><td>Use one split block per row, avoid nesting</td></tr>
<tr><td>Times New Roman text</td><td>Web font not supported</td><td>Set Arial or Helvetica as the fallback</td></tr>
<tr><td>Text cut or overlapping</td><td>Custom line heights</td><td>Use line heights in pixels or 1.4 to 1.6</td></tr>
<tr><td>Square, broken buttons</td><td>CSS-only button styles</td><td>Use Klaviyo's button block, not a text link styled as a button</td></tr>
<tr><td>Gaps between images</td><td>Image line spacing</td><td>Set image blocks to display as block, remove padding</td></tr>
</tbody>
</table>

<h2>Tips Inside Klaviyo</h2>
<ul>
<li>Preview with Klaviyo's inbox preview and send a real test to an Outlook account.</li>
<li>Avoid pasting HTML into text blocks; it can carry styles Outlook can't read.</li>
<li>Keep image text minimal; Outlook may block images by default. See <a href="/blog/email-images-not-showing/">why email images don't show</a>.</li>
<li>Check <a href="/blog/dark-mode-email-design/">dark mode</a>, which Outlook applies aggressively.</li>
</ul>

<h2>When a Custom Template Is the Better Fix</h2>
<p>If you keep fixing the same issues every campaign, the template itself is the problem. A hand-coded, editable template solves it once. Learn how in <a href="/blog/klaviyo-custom-html-template/">custom HTML templates in Klaviyo</a>, or let us build it: our <a href="/klaviyo-email-templates/">Klaviyo email templates</a> are tested in every Outlook version. For background on why Outlook behaves this way, see <a href="/blog/new-outlook-vs-classic-outlook-email-rendering/">new vs classic Outlook</a>.</p>

${FAQ([
    ['Why does my Klaviyo email look fine in Gmail but not Outlook?', 'Classic Outlook uses Microsoft Word to render emails, which ignores much of the CSS Klaviyo’s blocks rely on.'],
    ['How do I test Klaviyo emails in Outlook?', 'Use Klaviyo’s inbox preview and send a test to a real classic Outlook for Windows account.'],
    ['Can I fix Outlook issues without coding?', 'Many, yes: set image widths, simplify split blocks, use fallback fonts and Klaviyo’s button block. Deeper issues need a coded template.'],
    ['Can MailStora fix my Klaviyo templates for Outlook?', 'Yes. We fix existing templates or build new editable ones tested in 50+ clients. ' + QUOTE],
])}`,
},

/* ───────────── 4. DMARC for Klaviyo ───────────── */
{
    slug: 'dmarc-setup-klaviyo',
    title: 'DMARC Setup for Klaviyo: A Step-by-Step Guide',
    metaTitle: 'DMARC Setup for Klaviyo: Step-by-Step Guide (2026)',
    metaDescription: 'How to set up a branded sending domain, SPF, DKIM and DMARC for Klaviyo so you meet Gmail and Yahoo sender rules and keep emails out of spam.',
    excerpt: 'Gmail and Yahoo now require authenticated sending. Here is how to set up a branded domain and DMARC for Klaviyo without breaking anything.',
    category: 'Tutorial',
    tags: ['dmarc', 'email deliverability', 'klaviyo', 'email authentication'],
    coverImage: IMG + 'dmarc-setup-klaviyo.webp',
    publishedAt: '2026-10-02T11:00:00Z',
    content: `
<p><strong>Short answer:</strong> in Klaviyo, set up a <strong>branded sending domain</strong> (for example <code>send.yourstore.com</code>) under Settings, Domains. Add the DNS records Klaviyo gives you at your domain host to verify SPF and DKIM. Then add a DMARC TXT record at <code>_dmarc.yourstore.com</code>, starting with <code>v=DMARC1; p=none; rua=mailto:you@yourstore.com</code>. Monitor reports for a few weeks before moving to a stricter policy.</p>

<h2>Why It Matters</h2>
<p>Gmail and Yahoo require bulk senders to authenticate and publish a DMARC record. Without it, more of your emails land in spam or get rejected. Read the wider picture in <a href="/blog/why-emails-go-to-spam/">why emails go to spam</a>.</p>

<h2>Step 1: Set Up a Branded Sending Domain</h2>
<ol>
<li>In Klaviyo, open <strong>Settings, Domains</strong> and start the sending domain setup.</li>
<li>Choose a subdomain such as <code>send.</code> or <code>mail.</code> so your main domain's email is separate.</li>
<li>Klaviyo shows several DNS records (CNAME and TXT). Copy them exactly.</li>
</ol>

<h2>Step 2: Add the Records at Your DNS Host</h2>
<ol>
<li>Log in to where your domain's DNS is managed (Shopify, Cloudflare, GoDaddy and so on).</li>
<li>Add each record. Many hosts add your domain automatically, so enter only the host part if asked.</li>
<li>Return to Klaviyo and click verify. DNS can take from minutes to 48 hours.</li>
</ol>

<h2>Step 3: Add DMARC</h2>
<ol>
<li>Check if a DMARC record already exists at <code>_dmarc.yourdomain.com</code>. Only one is allowed.</li>
<li>If none exists, add a TXT record: host <code>_dmarc</code>, value <code>v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com</code>.</li>
<li>Read the reports (a free DMARC report tool makes them readable) to confirm all your senders pass.</li>
<li>After a few clean weeks, consider <code>p=quarantine</code>, then <code>p=reject</code>.</li>
</ol>

<h2>Step 4: Warm Up and Monitor</h2>
<p>A new sending domain needs a gradual warm-up. Follow our <a href="/blog/klaviyo-sending-domain-warm-up/">Klaviyo domain warm-up plan</a>. Then keep your list clean; see <a href="/blog/klaviyo-fake-signups-bots/">how to stop fake signups</a>.</p>
<p>Our <a href="/klaviyo-campaign-management/">Klaviyo campaign management</a> and <a href="/klaviyo-flow-setup/">flow setup</a> services include sending-domain setup and deliverability checks.</p>

${FAQ([
    ['Does Klaviyo require DMARC?', 'Gmail and Yahoo require bulk senders to have DMARC, so in practice you need it. Klaviyo recommends a branded sending domain plus DMARC.'],
    ['What DMARC policy should I start with?', 'Start with p=none to monitor. Move to quarantine and then reject only after reports show all legitimate senders pass.'],
    ['Can I have two DMARC records?', 'No. Only one DMARC record per domain is valid. Edit the existing record instead of adding a second one.'],
    ['Can MailStora set up my Klaviyo sending domain?', 'Yes. We set up branded sending, check authentication and warm up the domain. ' + QUOTE],
])}`,
},

/* ───────────── 5. Warm-up ───────────── */
{
    slug: 'klaviyo-sending-domain-warm-up',
    title: 'How to Warm Up a New Klaviyo Sending Domain',
    metaTitle: 'How to Warm Up a New Klaviyo Sending Domain',
    metaDescription: 'A practical 6-week plan to warm up a new Klaviyo sending domain: start with your most engaged subscribers, grow volume slowly and watch the right signals.',
    excerpt: 'Sending to your full list on day one from a new domain is a fast route to spam. Here is a safe warm-up plan.',
    category: 'Email Marketing',
    tags: ['klaviyo', 'email deliverability', 'domain warm up', 'email marketing'],
    coverImage: IMG + 'klaviyo-sending-domain-warm-up.webp',
    publishedAt: '2026-10-02T12:00:00Z',
    content: `
<p><strong>Short answer:</strong> warm up a new Klaviyo sending domain by sending first to your most engaged subscribers only, then growing volume step by step over about 4 to 6 weeks. Keep flows on (they go to active people), and slowly widen campaign segments from "opened or clicked in the last 30 days" to 60, 90 and 180 days. Watch open, click, bounce and spam rates, and slow down if they get worse.</p>

<h2>Why Warm-Up Matters</h2>
<p>Inbox providers don't trust a new domain yet. A sudden large send looks like spam. Positive engagement early on builds a good reputation, which decides whether future emails reach the inbox.</p>

<h2>A 6-Week Plan</h2>
<table>
<thead><tr><th>Week</th><th>Who to send to</th><th>Campaigns</th></tr></thead>
<tbody>
<tr><td>1</td><td>Engaged in last 30 days</td><td>2 to 3 sends</td></tr>
<tr><td>2</td><td>Engaged in last 30 to 60 days</td><td>3 sends</td></tr>
<tr><td>3</td><td>Engaged in last 90 days</td><td>3 sends</td></tr>
<tr><td>4</td><td>Engaged in last 120 days</td><td>3 to 4 sends</td></tr>
<tr><td>5</td><td>Engaged in last 180 days</td><td>Normal schedule</td></tr>
<tr><td>6</td><td>Full engaged list</td><td>Normal schedule</td></tr>
</tbody>
</table>
<p>Klaviyo can also run a guided warm-up for new domains. Either way, the principle is the same: engaged people first.</p>

<h2>Signals to Watch</h2>
<ul>
<li><strong>Bounce rate</strong> under 1%.</li>
<li><strong>Spam complaints</strong> under 0.1%.</li>
<li><strong>Click rate</strong> steady or rising. Open rates are less reliable; see <a href="/blog/email-open-rates-apple-mail-privacy/">are open rates still reliable</a>.</li>
<li><strong>Gmail placement</strong> using Google Postmaster Tools.</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
<li>Sending to old or imported lists early. Clean them first; see <a href="/blog/klaviyo-fake-signups-bots/">stopping fake signups</a>.</li>
<li>Skipping authentication. Set up <a href="/blog/dmarc-setup-klaviyo/">SPF, DKIM and DMARC</a> before warm-up.</li>
<li>Sending image-heavy or broken emails. Use a clean <a href="/klaviyo-email-templates/">Klaviyo email template</a>.</li>
</ul>
<p>Need a hand? Our <a href="/klaviyo-campaign-management/">Klaviyo campaign management</a> service plans and runs warm-up with the right segments.</p>

${FAQ([
    ['How long does it take to warm up a Klaviyo domain?', 'Usually 4 to 6 weeks, depending on list size and engagement.'],
    ['Can I keep my flows running during warm-up?', 'Yes. Flows go to people who just took an action, so they are highly engaged and help build reputation.'],
    ['What happens if I skip warm-up?', 'Large sends from a new domain can land in spam or be throttled, and a poor early reputation takes time to repair.'],
    ['Can MailStora manage my warm-up?', 'Yes. We set up the domain, build segments and run the warm-up schedule. ' + QUOTE],
])}`,
},

/* ───────────── 6. Fake signups ───────────── */
{
    slug: 'klaviyo-fake-signups-bots',
    title: 'How to Stop Fake and Bot Signups in Klaviyo',
    metaTitle: 'How to Stop Fake and Bot Signups in Klaviyo',
    metaDescription: 'Why fake and low-quality signups hurt deliverability, how to spot them in Klaviyo, and how to stop them with double opt-in, form settings and better offers.',
    excerpt: 'Bot signups and low-quality subscribers from big discount pop-ups damage your sender reputation. Here is how to find and stop them.',
    category: 'Email Marketing',
    tags: ['klaviyo', 'list quality', 'email deliverability', 'signup forms'],
    coverImage: IMG + 'klaviyo-fake-signups-bots.webp',
    publishedAt: '2026-10-03T08:00:00Z',
    content: `
<p><strong>Short answer:</strong> stop fake signups in Klaviyo by turning on double opt-in for your forms, blocking obvious bot patterns, and suppressing profiles that never engage. For low-quality real signups from big discount pop-ups, improve the offer and targeting rather than only raising the discount. Clean lists protect deliverability for everyone else on your list.</p>

<h2>How to Spot Fake Signups</h2>
<ul>
<li>Sudden spikes in signups at odd hours.</li>
<li>Random strings as names, or the same pattern repeated.</li>
<li>Emails that bounce immediately or never open and never click.</li>
<li>Signups from countries you don't ship to.</li>
</ul>

<h2>Fixes for Bots</h2>
<ol>
<li><strong>Double opt-in:</strong> subscribers confirm by email before joining. Bots rarely confirm.</li>
<li><strong>Form protection:</strong> use Klaviyo's form settings and spam protection options; embedded forms on custom pages can add a CAPTCHA.</li>
<li><strong>Suppress bad profiles:</strong> build a segment of profiles with bounces or no engagement since joining, then suppress them.</li>
<li><strong>Check integrations:</strong> some fake signups come from checkout or third-party apps, not forms.</li>
</ol>

<h2>Fixes for Low-Quality Real Signups</h2>
<p>Big "get 30% off" pop-ups attract people who only want the code. Some never buy or open again. Try:</p>
<ul>
<li>A smaller offer plus a clear promise about content: new drops, guides, early access.</li>
<li>Showing pop-ups after engagement (time on site or scroll), not on arrival.</li>
<li>A strong <a href="/blog/klaviyo-welcome-series/">welcome series</a> that sorts engaged subscribers from code hunters.</li>
<li>A sunset flow that removes people who never engage after 90 to 180 days.</li>
</ul>

<h2>Why This Matters for Deliverability</h2>
<p>Unengaged and fake addresses lower your engagement rates and raise bounces and complaints. That drags down inbox placement for your real customers. Pair list hygiene with <a href="/blog/dmarc-setup-klaviyo/">proper authentication</a> and read <a href="/blog/why-emails-go-to-spam/">why emails go to spam</a>. Our <a href="/klaviyo-flow-setup/">Klaviyo flow setup</a> includes welcome and sunset flows that keep your list healthy.</p>

${FAQ([
    ['Why am I getting fake signups in Klaviyo?', 'Bots fill in exposed forms, sometimes to test stolen emails or to spam. Double opt-in and form protection stop most of them.'],
    ['Does double opt-in reduce my list growth?', 'It lowers raw signup numbers, but the list is cleaner and more engaged, which usually improves revenue per subscriber.'],
    ['Should I delete unengaged subscribers?', 'Suppress them after a win-back attempt. Suppressed profiles stop receiving emails but keep their history.'],
    ['Can MailStora clean up my Klaviyo list?', 'Yes. We set up forms, welcome and sunset flows and suppression segments. ' + QUOTE],
])}`,
},

/* ───────────── 7. Open rates ───────────── */
{
    slug: 'email-open-rates-apple-mail-privacy',
    title: 'Are Email Open Rates Still Reliable in 2026?',
    metaTitle: 'Are Email Open Rates Still Reliable in 2026?',
    metaDescription: 'Why Apple Mail Privacy Protection and bot opens inflate open rates, which metrics to use instead, and how to adjust segments and A/B tests.',
    excerpt: 'Open rates look higher than ever, but many of those opens are not real. Here is what to measure instead.',
    category: 'Email Marketing',
    tags: ['email metrics', 'open rate', 'apple mail privacy protection', 'email marketing'],
    coverImage: IMG + 'email-open-rates-apple-mail-privacy.webp',
    publishedAt: '2026-10-03T09:00:00Z',
    content: `
<p><strong>Short answer:</strong> not on their own. Apple Mail Privacy Protection loads images, including tracking pixels, for many Apple Mail users whether they read the email or not, and some security scanners do the same. That inflates opens. Use click rate, conversion rate, revenue per email and unsubscribe rate as your main measures, and use opens only as a rough trend.</p>

<h2>Why Open Rates Are Inflated</h2>
<ul>
<li><strong>Apple Mail Privacy Protection</strong> preloads images, counting an open even if the email was never read.</li>
<li><strong>Security scanners</strong> in company inboxes open links and images to check them.</li>
<li><strong>Image blocking</strong> in some clients does the opposite, hiding real opens.</li>
</ul>

<h2>Better Metrics</h2>
<table>
<thead><tr><th>Metric</th><th>What it tells you</th></tr></thead>
<tbody>
<tr><td>Click rate</td><td>Real interest in the content</td></tr>
<tr><td>Placed order rate</td><td>Whether the email drives sales</td></tr>
<tr><td>Revenue per recipient</td><td>Value of each send, comparable across campaigns</td></tr>
<tr><td>Unsubscribe and spam rate</td><td>Whether you are sending too often or to the wrong people</td></tr>
</tbody>
</table>

<h2>What to Change</h2>
<ol>
<li><strong>Segments:</strong> define "engaged" by clicks, site visits or orders, not only opens.</li>
<li><strong>A/B tests:</strong> judge subject line tests by clicks or revenue, not opens.</li>
<li><strong>Sunset flows:</strong> include click and order activity so Apple users aren't kept forever.</li>
<li><strong>Design for clicks:</strong> clear buttons and one main action per email. See <a href="/blog/bulletproof-email-buttons/">bulletproof email buttons</a>.</li>
</ol>
<p>Better templates improve the metrics that matter. Our <a href="/html-email-template-development/">custom HTML email templates</a> and <a href="/klaviyo-campaign-management/">Klaviyo campaign management</a> focus on clicks and revenue. For warm-up segments that use these signals, see <a href="/blog/klaviyo-sending-domain-warm-up/">Klaviyo domain warm-up</a>.</p>

${FAQ([
    ['Why are my email open rates so high?', 'Apple Mail Privacy Protection and security scanners load tracking pixels automatically, which counts as opens even without a real read.'],
    ['What is a good click rate for email?', 'It varies by industry, but ecommerce campaigns often see 1 to 3%, and flows usually higher. Compare against your own history.'],
    ['Should I still track open rates?', 'Yes, as a trend and for spotting deliverability drops, but don’t use them as your main success measure.'],
    ['Can MailStora help improve my click rates?', 'Yes. We design and code emails built around one clear action and test them across clients. ' + QUOTE],
])}`,
},

/* ───────────── 8. Klaviyo vs Mailchimp ───────────── */
{
    slug: 'klaviyo-vs-mailchimp-for-shopify',
    title: 'Klaviyo vs Mailchimp for Shopify: Which Should You Choose?',
    metaTitle: 'Klaviyo vs Mailchimp for Shopify: Which to Choose',
    metaDescription: 'Klaviyo vs Mailchimp for Shopify stores: data sync, flows, segmentation, templates and pricing compared, with a simple guide to choosing.',
    excerpt: 'Both platforms can run email for a Shopify store, but they fit different needs. Here is an honest comparison.',
    category: 'Business Growth',
    tags: ['klaviyo', 'mailchimp', 'shopify', 'email platforms'],
    coverImage: IMG + 'klaviyo-vs-mailchimp-for-shopify.webp',
    publishedAt: '2026-10-03T10:00:00Z',
    content: `
<p><strong>Short answer:</strong> Klaviyo is usually the better choice for Shopify stores that want advanced automation, deep segmentation and revenue reporting, because it syncs Shopify data in detail. Mailchimp can be simpler and cheaper for small stores with basic needs or for businesses that sell outside Shopify too. Check current pricing for your list size, as both charge by contacts.</p>

<h2>Side-by-Side Comparison</h2>
<table>
<thead><tr><th></th><th>Klaviyo</th><th>Mailchimp</th></tr></thead>
<tbody>
<tr><td>Shopify data</td><td>Deep: products, orders, browsing, catalog</td><td>Available via integration, less detailed</td></tr>
<tr><td>Automation</td><td>Advanced flows with many triggers and splits</td><td>Customer journeys, simpler</td></tr>
<tr><td>Segmentation</td><td>Very detailed, predictive data</td><td>Good for basics</td></tr>
<tr><td>Templates</td><td>Drag-and-drop, hybrid and HTML</td><td>Drag-and-drop and custom HTML</td></tr>
<tr><td>SMS</td><td>Built in</td><td>Available in some regions</td></tr>
<tr><td>Best for</td><td>Growing ecommerce brands</td><td>Small stores, mixed businesses</td></tr>
</tbody>
</table>

<h2>Choose Klaviyo If</h2>
<ul>
<li>Email drives a big part of your revenue.</li>
<li>You need flows like <a href="/blog/klaviyo-abandoned-cart-flow/">abandoned cart</a>, browse abandonment and <a href="/blog/klaviyo-welcome-series/">welcome series</a> with product data.</li>
<li>You want revenue attribution per email and flow.</li>
</ul>

<h2>Choose Mailchimp If</h2>
<ul>
<li>You have a small list and simple newsletters.</li>
<li>You sell on several platforms, not only Shopify.</li>
<li>Budget matters more than advanced automation.</li>
</ul>

<h2>Switching Platforms</h2>
<p>Moving from Mailchimp to Klaviyo means exporting contacts with consent status, rebuilding flows and recreating templates. Plan a <a href="/blog/klaviyo-sending-domain-warm-up/">domain warm-up</a> for the new platform. We rebuild templates for both: <a href="/klaviyo-email-templates/">Klaviyo email templates</a> and <a href="/mailchimp-email-templates/">Mailchimp email templates</a>. To bring your own design into Mailchimp, see <a href="/blog/import-custom-html-template-mailchimp/">importing a custom template</a>.</p>

${FAQ([
    ['Is Klaviyo better than Mailchimp for Shopify?', 'For most growing Shopify stores, yes, because of its deeper Shopify data, flows and segmentation. Mailchimp suits smaller or simpler setups.'],
    ['Is Klaviyo more expensive than Mailchimp?', 'Often, at the same list size. Compare current pricing for your contact count and expected email volume.'],
    ['Can I move my templates from Mailchimp to Klaviyo?', 'The design can be moved, but templates need to be rebuilt or adapted for Klaviyo’s editor and tags.'],
    ['Can MailStora help me switch platforms?', 'Yes. We rebuild templates and flows on the new platform and test everything. ' + QUOTE],
])}`,
},

/* ───────────── 9. Developer vs agency ───────────── */
{
    slug: 'hire-email-developer-vs-agency',
    title: 'Hire an Email Developer or an Agency? How to Decide',
    metaTitle: 'Hire an Email Developer or an Agency? How to Decide',
    metaDescription: 'Freelancer, in-house developer or email development agency: compare cost, speed, quality and risk, and see which option fits your volume and budget.',
    excerpt: 'Choosing who builds your emails affects cost, speed and quality. Here is a clear way to compare freelancers, in-house hires and agencies.',
    category: 'Business Growth',
    tags: ['hire email developer', 'email development agency', 'html email templates', 'outsourcing'],
    coverImage: IMG + 'hire-email-developer-vs-agency.webp',
    publishedAt: '2026-10-03T11:00:00Z',
    content: `
<p><strong>Short answer:</strong> hire a freelancer for small, one-off projects on a tight budget. Hire in-house when you send a large, steady volume and need someone full-time. Choose an email development agency when you need reliable quality, fast turnaround, testing across many clients and cover for platforms like Klaviyo, Mailchimp and HubSpot, without the cost of a full-time hire.</p>

<h2>Comparison</h2>
<table>
<thead><tr><th></th><th>Freelancer</th><th>In-house</th><th>Agency</th></tr></thead>
<tbody>
<tr><td>Cost</td><td>Low per project</td><td>Salary and benefits</td><td>Per project or monthly</td></tr>
<tr><td>Speed</td><td>Depends on availability</td><td>Fast once hired</td><td>Fast, with backup people</td></tr>
<tr><td>Testing</td><td>Varies</td><td>Needs tools</td><td>Usually included</td></tr>
<tr><td>Platforms</td><td>Often one or two</td><td>Your stack</td><td>Many</td></tr>
<tr><td>Risk</td><td>Single point of failure</td><td>Hiring and training</td><td>Lower, contract based</td></tr>
</tbody>
</table>

<h2>Questions to Ask Any Option</h2>
<ol>
<li>Can I see live examples that work in Outlook and on mobile?</li>
<li>Which email clients do you test in? Outlook, Gmail and dark mode should be included. See our <a href="/blog/email-testing-checklist/">testing checklist</a>.</li>
<li>Will the templates be editable in my platform?</li>
<li>What is the turnaround and how many revisions are included?</li>
<li>Who owns the code, and do you offer support after delivery?</li>
</ol>

<h2>Red Flags</h2>
<ul>
<li>Templates built with divs, flexbox or a single image.</li>
<li>No mention of Outlook or testing.</li>
<li>Very low prices with no revisions or support.</li>
<li>Code generated by AI and not tested. See <a href="/blog/ai-generated-email-templates/">AI-generated email templates</a>.</li>
</ul>

<p>For typical costs, read <a href="/blog/html-email-template-cost/">how much a custom HTML email template costs</a>, and compare options in <a href="/blog/best-custom-email-template-development-agencies/">best email template development agencies</a>. Agencies that resell email work can also use a <a href="/blog/white-label-email-development-agencies/">white-label partner</a>. MailStora offers <a href="/html-email-template-development/">hand-coded email templates</a> from $40 with testing in 50+ clients; see <a href="/pricing/">pricing</a>.</p>

${FAQ([
    ['How much does it cost to hire an email developer?', 'Freelance rates and agency prices vary widely. Custom templates commonly range from about $40 for simple builds to several hundred dollars for complex modular systems.'],
    ['Is it better to hire a freelancer or an agency for email templates?', 'A freelancer suits small one-off jobs. An agency suits ongoing work, tight deadlines and projects that need broad testing and platform knowledge.'],
    ['What should an email developer deliver?', 'Tested, responsive, table-based HTML that is editable in your platform, plus test screenshots and support for fixes.'],
    ['How do I start with MailStora?', 'Send your design or brief through the quote form. ' + QUOTE],
])}`,
},

/* ───────────── 10. AI templates ───────────── */
{
    slug: 'ai-generated-email-templates',
    title: 'AI-Generated Email Templates: Do They Work in Real Inboxes?',
    metaTitle: 'AI-Generated Email Templates: Do They Work?',
    metaDescription: 'Can AI tools generate HTML email templates that work in Outlook, Gmail and dark mode? Common problems with AI email code and how to fix or avoid them.',
    excerpt: 'AI tools can produce an email template in seconds. Whether it survives Outlook, Gmail and dark mode is another question.',
    category: 'Tutorial',
    tags: ['ai email templates', 'html email templates', 'outlook email rendering', 'email development'],
    coverImage: IMG + 'ai-generated-email-templates.webp',
    publishedAt: '2026-10-03T12:00:00Z',
    content: `
<p><strong>Short answer:</strong> AI tools can generate a good starting point, but the HTML often breaks in real inboxes. Common problems are div and flexbox layouts, missing Outlook code, styles left in the head instead of inline, large file sizes and no dark mode handling. AI output is useful for ideas and drafts; production templates still need email-specific coding and testing.</p>

<h2>Why AI Email Code Breaks</h2>
<ul>
<li><strong>Web layouts, not email layouts.</strong> Flexbox and grid work in browsers but not in classic Outlook.</li>
<li><strong>No MSO fixes.</strong> Ghost tables, VML backgrounds and buttons are usually missing. See <a href="/blog/outlook-background-images-vml/">background images in Outlook</a>.</li>
<li><strong>Styles not inlined.</strong> Some clients strip or change head styles; see <a href="/blog/new-outlook-breaking-html-email/">new Outlook issues</a>.</li>
<li><strong>Heavy code</strong> that pushes past <a href="/blog/gmail-clipping-102kb-limit/">Gmail's 102 KB limit</a>.</li>
<li><strong>No dark mode or accessibility work.</strong> See <a href="/blog/dark-mode-email-design/">dark mode</a> and <a href="/blog/accessible-email-design/">accessible email design</a>.</li>
<li><strong>Not platform-ready.</strong> Missing Klaviyo, Mailchimp or HubSpot editable tags.</li>
</ul>

<h2>How to Use AI Well</h2>
<ol>
<li>Ask for <strong>table-based HTML with inline styles</strong> and Outlook conditional comments.</li>
<li>Use AI for <strong>copy, subject lines and layout ideas</strong>, where it helps most.</li>
<li>Run the output through an inliner and check the file size.</li>
<li>Test in classic Outlook, Gmail, Apple Mail and on mobile with our <a href="/blog/email-testing-checklist/">testing checklist</a>.</li>
<li>Add your platform's editable tags so the team can edit it later.</li>
</ol>

<h2>AI Draft vs Production Template</h2>
<table>
<thead><tr><th></th><th>AI draft</th><th>Production template</th></tr></thead>
<tbody>
<tr><td>Speed</td><td>Seconds</td><td>24 to 48 hours</td></tr>
<tr><td>Outlook support</td><td>Rare</td><td>Tested</td></tr>
<tr><td>Editable in your platform</td><td>No</td><td>Yes</td></tr>
<tr><td>Dark mode and accessibility</td><td>Not usually</td><td>Built in</td></tr>
</tbody>
</table>
<p>If you have an AI-made template that breaks, our <a href="/outlook-email-rendering-fix/">email rendering fix service</a> can repair it, or we can rebuild it as a <a href="/html-email-template-development/">custom HTML email template</a>. Deciding who should build it? Read <a href="/blog/hire-email-developer-vs-agency/">email developer vs agency</a>.</p>

${FAQ([
    ['Can ChatGPT or other AI tools make HTML email templates?', 'They can create a draft, but the code often lacks Outlook support, inline styles and platform tags, so it needs fixing and testing.'],
    ['Why does my AI-generated email break in Outlook?', 'It usually uses divs, flexbox or modern CSS that classic Outlook’s Word engine does not support.'],
    ['Is AI going to replace email developers?', 'AI speeds up drafts and copy, but reliable rendering across clients still needs email-specific knowledge and testing.'],
    ['Can MailStora fix an AI-made email template?', 'Yes. We repair or rebuild it with tested, editable code. ' + QUOTE],
])}`,
},
];

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    for (const p of POSTS) {
        const words = p.content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
        await Post.updateOne(
            { slug: p.slug },
            { $set: { ...p, status: 'published', author: { name: 'Rashedul Islam' }, publishedAt: new Date(p.publishedAt), readingTime: Math.ceil(words / 200) } },
            { upsert: true }
        );
        console.log(`${p.slug}: ${words} words, title ${p.metaTitle.length}, description ${p.metaDescription.length}`);
    }
    await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
