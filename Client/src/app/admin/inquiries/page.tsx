'use client';

import { useState, useEffect } from 'react';
import './inquiries-admin.css';

export default function InquiriesAdmin() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
    const [selectedInquiryDetail, setSelectedInquiryDetail] = useState<any>(null);
    
    const [filterStatus, setFilterStatus] = useState('All');
    
    const [searchQuery, setSearchQuery] = useState('');
    
    const [replyText, setReplyText] = useState('');
    const [replying, setReplying] = useState(false);
    
    const [statusUpdating, setStatusUpdating] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/inquiries`;

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL, { credentials: 'omit' });
            const data = await res.json();
            setInquiries(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    // Fetch full inquiry detail when an inquiry is selected
    useEffect(() => {
        const fetchInquiryDetail = async () => {
            if (!selectedInquiryId) {
                setSelectedInquiryDetail(null);
                return;
            }
            try {
                const res = await fetch(`${API_URL}/${selectedInquiryId}`, { credentials: 'omit' });
                if (res.ok) {
                    const data = await res.json();
                    setSelectedInquiryDetail(data);
                    setNewStatus(data.status);
                }
            } catch (error) {
                console.error('Error fetching inquiry detail:', error);
            }
        };
        fetchInquiryDetail();
    }, [selectedInquiryId]);

    const handleUpdateStatus = async () => {
        if (!selectedInquiryId || !newStatus || newStatus === selectedInquiryDetail.status) return;
        setStatusUpdating(true);
        try {
            const res = await fetch(`${API_URL}/${selectedInquiryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
                credentials: 'omit'
            });
            if (res.ok) {
                const updated = await res.json();
                setSelectedInquiryDetail(updated);
                setInquiries(inquiries.map(q => q._id === updated._id ? updated : q));
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
        if (!selectedInquiryId || !replyText.trim()) return;
        setReplying(true);
        try {
            const res = await fetch(`${API_URL}/${selectedInquiryId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: replyText }),
                credentials: 'omit'
            });
            if (res.ok) {
                const data = await res.json();
                setSelectedInquiryDetail(data.inquiry);
                setInquiries(inquiries.map(q => q._id === data.inquiry._id ? data.inquiry : q));
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
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter(q => q.status === 'Pending').length;
    const repliedInquiries = inquiries.filter(q => q.status === 'Replied').length;
    const closedInquiries = inquiries.filter(q => q.status === 'Resolved').length;

    // Filtering
    const filteredInquiries = inquiries.filter(q => {
        if (filterStatus !== 'All' && q.status !== filterStatus) return false;
        
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchName = q.name?.toLowerCase().includes(query);
            const matchEmail = q.email?.toLowerCase().includes(query);
            if (!matchName && !matchEmail) return false;
        }

        return true;
    });

    return (
        <div className="inquiries-admin-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ color: 'var(--primary-dark)', fontSize: '1.8rem', margin: 0 }}>Inquiries Management</h1>
                <button onClick={fetchInquiries} style={{ border: '1px solid #cbd5e1', background: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
                    ↻ Refresh
                </button>
            </div>

            {/* Stats Row */}
            <div className="stats-row">
                <div className="stat-card stat-new">
                    <h3>{newInquiries}</h3>
                    <span>Pending</span>
                </div>
                <div className="stat-card stat-replied">
                    <h3>{repliedInquiries}</h3>
                    <span>Replied</span>
                </div>
                <div className="stat-card stat-closed">
                    <h3>{closedInquiries}</h3>
                    <span>Resolved</span>
                </div>
                <div className="stat-card stat-total">
                    <h3>{totalInquiries}</h3>
                    <span>Total Inquiries</span>
                </div>
            </div>

            {/* Filters Row */}
            <div className="filters-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <input 
                    type="text" 
                    placeholder="Search name or email..." 
                    className="admin-filter-select"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <select className="admin-filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Replied">Replied</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            <div className="split-layout">
                {/* LEFT PANEL: Inquiry List */}
                <div className="inquiries-list-panel">
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading inquiries...</div>
                    ) : filteredInquiries.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No inquiries found.</div>
                    ) : (
                        filteredInquiries.map(inquiry => (
                            <div 
                                key={inquiry._id} 
                                className={`inquiry-list-item ${selectedInquiryId === inquiry._id ? 'active' : ''}`}
                                onClick={() => setSelectedInquiryId(inquiry._id)}
                            >
                                <div className="inquiry-list-header">
                                    <span className="inquiry-id" style={{fontWeight: 600}}>{inquiry.name}</span>
                                    <span className="inquiry-date">{formatDate(inquiry.createdAt)}</span>
                                </div>
                                <div className="inquiry-client-info">
                                    {inquiry.email}
                                </div>
                                <div className="inquiry-badges">
                                    <span className={`badge badge-status-${inquiry.status.toLowerCase()}`} style={{
                                        background: inquiry.status === 'Pending' ? '#dbeafe' : inquiry.status === 'Replied' ? '#d1fae5' : '#f1f5f9',
                                        color: inquiry.status === 'Pending' ? '#1e40af' : inquiry.status === 'Replied' ? '#065f46' : '#475569'
                                    }}>{inquiry.status}</span>
                                    {inquiry.service && (
                                        <span className="badge badge-service" style={{ marginRight: '4px' }}>{inquiry.service}</span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* RIGHT PANEL: Inquiry Detail */}
                <div className="inquiry-detail-panel">
                    {!selectedInquiryDetail ? (
                        <div className="no-selection">
                            Select an inquiry from the list to view details
                        </div>
                    ) : (
                        <>
                            <div className="detail-header-bar">
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary-dark)' }}>{selectedInquiryDetail.name}</h2>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Received: {formatDate(selectedInquiryDetail.createdAt)}</span>
                                </div>
                                <div className="status-manager">
                                    <select 
                                        className="admin-filter-select" 
                                        value={newStatus} 
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        style={{ width: 'auto' }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Replied">Replied</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                    <button 
                                        className="btn-save-status"
                                        onClick={handleUpdateStatus}
                                        disabled={statusUpdating || newStatus === selectedInquiryDetail.status}
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
                                        <p>{selectedInquiryDetail.name}</p>
                                    </div>
                                    <div className="info-box">
                                        <h4>Email</h4>
                                        <p><a href={`mailto:${selectedInquiryDetail.email}`}>{selectedInquiryDetail.email}</a></p>
                                    </div>
                                    <div className="info-box">
                                        <h4>Service Needed</h4>
                                        <p>{selectedInquiryDetail.service || 'N/A'}</p>
                                    </div>
                                    <div className="info-box">
                                        <h4>Company</h4>
                                        <p>{selectedInquiryDetail.company || 'N/A'}</p>
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#1e293b' }}>Initial Inquiry Message</h3>
                                <div className="description-box" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
                                    {selectedInquiryDetail.message || 'No message provided.'}
                                </div>

                                <div className="conversation-section">
                                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#1e293b' }}>Conversation History ({selectedInquiryDetail.conversation?.length || 0})</h3>
                                    
                                    <div className="chat-history">
                                        {(!selectedInquiryDetail.conversation || selectedInquiryDetail.conversation.length === 0) ? (
                                            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontStyle: 'italic' }}>
                                                No replies sent yet.
                                            </div>
                                        ) : (
                                            selectedInquiryDetail.conversation.map((msg: any, idx: number) => (
                                                <div key={idx} className={`chat-bubble ${msg.from === 'admin' ? 'chat-admin' : 'chat-client'}`}>
                                                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</div>
                                                    <div className="chat-meta">
                                                        <span>{msg.from === 'admin' ? 'MailStora Support' : selectedInquiryDetail.name}</span>
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
