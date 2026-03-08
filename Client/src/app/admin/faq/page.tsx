'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function FAQAdmin() {
    const [faqs, setFaqs] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/faq');
            if (res.ok) {
                setFaqs(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch FAQs', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading FAQs...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1 className="admin-title">Manage Frequently Asked Questions</h1>
                <button className="admin-btn admin-btn-primary">+ Add FAQ Entry</button>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Question</th>
                                <th>Answer Extract</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No FAQs found. Add common questions to help your clients!</td>
                                </tr>
                            ) : (
                                faqs.map((f) => (
                                    <tr key={f._id}>
                                        <td><strong>#{f.orderNumber}</strong></td>
                                        <td>{f.question}</td>
                                        <td>{f.answer.substring(0, 50)}...</td>
                                        <td>
                                            <button className="admin-btn" style={{ marginRight: '10px' }}>Edit</button>
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
