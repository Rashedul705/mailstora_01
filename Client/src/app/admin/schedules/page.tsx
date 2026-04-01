'use client';
import { useState, useEffect } from 'react';
import GenericCrudPage from '../components/GenericCrudPage';
import SendMessageModal from '../components/SendMessageModal';
import MessageHistory from '../components/MessageHistory';

/* ── Countdown column cell ── */
const CountdownFormatter = ({ utcDateTime, status }: { utcDateTime: string; status: string }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [color, setColor] = useState('#888');

    useEffect(() => {
        if (!utcDateTime) return;
        if (status === 'Completed' || status === 'Cancelled') {
            setTimeLeft(status);
            setColor(status === 'Completed' ? '#22c55e' : '#888');
            return;
        }

        const updateClock = () => {
            const now = new Date().getTime();
            const meetingTime = new Date(utcDateTime).getTime();
            const diffMs = meetingTime - now;

            if (diffMs <= 0) {
                const overMs = Math.abs(diffMs);
                if (overMs > 30 * 60 * 1000) { setTimeLeft('Completed'); setColor('#22c55e'); }
                else { setTimeLeft('Ongoing'); setColor('#3b82f6'); }
                return;
            }

            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 5) setColor('#ef4444');
            else if (diffMins < 30) setColor('#f97316');
            else setColor('#22c55e');

            if (diffMins < 60) setTimeLeft(`${diffMins} min left`);
            else { const h = Math.floor(diffMins / 60); const m = diffMins % 60; setTimeLeft(`${h}h ${m}m left`); }
        };

        updateClock();
        const interval = setInterval(updateClock, 10000);
        return () => clearInterval(interval);
    }, [utcDateTime, status]);

    if (!utcDateTime) return <span>-</span>;
    return <span style={{ color, fontWeight: 'bold' }}>{timeLeft}</span>;
};

/* ── Message History Panel (centered modal) ── */
const MessagePanel = ({ schedule, onClose }: { schedule: any; onClose: () => void }) => (
    <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.50)',
        backdropFilter: 'blur(2px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1100, padding: '16px'
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div style={{
            background: '#fff', borderRadius: '16px', width: '100%',
            maxWidth: '680px', maxHeight: '80vh', overflowY: 'auto', padding: '28px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            animation: 'fadeSlide 0.22s ease'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1a1a2e' }}>
                        Message History
                    </h3>
                    <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#888' }}>
                        {schedule.name} &lt;{schedule.email}&gt;
                    </p>
                </div>
                <button onClick={onClose} style={{
                    background: '#f5f5f5', border: 'none', borderRadius: '50%',
                    width: 34, height: 34, cursor: 'pointer', fontSize: 14, color: '#555',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>✕</button>
            </div>
            <MessageHistory scheduleId={schedule._id} />
        </div>
        <style>{`@keyframes fadeSlide { from { transform: translateY(20px); opacity:0 } to { transform: translateY(0); opacity:1 } }`}</style>
    </div>
);

/* ── Main Page ── */
export default function SchedulesPage() {
    const [messageTarget, setMessageTarget]   = useState<any>(null);
    const [historyTarget, setHistoryTarget]   = useState<any>(null);
    const [refreshKey, setRefreshKey]         = useState(0);

    const handleMessageSent = () => {
        setRefreshKey(k => k + 1);
    };

    return (
        <>
            <GenericCrudPage
                key={refreshKey}
                title="Schedule Requests"
                endpoint="/api/schedules"
                columns={[
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'email', label: 'Email', type: 'email', hideInTable: true },
                    { key: 'whatsapp', label: 'WhatsApp', type: 'text', hideInTable: true },
                    { key: 'meetingMethod', label: 'Method', type: 'select', options: ['WhatsApp Call', 'Zoom', 'Google Meet'] },
                    { key: 'date', label: 'Date', type: 'date' },
                    { key: 'time', label: 'Time', type: 'text' },
                    { key: 'meetingLink', label: 'Meeting Link', type: 'text', hideInTable: true },
                    { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Confirmed', 'Ongoing', 'Completed', 'Cancelled'] },
                    {
                        key: 'timeLeft', label: 'Time Left', type: 'custom', readOnly: true,
                        render: (row) => <CountdownFormatter utcDateTime={row.utcDateTime} status={row.status} />
                    },
                    {
                        key: '_msgBtn', label: 'Message', type: 'custom', readOnly: true, hideInTable: false,
                        render: (row) => (
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => setMessageTarget(row)}
                                    style={{
                                        padding: '4px 10px', fontSize: '12px', cursor: 'pointer',
                                        background: '#2d287b', color: '#fff', border: 'none', borderRadius: '5px',
                                        display: 'flex', alignItems: 'center', gap: '4px'
                                    }}>
                                    ✉ Send
                                </button>
                                <button
                                    onClick={() => setHistoryTarget(row)}
                                    style={{
                                        padding: '4px 10px', fontSize: '12px', cursor: 'pointer',
                                        background: '#f0f0ff', color: '#2d287b', border: '1px solid #c7d2fe', borderRadius: '5px'
                                    }}>
                                    📋 History
                                </button>
                            </div>
                        )
                    }
                ]}
            />

            {/* Send Message Modal */}
            {messageTarget && (
                <SendMessageModal
                    schedule={messageTarget}
                    onClose={() => setMessageTarget(null)}
                    onSent={handleMessageSent}
                />
            )}

            {/* Message History Panel */}
            {historyTarget && (
                <MessagePanel
                    schedule={historyTarget}
                    onClose={() => setHistoryTarget(null)}
                />
            )}
        </>
    );
}
