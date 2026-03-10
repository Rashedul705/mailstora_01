'use client';

import { useState, useEffect } from 'react';
import './quotes-admin.css';

export default function QuotesAdmin() {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Modal state
    const [selectedQuote, setSelectedQuote] = useState<any>(null);
    const [editingStatus, setEditingStatus] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [replyText, setReplyText] = useState('');

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/quotes`;

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

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this quote request?')) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE', credentials: 'omit' });
            fetchQuotes();
            if (selectedQuote?._id === id) setSelectedQuote(null);
        } catch (error) {
            console.error('Error deleting quote:', error);
            alert('Failed to delete quote.');
        }
    };

    const handleUpdateStatus = async () => {
        if (!selectedQuote) return;
        setActionLoading(true);
        try {
            await fetch(`${API_URL}/${selectedQuote._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: editingStatus })
            });
            await fetchQuotes();
            setSelectedQuote({ ...selectedQuote, status: editingStatus });
        } catch (error) {
            alert('Failed to update status');
        } finally {
            setActionLoading(false);
        }
    };

    const handleConvertToOrder = async () => {
        if (!confirm('Are you sure you want to convert this quote to an order?')) return;
        setActionLoading(true);
        try {
            const res = await fetch(`${API_URL}/${selectedQuote._id}/convert`, {
                method: 'POST',
                credentials: 'omit'
            });
            const data = await res.json();
            if (res.ok) {
                alert('Converted successfully! Order ID: ' + data.order._id);
                fetchQuotes();
                setSelectedQuote({ ...selectedQuote, status: 'converted' });
                setEditingStatus('converted');
            } else {
                alert(data.message || 'Failed to convert');
            }
        } catch (error) {
            console.error('Convert Error:', error);
            alert('Failed to convert quote.');
        } finally {
            setActionLoading(false);
        }
    };

    const openQuote = async (quote: any) => {
        setSelectedQuote(quote);
        setEditingStatus(quote.status);
        setReplyText('');

        try {
            const res = await fetch(`${API_URL}/${quote._id}`, { credentials: 'omit' });
            const data = await res.json();
            setSelectedQuote(data);
        } catch (error) {
            console.error('Failed to fetch full quote details:', error);
        }
    };

    const handleSendReply = async () => {
        if (!replyText.trim() || !selectedQuote) return;
        setActionLoading(true);
        try {
            const res = await fetch(`${API_URL}/${selectedQuote._id}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: replyText })
            });

            if (res.ok) {
                const data = await res.json();
                setSelectedQuote({ ...selectedQuote, messages: [...(selectedQuote.messages || []), data.quoteMessage] });
                setReplyText('');
                fetchQuotes(); // refresh list in background
            } else {
                const err = await res.json();
                alert(err.message || 'Failed to send reply');
            }
        } catch (error) {
            console.error('Reply Error:', error);
            alert('Failed to send reply.');
        } finally {
            setActionLoading(false);
        }
    };

    const filteredQuotes = quotes.filter(q => {
        const matchesSearch = (q.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.service_type?.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = statusFilter ? q.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="quotes-admin-container">
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Quote Requests</h1>
                    <p style={{ color: '#64748B', marginTop: '0.25rem' }}>Review, manage, and convert client requests into active orders.</p>
                </div>
            </div>

            <div className="admin-toolbar">
                <input
                    type="text"
                    placeholder="Search by name, email, or service..."
                    className="admin-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select className="admin-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="converted">Converted to Order</option>
                    <option value="closed">Closed / Rejected</option>
                </select>
                <button onClick={fetchQuotes} className="admin-btn admin-btn-secondary">
                    ↻ Refresh
                </button>
            </div>

            <div className="admin-table-container">
                {loading ? (
                    <div className="admin-loading-state">Loading Quote Requests...</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Email</th>
                                <th>Service Type</th>
                                <th>Budget</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuotes.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>No quotes found.</td>
                                </tr>
                            ) : (
                                filteredQuotes.map(quote => (
                                    <tr key={quote._id} onClick={() => openQuote(quote)} className="cursor-pointer hover-row">
                                        <td style={{ fontWeight: 600 }}>{quote.name}</td>
                                        <td>{quote.email}</td>
                                        <td>{quote.service_type}</td>
                                        <td>{quote.budget}</td>
                                        <td><span className="text-sm">{new Date(quote.createdAt).toLocaleDateString()}</span></td>
                                        <td>
                                            <span className={`badge badge-${quote.status === 'new' ? 'pending' : quote.status === 'converted' ? 'completed' : 'progress'}`}>
                                                {quote.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="admin-btn admin-btn-icon" onClick={(e) => { e.stopPropagation(); openQuote(quote); }}>
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Custom Quote Detail Modal */}
            {selectedQuote && (
                <div className="admin-modal-overlay" onClick={() => setSelectedQuote(null)}>
                    <div className="admin-modal" style={{ maxWidth: '800px', width: '90%' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h2 className="modal-title">Quote Request Details</h2>
                                <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Submitted: {formatDate(selectedQuote.createdAt)}</p>
                            </div>
                            <button className="modal-close" onClick={() => setSelectedQuote(null)}>×</button>
                        </div>

                        <div className="modal-body quote-modal-body">
                            <div className="quote-detail-grid">
                                <div className="detail-section">
                                    <h3>Client Information</h3>
                                    <div className="detail-row"><span>Name:</span> <strong>{selectedQuote.name}</strong></div>
                                    <div className="detail-row"><span>Email:</span> <a href={`mailto:${selectedQuote.email}`}>{selectedQuote.email}</a></div>
                                    <div className="detail-row"><span>Company:</span> {selectedQuote.company || 'N/A'}</div>
                                    <div className="detail-row"><span>Phone:</span> {selectedQuote.phone || 'N/A'}</div>

                                    <div style={{ marginTop: '1.5rem' }}>
                                        <a href={`mailto:${selectedQuote.email}?subject=Regarding your MailStora Quote - ${selectedQuote.service_type}`} className="admin-btn admin-btn-primary" style={{ width: '100%' }}>
                                            ✉️ Reply to Client
                                        </a>
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h3>Project Scope</h3>
                                    <div className="detail-row"><span>Service Type:</span> <strong>{selectedQuote.service_type}</strong></div>
                                    <div className="detail-row"><span>Volume:</span> {selectedQuote.template_count}</div>
                                    <div className="detail-row"><span>Timeline:</span> {selectedQuote.timeline}</div>
                                    <div className="detail-row"><span>Budget:</span> <strong style={{ color: '#059669' }}>{selectedQuote.budget}</strong></div>

                                    {selectedQuote.attachment && (
                                        <div className="attachment-box">
                                            <span>📎 Attachment:</span>
                                            <a href={selectedQuote.attachment} target="_blank" rel="noreferrer" className="attachment-link">View File</a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="detail-description">
                                <h3>Project Description</h3>
                                <div className="description-box">
                                    {selectedQuote.project_description || 'No description provided.'}
                                </div>
                            </div>

                            <div className="conversation-section" style={{ marginTop: '2rem' }}>
                                <h3>Conversation History</h3>
                                <div className="chat-history">
                                    {!selectedQuote.messages || selectedQuote.messages.length === 0 ? (
                                        <div className="no-messages">No messages yet. Send a reply below to start the conversation!</div>
                                    ) : (
                                        selectedQuote.messages.map((msg: any) => (
                                            <div key={msg._id} className={`chat-bubble ${msg.sender_type === 'admin' ? 'chat-admin' : 'chat-client'}`}>
                                                <div className="chat-bubble-header">
                                                    <strong>{msg.sender_type === 'admin' ? 'MailStora Team' : selectedQuote.name}</strong>
                                                    <span className="chat-date">{formatDate(msg.createdAt)}</span>
                                                </div>
                                                <div className="chat-bubble-body">{msg.message}</div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="reply-box">
                                    <textarea
                                        className="admin-input-field"
                                        style={{ width: '100%', minHeight: '100px', marginBottom: '1rem', padding: '1rem' }}
                                        placeholder="Type your reply here... (This will be emailed directly to the client)"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        disabled={actionLoading}
                                    ></textarea>
                                    <button
                                        onClick={handleSendReply}
                                        disabled={actionLoading || !replyText.trim()}
                                        className="admin-btn admin-btn-primary"
                                    >
                                        {actionLoading ? 'Sending...' : 'Send Reply'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer quote-modal-footer">
                            <div className="status-updater">
                                <label>Status:</label>
                                <select value={editingStatus} onChange={(e) => setEditingStatus(e.target.value)} className="admin-input-field" style={{ width: '150px' }}>
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="negotiation">Negotiation</option>
                                    <option value="converted">Converted to Order</option>
                                    <option value="closed">Closed / Rejected</option>
                                </select>
                                <button onClick={handleUpdateStatus} disabled={actionLoading || editingStatus === selectedQuote.status} className="admin-btn admin-btn-secondary">
                                    Save
                                </button>
                            </div>

                            <div className="quote-actions">
                                <button type="button" onClick={() => handleDelete(selectedQuote._id)} className="admin-btn admin-btn-danger">
                                    Delete
                                </button>
                                {selectedQuote.status !== 'converted' && (
                                    <button type="button" onClick={handleConvertToOrder} disabled={actionLoading} className="admin-btn admin-btn-primary" style={{ background: '#059669' }}>
                                        Convert to Order ✓
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
