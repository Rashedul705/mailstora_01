import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../blog.css';

async function getPost(slug: string) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    try {
        const res = await fetch(`${API_BASE}/api/blog/${slug}`, {
            cache: 'no-store' // We want views to increment
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('Failed to fetch post', error);
        return null;
    }
}

async function getRelatedPosts(category: string, currentSlug: string) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    try {
        const res = await fetch(`${API_BASE}/api/blog?category=${encodeURIComponent(category)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.posts.filter((p: any) => p.slug !== currentSlug).slice(0, 3);
    } catch (error) {
        console.error('Failed to fetch related posts', error);
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) {
        return { title: 'Post Not Found' };
    }
    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            images: post.coverImage ? [post.coverImage] : [],
        }
    };
}

// Client component for the share buttons (they need onClick/window access)
import ShareButtons from './ShareButtons';

export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return (
            <>
                <Navbar />
                <div className="single-post-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <h1>Post Not Found</h1>
                    <Link href="/blog" style={{ color: '#f97316' }}>← Back to Blog</Link>
                </div>
                <Footer />
            </>
        );
    }

    const relatedPosts = await getRelatedPosts(post.category, post.slug);

    const getCategoryBgClass = (cat: string) => {
        if (cat === "Email Marketing") return "cat-bg-Email";
        if (cat === "Digital Marketing") return "cat-bg-Digital";
        if (cat === "Business Growth") return "cat-bg-Business";
        if (cat === "Tutorial") return "cat-bg-Tutorial";
        if (cat === "Case Study") return "cat-bg-Case";
        return "cat-bg-Email";
    };

    return (
        <>
            <Navbar />
            <article className="single-post-container">
                <div className="breadcrumb-bar">
                    <Link href="/">mailstora.com</Link> › <Link href="/blog">blog</Link> › {post.slug}
                </div>

                <div className="single-post-header">
                    <div className="single-post-badges">
                        <span className="badge-category">{post.category}</span>
                        <span className="read-time-pill" style={{ fontSize: '10px', fontWeight: 800 }}>⏱ {post.readingTime} MIN READ</span>
                    </div>
                    <h1 className="single-post-title">{post.title}</h1>
                </div>

                <div className="single-post-meta-bar">
                    <div className="author-info">
                        <div className="author-avatar">
                            {post.author?.name ? post.author.name.substring(0, 2).toUpperCase() : 'RI'}
                        </div>
                        <div className="author-details">
                            <span className="author-name">{post.author?.name || 'Rashedul Islam'}</span>
                            <div className="post-date-read">
                                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                <span>·</span>
                                {post.readingTime} min read
                            </div>
                        </div>
                    </div>
                    <ShareButtons title={post.title} slug={post.slug} />
                </div>

                {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="single-post-cover" />
                ) : (
                    <div className="single-post-cover-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>
                )}

                <div className="single-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

                {post.tags && post.tags.length > 0 && (
                    <div className="single-post-tags">
                        {post.tags.map((tag: string) => (
                            <span key={tag} className="single-post-tag">#{tag}</span>
                        ))}
                    </div>
                )}

                <div className="single-post-cta">
                    <h3>Need a Professional Email Template?</h3>
                    <p>Get a custom HTML email template that works perfectly in Gmail, Outlook, and all major email clients — delivered in 24-48 hours.</p>
                    <div className="single-post-cta-buttons">
                        <Link href="/contact" className="btn-orange">Get Free Quote →</Link>
                        <a href="https://wa.me/8801744350705" target="_blank" rel="noopener noreferrer" className="btn-white-outline">💬 WhatsApp Us</a>
                    </div>
                </div>

                {relatedPosts.length > 0 && (
                    <div className="related-posts-section">
                        <h3 className="related-posts-title">Related Articles</h3>
                        <div className="related-posts-grid">
                            {relatedPosts.map((rp: any) => (
                                <Link href={`/blog/${rp.slug}`} key={rp._id} className="post-card">
                                    <div className={`post-card-image ${getCategoryBgClass(rp.category)}`}>
                                        {rp.coverImage && <img src={rp.coverImage} alt={rp.title} />}
                                    </div>
                                    <div className="post-card-content">
                                        <span className="post-card-category">{rp.category}</span>
                                        <h4 className="post-card-title" style={{ fontSize: '13px' }}>{rp.title}</h4>
                                        <div className="post-card-meta">
                                            {new Date(rp.publishedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
            <Footer />
        </>
    );
}
