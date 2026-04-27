'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './quotes-admin.css';

export default function QuotesAdmin() {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

    const handleDelete = async (id: string, e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this quote request?')) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE', credentials: 'omit' });
            fetchQuotes();
        } catch (error) {
            console.error('Error deleting quote:', error);
            alert('Failed to delete quote.');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const getEspDisplay = (quote: any) => {
        return (quote.esp && quote.esp.length > 0) ? quote.esp.join(', ') : '—';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'var(--primary-orange)'; // orange
            case 'reviewed': return '#3b82f6'; // blue
            case 'replied': return '#10b981'; // green
            case 'closed': return '#6b7280'; // gray
            default: return '#6b7280';
        }
    };

    return (
        <div className="quotes-admin-container">
            <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="admin-title" style={{ color: 'var(--primary-dark)', fontSize: '1.8rem', margin: 0 }}>Quote Requests</h1>
                    <p style={{ color: '#64748B', marginTop: '0.5rem' }}>Review and manage all incoming client requests.</p>
                </div>
                <button onClick={fetchQuotes} className="admin-btn admin-btn-secondary" style={{ border: '1px solid #cbd5e1', background: 'white', padding: '0.5rem 1rem', borderRadius: '6px' }}>
                    ↻ Refresh
                </button>
            </div>

            <div className="admin-table-container" style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e4f0', overflow: 'hidden' }}>
                {loading ? (
                    <div className="admin-loading-state" style={{ padding: '3rem', textAlign: 'center' }}>Loading Quote Requests...</div>
                ) : (
                    <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8f9fa', borderBottom: '1px solid #e2e4f0' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Quote ID</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Client Name</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Email</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>WhatsApp</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Service</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>ESP</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: '#64748b' }}>Date</th>
                                <th style={{ padding: '1rem', textAlign: 'right', color: '#64748b' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.length === 0 ? (
                                <tr>
                                    <td colSpan={9} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No quotes found.</td>
                                </tr>
                            ) : (
                                quotes.map(quote => (
                                    <tr key={quote._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary-dark)' }}>{quote.quoteId}</td>
                                        <td style={{ padding: '1rem' }}>{quote.client?.name}</td>
                                        <td style={{ padding: '1rem' }}>{quote.client?.email}</td>
                                        <td style={{ padding: '1rem' }}>{quote.client?.whatsapp}</td>
                                        <td style={{ padding: '1rem' }}>{quote.service}</td>
                                        <td style={{ padding: '1rem' }}>{getEspDisplay(quote)}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ 
                                                backgroundColor: getStatusColor(quote.status), 
                                                color: 'white', 
                                                padding: '0.25rem 0.75rem', 
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                textTransform: 'uppercase'
                                            }}>
                                                {quote.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#64748b' }}>{formatDate(quote.submittedAt)}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <Link href={`/admin/quotes/${quote.quoteId}`} style={{ padding: '0.4rem 0.8rem', background: 'var(--primary-dark)', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.85rem' }}>
                                                    View / Reply
                                                </Link>
                                                <button onClick={(e) => handleDelete(quote._id, e)} style={{ padding: '0.4rem 0.8rem', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
