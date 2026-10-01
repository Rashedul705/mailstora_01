import { templateMeta } from "@/lib/seoTemplate";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import MidCTA from "../../components/MidCTA";
import HomeContact from "../../components/HomeContact";
import { siteConfig } from "../../../utils/siteConfig";
import ShareButtons from "./ShareButtons";
import { autoLink, topicsIn } from "@/lib/topics";
import { SOCIALS } from "../../components/Footer";
import "./post.css";
import HomeLink from "../../components/HomeLink";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
const IMG = "/images/media/cropped/";

type Post = {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: string;
    category: string;
    tags?: string[];
    author?: { name?: string };
    publishedAt?: string;
    updatedAt?: string;
    metaTitle?: string;
    metaDescription?: string;
    readingTime?: number;
};

async function getPost(slug: string): Promise<Post | null> {
    try {
        const res = await fetch(`${API_BASE}/api/blog/${slug}`, { cache: "no-store" });
        return res.ok ? res.json() : null;
    } catch {
        return null;
    }
}

// Related posts: shared tags count most, then same category, then newest
async function getRelated(post: Post): Promise<Post[]> {
    try {
        const res = await fetch(`${API_BASE}/api/blog?limit=50`, { next: { revalidate: 300 } });
        if (!res.ok) return [];
        const data = await res.json();
        const tags = new Set((post.tags || []).map((t) => t.toLowerCase()));
        return (data.posts as Post[])
            .filter((p) => p.slug !== post.slug)
            .map((p) => ({ p, score: (p.tags || []).filter((t) => tags.has(t.toLowerCase())).length * 2 + (p.category === post.category ? 1 : 0) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map((x) => x.p);
    } catch {
        return [];
    }
}

// Q&A pairs from the post's FAQ section (h3 question followed by its answer) for FAQPage schema
function faqFrom(html: string) {
    const start = html.search(/<h2[^>]*>[^<]*(Frequently Asked|FAQ)[^<]*<\/h2>/i);
    if (start < 0) return [];
    const part = html.slice(start).split(/<h2/i)[1] ? "<h2" + html.slice(start).split(/<h2/i)[1] : html.slice(start);
    const out: { q: string; a: string }[] = [];
    part.replace(/<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/gi, (_m, q: string, a: string) => {
        const text = a.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        if (text) out.push({ q: q.replace(/<[^>]+>/g, "").trim(), a: text });
        return "";
    });
    return out;
}

const TOC_SHOWN = 5; // sections listed before "Show all"

const slugify = (s: string) =>
    s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Give every <h2> an id and collect them for the "On this page" list. */
function withToc(html: string) {
    const toc: { id: string; text: string }[] = [];
    const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_m, attrs: string, inner: string) => {
        const text = inner.replace(/<[^>]+>/g, "").trim();
        const id = slugify(text);
        toc.push({ id, text });
        return `<h2${attrs.includes("id=") ? attrs : `${attrs} id="${id}"`}>${inner}</h2>`;
    });
    return { html: out, toc };
}

async function baseGenerateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: "Post Not Found | MailStora" };
    // Own SEO fields first, then the blog template from Admin › SEO › General
    const tpl = await templateMeta("blog", { title: post.title, category: post.category, excerpt: post.excerpt, year: post.publishedAt?.slice(0, 4) });
    const title = post.metaTitle || tpl.title;
    const description = post.metaDescription || tpl.description;
    const url = `https://mailstora.com/blog/${slug}/`;
    const images = post.coverImage ? [{ url: post.coverImage, alt: post.title }] : [];
    return {
        title,
        description,
        keywords: [...(post.tags || []), post.category].filter(Boolean),
        alternates: { canonical: url },
        openGraph: { title, description, url, siteName: "MailStora", type: "article", images },
        twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
    };
}

const SIDEBAR_SERVICES = [
    { label: "HTML Email Templates", href: "/html-email-template-development/", img: IMG + "service-html-email-templates.webp" },
    { label: "Figma & PSD to HTML", href: "/figma-to-html-email/", img: IMG + "service-figma-psd-to-html-email.webp" },
    { label: "Klaviyo Flow Setup", href: "/klaviyo-flow-setup/", img: IMG + "service-klaviyo-automation-flows.webp" },
    { label: "Email Campaigns", href: "/klaviyo-campaign-management/", img: IMG + "service-klaviyo-mailchimp-campaigns.webp" },
    { label: "HTML Email Signatures", href: "/html-email-signature-design/", img: IMG + "service-html-email-signatures.webp" },
    { label: "Email Testing & Outlook Fixes", href: "/outlook-email-rendering-fix/", img: IMG + "service-email-testing-outlook-fixes.webp" },
];

const arrow = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return (
            <>
                <Navbar />
                <main className="main bp-missing">
                    <h1>Post not found</h1>
                    <p>This article may have moved or been unpublished.</p>
                    <Link href="/blog/" className="home-btn-primary">Back to the blog</Link>
                </main>
                <Footer />
            </>
        );
    }

    const related = await getRelated(post);
    const toc0 = withToc(post.content);
    const toc = toc0.toc;
    // Link the first mention of each service topic to its hub page (semantic internal links)
    const html = autoLink(toc0.html);
    const topics = topicsIn(html, [post.title, ...(post.tags || [])]);
    const faqs = faqFrom(post.content);
    const words = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const author = post.author?.name || siteConfig.founder.name;
    const date = post.publishedAt ? new Date(post.publishedAt) : null;
    const url = `https://mailstora.com/blog/${post.slug}/`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription || post.excerpt,
        image: post.coverImage ? (post.coverImage.startsWith("/") ? `https://mailstora.com${post.coverImage}` : post.coverImage) : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: { "@type": "Person", "@id": "https://mailstora.com/#founder", name: author, url: "https://mailstora.com/about/", sameAs: Object.values(siteConfig.founder.socials) },
        publisher: { "@type": "Organization", "@id": "https://mailstora.com/#mailstora", name: "MailStora", logo: { "@type": "ImageObject", url: "https://mailstora.com/images/brand/mailstora-logo-2026.png" } },
        mainEntityOfPage: url,
        articleSection: post.category,
        keywords: (post.tags || []).join(", ") || undefined,
        wordCount: words,
        inLanguage: "en",
        isPartOf: { "@type": "Blog", "@id": "https://mailstora.com/blog/#blog", name: "MailStora Blog", url: "https://mailstora.com/blog/" },
        // Entities the post is about: the main service topic, then others it covers
        ...(topics[0] ? { about: { "@type": "Service", "@id": `https://mailstora.com/${topics[0].slug}/#service`, name: topics[0].name } } : {}),
        ...(topics.length > 1 ? { mentions: topics.slice(1, 8).map((t) => ({ "@type": "Service", "@id": `https://mailstora.com/${t.slug}/#service`, name: t.name })) } : {}),
    };
    const faqLd = faqs.length
        ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }
        : null;
    // Sidebar: services this article covers first, then the core services
    const covered = topics.map((t) => t.slug);
    const sidebar = [...SIDEBAR_SERVICES.filter((s) => covered.includes(s.href.slice(1, -1))), ...SIDEBAR_SERVICES.filter((s) => !covered.includes(s.href.slice(1, -1)))];
    const extraTopics = topics.filter((t) => !SIDEBAR_SERVICES.some((s) => s.href === `/${t.slug}/`)).slice(0, 4);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
            {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />}
            <Navbar />
            <main className="main bp">
                {/* ── Header: title and meta on the left, featured image on the right ── */}
                <header className="bp-head">
                    <div className="container bp-head-inner">
                        <div className="bp-head-copy">
                            <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Blog", url: "/blog/" }, { label: post.title, url: `/blog/${post.slug}/` }]} />
                            <p className="bp-cat">{post.category}</p>
                            <h1>{post.title}</h1>
                            <div className="bp-meta">
                                <span>
                                    {date && <time dateTime={post.publishedAt}>{date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>}
                                    {" · "}By <Link href="/about/">{author}</Link>
                                    {post.readingTime ? ` · ${post.readingTime} min read` : ""}
                                </span>
                                <ShareButtons title={post.title} url={url} />
                            </div>
                        </div>
                        {post.coverImage && (
                            <div className="bp-cover">
                                <Image src={post.coverImage} alt={post.title} width={1200} height={630} priority sizes="(max-width: 1024px) 90vw, 520px" />
                            </div>
                        )}
                    </div>
                </header>

                {/* ── Body: contents + CTA | article | CTA + services ── */}
                <div className="container bp-body">
                    <aside className="bp-left" aria-label="On this page">
                        {toc.length > 0 && (
                            <details className="bp-toc" open>
                                <summary>
                                    <span>On this page</span>
                                    <span className="bp-toc-count">{toc.length}</span>
                                    <svg className="bp-toc-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                                </summary>
                                <nav aria-label="Table of contents">
                                <ol>
                                    {toc.slice(0, TOC_SHOWN).map((t) => (
                                        <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>
                                    ))}
                                </ol>
                                {toc.length > TOC_SHOWN && (
                                    // Long lists fold after the first few items so the quote card below stays in view
                                    <details className="bp-toc-more">
                                        <summary>
                                            <span className="bp-toc-more-open">Show all {toc.length} sections</span>
                                            <span className="bp-toc-more-close">Show fewer</span>
                                        </summary>
                                        <ol>
                                            {toc.slice(TOC_SHOWN).map((t) => (
                                                <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>
                                            ))}
                                        </ol>
                                    </details>
                                )}
                            </nav>
                            </details>
                        )}
                        <div className="bp-cta-card">
                            <p className="bp-cta-eyebrow">Free quote</p>
                            <p className="bp-cta-title">Get your email template quoted in 24 hours</p>
                            <p className="bp-cta-text">Send your design or brief. Templates from $40, hand-coded and tested in 50+ inboxes.</p>
                            <Link href="/quote/" className="bp-cta-btn">Get a Free Quote</Link>
                        </div>
                    </aside>

                    <article className="bp-article">
                        {post.excerpt && <p className="bp-lead">{post.excerpt}</p>}
                        <div className="bp-content" dangerouslySetInnerHTML={{ __html: html }} />
                        <HomeLink inline />

                        {topics.length > 0 && (
                            <nav className="bp-topics" aria-label="Services covered in this article">
                                <p><strong>Services covered in this article:</strong></p>
                                <ul>
                                    {topics.slice(0, 6).map((t) => (
                                        <li key={t.slug}><Link href={`/${t.slug}/`}>{t.name}</Link></li>
                                    ))}
                                </ul>
                            </nav>
                        )}

                        {post.tags && post.tags.length > 0 && (
                            <ul className="bp-tags" aria-label="Tags">
                                {post.tags.map((t) => (
                                    <li key={t}>#{t}</li>
                                ))}
                            </ul>
                        )}

                        <div className="bp-author">
                            <Image src="/images/brand/rashedul-islam-founder.webp" alt={author} width={72} height={72} />
                            <div>
                                <p className="bp-author-name">Written by {author}</p>
                                <p>
                                    Founder of MailStora and a {siteConfig.upwork.badge} HTML email developer with {siteConfig.stats.yearsExperience} years
                                    of experience and {siteConfig.stats.templatesBuilt} templates delivered.
                                </p>
                                <ul className="bp-author-social" aria-label={`${author} on social media`}>
                                    {SOCIALS().map((s) => (
                                        <li key={s.label}>
                                            <a href={s.href} target="_blank" rel="noopener noreferrer me" aria-label={`${author} on ${s.label}`} title={s.label}>
                                                <svg width="16" height="16" viewBox={s.box} fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                                            </a>
                                        </li>
                                    ))}
                                    <li><Link href="/about/" className="bp-author-more">About the author →</Link></li>
                                </ul>
                            </div>
                        </div>
                    </article>

                    <aside className="bp-right" aria-label="MailStora services">
                        <div className="bp-cta-card bp-cta-card--dark">
                            <p className="bp-cta-title">Need emails that work in every inbox?</p>
                            <p className="bp-cta-text">Talk to our email team. Replies within 2 to 4 hours, no obligation.</p>
                            <Link href="/schedule/" className="bp-cta-btn">Book a Free Consultation</Link>
                        </div>
                        <div className="bp-services">
                            <p>Our services</p>
                            <ul>
                                {sidebar.map((s) => (
                                    <li key={s.href}>
                                        <Link href={s.href}>
                                            <Image src={s.img} alt="" width={52} height={52} />
                                            <span>{s.label}</span>
                                            {arrow}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {extraTopics.length > 0 && (
                                <ul className="bp-services-more">
                                    {extraTopics.map((t) => <li key={t.slug}><Link href={`/${t.slug}/`}>{t.name}</Link></li>)}
                                </ul>
                            )}
                            <Link href="/services/" className="bp-services-all">View all services {arrow}</Link>
                        </div>
                    </aside>
                </div>

                {related.length > 0 && (
                    <section className="bp-related" aria-labelledby="bp-related-title">
                        <div className="container">
                            <h2 id="bp-related-title">Related Articles</h2>
                            <ul>
                                {related.map((r) => (
                                    <li key={r.slug}>
                                        <Link href={`/blog/${r.slug}/`}>
                                            {r.coverImage && <Image src={r.coverImage} alt="" width={400} height={250} sizes="(max-width: 640px) 90vw, 360px" />}
                                            <span className="bp-cat">{r.category}</span>
                                            <strong>{r.title}</strong>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                <MidCTA
                    eyebrow="Ready when you are"
                    title="Get Hand-Coded Emails That Work in Every Inbox"
                    text="Share your design or brief and get a free quote within 24 hours."
                    cta="Get a Free Quote"
                />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return withSeo(await baseGenerateMetadata({ params }), `/blog/${slug}/`);
}
