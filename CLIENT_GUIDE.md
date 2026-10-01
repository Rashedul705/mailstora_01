# MailStora Website: Client Guide

This guide explains what was built, what needs your attention before launch, and how to use the admin panel day to day.

For the technical deploy steps (hosting, environment variables, database), see `README.md` in this same folder.

---

## 1. Action needed before launch (security)

### 1.1 Suspicious files found and removed
While preparing the delivery, we found **Linux programs disguised as email template files** inside the `Email_Template` folders:

| File names | Where they were |
|---|---|
| `send_invitations`, `shoutbox_max`, `admin.sections` | `Client/public/Email_Template/` and `Server/public/Email_Template/` (folders `patric`, `netline` and the top level) |

- There were 9 copies of the same 2.4 MB program in folders that should hold only email images. WordPress `.htaccess` files had also been placed in those image folders.
- This pattern usually means **malware placed on a hacked hosting account**, for example a crypto miner or a backdoor.
- **All of these files were removed from this delivery.** Nothing in the package is a program.

**What you should do:**
1. **Check the server or hosting account the `Email_Template` folders came from.** Look for unknown running processes and unusually high CPU use. Ask your host to run a malware scan.
2. **Change the passwords** for that hosting account (control panel, FTP and SSH).
3. If you have any other copy of this project (an old server, a backup or GitHub), **delete those files there too** before reusing it.

### 1.2 Change these keys
Older versions of some project files contained real passwords and keys. They are removed now, but they may still exist in old copies or git history. **Create new ones before you deploy:**

| Key | Where to change it |
|---|---|
| MongoDB database password | MongoDB Atlas > Database Access |
| Gmail app password (used for sending emails) | Google Account > Security > App passwords |
| ImgBB API key (image uploads) | imgbb.com > API |
| `JWT_SECRET` (admin logins) | Create a new random string of 32+ characters |
| Admin password | Admin > Change Password, right after the first login |

Keep all keys in the hosting provider's environment settings. **Never put them in a file in GitHub.**

---

## 2. What was built

### Website (front end)
| Area | What you get |
|---|---|
| **Homepage** | Redesigned hero, services, additional services (Shopify, social media, SEO/AEO/GEO, performance marketing), portfolio, reviews, process and contact |
| **Email service pages** | HTML email templates, Figma to HTML, Klaviyo, Mailchimp, HubSpot, newsletter, transactional templates, Outlook fixes, email signatures, Klaviyo flows and campaigns, white-label, with generated images |
| **New growth services** | `/seo-aeo-geo-services/` (10 service cards) and `/performance-marketing/` (8 service cards: Meta, TikTok, Google and ChatGPT ads) |
| **Portfolio** | Project grid, featured project, single project pages with desktop and mobile preview tabs |
| **Case studies** | A separate section with its own hub page and story pages (challenge, approach, results, testimonial) |
| **Blog** | 32 published guides of 1,200 to 1,800 words, each with a featured image, a short answer at the top, FAQs and internal links |
| **Booking calendar** | `/schedule/`: visitors pick a date and time and confirm by email code |
| **Other pages** | About, pricing, reviews, FAQ, contact, quote, legal pages |
| **Sales video** | `HANDOVER/video/mailstora-sales-15s.mp4`, a 15-second clip for social media and ads |

### SEO, AEO and GEO work
- A unique title and description on every page, plus canonical tags and social sharing images
- Schema markup: Organization, Service (with a catalogue on the growth pages), FAQ, Breadcrumb, BlogPosting and Article
- `sitemap.xml`, `robots.txt` (open to Google, Bing and AI crawlers) and `llms.txt` (a summary for AI assistants)
- Internal links: every page links to the homepage, blog posts link to services and to each other, and service pages list related guides
- Google Tag Manager (`GTM-PD8M6KDN`), which loads only after the visitor accepts cookies

### Backend (server and admin)
- An Express API with a MongoDB database
- A secure admin panel at `/admin/` with logins and roles
- Content export and import scripts, so the whole site can be moved to a new server

---

## 3. Admin panel guide (`/admin/`)

Log in with the admin account created during setup, then **change the password** under Admin > Change Password.

### Everyday content
| Section | How to use it |
|---|---|
| **Portfolio > All Items / Add New** | Add a project: title, client, platform, cover image, desktop and mobile screenshots and results. Click **Publish** to show it on `/portfolio/`. |
| **Case Studies > All Case Studies / Add New** | Write a case study: headline, summary, challenge, solution, steps, results (value and label) and testimonial. Use the **Linked portfolio project** dropdown to connect it to a project; client, platform and cover image are then filled in for you. The completeness meter shows what is missing. **Save Draft** keeps it private and **Publish** puts it live. |
| **Blog > All Posts / New Post** | Write and publish posts. Always start with a short answer, and end with a "Frequently Asked Questions" heading followed by question headings; the site turns these into FAQ schema. Add tags that match a service, for example `klaviyo flows`. |
| **Page Editor** | Change any text or image on any page, section by section. Changes to the header and footer apply everywhere. Older versions can be restored. |
| **Testimonials, Pricing, Trust Logos** | Update reviews, prices and client logos. |

### Bookings and leads
| Section | How to use it |
|---|---|
| **Schedules** | Set your working days and hours for free calls (entered in Bangladesh time; visitors see New York time and their own time). See upcoming bookings, cancel them or send a message. |
| **Inquiries / Quotes / Orders** | Read contact messages and quote requests, and reply to them. |

### SEO tools
| Section | How to use it |
|---|---|
| **SEO > Pages & Posts** | Edit the title, description, keywords and social image for any page, with an SEO score. |
| **SEO > Bulk Editor** | Edit many titles and descriptions at once. |
| **SEO > General & Schema** | Business details, social profiles, IndexNow (submit new URLs to Bing and AI search). |
| **SEO > Webmaster Tools** | Verification codes for Google, Bing and others, the analytics IDs (GA4, GTM, Clarity, Meta Pixel) and robots.txt. |
| **SEO > Redirections / 404 Monitor / Broken Links** | Fix moved pages and broken links. |

### Settings and team
| Section | How to use it |
|---|---|
| **Site Settings** | Contact email, WhatsApp number, social links (LinkedIn: linkedin.com/in/rislam05) and site statistics. |
| **Users & Activity** | Add team members with roles (admin, editor, SEO) and see a log of every change. |

---

## 4. After launch checklist

- [ ] Home, services, `/seo-aeo-geo-services/`, `/performance-marketing/`, portfolio, case studies and blog all show content
- [ ] The contact form, the quote form and **a test booking on `/schedule/`** all send emails
- [ ] Google Tag Manager: accept the cookie banner, confirm the tag fires in GTM Preview, then add your GA4 tag and click **Publish** in GTM
- [ ] Verify the site in **Google Search Console** and **Bing Webmaster Tools**, then submit `https://mailstora.com/sitemap.xml`
- [ ] Update the LinkedIn company page, Google Business Profile, Clutch and GoodFirms profiles with the new services
- [ ] Run a speed check at https://pagespeed.web.dev

## 5. Ongoing care

| How frequency | Task |
|---|---|
| Weekly | Answer inquiries and bookings; publish one blog post |
| Monthly | Check Search Console for errors, the 404 monitor and broken links; update prices and portfolio |
| Every 3 months | Update older blog posts (dates, screenshots, facts); replace generated images with real client screenshots when you have them |
| Always | Keep keys only in the hosting settings; remove admin users who no longer need access |

---

## 6. Useful files in this folder

| File | What it is |
|---|---|
| `README.md` | Technical deploy guide: hosting, environment variables, database setup |
| `CLIENT_GUIDE.md` | This guide |
| `blog-posts-published.csv` | All 32 blog posts with URLs, keywords and word counts |
| `blog-topics.csv` | The original blog topic plan |
| `image-replacement-plan.csv` | Every image slot, with the recommended replacement and size |
| `video/mailstora-sales-15s.mp4` | The 15-second sales video |
