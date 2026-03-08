'use client';

import { useState, useEffect } from 'react';
import '../admin.css';

export default function SchedulesAdmin() {
    const [schedules, setSchedules] = useState([] as any[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/schedules', { credentials: 'include' });
            if (res.ok) {
                setSchedules(await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch schedules', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Schedule Requests...</div>;

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1 className="admin-title">Meeting Schedules</h1>
            </header>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Email</th>
                                <th>Meeting Type</th>
                                <th>Preferred DB/Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center' }}>No meetings scheduled.</td>
                                </tr>
                            ) : (
                                schedules.map((s) => (
                                    <tr key={s._id}>
                                        <td><strong>{s.name}</strong></td>
                                        <td>{s.email}</td>
                                        <td>{s.meeting_type}</td>
                                        <td>
                                            {new Date(s.preferred_date).toLocaleDateString()}<br />
                                            <span style={{ fontSize: '12px', color: '#666' }}>{s.preferred_time}</span>
                                        </td>
                                        <td>
                                            <span className={`badge ${s.status === 'pending' ? 'badge-pending' : s.status === 'completed' ? 'badge-completed' : 'badge-progress'}`}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="admin-btn">Manage</button>
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
