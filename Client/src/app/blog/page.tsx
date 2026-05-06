'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './blog.css';

export default function BlogHome() {
    const [posts, setPosts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [popularPosts, setPopularPosts] = useState<any[]>([]);
    const [email, setEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState('');
    const categories = ["All Posts", "Email Marketing", "Digital Marketing", "Business Growth", "Tutorial", "Case Study"];

    useEffect(() => {
        fetchPosts(page, activeCategory, searchQuery);
    }, [page, activeCategory, searchQuery]);

    useEffect(() => {
        fetchPopularPosts();
    }, []);

    const fetchPosts = async (p: number, cat: string, q: string) => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            let url = `${API_BASE}/api/blog?page=${p}`;
            if (cat && cat !== "All Posts") url += `&category=${encodeURIComponent(cat)}`;
            if (q) url += `&q=${encodeURIComponent(q)}`;
            
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts);
                setTotal(data.total);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error('Failed to fetch posts', error);
        }
    };

    const fetchPopularPosts = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_BASE}/api/blog?sort=popular`);
            if (res.ok) {
                const data = await res.json();
                setPopularPosts(data.posts.slice(0, 4));
            }
        } catch (error) {
            console.error('Failed to fetch popular posts', error);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchPosts(1, activeCategory, searchQuery);
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribeStatus('subscribing...');
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_BASE}/api/blog/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (res.ok) {
                setSubscribeStatus('Success! You are subscribed.');
                setEmail('');
            } else if (res.status === 409) {
                setSubscribeStatus('You are already subscribed!');
            } else {
                setSubscribeStatus('Failed to subscribe.');
            }
        } catch (error) {
            setSubscribeStatus('An error occurred.');
        }
    };

    const featuredPost = posts.length > 0 && page === 1 && !searchQuery && (!activeCategory || activeCategory === "All Posts") ? posts[0] : null;
    const gridPosts = featuredPost ? posts.slice(1) : posts;

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
            <div className="blog-container">
                <section className="blog-hero">
                    <div className="blog-hero-tag">✦ MailStora Blog</div>
                    <h1>Email Marketing Tips & Business Growth Insights</h1>
                    <p>Practical advice on email marketing, digital strategy, and growing your business — from someone who's done it for 10+ years.</p>
                    
                    <form className="blog-search-bar" onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>

                    <div className="blog-filter-chips">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                className={`blog-filter-chip ${activeCategory === cat || (!activeCategory && cat === "All Posts") ? 'active' : ''}`}
                                onClick={() => { setActiveCategory(cat); setPage(1); }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                <div className="blog-layout">
                    <main className="blog-main">
                        {featuredPost && (
                            <Link href={`/blog/${featuredPost.slug}`} className="featured-post-card">
                                <div className={`featured-post-image ${getCategoryBgClass(featuredPost.category)}`}>
                                    {featuredPost.coverImage && <img src={featuredPost.coverImage} alt={featuredPost.title} />}
                                </div>
                                <div className="featured-post-content">
                                    <div className="featured-post-badges">
                                        <span className="badge-featured">⭐ Featured</span>
                                        <span className="badge-category">{featuredPost.category}</span>
                                    </div>
                                    <h2 className="featured-post-title">{featuredPost.title}</h2>
                                    <p className="featured-post-excerpt">{featuredPost.excerpt}</p>
                                    <div className="featured-post-meta">
                                        {featuredPost.author?.name} · {new Date(featuredPost.publishedAt).toLocaleDateString()} · {featuredPost.readingTime} min read
                                    </div>
                                    <div className="btn-read-article">Read Article →</div>
                                </div>
                            </Link>
                        )}

                        <div className="post-grid">
                            {gridPosts.map(post => (
                                <Link href={`/blog/${post.slug}`} key={post._id} className="post-card">
                                    <div className={`post-card-image ${getCategoryBgClass(post.category)}`}>
                                        {post.coverImage && <img src={post.coverImage} alt={post.title} />}
                                    </div>
                                    <div className="post-card-content">
                                        <span className="post-card-category">{post.category}</span>
                                        <h3 className="post-card-title">{post.title}</h3>
                                        <div className="post-card-meta">
                                            {new Date(post.publishedAt).toLocaleDateString()} · {post.readingTime} min read
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button disabled={page === 1} className="page-btn" onClick={() => setPage(page - 1)}>←</button>
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button 
                                        key={i} 
                                        className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button disabled={page === totalPages} className="page-btn" onClick={() => setPage(page + 1)}>→</button>
                            </div>
                        )}
                    </main>

                    <aside className="blog-sidebar">
                        <div className="sidebar-widget">
                            <h3 className="sidebar-title">Popular Posts</h3>
                            {popularPosts.map((post, i) => (
                                <Link href={`/blog/${post.slug}`} key={post._id} className="popular-post-item">
                                    <div className="popular-post-number">{i + 1}</div>
                                    <div>
                                        <div className="popular-post-title">{post.title}</div>
                                        <div className="popular-post-views">{post.views || 0} views</div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="sidebar-widget widget-newsletter">
                            <h3 className="sidebar-title">📫 Weekly Email Tips</h3>
                            <p>Practical email marketing tips delivered free to your inbox every week.</p>
                            <form onSubmit={handleSubscribe}>
                                <input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="submit">Subscribe Free →</button>
                                {subscribeStatus && <div style={{ fontSize: '11px', marginTop: '0.5rem', textAlign: 'center', color: '#bae6fd' }}>{subscribeStatus}</div>}
                            </form>
                        </div>

                        <div className="sidebar-widget">
                            <h3 className="sidebar-title">Browse Topics</h3>
                            <div className="tag-cloud">
                                <Link href="#" className="tag-cloud-item" onClick={() => { setActiveCategory('Email Marketing'); setPage(1); }}>Mailchimp</Link>
                                <Link href="#" className="tag-cloud-item" onClick={() => { setActiveCategory('Email Marketing'); setPage(1); }}>Klaviyo</Link>
                                <Link href="#" className="tag-cloud-item" onClick={() => { setActiveCategory('Email Marketing'); setPage(1); }}>HubSpot</Link>
                                <Link href="#" className="tag-cloud-item" onClick={() => { setActiveCategory('Digital Marketing'); setPage(1); }}>SEO</Link>
                                <Link href="#" className="tag-cloud-item" onClick={() => { setActiveCategory('Tutorial'); setPage(1); }}>Copywriting</Link>
                                <Link href="#" className="tag-cloud-item" onClick={() => { setActiveCategory('Business Growth'); setPage(1); }}>Automation</Link>
                            </div>
                        </div>

                        <div className="sidebar-widget widget-cta">
                            <h3 className="sidebar-title">Need a Template?</h3>
                            <p>Custom HTML email templates tested in Gmail, Outlook & all major ESPs.</p>
                            <Link href="/contact" style={{ display: 'block' }}>
                                <button>Get Free Quote →</button>
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />
        </>
    );
}
