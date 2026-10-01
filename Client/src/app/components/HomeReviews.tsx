"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "../../utils/siteConfig";
import "./HomeSections.css";

type Review = {
    _id: string;
    name: string;
    role?: string; // project title for Upwork reviews
    text: string;
    rating?: number;
    platform?: "upwork" | "fiverr" | "direct";
    featured?: boolean;
    status?: string;
    createdAt?: string;
};

const UPWORK_FEEDBACK_URL = () => `${siteConfig.founder.socials.upwork}#:~:text=About-,Client%20feedback,-Work%20history`;

function Stars({ rating = 5 }: { rating?: number }) {
    return (
        <span className="hs-stars" role="img" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < Math.round(rating) ? "#f5b50a" : "#e5e7eb"} aria-hidden="true">
                    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                </svg>
            ))}
        </span>
    );
}

function formatDate(iso?: string) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** Client feedback carousel: one review at a time, arrows to move. All slides share one grid cell, so every card is the same height. */
export default function HomeReviews({ reviews = [] }: { reviews?: Review[] }) {
    const shown = reviews
        .filter((r) => r.status !== "pending" && r.text)
        // Homepage stays on email work; social media reviews live on /reviews/
        .filter((r) => !/instagram|social media|followers|advertising|facebook ads/i.test(`${r.role || ""} ${r.text}`))
        .sort((a, b) => Number(b.featured) - Number(a.featured) || (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
    const [index, setIndex] = useState(0);

    if (shown.length === 0) return null;

    const go = (step: number) => setIndex((i) => (i + step + shown.length) % shown.length);
    const { upwork } = siteConfig;

    return (
        <section className="hs-section hs-reviews" aria-labelledby="reviews-title">
            <div className="container">
                <header className="hs-header">
                    <p className="home-eyebrow">Client Feedback</p>
                    <h2 id="reviews-title" className="hs-title">
                        What Our <span>Clients Say</span>
                    </h2>
                    <p className="hs-subtitle">
                        Real reviews from clients on Upwork, where MailStora is {upwork.badge} with a{" "}
                        {upwork.jobSuccess} Job Success Score.
                    </p>
                    <p className="hs-rating-summary">
                        <Stars rating={Number(upwork.rating)} />
                        <strong>{upwork.rating}/5</strong> from {upwork.feedbackCount} client reviews on Upwork
                    </p>
                </header>

                <div
                    className="hs-carousel"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Client feedback"
                    onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") go(-1);
                        if (e.key === "ArrowRight") go(1);
                    }}
                >
                    <button type="button" className="hs-carousel-arrow hs-carousel-arrow--prev" onClick={() => go(-1)} aria-label="Previous review">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div className="hs-carousel-track">
                        {shown.map((r, i) => (
                            <article
                                key={r._id}
                                className={`hs-feedback${i === index ? " is-active" : ""}`}
                                aria-hidden={i !== index}
                                aria-roledescription="slide"
                                aria-label={`${i + 1} of ${shown.length}`}
                            >
                                {r.role && <h3 className="hs-feedback-project">{r.role}</h3>}
                                <div className="hs-feedback-meta">
                                    {r.createdAt && (
                                        <span className="hs-feedback-date">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                                <rect x="3" y="5" width="18" height="16" rx="2" />
                                                <path d="M3 10h18M8 3v4M16 3v4" />
                                            </svg>
                                            {formatDate(r.createdAt)}
                                        </span>
                                    )}
                                    <span className="hs-feedback-rating">
                                        <Stars rating={r.rating ?? 5} />
                                        <strong>{(r.rating ?? 5).toFixed(1)}</strong>
                                    </span>
                                </div>
                                <blockquote className="hs-feedback-text">&ldquo;{r.text}&rdquo;</blockquote>
                                <p className="hs-feedback-author">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="10" r="3" />
                                        <path d="M6.2 18.2c1.4-1.9 3.4-2.9 5.8-2.9s4.4 1 5.8 2.9" />
                                    </svg>
                                    {r.name}
                                    {r.platform === "upwork" && <span className="hs-feedback-source">Upwork</span>}
                                </p>
                            </article>
                        ))}
                    </div>

                    <button type="button" className="hs-carousel-arrow hs-carousel-arrow--next" onClick={() => go(1)} aria-label="Next review">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                <div className="hs-carousel-dots" aria-hidden="true">
                    {shown.map((r, i) => (
                        <button key={r._id} type="button" tabIndex={-1} className={i === index ? "is-active" : ""} onClick={() => setIndex(i)} />
                    ))}
                </div>
                <p className="hs-carousel-count" aria-live="polite">
                    {index + 1} / {shown.length}
                </p>

                <div className="hs-reviews-actions">
                    <a href={UPWORK_FEEDBACK_URL()} target="_blank" rel="noopener noreferrer" className="hs-btn-ghost hs-btn-upwork">
                        <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                            <path d="M24.75 17.542c-1.469 0-2.849-.61-4.081-1.638l.303-1.437.013-.066c.264-1.511 1.094-4.047 3.765-4.047 1.98 0 3.595 1.627 3.595 3.595 0 1.979-1.615 3.593-3.595 3.593zM24.75 8c-3.43 0-6.017 2.287-7.122 6.019-.838-1.548-1.459-3.414-1.838-4.985H12.9v5.967c0 1.905-.87 3.808-2.775 3.808-1.905 0-2.906-1.903-2.906-3.808l.011-5.967H4.25v5.967c0 3.748 1.95 6.722 5.875 6.722 3.925 0 5.918-3.15 5.918-6.906l-.003-.638c.35 1.104.831 2.276 1.438 3.293L15.56 26h2.97l1.123-5.447c1.203.813 2.593 1.301 4.097 1.301 3.748 0 6.75-3.027 6.75-6.75 0-3.722-3.002-6.104-5.75-6.104z" />
                        </svg>
                        View Feedback on Upwork
                    </a>
                    <Link href="/quote/" className="home-btn-primary">
                        Get a Quote
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
