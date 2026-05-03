'use client';

import { useState, useEffect, useCallback } from 'react';
import './admin-schedule.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const BD_ZONE  = 'Asia/Dhaka';

// Build ET time options with BDT labels (runs client-side)
function buildTimeOptions() {
    const ref = new Date();
    const [yr, mo, dy] = ref.toISOString().split('T')[0].split('-').map(Number);
    const options: Array<{ value: string; label: string }> = [];

    for (let h = 0; h < 24; h++) {
        for (const m of [0, 30]) {
            const ampm = h < 12 ? 'AM' : 'PM';
            const h12  = h === 0 ? 12 : h > 12 ? h - 12 : h;
            const etStr = `${h12}:${String(m).padStart(2, '0')} ${ampm}`;

            // Convert ET time → UTC → BDT
            const guess = new Date(Date.UTC(yr, mo - 1, dy, h + 4, m));
            const etParts = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: false,
            }).formatToParts(guess);
            const etH = parseInt(etParts.find(p => p.type === 'hour')?.value ?? '0');
            const etM = parseInt(etParts.find(p => p.type === 'minute')?.value ?? '0');
            const utcDate = new Date(guess.getTime() + ((h - etH) * 60 + (m - etM)) * 60_000);
            const bdtStr = new Intl.DateTimeFormat('en-US', {
                timeZone: BD_ZONE, hour: 'numeric', minute: '2-digit', hour12: true,
            }).format(utcDate);

            options.push({ value: etStr, label: `${bdtStr} BDT  (${etStr} ET)` });
        }
    }
    return options;
}

const TIME_OPTIONS_DATA = typeof window !== 'undefined' ? buildTimeOptions() : [];
const TIME_VALUES = TIME_OPTIONS_DATA.map(o => o.value);

// ET slot → BDT label for preview chips
function etSlotToBDT(etStr: string): string {
    const match = etStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return etStr;
    let h = parseInt(match[1]); const m = parseInt(match[2]); const p = match[3].toUpperCase();
    if (p === 'PM' && h !== 12) h += 12;
    if (p === 'AM' && h === 12) h = 0;
    const ref = new Date();
    const [yr, mo, dy] = ref.toISOString().split('T')[0].split('-').map(Number);
    const guess = new Date(Date.UTC(yr, mo - 1, dy, h + 4, m));
    const etParts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: false }).formatToParts(guess);
    const etH = parseInt(etParts.find(p => p.type === 'hour')?.value ?? '0');
    const etM = parseInt(etParts.find(p => p.type === 'minute')?.value ?? '0');
    const utcDate = new Date(guess.getTime() + ((h - etH) * 60 + (m - etM)) * 60_000);
    return new Intl.DateTimeFormat('en-US', { timeZone: BD_ZONE, hour: 'numeric', minute: '2-digit', hour12: true }).format(utcDate);
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const METHOD_COLORS: Record<string, string> = {
    whatsapp:    '#22c55e',
    zoom:        '#2D8CFF',
    google_meet: '#EA4335',
};

const METHOD_LABELS: Record<string, string> = {
    whatsapp:    'WhatsApp',
    zoom:        'Zoom',
    google_meet: 'Google Meet',
};

/** Format a UTC timestamp into Bangladesh Time (Asia/Dhaka) */
function toBDDateTime(utcStr: string): { date: string; time: string } {
    const d = new Date(utcStr);
    return {
        date: d.toLocaleDateString('en-CA', { timeZone: BD_ZONE }),
        time: d.toLocaleTimeString('en-US', { timeZone: BD_ZONE, hour: 'numeric', minute: '2-digit', hour12: true }),
    };
}

function toETTime(utcStr: string): string {
    return new Date(utcStr).toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true });
}

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
    const [stats, setStats]                       = useState({ today: 0, thisWeek: 0, confirmed: 0, pending: 0 });
    // BDT times (what the user picks and what gets stored)
    const [startBDT, setStartBDT]                 = useState('7:00 PM');  // default 9 AM ET
    const [endBDT, setEndBDT]                     = useState('3:00 AM');  // default 5 PM ET
    const [activeDays, setActiveDays]             = useState<number[]>([1,2,3,4,5]);
    const [timeOptions, setTimeOptions]           = useState<Array<{ value: string; label: string }>>([]);
    const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
    const [filter, setFilter]                     = useState('all');
    const [selectedBooking, setSelectedBooking]   = useState<any>(null);
    const [message, setMessage]                   = useState('');
    const [sendingMsg, setSendingMsg]             = useState(false);
    const [savingHours, setSavingHours]           = useState(false);
    const [hoursSaved, setHoursSaved]             = useState(false);
    const [cancelConfirm, setCancelConfirm]       = useState<string | null>(null);
    const [loading, setLoading]                   = useState(true);

    // Build time options client-side (needs Intl)
    useEffect(() => { setTimeOptions(buildTimeOptions()); }, []);

    const DAYS_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const fetchData = useCallback(async () => {
        try {
            // Fetch stats + bookings
            const statsRes = await fetch(`${API_BASE}/api/admin/schedule`, { credentials: 'include' });
            if (statsRes.ok) {
                const data = await statsRes.json();
                setStats(data.stats);
                setUpcomingBookings(data.upcomingBookings || []);
            }

            // Fetch availability (BDT-based) separately
            const availRes = await fetch(`${API_BASE}/api/admin/schedule/availability`, { credentials: 'include' });
            if (availRes.ok) {
                const availData = await availRes.json();
                const availability: any[] = availData.availability || [];

                if (availability.length > 0) {
                    // Find first enabled day to populate the shared start/end BDT fields
                    const firstEnabled = availability.find((a: any) => a.enabled && a.startBDT && a.endBDT);
                    if (firstEnabled) {
                        setStartBDT(firstEnabled.startBDT);
                        setEndBDT(firstEnabled.endBDT);
                    }
                    // Reconstruct activeDays from enabled days
                    const enabledDayIndices = availability
                        .filter((a: any) => a.enabled)
                        .map((a: any) => DAYS_NAMES.indexOf(a.day))
                        .filter(i => i !== -1);
                    if (enabledDayIndices.length > 0) setActiveDays(enabledDayIndices);
                }
            }
        } catch {}
        setLoading(false);
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    // BDT label for a given BDT time string (for display in preview)
    const bdtSlotLabel = (bdtTimeStr: string) => bdtTimeStr;

    const saveHours = async () => {
        setSavingHours(true);
        // Build availability array: apply same startBDT/endBDT to all active days
        const availability = DAYS_NAMES.map(day => {
            const dayIdx = DAYS_NAMES.indexOf(day);
            const enabled = activeDays.includes(dayIdx);
            return {
                day,
                enabled,
                startBDT: enabled ? startBDT : '',
                endBDT: enabled ? endBDT : ''
            };
        });

        await fetch(`${API_BASE}/api/admin/schedule/availability`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ availability }),
        });
        setSavingHours(false);
        setHoursSaved(true);
        setTimeout(() => setHoursSaved(false), 3000);
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
        const res  = await fetch(`${API_BASE}/api/admin/schedule`, { credentials: 'include' });
        const data = await res.json();
        const updated = data.upcomingBookings.find((b: any) => b.bookingId === selectedBooking.bookingId);
        if (updated) setSelectedBooking(updated);
        setUpcomingBookings(data.upcomingBookings);
    };

    const filteredBookings = upcomingBookings.filter(b => {
        if (filter === 'today') return new Date(b.utcDateTime).toDateString() === new Date().toDateString();
        if (filter === 'week') {
            const now = new Date();
            const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
            const bDate = new Date(b.utcDateTime);
            return bDate >= now && bDate <= weekEnd;
        }
        return true;
    });

    // Preview: generate BDT slots between startBDT and endBDT
    const previewSlots = (() => {
        // Build a simple BDT slot list from startBDT to endBDT in 30-min steps
        const parse12h = (str: string): number => {
            const match = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (!match) return -1;
            let h = parseInt(match[1]); const m = parseInt(match[2]); const p = match[3].toUpperCase();
            if (p === 'PM' && h !== 12) h += 12;
            if (p === 'AM' && h === 12) h = 0;
            return h * 60 + m;
        };
        const format12h = (totalMins: number) => {
            let h = Math.floor(totalMins / 60) % 24;
            const m = totalMins % 60;
            const ampm = h < 12 ? 'AM' : 'PM';
            const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
            return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
        };
        let startMin = parse12h(startBDT);
        let endMin = parse12h(endBDT);
        if (startMin < 0 || endMin < 0) return [];
        if (endMin <= startMin) endMin += 24 * 60; // overnight
        const result = [];
        for (let t = startMin; t < endMin; t += 30) {
            result.push(format12h(t % (24 * 60)));
        }
        return result;
    })();

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
                {/* LEFT */}
                <div className="as-left">

                    {/* Active Hours Manager — Start/End picker */}
                    <div className="as-card">
                        <div className="as-card-header">
                            <h2>Active Hours</h2>
                            <button
                                className={`save-hours-btn ${hoursSaved ? 'saved' : ''}`}
                                onClick={saveHours}
                                disabled={savingHours}
                            >
                                {savingHours ? 'Saving…' : hoursSaved ? '✓ Saved' : 'Save Hours'}
                            </button>
                        </div>

                        {/* Start / End dropdowns — labelled in BDT */}
                        <div className="hours-picker-row">
                            <div className="hours-picker-group">
                                <label className="hours-picker-label">Start Time (BDT)</label>
                                <select
                                    className="hours-picker-select"
                                    value={startBDT}
                                    onChange={e => { setStartBDT(e.target.value); setHoursSaved(false); }}
                                >
                                    {timeOptions.map(t => (
                                        <option key={t.value} value={t.label.split(' BDT')[0].trim()}>{t.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="hours-picker-arrow">→</div>

                            <div className="hours-picker-group">
                                <label className="hours-picker-label">End Time (BDT)</label>
                                <select
                                    className="hours-picker-select"
                                    value={endBDT}
                                    onChange={e => { setEndBDT(e.target.value); setHoursSaved(false); }}
                                >
                                    {timeOptions.map(t => (
                                        <option key={t.value} value={t.label.split(' BDT')[0].trim()}>{t.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Active Days — 7-day toggle */}
                        <div className="active-days-section">
                            <label className="hours-picker-label">Active Days</label>
                            <div className="active-days-row">
                                {DAYS_OF_WEEK.map((day, idx) => (
                                    <button
                                        key={day}
                                        className={`day-btn ${activeDays.includes(idx) ? 'on' : 'off'}`}
                                        onClick={() => {
                                            setActiveDays(prev =>
                                                prev.includes(idx) ? prev.filter(d => d !== idx) : [...prev, idx].sort()
                                            );
                                            setHoursSaved(false);
                                        }}
                                        type="button"
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Live preview of generated slots (BDT) */}
                        {previewSlots.length > 0 && (
                            <div className="slots-preview">
                                <p className="slots-preview-label">
                                    ✅ {previewSlots.length} slots shown to clients (30 min · BDT display):
                                </p>
                                <div className="slots-preview-grid">
                                    {previewSlots.map((bdt, i) => (
                                        <span key={i} className="slot-chip">{bdt}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {previewSlots.length === 0 && (
                            <p className="hours-note" style={{ color: '#ef4444' }}>⚠ End time must be after start time (or end time wraps to next day for overnight shifts).</p>
                        )}

                        <p className="hours-note">⏰ Times set in BDT · Stored & applied as ET internally · Each slot is 30 minutes</p>
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
                                            {b.utcDateTime ? (() => {
                                                const bd = toBDDateTime(b.utcDateTime);
                                                const et = toETTime(b.utcDateTime);
                                                return (
                                                    <>
                                                        <div className="bc-date">{bd.date}</div>
                                                        <div className="bc-time">{bd.time} <span className="bc-tz">BDT</span></div>
                                                        <div className="bc-et">({et} ET)</div>
                                                    </>
                                                );
                                            })() : (
                                                <>
                                                    <div className="bc-date">{b.date}</div>
                                                    <div className="bc-time">{b.timeSlot}</div>
                                                </>
                                            )}
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
