'use client';

import { useState, useEffect } from 'react';
import './orders.css';

interface Order {
    id: string;
    client: string;
    email: string;
    service: string;
    date: string;
    status: 'pending' | 'progress' | 'completed';
    amount: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([
        { id: '#ORD-1234', client: 'John Doe', email: 'john@example.com', service: 'Email Template', date: '2024-03-01', status: 'completed', amount: '$199' },
        { id: '#ORD-1235', client: 'Jane Smith', email: 'jane@smith.io', service: 'Email Signature', date: '2024-03-02', status: 'pending', amount: '$49' },
        { id: '#ORD-1236', client: 'Acme Corp', email: 'contact@acme.com', service: 'Newsletter Design', date: '2024-03-02', status: 'progress', amount: '$499' },
        { id: '#ORD-1237', client: 'Tech Start', email: 'founders@techstart.com', service: 'Email Signature', date: '2024-03-03', status: 'pending', amount: '$49' },
        { id: '#ORD-1238', client: 'Lifestyle Brand', email: 'hello@lifestyle.com', service: 'Email Template', date: '2024-03-03', status: 'completed', amount: '$199' },
    ]);

    useEffect(() => {
        const stored = localStorage.getItem('adminOrders');
        if (stored) {
            setOrders(JSON.parse(stored));
        } else {
            localStorage.setItem('adminOrders', JSON.stringify(orders));
        }
    }, []);

    const updateStatus = (id: string, newStatus: Order['status']) => {
        const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
        setOrders(updated);
        localStorage.setItem('adminOrders', JSON.stringify(updated));
    };

    return (
        <div className="orders-page">
            <header className="admin-header">
                <h1 className="admin-title">Orders Management</h1>
                <div className="header-actions">
                    <span className="order-count">{orders.length} total orders</span>
                </div>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Client Details</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td><strong>{order.id}</strong></td>
                                <td>
                                    <div className="client-info">
                                        <div className="client-name">{order.client}</div>
                                        <div className="client-email">{order.email}</div>
                                    </div>
                                </td>
                                <td>{order.service}</td>
                                <td>{order.date}</td>
                                <td>{order.amount}</td>
                                <td>
                                    <span className={`badge badge-${order.status}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        className="status-select"
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                                        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--admin-border)', fontSize: '0.875rem' }}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
