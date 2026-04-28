'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './schedule.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const MEETING_METHODS = [
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬', desc: 'Voice/video call on WhatsApp' },
    { id: 'zoom', label: 'Zoom', icon: '🎥', desc: 'Zoom video meeting' },
    { id: 'google_meet', label: 'Google Meet', icon: '📹', desc: 'Google Meet video call' },
];

function Calendar({ selectedDate, onSelectDate }: { selectedDate: string; onSelectDate: (d: string) => void }) {
    const [viewYear, setViewYear] = useState(new Date().getFullYear());
    const [viewMonth, setViewMonth] = useState(new Date().getMonth());
    const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

    const pad = (n: number) => String(n).padStart(2, '0');
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

    // Fetch available dates for the month to know which to highlight
    useEffect(() => {
        const fetchMonthAvailability = async () => {
            const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
            const available = new Set<string>();
            const checks: Promise<void>[] = [];

            for (let d = 1; d <= daysInMonth; d++) {
                const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
                const dayOfWeek = new Date(dateStr + 'T12:00:00').getDay(); // use noon to avoid TZ issues
                if (dayOfWeek === 0 || dayOfWeek === 6) continue; // skip weekends

                checks.push(
                    fetch(`${API_BASE}/api/bookings/available?date=${dateStr}`)
                        .then(r => r.json())
                        .then(slots => {
                            if (Array.isArray(slots) && slots.some((s: any) => !s.isBooked)) {
                                available.add(dateStr);
                            }
                        })
                        .catch(() => {})
                );
            }
            await Promise.all(checks);
            setAvailableDates(available);
        };

        fetchMonthAvailability();
    }, [viewYear, viewMonth]);

    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const cells = [];
    for (let i = 0; i < firstDayOfMonth; i++) cells.push(<div key={`e${i}`} className="cal-empty" />);

    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
        const dayOfWeek = new Date(dateStr + 'T12:00:00').getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isToday = dateStr === todayStr;
        const isSelected = dateStr === selectedDate;
        const isPast = dateStr < todayStr;
        const hasSlots = availableDates.has(dateStr);
        const isClickable = !isWeekend && !isPast && hasSlots;

        cells.push(
            <div
                key={d}
                className={`cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${!isClickable ? 'disabled' : 'available'}`}
                onClick={() => isClickable && onSelectDate(dateStr)}
            >
                {d}
            </div>
        );
    }

    return (
        <div className="calendar-widget">
            <div className="cal-header">
                <button className="cal-nav" onClick={prevMonth}>‹</button>
                <span className="cal-month-title">{monthNames[viewMonth]} {viewYear}</span>
                <button className="cal-nav" onClick={nextMonth}>›</button>
            </div>
            <div className="cal-days-header">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                    <div key={d} className="cal-day-name">{d}</div>
                ))}
            </div>
            <div className="cal-grid">{cells}</div>
            <p className="cal-tz-note">🕐 All times shown in US Eastern Time (ET)</p>
        </div>
    );
}

function TimeSlotPicker({ date, selectedSlot, onSelectSlot }: { date: string; selectedSlot: string; onSelectSlot: (s: string) => void }) {
    const [slots, setSlots] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!date) return;
        setLoading(true);
        setSlots([]);
        fetch(`${API_BASE}/api/bookings/available?date=${date}`)
            .then(r => r.json())
            .then(data => { setSlots(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [date]);

    if (!date) return <p className="slot-placeholder">← Select a date to see available times</p>;
    if (loading) return <div className="slot-loading"><div className="spinner" /><span>Loading slots…</span></div>;
    if (slots.length === 0) return <p className="slot-placeholder">No slots available for this date.</p>;

    return (
        <div className="slots-grid">
            {slots.map((slot: any) => {
                const bookedCount = slot.isBooked ? 1 : 0;
                return (
                    <button
                        key={slot.timeSlot}
                        className={`slot-btn ${selectedSlot === slot.timeSlot ? 'selected' : ''} ${slot.isBooked ? 'booked' : ''}`}
                        onClick={() => !slot.isBooked && onSelectSlot(slot.timeSlot)}
                        disabled={slot.isBooked}
                    >
                        <span className="slot-time">{slot.originalTime}</span>
                        <span className={`slot-tag ${slot.isBooked ? 'tag-booked' : 'tag-available'}`}>
                            {slot.isBooked ? 'Booked' : 'Available'}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default function SchedulePage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', company: '', projectNotes: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!selectedDate) return setError('Please select a date.');
        if (!selectedSlot) return setError('Please select a time slot.');
        if (!selectedMethod) return setError('Please select a meeting method.');
        if (!formData.name || !formData.email || !formData.whatsapp) return setError('Please fill in all required fields.');

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/bookings/initiate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: selectedDate,
                    timeSlot: selectedSlot,
                    meetingMethod: selectedMethod,
                    client: { name: formData.name, email: formData.email, whatsapp: formData.whatsapp, company: formData.company },
                    projectNotes: formData.projectNotes,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to initiate booking');
            router.push(`/schedule/verify?bookingId=${data.bookingId}&email=${encodeURIComponent(formData.email)}&date=${selectedDate}&time=${encodeURIComponent(selectedSlot)}&method=${selectedMethod}`);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const methodLabel = MEETING_METHODS.find(m => m.id === selectedMethod)?.label || '—';

    return (
        <>
            <Navbar />
            <div className="schedule-page">
                <div className="schedule-header">
                    <h1>Book a Free Consultation</h1>
                    <p>Schedule a 30-minute strategy session to discuss your email project</p>
                </div>

                <div className="schedule-layout">
                    {/* LEFT — Form */}
                    <div className="schedule-form-col">
                        {/* Calendar */}
                        <section className="form-section">
                            <h2 className="section-title"><span className="section-num">1</span> Choose a Date</h2>
                            <Calendar selectedDate={selectedDate} onSelectDate={d => { setSelectedDate(d); setSelectedSlot(''); }} />
                        </section>

                        {/* Time Slots */}
                        <section className="form-section">
                            <h2 className="section-title"><span className="section-num">2</span> Choose a Time</h2>
                            <TimeSlotPicker date={selectedDate} selectedSlot={selectedSlot} onSelectSlot={setSelectedSlot} />
                            <p className="slot-note">30 min per session · Admin-controlled slots</p>
                        </section>

                        {/* Meeting Method */}
                        <section className="form-section">
                            <h2 className="section-title"><span className="section-num">3</span> Meeting Method</h2>
                            <div className="method-grid">
                                {MEETING_METHODS.map(m => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        className={`method-card ${selectedMethod === m.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedMethod(m.id)}
                                    >
                                        <span className="method-icon">{m.icon}</span>
                                        <span className="method-label">{m.label}</span>
                                        <span className="method-desc">{m.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Client Info */}
                        <section className="form-section">
                            <h2 className="section-title"><span className="section-num">4</span> Your Information</h2>
                            <form onSubmit={handleSubmit} className="client-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name <span className="req">*</span></label>
                                        <input type="text" placeholder="John Smith" value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address <span className="req">*</span></label>
                                        <input type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>WhatsApp Number <span className="req">*</span></label>
                                        <input type="tel" placeholder="+1 234 567 8900" value={formData.whatsapp} onChange={e => setFormData(f => ({ ...f, whatsapp: e.target.value }))} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Company / Website <span className="opt">(optional)</span></label>
                                        <input type="text" placeholder="yourcompany.com" value={formData.company} onChange={e => setFormData(f => ({ ...f, company: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="form-group full">
                                    <label>Project Description <span className="opt">(optional)</span></label>
                                    <textarea placeholder="Briefly describe your email project…" rows={4} value={formData.projectNotes} onChange={e => setFormData(f => ({ ...f, projectNotes: e.target.value }))} />
                                </div>

                                {error && <div className="form-error">⚠ {error}</div>}

                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? <span className="btn-spinner" /> : 'Confirm Booking →'}
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* RIGHT — Sidebar */}
                    <aside className="schedule-sidebar">
                        <div className="sidebar-sticky">
                            <div className="sidebar-booking-summary">
                                <h3>Booking Summary</h3>
                                <div className="summary-item">
                                    <span className="summary-label">📅 Date</span>
                                    <span className="summary-value">{selectedDate || '—'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">🕐 Time</span>
                                    <span className="summary-value">{selectedSlot || '—'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">⏱ Duration</span>
                                    <span className="summary-value">30 minutes</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">💻 Method</span>
                                    <span className="summary-value">{methodLabel}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">💰 Cost</span>
                                    <span className="summary-value free">FREE</span>
                                </div>
                            </div>

                            <div className="sidebar-trust">
                                <div className="trust-item">✅ Reminders sent automatically</div>
                                <div className="trust-item">🔒 Email verification required</div>
                                <div className="trust-item">🌎 US Eastern Time (ET)</div>
                                <div className="trust-item">⏱ 30-Minute session</div>
                            </div>

                            <div className="sidebar-stats">
                                <div className="stat-pill"><span>180+</span> Clients</div>
                                <div className="stat-pill"><span>100%</span> Satisfaction</div>
                            </div>

                            <a href="https://wa.me/8801744350705?text=Hi, I'd like to schedule a consultation!" target="_blank" rel="noopener noreferrer" className="wa-chat-btn">
                                💬 Chat on WhatsApp Instead
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />
        </>
    );
}
