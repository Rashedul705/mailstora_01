'use client';

import { useState, useEffect } from 'react';
import './dashboard.css';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        portfolioItems: 0,
        totalCustomers: 0,
        pendingQuotes: 0,
        revenue: '$0'
    });

    const [recentOrders, setRecentOrders] = useState([
        { id: '#ORD-1234', client: 'John Doe', service: 'Email Template', date: '2024-03-01', status: 'completed' },
        { id: '#ORD-1235', client: 'Jane Smith', service: 'Email Signature', date: '2024-03-02', status: 'pending' },
        { id: '#ORD-1236', client: 'Acme Corp', service: 'Newsletter Design', date: '2024-03-02', status: 'progress' },
        { id: '#ORD-1237', client: 'Tech Start', service: 'Email Signature', date: '2024-03-03', status: 'pending' },
    ]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch all raw data required for the dashboard overview in parallel
                const [ordersRes, portfolioRes, customersRes, quotesRes] = await Promise.all([
                    fetch('http://localhost:5000/api/orders', { credentials: 'include' }),
                    fetch('http://localhost:5000/api/portfolio'),
                    fetch('http://localhost:5000/api/customers', { credentials: 'include' }),
                    fetch('http://localhost:5000/api/quotes', { credentials: 'include' })
                ]);

                if (ordersRes.ok) {
                    const orders = await ordersRes.json();
                    const revenueCount = orders.reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);

                    setStats(prev => ({
                        ...prev,
                        totalOrders: orders.length,
                        revenue: `$${revenueCount.toLocaleString()}`
                    }));
                    setRecentOrders(orders.slice(0, 5).map((o: any) => ({
                        id: o.order_number || o.orderId,
                        client: o.customer_id?.name || o.clientName || 'Unknown',
                        email: o.customer_id?.email || o.clientEmail || 'Unknown',
                        service: o.package_name || o.orderPackage,
                        date: new Date(o.created_at || o.orderDate).toLocaleDateString(),
                        status: o.status.toLowerCase()
                    })));
                }

                if (portfolioRes.ok) {
                    const portfolio = await portfolioRes.json();
                    setStats(prev => ({ ...prev, portfolioItems: portfolio.length }));
                }

                if (customersRes.ok) {
                    const customers = await customersRes.json();
                    setStats(prev => ({ ...prev, totalCustomers: customers.length }));
                }

                if (quotesRes.ok) {
                    const quotes = await quotesRes.json();
                    setStats(prev => ({ ...prev, pendingQuotes: quotes.filter((q: any) => q.status === 'new').length }));
                }
            } catch (err) {
                console.error("Failed to fetch dashboard metrics", err);
            }
        };

        fetchDashboardData();
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
                    <div className="stat-label">Total Customers</div>
                    <div className="stat-value">{stats.totalCustomers}</div>
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
