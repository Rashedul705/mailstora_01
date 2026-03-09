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
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/auth/verify', {
                    credentials: 'include'
                });

                if (res.ok) {
                    setIsLoading(false);
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

        verifyAuth();
    }, [pathname, router]);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
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
                    <span>MailStora Admin</span>
                </div>

                <nav className="sidebar-nav">
                    <Link href="/admin/dashboard" className={`sidebar-link ${pathname === '/admin/dashboard' ? 'active' : ''}`}><span>Dashboard</span></Link>
                    <Link href="/admin/customers" className={`sidebar-link ${pathname.startsWith('/admin/customers') ? 'active' : ''}`}><span>Customers</span></Link>
                    <Link href="/admin/quotes" className={`sidebar-link ${pathname.startsWith('/admin/quotes') ? 'active' : ''}`}><span>Quotes</span></Link>
                    <Link href="/admin/schedules" className={`sidebar-link ${pathname.startsWith('/admin/schedules') ? 'active' : ''}`}><span>Schedules</span></Link>
                    <Link href="/admin/orders" className={`sidebar-link ${pathname.startsWith('/admin/orders') ? 'active' : ''}`}><span>Orders</span></Link>
                    <Link href="/admin/portfolio" className={`sidebar-link ${pathname.startsWith('/admin/portfolio') ? 'active' : ''}`}><span>Portfolio</span></Link>
                    <Link href="/admin/pricing" className={`sidebar-link ${pathname.startsWith('/admin/pricing') ? 'active' : ''}`}><span>Pricing</span></Link>
                    <Link href="/admin/testimonials" className={`sidebar-link ${pathname.startsWith('/admin/testimonials') ? 'active' : ''}`}><span>Testimonials</span></Link>
                    <Link href="/admin/faq" className={`sidebar-link ${pathname.startsWith('/admin/faq') ? 'active' : ''}`}><span>FAQ</span></Link>
                    <Link href="/admin/inquiries" className={`sidebar-link ${pathname.startsWith('/admin/inquiries') ? 'active' : ''}`}><span>Inquiries</span></Link>
                    <Link href="/admin/services" className={`sidebar-link ${pathname.startsWith('/admin/services') ? 'active' : ''}`}><span>Services</span></Link>
                    <Link href="/admin/content" className={`sidebar-link ${pathname.startsWith('/admin/content') ? 'active' : ''}`}><span>Website Content</span></Link>

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
