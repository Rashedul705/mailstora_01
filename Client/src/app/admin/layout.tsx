'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import './admin.css';

// The API now requires the admin login cookie for every private call. Older admin screens
// fetch with `credentials: 'omit'` or no option, so make every admin request to the API send it.
const ADMIN_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
if (typeof window !== 'undefined' && !(window as unknown as { __adminFetch?: boolean }).__adminFetch) {
    const original = window.fetch.bind(window);
    window.fetch = (input: RequestInfo | URL, init: RequestInit = {}) => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
        if (url.startsWith(ADMIN_API)) init = { ...init, credentials: 'include' };
        return original(input, init);
    };
    (window as unknown as { __adminFetch?: boolean }).__adminFetch = true;
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const router = useRouter();
    // next.config uses trailingSlash, so the path may be "/admin/login/": strip it before comparing
    const pathname = (usePathname() || '').replace(/\/+$/, '') || '/';

    useEffect(() => {
        const verifyAuth = async () => {
            try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
                const res = await fetch(`${API_BASE}/api/auth/verify`, {
                    credentials: 'include'
                });

                if (res.ok) {
                    setIsLoading(false);
                    fetchStats();
                } else {
                    localStorage.removeItem('adminAuth');
                    if (pathname !== '/admin/login') {
                        router.push('/admin/login');
                    } else {
                        setIsLoading(false);
                    }
                }
            } catch (err) {
                if (pathname !== '/admin/login') {
                    router.push('/admin/login');
                } else {
                    setIsLoading(false);
                }
            }
        };

        const fetchStats = async () => {
            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
                const res = await fetch(`${API_BASE}/api/dashboard`, { credentials: 'omit' });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        verifyAuth();
    }, [pathname, router]);

    const handleLogout = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', credentials: 'include' });
        } catch (e) { }
        localStorage.removeItem('adminAuth');
        router.push('/admin/login');
    };

    // Hide site-only widgets (WhatsApp button) inside the admin
    useEffect(() => {
        document.body.classList.add('is-admin');
        return () => document.body.classList.remove('is-admin');
    }, []);

    if (isLoading) {
        return <div className="admin-loading">Loading Backend Connection...</div>;
    }

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <Link href="/">
                        <img src="/images/brand/mailstora-logo-2026.png" alt="MailStora Admin" style={{ maxWidth: '180px', height: 'auto' }} />
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-section">PORTFOLIO</div>
                    <Link href="/admin/portfolio" className={`sidebar-link ${pathname === '/admin/portfolio' ? 'active' : ''}`}><span>All Items</span></Link>
                    <Link href="/admin/portfolio/new" className={`sidebar-link ${pathname === '/admin/portfolio/new' ? 'active' : ''}`}><span>Add New</span></Link>
                    <Link href="/admin/portfolio/categories" className={`sidebar-link ${pathname.startsWith('/admin/portfolio/categories') ? 'active' : ''}`}><span>Categories</span></Link>
                    
                    <div className="sidebar-section" style={{ marginTop: '1.5rem' }}>CASE STUDIES</div>
                    <Link href="/admin/case-studies" className={`sidebar-link ${pathname === '/admin/case-studies' ? 'active' : ''}`}><span>All Case Studies</span></Link>
                    <Link href="/admin/case-studies/new" className={`sidebar-link ${pathname === '/admin/case-studies/new' ? 'active' : ''}`}><span>Add New</span></Link>

                    <div className="sidebar-section" style={{ marginTop: '1.5rem' }}>BLOG</div>
                    <Link href="/admin/blog" className={`sidebar-link ${pathname === '/admin/blog' ? 'active' : ''}`}><span>All Posts</span></Link>
                    <Link href="/admin/blog/new" className={`sidebar-link ${pathname === '/admin/blog/new' ? 'active' : ''}`}><span>New Post</span></Link>
                    <Link href="/admin/blog/categories" className={`sidebar-link ${pathname.startsWith('/admin/blog/categories') ? 'active' : ''}`}><span>Categories</span></Link>
                    <Link href="/admin/blog/tags" className={`sidebar-link ${pathname.startsWith('/admin/blog/tags') ? 'active' : ''}`}><span>Tags</span></Link>
                    <Link href="/admin/blog/media" className={`sidebar-link ${pathname.startsWith('/admin/blog/media') ? 'active' : ''}`}><span>Media</span></Link>
                    
                    <div className="sidebar-section" style={{ marginTop: '1.5rem' }}>SEO</div>
                    <Link href="/admin/seo" className={`sidebar-link ${pathname === '/admin/seo' ? 'active' : ''}`}><span>SEO Dashboard</span></Link>
                    <Link href="/admin/seo/pages" className={`sidebar-link ${pathname.startsWith('/admin/seo/pages') ? 'active' : ''}`}><span>Pages &amp; Posts SEO</span></Link>
                    <Link href="/admin/seo/general" className={`sidebar-link ${pathname.startsWith('/admin/seo/general') ? 'active' : ''}`}><span>General &amp; Schema</span></Link>
                    <Link href="/admin/seo/redirects" className={`sidebar-link ${pathname.startsWith('/admin/seo/redirects') ? 'active' : ''}`}><span>Redirections</span></Link>
                    <Link href="/admin/seo/404" className={`sidebar-link ${pathname.startsWith('/admin/seo/404') ? 'active' : ''}`}><span>404 Monitor</span></Link>
                    <Link href="/admin/seo/bulk" className={`sidebar-link ${pathname.startsWith('/admin/seo/bulk') ? 'active' : ''}`}><span>Bulk SEO Editor</span></Link>
                    <Link href="/admin/seo/keywords" className={`sidebar-link ${pathname.startsWith('/admin/seo/keywords') ? 'active' : ''}`}><span>Keyword Manager</span></Link>
                    <Link href="/admin/seo/link-map" className={`sidebar-link ${pathname.startsWith('/admin/seo/link-map') ? 'active' : ''}`}><span>Link Map</span></Link>
                    <Link href="/admin/seo/links" className={`sidebar-link ${pathname.startsWith('/admin/seo/links') ? 'active' : ''}`}><span>Broken Links</span></Link>
                    <Link href="/admin/seo/webmaster" className={`sidebar-link ${pathname.startsWith('/admin/seo/webmaster') ? 'active' : ''}`}><span>Webmaster Tools</span></Link>

                    <div className="sidebar-section" style={{ marginTop: '1.5rem' }}>BUSINESS</div>
                    <Link href="/admin/dashboard" className={`sidebar-link ${pathname === '/admin/dashboard' ? 'active' : ''}`}><span>Dashboard</span></Link>
                    <Link href="/admin/customers" className={`sidebar-link ${pathname.startsWith('/admin/customers') ? 'active' : ''}`}><span>Customers</span></Link>
                    
                    <Link href="/admin/quotes" className={`sidebar-link ${pathname.startsWith('/admin/quotes') ? 'active' : ''}`}>
                        <span>Quotes</span>
                        {stats?.quotes?.new > 0 && <span className="sidebar-badge">{stats.quotes.new}</span>}
                    </Link>
                    
                    <Link href="/admin/schedules" className={`sidebar-link ${pathname.startsWith('/admin/schedules') ? 'active' : ''}`}>
                        <span>Schedules</span>
                        {stats?.schedules?.pendingVerification > 0 && <span className="sidebar-badge">{stats.schedules.pendingVerification}</span>}
                    </Link>
                    
                    <Link href="/admin/orders" className={`sidebar-link ${pathname.startsWith('/admin/orders') ? 'active' : ''}`}><span>Orders</span></Link>
                    <Link href="/admin/pricing" className={`sidebar-link ${pathname.startsWith('/admin/pricing') ? 'active' : ''}`}><span>Pricing</span></Link>
                    <Link href="/admin/testimonials" className={`sidebar-link ${pathname.startsWith('/admin/testimonials') ? 'active' : ''}`}><span>Testimonials</span></Link>
                    <Link href="/admin/faq" className={`sidebar-link ${pathname.startsWith('/admin/faq') ? 'active' : ''}`}><span>FAQ</span></Link>
                    <Link href="/admin/inquiries" className={`sidebar-link ${pathname.startsWith('/admin/inquiries') ? 'active' : ''}`}><span>Inquiries</span></Link>
                    <Link href="/admin/services" className={`sidebar-link ${pathname.startsWith('/admin/services') ? 'active' : ''}`}><span>Services</span></Link>
                    <Link href="/admin/trust-logos" className={`sidebar-link ${pathname.startsWith('/admin/trust-logos') ? 'active' : ''}`}><span>Trust Logos</span></Link>
                    <Link href="/admin/content" className={`sidebar-link ${pathname.startsWith('/admin/content') ? 'active' : ''}`}><span>Website Content</span></Link>
                    <Link href="/admin/file-manager" className={`sidebar-link ${pathname.startsWith('/admin/file-manager') ? 'active' : ''}`}><span>File Manager</span></Link>

                    <div style={{ padding: '0 1rem', margin: '1rem 0' }}>
                        <div style={{ height: '1px', background: 'var(--border)' }}></div>
                    </div>

                    <Link href="/admin/pages-editor" className={`sidebar-link ${pathname.startsWith('/admin/pages-editor') ? 'active' : ''}`}><span>Page Editor</span></Link>
                    <Link href="/admin/settings/site" className={`sidebar-link ${pathname.startsWith('/admin/settings/site') ? 'active' : ''}`}><span>Site Settings</span></Link>
                    <Link href="/admin/settings/users" className={`sidebar-link ${pathname.startsWith('/admin/settings/users') ? 'active' : ''}`}><span>Users &amp; Activity</span></Link>
                    <Link href="/admin/settings/password" className={`sidebar-link ${pathname.startsWith('/admin/settings/password') ? 'active' : ''}`}><span>Change Password</span></Link>
                    <Link href="/" target="_blank" className="sidebar-link"><span>View Storefront ↗</span></Link>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="sidebar-link" style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}
