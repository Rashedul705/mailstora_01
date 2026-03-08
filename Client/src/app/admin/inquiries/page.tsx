'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function InquiriesAdmin() {
    const [inquiries, setInquiries] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/inquiries', { credentials: 'include' });
            if (res.ok) {
                setInquiries(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch Inquiries', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Contact Inquiries...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1 className="admin-title">Client Inquiries & Contact Forms</h1>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Date Received</th>
                                <th>Client Details</th>
                                <th>Service Interest</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center' }}>No inquiries received yet.</td>
                                </tr>
                            ) : (
                                inquiries.map((i) => (
                                    <tr key={i._id} style={{ backgroundColor: i.isRead ? 'transparent' : '#F8FAFC' }}>
                                        <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <strong>{i.name}</strong>
                                                <small style={{ color: '#64748B' }}>{i.email}</small>
                                            </div>
                                        </td>
                                        <td>{i.service || 'General Inquiry'}</td>
                                        <td>{i.message.length > 50 ? `${i.message.substring(0, 50)}...` : i.message}</td>
                                        <td>{i.isRead ? <span className="badge badge-completed">Read</span> : <span className="badge badge-pending">New Message</span>}</td>
                                        <td>
                                            <button className="admin-btn admin-btn-primary" style={{ marginRight: '10px' }}>View</button>
                                            <button className="admin-btn admin-btn-danger">Delete</button>
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
