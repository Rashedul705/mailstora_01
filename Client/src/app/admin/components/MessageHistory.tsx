'use client';
import { useState, useEffect } from 'react';
import styles from './MessageHistory.module.css';

interface Msg {
    _id: string;
    sender: 'admin' | 'user';
    userName: string;
    subject: string;
    message: string;
    attachments: string[];
    createdAt: string;
}

interface Props {
    scheduleId: string;
}

export default function MessageHistory({ scheduleId }: Props) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    const [messages, setMessages] = useState<Msg[]>([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        if (!scheduleId) return;
        setLoading(true);
        fetch(`${API_URL}/api/messages/schedule/${scheduleId}`, { credentials: 'include' })
            .then(r => r.json())
            .then(data => setMessages(Array.isArray(data) ? data : []))
            .catch(() => setMessages([]))
            .finally(() => setLoading(false));
    }, [scheduleId]);

    if (loading) return <p className={styles.loading}>Loading message history…</p>;
    if (!messages.length) return <p className={styles.empty}>No messages sent yet.</p>;

    return (
        <div className={styles.timeline}>
            {messages.map(msg => (
                <div key={msg._id} className={`${styles.bubble} ${msg.sender === 'admin' ? styles.adminBubble : styles.userBubble}`}>
                    <div className={styles.bubbleHeader}>
                        <span className={styles.senderLabel}>
                            {msg.sender === 'admin' ? '🛡 MailStora (Admin)' : `👤 ${msg.userName || 'Client'}`}
                        </span>
                        <span className={styles.timestamp}>
                            {new Date(msg.createdAt).toLocaleString()}
                        </span>
                    </div>
                    {msg.subject && <p className={styles.subject}>Subject: <strong>{msg.subject}</strong></p>}
                    <p className={styles.text}>{msg.message}</p>
                    {msg.attachments?.length > 0 && (
                        <div className={styles.attachments}>
                            {msg.attachments.map((url, i) => (
                                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={styles.attachmentLink}>
                                    📎 Attachment {i + 1}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
