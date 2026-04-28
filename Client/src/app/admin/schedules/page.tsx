'use client';

import { useState, useEffect, useCallback } from 'react';
import './admin-schedule.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const ALL_HOURS = [
    '8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM',
    '1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM'
];

const METHOD_COLORS: Record<string, string> = {
    whatsapp: '#22c55e',
    zoom: '#8b5cf6',
    google_meet: '#f59e0b',
};

const METHOD_LABELS: Record<string, string> = {
    whatsapp: 'WhatsApp',
    zoom: 'Zoom',
    google_meet: 'Google Meet',
};

function CountdownTimer({ utcDateTime }: { utcDateTime: string }) {
    const [label, setLabel] = useState('');

    useEffect(() => {
        const update = () => {
            const diff = new Date(utcDateTime).getTime() - Date.now();
            if (diff <= 0) { setLabel('Ongoing / Past'); return; }
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            setLabel(h > 0 ? `Starts in ${h}h ${m}m` : `Starts in ${m}m`);
        };
        update();
        const t = setInterval(update, 60000);
        return () => clearInterval(t);
    }, [utcDateTime]);

    return <span className="countdown-timer">{label}</span>;
}

export default function AdminSchedulePage() {
    const [stats, setStats] = useState({ today: 0, thisWeek: 0, confirmed: 0, pending: 0 });
    const [activeHours, setActiveHours] = useState<string[]>([]);
    const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [message, setMessage] = useState('');
    const [sendingMsg, setSendingMsg] = useState(false);
    const [savingHours, setSavingHours] = useState(false);
    const [hoursSaved, setHoursSaved] = useState(false);
    const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/admin/schedule`, { credentials: 'include' });
            if (!res.ok) return;
            const data = await res.json();
            setStats(data.stats);
            setActiveHours(data.activeHours || []);
            setUpcomingBookings(data.upcomingBookings || []);
        } catch {}
        setLoading(false);
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const toggleHour = (hour: string) => {
        setActiveHours(prev =>
            prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour]
        );
        setHoursSaved(false);
    };

    const saveHours = async () => {
        setSavingHours(true);
        await fetch(`${API_BASE}/api/admin/schedule/hours`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ activeHours }),
        });
        setSavingHours(false);
        setHoursSaved(true);
    };

    const cancelBooking = async (bookingId: string) => {
        await fetch(`${API_BASE}/api/admin/schedule/${bookingId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ status: 'cancelled' }),
        });
        setCancelConfirm(null);
        fetchData();
    };

    const sendMessage = async () => {
        if (!message.trim() || !selectedBooking) return;
        setSendingMsg(true);
        await fetch(`${API_BASE}/api/admin/schedule/${selectedBooking.bookingId}/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ message }),
        });
        setSendingMsg(false);
        setMessage('');
        // Refresh the selected booking's conversation
        const res = await fetch(`${API_BASE}/api/admin/schedule`, { credentials: 'include' });
        const data = await res.json();
        const updated = data.upcomingBookings.find((b: any) => b.bookingId === selectedBooking.bookingId);
        if (updated) setSelectedBooking(updated);
        setUpcomingBookings(data.upcomingBookings);
    };

    const filteredBookings = upcomingBookings.filter(b => {
        if (filter === 'today') {
            return new Date(b.utcDateTime).toDateString() === new Date().toDateString();
        }
        if (filter === 'week') {
            const now = new Date();
            const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
            const bDate = new Date(b.utcDateTime);
            return bDate >= now && bDate <= weekEnd;
        }
        return true;
    });

    if (loading) return <div className="as-loading">Loading schedule data…</div>;

    return (
        <div className="admin-schedule-page">
            <h1 className="as-title">📅 Consultation Schedule</h1>

            {/* Stats Row */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-num">{stats.today}</div>
                    <div className="stat-label">Today's Bookings</div>
                </div>
                <div className="stat-card">
                    <div className="stat-num">{stats.thisWeek}</div>
                    <div className="stat-label">This Week</div>
                </div>
                <div className="stat-card">
                    <div className="stat-num">{stats.confirmed}</div>
                    <div className="stat-label">Confirmed</div>
                </div>
                <div className="stat-card pending">
                    <div className="stat-num">{stats.pending}</div>
                    <div className="stat-label">Pending Verification</div>
                </div>
            </div>

            <div className="as-main-grid">
                {/* LEFT: Active Hours + Booking List */}
                <div className="as-left">
                    {/* Active Hours Manager */}
                    <div className="as-card">
                        <div className="as-card-header">
                            <h2>Active Hours Manager</h2>
                            <button className={`save-hours-btn ${hoursSaved ? 'saved' : ''}`} onClick={saveHours} disabled={savingHours}>
                                {savingHours ? 'Saving…' : hoursSaved ? '✓ Saved' : 'Save Hours'}
                            </button>
                        </div>
                        <div className="hours-grid">
                            {ALL_HOURS.map(hour => (
                                <button
                                    key={hour}
                                    className={`hour-btn ${activeHours.includes(hour) ? 'on' : 'off'}`}
                                    onClick={() => toggleHour(hour)}
                                >
                                    {hour}
                                </button>
                            ))}
                        </div>
                        <p className="hours-note">⏰ Times in US Eastern Time (ET) · Mon–Fri</p>
                    </div>

                    {/* Upcoming Consultations */}
                    <div className="as-card">
                        <div className="as-card-header">
                            <h2>Upcoming Consultations</h2>
                            <select className="filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
                                <option value="all">All</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                            </select>
                        </div>

                        {filteredBookings.length === 0 ? (
                            <div className="no-bookings">No upcoming consultations found.</div>
                        ) : (
                            <div className="booking-list">
                                {filteredBookings.map(b => (
                                    <div key={b.bookingId} className={`booking-card ${selectedBooking?.bookingId === b.bookingId ? 'selected' : ''}`}>
                                        <div className="bc-date-col">
                                            <div className="bc-date">{b.date}</div>
                                            <div className="bc-time">{b.timeSlot}</div>
                                        </div>

                                        <div className="bc-info">
                                            <div className="bc-name">{b.client?.name}</div>
                                            <div className="bc-email">{b.client?.email}</div>
                                            <div className="bc-wa">{b.client?.whatsapp}</div>

                                            <div className="bc-badges">
                                                <span className="badge" style={{ background: METHOD_COLORS[b.meetingMethod] + '22', color: METHOD_COLORS[b.meetingMethod], border: `1px solid ${METHOD_COLORS[b.meetingMethod]}44` }}>
                                                    {METHOD_LABELS[b.meetingMethod] || b.meetingMethod}
                                                </span>
                                                <span className={`badge ${b.status === 'confirmed' ? 'badge-confirmed' : b.status === 'pending_verification' ? 'badge-pending' : 'badge-cancelled'}`}>
                                                    {b.status === 'confirmed' ? '✓ Verified' : b.status === 'pending_verification' ? '⏳ Pending' : b.status}
                                                </span>
                                                {b.utcDateTime && <CountdownTimer utcDateTime={b.utcDateTime} />}
                                            </div>
                                        </div>

                                        <div className="bc-actions">
                                            <button className="bc-btn reply" onClick={() => setSelectedBooking(b)}>💬 Reply</button>
                                            {b.status !== 'cancelled' && b.status !== 'completed' && (
                                                <button className="bc-btn cancel" onClick={() => setCancelConfirm(b.bookingId)}>✕ Cancel</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Reply Panel */}
                <div className="as-right">
                    {selectedBooking ? (
                        <div className="as-card reply-panel">
                            <div className="rp-header">
                                <div>
                                    <h2>{selectedBooking.client?.name}</h2>
                                    <p className="rp-meta">{selectedBooking.client?.email} · {selectedBooking.date} at {selectedBooking.timeSlot}</p>
                                </div>
                                <button className="rp-close" onClick={() => setSelectedBooking(null)}>✕</button>
                            </div>

                            {selectedBooking.projectNotes && (
                                <div className="rp-notes">
                                    <strong>Project Notes:</strong>
                                    <p>{selectedBooking.projectNotes}</p>
                                </div>
                            )}

                            <div className="rp-chat">
                                {selectedBooking.conversation?.length === 0 && (
                                    <div className="rp-empty">No messages yet. Start the conversation below.</div>
                                )}
                                {selectedBooking.conversation?.map((msg: any, i: number) => (
                                    <div key={i} className={`chat-bubble ${msg.from}`}>
                                        <p>{msg.message}</p>
                                        <span className="chat-time">{new Date(msg.sentAt).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="rp-compose">
                                <textarea
                                    className="rp-textarea"
                                    placeholder="Type your message…"
                                    rows={3}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                                <button className="rp-send" onClick={sendMessage} disabled={sendingMsg || !message.trim()}>
                                    {sendingMsg ? 'Sending…' : 'Send Message →'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="as-card reply-placeholder">
                            <div className="rp-icon">💬</div>
                            <p>Select a booking to view details and send a message</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Cancel Confirm Dialog */}
            {cancelConfirm && (
                <div className="modal-overlay" onClick={() => setCancelConfirm(null)}>
                    <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
                        <h3>Cancel Booking?</h3>
                        <p>Are you sure? A cancellation email will be sent to the client.</p>
                        <div className="confirm-actions">
                            <button className="confirm-btn" onClick={() => cancelBooking(cancelConfirm)}>Yes, Cancel</button>
                            <button className="cancel-cancel-btn" onClick={() => setCancelConfirm(null)}>Keep Booking</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
