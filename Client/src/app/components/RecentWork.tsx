import fs from "fs";
import path from "path";
import Link from "next/link";
import RecentWorkSlider, { type WorkItem } from "./RecentWorkSlider";
import "./RecentWork.css";

type PortfolioItem = {
    _id: string;
    title: string;
    slug: string;
    type?: string;
    esp?: string;
    industry?: string;
    coverImage?: string;
    featuredOnLanding?: boolean;
    sortOrder?: number;
};

// Local cover images that are missing from /public would render as broken tiles, so skip them.
function hasImage(src?: string) {
    if (!src) return false;
    if (/^https?:\/\//.test(src)) return true;
    return fs.existsSync(path.join(process.cwd(), "public", src));
}

export default function RecentWork({ items = [] }: { items?: PortfolioItem[] }) {
    const shown = items
        .filter((i) => hasImage(i.coverImage))
        .sort((a, b) => Number(b.featuredOnLanding) - Number(a.featuredOnLanding) || (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .slice(0, 10);

    if (shown.length === 0) return null;

    return (
        <section className="recent-work" aria-labelledby="recent-work-title">
            <div className="container">
                <header className="recent-work-header">
                    <p className="recent-work-eyebrow">Our Work</p>
                    <h2 id="recent-work-title" className="recent-work-title">
                        Recent <span>Email Templates</span>
                    </h2>
                    <p className="recent-work-subtitle">
                        A selection of our latest hand-coded HTML email templates, built for different industries and
                        email platforms.
                    </p>
                </header>

                <RecentWorkSlider items={shown as WorkItem[]} />

                <div className="recent-work-more">
                    <Link href="/portfolio/" className="recent-work-btn">
                        View More Templates
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
