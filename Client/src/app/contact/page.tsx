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

const { upwork, stats } = siteConfig;

const baseMetadata = (): Metadata => pageMeta("/contact/");

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
                    eyebrow="Contact MailStora"
                    title={<>Get in Touch With <span>MailStora</span></>}
                    lead={`Questions about a project, a quote or an existing email? Send a message and get a reply from the founder within a few hours.`}
                    crumbs={[{ label: "Home", url: "/" }, { label: "Contact", url: "/contact/" }]}
                >
                    <ul className="ph-trust">
                        <li>{upwork.jobSuccess} Job Success</li>
                        <li>{upwork.rating}/5 from {upwork.reviews} reviews</li>
                        <li>{stats.templatesBuilt} templates delivered</li>
                        <li>Replies within 2 to 4 hours</li>
                    </ul>
                </PageHero>
                <HomeLink />
                <HomeContact />
                <HomeProcess />
            </main>
            <Footer />
        </>
    );
}
