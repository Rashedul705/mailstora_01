"use client";
import React, { useState, useEffect } from 'react';
import './BookingModal.css';

const ALL_COUNTRY_CODES = [
    { code: '+1', label: '+1 (US/CA)' },
    { code: '+7', label: '+7 (RU/KZ)' },
    { code: '+20', label: '+20 (EG)' },
    { code: '+27', label: '+27 (ZA)' },
    { code: '+31', label: '+31 (NL)' },
    { code: '+32', label: '+32 (BE)' },
    { code: '+33', label: '+33 (FR)' },
    { code: '+34', label: '+34 (ES)' },
    { code: '+36', label: '+36 (HU)' },
    { code: '+39', label: '+39 (IT)' },
    { code: '+40', label: '+40 (RO)' },
    { code: '+41', label: '+41 (CH)' },
    { code: '+43', label: '+43 (AT)' },
    { code: '+44', label: '+44 (UK)' },
    { code: '+45', label: '+45 (DK)' },
    { code: '+46', label: '+46 (SE)' },
    { code: '+47', label: '+47 (NO)' },
    { code: '+48', label: '+48 (PL)' },
    { code: '+49', label: '+49 (DE)' },
    { code: '+51', label: '+51 (PE)' },
    { code: '+52', label: '+52 (MX)' },
    { code: '+53', label: '+53 (CU)' },
    { code: '+54', label: '+54 (AR)' },
    { code: '+55', label: '+55 (BR)' },
    { code: '+56', label: '+56 (CL)' },
    { code: '+57', label: '+57 (CO)' },
    { code: '+58', label: '+58 (VE)' },
    { code: '+60', label: '+60 (MY)' },
    { code: '+61', label: '+61 (AU)' },
    { code: '+62', label: '+62 (ID)' },
    { code: '+63', label: '+63 (PH)' },
    { code: '+64', label: '+64 (NZ)' },
    { code: '+65', label: '+65 (SG)' },
    { code: '+66', label: '+66 (TH)' },
    { code: '+81', label: '+81 (JP)' },
    { code: '+82', label: '+82 (KR)' },
    { code: '+84', label: '+84 (VN)' },
    { code: '+86', label: '+86 (CN)' },
    { code: '+90', label: '+90 (TR)' },
    { code: '+91', label: '+91 (IN)' },
    { code: '+92', label: '+92 (PK)' },
    { code: '+93', label: '+93 (AF)' },
    { code: '+94', label: '+94 (LK)' },
    { code: '+95', label: '+95 (MM)' },
    { code: '+98', label: '+98 (IR)' },
    { code: '+212', label: '+212 (MA)' },
    { code: '+213', label: '+213 (DZ)' },
    { code: '+216', label: '+216 (TN)' },
    { code: '+218', label: '+218 (LY)' },
    { code: '+220', label: '+220 (GM)' },
    { code: '+221', label: '+221 (SN)' },
    { code: '+234', label: '+234 (NG)' },
    { code: '+254', label: '+254 (KE)' },
    { code: '+255', label: '+255 (TZ)' },
    { code: '+256', label: '+256 (UG)' },
    { code: '+260', label: '+260 (ZM)' },
    { code: '+263', label: '+263 (ZW)' },
    { code: '+351', label: '+351 (PT)' },
    { code: '+353', label: '+353 (IE)' },
    { code: '+355', label: '+355 (AL)' },
    { code: '+358', label: '+358 (FI)' },
    { code: '+359', label: '+359 (BG)' },
    { code: '+370', label: '+370 (LT)' },
    { code: '+371', label: '+371 (LV)' },
    { code: '+372', label: '+372 (EE)' },
    { code: '+380', label: '+380 (UA)' },
    { code: '+381', label: '+381 (RS)' },
    { code: '+385', label: '+385 (HR)' },
    { code: '+386', label: '+386 (SI)' },
    { code: '+387', label: '+387 (BA)' },
    { code: '+420', label: '+420 (CZ)' },
    { code: '+421', label: '+421 (SK)' },
    { code: '+501', label: '+501 (BZ)' },
    { code: '+502', label: '+502 (GT)' },
    { code: '+503', label: '+503 (SV)' },
    { code: '+504', label: '+504 (HN)' },
    { code: '+505', label: '+505 (NI)' },
    { code: '+506', label: '+506 (CR)' },
    { code: '+507', label: '+507 (PA)' },
    { code: '+509', label: '+509 (HT)' },
    { code: '+591', label: '+591 (BO)' },
    { code: '+593', label: '+593 (EC)' },
    { code: '+595', label: '+595 (PY)' },
    { code: '+598', label: '+598 (UY)' },
    { code: '+852', label: '+852 (HK)' },
    { code: '+853', label: '+853 (MO)' },
    { code: '+855', label: '+855 (KH)' },
    { code: '+856', label: '+856 (LA)' },
    { code: '+880', label: '+880 (BD)' },
    { code: '+886', label: '+886 (TW)' },
    { code: '+960', label: '+960 (MV)' },
    { code: '+961', label: '+961 (LB)' },
    { code: '+962', label: '+962 (JO)' },
    { code: '+963', label: '+963 (SY)' },
    { code: '+964', label: '+964 (IQ)' },
    { code: '+965', label: '+965 (KW)' },
    { code: '+966', label: '+966 (SA)' },
    { code: '+967', label: '+967 (YE)' },
    { code: '+968', label: '+968 (OM)' },
    { code: '+971', label: '+971 (AE)' },
    { code: '+972', label: '+972 (IL)' },
    { code: '+973', label: '+973 (BH)' },
    { code: '+974', label: '+974 (QA)' },
    { code: '+975', label: '+975 (BT)' },
    { code: '+976', label: '+976 (MN)' },
    { code: '+977', label: '+977 (NP)' },
    { code: '+992', label: '+992 (TJ)' },
    { code: '+993', label: '+993 (TM)' },
    { code: '+994', label: '+994 (AZ)' },
    { code: '+995', label: '+995 (GE)' },
    { code: '+996', label: '+996 (KG)' },
    { code: '+998', label: '+998 (UZ)' }
];

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [mounted, setMounted] = useState(false);
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
    const [countryCode, setCountryCode] = useState('+880');

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
        setMounted(true);
    }, []);

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
                whatsapp: `${countryCode}${whatsapp}`,
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

    if (!mounted || !isOpen) return null;

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
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <select 
                                            className="text-input-clean"
                                            style={{ width: '120px', padding: '12px 10px', appearance: 'auto', cursor: 'pointer' }}
                                            value={countryCode} 
                                            onChange={(e) => setCountryCode(e.target.value)}
                                        >
                                            {ALL_COUNTRY_CODES.map((country) => (
                                                <option key={country.code} value={country.code}>
                                                    {country.label}
                                                </option>
                                            ))}
                                        </select>
                                        <input 
                                            type="tel" 
                                            className="text-input-clean" 
                                            required 
                                            value={whatsapp} 
                                            onChange={(e) => setWhatsapp(e.target.value)} 
                                            placeholder="1234567890" 
                                            style={{ flex: 1 }}
                                        />
                                    </div>
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
