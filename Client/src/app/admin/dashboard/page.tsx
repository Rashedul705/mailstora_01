'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${API_BASE}/api/dashboard/stats`, { credentials: 'omit' });
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;
    if (!stats) return <div>Failed to load stats.</div>;

    return (
        <div className="admin-page">
            <h1 className="admin-page-title">Dashboard Overview</h1>
            <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div className="stat-card" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3>Total Customers</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316' }}>{stats.totalCustomers}</p>
                </div>
                <div className="stat-card" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3>Total Orders</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316' }}>{stats.totalOrders}</p>
                </div>
                <div className="stat-card" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3>Total Quotes</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316' }}>{stats.totalQuotes || 0}</p>
                </div>
                <div className="stat-card" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3>New Quotes</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#EF4444' }}>{stats.newQuotes || 0}</p>
                </div>
                <div className="stat-card" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3>Total Revenue</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316' }}>${stats.totalRevenue}</p>
                </div>
            </div>

            <h2 className="admin-section-title">Recent Orders</h2>
            <div className="admin-table-container">
                <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '12px' }}>Order ID</th>
                            <th style={{ padding: '12px' }}>Customer</th>
                            <th style={{ padding: '12px' }}>Amount</th>
                            <th style={{ padding: '12px' }}>Status</th>
                            <th style={{ padding: '12px' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!stats.recentOrders || stats.recentOrders.length === 0 ? (
                            <tr><td colSpan={5} style={{ padding: '12px', textAlign: 'center' }}>No recent orders.</td></tr>
                        ) : (
                            stats.recentOrders.map((order: any) => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>{order._id.substring(0, 8)}</td>
                                    <td style={{ padding: '12px' }}>{order.customer?.name || 'Unknown'}</td>
                                    <td style={{ padding: '12px' }}>${order.amount}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ padding: '4px 8px', borderRadius: '4px', background: order.status === 'Pending' ? '#fff3cd' : '#d1e7dd', color: order.status === 'Pending' ? '#856404' : '#0f5132' }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <h2 className="admin-section-title" style={{ marginTop: '40px' }}>Recent Quote Requests</h2>
            <div className="admin-table-container">
                <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '12px' }}>Quote ID</th>
                            <th style={{ padding: '12px' }}>Client</th>
                            <th style={{ padding: '12px' }}>Service Type</th>
                            <th style={{ padding: '12px' }}>Status</th>
                            <th style={{ padding: '12px' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!stats.recentQuotes || stats.recentQuotes.length === 0 ? (
                            <tr><td colSpan={5} style={{ padding: '12px', textAlign: 'center' }}>No recent quote requests.</td></tr>
                        ) : (
                            stats.recentQuotes.map((quote: any) => (
                                <tr key={quote._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>{quote._id.substring(0, 8)}</td>
                                    <td style={{ padding: '12px' }}>{quote.name || 'Unknown'}</td>
                                    <td style={{ padding: '12px' }}>{quote.service_type}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ padding: '4px 8px', borderRadius: '4px', background: quote.status === 'new' ? '#fff3cd' : (quote.status === 'converted' ? '#d1e7dd' : '#cff4fc'), color: quote.status === 'new' ? '#856404' : (quote.status === 'converted' ? '#0f5132' : '#055160') }}>
                                            {quote.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>{new Date(quote.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
