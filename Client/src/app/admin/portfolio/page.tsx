'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './AdminPortfolio.css';

export default function AdminPortfolioList() {
    const [items, setItems] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({ totalItems: 0, published: 0, drafts: 0, caseStudies: 0 });
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('All Types');
    const [filterStatus, setFilterStatus] = useState('All Status');
    const [isLoading, setIsLoading] = useState(true);

    const fetchItems = async () => {
        setIsLoading(true);
        let url = `http://localhost:5000/api/admin/portfolio?`;
        if (filterType !== 'All Types') url += `type=${filterType}&`;
        if (filterStatus !== 'All Status') url += `status=${filterStatus.toLowerCase()}&`;
        if (searchQuery) url += `q=${searchQuery}&`;

        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_BASE}/api/admin/portfolio?${url.split('?')[1]}`, { credentials: 'omit' }); // Omit or include based on auth
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
        setIsLoading(false);
    };

    const fetchStats = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_BASE}/api/admin/portfolio/stats`);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        const timer = setTimeout(fetchItems, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, filterType, filterStatus]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_BASE}/api/admin/portfolio/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchItems();
                fetchStats();
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    return (
        <div className="admin-portfolio-page">
            <div className="admin-page-header">
                <div>
                    <h1>Portfolio Items</h1>
                    <p>Manage all portfolio items, gallery images and content</p>
                </div>
                <div className="header-actions">
                    <button className="btn-export">Export</button>
                    <Link href="/admin/portfolio/new" className="btn-add-new">+ Add New Item</Link>
                </div>
            </div>

            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-val">{stats.totalItems}</div>
                    <div className="stat-lbl">Total Items</div>
                </div>
                <div className="stat-card">
                    <div className="stat-val">{stats.published}</div>
                    <div className="stat-lbl">Published</div>
                </div>
                <div className="stat-card">
                    <div className="stat-val">{stats.drafts}</div>
                    <div className="stat-lbl">Drafts</div>
                </div>
                <div className="stat-card">
                    <div className="stat-val">{stats.caseStudies}</div>
                    <div className="stat-lbl">Case Studies</div>
                </div>
            </div>

            <div className="toolbar-row">
                <div className="search-wrapper">
                    <span className="search-icon">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search portfolio..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filters">
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option>All Types</option>
                        <option>Email Template</option>
                        <option>Email Signature</option>
                        <option>Case Study</option>
                    </select>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                    </select>
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>IMAGE</th>
                            <th>TITLE</th>
                            <th>TYPE</th>
                            <th>ESP</th>
                            <th>VIEWS</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={7} className="text-center">Loading...</td></tr>
                        ) : items.length === 0 ? (
                            <tr><td colSpan={7} className="text-center">No items found</td></tr>
                        ) : (
                            items.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        <div className="thumb-wrapper">
                                            <Image src={item.coverImage || '/mockup.png'} alt={item.title} width={50} height={40} className="td-thumb" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="td-title">{item.title}</div>
                                        <div className="td-client">{item.clientName}</div>
                                    </td>
                                    <td>
                                        <span className={`type-badge type-${item.type?.toLowerCase().replace(' ', '-')}`}>{item.type}</span>
                                    </td>
                                    <td>{item.esp}</td>
                                    <td>{item.views || 0}</td>
                                    <td>
                                        <span className={`status-badge status-${item.status}`}>{item.status}</span>
                                    </td>
                                    <td className="actions-cell">
                                        <Link href={`/admin/portfolio/${item._id}/edit`} className="btn-edit">Edit</Link>
                                        <Link href={`/portfolio/${item.slug}`} target="_blank" className="btn-view">View</Link>
                                        <button onClick={() => handleDelete(item._id)} className="btn-delete">Del</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
