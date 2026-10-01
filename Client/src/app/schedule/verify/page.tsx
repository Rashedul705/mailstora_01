'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './verify.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

function VerifyContent() {
    const router = useRouter();
    const params = useSearchParams();
    const bookingId = params.get('bookingId') || '';
    const email = params.get('email') || '';
    const date = params.get('date') || '';
    const time = params.get('time') || '';
    const method = params.get('method') || '';

    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendCountdown, setResendCountdown] = useState(300); // 5 min
    const [resending, setResending] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (resendCountdown <= 0) return;
        const t = setInterval(() => setResendCountdown(c => c - 1), 1000);
        return () => clearInterval(t);
    }, [resendCountdown]);

    const handleDigitChange = (idx: number, val: string) => {
        if (!/^\d*$/.test(val)) return;
        const newDigits = [...digits];
        newDigits[idx] = val.slice(-1);
        setDigits(newDigits);
        setError('');
        if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
        if (newDigits.every(d => d !== '') && newDigits.join('').length === 6) {
            submitOtp(newDigits.join(''));
        }
    };

    const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length === 6) {
            setDigits(pasted.split(''));
            setTimeout(() => submitOtp(pasted), 100);
        }
    };

    const submitOtp = async (otp: string) => {
        if (loading) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE}/api/bookings/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId, otp }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.expired) return router.push('/schedule?expired=1');
                if (data.cancelled) return router.push('/schedule?cancelled=1');
                setError(data.message || 'Invalid code.');
                setDigits(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            } else {
                router.push(`/schedule/confirmed?bookingId=${bookingId}&date=${date}&time=${encodeURIComponent(time)}&method=${method}`);
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = () => {
        const otp = digits.join('');
        if (otp.length !== 6) return setError('Please enter all 6 digits.');
        submitOtp(otp);
    };

    const handleResend = async () => {
        setResending(true);
        setError('');
        // Re-initiate will be handled by navigating back, or we expose a resend endpoint
        // For now, show a message to go back
        setError('Please go back and submit the form again to receive a new code.');
        setResending(false);
    };

    const formatCountdown = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    const methodLabel: Record<string, string> = { whatsapp: 'WhatsApp', zoom: 'Zoom', google_meet: 'Google Meet' };

    return (
        <div className="verify-page">
            <div className="verify-card">
                <div className="verify-icon">📧</div>
                <h1 className="verify-title">Check Your Email</h1>
                <p className="verify-subtitle">
                    We sent a 6-digit verification code to <strong>{email || 'your email'}</strong>.<br />
                    Enter the code below to confirm your booking.
                </p>

                {/* Booking Summary */}
                <div className="verify-summary">
                    <div className="vs-item">📅 <strong>{date}</strong></div>
                    <div className="vs-item">🕐 <strong>{time}</strong></div>
                    <div className="vs-item">💻 <strong>{methodLabel[method] || method}</strong></div>
                    <div className="vs-item">⏱ <strong>30 minutes</strong></div>
                </div>

                {/* OTP Inputs */}
                <div className="otp-row" onPaste={handlePaste}>
                    {digits.map((d, i) => (
                        <input
                            key={i}
                            ref={el => { inputRefs.current[i] = el; }}
                            type="tel"
                            inputMode="numeric"
                            maxLength={1}
                            value={d}
                            className={`otp-input ${error ? 'error' : ''}`}
                            onChange={e => handleDigitChange(i, e.target.value)}
                            onKeyDown={e => handleKeyDown(i, e)}
                            autoFocus={i === 0}
                        />
                    ))}
                </div>

                {error && <div className="verify-error">⚠ {error}</div>}

                {resendCountdown > 0 && (
                    <p className="verify-expiry">Code expires in <span className="expiry-timer">{formatCountdown(resendCountdown)}</span></p>
                )}

                <button
                    className="verify-btn"
                    onClick={handleVerify}
                    disabled={loading || digits.join('').length !== 6}
                >
                    {loading ? <span className="vbtn-spinner" /> : 'Verify & Confirm Booking'}
                </button>

                <div className="verify-resend">
                    {resendCountdown > 0
                        ? <span className="resend-inactive">Resend code in {formatCountdown(resendCountdown)}</span>
                        : <button className="resend-btn" onClick={handleResend} disabled={resending}>
                            {resending ? 'Sending…' : 'Resend Code'}
                          </button>
                    }
                </div>

                <Link href="/schedule" className="verify-back">← Back to Booking</Link>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>Loading…</div>}>
            <VerifyContent />
        </Suspense>
    );
}
