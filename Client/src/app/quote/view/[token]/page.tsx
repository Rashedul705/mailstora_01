'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import '../quote-view.css';

interface Message {
    _id: string;
    sender_type: 'admin' | 'client';
    message: string;
    createdAt: string;
}

interface Quote {
    _id: string;
    quote_number: number;
    name: string;
    email: string;
    status: string;
    service_type: string;
    email_types: string[];
    template_quantity: string;
    esp: string;
    esp_custom: string;
    design_status: string;
    design_brief: string;
    attachments: string[];
    project_description: string;
    messages: Message[];
}

export default function QuoteViewPage() {
    const params = useParams();
    const token = params.token as string;
    
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

    const fetchQuote = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/quotes/token/${token}`);
            if (!res.ok) throw new Error('Quote not found or link expired');
            const data = await res.json();
            setQuote(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchQuote();
        
        // Polling for new messages every 30 seconds
        const interval = setInterval(fetchQuote, 30000);
        return () => clearInterval(interval);
    }, [token]);

    useEffect(() => {
        scrollToBottom();
    }, [quote?.messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !quote || sending) return;

        setSending(true);
        try {
            const res = await fetch(`${API_BASE}/api/quotes/${quote._id}/reply/client`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessage })
            });

            if (!res.ok) throw new Error('Failed to send message');
            
            const data = await res.json();
            setQuote(prev => prev ? {
                ...prev,
                messages: [...prev.messages, data.quoteMessage]
            } : null);
            setNewMessage('');
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSending(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const getStatusClass = (status: string) => {
        return `status-badge status-${status.toLowerCase()}`;
    };

    if (loading) return (
        <>
            <Navbar />
            <div className="loading-container">
                <div className="upload-icon" style={{ fontSize: '40px', animation: 'bounce 1s infinite' }}>⏳</div>
                <p>Loading your project details...</p>
            </div>
            <Footer />
        </>
    );

    if (error || !quote) return (
        <>
            <Navbar />
            <div className="error-container">
                <h2>Opps! Something went wrong</h2>
                <p>{error || 'Could not find the requested quote.'}</p>
                <br/>
                <a href="/" className="btn btn-primary">Back to Homepage</a>
            </div>
            <Footer />
        </>
    );

    const espDisplay = quote.esp === 'Custom / Other' ? (quote.esp_custom || 'Custom') : (quote.esp || 'N/A');

    return (
        <main style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', paddingBottom: '60px' }}>
            <Navbar />
            
            <div className="quote-view-container">
                <div className="quote-view-header">
                    <div className="quote-title-section">
                        <span className="quote-id-badge">Quote Request #{quote.quote_number}</span>
                        <h1>{quote.service_type} Project</h1>
                        <p style={{ color: '#64748B' }}>Submitted on {new Date(quote._id ? parseInt(quote._id.substring(0, 8), 16) * 1000 : 0).toLocaleDateString()}</p>
                    </div>
                    <div className={getStatusClass(quote.status)}>
                        {quote.status.toUpperCase()}
                    </div>
                </div>

                <div className="quote-view-grid">
                    {/* Main Content: Chat */}
                    <div className="chat-section">
                        <div className="chat-header">
                            <h2>Conversation History</h2>
                        </div>
                        <div className="chat-messages">
                            {quote.messages.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    <p>No messages yet. Our team will get back to you soon!</p>
                                </div>
                            ) : (
                                quote.messages.map((msg) => (
                                    <div key={msg._id} className={`message-bubble ${msg.sender_type === 'admin' ? 'message-admin' : 'message-client'}`}>
                                        <span className="message-sender">{msg.sender_type === 'admin' ? 'MailStora Team' : 'You'}</span>
                                        <div style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</div>
                                        <span className="message-time">{formatDate(msg.createdAt)}</span>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <form className="chat-input-area" onSubmit={handleSend}>
                            <textarea
                                className="chat-textarea"
                                placeholder="Type your reply here..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                disabled={sending}
                            />
                            <button type="submit" className="chat-send-btn" disabled={sending || !newMessage.trim()}>
                                {sending ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Sidebar: Details */}
                    <div className="details-sidebar">
                        <div className="sidebar-card">
                            <h3>Project Summary</h3>
                            <div className="detail-item">
                                <span className="detail-label">Service Needed</span>
                                <span className="detail-value">{quote.service_type}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Quantity</span>
                                <span className="detail-value">{quote.template_quantity}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Email Platform (ESP)</span>
                                <span className="detail-value">{espDisplay}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Email Types</span>
                                <div className="tag-list">
                                    {quote.email_types.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                            </div>
                        </div>

                        <div className="sidebar-card">
                            <h3>Design & Brief</h3>
                            <div className="detail-item">
                                <span className="detail-label">Design Status</span>
                                <span className="detail-value">{quote.design_status === 'have_design' ? 'I have a design' : 'Need design help'}</span>
                            </div>
                            {quote.design_brief && (
                                <div className="detail-item">
                                    <span className="detail-label">Brief</span>
                                    <p style={{ fontSize: '13px', margin: '4px 0 0 0' }}>{quote.design_brief}</p>
                                </div>
                            )}
                        </div>

                        {quote.attachments.length > 0 && (
                            <div className="sidebar-card">
                                <h3>Attachments</h3>
                                {quote.attachments.map((url, i) => (
                                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="attachment-item">
                                        📁 File {i + 1}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
