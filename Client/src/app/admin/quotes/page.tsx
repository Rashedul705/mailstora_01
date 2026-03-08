'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function QuotesAdmin() {
    const [quotes, setQuotes] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/quotes', { credentials: 'include' });
            if (res.ok) {
                setQuotes(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch quotes', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Quote Requests...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1 className="admin-title">Quote Requests</h1>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Client Info</th>
                                <th>Company</th>
                                <th>Budget</th>
                                <th>Timeline</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center' }}>No quote requests found.</td>
                                </tr>
                            ) : (
                                quotes.map((q) => (
                                    <tr key={q._id}>
                                        <td>
                                            <strong>{q.name}</strong><br />
                                            <span style={{ fontSize: '12px', color: '#666' }}>{q.email}</span>
                                        </td>
                                        <td>{q.company || '-'}</td>
                                        <td>{q.budget || '-'}</td>
                                        <td>{q.timeline || '-'}</td>
                                        <td>
                                            <span className={`badge ${q.status === 'new' ? 'badge-pending' : 'badge-progress'}`}>
                                                {q.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="admin-btn">Review</button>
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
