import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import PageDecor from "../components/PageDecor";
import FounderBar from "../components/FounderBar";
import MidCTA from "../components/MidCTA";
import HomeContact from "../components/HomeContact";
import { siteConfig } from "../../utils/siteConfig";
import "../components/HomeSections.css";
import "./reviews.css";
import HomeLink from "../components/HomeLink";

const { upwork, stats, founder } = siteConfig;
const URL = "https://mailstora.com/reviews/";
const UPWORK_FEEDBACK = () => `${founder.socials.upwork}#:~:text=About-,Client%20feedback,-Work%20history`;

const baseMetadata = (): Metadata => pageMeta("/reviews/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

type Review = { _id: string; name: string; role?: string; text: string; rating?: number; platform?: string; status?: string; featured?: boolean; createdAt?: string };

async function getReviews(): Promise<Review[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}/api/testimonials`, { cache: "no-store" });
        const json = res.ok ? await res.json() : null;
        return Array.isArray(json?.data) ? json.data : [];
    } catch {
        return [];
    }
}

function Stars({ rating = 5, size = 18 }: { rating?: number; size?: number }) {
    return (
        <span className="rv-stars" role="img" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < Math.round(rating) ? "#f5b50a" : "#e5e7eb"} aria-hidden="true">
                    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                </svg>
            ))}
        </span>
    );
}

const fmt = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }) : "";

export default async function ReviewsPage() {
    const reviews = (await getReviews())
        .filter((r) => r.status !== "pending" && r.text)
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
    const [featured, ...rest] = reviews;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://mailstora.com/#mailstora",
        name: "MailStora",
        url: "https://mailstora.com/",
        aggregateRating: { "@type": "AggregateRating", ratingValue: upwork.rating, reviewCount: upwork.reviews, bestRating: "5" },
        review: reviews.slice(0, 10).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewRating: { "@type": "Rating", ratingValue: r.rating ?? 5, bestRating: 5 },
            reviewBody: r.text,
            ...(r.createdAt ? { datePublished: r.createdAt.slice(0, 10) } : {}),
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />
            <main className="main">
                <PageDecor />

                {/* ── Hero with rating summary ── */}
                <section className="rv-hero" aria-labelledby="rv-title">
                    <div className="container">
                        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Client Reviews", url: "/reviews/" }]} />
                        <div className="rv-hero-inner">
                            <div>
                                <p className="rv-eyebrow">Client Reviews</p>
                                <h1 id="rv-title">
                                    What Clients Say About <span>MailStora</span>
                                </h1>
                                <p className="rv-lead">
                                    Real feedback from brands, agencies and founders who hired MailStora for HTML email templates,
                                    email signatures, Klaviyo automation and social media. Every review below comes from a completed
                                    Upwork project.
                                </p>
                                <div className="rv-hero-actions">
                                    <a href={UPWORK_FEEDBACK()} target="_blank" rel="noopener noreferrer" className="rv-btn-upwork">
                                        View All Reviews on Upwork
                                    </a>
                                    <Link href="/quote/" className="home-btn-primary">Get a Free Quote</Link>
                                </div>
                            </div>

                            <div className="rv-score">
                                <p className="rv-score-num">{upwork.rating}</p>
                                <Stars rating={Number(upwork.rating)} size={26} />
                                <p className="rv-score-label">Average rating from {upwork.reviews} Upwork reviews</p>
                                <ul className="rv-score-stats">
                                    <li><strong>{upwork.jobSuccess}</strong><span>Job Success</span></li>
                                    <li><strong>{upwork.badge}</strong><span>Upwork badge</span></li>
                                    <li><strong>{upwork.totalJobs}</strong><span>Jobs completed</span></li>
                                    <li><strong>{stats.upworkHours}</strong><span>Hours worked</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Featured review ── */}
                {featured && (
                    <section className="rv-featured-wrap" aria-label="Featured review">
                        <div className="container">
                            <figure className="rv-featured">
                                <svg className="rv-featured-quote" width="64" height="64" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="currentColor" d="M9.6 6C6.5 7.4 4.5 10 4.5 13.4V18h6v-6h-3c0-1.9 1.1-3.4 3.1-4.3L9.6 6zm9 0c-3.1 1.4-5.1 4-5.1 7.4V18h6v-6h-3c0-1.9 1.1-3.4 3.1-4.3L18.6 6z" />
                                </svg>
                                <Stars rating={featured.rating ?? 5} size={22} />
                                <blockquote>&ldquo;{featured.text}&rdquo;</blockquote>
                                <figcaption>
                                    <strong>{featured.name}</strong>
                                    <span>{[featured.role, fmt(featured.createdAt)].filter(Boolean).join(" · ")}</span>
                                </figcaption>
                            </figure>
                        </div>
                    </section>
                )}

                {/* ── All reviews ── */}
                <section className="rv-list" aria-labelledby="rv-list-title">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">Verified Project Feedback</p>
                            <h2 id="rv-list-title" className="hs-title">
                                Reviews From <span>Real Projects</span>
                            </h2>
                            <p className="hs-subtitle">Each review shows the project it came from, so you can see the work behind the rating.</p>
                        </header>
                        <ul className="rv-grid">
                            {rest.map((r) => (
                                <li key={r._id} className="rv-card">
                                    <div className="rv-card-top">
                                        <Stars rating={r.rating ?? 5} />
                                        <span>{(r.rating ?? 5).toFixed(1)}</span>
                                    </div>
                                    {r.role && <h3>{r.role}</h3>}
                                    <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
                                    <footer>
                                        <strong>{r.name}</strong>
                                        <span>{fmt(r.createdAt)}</span>
                                        {r.platform === "upwork" && <em>Upwork</em>}
                                    </footer>
                                </li>
                            ))}
                        </ul>
                        <p className="rv-more">
                            <a href={UPWORK_FEEDBACK()} target="_blank" rel="noopener noreferrer" className="rv-btn-upwork">
                                Read all {upwork.feedbackCount} reviews on Upwork
                            </a>
                        </p>
                    </div>
                </section>

                <FounderBar />
                <HomeLink />
                <MidCTA
                    eyebrow="Join our happy clients"
                    title="Get the Same Results for Your Emails"
                    text="Share your project and get a free quote within 24 hours from a Top Rated email developer."
                    cta="Get a Free Quote"
                />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}
