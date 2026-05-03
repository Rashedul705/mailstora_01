'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './dashboard.css';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
                const res = await fetch(`${API_BASE}/api/dashboard`, { credentials: 'omit' });
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // update every minute for countdowns

        return () => clearInterval(timer);
    }, []);

    const formatCountdown = (dateString: string) => {
        const target = new Date(dateString).getTime();
        const now = currentTime.getTime();
        const diff = target - now;

        if (diff <= 0) return 'Started / Passed';

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${mins}m`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };
    
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading || !data) {
        return (
            <div className="dash-container">
                <div className="dash-header">
                    <h1>Dashboard</h1>
                    <p>Loading your data...</p>
                </div>
                <div className="dash-stats-grid">
                    {[1,2,3,4].map(i => <div key={i} className="dash-stat-card skeleton" style={{ height: '100px' }}></div>)}
                </div>
            </div>
        );
    }

    return (
        <div className="dash-container">
            <div className="dash-header">
                <h1>Dashboard Overview</h1>
                <p>Welcome back! Here's what's happening today.</p>
            </div>

            {/* Quick Actions */}
            <div className="dash-actions-row">
                <Link href="/admin/quotes?status=new" className="dash-action-btn">
                    <span style={{ fontSize: '1.5rem' }}>📫</span>
                    View New Quotes
                </Link>
                <Link href="/admin/schedules" className="dash-action-btn">
                    <span style={{ fontSize: '1.5rem' }}>📅</span>
                    Manage Schedule
                </Link>
                <Link href="/admin/availability" className="dash-action-btn">
                    <span style={{ fontSize: '1.5rem' }}>⚙️</span>
                    Set Availability
                </Link>
                <Link href="/admin/portfolio" className="dash-action-btn">
                    <span style={{ fontSize: '1.5rem' }}>🖼️</span>
                    Manage Portfolio
                </Link>
            </div>

            {/* Stats Section 1: Quotes */}
            <div className="dash-section-title">Quotes at a Glance</div>
            <div className="dash-stats-grid">
                <div className="dash-stat-card">
                    <span className="dash-stat-title">New / Unread</span>
                    <span className="dash-stat-value" style={{ color: 'var(--primary-orange)' }}>{data.quotes?.new || 0}</span>
                </div>
                <div className="dash-stat-card">
                    <span className="dash-stat-title">Total Quotes</span>
                    <span className="dash-stat-value">{data.quotes?.total || 0}</span>
                </div>
                <div className="dash-stat-card">
                    <span className="dash-stat-title">Replied</span>
                    <span className="dash-stat-value" style={{ color: '#16a34a' }}>{data.quotes?.replied || 0}</span>
                </div>
                <div className="dash-stat-card">
                    <span className="dash-stat-title">Reviewed (Pending Reply)</span>
                    <span className="dash-stat-value" style={{ color: '#7e22ce' }}>{data.quotes?.reviewed || 0}</span>
                </div>
            </div>

            {/* Stats Section 2: Schedules */}
            <div className="dash-section-title">Schedules at a Glance</div>
            <div className="dash-stats-grid">
                <div className="dash-stat-card">
                    <span className="dash-stat-title">Today</span>
                    <span className="dash-stat-value">{data.schedules?.today || 0}</span>
                </div>
                <div className="dash-stat-card">
                    <span className="dash-stat-title">This Week</span>
                    <span className="dash-stat-value">{data.schedules?.thisWeek || 0}</span>
                </div>
                <div className="dash-stat-card">
                    <span className="dash-stat-title">This Month</span>
                    <span className="dash-stat-value">{data.schedules?.thisMonth || 0}</span>
                </div>
                <div className="dash-stat-card">
                    <span className="dash-stat-title">Pending Verification</span>
                    <span className="dash-stat-value" style={{ color: '#d97706' }}>{data.schedules?.pendingVerification || 0}</span>
                </div>
            </div>

            {/* Stats Section 3: Business */}
            <div className="dash-section-title">Business Overview</div>
            <div className="dash-stats-grid">
                <div className="dash-stat-card">
                    <span className="dash-stat-title">Total Customers</span>
                    <span className="dash-stat-value">{data.business?.totalCustomers || 0}</span>
                </div>
                <div className="dash-stat-card">
                    <span className="dash-stat-title">Total Revenue</span>
                    <span className="dash-stat-value" style={{ color: '#16a34a' }}>${data.business?.totalRevenue || 0}</span>
                </div>
                <div className="dash-stat-card">
                    <span className="dash-stat-title">Total Orders</span>
                    <span className="dash-stat-value">{data.business?.totalOrders || 0}</span>
                </div>
                <div className="dash-stat-card">
                    <span className="dash-stat-title">Orders In Progress</span>
                    <span className="dash-stat-value" style={{ color: '#3b82f6' }}>{data.business?.inProgress || 0}</span>
                </div>
            </div>

            {/* Recent Quotes Table */}
            <div className="dash-table-container">
                <div className="dash-table-header">
                    <div className="dash-table-title">
                        Recent Quote Requests
                        <div className="dash-table-stats">
                            <span>Unread: <strong>{data.quotes?.new || 0}</strong></span>
                            <span>Replied: <strong>{data.quotes?.replied || 0}</strong></span>
                            <span>Total: <strong>{data.quotes?.total || 0}</strong></span>
                        </div>
                    </div>
                    <Link href="/admin/quotes" className="dash-view-all">View all ➔</Link>
                </div>
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Service</th>
                            <th>ESP</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.quotes?.recent?.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center' }}>No recent quotes</td></tr>
                        ) : (
                            data.quotes?.recent?.map((q: any) => (
                                <tr key={q._id}>
                                    <td>
                                        <div className="flex-col-data">
                                            <span>
                                                {q.status === 'new' && <span className="unread-dot"></span>}
                                                <strong>{q.client?.name || 'Unknown'}</strong>
                                            </span>
                                            <span className="sub-text">{q.client?.email}</span>
                                        </div>
                                    </td>
                                    <td>{q.service}</td>
                                    <td>{Array.isArray(q.esp) ? q.esp.join(', ') : (q.esp || 'None')}</td>
                                    <td><span className={`dash-badge badge-${q.status}`}>{q.status}</span></td>
                                    <td>{formatDate(q.submittedAt)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Upcoming Schedules Table */}
            <div className="dash-table-container">
                <div className="dash-table-header">
                    <div className="dash-table-title">
                        Upcoming Schedules
                        <div className="dash-table-stats">
                            <span>Today: <strong>{data.schedules?.today || 0}</strong></span>
                            <span>This Week: <strong>{data.schedules?.thisWeek || 0}</strong></span>
                            <span>Pending: <strong>{data.schedules?.pendingVerification || 0}</strong></span>
                        </div>
                    </div>
                    <Link href="/admin/schedules" className="dash-view-all">View all ➔</Link>
                </div>
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Date & Time (ET)</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Starts In</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.schedules?.upcoming?.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center' }}>No upcoming schedules</td></tr>
                        ) : (
                            data.schedules?.upcoming?.map((s: any) => (
                                <tr key={s._id}>
                                    <td>
                                        <div className="flex-col-data">
                                            <strong>{s.client?.name}</strong>
                                            <span className="sub-text">{s.client?.email}</span>
                                        </div>
                                    </td>
                                    <td>{formatDateTime(s.utcDateTime)}</td>
                                    <td>
                                        <span className={`dash-badge badge-${s.meetingMethod?.split('_')[0]}`}>
                                            {s.meetingMethod?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`dash-badge badge-${s.status === 'confirmed' ? 'verified' : 'pending'}`}>
                                            {s.status === 'confirmed' ? 'Verified' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="countdown-text">{formatCountdown(s.utcDateTime)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Recent Orders & Customers Tables Side by Side on Desktop */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div className="dash-table-container" style={{ flex: 1, minWidth: '300px' }}>
                    <div className="dash-table-header">
                        <div className="dash-table-title">Recent Orders</div>
                        <Link href="/admin/orders" className="dash-view-all">View all ➔</Link>
                    </div>
                    <table className="dash-table">
                        <thead>
                            <tr>
                                <th>Client / Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recentOrders?.length === 0 ? (
                                <tr><td colSpan={3} style={{ textAlign: 'center' }}>No recent orders</td></tr>
                            ) : (
                                data.recentOrders?.map((o: any) => (
                                    <tr key={o._id}>
                                        <td>
                                            <div className="flex-col-data">
                                                <strong>{o.customer?.name}</strong>
                                                <span className="sub-text">{formatDate(o.createdAt)}</span>
                                            </div>
                                        </td>
                                        <td style={{ color: '#16a34a', fontWeight: 600 }}>${o.amount || 0}</td>
                                        <td><span className={`dash-badge badge-${o.status?.toLowerCase().replace(' ', '')}`}>{o.status}</span></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="dash-table-container" style={{ flex: 1, minWidth: '300px' }}>
                    <div className="dash-table-header">
                        <div className="dash-table-title">Recent Customers</div>
                        <Link href="/admin/customers" className="dash-view-all">View all ➔</Link>
                    </div>
                    <table className="dash-table">
                        <thead>
                            <tr>
                                <th>Name / Source</th>
                                <th>Email</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recentCustomers?.length === 0 ? (
                                <tr><td colSpan={3} style={{ textAlign: 'center' }}>No recent customers</td></tr>
                            ) : (
                                data.recentCustomers?.map((c: any) => (
                                    <tr key={c._id}>
                                        <td>
                                            <div className="flex-col-data">
                                                <strong>{c.name}</strong>
                                                <span className="sub-text" style={{ textTransform: 'capitalize' }}>Via {c.source}</span>
                                            </div>
                                        </td>
                                        <td>{c.email}</td>
                                        <td>{formatDate(c.created_at)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
