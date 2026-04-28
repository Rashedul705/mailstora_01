'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './confirmed.css';

const methodLabel: Record<string, string> = {
    whatsapp: 'WhatsApp',
    zoom: 'Zoom',
    google_meet: 'Google Meet',
};

function ConfirmedContent() {
    const params = useSearchParams();
    const bookingId = params.get('bookingId') || '';
    const date = params.get('date') || '';
    const time = params.get('time') || '';
    const method = params.get('method') || '';

    return (
        <div className="confirmed-page">
            <div className="confirmed-card">
                <div className="confirmed-icon">🎉</div>
                <h1 className="confirmed-title">Booking Confirmed!</h1>
                <p className="confirmed-subtitle">
                    Your consultation has been booked successfully. Check your email for a confirmation with all the details.
                </p>

                <div className="confirmed-details">
                    <div className="cd-row">
                        <span className="cd-label">Booking ID</span>
                        <span className="cd-value mono">{bookingId}</span>
                    </div>
                    <div className="cd-row">
                        <span className="cd-label">📅 Date</span>
                        <span className="cd-value">{date}</span>
                    </div>
                    <div className="cd-row">
                        <span className="cd-label">🕐 Time</span>
                        <span className="cd-value">{time}</span>
                    </div>
                    <div className="cd-row">
                        <span className="cd-label">💻 Method</span>
                        <span className="cd-value">{methodLabel[method] || method}</span>
                    </div>
                    <div className="cd-row">
                        <span className="cd-label">⏱ Duration</span>
                        <span className="cd-value">30 minutes</span>
                    </div>
                </div>

                <div className="confirmed-reminders">
                    <div className="reminder-item">🔔 You'll receive a reminder 30 minutes before</div>
                    <div className="reminder-item">⚡ Another reminder 5 minutes before the session</div>
                </div>

                <div className="confirmed-actions">
                    <Link href="/" className="home-btn">← Back to Home</Link>
                    <a
                        href="https://wa.me/8801744350705?text=Hi, I just booked a consultation!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wa-btn"
                    >
                        💬 Chat on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function ConfirmedPage() {
    return (
        <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>Loading…</div>}>
            <ConfirmedContent />
        </Suspense>
    );
}
