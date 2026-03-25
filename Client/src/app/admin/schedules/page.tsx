'use client';
import { useState, useEffect } from 'react';
import GenericCrudPage from '../components/GenericCrudPage';

const CountdownFormatter = ({ utcDateTime, status }: { utcDateTime: string, status: string }) => {
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
            // utcDateTime is saved natively as UTC timezone independent JS date
            const meetingTime = new Date(utcDateTime).getTime();
            const diffMs = meetingTime - now;

            if (diffMs <= 0) {
                const overMs = Math.abs(diffMs);
                if (overMs > 30 * 60 * 1000) {
                     setTimeLeft('Completed');
                     setColor('#22c55e');
                } else {
                     setTimeLeft('Ongoing');
                     setColor('#3b82f6'); 
                }
                return;
            }

            const diffMins = Math.floor(diffMs / 60000);
            
            if (diffMins < 5) {
                setColor('#ef4444'); 
            } else if (diffMins < 30) {
                setColor('#f97316'); 
            } else {
                setColor('#22c55e'); 
            }

            if (diffMins < 60) {
                setTimeLeft(`${diffMins} min left`);
            } else {
                const h = Math.floor(diffMins / 60);
                const m = diffMins % 60;
                setTimeLeft(`${h}h ${m}m left`);
            }
        };

        updateClock();
        const interval = setInterval(updateClock, 10000); // 10s checks instead of exact 60s
        return () => clearInterval(interval);
    }, [utcDateTime, status]);

    if (!utcDateTime) return <span>-</span>;
    return <span style={{ color, fontWeight: 'bold' }}>{timeLeft}</span>;
}

export default function SchedulesPage() {
    return <GenericCrudPage
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
            { key: 'timeLeft', label: 'Time Left', type: 'custom', readOnly: true, hideInTable: false, render: (row) => <CountdownFormatter utcDateTime={row.utcDateTime} status={row.status} /> }
        ]}
    />;
}
