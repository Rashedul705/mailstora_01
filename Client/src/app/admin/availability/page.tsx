"use client";

import { useState, useEffect } from 'react';

const DAYS = [
    { index: 1, name: 'Monday' },
    { index: 2, name: 'Tuesday' },
    { index: 3, name: 'Wednesday' },
    { index: 4, name: 'Thursday' },
    { index: 5, name: 'Friday' },
    { index: 6, name: 'Saturday' },
    { index: 0, name: 'Sunday' }
];

const ET_ZONE = 'America/New_York';

// Helper to convert "9:00 AM" to "09:00" for input type="time"
const formatToInputTime = (timeStr: string) => {
    if (!timeStr) return "09:00";
    if (!timeStr.includes('AM') && !timeStr.includes('PM')) return timeStr; // already HH:mm
    
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12 + '';
    }
    
    return `${hours.padStart(2, '0')}:${minutes}`;
};

function getUserTZ(): string {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone; }
    catch { return 'UTC'; }
}

function friendlyTZ(tz: string): string {
    return tz.split('/').pop()?.replace(/_/g, ' ') ?? tz;
}

// Convert "23:00" (ET) to local string, assuming today
function getLocalTimeStr(time24: string, userTZ: string): string {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return '';

    const today = new Date();
    // Guess UTC instant assuming ET is UTC-4
    const guess = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), h + 4, m, 0));
    
    const etFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: ET_ZONE, hour: 'numeric', minute: '2-digit', hour12: false,
    });
    
    const etParts  = etFormatter.formatToParts(guess);
    const etHStr   = etParts.find(p => p.type === 'hour')?.value ?? '0';
    // Handle 24h format quirk where midnight can be '24' instead of '0'
    const etH      = parseInt(etHStr) === 24 ? 0 : parseInt(etHStr); 
    const etM      = parseInt(etParts.find(p => p.type === 'minute')?.value ?? '0');

    // Correct the UTC instant
    const deltaMs = ((h - etH) * 60 + (m - etM)) * 60_000;
    const utcDate = new Date(guess.getTime() + deltaMs);

    return new Intl.DateTimeFormat('en-US', {
        timeZone: userTZ, hour: 'numeric', minute: '2-digit', hour12: true,
    }).format(utcDate);
}


export default function AvailabilitySettings() {
    const [activeDays, setActiveDays] = useState<number[]>([]);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [userTZ, setUserTZ] = useState('UTC');

    useEffect(() => {
        setUserTZ(getUserTZ());
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_BASE}/api/admin/schedule`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setActiveDays(data.activeDays || []);
                setStartTime(formatToInputTime(data.startTime || '09:00'));
                setEndTime(formatToInputTime(data.endTime || '17:00'));
            } else {
                console.error("Failed to load availability");
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
            const res = await fetch(`${API_BASE}/api/admin/schedule/hours`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activeDays, startTime, endTime }),
                credentials: 'include'
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

    const toggleDay = (dayIndex: number) => {
        setActiveDays(prev => 
            prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex]
        );
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="admin-header">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header" style={{ marginBottom: '2rem' }}>
                <div className="admin-title">
                    <h2 style={{ fontSize: '2rem', color: '#1a1740', marginBottom: '0.5rem' }}>Availability Settings</h2>
                    <p style={{ color: '#64748b' }}>Manage your working days and hours for consultations.</p>
                </div>
            </div>

            <div className="admin-content" style={{ maxWidth: '600px', background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e4f0' }}>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    <div>
                        <label style={{ display: 'block', marginBottom: '12px', fontWeight: '700', color: '#1e293b' }}>Working Days</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            {DAYS.map(day => {
                                const isSelected = activeDays.includes(day.index);
                                return (
                                    <button
                                        key={day.name}
                                        type="button"
                                        onClick={() => toggleDay(day.index)}
                                        style={{
                                            padding: '8px 20px',
                                            borderRadius: '99px',
                                            border: `1px solid ${isSelected ? '#4338CA' : '#cbd5e1'}`,
                                            background: isSelected ? '#4338CA' : 'white',
                                            color: isSelected ? 'white' : '#475569',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {day.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#1e293b' }}>Start Time (US Eastern)</label>
                            <input 
                                type="time" 
                                value={startTime} 
                                onChange={e => setStartTime(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: '8px',
                                    border: '1px solid #cbd5e1', background: 'white', color: '#1e293b',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                            {userTZ !== ET_ZONE && (
                                <div style={{ marginTop: '8px', fontSize: '0.875rem', color: '#64748b' }}>
                                    Your local time: <strong style={{ color: '#4338CA' }}>{getLocalTimeStr(startTime, userTZ)}</strong> ({friendlyTZ(userTZ)})
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#1e293b' }}>End Time (US Eastern)</label>
                            <input 
                                type="time" 
                                value={endTime} 
                                onChange={e => setEndTime(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: '8px',
                                    border: '1px solid #cbd5e1', background: 'white', color: '#1e293b',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                            {userTZ !== ET_ZONE && (
                                <div style={{ marginTop: '8px', fontSize: '0.875rem', color: '#64748b' }}>
                                    Your local time: <strong style={{ color: '#4338CA' }}>{getLocalTimeStr(endTime, userTZ)}</strong> ({friendlyTZ(userTZ)})
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <button type="submit" disabled={saving} style={{
                            background: '#4338CA', color: 'white', border: 'none', 
                            padding: '14px 28px', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: '700',
                            fontSize: '1rem', transition: 'background 0.2s', width: '100%'
                        }}>
                            {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>

                    {message && (
                        <div style={{ 
                            padding: '12px', borderRadius: '8px', textAlign: 'center', fontWeight: '600',
                            background: message.includes('Error') ? '#fef2f2' : '#f0fdf4',
                            color: message.includes('Error') ? '#ef4444' : '#16a34a',
                            border: `1px solid ${message.includes('Error') ? '#fca5a5' : '#bbf7d0'}`
                        }}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
