"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export type WorkItem = { _id: string; title: string; slug: string; industry?: string; esp?: string; coverImage: string };

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
);

/** Horizontal scroll-snap row showing 4 projects at a time; arrows scroll one page. */
export default function RecentWorkSlider({ items }: { items: WorkItem[] }) {
    const track = useRef<HTMLUListElement>(null);

    const scroll = (dir: 1 | -1) => {
        const el = track.current;
        if (!el) return;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
        const atStart = el.scrollLeft <= 4;
        // Wrap around at either end
        if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
        else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
        else {
            // Move by whole cards (card width + gap) so the row always lands on a card edge
            const first = el.firstElementChild as HTMLElement | null;
            const second = first?.nextElementSibling as HTMLElement | null;
            const step = first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
            const gap = first ? step - first.offsetWidth : 0;
            const perView = Math.max(1, Math.floor((el.clientWidth + gap + 1) / step));
            const current = Math.round(el.scrollLeft / step);
            el.scrollTo({ left: (current + dir * perView) * step, behavior: "smooth" });
        }
    };

    return (
        <div className="recent-work-slider">
            <button type="button" className="recent-work-arrow recent-work-arrow--prev" onClick={() => scroll(-1)} aria-label="Previous templates">
                <Chevron dir="left" />
            </button>

            <ul className="recent-work-track" ref={track}>
                {items.map((item) => (
                    <li key={item._id}>
                        <Link href={`/portfolio/${item.slug}/`} className="recent-work-card">
                            <span className="recent-work-thumb">
                                <Image
                                    src={item.coverImage}
                                    alt={`${item.title}${item.industry ? ` – ${item.industry} email template` : ""}`}
                                    fill
                                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 270px"
                                    className="recent-work-img"
                                />
                                <span className="recent-work-view" aria-hidden="true">View Project</span>
                            </span>
                            <span className="recent-work-meta">
                                <span className="recent-work-name">{item.title}</span>
                                <span className="recent-work-tags">{[item.industry, item.esp].filter(Boolean).join(" · ")}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <button type="button" className="recent-work-arrow recent-work-arrow--next" onClick={() => scroll(1)} aria-label="More templates">
                <Chevron dir="right" />
            </button>
        </div>
    );
}
