import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './blog.css';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
    title: "MailStora Blog | HTML Email Tips & Tutorials",
    description: "Learn how to build responsive HTML email templates, fix Outlook rendering bugs, and master email marketing strategy.",
    alternates: {
        canonical: "https://mailstora.com/blog"
    }
};

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

    return (
        <>
            <Navbar />
            <BlogClient 
                initialPosts={postsData.posts} 
                initialTotal={postsData.total} 
                initialTotalPages={postsData.totalPages} 
                initialPopular={popularData.posts.slice(0, 4)} 
            />
            <Footer />
        </>
    );
}
