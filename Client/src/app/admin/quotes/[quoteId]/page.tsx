'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function QuoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const quoteId = params.quoteId as string;
    
    const [quote, setQuote] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [status, setStatus] = useState('');

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/quotes`;

    useEffect(() => {
        fetchQuote();
    }, [quoteId]);

    const fetchQuote = async () => {
        try {
            const res = await fetch(`${API_URL}/${quoteId}`, { credentials: 'omit' });
            if (!res.ok) throw new Error('Quote not found');
            const data = await res.json();
            setQuote(data);
            setStatus(data.status);
        } catch (error) {
            console.error(error);
            router.push('/admin/quotes');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (newStatus: string) => {
        setActionLoading(true);
        try {
            const res = await fetch(`${API_URL}/${quoteId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setStatus(newStatus);
                setQuote({ ...quote, status: newStatus });
            }
        } catch (error) {
            alert('Failed to update status');
        } finally {
            setActionLoading(false);
        }
    };

    const handleSendReply = async () => {
        if (!replyText.trim()) return;
        setActionLoading(true);
        try {
            const res = await fetch(`${API_URL}/${quoteId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: replyText })
            });
            if (res.ok) {
                const data = await res.json();
                setQuote(data.quote);
                setStatus(data.quote.status);
                setReplyText('');
            } else {
                alert('Failed to send reply');
            }
        } catch (error) {
            alert('Error sending reply');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading quote details...</div>;
    if (!quote) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/admin/quotes" style={{ color: '#64748b', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    ← Back to Quotes
                </Link>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e4f0', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e4f0', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <h1 style={{ color: 'var(--primary-dark)', fontSize: '1.8rem', margin: '0 0 0.5rem 0' }}>Quote Request {quote.quoteId}</h1>
                        <p style={{ color: '#64748b', margin: 0 }}>Submitted: {formatDate(quote.submittedAt)}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Status:</label>
                        <select 
                            value={status} 
                            onChange={(e) => handleUpdateStatus(e.target.value)}
                            disabled={actionLoading}
                            style={{ 
                                padding: '0.5rem 1rem', 
                                borderRadius: '6px', 
                                border: '1px solid #cbd5e1',
                                background: '#f8f9fa',
                                fontWeight: 600
                            }}
                        >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="replied">Replied</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    {/* Client Info */}
                    <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
                        <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem' }}>Client Information</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div><span style={{ color: '#64748b', display: 'inline-block', width: '90px' }}>Name:</span> <strong style={{ color: '#1e293b' }}>{quote.client.name}</strong></div>
                            <div><span style={{ color: '#64748b', display: 'inline-block', width: '90px' }}>Email:</span> <a href={`mailto:${quote.client.email}`} style={{ color: 'var(--primary-orange)' }}>{quote.client.email}</a></div>
                            <div><span style={{ color: '#64748b', display: 'inline-block', width: '90px' }}>WhatsApp:</span> <a href={`https://wa.me/${quote.client.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" style={{ color: '#059669' }}>{quote.client.whatsapp}</a></div>
                            <div><span style={{ color: '#64748b', display: 'inline-block', width: '90px' }}>Company:</span> <span style={{ color: '#1e293b' }}>{quote.client.company || 'N/A'}</span></div>
                        </div>
                    </div>

                    {/* Service Info */}
                    <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
                        <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem' }}>Project Scope</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div><span style={{ color: '#64748b', display: 'inline-block', width: '110px' }}>Service:</span> <strong style={{ color: '#1e293b' }}>{quote.service}</strong></div>
                            <div>
                                <span style={{ color: '#64748b', display: 'inline-block', width: '110px' }}>Email Types:</span> 
                                <span style={{ color: '#1e293b' }}>{quote.emailTypes?.length ? quote.emailTypes.join(', ') : 'None'}</span>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', display: 'inline-block', width: '110px' }}>ESP Platform:</span> 
                                <span style={{ color: '#1e293b' }}>{quote.esp?.length ? quote.esp.join(', ') : 'None'}</span>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', display: 'inline-block', width: '110px' }}>Design Status:</span> 
                                <strong style={{ color: quote.designStatus === 'I have a design (PSD / Figma / Image)' ? '#059669' : '#d97706' }}>{quote.designStatus}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Project Description</h3>
                    <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                        {quote.projectDetails}
                    </div>
                </div>

                {quote.attachmentUrl && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Attachment</h3>
                        <a href={quote.attachmentUrl} target="_blank" rel="noreferrer" style={{ 
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
                            padding: '0.75rem 1.5rem', background: '#f1f5f9', color: '#3b82f6', 
                            borderRadius: '6px', textDecoration: 'none', fontWeight: 600, border: '1px solid #cbd5e1' 
                        }}>
                            📄 Download / View Attachment
                        </a>
                    </div>
                )}

                {/* Conversation & Reply System */}
                <div style={{ borderTop: '1px solid #e2e4f0', paddingTop: '2rem' }}>
                    <h2 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Conversation History</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                        {quote.conversation?.length === 0 ? (
                            <div style={{ color: '#64748b', fontStyle: 'italic' }}>No replies sent yet. Use the box below to email the client.</div>
                        ) : (
                            quote.conversation.map((msg: any, i: number) => (
                                <div key={i} style={{ 
                                    background: msg.from === 'admin' ? '#eff6ff' : '#f8f9fa',
                                    border: `1px solid ${msg.from === 'admin' ? '#bfdbfe' : '#e2e4f0'}`,
                                    padding: '1.5rem', borderRadius: '8px',
                                    marginLeft: msg.from === 'admin' ? '2rem' : '0',
                                    marginRight: msg.from === 'admin' ? '0' : '2rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <strong style={{ color: msg.from === 'admin' ? '#1d4ed8' : '#334155' }}>
                                            {msg.from === 'admin' ? 'MailStora Team' : quote.client.name}
                                        </strong>
                                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{formatDate(msg.sentAt)}</span>
                                    </div>
                                    <div style={{ color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{msg.message}</div>
                                </div>
                            ))
                        )}
                    </div>

                    <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e4f0' }}>
                        <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem' }}>Send a Reply</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>This message will be emailed directly to <strong>{quote.client.email}</strong>.</p>
                        
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your message here..."
                            disabled={actionLoading}
                            style={{
                                width: '100%', minHeight: '120px', padding: '1rem',
                                borderRadius: '8px', border: '1px solid #cbd5e1',
                                marginBottom: '1rem', fontFamily: 'inherit', resize: 'vertical'
                            }}
                        />
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button 
                                onClick={handleSendReply}
                                disabled={actionLoading || !replyText.trim()}
                                style={{
                                    background: 'linear-gradient(to right, var(--primary-orange), var(--primary-dark))',
                                    color: 'white', border: 'none', padding: '0.75rem 2rem',
                                    borderRadius: '6px', fontWeight: 700, cursor: actionLoading || !replyText.trim() ? 'not-allowed' : 'pointer',
                                    opacity: actionLoading || !replyText.trim() ? 0.7 : 1
                                }}
                            >
                                {actionLoading ? 'Sending...' : 'Send Reply'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
