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
        const isAuth = localStorage.getItem('adminAuth') === 'true';

        if (!isAuth && pathname !== '/admin/login') {
            router.push('/admin/login');
        } else {
            setIsLoading(false);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        router.push('/admin/login');
    };

    if (isLoading && pathname !== '/admin/login') {
        return <div className="admin-loading">Loading...</div>;
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
                    <Link
                        href="/admin/dashboard"
                        className={`sidebar-link ${pathname === '/admin/dashboard' ? 'active' : ''}`}
                    >
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/orders"
                        className={`sidebar-link ${pathname === '/admin/orders' ? 'active' : ''}`}
                    >
                        <span>Orders</span>
                    </Link>
                    <Link
                        href="/admin/portfolio"
                        className={`sidebar-link ${pathname === '/admin/portfolio' ? 'active' : ''}`}
                    >
                        <span>Portfolio</span>
                    </Link>
                    <Link
                        href="/admin/pricing"
                        className={`sidebar-link ${pathname === '/admin/pricing' ? 'active' : ''}`}
                    >
                        <span>Pricing</span>
                    </Link>
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
