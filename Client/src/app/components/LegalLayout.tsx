import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageHero from "./PageHero";
import "./LegalPage.css";
import HomeLink from "./HomeLink";

export type LegalSection = { id: string; title: string; body: (string | string[])[] };

type Props = {
    title: string;
    accent: string;
    slug: string;
    lead: string;
    updated: string;
    summary: string[];
    sections: LegalSection[];
    related: { label: string; href: string };
};

/** Shared layout for legal pages: hero, key-points summary, sticky contents list and numbered sections. */
export default function LegalLayout({ title, accent, slug, lead, updated, summary, sections, related }: Props) {
    return (
        <>
            <Navbar />
            <main className="main">
                <PageHero
                    eyebrow="Legal"
                    title={<>{title} <span>{accent}</span></>}
                    lead={lead}
                    crumbs={[{ label: "Home", url: "/" }, { label: `${title} ${accent}`, url: `/${slug}/` }]}
                >
                    <p className="lg-updated">Last updated: {updated}</p>
                </PageHero>

                <section className="lg-body" aria-label={`${title} ${accent}`}>
                    <div className="container lg-layout">
                        <nav className="lg-toc" aria-label="Contents">
                            <p>Contents</p>
                            <ol>
                                {sections.map((s) => (
                                    <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                                ))}
                            </ol>
                            <Link href={related.href} className="lg-related">{related.label} →</Link>
                        </nav>

                        <article className="lg-article">
                            <div className="lg-summary">
                                <h2>The Short Version</h2>
                                <ul>
                                    {summary.map((s) => (
                                        <li key={s}>{s}</li>
                                    ))}
                                </ul>
                            </div>

                            {sections.map((s, i) => (
                                <section key={s.id} id={s.id} className="lg-section" aria-labelledby={`${s.id}-h`}>
                                    <h2 id={`${s.id}-h`}>
                                        <span>{String(i + 1).padStart(2, "0")}</span>
                                        {s.title}
                                    </h2>
                                    {s.body.map((b, j) =>
                                        Array.isArray(b) ? (
                                            <ul key={j}>
                                                {b.map((li) => (
                                                    <li key={li}>{li}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p key={j}>{b}</p>
                                        )
                                    )}
                                </section>
                            ))}
                            <HomeLink inline />
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
