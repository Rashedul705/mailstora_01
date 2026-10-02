import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import PageDecor from "../components/PageDecor";
import HomeContact from "../components/HomeContact";
import HomeProcess from "../components/HomeProcess";
import { siteConfig } from "../../utils/siteConfig";
import { Suspense } from "react";
import QuoteClient from "./QuoteClient";

const { upwork, stats } = siteConfig;

const baseMetadata = (): Metadata => pageMeta("/quote/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

export default function Page() {
    return (
        <>
            <Navbar />
            <main className="main">
                <PageDecor />
                <PageHero
                    eyebrow="Free Quote"
                    title={<>Get a Free Quote in <span>24 Hours</span></>}
                    lead={`Tell us what you need: your design, platform and deadline. You will get a clear price and timeline within 24 hours, with no obligation.`}
                    crumbs={[{ label: "Home", url: "/" }, { label: "Get a Quote", url: "/quote/" }]}
                >
                    <ul className="ph-trust">
                        <li>{upwork.jobSuccess} Job Success</li>
                        <li>{upwork.rating}/5 from {upwork.reviews} reviews</li>
                        <li>{stats.templatesBuilt} templates delivered</li>
                        <li>Replies within 2 to 4 hours</li>
                    </ul>
                </PageHero>
                <Suspense fallback={null}>
                    <QuoteClient />
                </Suspense>
                <HomeContact />
                <HomeProcess />
            </main>
            <Footer />
        </>
    );
}
