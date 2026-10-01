# MailStora Website: Handover Guide

This folder explains how to launch the redesigned mailstora.com, what still needs your input, and what to do after launch.

| File | What it is |
|---|---|
| `CLIENT_GUIDE.md` | Plain-English guide for the client: security actions, what was built, how to use the admin |
| `README.md` | This guide: deploy steps, settings, admin, SEO checklist, image and blog plans |
| `image-replacement-plan.csv` | Every image slot on the site, what to replace, sizes, and a ready-to-use AI/designer prompt |
| `blog-topics.csv` | The original 15 blog topics with keywords, intent and the service page each one supports |
| `blog-posts-published.csv` | All 32 published blog posts: title, URL, category, main keyword, word count, date and featured image |
| `video/mailstora-sales-15s.mp4` | 15-second sales video for social media and ads |

---

## 1. What is in this project

| Folder | What it is | Where to host |
|---|---|---|
| `Client/` | The website (Next.js 16) | Vercel or Netlify |
| `Server/` | The API and admin backend (Express + MongoDB) | Render, Railway, a VPS or any Node.js host |

Vercel and Netlify can host **only the `Client` folder**. The `Server` folder must run on a Node.js host, because it keeps a database connection open and handles uploads.

You also need a **MongoDB database**. MongoDB Atlas has a free tier: https://www.mongodb.com/atlas

---

## 2. Deploy step by step

### Step 1: Database
1. Create a MongoDB Atlas cluster and a database user.
2. Copy the connection string, for example `mongodb+srv://USER:PASSWORD@cluster.mongodb.net/mailstora`.

### Step 2: Backend (`Server/`)
1. Create a Web Service on Render (or Railway). Root directory: `Server`. Build command: `npm install`. Start command: `npm start`.
2. Add these environment variables:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Your Atlas connection string |
| `JWT_SECRET` | A long random string (32+ characters). **The server will not start without it.** |
| `FRONTEND_URL` | `https://mailstora.com` |
| `EXTRA_ORIGINS` | `https://www.mailstora.com` (optional) |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` | SMTP details for contact and quote emails |
| `IMGBB_API_KEY` | For image uploads in the admin (free key at imgbb.com) |
| `ADMIN_PASSWORD` | The password for the first admin login |
| `REDIS_URL` | Optional. Leave empty if you have no Redis. |
| `MASTER_OTP` | Leave **empty** in production |

> The `EMAIL_*` settings are also needed for the **booking calendar** on `/schedule/`: visitors confirm a booking with a 6-digit code sent by email. Without working email, nobody can complete a booking.

3. **Load the website content** into the new database. Run these once from the `Server` folder, with the environment variables above set (Render: use the Shell tab):
   ```
   npm run content:import
   npm run seed
   ```
   - `content:import` loads the portfolio, case studies, reviews, pricing, all 32 blog posts, booking hours, SEO settings (including the Google Tag Manager ID) and robots.txt from `Server/seeds/content/`.
   - `seed` creates the admin login (username `admin`, password from `ADMIN_PASSWORD`).
   - **Without this step the site will show empty portfolio, reviews and pricing sections.**

### Step 3: Website (`Client/`)
1. Push the project to GitHub and import it in Vercel or Netlify.
   - **Vercel:** set the Root Directory to `Client`.
   - **Netlify:** the included `netlify.toml` already sets the base directory to `Client`.
2. Add these environment variables:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | The backend URL from Step 2, e.g. `https://api.mailstora.com` (no trailing slash) |
| `SITE_UPDATED` | Today's date, e.g. `2026-10-01`. Update it when you change page content. |

3. Deploy, then connect the domain `mailstora.com` (and redirect `www` to it).

### Step 4: Check the launch
- [ ] Home, a service page, `/portfolio/`, `/case-studies/`, `/blog/` and `/reviews/` show content
- [ ] `/seo-aeo-geo-services/` and `/performance-marketing/` open, and both appear in the Services menu
- [ ] `/schedule/`: pick a date and time, fill the form, and check the confirmation code arrives by email
- [ ] `https://mailstora.com/robots.txt`, `/sitemap.xml` and `/llms.txt` open
- [ ] `/admin/` login works; then **change the password** in Admin > Change Password
- [ ] The contact and quote forms send an email
- [ ] Google Tag Manager: accept the cookie banner, then check in GTM Preview that the container `GTM-PD8M6KDN` fires. Add your tags (GA4 and others) in GTM and click **Publish**.

### Upgrading an existing database (skip for a fresh launch)
If you are updating a database that already has the old portfolio data, run this once from `Server/` to move case studies into their own collection:
```
node scripts/migrateCaseStudies.js
```
It copies every portfolio project that had a case study switched on into the new Case Studies section. It never overwrites a case study that already exists, so it is safe to run twice.

### Files to leave out of the zip or GitHub
`node_modules/`, `.next/`, `Server/.env`, `Client/.env.local`, `Server/uploads/`, `Server/scratch/`, screenshots in the root folder. These are already listed in `.gitignore`.

> **Security:** earlier versions of `.env.example` and `upload_logo.js` contained real passwords and keys (MongoDB, Gmail app password, ImgBB). They have been removed from the files, but they may still be in the git history. **Change the MongoDB password, the Gmail app password and the ImgBB key** before launch.

---

## 3. Admin panel (`/admin/`)

| Area | What you can do |
|---|---|
| **Page Editor** | Change any text or image on any page, section by section. Header and footer changes apply to every page. Revisions can be restored. |
| **Site Settings** | Contact email, WhatsApp, social links, Upwork numbers and site-wide stats |
| **SEO > Pages & Posts** | Per-page title, description, keywords, canonical, noindex, social image and custom schema, with an SEO score |
| **SEO > Bulk Editor** | Edit titles and descriptions for many pages at once |
| **SEO > General & Schema** | Business details used in the Organization schema, social profiles, IndexNow |
| **SEO > Webmaster Tools** | Google, Bing, Yandex and Pinterest verification codes, GA4, GTM (set to `GTM-PD8M6KDN`), Clarity, Meta Pixel, robots.txt |
| **SEO > Redirections / 404 Monitor / Broken Links** | Manage redirects, see missing pages, scan for broken links |
| **Portfolio** | Portfolio projects (designs, previews, results) |
| **Case Studies** | Separate from the portfolio. Write, publish and order case studies. Each one can link to a portfolio project (optional); picking a project fills in the client, platform and cover image for you. |
| **Schedules** | Set the days and hours for free consultation calls (Bangladesh time), see upcoming bookings, cancel them or send a message |
| **Blog** | Posts, categories, tags, media |
| **Users & Activity** | Team logins with roles (admin, editor, SEO) and a log of every change |

When analytics IDs are added, a cookie consent banner appears automatically. Tracking loads only after the visitor accepts.

---

## 4. What is new in this version

### New service pages
| Page | What it covers |
|---|---|
| `/seo-aeo-geo-services/` | SEO, AEO and GEO in one plan, with 10 sub-service cards (image, text, 4 points, button): strategy, technical SEO, on-page SEO, content, off-page, local, ecommerce SEO, AEO, GEO and reporting |
| `/performance-marketing/` | 8 sub-service cards: strategy, Meta, TikTok, Google and ChatGPT ads, tracking, creative testing, ads plus email |

Both appear on the homepage under **Additional Services**, in the **Services** mega menu, on `/services/`, on the About page, in `sitemap.xml` and in `llms.txt`. The homepage hero and About page now mention these services, with email still presented as the main specialism.

Page text lives in `Client/src/app/components/service/growth.ts`; the cards are in `growthCards.ts`. Each card lists the tools and platforms it covers, which are added to the page schema as a service catalogue. The pages make no promises about rankings, AI mentions or ad returns. ChatGPT ads are described as a new channel tested in limited markets; update that wording when the format becomes widely available.

### Case studies separated from the portfolio
- Case studies now have their own database collection (`caseStudies`), their own API (`/api/case-studies`) and their own admin section.
- Portfolio projects no longer contain case study text. A project page shows "Read the Case Study" only when a case study is linked to it.

### Booking calendar on `/schedule/`
Visitors pick a date, a 30-minute time (shown in New York time and in their own time), a meeting method (Google Meet, Zoom or WhatsApp) and their details, then confirm with an email code. Days and hours come from **Admin > Schedules**. With no hours set, Monday to Friday is offered. An unconfirmed booking holds its time only while its code is valid (5 minutes).

### Blog
- **32 published posts**, each 1,200 to 1,800 words, with a short answer at the top, an FAQ section (FAQ schema is added automatically), a generated featured image and 8 to 14 internal links to services, portfolio, case studies and other posts.
- Older posts have a "Related Guides" list linking to the newer posts. Every post is linked from at least one other post.
- Long contents lists fold after 5 items ("Show all") so the quote card in the sidebar stays visible.
- The full list is in `blog-posts-published.csv`.

### Other changes
- **Google Tag Manager** (`GTM-PD8M6KDN`) on every page. It loads after the visitor accepts cookies; a no-JavaScript fallback sits right after the opening `<body>` tag.
- **LinkedIn** link updated to https://www.linkedin.com/in/rislam05/ everywhere.
- **One homepage link from every page**, using the target keyword "HTML email development agency" on about 60% of pages and related terms on the rest.

### Images: the built-in image generator
All featured images for blog posts and the section images on service pages are drawn by code, so they can be changed and regenerated at any time.
| Command (run in `Client/`) | What it makes |
|---|---|
| `node scripts/image-gen/blog-covers.js [slug]` | Blog featured images (1200 x 630) in `public/images/media/generated/blog-<slug>.webp` |
| `node scripts/image-gen/build-sections.js [slug,slug]` | Service page images: hero, intro, phone and offer |
| `node scripts/image-gen/guide-images.js [slug]` | One image per card on the SEO and performance marketing pages |

Brand icons (Gmail, Klaviyo, Shopify, Meta, TikTok, Google Ads, ChatGPT and others) come from Simple Icons (free CC0 licence) in `scripts/image-gen/brand-icons.json`. The ads dashboard image uses **example figures** (4.2x ROAS, $18 CPA), not client results.

### Content scripts (run in `Server/`)
| Command | What it does |
|---|---|
| `node seeds/blogGuides.js`, `blogGuides2.js`, `blogGuides3.js`, `blogGuides4.js` | Create the blog posts (short first versions) |
| `node seeds/applyExpanded.js [slug]` | Replace post text with the long versions in `seeds/expanded/`. **Run this after any `blogGuides` script**, or the posts go back to the short versions. |
| `node seeds/addRelatedLinks.js` | Add the "Related Guides" lists to older posts (skips posts that already have one) |
| `node scripts/exportContent.js` | Save the current database content to `seeds/content/` for a new server |

For a new server you do not need these: `npm run content:import` already loads the final posts.

---

## 5. SEO, AEO and GEO: what is done

- Every page: unique title (max 60 characters), description (max 160), keywords, canonical URL, Open Graph and Twitter cards
- Schema: Organization + founder + website on every page; Service, FAQ and Breadcrumb on service pages; BlogPosting and FAQ on posts; CreativeWork on portfolio items; Article on case studies
- `sitemap.xml` with images and real last-modified dates; `robots.txt` open to Google, Bing and AI crawlers (GPTBot, ClaudeBot, PerplexityBot and others)
- `llms.txt`: a plain-text summary of MailStora for AI assistants
- Internal linking: blog posts link to service pages automatically; service pages list related guides and portfolio work
- `/Email_Template/`, `/checkout/` and the admin are kept out of search results
- Redirects, 404 monitoring, IndexNow and webmaster verification are managed in the admin

### After launch (needs your accounts)
1. **Google Search Console** and **Bing Webmaster Tools**: verify the site (Admin > SEO > Webmaster Tools), then submit `https://mailstora.com/sitemap.xml`. Bing also feeds ChatGPT, Copilot and Perplexity.
2. **IndexNow**: Admin > SEO > General > submit your URLs after launch and after each new post.
3. **Profiles that confirm the business** (these matter most for AI answers): LinkedIn company page, Google Business Profile, Clutch, GoodFirms. Add each link in Admin > SEO > General > Social profiles.
4. **Reviews**: ask happy clients to review MailStora on Clutch or Google.
5. **Speed check**: run https://pagespeed.web.dev on the live site.

---

## 6. Image replacement plan

Many sections reuse the same stock images (for example, the same welcome-email image appears in 8 places). Search engines and visitors reward unique, relevant images. Open **`image-replacement-plan.csv`** in Excel or Google Sheets:

- **153 image slots**, each with an ID, page, section, current file, status, recommended size, format and a ready-made prompt.
- Work in this order: **High** priority first (placeholders on real client projects, the social share image, the contact photo), then Medium, then Low.
- **Real client work must use real screenshots, never AI images.** AI is fine for illustrations and concept examples.
- Replace images without code: **Admin > Page Editor** (pick the page, open the section, paste the new image URL or upload), for portfolio items **Admin > Portfolio > Edit**, and for case studies **Admin > Case Studies > Edit**.
- Many slots now use generated images (see section 4). Replace them with real screenshots whenever you have them.

### Master brief for the designer or AI tool
Paste this before any prompt from the CSV:

> You are designing images for MailStora, an HTML email development agency. The images sit on a clean, light website with orange (#F97316) and green (#16A34A) accents and dark navy (#0F172A) text. Show realistic email designs on laptops, phones or as flat screenshots. Use readable, sensible placeholder copy that matches the section (never lorem ipsum or garbled text). Keep a consistent style across all images: soft shadows, rounded corners, gentle gradients, plenty of white space. No watermarks. Only show third-party logos (Klaviyo, Mailchimp, Outlook, Gmail) when the section is about that platform. Export at the exact size in the CSV, as WebP, within the listed file size.

---

## 7. Blog plan

All 15 topics in `blog-topics.csv` are now published, along with 17 more (see `blog-posts-published.csv`). For new ideas, the topics people discuss most in 2026 are the new Outlook, Gmail and Yahoo sender rules, list quality, and AI in email.

`blog-topics.csv` lists the original **15 topics**, chosen for search demand and buying intent. Each one links to the service page it supports, so readers flow from the article to a quote.

Publishing tips:
- One post per week. Start with topics 1, 4, 2, 5 and 14 (closest to a purchase).
- 1,500 to 2,500 words, with real screenshots, a short answer in the first paragraph (for Google and AI answers) and an FAQ section at the end (it becomes FAQ schema automatically).
- Mention the service by name in the text. The site links the first mention to the service page automatically.
- Add tags that match the service (for example `klaviyo flows`). The service page then lists the post under "Guides".
- After publishing: submit the URL in Admin > SEO > General > IndexNow and share it on LinkedIn.
