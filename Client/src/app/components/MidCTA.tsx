import Link from "next/link";
import "./HomeSections.css";

type Props = { eyebrow?: string; title?: string; text?: string; cta?: string; href?: string };

/** Full-width call-to-action banner; text defaults to the homepage version. */
export default function MidCTA({
    eyebrow = "Ready to get started?",
    title = "Let's Build Your Next Email Template",
    text = "Share your requirements and get a free quote within 24 hours.",
    cta = "Get a Quote",
    href = "/quote/",
}: Props) {
    return (
        <section className="hs-cta-wrap" aria-labelledby="mid-cta-title">
            <div className="container">
                <div className="hs-cta">
                    <svg className="hs-cta-plane" width="96" height="96" viewBox="0 0 64 64" aria-hidden="true">
                        <path d="M58 6L6 28l18 7 4 19 9-12 13 9z" fill="#ecfdf3" />
                        <path d="M58 6L24 35l4 19 3-15z" fill="#bbf7d0" />
                        <path d="M58 6L24 35l13 7z" fill="#86efac" opacity="0.8" />
                    </svg>
                    <div className="hs-cta-text">
                        <p className="hs-cta-eyebrow">{eyebrow}</p>
                        <h2 id="mid-cta-title">{title}</h2>
                        <p>{text}</p>
                    </div>
                    <Link href={href} className="home-btn-primary hs-cta-btn">
                        {cta}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
