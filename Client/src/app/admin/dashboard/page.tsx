'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/api/dashboard/stats', { credentials: 'omit' });
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
                    <h3>Pending Quotes</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316' }}>{stats.pendingQuotes}</p>
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
                        {stats.recentOrders.length === 0 ? (
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
        </div>
    );
}
