// Publishes six practical guides that support the main service pages.
// Safe to re-run: upserts by slug. Usage (from the Server folder): node seeds/blogGuides.js
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../src/models/Post');

const IMG = '/images/media/cropped/';

const POSTS = [
/* ───────────────────────── 1. Outlook fixes ───────────────────────── */
{
    slug: 'fix-html-emails-breaking-in-outlook',
    title: 'How to Fix HTML Emails That Break in Outlook (2026 Guide)',
    metaTitle: 'How to Fix HTML Emails That Break in Outlook (2026)',
    metaDescription: 'Why HTML emails break in Outlook and how to fix them: tables, VML buttons and backgrounds, MSO conditional code, image sizing, spacing and dark mode.',
    excerpt: 'Outlook for Windows renders email with Microsoft Word, so modern CSS breaks. Here are the fixes that make layouts, buttons, images and spacing hold up in every Outlook version.',
    category: 'Tutorial',
    tags: ['outlook email rendering', 'html email templates', 'email testing', 'dark mode'],
    coverImage: IMG + 'service-email-testing-outlook-fixes.webp',
    publishedAt: '2026-09-28T08:00:00Z',
    content: `
<p><strong>Short answer:</strong> classic Outlook for Windows (2007 to 2021, and Microsoft 365 desktop) renders HTML email with Microsoft Word's engine, not a browser. Word ignores much of modern CSS, so layouts built with divs, flexbox, margins or background images fall apart. The fix is to build emails the way Word understands them: nested tables, inline styles, fixed widths, and Outlook-only code wrapped in MSO conditional comments.</p>

<p>This guide covers the most common Outlook problems we fix every week at MailStora, what causes each one and the exact change that solves it. If you would rather hand it over, our <a href="/outlook-email-rendering-fix/">Outlook email rendering fix service</a> tests your email in 50+ clients and fixes it, usually within 24 to 48 hours.</p>

<h2>Why Outlook Breaks HTML Emails</h2>
<p>Most email clients (Gmail, Apple Mail, iOS Mail, Outlook on the web and the new Outlook) use a browser engine to display email. Classic Outlook for Windows does not. It uses Word, which supports only a limited, older set of HTML and CSS. That causes the same symptoms again and again:</p>
<ul>
<li>Columns stacking or collapsing, and layouts stretching to full width</li>
<li>Rounded buttons turning into plain links or square boxes</li>
<li>Background images disappearing</li>
<li>Extra gaps between images, or text lines that are too tall</li>
<li>Images showing at their original, huge size</li>
<li>Web fonts replaced by Times New Roman</li>
</ul>
<p>The new Outlook for Windows and Outlook on the web behave much more like a browser, but many companies still run classic Outlook, so your email has to work in both.</p>

<h2>1. Use Tables for Layout, Not Divs</h2>
<p>Word does not reliably support <code>float</code>, <code>flex</code>, <code>grid</code> or <code>max-width</code> on divs. Build the structure with tables instead:</p>
<ul>
<li>Wrap the email in a 100% width table, with a centred inner table 600 to 640 pixels wide.</li>
<li>Put each section in its own table row, and each column in its own table cell.</li>
<li>Set <code>width</code> as an HTML attribute as well as in CSS, because Word reads the attribute.</li>
<li>Add <code>role="presentation"</code> so screen readers do not announce layout tables.</li>
</ul>
<p>For responsive multi-column layouts, the common pattern is a "ghost table": columns are inline-block divs for modern clients, and an Outlook-only table wrapped around them in conditional comments keeps them side by side in Word.</p>

<h2>2. Target Outlook With MSO Conditional Comments</h2>
<p>Outlook reads a special comment syntax that every other client ignores. It is the cleanest way to give Outlook its own code:</p>
<pre><code>&lt;!--[if mso]&gt;
  &lt;table role="presentation" width="600"&gt;&lt;tr&gt;&lt;td&gt;
&lt;![endif]--&gt;
  ...your normal HTML...
&lt;!--[if mso]&gt;
  &lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
&lt;![endif]--&gt;</code></pre>
<p>Use it for fixed-width wrappers, Outlook-only fonts, and the VML elements below. Use <code>&lt;!--[if !mso]&gt;&lt;!--&gt;</code> to hide code from Outlook.</p>

<h2>3. Make Buttons Bulletproof</h2>
<p>A button made from a padded link with <code>border-radius</code> becomes a plain text link in Outlook, because Word ignores padding on inline elements. Two reliable fixes:</p>
<ul>
<li><strong>Table-cell buttons:</strong> put the background colour and padding on a table cell, and the link inside it. It stays square in Outlook but always looks like a button.</li>
<li><strong>VML buttons:</strong> use a <code>v:roundrect</code> element inside an MSO conditional comment for Outlook, and a normal styled link for every other client. This keeps rounded corners in Outlook too.</li>
</ul>

<h2>4. Fix Background Images With VML</h2>
<p>CSS background images do not display in classic Outlook. For hero sections with text over an image, add a VML <code>v:rect</code> with a <code>v:fill</code> of the image inside an MSO comment, and keep the CSS background for other clients. Always set a solid <code>bgcolor</code> fallback so the text stays readable if images are blocked.</p>

<h2>5. Stop Images Rendering at Full Size</h2>
<p>Outlook ignores CSS widths on images and uses the file's real size. A 1200-pixel image exported at 2x for retina screens will burst out of a 600-pixel layout.</p>
<ul>
<li>Always set the <code>width</code> attribute on every <code>img</code>, for example <code>width="600"</code>, as well as <code>style="width:100%; max-width:600px; height:auto;"</code>.</li>
<li>Add <code>display:block</code> and <code>border:0</code> to remove the small gap Outlook adds under images.</li>
<li>Write meaningful <code>alt</code> text, because Outlook blocks images by default for many users.</li>
</ul>

<h2>6. Control Spacing and Line Height</h2>
<ul>
<li>Use <code>padding</code> on table cells for spacing. Word ignores margins on many elements and handles padding on divs badly.</li>
<li>Add <code>mso-line-height-rule: exactly;</code> next to <code>line-height</code> so Outlook does not add extra space to lines of text.</li>
<li>Reset paragraph margins with <code>margin:0</code> and add spacing through padding instead.</li>
<li>Set <code>border-collapse: collapse</code> and <code>mso-table-lspace/rspace: 0pt</code> on tables to remove hairline gaps.</li>
</ul>

<h2>7. Fix Blurry or Oversized Layouts on High-DPI Screens</h2>
<p>On Windows machines set to 120 DPI (125% scaling), Outlook can scale images and widths inconsistently. Add the Office settings block in the head so Outlook uses 96 DPI for layout:</p>
<pre><code>&lt;!--[if mso]&gt;
&lt;noscript&gt;&lt;xml&gt;&lt;o:OfficeDocumentSettings&gt;
  &lt;o:PixelsPerInch&gt;96&lt;/o:PixelsPerInch&gt;
&lt;/o:OfficeDocumentSettings&gt;&lt;/xml&gt;&lt;/noscript&gt;
&lt;![endif]--&gt;</code></pre>

<h2>8. Give Web Fonts a Safe Fallback</h2>
<p>Classic Outlook does not load web fonts and may fall back to Times New Roman. List a system font in every font stack, for example <code>font-family: 'Inter', Arial, Helvetica, sans-serif;</code>, and add an Outlook-only rule that forces Arial on text elements inside an MSO conditional style block.</p>

<h2>9. Check Dark Mode in Outlook</h2>
<p>Outlook's dark mode can invert background and text colours. Avoid pure black and white where you can, use transparent PNG logos with a subtle outline or a light version, and test with real dark mode previews. Our guide to <a href="/outlook-email-rendering-fix/">email testing and Outlook fixes</a> explains how we test light and dark mode side by side.</p>

<h2>10. Test in Real Outlook Versions Before You Send</h2>
<p>Fixing Outlook without testing is guesswork. Before every send, check the email in:</p>
<ul>
<li>Classic Outlook for Windows (Microsoft 365 desktop and older versions your audience uses)</li>
<li>New Outlook for Windows and Outlook on the web</li>
<li>Outlook for Mac, iOS and Android</li>
<li>Gmail, Apple Mail and Yahoo Mail, to make sure the Outlook fixes did not break anything else</li>
</ul>
<p>Use an email testing tool that shows real screenshots, and send a live test to a real Outlook inbox for the final check.</p>

<h2>When to Rebuild Instead of Patch</h2>
<p>If a template was built with a drag-and-drop builder or a web page framework, patching Outlook issues one by one often creates new ones in Gmail or mobile. In that case a clean rebuild is faster and cheaper over time. That is exactly what we did for Canadian Choice: their campaign template broke in Outlook, so we <a href="/case-studies/canadian-choice-windows-doors/">rebuilt it from scratch in 36 hours</a>, and the campaign reached a 38% open rate.</p>
<p>If you are starting from a design file, our <a href="/blog/figma-to-html-email-handoff-checklist/">Figma to HTML email handoff checklist</a> helps you avoid Outlook problems before any code is written.</p>

<h2>Frequently Asked Questions</h2>
<h3>Why does my email look fine in Gmail but broken in Outlook?</h3>
<p>Gmail uses a browser engine to display email, while classic Outlook for Windows uses Microsoft Word, which supports far less HTML and CSS. Code that relies on divs, margins, flexbox or background images works in Gmail but breaks in Outlook.</p>
<h3>Does the new Outlook still need these fixes?</h3>
<p>The new Outlook for Windows and Outlook on the web render email much like a browser, so they need fewer fixes. Many people still use classic Outlook, so a well-built email should work in both.</p>
<h3>What is VML in HTML email?</h3>
<p>VML (Vector Markup Language) is an old Microsoft format that classic Outlook still understands. Email developers use it inside MSO conditional comments to show rounded buttons and background images in Outlook.</p>
<h3>How much does it cost to fix an email for Outlook?</h3>
<p>At MailStora, fixing or rebuilding a single template for Outlook starts from $40 and is usually done in 24 to 48 hours. See our <a href="/pricing/">pricing</a> or <a href="/quote/">request a free quote</a>.</p>
`,
},

/* ───────────────────────── 2. Klaviyo abandoned cart ───────────────────────── */
{
    slug: 'klaviyo-abandoned-cart-flow',
    title: 'Klaviyo Abandoned Cart Flow: Setup, Timing and Email Examples',
    metaTitle: 'Klaviyo Abandoned Cart Flow: Setup, Timing & Examples',
    metaDescription: 'Set up a Klaviyo abandoned cart flow step by step: the right trigger, filters, timing, dynamic product blocks and 3 email examples that recover sales.',
    excerpt: 'A step-by-step guide to building a Klaviyo abandoned cart flow that recovers sales: trigger, flow filters, timing, dynamic cart items and what to write in each email.',
    category: 'Email Marketing',
    tags: ['klaviyo flows', 'klaviyo abandoned cart flow', 'klaviyo email templates', 'ecommerce email'],
    coverImage: IMG + 'service-klaviyo-automation-flows.webp',
    publishedAt: '2026-09-28T09:00:00Z',
    content: `
<p><strong>Short answer:</strong> a Klaviyo abandoned cart flow is an automated series of emails sent to shoppers who start checkout but do not buy. Build it on the <em>Started Checkout</em> metric, add a flow filter that stops it once the person places an order, send the first email within a few hours, and show the exact products they left behind with a dynamic block.</p>

<p>It is usually one of the highest-earning flows in any ecommerce store, because it reaches people who were seconds away from buying. Here is how to set it up properly. If you want it done for you, our <a href="/klaviyo-flow-setup/">Klaviyo flow setup service</a> builds the full flow with branded templates.</p>

<h2>Abandoned Cart vs Abandoned Checkout vs Browse Abandonment</h2>
<ul>
<li><strong>Abandoned checkout:</strong> the shopper entered checkout (and usually their email) but did not pay. Triggered by <em>Started Checkout</em>. This is what most stores call the "abandoned cart flow".</li>
<li><strong>Added to cart:</strong> the shopper added a product but never reached checkout. Needs an <em>Added to Cart</em> event, which Shopify stores send through the Klaviyo onsite tracking.</li>
<li><strong>Browse abandonment:</strong> the shopper viewed products without adding them. Triggered by <em>Viewed Product</em>. Lower intent, softer emails.</li>
</ul>
<p>Start with abandoned checkout. It has the highest intent and the clearest win.</p>

<h2>Step 1: Create the Flow and Choose the Trigger</h2>
<ol>
<li>In Klaviyo, go to <strong>Flows</strong> and create a flow from scratch, or start from the abandoned cart template in the flow library.</li>
<li>Choose a <strong>metric</strong> trigger and select <strong>Started Checkout</strong> from your store integration.</li>
<li>Name it clearly, for example "Abandoned Checkout: 3 emails".</li>
</ol>

<h2>Step 2: Add Flow Filters So You Never Email Buyers</h2>
<p>Filters are checked before every email, so they stop the flow the moment someone buys. Add:</p>
<ul>
<li><strong>Placed Order zero times since starting this flow.</strong> This is the most important filter.</li>
<li><strong>Has not been in this flow in the last 7 to 14 days</strong>, so repeat visitors are not flooded with reminders.</li>
</ul>
<p>Optionally add a <strong>trigger filter</strong> for cart value (for example, only carts above a minimum amount) if you plan to include discounts.</p>

<h2>Step 3: Set the Timing</h2>
<p>A proven starting point for three emails:</p>
<table>
<thead><tr><th>Email</th><th>Delay</th><th>Goal</th></tr></thead>
<tbody>
<tr><td>1. Reminder</td><td>2 to 4 hours after checkout started</td><td>Help them finish while the purchase is fresh</td></tr>
<tr><td>2. Reassurance</td><td>24 hours later</td><td>Answer doubts: reviews, delivery, returns</td></tr>
<tr><td>3. Last nudge</td><td>48 to 72 hours later</td><td>Final reminder, optional incentive</td></tr>
</tbody>
</table>
<p>Test your own timing after a few weeks. Stores with expensive products often need longer gaps; fast-moving products can go quicker.</p>

<h2>Step 4: Show the Cart With a Dynamic Product Block</h2>
<p>The email should show exactly what they left behind: product image, name, variant, price and a button back to checkout. In Klaviyo's editor, use the <strong>Table</strong> or <strong>Product</strong> block with the event's line items, or the store's built-in abandoned cart block. Link the main button to the checkout URL from the event, so the cart is restored in one click.</p>
<p>Custom-coded templates make this block look on-brand in every inbox, including Outlook. Our <a href="/klaviyo-email-templates/">custom Klaviyo email templates</a> keep dynamic product areas editable in Klaviyo's drag-and-drop editor.</p>

<h2>Step 5: Write the Three Emails</h2>
<h3>Email 1: A friendly reminder (no discount)</h3>
<ul>
<li>Subject line ideas: "You left something behind", "Still thinking it over?"</li>
<li>Show the cart, one short line of copy and a clear "Complete my order" button.</li>
<li>Keep it short. Most recoveries happen from this email.</li>
</ul>
<h3>Email 2: Remove the doubts</h3>
<ul>
<li>Add social proof: star ratings, one or two short reviews.</li>
<li>Answer common objections: delivery time, free returns, secure payment, support contact.</li>
</ul>
<h3>Email 3: The last nudge</h3>
<ul>
<li>Create gentle urgency: low stock or "your cart will expire soon", only if it is true.</li>
<li>If your margins allow, add a small incentive such as free shipping. Use a conditional split so only first-time buyers or high-value carts get it, which protects your margin.</li>
</ul>

<h2>Step 6: Add Smart Splits</h2>
<ul>
<li><strong>New vs returning customers:</strong> returning customers rarely need a discount; new customers may need more reassurance.</li>
<li><strong>Cart value:</strong> high-value carts can get a personal touch, such as a reply-to address for questions.</li>
</ul>

<h2>Step 7: Test, Launch and Measure</h2>
<ol>
<li>Preview each email with a real profile and event so the product block shows real items.</li>
<li>Send tests to Gmail, Outlook and a phone, and check dark mode.</li>
<li>Set the flow to <strong>Live</strong>.</li>
<li>After two to four weeks, compare placed order rate and revenue per recipient for each email, and adjust timing, subject lines and incentives.</li>
</ol>

<h2>Common Mistakes to Avoid</h2>
<ul>
<li>No "Placed Order" filter, so buyers get "you forgot something" emails.</li>
<li>Giving a discount in the first email, which trains shoppers to abandon on purpose.</li>
<li>Generic emails without the actual products.</li>
<li>Templates that break in Outlook or on mobile. Read our guide on <a href="/blog/fix-html-emails-breaking-in-outlook/">fixing emails that break in Outlook</a>.</li>
</ul>
<p>Want to see a flow redesign in action? Read how we helped TechFlow <a href="/case-studies/saas-onboarding-sequence/">raise onboarding completion by 121% with a redesigned Klaviyo flow</a>, or browse our <a href="/portfolio/abandoned-cart-recovery-email/">abandoned cart email design</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>What trigger should I use for an abandoned cart flow in Klaviyo?</h3>
<p>Use the Started Checkout metric for an abandoned checkout flow. If your store sends an Added to Cart event, you can build a separate, earlier flow for shoppers who add to cart but never reach checkout.</p>
<h3>How many emails should an abandoned cart flow have?</h3>
<p>Three emails is a strong starting point: a reminder after 2 to 4 hours, a reassurance email after about 24 hours, and a last nudge after 48 to 72 hours.</p>
<h3>Should I offer a discount in abandoned cart emails?</h3>
<p>Not in the first email. If you use one, put it in the last email and limit it with conditional splits, for example to first-time buyers or high-value carts.</p>
<h3>Can MailStora set up my Klaviyo abandoned cart flow?</h3>
<p>Yes. MailStora builds Klaviyo flows end to end, including triggers, filters, timing, splits and custom-coded templates. <a href="/quote/">Request a free quote</a> to get a price within 24 hours.</p>
`,
},

/* ───────────────────────── 3. Figma handoff checklist ───────────────────────── */
{
    slug: 'figma-to-html-email-handoff-checklist',
    title: 'Figma to HTML Email: The Complete Handoff Checklist for Designers',
    metaTitle: 'Figma to HTML Email: Handoff Checklist for Designers',
    metaDescription: 'A 25-point Figma to HTML email handoff checklist: width, fonts, images, buttons, mobile and dark mode, so your design is coded right the first time.',
    excerpt: 'Designing an email in Figma? Use this checklist before handing it to a developer so the coded email matches your design in Gmail, Outlook and on mobile.',
    category: 'Tutorial',
    tags: ['figma to html email', 'email design', 'html email templates', 'psd to html email'],
    coverImage: IMG + 'service-figma-psd-to-html-email.webp',
    publishedAt: '2026-09-28T10:00:00Z',
    content: `
<p><strong>Short answer:</strong> a Figma email design is ready for HTML when it is 600 to 640 pixels wide, built from simple stacked sections, uses web-safe fallback fonts, has a mobile version, marks every link and piece of live text, and comes with exported images and a dark mode check. Missing any of these usually means rework, delays and an email that looks different in Outlook.</p>

<p>We convert designs to code every day in our <a href="/figma-to-html-email/">Figma to HTML email service</a>. This is the checklist we wish every design file arrived with.</p>

<h2>Layout and Size</h2>
<ol>
<li><strong>Frame width 600 to 640 px.</strong> Wider emails get cut off or shrunk in many inboxes.</li>
<li><strong>Stacked sections.</strong> Design in horizontal bands (header, hero, content blocks, footer). Each band becomes one table row in code.</li>
<li><strong>Two columns at most on desktop</strong>, three only for small items such as icons or products. Complex grids break in Outlook.</li>
<li><strong>Consistent spacing</strong> in multiples of 8 or 10 px, so padding can be coded exactly.</li>
<li><strong>No overlapping elements</strong> unless they are part of one flattened image. Email clients cannot position layers on top of each other reliably.</li>
</ol>

<h2>Typography</h2>
<ol start="6">
<li><strong>Name a fallback font</strong> for every custom font (for example Inter, then Arial). Outlook and many Android apps do not load web fonts.</li>
<li><strong>Body text 14 to 16 px</strong>, headlines 22 px or larger, line height about 1.4 to 1.6.</li>
<li><strong>Keep important text as live text</strong>, not inside images, so it shows when images are blocked, can be read by screen readers and helps deliverability.</li>
<li><strong>Use text styles in Figma</strong> so the developer can reuse the same sizes throughout the email.</li>
</ol>

<h2>Images</h2>
<ol start="10">
<li><strong>Export images at 2x</strong> the displayed size (for example 1200 px wide for a 600 px image) so they are sharp on retina screens.</li>
<li><strong>Keep file sizes small:</strong> under 200 KB per image where possible, and the whole email ideally under 1 MB.</li>
<li><strong>Flatten decorative effects</strong> (shadows, blurs, masks) into the image, because email clients do not support them in CSS.</li>
<li><strong>Write alt text</strong> for every image, or add it as a note next to each image in Figma.</li>
<li><strong>Avoid text over background images</strong> if you can. It needs special code for Outlook. If you use it, pick a solid fallback colour.</li>
</ol>

<h2>Buttons and Links</h2>
<ol start="15">
<li><strong>Design buttons as simple rectangles</strong> with solid colours and live text. Gradients and complex shapes are harder to keep in Outlook.</li>
<li><strong>Buttons at least 44 px tall</strong> so they are easy to tap on phones.</li>
<li><strong>List every link</strong>: button URLs, image links, social icons, footer links and UTM parameters.</li>
<li><strong>Include the legal footer:</strong> company address, unsubscribe link and preference link.</li>
</ol>

<h2>Mobile and Dark Mode</h2>
<ol start="19">
<li><strong>Add a mobile frame</strong> (about 375 px wide) showing how columns stack and which elements are hidden or resized.</li>
<li><strong>Check dark mode:</strong> avoid pure black text on transparent images and provide a light version of the logo if it is dark.</li>
<li><strong>Keep enough colour contrast</strong> for readability (aim for WCAG AA).</li>
</ol>

<h2>Platform Details</h2>
<ol start="22">
<li><strong>Name the email platform</strong> (Klaviyo, Mailchimp, HubSpot and so on). The code is set up differently for each one's editor.</li>
<li><strong>Mark editable areas</strong>: which text, images and sections your team needs to change in the platform later.</li>
<li><strong>Mark dynamic content</strong> such as first name, product feeds or order details.</li>
<li><strong>Add preheader text</strong>, the short line shown after the subject in the inbox.</li>
</ol>

<h2>How to Share the File</h2>
<ul>
<li>Share a Figma link with <strong>view access and Dev Mode</strong> (or export access) so images and measurements can be taken directly.</li>
<li>Put desktop and mobile frames side by side, clearly named.</li>
<li>Add a notes frame with links, fonts, platform and deadlines.</li>
</ul>

<h2>What Happens Next</h2>
<p>With a complete file, a single email template is usually coded, tested in 50+ email clients and delivered within 24 to 48 hours. See the <a href="/pricing/">pricing page</a> for costs, or read <a href="/blog/html-email-template-cost/">how much a custom HTML email template costs</a>. Not sure your design will survive Outlook? Our guide to <a href="/blog/fix-html-emails-breaking-in-outlook/">fixing emails that break in Outlook</a> explains the common traps.</p>

<h2>Frequently Asked Questions</h2>
<h3>What width should an email be in Figma?</h3>
<p>Design the desktop version at 600 to 640 pixels wide, with a separate mobile frame about 375 pixels wide showing how the layout stacks.</p>
<h3>Can any Figma design be turned into an HTML email?</h3>
<p>Most can, but overlapping layers, complex grids, custom fonts and effects like blur need to be simplified or flattened into images so the email works in Outlook and Gmail.</p>
<h3>Do you also convert PSD and Adobe XD files?</h3>
<p>Yes. MailStora converts Figma, Photoshop (PSD), Adobe XD and Illustrator designs into responsive HTML email.</p>
<h3>How long does Figma to HTML email conversion take?</h3>
<p>A single email template is usually delivered within 24 to 48 hours once the design and assets are ready. <a href="/quote/">Request a free quote</a> with your Figma link.</p>
`,
},

/* ───────────────────────── 4. Template cost ───────────────────────── */
{
    slug: 'html-email-template-cost',
    title: 'How Much Does a Custom HTML Email Template Cost in 2026?',
    metaTitle: 'How Much Does a Custom HTML Email Template Cost? (2026)',
    metaDescription: 'Custom HTML email template costs in 2026: typical prices for freelancers, agencies and MailStora, what changes the price, and how to get the best value.',
    excerpt: 'What you should expect to pay for a custom HTML email template in 2026, what drives the price up or down, and how to compare quotes fairly.',
    category: 'Email Marketing',
    tags: ['html email template pricing', 'custom html email templates', 'email template cost'],
    coverImage: '/images/media/email-services-visuals.webp',
    publishedAt: '2026-09-28T11:00:00Z',
    content: `
<p><strong>Short answer:</strong> a custom HTML email template usually costs between about $40 and $500 in 2026, depending on who builds it and how complex it is. Simple templates coded from a finished design sit at the low end; templates that include design, several layouts, dynamic content and platform setup cost more. At MailStora, a custom template starts at $40 and is delivered in 24 to 48 hours.</p>

<h2>Typical Price Ranges in 2026</h2>
<p>These are typical market ranges for one custom-coded template. Prices vary by provider, so always get a written quote.</p>
<table>
<thead><tr><th>Who builds it</th><th>Typical price per template</th><th>Good for</th></tr></thead>
<tbody>
<tr><td>Marketplace freelancer</td><td>$30 to $200</td><td>Simple layouts, flexible deadlines</td></tr>
<tr><td>Specialist email studio or agency</td><td>$40 to $300</td><td>Reliable testing, ESP setup, repeat work</td></tr>
<tr><td>Full-service marketing agency</td><td>$300 to $1,000+</td><td>Strategy, design and copy included</td></tr>
</tbody>
</table>

<h2>What Changes the Price</h2>
<h3>1. Design included or not</h3>
<p>Coding from a finished Figma or PSD file is the cheapest option. If the developer also has to design the email, expect to pay more. Our <a href="/blog/figma-to-html-email-handoff-checklist/">Figma to HTML handoff checklist</a> helps you prepare a design that can be coded quickly.</p>
<h3>2. Layout complexity</h3>
<p>Single-column newsletters are quick. Multi-column product grids, text over background images and interactive elements take longer to make work in Outlook.</p>
<h3>3. Modular vs single-use templates</h3>
<p>A modular template, with reusable sections your team can mix and match, costs more once but saves money every time you send. It is usually the best value for regular campaigns.</p>
<h3>4. Email platform setup</h3>
<p>Uploading to Klaviyo, Mailchimp or HubSpot and setting up editable regions, merge tags and dynamic product blocks adds time. See our <a href="/klaviyo-email-templates/">Klaviyo</a>, <a href="/mailchimp-email-templates/">Mailchimp</a> and <a href="/hubspot-email-templates/">HubSpot</a> template services.</p>
<h3>5. Testing</h3>
<p>Proper testing in Outlook, Gmail, Apple Mail, mobile apps and dark mode takes time. Cheap templates often skip it, and broken emails cost far more in lost sales than the testing saves.</p>
<h3>6. Turnaround</h3>
<p>Rush delivery in hours rather than days may cost extra with some providers.</p>

<h2>MailStora Pricing</h2>
<ul>
<li><strong>Custom HTML email template:</strong> from $40</li>
<li><strong>HTML email signature:</strong> from $25</li>
<li><strong>Standard package (3 templates and 1 signature):</strong> $149</li>
<li><strong>Klaviyo flows, campaigns and larger projects:</strong> quoted per project, usually within 24 hours</li>
</ul>
<p>Every template is hand-coded, tested in 50+ email clients including dark mode, and includes revision rounds. Prices are one-time, with no subscription. Full details are on the <a href="/pricing/">pricing page</a>.</p>

<h2>Custom Template vs Free or Paid Template</h2>
<ul>
<li><strong>Free builder templates</strong> cost nothing but look like everyone else's and are often heavy, which can hurt deliverability and trigger Gmail clipping.</li>
<li><strong>Pre-made paid templates</strong> ($15 to $60) are cheap but need adapting to your brand and platform, which takes time.</li>
<li><strong>Custom templates</strong> match your brand exactly, stay light and are built for your platform's editor, so your team can reuse them for years.</li>
</ul>

<h2>How to Compare Quotes Fairly</h2>
<ol>
<li>Ask which email clients are tested, and whether dark mode and Outlook are included.</li>
<li>Check if uploading to your platform and making sections editable is included.</li>
<li>Ask how many revision rounds you get.</li>
<li>Ask who owns the final code (you should).</li>
<li>Look at real examples, such as our <a href="/portfolio/">portfolio</a> and <a href="/case-studies/">case studies</a>.</li>
</ol>

<h2>Frequently Asked Questions</h2>
<h3>How much does a custom HTML email template cost?</h3>
<p>Typically between $40 and $500 depending on complexity and who builds it. MailStora's custom templates start at $40, and the Standard package with 3 templates and an email signature is $149.</p>
<h3>Why are some email templates so cheap?</h3>
<p>Very cheap templates often skip testing in Outlook and mobile, use heavy builder code, or are not set up for your email platform. Fixing those problems later usually costs more.</p>
<h3>Is a custom email template worth it?</h3>
<p>For most brands that send regularly, yes. A well-built, reusable template saves design and coding time on every campaign and avoids lost sales from broken emails.</p>
<h3>How do I get a price for my email template?</h3>
<p>Send your design or brief through the <a href="/quote/">free quote form</a> and you will get a clear price and timeline within 24 hours.</p>
`,
},

/* ───────────────────────── 5. Gmail signature ───────────────────────── */
{
    slug: 'add-html-signature-gmail',
    title: 'How to Add an HTML Email Signature in Gmail (Step by Step)',
    metaTitle: 'How to Add an HTML Email Signature in Gmail (Step by Step)',
    metaDescription: 'Add an HTML email signature in Gmail step by step, keep images and links working, fix common problems, and roll it out for a Google Workspace team.',
    excerpt: 'Gmail does not let you paste HTML code directly. Here is how to install an HTML signature in Gmail properly, keep images sharp, and fix the most common problems.',
    category: 'Tutorial',
    tags: ['gmail email signature', 'html email signatures', 'email signature design'],
    coverImage: IMG + 'service-html-email-signatures.webp',
    publishedAt: '2026-09-28T12:00:00Z',
    content: `
<p><strong>Short answer:</strong> Gmail does not accept raw HTML code in its signature box. To add an HTML signature, open the signature in a web browser, select it, copy it, and paste it into <strong>Settings &gt; See all settings &gt; General &gt; Signature</strong>. Images must be hosted online (not attached), and the signature must be under Gmail's 10,000-character limit.</p>

<p>If you do not have an HTML signature yet, our <a href="/gmail-email-signature/">Gmail email signature service</a> designs one that is built to paste into Gmail cleanly.</p>

<h2>Before You Start</h2>
<ul>
<li>Have your signature as an <strong>.html file</strong> or a web page link.</li>
<li>Make sure every image (logo, photo, icons) is hosted on a public URL, not embedded or attached. Gmail removes embedded images.</li>
<li>Use Gmail on a <strong>computer</strong>. The Gmail mobile apps only support plain text signatures.</li>
</ul>

<h2>Step-by-Step: Add the Signature in Gmail</h2>
<ol>
<li><strong>Open the signature file</strong> in Chrome or another browser (double-click the .html file, or open the link you were given).</li>
<li><strong>Select the whole signature</strong> with your mouse, or press <code>Ctrl+A</code> (Windows) or <code>Cmd+A</code> (Mac).</li>
<li><strong>Copy it</strong> with <code>Ctrl+C</code> or <code>Cmd+C</code>.</li>
<li>In Gmail, click the <strong>gear icon</strong>, then <strong>See all settings</strong>.</li>
<li>On the <strong>General</strong> tab, scroll to <strong>Signature</strong> and click <strong>Create new</strong>. Give it a name.</li>
<li><strong>Paste</strong> the signature into the box with <code>Ctrl+V</code> or <code>Cmd+V</code>.</li>
<li>Under <strong>Signature defaults</strong>, choose it for new emails and for replies and forwards.</li>
<li>Scroll to the bottom and click <strong>Save Changes</strong>.</li>
<li>Send a test email to yourself and to a colleague who uses Outlook, and check it on a phone.</li>
</ol>

<h2>Fixing Common Gmail Signature Problems</h2>
<h3>Images do not show</h3>
<p>The images are probably embedded or attached. Host them online (your website, or a storage service with public links) and make sure the signature's HTML points to those URLs.</p>
<h3>"Signature is too long" error</h3>
<p>Gmail limits signatures to 10,000 characters of code. Remove unused styles, shorten tracking links, and avoid copying extra page content. A well-coded signature is far under the limit.</p>
<h3>The layout changes or spacing collapses</h3>
<p>Gmail strips some CSS. Signatures should be built with tables and inline styles, which Gmail keeps. If yours was made in a word processor, it will not paste reliably.</p>
<h3>Images look blurry</h3>
<p>Use images exported at twice their displayed size and set a fixed width in the HTML, so they look sharp on retina screens.</p>
<h3>The signature looks different in Outlook</h3>
<p>Your recipients' email client renders the signature, not Gmail. A signature built only for Gmail can break in Outlook. See our guide on <a href="/blog/add-html-signature-outlook/">adding an HTML signature in Outlook</a> and how <a href="/html-email-signature-design/">cross-client HTML signatures</a> are built.</p>

<h2>Rolling Out Signatures for a Google Workspace Team</h2>
<p>For a team, installing signatures one by one gets messy. Options:</p>
<ul>
<li><strong>Admin console:</strong> Google Workspace admins can add a simple footer for all outgoing mail under <em>Apps &gt; Google Workspace &gt; Gmail &gt; Compliance &gt; Append footer</em>. It is appended below each email, separately from personal signatures.</li>
<li><strong>Per-person installs:</strong> give each person their personal signature file and a one-page guide, like the steps above.</li>
<li><strong>Signature tools:</strong> dedicated signature management tools can push signatures to everyone automatically.</li>
</ul>
<p>We designed one consistent signature for <a href="/case-studies/corporate-email-signature/">Apex Financial's 50+ person team</a>, with an installation guide so every employee could set it up in minutes.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can I paste HTML code into a Gmail signature?</h3>
<p>No. Gmail's signature box does not accept code. Open the HTML signature in a browser, copy the rendered signature, and paste it into Gmail.</p>
<h3>Why are the images missing from my Gmail signature?</h3>
<p>Gmail removes embedded and attached images. Host each image online and make sure the signature points to those public image URLs.</p>
<h3>Can I use an HTML signature in the Gmail mobile app?</h3>
<p>The Gmail app only supports plain text signatures. If no mobile signature is set, it can use your desktop signature depending on your settings, so always check how emails sent from your phone look.</p>
<h3>How much does a professional Gmail signature cost?</h3>
<p>At MailStora, an HTML email signature starts at $25, with install instructions for Gmail, Outlook and Apple Mail. <a href="/quote/">Get a free quote</a>.</p>
`,
},

/* ───────────────────────── 6. Outlook signature ───────────────────────── */
{
    slug: 'add-html-signature-outlook',
    title: 'How to Add an HTML Email Signature in Outlook (New and Classic)',
    metaTitle: 'How to Add an HTML Signature in Outlook (New & Classic)',
    metaDescription: 'Add an HTML email signature in new Outlook, classic Outlook for Windows, Outlook on the web and Mac, with fixes for missing images and broken layouts.',
    excerpt: 'Step-by-step instructions for installing an HTML email signature in every version of Outlook, plus fixes for the most common signature problems.',
    category: 'Tutorial',
    tags: ['outlook email signature', 'html email signatures', 'email signature design', 'microsoft 365'],
    coverImage: IMG + 'corporate-newsletter-email-signature.webp',
    publishedAt: '2026-09-28T13:00:00Z',
    content: `
<p><strong>Short answer:</strong> in the new Outlook and Outlook on the web, go to <strong>Settings &gt; Accounts &gt; Signatures</strong>, paste the signature you copied from a browser, and save. In classic Outlook for Windows, go to <strong>File &gt; Options &gt; Mail &gt; Signatures</strong>, or copy the signature's .htm file into the Signatures folder for a pixel-perfect result. Each Outlook app keeps its own signature, so set it up in every version you use.</p>

<p>Need a signature that works everywhere? Our <a href="/outlook-email-signature/">Outlook email signature service</a> builds signatures for classic and new Outlook, Mac and mobile.</p>

<h2>Before You Start</h2>
<ul>
<li>Have the signature as an <strong>.html or .htm file</strong>, with all images hosted online.</li>
<li>Know which Outlook you use: <strong>new Outlook for Windows</strong>, <strong>classic Outlook for Windows</strong>, <strong>Outlook on the web</strong> (outlook.com or Microsoft 365 in a browser), or <strong>Outlook for Mac</strong>.</li>
</ul>

<h2>New Outlook for Windows and Outlook on the Web</h2>
<ol>
<li>Open the signature file in a web browser, select it all and copy it.</li>
<li>In Outlook, open <strong>Settings</strong> (gear icon) &gt; <strong>Accounts</strong> &gt; <strong>Signatures</strong>.</li>
<li>Click <strong>New signature</strong>, name it and paste the signature into the box.</li>
<li>Choose it as the default for new messages and for replies and forwards.</li>
<li>Click <strong>Save</strong> and send yourself a test email.</li>
</ol>
<p>In Microsoft 365, signatures set in Outlook on the web and the new Outlook can sync between the two when roaming signatures are turned on for your account.</p>

<h2>Classic Outlook for Windows</h2>
<h3>Method 1: Copy and paste</h3>
<ol>
<li>Open the signature in a browser, select it all and copy it.</li>
<li>In Outlook, go to <strong>File &gt; Options &gt; Mail &gt; Signatures</strong>.</li>
<li>Click <strong>New</strong>, name the signature and paste it into the editing box.</li>
<li>Choose the default signature for new messages and replies, then click <strong>OK</strong>.</li>
</ol>
<p>Pasting works for simple signatures, but Outlook's Word editor can change spacing and image sizes.</p>
<h3>Method 2: Install the .htm file (most accurate)</h3>
<ol>
<li>Create a signature in Outlook with any placeholder text and give it a name, for example "Company". Close Outlook.</li>
<li>Press <code>Windows + R</code>, type <code>%APPDATA%\\Microsoft\\Signatures</code> and press Enter.</li>
<li>Replace the file <code>Company.htm</code> with your signature file, keeping exactly the same name.</li>
<li>Open Outlook again and select the signature as your default.</li>
</ol>
<p>This keeps the original code, so the signature looks exactly as designed.</p>

<h2>Outlook for Mac</h2>
<ol>
<li>Open the signature in Safari or Chrome, select it and copy it.</li>
<li>In Outlook, go to <strong>Outlook &gt; Settings &gt; Signatures</strong>.</li>
<li>Click <strong>+</strong> to add a signature, paste it, name it and close the window to save.</li>
<li>Set the default signature for each account under <strong>Default signatures</strong>.</li>
</ol>

<h2>Outlook for iPhone and Android</h2>
<p>The Outlook mobile apps support a simpler signature, set under <strong>Settings &gt; Signature</strong>. Keep it to your name, role and phone number, or ask for a mobile-friendly version of your signature.</p>

<h2>Fixing Common Outlook Signature Problems</h2>
<h3>Images show as attachments or red crosses</h3>
<p>Images must be hosted online and linked in the HTML. Embedded images often turn into attachments. Hosted images display as long as the recipient allows images.</p>
<h3>Spacing is too big or the layout breaks</h3>
<p>Classic Outlook uses Word to display email, so signatures must be built with tables, inline styles and fixed image widths. Read <a href="/blog/fix-html-emails-breaking-in-outlook/">why emails break in Outlook</a> to understand the cause.</p>
<h3>Images look huge or blurry</h3>
<p>Set a fixed <code>width</code> attribute on each image in the HTML, and use images exported at twice the displayed size.</p>
<h3>The signature is different on each device</h3>
<p>Each Outlook app stores its own signature. Install it in every app you use, or use Microsoft 365 roaming signatures between Outlook on the web and the new Outlook.</p>

<h2>Rolling Out Signatures Across a Company</h2>
<p>For teams on Microsoft 365, admins can add organisation-wide disclaimers with Exchange mail flow rules, or use a signature management tool. For smaller teams, a standard signature file per person and a simple install guide work well. That is how we delivered one consistent signature for <a href="/case-studies/corporate-email-signature/">Apex Financial's 50+ person team</a>. Using Gmail too? See <a href="/blog/add-html-signature-gmail/">how to add an HTML signature in Gmail</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>Where are Outlook signature files stored on Windows?</h3>
<p>Classic Outlook for Windows stores signatures in the folder <code>%APPDATA%\\Microsoft\\Signatures</code>. Each signature has an .htm, .rtf and .txt version.</p>
<h3>Why does my signature look different in new Outlook and classic Outlook?</h3>
<p>They store signatures separately and render them differently. The new Outlook uses a browser engine, while classic Outlook uses Word. A signature built with tables and inline styles looks the same in both.</p>
<h3>Can I use one HTML signature for Outlook and Gmail?</h3>
<p>Yes, if it is coded for both. MailStora signatures are tested in Outlook, Gmail and Apple Mail and come with install guides for each.</p>
<h3>How much does a professional Outlook signature cost?</h3>
<p>At MailStora, HTML email signatures start at $25, including installation instructions. Company-wide rollouts are quoted per project. <a href="/quote/">Request a free quote</a>.</p>
`,
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
