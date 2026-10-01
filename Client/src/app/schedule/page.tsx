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
import HomeLink from "../components/HomeLink";
import { Suspense } from "react";
import BookingWidget from "./BookingWidget";

const { upwork, stats } = siteConfig;

const baseMetadata = (): Metadata => pageMeta("/schedule/");

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
                    eyebrow="Free Consultation"
                    title={<>Book a Free <span>Email Consultation</span></>}
                    lead={`Talk through your design, email platform and goals with the founder. Pick a date and time below and book a free 30-minute call.`}
                    crumbs={[{ label: "Home", url: "/" }, { label: "Schedule", url: "/schedule/" }]}
                >
                    <ul className="ph-trust">
                        <li>{upwork.jobSuccess} Job Success</li>
                        <li>{upwork.rating}/5 from {upwork.reviews} reviews</li>
                        <li>{stats.templatesBuilt} templates delivered</li>
                        <li>Replies within 2 to 4 hours</li>
                    </ul>
                </PageHero>
                <div className="container bk-wrap">
                    <Suspense fallback={null}>
                        <BookingWidget />
                    </Suspense>
                </div>
                <HomeLink />
                <HomeContact />
                <HomeProcess />
            </main>
            <Footer />
        </>
    );
}
