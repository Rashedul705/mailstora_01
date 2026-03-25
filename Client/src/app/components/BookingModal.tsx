"use client";
import React, { useState, useEffect } from 'react';
import './BookingModal.css';

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Form data
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [meetingMethod, setMeetingMethod] = useState('WhatsApp Call');
    const [meetingLink, setMeetingLink] = useState('');
    const [message, setMessage] = useState('');

    const [availableSlots, setAvailableSlots] = useState<string[]>([]);

    const getBDDateString = () => {
        const d = new Date();
        const utcMs = d.getTime() + (d.getTimezoneOffset() * 60000);
        const bdMs = utcMs + (6 * 3600000); // UTC+6
        const bdDate = new Date(bdMs);
        const yyyy = bdDate.getFullYear();
        const mm = String(bdDate.getMonth() + 1).padStart(2, '0');
        const dd = String(bdDate.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {
        if (!isOpen) {
            // Reset when closed
            setTimeout(() => {
                setStep(1);
                setError('');
                setSuccessMessage('');
                setEmail('');
                setOtp('');
                setName('');
                setWhatsapp('');
                setDate('');
                setTime('');
                setMessage('');
                setMeetingMethod('WhatsApp Call');
            }, 300);
        }
    }, [isOpen]);

    useEffect(() => {
        if (date) {
            fetchSlots(date);
        }
    }, [date]);

    const fetchSlots = async (selectedDate: string) => {
        try {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const res = await fetch(`http://localhost:5001/api/schedules/available-slots?date=${selectedDate}&timezone=${userTimezone}`);
            if (res.ok) {
                const data = await res.json();
                setAvailableSlots(data);
                
                // data might be array of objects now: { value: ISO, label: formatted }
                // if selected time does not exist in new values, clear it
                if (!data.find((slot: any) => slot.value === time)) setTime('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5001/api/schedules/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok) {
                setStep(2);
            } else {
                setError(data.message || 'Error sending OTP');
            }
        } catch (err) {
            setError('Network error');
        }
        setLoading(false);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5001/api/schedules/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();
            if (res.ok) {
                setStep(3);
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Network error');
        }
        setLoading(false);
    };

    const handleBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const payload = {
                name,
                email,
                whatsapp,
                date,
                time,
                timezone: userTimezone,
                meetingMethod,
                meetingLink: (meetingMethod === 'Zoom' || meetingMethod === 'Google Meet') ? meetingLink : '',
                message
            };
            const res = await fetch('http://localhost:5001/api/schedules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                setSuccessMessage(data.message || 'Your consultation is confirmed. Please check your email.');
            } else {
                setError(data.message || 'Error booking consultation');
            }
        } catch (err) {
            setError('Network error');
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="booking-modal-overlay">
            <div className="booking-modal-content">
                <button className="booking-modal-close" onClick={onClose}>&times;</button>
                <h2>Schedule a Consultation</h2>

                {error && <div className="booking-error">{error}</div>}
                
                {successMessage ? (
                    <div className="booking-success">
                        <svg className="success-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p>{successMessage}</p>
                        <button className="btn btn-primary mt-4" onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <>
                        {step === 1 && (
                            <form onSubmit={handleSendOtp} className="booking-form">
                                <p className="step-info">Please verify your email to continue.</p>
                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input 
                                        type="email" 
                                        required 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        placeholder="you@company.com"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary full-width" disabled={loading}>
                                    {loading ? 'Sending...' : 'Verify Email'}
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleVerifyOtp} className="booking-form">
                                <p className="step-info">We sent a 6-digit code to <strong>{email}</strong></p>
                                <div className="form-group">
                                    <label>Verification Code *</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={otp} 
                                        onChange={(e) => setOtp(e.target.value)} 
                                        placeholder="123456"
                                        maxLength={6}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary full-width" disabled={loading}>
                                    {loading ? 'Verifying...' : 'Confirm Code'}
                                </button>
                                <button type="button" className="btn-link mt-2" onClick={() => setStep(1)}>
                                    Change Email
                                </button>
                            </form>
                        )}

                        {step === 3 && (
                            <form onSubmit={handleBook} className="booking-form scrollable-form">
                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input type="email" readOnly value={email} style={{ backgroundColor: '#eeeeee', color: '#666', cursor: 'not-allowed', border: '1px solid #ddd' }} />
                                </div>
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input type="text" className="text-input-clean" required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>WhatsApp Number *</label>
                                    <input type="tel" className="text-input-clean" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+1234567890" />
                                </div>
                                
                                <div className="form-group">
                                    <label>Date *</label>
                                    <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} min={getBDDateString()} />
                                </div>
                                <div className="form-group">
                                    <label>Time Slot *</label>
                                    {!date ? (
                                        <div style={{ fontSize: '14px', color: '#888', padding: '10px 0' }}>Please select a date first.</div>
                                    ) : availableSlots.length === 0 ? (
                                        <div style={{ fontSize: '14px', color: '#888', padding: '10px 0' }}>No slots available for this date.</div>
                                    ) : (
                                        <div className="time-grid">
                                            {availableSlots.map((slot: any) => (
                                                <button 
                                                    type="button" 
                                                    key={slot.value} 
                                                    className={`time-btn ${time === slot.value ? 'selected' : ''}`}
                                                    onClick={() => setTime(slot.value)}
                                                >
                                                    {slot.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div style={{ fontSize: '13px', color: '#666', marginTop: '-5px', textAlign: 'left', fontWeight: '500' }}>
                                    ✓ All times are shown in your local time ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                                </div>

                                <div className="form-group">
                                    <label>Preferred Meeting Method *</label>
                                    <div className="method-grid">
                                        {['WhatsApp Call', 'Zoom', 'Google Meet'].map(method => (
                                            <button 
                                                type="button" 
                                                key={method}
                                                className={`method-btn ${meetingMethod === method ? 'selected' : ''}`}
                                                onClick={() => setMeetingMethod(method)}
                                            >
                                                {method}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {(meetingMethod === 'Zoom' || meetingMethod === 'Google Meet') && (
                                    <div className="form-group">
                                        <label>Meeting Link (optional)</label>
                                        <input type="url" className="text-input-clean" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} placeholder="If you have a preferred link..." />
                                        <small>Admin can also provide this later if left blank.</small>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Message / Notes (optional)</label>
                                    <textarea rows={3} className="text-input-clean" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What would you like to discuss?"></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary full-width" disabled={loading || !time}>
                                    {loading ? 'Booking...' : 'Confirm Booking'}
                                </button>
                                
                                <div className="trust-text">
                                    <span>✓ Free consultation</span>
                                    <span>✓ Fast response</span>
                                    <span>✓ No spam</span>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
