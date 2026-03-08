'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function PortfolioAdmin() {
    const [projects, setProjects] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/portfolio');
            if (res.ok) {
                setProjects(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch Portfolio', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Portfolio Gallery...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <div>
                    <h1 className="admin-title">Manage Portfolio Gallery</h1>
                    <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>Upload images of your best email designs.</p>
                </div>
                <button className="admin-btn admin-btn-primary">+ Add Project</button>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Category</th>
                                <th>Main Image Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No portfolio projects uploaded yet.</td>
                                </tr>
                            ) : (
                                projects.map((p) => (
                                    <tr key={p._id}>
                                        <td><strong>{p.title}</strong></td>
                                        <td><span className="badge badge-completed">{p.category}</span></td>
                                        <td><a href={p.mainImage} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-primary)' }}>View Image</a></td>
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
