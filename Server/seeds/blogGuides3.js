// Publishes ten problem-and-guide posts for email marketers, store owners and agencies.
// Safe to re-run: upserts by slug. Usage (from the Server folder): node seeds/blogGuides3.js
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../src/models/Post');

const IMG = '/images/media/generated/blog-';
const FAQ = (items) => '<h2>Frequently Asked Questions</h2>\n' + items.map(([q, a]) => `<h3>${q}</h3>\n<p>${a}</p>`).join('\n');
const QUOTE = '<a href="/quote/">Request a free quote</a> and get a price within 24 hours.';

const POSTS = [
/* ───────────── 1. Mailchimp import ───────────── */
{
    slug: 'import-custom-html-template-mailchimp',
    title: 'How to Import a Custom HTML Email Template Into Mailchimp',
    metaTitle: 'How to Import a Custom HTML Template Into Mailchimp',
    metaDescription: 'Step-by-step guide to importing a custom HTML email template into Mailchimp, making sections editable with mc:edit, and avoiding common upload problems.',
    excerpt: 'Mailchimp lets you upload your own HTML, but the editing experience depends on how the code is prepared. Here is the right way to do it.',
    category: 'Tutorial',
    tags: ['mailchimp email templates', 'custom html email templates', 'mailchimp', 'email template upload'],
    coverImage: IMG + 'import-custom-html-template-mailchimp.webp',
    publishedAt: '2026-09-30T08:00:00Z',
    content: `
<p><strong>Short answer:</strong> in Mailchimp, go to <strong>Content, Email templates, Create template, Code your own</strong>, then choose <strong>Import HTML</strong> and upload your .html file or a .zip with the HTML and images. To let your team edit text and images later, the template needs Mailchimp's editable tags (such as <code>mc:edit</code>) added before import. Without them, every change means editing code.</p>

<h2>Before You Import: Prepare the Template</h2>
<ul>
<li><strong>Host images online</strong> or include them in the .zip. Local paths like <code>C:/images/logo.png</code> will break.</li>
<li><strong>Add editable regions:</strong> put <code>mc:edit="header_text"</code> on text blocks and images your team will change. Each name must be unique.</li>
<li><strong>Add repeatable blocks</strong> with <code>mc:repeatable</code> and <code>mc:variant</code> if you want to add or swap sections, like product rows.</li>
<li><strong>Keep required merge tags:</strong> the footer must include <code>*|UNSUB|*</code> and your address tags, or Mailchimp will warn you.</li>
<li><strong>Keep code lean.</strong> Heavy code can trigger <a href="/blog/gmail-clipping-102kb-limit/">Gmail clipping at 102 KB</a>.</li>
</ul>

<h2>Step by Step: Import Into Mailchimp</h2>
<ol>
<li>Open <strong>Content</strong>, then <strong>Email templates</strong>.</li>
<li>Click <strong>Create template</strong> and choose <strong>Code your own</strong>.</li>
<li>Select <strong>Import HTML</strong> and upload the .html or .zip file.</li>
<li>Name the template and save it.</li>
<li>Create a new email campaign and choose the template under <strong>Saved templates</strong>.</li>
<li>Click each editable area to confirm it can be changed without code.</li>
<li>Send a test to Gmail and Outlook before using it for real.</li>
</ol>

<h2>Common Problems After Import</h2>
<table>
<thead><tr><th>Problem</th><th>Likely cause</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Can't edit anything</td><td>No mc:edit tags</td><td>Add editable regions and re-import</td></tr>
<tr><td>Images missing</td><td>Local file paths</td><td>Host images or upload them in the .zip</td></tr>
<tr><td>Layout breaks in Outlook</td><td>Div-based or modern CSS layout</td><td>Rebuild with tables and Outlook fixes</td></tr>
<tr><td>Styles lost</td><td>CSS in an external file</td><td>Inline the CSS</td></tr>
</tbody>
</table>
<p>If Outlook is the problem, read <a href="/blog/fix-html-emails-breaking-in-outlook/">how to fix HTML emails that break in Outlook</a>.</p>

<h2>Classic Builder vs New Builder</h2>
<p>Mailchimp's newer email builder works best with its own drag-and-drop blocks, while custom-coded templates open in the classic editor. That is fine for most teams: the template keeps its exact design, and editable regions keep day-to-day changes simple. Our <a href="/mailchimp-email-templates/">Mailchimp email templates service</a> delivers templates already tagged, tested and imported into your account.</p>
<p>Starting from a design file? See our <a href="/figma-to-html-email/">Figma to HTML email conversion</a> service and the <a href="/blog/figma-to-html-email-handoff-checklist/">handoff checklist</a>.</p>

${FAQ([
    ['Can I upload my own HTML template to Mailchimp?', 'Yes. Use Content, Email templates, Create template, Code your own, then Import HTML. You can upload a single .html file or a .zip that includes images.'],
    ['Why can’t I edit my imported Mailchimp template?', 'The template has no Mailchimp editable tags. Add mc:edit attributes to text and image areas, then import it again.'],
    ['Does Mailchimp support responsive custom templates?', 'Yes. Mailchimp sends your HTML as it is, so a well-built responsive template stays responsive.'],
    ['Can MailStora build and import a Mailchimp template for me?', 'Yes. We code, tag, test and upload templates into your Mailchimp account. ' + QUOTE],
])}`,
},

/* ───────────── 2. Klaviyo custom HTML ───────────── */
{
    slug: 'klaviyo-custom-html-template',
    title: 'Custom HTML Templates in Klaviyo: How to Keep Them Editable',
    metaTitle: 'Custom HTML Templates in Klaviyo: Keep Them Editable',
    metaDescription: 'How to use custom HTML email templates in Klaviyo without losing drag-and-drop editing: hybrid templates, editable regions, product blocks and saved blocks.',
    excerpt: 'Custom HTML gives you full design control in Klaviyo, but a pure code template is hard for a team to edit. Here is how to get both.',
    category: 'Tutorial',
    tags: ['klaviyo email templates', 'custom html email templates', 'klaviyo', 'ecommerce email'],
    coverImage: IMG + 'klaviyo-custom-html-template.webp',
    publishedAt: '2026-09-30T09:00:00Z',
    content: `
<p><strong>Short answer:</strong> Klaviyo supports three kinds of templates: drag-and-drop, full HTML, and hybrid. A full HTML template gives total design control, but only people who can code can change it. The best option for most stores is a <strong>hybrid template</strong> or HTML with <strong>editable regions</strong>: the layout is custom-coded, while text, images and buttons stay editable in Klaviyo's editor.</p>

<h2>The Three Template Options in Klaviyo</h2>
<table>
<thead><tr><th>Type</th><th>Design control</th><th>Easy editing</th><th>Best for</th></tr></thead>
<tbody>
<tr><td>Drag-and-drop</td><td>Limited</td><td>Yes</td><td>Simple campaigns</td></tr>
<tr><td>Full HTML</td><td>Total</td><td>Only with code</td><td>Fixed flow emails</td></tr>
<tr><td>Hybrid / editable HTML</td><td>High</td><td>Yes</td><td>Most brands</td></tr>
</tbody>
</table>

<h2>How to Make a Custom Template Editable</h2>
<ol>
<li><strong>Use editable regions:</strong> mark text and images with Klaviyo's editable attributes so they open in the visual editor.</li>
<li><strong>Build reusable sections:</strong> header, hero, product grid, testimonial and footer as separate blocks.</li>
<li><strong>Save universal blocks</strong> for the header and footer so one change updates every email.</li>
<li><strong>Use dynamic product feeds</strong> instead of hard-coded products, so best sellers and recommendations stay current.</li>
<li><strong>Add fallbacks for personalisation,</strong> for example <code>{{ first_name|default:'there' }}</code>.</li>
</ol>

<h2>Common Problems</h2>
<ul>
<li><strong>The editor changes your code:</strong> editing HTML in the drag-and-drop editor can rewrite it. Keep code edits in the HTML editor.</li>
<li><strong>Layout breaks in Outlook:</strong> the template needs table-based code and Outlook fixes. See <a href="/blog/fix-html-emails-breaking-in-outlook/">why emails break in Outlook</a>.</li>
<li><strong>Emails get clipped in Gmail:</strong> keep the HTML under 102 KB. See <a href="/blog/gmail-clipping-102kb-limit/">how to fix Gmail clipping</a>.</li>
<li><strong>Images look wrong in dark mode:</strong> see our <a href="/blog/dark-mode-email-design/">dark mode email design guide</a>.</li>
</ul>

<h2>Where Custom Templates Pay Off</h2>
<p>A branded system used across campaigns and flows keeps every email consistent: <a href="/blog/klaviyo-welcome-series/">welcome series</a>, <a href="/blog/klaviyo-abandoned-cart-flow/">abandoned cart</a>, browse abandonment and post-purchase. Our <a href="/klaviyo-email-templates/">custom Klaviyo email templates</a> are built as editable modular systems, and our <a href="/klaviyo-flow-setup/">Klaviyo flow setup</a> service puts them to work.</p>

${FAQ([
    ['Can I use custom HTML in Klaviyo?', 'Yes. You can create a template from HTML in Klaviyo, or build a hybrid template with custom-coded sections that remain editable.'],
    ['Will a custom HTML template work with Klaviyo’s drag-and-drop editor?', 'Only if it is built for it. Templates with editable regions or hybrid blocks open in the visual editor; plain HTML templates only open in the code editor.'],
    ['Can dynamic product blocks be used in a custom template?', 'Yes. Custom templates can include Klaviyo product feeds and event data, for example the items left in a cart.'],
    ['Can MailStora build my Klaviyo templates?', 'Yes. We build editable Klaviyo template systems and test them in 50+ email clients. ' + QUOTE],
])}`,
},

/* ───────────── 3. Images not showing ───────────── */
{
    slug: 'email-images-not-showing',
    title: 'Email Images Not Showing? 7 Causes and How to Fix Them',
    metaTitle: 'Email Images Not Showing? 7 Causes and Fixes',
    metaDescription: 'Why images do not show in your emails in Gmail, Outlook and Apple Mail, and how to fix blocked images, broken links, file sizes and missing alt text.',
    excerpt: 'Broken or missing images make an email look unprofessional. These are the seven most common causes and the fix for each.',
    category: 'Tutorial',
    tags: ['email images', 'outlook email rendering', 'email testing', 'html email templates'],
    coverImage: IMG + 'email-images-not-showing.webp',
    publishedAt: '2026-09-30T10:00:00Z',
    content: `
<p><strong>Short answer:</strong> email images usually fail to show for one of seven reasons: the reader's client blocks images by default, the image path is local or broken, the image is on an insecure (HTTP) server, the file is too large, the format is not supported, Outlook ignores the size or a background image, or a firewall blocks your image host. Most of these are fixed in the template code.</p>

<h2>7 Causes and Fixes</h2>
<ol>
<li><strong>Images blocked by default.</strong> Some Outlook setups and company inboxes block images until the reader allows them. Fix: never put key text only inside images, and always write useful alt text.</li>
<li><strong>Local or broken image paths.</strong> A path like <code>file:///</code> or <code>C:/</code> only works on your computer. Fix: host images online and use full <code>https://</code> URLs.</li>
<li><strong>HTTP instead of HTTPS.</strong> Many clients block images from insecure servers. Fix: host every image on HTTPS.</li>
<li><strong>Files too large.</strong> Heavy images load slowly or time out on mobile. Fix: keep most images under 200 KB and size them at twice the display width for sharp screens.</li>
<li><strong>Unsupported formats.</strong> SVG and WebP do not work everywhere. Fix: use JPG, PNG or GIF for email.</li>
<li><strong>Outlook sizing and background images.</strong> Outlook ignores CSS width on images and CSS background images. Fix: set the <code>width</code> attribute on the image and use VML for backgrounds. See <a href="/blog/outlook-background-images-vml/">background images in Outlook</a>.</li>
<li><strong>Blocked image hosts.</strong> Company firewalls can block some file-sharing services. Fix: host images on your email platform or your own domain, not on Google Drive or Dropbox.</li>
</ol>

<h2>Design for Images Off</h2>
<ul>
<li>Use live HTML text for headlines, offers and buttons.</li>
<li>Give images a background colour so the layout still holds its shape.</li>
<li>Write alt text that tells the story: "20% off all boots this weekend", not "banner1.jpg".</li>
<li>Make buttons from code, not images. See <a href="/blog/bulletproof-email-buttons/">bulletproof email buttons</a>.</li>
</ul>

<h2>Test Before You Send</h2>
<p>Check every email with images off, in Outlook, Gmail and Apple Mail. It is part of our <a href="/blog/email-testing-checklist/">25-point email testing checklist</a>. If images keep breaking, our <a href="/outlook-email-rendering-fix/">email rendering fix service</a> finds and fixes the cause, and our <a href="/html-email-template-development/">custom HTML email templates</a> are built to work with images on or off.</p>

<h2>Why Images Look Huge in Outlook</h2>
<p>A related complaint: an image looks right everywhere except classic Outlook for Windows, where it appears at its full original size, for example a small headshot turning into a giant 2000 px photo. Outlook ignores CSS <code>width</code> and <code>max-width</code> on images and uses the file's real size instead. The fix is to always set the HTML <code>width</code> attribute (for example <code>width="80"</code>) on every image, and to resize the file close to twice its display size. On high-DPI Windows screens, Outlook can also scale images unexpectedly; adding the Office DPI settings in the head (<code>o:PixelsPerInch</code> set to 96) keeps sizes stable.</p>

${FAQ([
    ['Why are my email images not showing in Outlook?', 'Outlook may block images by default, ignore CSS image sizes or ignore CSS background images. Use width attributes, VML backgrounds and alt text.'],
    ['Why do my images show in Gmail but not for some readers?', 'Those readers may have images turned off, or a company firewall may block your image host. Host images on HTTPS on your own domain or email platform.'],
    ['What image format is best for email?', 'JPG for photos, PNG for logos and graphics with transparency, and GIF for simple animation. Avoid SVG and WebP in email.'],
    ['Can MailStora fix images that don’t load?', 'Yes. We fix image paths, sizing, Outlook backgrounds and alt text in existing templates. ' + QUOTE],
])}`,
},

/* ───────────── 4. Spam ───────────── */
{
    slug: 'why-emails-go-to-spam',
    title: 'Why Your Emails Go to Spam (and How to Fix It)',
    metaTitle: 'Why Your Emails Go to Spam and How to Fix It',
    metaDescription: 'Why marketing emails land in spam: missing SPF, DKIM and DMARC, poor list quality, image-only designs and messy HTML, plus how to fix each one.',
    excerpt: 'Spam placement is rarely about one word in the subject line. These are the real causes and a practical fix list.',
    category: 'Email Marketing',
    tags: ['email deliverability', 'spam', 'html email templates', 'email marketing'],
    coverImage: IMG + 'why-emails-go-to-spam.webp',
    publishedAt: '2026-09-30T11:00:00Z',
    content: `
<p><strong>Short answer:</strong> emails go to spam mainly because of three things: missing or broken authentication (SPF, DKIM and DMARC), low engagement from an old or bought list, and content signals such as image-only emails, broken HTML or a hidden unsubscribe link. Fix authentication first, then clean your list, then make sure your template is clean and balanced.</p>

<h2>1. Authentication</h2>
<p>Gmail and Yahoo require bulk senders to authenticate their domain. Without it, many emails go to spam or are rejected.</p>
<ul>
<li><strong>SPF:</strong> a DNS record listing the services allowed to send for your domain.</li>
<li><strong>DKIM:</strong> a signature that proves the email was not changed. Set it up in your email platform with your own domain.</li>
<li><strong>DMARC:</strong> a policy that tells inboxes what to do when SPF or DKIM fail. Start with <code>p=none</code> and monitor.</li>
<li><strong>Send from your own domain,</strong> not a free Gmail or Yahoo address.</li>
</ul>

<h2>2. List Quality and Engagement</h2>
<ul>
<li>Never buy lists. Use double opt-in for pop-ups if spam sign-ups are a problem.</li>
<li>Stop sending to people who have not opened or clicked in 6 to 12 months, after a win-back attempt.</li>
<li>Keep spam complaints under 0.1%. Gmail's limit is 0.3%.</li>
<li>Add one-click unsubscribe; Gmail and Yahoo require it for bulk senders.</li>
</ul>

<h2>3. Content and Template Signals</h2>
<ul>
<li><strong>Avoid image-only emails.</strong> Use live text with images, not one big image.</li>
<li><strong>Keep HTML clean.</strong> Broken tags and code pasted from Word look suspicious. Stay under <a href="/blog/gmail-clipping-102kb-limit/">Gmail's 102 KB limit</a>.</li>
<li><strong>Make the unsubscribe link easy to find.</strong> If readers can't find it, they click "Report spam".</li>
<li><strong>Use real link domains</strong> that match your brand; avoid URL shorteners.</li>
<li><strong>Write honest subject lines</strong> that match the content.</li>
</ul>

<h2>Quick Fix Checklist</h2>
<ol>
<li>Check SPF, DKIM and DMARC with a free DNS checker.</li>
<li>Send a test to a Gmail inbox and use "Show original" to confirm SPF, DKIM and DMARC pass.</li>
<li>Remove unengaged contacts and bounces.</li>
<li>Review your template: text-to-image balance, code quality, footer.</li>
<li>Run the <a href="/blog/email-testing-checklist/">25-point testing checklist</a> before each campaign.</li>
</ol>
<p>A clean, hand-coded template helps with the content side. Our <a href="/html-email-template-development/">custom HTML email templates</a> use lean code and live text, and our <a href="/klaviyo-campaign-management/">Klaviyo campaign management</a> service includes list hygiene and segmentation.</p>

<h2>Gmail and Yahoo Bulk Sender Requirements</h2>
<p>Since 2024, Gmail and Yahoo apply stricter rules to anyone sending around 5,000 or more emails a day to their users. In short, bulk senders must:</p>
<ul>
<li>Authenticate with <strong>SPF and DKIM</strong>, and publish a <strong>DMARC</strong> record (at least <code>p=none</code>) that aligns with the From domain.</li>
<li>Offer <strong>one-click unsubscribe</strong> in the email headers and process unsubscribes within two days.</li>
<li>Keep the <strong>spam complaint rate below 0.3%</strong>, and ideally under 0.1%.</li>
<li>Have valid forward and reverse DNS for sending servers (your email platform handles this).</li>
</ul>
<p>Most platforms, including Klaviyo, Mailchimp and HubSpot, cover one-click unsubscribe for you. The part you must do is domain authentication. See our step-by-step <a href="/blog/dmarc-setup-klaviyo/">DMARC setup guide for Klaviyo</a>.</p>

${FAQ([
    ['Why do my emails go to spam in Gmail?', 'Usually missing authentication (SPF, DKIM, DMARC), low engagement or high complaint rates. Content issues like image-only emails add to the problem.'],
    ['Do spam trigger words still matter?', 'Much less than before. Authentication, reputation and engagement matter far more than individual words, though misleading subject lines still hurt.'],
    ['Does email design affect spam placement?', 'Yes. Image-only emails, broken HTML, hidden unsubscribe links and very heavy code are negative signals.'],
    ['Can MailStora help my emails reach the inbox?', 'We build clean templates and manage campaigns with list hygiene and segmentation. ' + QUOTE],
])}`,
},

/* ───────────── 5. Mobile ───────────── */
{
    slug: 'responsive-email-not-working-mobile',
    title: 'Email Not Responsive on Mobile? Here’s How to Fix It',
    metaTitle: 'Email Not Responsive on Mobile? How to Fix It',
    metaDescription: 'Why your HTML email looks broken or tiny on phones, and how to fix it with the viewport tag, fluid tables, stacking columns and mobile-sized buttons.',
    excerpt: 'Most emails are opened on phones. If yours shows tiny text or a side-scrolling layout, these fixes will solve it.',
    category: 'Tutorial',
    tags: ['responsive email', 'mobile email design', 'html email templates', 'email testing'],
    coverImage: IMG + 'responsive-email-not-working-mobile.webp',
    publishedAt: '2026-09-30T12:00:00Z',
    content: `
<p><strong>Short answer:</strong> an email looks broken on mobile when it has a fixed width, no viewport meta tag, columns that do not stack, or text and buttons that are too small. The fix is a fluid layout: tables with <code>width="100%"</code> and a <code>max-width</code> of about 600 px, columns that stack with media queries or a hybrid method, text of at least 14 px and buttons at least 44 px tall.</p>

<h2>Signs Your Email Is Not Responsive</h2>
<ul>
<li>The reader has to zoom or scroll sideways.</li>
<li>Text is tiny and buttons are hard to tap.</li>
<li>Two or three columns squeeze next to each other.</li>
<li>Images spill past the screen edge.</li>
</ul>

<h2>6 Fixes</h2>
<ol>
<li><strong>Add the viewport tag:</strong> <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>.</li>
<li><strong>Use fluid tables:</strong> <code>width="100%"</code> with a centered container of <code>max-width:600px</code>. For Outlook, wrap it in a fixed 600 px ghost table.</li>
<li><strong>Stack columns:</strong> use media queries to make columns full width under 600 px. For Gmail apps that ignore media queries, use the hybrid (fluid inline-block) method.</li>
<li><strong>Make images fluid:</strong> set <code>width</code> attribute plus <code>max-width:100%; height:auto</code>.</li>
<li><strong>Size text for phones:</strong> body text 14 to 16 px, headings 22 px or more.</li>
<li><strong>Make buttons tappable:</strong> at least 44 px tall and full width on mobile. See <a href="/blog/bulletproof-email-buttons/">bulletproof email buttons</a>.</li>
</ol>

<h2>Why Builders Sometimes Get This Wrong</h2>
<p>Some editors lock widths in pixels or produce nested tables that do not stack. Pasting designs from Canva or a Word document as one large image also breaks on mobile. A hand-coded, mobile-first template avoids these problems. Our <a href="/html-email-template-development/">responsive HTML email templates</a> are tested on iPhone, Android and tablets, as well as desktop Outlook.</p>

<h2>Test on Real Devices</h2>
<p>Preview on at least one iPhone (Apple Mail and Gmail app) and one Android phone. Also check <a href="/blog/dark-mode-email-design/">dark mode</a>, since most phones use it. The full list is in our <a href="/blog/email-testing-checklist/">email testing checklist</a>. For an example, see the <a href="/portfolio/fashion-new-collection-launch-email/">fashion launch email</a> in our portfolio, which stacks cleanly on every screen.</p>

${FAQ([
    ['Why does my email look tiny on my phone?', 'The email probably has a fixed width and no viewport meta tag, so the phone shrinks the whole desktop layout to fit.'],
    ['Do media queries work in Gmail?', 'Gmail supports media queries in many cases, but not all Gmail apps and account types. The hybrid method stacks columns without media queries.'],
    ['What width should an email be?', 'Around 600 to 640 px on desktop, and 100% width on mobile.'],
    ['Can MailStora make my emails responsive?', 'Yes. We rebuild templates to be mobile-first and test them on real devices and 50+ clients. ' + QUOTE],
])}`,
},

/* ───────────── 6. Outlook background images ───────────── */
{
    slug: 'outlook-background-images-vml',
    title: 'Background Images in Outlook: How to Make Them Work With VML',
    metaTitle: 'Background Images in Outlook Emails: The VML Fix',
    metaDescription: 'Why background images disappear in Outlook for Windows and how to make them work with VML, plus fallback colours and live text on top of hero images.',
    excerpt: 'Classic Outlook for Windows ignores CSS background images. VML brings them back. Here is how it works and when to use it.',
    category: 'Tutorial',
    tags: ['outlook email rendering', 'vml', 'background image email', 'html email templates'],
    coverImage: IMG + 'outlook-background-images-vml.webp',
    publishedAt: '2026-09-30T13:00:00Z',
    content: `
<p><strong>Short answer:</strong> classic Outlook for Windows uses Microsoft Word to display emails, and Word ignores CSS background images. To show a background image there, add VML (Vector Markup Language) code inside Outlook-only conditional comments. Always set a solid background colour as a fallback and keep the text on top as live HTML text.</p>

<h2>Why Outlook Drops Background Images</h2>
<p>Outlook 2007 to 2021 and Microsoft 365 for Windows render HTML with the Word engine. It does not support <code>background-image</code> in CSS, so hero images with text on top show as a plain colour or a blank area. Apple Mail, Gmail, new Outlook and Outlook on the web show them normally.</p>

<h2>How the VML Fix Works</h2>
<ol>
<li>Set the background image in CSS and with the <code>background</code> attribute on the table cell, for most clients.</li>
<li>Inside <code>&lt;!--[if gte mso 9]&gt;</code> comments, add a <code>v:rect</code> with a <code>v:fill</code> that uses the same image, and a <code>v:textbox</code> to hold the content.</li>
<li>Set the VML width and height in pixels; VML does not understand percentages well.</li>
<li>Close the VML elements inside a matching <code>&lt;![endif]--&gt;</code> block after your content.</li>
<li>Add the VML namespace to the <code>&lt;html&gt;</code> tag: <code>xmlns:v="urn:schemas-microsoft-com:vml"</code>.</li>
</ol>

<h2>Rules for Safe Background Images</h2>
<ul>
<li><strong>Always set a background colour</strong> close to the image's main colour, so text stays readable if the image fails.</li>
<li><strong>Keep text as live text,</strong> not baked into the image.</li>
<li><strong>Use fixed heights carefully:</strong> too little height cuts content off in Outlook.</li>
<li><strong>Use it only where it matters,</strong> like the hero. VML adds code weight and counts toward the <a href="/blog/gmail-clipping-102kb-limit/">102 KB Gmail limit</a>.</li>
</ul>

<h2>Other Outlook Problems to Check</h2>
<p>Background images are one of many Outlook quirks. Rounded buttons, spacing, fonts and DPI scaling also break. See <a href="/blog/fix-html-emails-breaking-in-outlook/">how to fix HTML emails that break in Outlook</a> and <a href="/blog/bulletproof-email-buttons/">bulletproof buttons</a>. If you need it done for you, our <a href="/outlook-email-rendering-fix/">Outlook email rendering fix</a> service repairs templates and returns before-and-after screenshots. The <a href="/case-studies/canadian-choice-windows-doors/">Canadian Choice case study</a> shows a full Outlook rebuild.</p>

${FAQ([
    ['Does Outlook support background images in emails?', 'Classic Outlook for Windows does not support CSS background images. Use VML inside conditional comments. New Outlook and Outlook on the web support CSS backgrounds.'],
    ['What is VML in email?', 'VML is an old Microsoft vector format that the Word rendering engine understands. Email developers use it for background images and rounded buttons in Outlook.'],
    ['Will VML affect other email clients?', 'No. VML sits inside Outlook-only conditional comments, so other clients ignore it.'],
    ['Can MailStora add Outlook background images to my template?', 'Yes. We add VML backgrounds with fallbacks and test in every Outlook version. ' + QUOTE],
])}`,
},

/* ───────────── 7. Bulletproof buttons ───────────── */
{
    slug: 'bulletproof-email-buttons',
    title: 'Bulletproof Email Buttons: How to Code CTAs That Work Everywhere',
    metaTitle: 'Bulletproof Email Buttons That Work in Every Inbox',
    metaDescription: 'How to code email buttons that work in Outlook, Gmail and Apple Mail: live text, padding-based and VML methods, tap sizes and common mistakes to avoid.',
    excerpt: 'Your call-to-action button is the most important part of the email. Here is how to make sure it shows and works in every inbox.',
    category: 'Tutorial',
    tags: ['email buttons', 'outlook email rendering', 'html email templates', 'email cta'],
    coverImage: IMG + 'bulletproof-email-buttons.webp',
    publishedAt: '2026-10-01T08:00:00Z',
    content: `
<p><strong>Short answer:</strong> a bulletproof email button is made from HTML and CSS, not an image, so it shows even when images are blocked. The most reliable method is a table cell with a background colour and a link inside it with padding. For rounded corners in Outlook, add a VML version inside Outlook-only comments. Make buttons at least 44 px tall so they are easy to tap.</p>

<h2>Why Image Buttons Fail</h2>
<ul>
<li>When images are blocked, the button disappears and so does your click.</li>
<li>Text inside an image cannot be recoloured in <a href="/blog/dark-mode-email-design/">dark mode</a> and is not read by screen readers.</li>
<li>Image buttons can look blurry on high-resolution screens.</li>
</ul>

<h2>Three Coding Methods</h2>
<table>
<thead><tr><th>Method</th><th>How it works</th><th>Pros and cons</th></tr></thead>
<tbody>
<tr><td>Padding on the cell</td><td>Colour and padding on the <code>td</code>, link inside</td><td>Works everywhere; only the text is clickable in some Outlook versions</td></tr>
<tr><td>Padding on the link</td><td>Link set to <code>display:inline-block</code> with padding</td><td>Whole button clickable; Outlook ignores the padding</td></tr>
<tr><td>VML button</td><td><code>v:roundrect</code> in conditional comments</td><td>Rounded corners in Outlook; more code</td></tr>
</tbody>
</table>
<p>Many developers combine them: a padded cell for the shape, border on the link to fill the clickable area, and VML for Outlook rounding.</p>

<h2>Button Design Rules</h2>
<ol>
<li><strong>Size:</strong> at least 44 px tall and 150 px wide; full width on mobile.</li>
<li><strong>Text:</strong> short and clear: "Shop the sale", "Book a call", "Track order".</li>
<li><strong>Contrast:</strong> at least 4.5:1 between text and button colour.</li>
<li><strong>One main button</strong> per email section, with a text link as a backup.</li>
<li><strong>Font:</strong> use a web-safe fallback so Outlook does not switch to Times New Roman.</li>
</ol>

<h2>Common Mistakes</h2>
<ul>
<li>Using <code>margin</code> for spacing, which Outlook ignores.</li>
<li>Setting only <code>border-radius</code> and expecting Outlook to show rounded corners.</li>
<li>Putting the link only on the text, leaving the rest of the button dead.</li>
</ul>
<p>Buttons are one item on our <a href="/blog/email-testing-checklist/">testing checklist</a>. For other Outlook problems, read <a href="/blog/fix-html-emails-breaking-in-outlook/">how to fix emails that break in Outlook</a>. Every <a href="/html-email-template-development/">custom HTML email template</a> we build uses bulletproof buttons, tested in 50+ clients.</p>

${FAQ([
    ['What is a bulletproof button in email?', 'A button built from HTML and CSS instead of an image, so it displays and works even when images are blocked.'],
    ['How do I make rounded buttons in Outlook?', 'Use a VML roundrect inside Outlook conditional comments. Classic Outlook ignores CSS border-radius.'],
    ['How big should an email button be?', 'At least 44 px tall so it is easy to tap on a phone, with enough padding around the text.'],
    ['Can MailStora fix my email buttons?', 'Yes. We rebuild buttons and other Outlook problems in existing templates. ' + QUOTE],
])}`,
},

/* ───────────── 8. Shopify notifications ───────────── */
{
    slug: 'customize-shopify-order-confirmation-email',
    title: 'How to Customize Shopify Order Confirmation Emails',
    metaTitle: 'How to Customize Shopify Order Confirmation Emails',
    metaDescription: 'How to brand and customize Shopify order confirmation and shipping emails safely: editing the template, keeping Liquid tags, adding upsells and testing.',
    excerpt: 'Shopify’s default notification emails are plain. Here is how to make them match your brand without breaking the order data.',
    category: 'Tutorial',
    tags: ['shopify email templates', 'transactional email templates', 'order confirmation email', 'shopify'],
    coverImage: IMG + 'customize-shopify-order-confirmation-email.webp',
    publishedAt: '2026-10-01T09:00:00Z',
    content: `
<p><strong>Short answer:</strong> in Shopify admin, go to <strong>Settings, Notifications, Customer notifications</strong>, open <strong>Order confirmation</strong> and click <strong>Edit code</strong>. You can change the HTML and CSS, but keep the Liquid tags (like <code>{{ order_name }}</code> and the line-item loop) that pull in order data. Add your logo and colours first under <strong>Customize email templates</strong>, then preview and send a test.</p>

<h2>Why Order Emails Matter</h2>
<p>Order confirmations are among the most opened emails a store sends. They reassure the customer, cut "where is my order?" support tickets and are a chance to show your brand and recommend the next purchase.</p>

<h2>Step by Step</h2>
<ol>
<li><strong>Brand settings:</strong> in Notifications, click <strong>Customize email templates</strong> to set your logo, logo width and accent colour. This updates all notifications.</li>
<li><strong>Open the template:</strong> Customer notifications, Order confirmation, <strong>Edit code</strong>.</li>
<li><strong>Back up the code</strong> by copying it into a text file before changing anything.</li>
<li><strong>Edit the HTML and CSS</strong> for layout, fonts and spacing. Keep all Liquid tags and loops.</li>
<li><strong>Preview</strong> with Shopify's sample data, then place a real test order to check discounts, shipping and taxes.</li>
<li><strong>Repeat for the shipping,</strong> delivery and refund notifications so all emails match.</li>
</ol>

<h2>Liquid Tags You Must Keep</h2>
<ul>
<li><code>{% for line in subtotal_line_items %}</code> and its closing tag, which lists the products.</li>
<li><code>{{ order_name }}</code>, <code>{{ subtotal_price | money }}</code>, <code>{{ total_price | money }}</code>.</li>
<li>Shipping and billing address blocks, and the order status link <code>{{ order_status_url }}</code>.</li>
<li>Conditions like <code>{% if discounts %}</code> that show discounts only when they apply.</li>
</ul>

<h2>Ideas to Improve Them</h2>
<ul>
<li>A clear order summary with product images.</li>
<li>Help links: shipping times, returns, contact.</li>
<li>A small upsell or "complete the look" block, kept below the order details.</li>
<li>A dark mode friendly logo. See our <a href="/blog/dark-mode-email-design/">dark mode guide</a>.</li>
</ul>
<p>Shopify notifications are coded like other HTML emails, so Outlook and mobile rules apply. Use our <a href="/blog/email-testing-checklist/">testing checklist</a>. For a finished example, see our <a href="/portfolio/order-confirmation-transactional-email/">order confirmation email design</a>. Our <a href="/transactional-email-templates/">transactional email templates</a> service redesigns the full set, and our <a href="/shopify-development/">Shopify development</a> team can handle the rest of the store.</p>

${FAQ([
    ['Can I edit Shopify order confirmation emails?', 'Yes. Go to Settings, Notifications, open the notification and click Edit code. You can change the HTML and CSS freely.'],
    ['Will editing the code break my order emails?', 'Not if you keep the Liquid tags and loops. Back up the original code and test with a real order after changes.'],
    ['Can I use Klaviyo instead of Shopify notifications?', 'Klaviyo can send some order-related emails, but Shopify notifications are still used for core confirmations unless you set up a full replacement.'],
    ['Can MailStora design my Shopify notification emails?', 'Yes. We design and code the full set of Shopify notifications with your branding. ' + QUOTE],
])}`,
},

/* ───────────── 9. HubSpot ───────────── */
{
    slug: 'hubspot-custom-coded-email-template',
    title: 'HubSpot Custom Coded Email Templates: A Practical Guide',
    metaTitle: 'HubSpot Custom Coded Email Templates: A Guide',
    metaDescription: 'How to create custom coded email templates in HubSpot: design manager setup, HubL modules, drag-and-drop areas, required tags and testing.',
    excerpt: 'HubSpot’s default email templates are limited. A custom coded template gives you your own design while your team keeps easy editing.',
    category: 'Tutorial',
    tags: ['hubspot email templates', 'custom html email templates', 'hubspot', 'hubl'],
    coverImage: IMG + 'hubspot-custom-coded-email-template.webp',
    publishedAt: '2026-10-01T10:00:00Z',
    content: `
<p><strong>Short answer:</strong> in HubSpot, open <strong>Marketing, Files and Templates, Design Tools</strong>, create a new file and choose <strong>Email template</strong> (coded). Build the layout in HTML, then add HubL modules or a drag-and-drop area so marketers can edit content in the email editor. Include HubSpot's required tags for the unsubscribe link and company address, then test before publishing.</p>

<h2>When You Need a Custom Coded Template</h2>
<ul>
<li>Your brand design cannot be built with the default themes.</li>
<li>You need exact control over Outlook and mobile rendering.</li>
<li>You want a set of reusable, locked brand modules for your team.</li>
</ul>

<h2>Step by Step</h2>
<ol>
<li>Open Design Tools and create a new <strong>coded email template</strong>.</li>
<li>Paste your tested, table-based HTML layout.</li>
<li>Add editable modules with HubL, for example <code>{% module "hero_text" path="@hubspot/rich_text" %}</code>.</li>
<li>Or add a <code>{% dnd_area %}</code> so marketers can drag, drop and reorder sections.</li>
<li>Build custom modules for repeated sections such as product cards or event details.</li>
<li>Add required tags such as <code>{{ unsubscribe_link }}</code> and the company address.</li>
<li>Publish, create a test email from the template and send tests to Outlook, Gmail and mobile.</li>
</ol>

<h2>Common Problems</h2>
<ul>
<li><strong>Template won't publish:</strong> required tags are missing.</li>
<li><strong>Editor shows no editable content:</strong> the template has no modules or dnd area.</li>
<li><strong>Outlook layout breaks:</strong> the HTML uses divs or flexbox. See <a href="/blog/fix-html-emails-breaking-in-outlook/">Outlook fixes</a>.</li>
<li><strong>Gmail clips the email:</strong> modules add code; keep it under 102 KB. See <a href="/blog/gmail-clipping-102kb-limit/">Gmail clipping</a>.</li>
</ul>

<h2>Keep It Maintainable</h2>
<p>Name modules clearly, lock brand elements such as the header and footer, and document which modules to use for which email type. Our <a href="/hubspot-email-templates/">HubSpot email templates service</a> builds coded templates and custom modules, tested and uploaded to your portal. For design handoff, use our <a href="/blog/figma-to-html-email-handoff-checklist/">Figma handoff checklist</a>, and see what a custom build costs in <a href="/blog/html-email-template-cost/">our pricing guide</a>.</p>

${FAQ([
    ['Can I use custom HTML templates in HubSpot?', 'Yes. Create a coded email template in Design Tools. Add modules or a drag-and-drop area so it stays editable.'],
    ['What is HubL?', 'HubL is HubSpot’s template language. It adds modules, variables and logic to HTML templates.'],
    ['Why won’t my HubSpot email template publish?', 'Usually required tags are missing, such as the unsubscribe link or company address.'],
    ['Can MailStora build HubSpot templates?', 'Yes. We build coded HubSpot templates and custom modules and test them in 50+ clients. ' + QUOTE],
])}`,
},

/* ───────────── 10. Accessibility ───────────── */
{
    slug: 'accessible-email-design',
    title: 'Accessible Email Design: A Simple Guide for Marketers',
    metaTitle: 'Accessible Email Design: A Simple Guide (2026)',
    metaDescription: 'How to make marketing emails accessible: alt text, colour contrast, real headings, readable text, clear links and screen-reader-friendly HTML code.',
    excerpt: 'Accessible emails reach more people and usually perform better for everyone. These are the changes that make the biggest difference.',
    category: 'Email Marketing',
    tags: ['email accessibility', 'html email templates', 'email design', 'inclusive design'],
    coverImage: IMG + 'accessible-email-design.webp',
    publishedAt: '2026-10-01T11:00:00Z',
    content: `
<p><strong>Short answer:</strong> an accessible email can be read and used by people with low vision, colour blindness, or who use screen readers. The main changes are: useful alt text on images, text contrast of at least 4.5:1, real headings, body text of 14 to 16 px or larger, clear link text, live text instead of text in images, and layout tables marked with <code>role="presentation"</code>.</p>

<h2>Why Accessibility Matters</h2>
<ul>
<li>Millions of people use screen readers or zoom to read email.</li>
<li>Accessible emails are easier for everyone to read, especially on phones.</li>
<li>In many regions, accessibility is a legal expectation for businesses.</li>
</ul>

<h2>Content Checklist</h2>
<ol>
<li><strong>Alt text:</strong> describe the purpose, like "Free shipping on orders over $50". Use empty alt (<code>alt=""</code>) for decorative images.</li>
<li><strong>Link text:</strong> say where the link goes. "Read the dark mode guide" beats "click here".</li>
<li><strong>Short paragraphs</strong> and plain language.</li>
<li><strong>Don't rely on colour alone</strong> to show meaning, such as sale prices; add words or icons.</li>
</ol>

<h2>Design Checklist</h2>
<ol>
<li><strong>Contrast:</strong> at least 4.5:1 for body text and 3:1 for large headings.</li>
<li><strong>Text size:</strong> 14 to 16 px body text, 1.5 line height.</li>
<li><strong>Left-aligned text</strong> for long paragraphs; avoid long centered text blocks.</li>
<li><strong>Buttons:</strong> large, high-contrast and coded as live text. See <a href="/blog/bulletproof-email-buttons/">bulletproof buttons</a>.</li>
<li><strong>Dark mode:</strong> check contrast in both modes. See our <a href="/blog/dark-mode-email-design/">dark mode guide</a>.</li>
</ol>

<h2>Code Checklist</h2>
<ul>
<li>Add <code>lang="en"</code> (or your language) on the <code>html</code> tag.</li>
<li>Use real <code>h1</code>, <code>h2</code> and <code>p</code> tags, not styled spans.</li>
<li>Add <code>role="presentation"</code> to layout tables so screen readers don't announce rows and columns.</li>
<li>Keep reading order logical when columns stack on mobile.</li>
<li>Set a <code>title</code> tag that matches the subject.</li>
</ul>

<h2>Test It</h2>
<p>Turn images off, zoom to 200%, and listen to the email with a screen reader (VoiceOver on Mac and iPhone, or NVDA on Windows). Accessibility checks are part of our <a href="/blog/email-testing-checklist/">email testing checklist</a>. Every <a href="/html-email-template-development/">custom HTML email template</a> we build uses semantic, screen-reader-friendly code, and our <a href="/newsletter-email-templates/">newsletter templates</a> are designed for comfortable reading.</p>

${FAQ([
    ['What makes an email accessible?', 'Useful alt text, good colour contrast, readable text size, real headings, clear link text and live text instead of text in images.'],
    ['What is role="presentation" in email?', 'It tells screen readers that a table is used only for layout, so they read the content without announcing table rows and columns.'],
    ['What contrast ratio should email text have?', 'At least 4.5:1 for normal text and 3:1 for large text, following WCAG guidelines.'],
    ['Can MailStora make my emails accessible?', 'Yes. We audit and rebuild templates with accessible design and code. ' + QUOTE],
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
