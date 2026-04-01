'use client';
import { useState } from 'react';
import styles from './SendMessageModal.module.css';

interface Props {
    schedule: {
        _id: string;
        name: string;
        email: string;
        customer?: { _id: string };
    };
    onClose: () => void;
    onSent?: () => void;
}

export default function SendMessageModal({ schedule, onClose, onSent }: Props) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

    const [subject, setSubject]     = useState('');
    const [message, setMessage]     = useState('');
    const [sending, setSending]     = useState(false);
    const [error, setError]         = useState('');
    const [success, setSuccess]     = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) { setError('Message is required.'); return; }

        setError('');
        setSending(true);
        try {
            const res = await fetch(`${API_URL}/api/messages/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    scheduleId: schedule._id,
                    userId:     schedule.customer?._id || null,
                    userName:   schedule.name,
                    userEmail:  schedule.email,
                    subject:    subject.trim(),
                    message:    message.trim(),
                    attachments: []
                })
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
                onSent?.();
            } else {
                setError(data.message || 'Failed to send message.');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.modal}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h2 className={styles.title}>Send Message</h2>
                        <p className={styles.subtitle}>Direct message to this client</p>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
                </div>

                {success ? (
                    <div className={styles.successState}>
                        <div className={styles.successIcon}>✓</div>
                        <h3>Message Sent!</h3>
                        <p>Your message has been delivered to <strong>{schedule.name}</strong> at <strong>{schedule.email}</strong>.</p>
                        <button className={styles.btnPrimary} onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <form onSubmit={handleSend} className={styles.form}>
                        {/* Recipient — read-only */}
                        <div className={styles.field}>
                            <label className={styles.label}>To</label>
                            <div className={styles.recipientBadge}>
                                <div className={styles.recipientAvatar}>{schedule.name.charAt(0).toUpperCase()}</div>
                                <div>
                                    <p className={styles.recipientName}>{schedule.name}</p>
                                    <p className={styles.recipientEmail}>{schedule.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Subject */}
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="msg-subject">Subject <span className={styles.optional}>(optional)</span></label>
                            <input
                                id="msg-subject"
                                type="text"
                                className={styles.input}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="e.g. Regarding your consultation…"
                                maxLength={200}
                            />
                        </div>

                        {/* Message */}
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="msg-body">Message <span className={styles.required}>*</span></label>
                            <textarea
                                id="msg-body"
                                className={styles.textarea}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message here…"
                                rows={6}
                                required
                            />
                            <span className={styles.charCount}>{message.length} / 2000</span>
                        </div>

                        {error && <div className={styles.error}>{error}</div>}

                        {/* Actions */}
                        <div className={styles.actions}>
                            <button type="button" className={styles.btnCancel} onClick={onClose} disabled={sending}>
                                Cancel
                            </button>
                            <button type="submit" className={styles.btnPrimary} disabled={sending || !message.trim()}>
                                {sending ? (
                                    <><span className={styles.spinner} /> Sending…</>
                                ) : (
                                    <><span>✉</span> Send Message</>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
