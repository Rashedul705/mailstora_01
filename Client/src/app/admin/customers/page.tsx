'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function CustomersAdmin() {
    const [customers, setCustomers] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/customers', { credentials: 'include' });
            if (res.ok) {
                setCustomers(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch customers', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading CRM Profiles...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <div>
                    <h1 className="admin-title">Customer CRM</h1>
                    <p className="admin-subtitle">Manage all intercepted profiles across Orders, Quotes, and Inquiries.</p>
                </div>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company</th>
                                <th>Total Orders</th>
                                <th>Last Activity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center' }}>No customers synced yet.</td>
                                </tr>
                            ) : (
                                customers.map((c) => (
                                    <tr key={c._id}>
                                        <td><strong>{c.name}</strong></td>
                                        <td>{c.email}</td>
                                        <td>{c.company_name || '-'}</td>
                                        <td>
                                            <span className={`badge ${c.total_orders > 0 ? 'badge-completed' : 'badge-pending'}`}>
                                                {c.total_orders} Orders
                                            </span>
                                        </td>
                                        <td>{new Date(c.last_activity).toLocaleDateString()}</td>
                                        <td>
                                            <button className="admin-btn" style={{ marginRight: '10px' }}>
                                                View Profile
                                            </button>
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
