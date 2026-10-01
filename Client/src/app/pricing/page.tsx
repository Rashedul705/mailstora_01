import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import PageDecor from "../components/PageDecor";
import LogoStrip from "../components/LogoStrip";
import MidCTA from "../components/MidCTA";
import HomeReviews from "../components/HomeReviews";
import HomeFAQ from "../components/HomeFAQ";
import HomeContact from "../components/HomeContact";
import PricingTabs, { type PricingData } from "./PricingTabs";
import { siteConfig } from "../../utils/siteConfig";
import "../components/HomeSections.css";
import "./pricing.css";
import HomeLink from "../components/HomeLink";

const { stats, upwork } = siteConfig;
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const baseMetadata = (): Metadata => pageMeta("/pricing/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

async function getJSON(path: string) {
    try {
        const res = await fetch(`${API}${path}`, { cache: "no-store" });
        return res.ok ? await res.json() : null;
    } catch {
        return null;
    }
}

const INCLUDED = [
    { title: "Hand-coded HTML", text: "Clean, table-based code, never builder bloat." },
    { title: "Tested in 50+ inboxes", text: "Gmail, Outlook, Apple Mail, mobile and dark mode." },
    { title: "Mobile responsive", text: "Layouts that stack and stay readable on phones." },
    { title: "Direct developer access", text: "Talk to the person writing your code." },
    { title: "Revisions included", text: "Rounds built into every package." },
    { title: "No hidden fees", text: "A fixed quote before any work starts." },
];

const COMPARE = () => [
    { item: "Custom design matched to your brand", us: "✓", builder: "–", agency: "✓" },
    { item: "Hand-coded, Outlook-safe HTML", us: "✓", builder: "–", agency: "Varies" },
    { item: "Tested in 50+ email clients", us: "✓", builder: "–", agency: "Varies" },
    { item: "Direct access to the developer", us: "✓", builder: "–", agency: "–" },
    { item: "Typical delivery", us: stats.turnaround, builder: "DIY", agency: "1–3 weeks" },
    { item: "Starting price per template", us: "$40", builder: "Your time", agency: "$300+" },
];

const FAQS = [
    { q: "How much does a custom HTML email template cost?", a: "A single custom HTML email template from MailStora starts at $40. The Standard Package includes 3 templates and 1 HTML email signature for $149." },
    { q: "How much does an HTML email signature cost?", a: "A simple HTML email signature starts at $25, and a signature with a promotional banner is $65. Team packages are quoted per project." },
    { q: "Are there subscriptions or hidden fees?", a: "No. Template and signature prices are one-time fees. You get a fixed quote before any work starts." },
    { q: "How are Klaviyo flows, campaigns, Shopify and social media priced?", a: "These services depend on scope, so they are quoted per project after a quick brief or free consultation. You always get a fixed price before work begins." },
    { q: "Are revisions included in the price?", a: "Yes. Revision rounds are included in every package, and the Standard Package includes 3 rounds." },
    { q: "Do you offer discounts for agencies or bulk orders?", a: "Yes. Multi-template projects, monthly retainers and white-label agency work cost less per email than single orders." },
    { q: "How do I pay?", a: "Projects can be paid directly or through Upwork, which protects both sides with milestone payments." },
    { q: "What if I need something not listed?", a: "Request a custom quote with your brief. Most custom projects are quoted within 24 hours." },
];

export default async function PricingPage() {
    const [pricing, testimonials, logos] = await Promise.all([getJSON("/api/pricing"), getJSON("/api/testimonials"), getJSON("/api/trust-logos")]);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "MailStora Pricing",
        url: "https://mailstora.com/pricing/",
        itemListElement: ["template", "signature"].flatMap((k) =>
            ((pricing?.[k] ?? []) as { name: string; price: string; description?: string }[])
                .filter((p) => /^\d/.test(p.price))
                .map((p) => ({ "@type": "Offer", name: p.name, description: p.description, price: p.price, priceCurrency: "USD" }))
        ),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />
            <main className="main">
                <PageDecor />
                <PageHero
                    eyebrow="Pricing"
                    title={<>Simple, Transparent <span>Email Development Pricing</span></>}
                    lead="One-time project pricing for HTML email templates and signatures. Fixed quotes for everything else. No subscriptions and no hidden fees."
                    crumbs={[{ label: "Home", url: "/" }, { label: "Pricing", url: "/pricing/" }]}
                >
                    <ul className="ph-trust">
                        <li>Templates from $40</li>
                        <li>Signatures from $25</li>
                        <li>Delivered in {stats.turnaround}</li>
                        <li>{upwork.rating}/5 from {upwork.reviews} reviews</li>
                    </ul>
                </PageHero>

                {/* ── Plans ── */}
                <section className="pr-section" aria-labelledby="pr-plans-title">
                    <div className="container">
                        <h2 id="pr-plans-title" className="sr-only">Pricing plans</h2>
                        {pricing ? (
                            <PricingTabs data={pricing as PricingData} />
                        ) : (
                            <div className="pr-custom">
                                <h3>Pricing is loading slowly</h3>
                                <p>Please refresh the page, or request a quote and get prices within 24 hours.</p>
                                <div><Link href="/quote/" className="pr-cta pr-cta--solid">Get a Free Quote</Link></div>
                            </div>
                        )}
                        <p className="pr-note">All prices in USD. Need several templates or ongoing work? <Link href="/quote/">Ask about package and retainer discounts</Link>.</p>
                    </div>
                </section>

                {/* ── Included in every package ── */}
                <section className="pr-section pr-alt" aria-labelledby="pr-inc-title">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">Every Package</p>
                            <h2 id="pr-inc-title" className="hs-title">What You Get <span>With Every Order</span></h2>
                        </header>
                        <ul className="pr-included">
                            {INCLUDED.map((i) => (
                                <li key={i.title}>
                                    <span aria-hidden="true">✓</span>
                                    <div>
                                        <strong>{i.title}</strong>
                                        <p>{i.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ── Comparison ── */}
                <section className="pr-section" aria-labelledby="pr-cmp-title">
                    <div className="container">
                        <header className="hs-header">
                            <p className="home-eyebrow">Compare Your Options</p>
                            <h2 id="pr-cmp-title" className="hs-title">MailStora vs <span>DIY Builders and Agencies</span></h2>
                        </header>
                        <div className="pr-compare-wrap">
                            <table className="pr-compare">
                                <thead>
                                    <tr><th scope="col">What you get</th><th scope="col" className="is-us">MailStora</th><th scope="col">Drag-and-drop builder</th><th scope="col">Typical agency</th></tr>
                                </thead>
                                <tbody>
                                    {COMPARE().map((r) => (
                                        <tr key={r.item}>
                                            <th scope="row">{r.item}</th>
                                            <td className="is-us">{r.us}</td>
                                            <td>{r.builder}</td>
                                            <td>{r.agency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <LogoStrip clients={Array.isArray(logos) ? logos : []} />
                <HomeReviews reviews={Array.isArray(testimonials?.data) ? testimonials.data : []} />
                <HomeLink />
                <MidCTA
                    eyebrow="Custom project?"
                    title="Get a Fixed Quote for Your Email Project"
                    text="Klaviyo flows, campaigns, template systems and agency work are quoted within 24 hours."
                    cta="Get a Free Quote"
                />
                <HomeFAQ faqs={FAQS} heading={<>Pricing <span>FAQs</span></>} intro="Answers about prices, payment, revisions and discounts." />
                <HomeContact />
            </main>
            <Footer />
        </>
    );
}
