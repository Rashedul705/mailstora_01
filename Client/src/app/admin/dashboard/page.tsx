'use client';

import { useState, useEffect } from 'react';
import './dashboard.css';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalOrders: 124,
        portfolioItems: 12,
        pendingQuotes: 8,
        revenue: '$24,500'
    });

    const [recentOrders, setRecentOrders] = useState([
        { id: '#ORD-1234', client: 'John Doe', service: 'Email Template', date: '2024-03-01', status: 'completed' },
        { id: '#ORD-1235', client: 'Jane Smith', service: 'Email Signature', date: '2024-03-02', status: 'pending' },
        { id: '#ORD-1236', client: 'Acme Corp', service: 'Newsletter Design', date: '2024-03-02', status: 'progress' },
        { id: '#ORD-1237', client: 'Tech Start', service: 'Email Signature', date: '2024-03-03', status: 'pending' },
    ]);

    useEffect(() => {
        // Calculate dynamic stats from localStorage
        const storedOrders = localStorage.getItem('adminOrders');
        const storedPortfolio = localStorage.getItem('adminPortfolio');

        if (storedOrders) {
            const orders = JSON.parse(storedOrders);
            const revenueCount = orders.reduce((acc: number, curr: any) => {
                const amount = parseInt(curr.amount.replace('$', '')) || 0;
                return acc + amount;
            }, 0);

            setStats(prev => ({
                ...prev,
                totalOrders: orders.length,
                revenue: `$${revenueCount.toLocaleString()}`,
                pendingQuotes: orders.filter((o: any) => o.status === 'pending').length
            }));
            setRecentOrders(orders.slice(0, 5));
        }

        if (storedPortfolio) {
            const portfolio = JSON.parse(storedPortfolio);
            setStats(prev => ({
                ...prev,
                portfolioItems: portfolio.length
            }));
        }
    }, []);

    return (
        <div className="dashboard-page">
            <header className="admin-header">
                <h1 className="admin-title">Dashboard Overview</h1>
                <div className="admin-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </header>

            <div className="stats-grid">
                <div className="admin-card stat-card">
                    <div className="stat-label">Total Orders</div>
                    <div className="stat-value">{stats.totalOrders}</div>
                </div>
                <div className="admin-card stat-card">
                    <div className="stat-label">Portfolio Items</div>
                    <div className="stat-value">{stats.portfolioItems}</div>
                </div>
                <div className="admin-card stat-card">
                    <div className="stat-label">Pending Quotes</div>
                    <div className="stat-value">{stats.pendingQuotes}</div>
                </div>
                <div className="admin-card stat-card">
                    <div className="stat-label">Total Revenue</div>
                    <div className="stat-value">{stats.revenue}</div>
                </div>
            </div>

            <div className="recent-activity">
                <div className="card-header">
                    <h2>Recent Orders</h2>
                </div>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Client</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td><strong>{order.id}</strong></td>
                                    <td>
                                        <div className="client-info">
                                            <span className="client-name">{(order as any).client}</span>
                                            <span className="client-email">{(order as any).email || 'No email provided'}</span>
                                        </div>
                                    </td>
                                    <td>{order.service}</td>
                                    <td>{order.date}</td>
                                    <td>
                                        <span className={`badge badge-${order.status}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
