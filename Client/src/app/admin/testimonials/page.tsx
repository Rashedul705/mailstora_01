'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/testimonials');
            if (res.ok) {
                setTestimonials(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch testimonials', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Testimonials...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1 className="admin-title">Manage Testimonials</h1>
                <button className="admin-btn admin-btn-primary">+ Add Testimonial</button>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Position/Company</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No testimonials found. Add one to display on the landing page!</td>
                                </tr>
                            ) : (
                                testimonials.map((t) => (
                                    <tr key={t._id}>
                                        <td><strong>{t.name}</strong></td>
                                        <td>{t.company}</td>
                                        <td>{t.rating} / 5</td>
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
