'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function ServicesAdmin() {
    const [services, setServices] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/services');
            if (res.ok) {
                setServices(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch Services', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Services...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1 className="admin-title">Manage Service Offerings</h1>
                <button className="admin-btn admin-btn-primary">+ Add New Service</button>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Service Title</th>
                                <th>Description</th>
                                <th>Icon (Feather)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No services configured. Add the services you offer!</td>
                                </tr>
                            ) : (
                                services.map((s) => (
                                    <tr key={s._id}>
                                        <td><strong>{s.title}</strong></td>
                                        <td>{s.description.substring(0, 60)}...</td>
                                        <td><code>{s.icon}</code></td>
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
