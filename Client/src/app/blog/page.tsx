import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './blog.css';
import BlogClient from './BlogClient';
import PageDecor from '../components/PageDecor';
import MidCTA from '../components/MidCTA';
import HomeContact from '../components/HomeContact';
import HomeLink from "../components/HomeLink";

const baseMetadata = (): Metadata => pageMeta("/blog/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

async function getBlogData() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    
    try {
        const [postsRes, popularRes] = await Promise.all([
            fetch(`${API_BASE}/api/blog?page=1`, { cache: 'no-store' }).catch(() => null),
            fetch(`${API_BASE}/api/blog?sort=popular`, { cache: 'no-store' }).catch(() => null)
        ]);

        return {
            postsData: postsRes && postsRes.ok ? await postsRes.json() : { posts: [], total: 0, totalPages: 1 },
            popularData: popularRes && popularRes.ok ? await popularRes.json() : { posts: [] }
        };
    } catch (e) {
        return {
            postsData: { posts: [], total: 0, totalPages: 1 },
            popularData: { posts: [] }
        };
    }
}

export default async function BlogHome() {
    const { postsData, popularData } = await getBlogData();
    const posts = (postsData.posts || []) as { slug: string; title: string; excerpt?: string; publishedAt?: string }[];
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": "https://mailstora.com/blog/#blog",
        name: "MailStora Blog",
        description: "Guides on HTML email development, Outlook rendering, Klaviyo flows and email signatures from the MailStora email development team.",
        url: "https://mailstora.com/blog/",
        inLanguage: "en",
        publisher: { "@id": "https://mailstora.com/#mailstora" },
        blogPost: posts.slice(0, 20).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `https://mailstora.com/blog/${p.slug}/`,
            ...(p.publishedAt ? { datePublished: p.publishedAt } : {}),
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
            <Navbar />
            <main className="main">
            <PageDecor />
            <BlogClient 
                initialPosts={postsData.posts} 
                initialTotal={postsData.total} 
                initialTotalPages={postsData.totalPages} 
                initialPopular={popularData.posts.slice(0, 4)} 
            />
            <HomeLink />
            <MidCTA
                eyebrow="Need help with your emails?"
                title="Get Hand-Coded Emails That Work in Every Inbox"
                text="Turn what you read here into results. Get a free quote within 24 hours."
                cta="Get a Free Quote"
            />
            <HomeContact />
            </main>
            <Footer />
        </>
    );
}
