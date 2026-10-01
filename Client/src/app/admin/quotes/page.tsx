'use client';

import { useState, useEffect } from 'react';
import './quotes-admin.css';

export default function QuotesAdmin() {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
    const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<any>(null);
    
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterService, setFilterService] = useState('All');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    
    const [replyText, setReplyText] = useState('');
    const [replying, setReplying] = useState(false);
    
    const [statusUpdating, setStatusUpdating] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/quotes`;

    const fetchQuotes = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL, { credentials: 'omit' });
            const data = await res.json();
            setQuotes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    // Fetch full quote detail when a quote is selected
    useEffect(() => {
        const fetchQuoteDetail = async () => {
            if (!selectedQuoteId) {
                setSelectedQuoteDetail(null);
                return;
            }
            try {
                const res = await fetch(`${API_URL}/${selectedQuoteId}`, { credentials: 'omit' });
                if (res.ok) {
                    const data = await res.json();
                    setSelectedQuoteDetail(data);
                    setNewStatus(data.status);
                }
            } catch (error) {
                console.error('Error fetching quote detail:', error);
            }
        };
        fetchQuoteDetail();
    }, [selectedQuoteId]);

    const handleUpdateStatus = async () => {
        if (!selectedQuoteId || !newStatus || newStatus === selectedQuoteDetail.status) return;
        setStatusUpdating(true);
        try {
            const res = await fetch(`${API_URL}/${selectedQuoteId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
                credentials: 'omit'
            });
            if (res.ok) {
                const updated = await res.json();
                setSelectedQuoteDetail(updated);
                setQuotes(quotes.map(q => q._id === updated._id ? updated : q));
            } else {
                alert('Failed to update status');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setStatusUpdating(false);
        }
    };

    const handleSendReply = async () => {
        if (!selectedQuoteId || !replyText.trim()) return;
        setReplying(true);
        try {
            const res = await fetch(`${API_URL}/${selectedQuoteId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: replyText }),
                credentials: 'omit'
            });
            if (res.ok) {
                const data = await res.json();
                setSelectedQuoteDetail(data.quote);
                setQuotes(quotes.map(q => q._id === data.quote._id ? data.quote : q));
                setReplyText('');
            } else {
                alert('Failed to send reply');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setReplying(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    // Calculate Stats
    const totalQuotes = quotes.length;
    const newQuotes = quotes.filter(q => q.status === 'new').length;
    const sentQuotes = quotes.filter(q => q.status === 'quote sent').length;
    const closedQuotes = quotes.filter(q => q.status === 'closed').length;

    // Filtering
    const filteredQuotes = quotes.filter(q => {
        if (filterStatus !== 'All' && q.status !== filterStatus.toLowerCase()) return false;
        if (filterService !== 'All' && !(q.services || []).includes(filterService)) return false;
        
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchName = q.client?.name?.toLowerCase().includes(query);
            const matchId = q.quoteId?.toLowerCase().includes(query);
            if (!matchName && !matchId) return false;
        }

        if (dateFrom) {
            if (new Date(q.submittedAt) < new Date(dateFrom)) return false;
        }
        if (dateTo) {
            const to = new Date(dateTo);
            to.setHours(23, 59, 59, 999);
            if (new Date(q.submittedAt) > to) return false;
        }

        return true;
    });

    const uniqueServices = Array.from(new Set(quotes.flatMap(q => q.services || []).filter(Boolean)));

    return (
        <div className="quotes-admin-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ color: 'var(--primary-dark)', fontSize: '1.8rem', margin: 0 }}>Quote Management</h1>
                <button onClick={fetchQuotes} style={{ border: '1px solid #cbd5e1', background: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
                    ↻ Refresh
                </button>
            </div>

            {/* Stats Row */}
            <div className="stats-row">
                <div className="stat-card stat-new">
                    <h3>{newQuotes}</h3>
                    <span>New</span>
                </div>
                <div className="stat-card stat-replied">
                    <h3>{sentQuotes}</h3>
                    <span>Quote Sent</span>
                </div>
                <div className="stat-card stat-closed">
                    <h3>{closedQuotes}</h3>
                    <span>Closed</span>
                </div>
                <div className="stat-card stat-total">
                    <h3>{totalQuotes}</h3>
                    <span>Total Quotes</span>
                </div>
            </div>

            {/* Filters Row */}
            <div className="filters-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <input 
                    type="text" 
                    placeholder="Search name or ID..." 
                    className="admin-filter-select"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <select className="admin-filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Quote Sent">Quote Sent</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                    <option value="Closed">Closed</option>
                </select>
                <select className="admin-filter-select" value={filterService} onChange={e => setFilterService(e.target.value)}>
                    <option value="All">All Services</option>
                    {uniqueServices.map((srv: any) => (
                        <option key={srv} value={srv}>{srv}</option>
                    ))}
                </select>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.25rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>From:</span>
                    <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ border: 'none', outline: 'none', color: '#334155', fontSize: '0.9rem' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.25rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>To:</span>
                    <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ border: 'none', outline: 'none', color: '#334155', fontSize: '0.9rem' }} />
                </div>
            </div>

            <div className="split-layout">
                {/* LEFT PANEL: Quote List */}
                <div className="quotes-list-panel">
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading quotes...</div>
                    ) : filteredQuotes.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No quotes found.</div>
                    ) : (
                        filteredQuotes.map(quote => (
                            <div 
                                key={quote._id} 
                                className={`quote-list-item ${selectedQuoteId === quote._id ? 'active' : ''}`}
                                onClick={() => setSelectedQuoteId(quote._id)}
                            >
                                <div className="quote-list-header">
                                    <span className="quote-id">{quote.quoteId}</span>
                                    <span className="quote-date">{formatDate(quote.submittedAt)}</span>
                                </div>
                                <div className="quote-client-info">
                                    <strong>{quote.client?.name || 'Unknown Client'}</strong> • {quote.client?.email}
                                </div>
                                <div className="quote-badges">
                                    <span className={`badge badge-status-${quote.status}`}>{quote.status}</span>
                                    {(quote.services || []).map((srv: string) => (
                                        <span key={srv} className="badge badge-service" style={{ marginRight: '4px' }}>{srv}</span>
                                    ))}
                                    {quote.attachmentUrl && (
                                        <span className="badge badge-attachment">📎 Attachment</span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* RIGHT PANEL: Quote Detail */}
                <div className="quote-detail-panel">
                    {!selectedQuoteDetail ? (
                        <div className="no-selection">
                            Select a quote from the list to view details
                        </div>
                    ) : (
                        <>
                            <div className="detail-header-bar">
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary-dark)' }}>{selectedQuoteDetail.quoteId}</h2>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Submitted: {formatDate(selectedQuoteDetail.submittedAt)}</span>
                                </div>
                                <div className="status-manager">
                                    <select 
                                        className="admin-filter-select" 
                                        value={newStatus} 
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        style={{ width: 'auto' }}
                                    >
                                        <option value="new">New</option>
                                        <option value="in review">In Review</option>
                                        <option value="quote sent">Quote Sent</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="declined">Declined</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    <button 
                                        className="btn-save-status"
                                        onClick={handleUpdateStatus}
                                        disabled={statusUpdating || newStatus === selectedQuoteDetail.status}
                                    >
                                        {statusUpdating ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>

                            <div className="detail-content">
                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#1e293b' }}>Client Information</h3>
                                <div className="info-grid">
                                    <div className="info-box">
                                        <h4>Full Name</h4>
                                        <p>{selectedQuoteDetail.client?.name}</p>
                                    </div>
                                    <div className="info-box">
                                        <h4>Email</h4>
                                        <p><a href={`mailto:${selectedQuoteDetail.client?.email}`}>{selectedQuoteDetail.client?.email}</a></p>
                                    </div>
                                    <div className="info-box">
                                        <h4>WhatsApp</h4>
                                        <p><a href={`https://wa.me/${selectedQuoteDetail.client?.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">{selectedQuoteDetail.client?.whatsapp}</a></p>
                                    </div>
                                    <div className="info-box">
                                        <h4>Company</h4>
                                        <p>{selectedQuoteDetail.client?.company || 'N/A'}</p>
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#1e293b' }}>Requested Services</h3>
                                {(selectedQuoteDetail.services || []).map((srv: string) => {
                                    const details = selectedQuoteDetail.serviceDetails?.[srv];
                                    if (!details) return (
                                        <div key={srv} style={{ marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                                            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-dark)' }}>{srv}</h4>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>No details provided.</p>
                                        </div>
                                    );
                                    
                                    return (
                                        <div key={srv} style={{ marginBottom: '1.5rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary-dark)', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem' }}>{srv}</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                {Object.entries(details).map(([k, v]) => {
                                                    if (k === 'projectDetails' || k === 'overallProjectDetails') return null;
                                                    let displayV = v;
                                                    if (Array.isArray(v)) displayV = v.join(', ');
                                                    else if (typeof v === 'object' && v !== null) displayV = Object.entries(v).map(([sk, sv]) => `${sk}: ${sv}`).join(', ');
                                                    return (
                                                        <div key={k}>
                                                            <strong style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1').trim()}</strong>
                                                            <div style={{ fontSize: '0.95rem', color: '#0f172a', marginTop: '0.25rem' }}>{String(displayV || 'N/A')}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {details.projectDetails && (
                                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                                                    <strong style={{ fontSize: '0.85rem', color: '#64748b' }}>Specific Project Details</strong>
                                                    <div style={{ fontSize: '0.95rem', color: '#0f172a', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{details.projectDetails}</div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#1e293b' }}>Overall Project Description</h3>
                                <div className="description-box">
                                    {selectedQuoteDetail.overallProjectDetails || 'No overall details provided.'}
                                </div>

                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#1e293b' }}>Attachment</h3>
                                {selectedQuoteDetail.attachmentUrl ? (
                                    <div className="attachment-card">
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#92400e' }}>Design File Provided</div>
                                            <div style={{ fontSize: '0.85rem', color: '#b45309' }}>URL: {selectedQuoteDetail.attachmentUrl.split('/').pop()}</div>
                                        </div>
                                        <a href={selectedQuoteDetail.attachmentUrl} target="_blank" rel="noopener noreferrer" className="btn-download">
                                            Open File ↗
                                        </a>
                                    </div>
                                ) : (
                                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', color: '#64748b', marginBottom: '2rem', fontStyle: 'italic' }}>
                                        No attachment uploaded.
                                    </div>
                                )}

                                <div className="conversation-section">
                                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#1e293b' }}>Conversation History ({selectedQuoteDetail.conversation?.length || 0})</h3>
                                    
                                    <div className="chat-history">
                                        {(!selectedQuoteDetail.conversation || selectedQuoteDetail.conversation.length === 0) ? (
                                            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontStyle: 'italic' }}>
                                                No messages yet.
                                            </div>
                                        ) : (
                                            selectedQuoteDetail.conversation.map((msg: any, idx: number) => (
                                                <div key={idx} className={`chat-bubble ${msg.from === 'admin' ? 'chat-admin' : 'chat-client'}`}>
                                                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</div>
                                                    <div className="chat-meta">
                                                        <span>{msg.from === 'admin' ? 'MailStora Support' : selectedQuoteDetail.client?.name}</span>
                                                        <span>{formatDate(msg.sentAt)}</span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="reply-box">
                                        <textarea 
                                            className="reply-textarea"
                                            placeholder="Write your reply here..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                        ></textarea>
                                        <div className="reply-footer">
                                            <span className="reply-hint">Sent via email · Saved to conversation history</span>
                                            <button 
                                                className="btn-send-reply"
                                                onClick={handleSendReply}
                                                disabled={replying || !replyText.trim()}
                                            >
                                                {replying ? 'Sending...' : 'Send Reply ➔'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
