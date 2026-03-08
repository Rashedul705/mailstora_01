'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function PricingAdmin() {
    const [packages, setPackages] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/pricing');
            if (res.ok) {
                setPackages(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch Pricing', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Pricing Packages...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1 className="admin-title">Manage Pricing Packages</h1>
                <button className="admin-btn admin-btn-primary">+ Create Package</button>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Package Name</th>
                                <th>Price</th>
                                <th>Delivery Time</th>
                                <th>Features Count</th>
                                <th>Highlighted</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center' }}>No pricing packages defined.</td>
                                </tr>
                            ) : (
                                packages.map((p) => (
                                    <tr key={p._id} style={{ backgroundColor: p.isPopular ? '#F8FAFC' : 'transparent' }}>
                                        <td><strong>{p.name}</strong></td>
                                        <td>${p.price}</td>
                                        <td>{p.deliveryTime}</td>
                                        <td>{p.features?.length || 0} inclusions</td>
                                        <td>{p.isPopular ? <span className="badge badge-progress">Popular</span> : '-'}</td>
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
