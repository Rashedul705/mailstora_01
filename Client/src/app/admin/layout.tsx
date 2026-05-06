'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import './admin.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();

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
                        <img src="https://i.ibb.co/20rsCF0V/7a8f27f1857c.jpg" alt="MailStora Admin" style={{ maxWidth: '180px', height: 'auto' }} />
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-section">BLOG</div>
                    <Link href="/admin/blog" className={`sidebar-link ${pathname === '/admin/blog' ? 'active' : ''}`}><span>All Posts</span></Link>
                    <Link href="/admin/blog/new" className={`sidebar-link ${pathname === '/admin/blog/new' ? 'active' : ''}`}><span>New Post</span></Link>
                    <Link href="/admin/blog/categories" className={`sidebar-link ${pathname.startsWith('/admin/blog/categories') ? 'active' : ''}`}><span>Categories</span></Link>
                    <Link href="/admin/blog/tags" className={`sidebar-link ${pathname.startsWith('/admin/blog/tags') ? 'active' : ''}`}><span>Tags</span></Link>
                    <Link href="/admin/blog/media" className={`sidebar-link ${pathname.startsWith('/admin/blog/media') ? 'active' : ''}`}><span>Media</span></Link>
                    
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
                    <Link href="/admin/portfolio" className={`sidebar-link ${pathname.startsWith('/admin/portfolio') ? 'active' : ''}`}><span>Portfolio</span></Link>
                    <Link href="/admin/pricing" className={`sidebar-link ${pathname.startsWith('/admin/pricing') ? 'active' : ''}`}><span>Pricing</span></Link>
                    <Link href="/admin/testimonials" className={`sidebar-link ${pathname.startsWith('/admin/testimonials') ? 'active' : ''}`}><span>Testimonials</span></Link>
                    <Link href="/admin/faq" className={`sidebar-link ${pathname.startsWith('/admin/faq') ? 'active' : ''}`}><span>FAQ</span></Link>
                    <Link href="/admin/inquiries" className={`sidebar-link ${pathname.startsWith('/admin/inquiries') ? 'active' : ''}`}><span>Inquiries</span></Link>
                    <Link href="/admin/services" className={`sidebar-link ${pathname.startsWith('/admin/services') ? 'active' : ''}`}><span>Services</span></Link>
                    <Link href="/admin/partners" className={`sidebar-link ${pathname.startsWith('/admin/partners') ? 'active' : ''}`}><span>Partners (Trust Logos)</span></Link>
                    <Link href="/admin/content" className={`sidebar-link ${pathname.startsWith('/admin/content') ? 'active' : ''}`}><span>Website Content</span></Link>
                    <Link href="/admin/file-manager" className={`sidebar-link ${pathname.startsWith('/admin/file-manager') ? 'active' : ''}`}><span>File Manager</span></Link>

                    <div style={{ padding: '0 1rem', margin: '1rem 0' }}>
                        <div style={{ height: '1px', background: 'var(--border)' }}></div>
                    </div>

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
