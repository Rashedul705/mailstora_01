'use client';

// Public booking calendar for /schedule/. Days and hours come from Admin → Schedules (ScheduleSettings);
// taken slots come from existing bookings. Booking is confirmed by an email code on /schedule/verify/.
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './booking.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const METHODS = [
    { id: 'google_meet', label: 'Google Meet' },
    { id: 'zoom', label: 'Zoom' },
    { id: 'whatsapp', label: 'WhatsApp call' },
];
const DAYS_AHEAD = 60;

type Slot = { timeSlot: string; isBooked: boolean; originalTime: string };

const pad = (n: number) => String(n).padStart(2, '0');
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** "10:00 AM ET" on a date, shown in the visitor's own time zone. */
function localTime(date: string, slot: string) {
    const [time, ampm] = slot.replace(' ET', '').split(' ');
    let [h, m] = time.split(':').map(Number);
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    // Work out the New York offset for that date, then convert to local
    const guess = new Date(`${date}T${pad(h)}:${pad(m)}:00Z`);
    const ny = new Date(guess.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const utc = new Date(guess.toLocaleString('en-US', { timeZone: 'UTC' }));
    const real = new Date(guess.getTime() + (utc.getTime() - ny.getTime()));
    return real.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function BookingWidget() {
    const router = useRouter();
    const params = useSearchParams();
    const [activeDays, setActiveDays] = useState<number[] | null>(null);
    const [month, setMonth] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
    const [date, setDate] = useState('');
    const [slots, setSlots] = useState<Slot[] | null>(null);
    const [slot, setSlot] = useState('');
    const [method, setMethod] = useState('google_meet');
    const [form, setForm] = useState({ name: '', email: '', whatsapp: '', company: '', notes: '' });
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const zone = useMemo(() => (typeof window === 'undefined' ? '' : Intl.DateTimeFormat().resolvedOptions().timeZone), []);

    useEffect(() => {
        fetch(`${API_BASE}/api/bookings/settings`).then((r) => r.json()).then((d) => setActiveDays(d.activeDays || [])).catch(() => setActiveDays([1, 2, 3, 4, 5]));
    }, []);

    useEffect(() => {
        if (!date) return;
        setSlots(null);
        setSlot('');
        fetch(`${API_BASE}/api/bookings/available?date=${date}`).then((r) => r.json()).then((d) => setSlots(Array.isArray(d) ? d : [])).catch(() => setSlots([]));
    }, [date]);

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const last = new Date(today); last.setDate(last.getDate() + DAYS_AHEAD);
    const cells: (Date | null)[] = [];
    for (let i = 0; i < month.getDay(); i++) cells.push(null);
    for (let d = 1; d <= new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(); d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));
    const selectable = (d: Date) => d >= today && d <= last && (activeDays ?? []).includes(d.getDay());
    const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1);
    const canNext = new Date(month.getFullYear(), month.getMonth() + 1, 1) <= last;
    const open = (slots ?? []).filter((s) => !s.isBooked);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !slot) return setError('Please choose a date and time.');
        setSending(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE}/api/bookings/initiate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, timeSlot: slot, meetingMethod: method, client: { name: form.name, email: form.email, whatsapp: form.whatsapp, company: form.company }, projectNotes: form.notes }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || data.error || 'Could not book this time.');
            const q = new URLSearchParams({ bookingId: data.bookingId, email: form.email, date, time: slot, method });
            router.push(`/schedule/verify/?${q.toString()}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
            setSending(false);
        }
    };

    return (
        <div className="bk" id="book">
            {params.get('expired') && <p className="bk-alert">Your code expired. Please choose a time again.</p>}
            {params.get('cancelled') && <p className="bk-alert">That booking was cancelled after too many attempts. Please book again.</p>}

            <div className="bk-grid">
                {/* Step 1: date */}
                <div className="bk-panel">
                    <p className="bk-step"><span>1</span> Choose a date</p>
                    <div className="bk-month">
                        <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} disabled={!canPrev} aria-label="Previous month">‹</button>
                        <strong>{month.toLocaleDateString([], { month: 'long', year: 'numeric' })}</strong>
                        <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} disabled={!canNext} aria-label="Next month">›</button>
                    </div>
                    <div className="bk-cal" role="grid">
                        {WEEK.map((w) => <span key={w} className="bk-wd">{w}</span>)}
                        {cells.map((d, i) => d ? (
                            <button key={i} type="button" disabled={!selectable(d)} aria-pressed={date === ymd(d)}
                                className={`bk-day${date === ymd(d) ? ' is-on' : ''}${ymd(d) === ymd(today) ? ' is-today' : ''}`}
                                onClick={() => setDate(ymd(d))}>{d.getDate()}</button>
                        ) : <span key={i} />)}
                    </div>
                    <p className="bk-note">30-minute call · times shown in New York time (ET){zone ? ` and your time (${zone})` : ''}</p>
                </div>

                {/* Step 2: time */}
                <div className="bk-panel">
                    <p className="bk-step"><span>2</span> Choose a time</p>
                    {!date && <p className="bk-empty">Pick a date to see open times.</p>}
                    {date && slots === null && <p className="bk-empty">Loading times…</p>}
                    {date && slots && open.length === 0 && <p className="bk-empty">No open times on this day. Please try another date.</p>}
                    {date && open.length > 0 && (
                        <div className="bk-slots">
                            {open.map((s) => (
                                <button key={s.timeSlot} type="button" className={`bk-slot${slot === s.timeSlot ? ' is-on' : ''}`} onClick={() => setSlot(s.timeSlot)}>
                                    <strong>{s.timeSlot}</strong>
                                    <small>{localTime(date, s.timeSlot)} your time</small>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Step 3: details */}
            {slot && (
                <form className="bk-panel bk-form" onSubmit={submit}>
                    <p className="bk-step"><span>3</span> Your details</p>
                    <p className="bk-summary">{new Date(`${date}T12:00:00`).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })} at <strong>{slot}</strong> ({localTime(date, slot)} your time)</p>
                    <div className="bk-methods" role="radiogroup" aria-label="Meeting method">
                        {METHODS.map((m) => (
                            <label key={m.id} className={method === m.id ? 'is-on' : ''}>
                                <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} /> {m.label}
                            </label>
                        ))}
                    </div>
                    <div className="bk-fields">
                        <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" /></label>
                        <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" /></label>
                        <label>WhatsApp number<input required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} autoComplete="tel" placeholder="+1 555 123 4567" /></label>
                        <label><span>Company <em>(optional)</em></span><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} autoComplete="organization" /></label>
                        <label className="bk-wide"><span>What would you like to discuss? <em>(optional)</em></span><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
                    </div>
                    {error && <p className="bk-error">{error}</p>}
                    <button type="submit" className="bk-submit" disabled={sending}>{sending ? 'Sending code…' : 'Book my free call'}</button>
                    <p className="bk-note">We will email you a 6-digit code to confirm the booking.</p>
                </form>
            )}
        </div>
    );
}
