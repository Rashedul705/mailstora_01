"use client";

import { useState, useEffect } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function AvailabilitySettings() {
    const [workingDays, setWorkingDays] = useState<string[]>([]);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_BASE}/api/schedules/settings/availability`, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                const data = await res.json();
                setWorkingDays(data.workingDays || []);
                setStartTime(data.startTime || '09:00');
                setEndTime(data.endTime || '17:00');
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_BASE}/api/schedules/settings/availability`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workingDays, startTime, endTime })
            });
            if (res.ok) {
                setMessage('Availability settings saved successfully!');
            } else {
                setMessage('Error saving settings.');
            }
        } catch (err) {
            setMessage('Network error.');
        }
        setSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    const toggleDay = (day: string) => {
        setWorkingDays(prev => 
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="admin-title">
                    <h2>Availability Settings</h2>
                    <p>Manage your working days and hours for consultations.</p>
                </div>
            </div>

            <div className="admin-content" style={{ maxWidth: '600px', background: 'var(--bg-surface)', padding: '2rem', borderRadius: '8px' }}>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    <div>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Working Days</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {DAYS.map(day => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: `1px solid ${workingDays.includes(day) ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
                                        background: workingDays.includes(day) ? 'var(--primary)' : 'transparent',
                                        color: workingDays.includes(day) ? '#fff' : 'var(--text-secondary)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Start Time</label>
                            <input 
                                type="time" 
                                value={startTime} 
                                onChange={e => setStartTime(e.target.value)}
                                style={{
                                    width: '100%', padding: '10px', borderRadius: '6px',
                                    border: '1px solid var(--border)', background: 'var(--bg-dark)', color: '#fff'
                                }}
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>End Time</label>
                            <input 
                                type="time" 
                                value={endTime} 
                                onChange={e => setEndTime(e.target.value)}
                                style={{
                                    width: '100%', padding: '10px', borderRadius: '6px',
                                    border: '1px solid var(--border)', background: 'var(--bg-dark)', color: '#fff'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <button type="submit" disabled={saving} style={{
                            background: 'var(--primary)', color: '#fff', border: 'none', 
                            padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
                        }}>
                            {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>

                    {message && <div style={{ color: message.includes('Error') ? '#ef4444' : '#22c55e', marginTop: '10px' }}>{message}</div>}
                </form>
            </div>
        </div>
    );
}
