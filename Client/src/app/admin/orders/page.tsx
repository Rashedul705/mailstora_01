'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function OrdersAdmin() {
    const [orders, setOrders] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/orders', { credentials: 'include' });
            if (res.ok) {
                setOrders(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch Orders', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Orders...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1 className="admin-title">Order Management</h1>
                <button className="admin-btn admin-btn-primary">+ Create Manual Order</button>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Client Name</th>
                                <th>Package</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center' }}>No orders found.</td>
                                </tr>
                            ) : (
                                orders.map((o) => (
                                    <tr key={o._id}>
                                        <td><strong>{o.orderId}</strong></td>
                                        <td>{o.clientName}</td>
                                        <td>{o.orderPackage}</td>
                                        <td>${o.price}</td>
                                        <td>
                                            <span className={`badge ${o.status === 'Completed' ? 'badge-completed' : o.status === 'Pending' ? 'badge-pending' : 'badge-progress'}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="admin-btn" style={{ marginRight: '10px' }}>Manage</button>
                                        </td>
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
