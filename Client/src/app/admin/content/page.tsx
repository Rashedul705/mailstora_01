'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function ContentAdmin() {
    const [contents, setContents] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Will fetch content when the specific GET all content route is implemented
        // For now, simulating structure
        setContents([
            { _id: '1', sectionId: 'hero', title: 'Custom HTML Email Templates', body: 'That Work Perfectly in Outlook, Gmail & 30+ Email Clients' },
            { _id: '2', sectionId: 'about', title: 'Why Choose Us', body: 'We have 3+ years experience building pixel-perfect emails.' }
        ]);
        setIsLoading(false);
    }, []);

    if (isLoading) return <div className="admin-loading">Loading Content Sections...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1 className="admin-title">Manage Website Content</h1>
                <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>Edit the text that appears across your public landing page.</p>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Section ID</th>
                                <th>Main Title</th>
                                <th>Body Text Extract</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contents.map((c) => (
                                <tr key={c._id}>
                                    <td><span className="badge badge-progress">{c.sectionId}</span></td>
                                    <td><strong>{c.title}</strong></td>
                                    <td>{c.body.substring(0, 60)}...</td>
                                    <td>
                                        <button className="admin-btn admin-btn-primary">Edit Content</button>
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
