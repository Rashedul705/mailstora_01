'use client';

import { useState, useEffect } from 'react';

export type ColumnDef = {
    key: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'textarea' | 'select' | 'date' | 'boolean';
    options?: string[]; // For select type
    hideInTable?: boolean;
    readOnly?: boolean;
};

interface CrudProps {
    title: string;
    endpoint: string;
    columns: ColumnDef[];
}

export default function GenericCrudPage({ title, endpoint, columns }: CrudProps) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [saving, setSaving] = useState(false);

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`;

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (e: any) => setSearch(e.target.value);

    const filteredData = data.filter(item =>
        JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );

    const openModal = (item?: any) => {
        setEditingItem(item || null);
        if (item) {
            setFormData(item);
        } else {
            const emptyForm: any = {};
            columns.forEach(c => emptyForm[c.key] = '');
            setFormData(emptyForm);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleChange = (key: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSave = async (e: any) => {
        e.preventDefault();
        setSaving(true);
        try {
            const method = editingItem ? 'PUT' : 'POST';
            const url = editingItem ? `${API_URL}/${editingItem._id}` : API_URL;

            // Remove unmodifiable fields
            const payload = { ...formData };
            delete payload._id;
            delete payload.createdAt;
            delete payload.updatedAt;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                await fetchData();
                closeModal();
            } else {
                alert('Error saving data');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchData();
            } else {
                alert('Error deleting data');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="admin-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 className="admin-page-title">{title}</h1>
                <button onClick={() => openModal()} style={{ padding: '10px 20px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    + Add New
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                    style={{ padding: '10px', width: '100%', maxWidth: '400px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="admin-table-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                                {columns.filter(c => !c.hideInTable).map(col => (
                                    <th key={col.key} style={{ padding: '12px' }}>{col.label}</th>
                                ))}
                                <th style={{ padding: '12px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr><td colSpan={columns.filter(c => !c.hideInTable).length + 1} style={{ padding: '12px', textAlign: 'center' }}>No items found.</td></tr>
                            ) : (
                                filteredData.map((row) => (
                                    <tr key={row._id} style={{ borderBottom: '1px solid #eee' }}>
                                        {columns.filter(c => !c.hideInTable).map(col => (
                                            <td key={col.key} style={{ padding: '12px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {typeof row[col.key] === 'object' ? JSON.stringify(row[col.key]) : String(row[col.key] || '')}
                                            </td>
                                        ))}
                                        <td style={{ padding: '12px' }}>
                                            <button onClick={() => openModal(row)} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer', background: '#e0e0e0', border: 'none', borderRadius: '4px' }}>Edit</button>
                                            <button onClick={() => handleDelete(row._id)} style={{ padding: '5px 10px', cursor: 'pointer', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '20px' }}>{editingItem ? 'Edit' : 'Add'} {title}</h2>
                        <form onSubmit={handleSave}>
                            {columns.filter(c => !c.readOnly || (!editingItem && c.readOnly)).map(col => (
                                <div key={col.key} style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{col.label}</label>

                                    {col.type === 'textarea' ? (
                                        <textarea
                                            value={formData[col.key] || ''}
                                            onChange={(e) => handleChange(col.key, e.target.value)}
                                            style={{ width: '100%', padding: '8px', minHeight: '100px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    ) : col.type === 'select' ? (
                                        <select
                                            value={formData[col.key] || ''}
                                            onChange={(e) => handleChange(col.key, e.target.value)}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        >
                                            <option value="">Select...</option>
                                            {col.options?.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : col.type === 'boolean' ? (
                                        <input
                                            type="checkbox"
                                            checked={!!formData[col.key]}
                                            onChange={(e) => handleChange(col.key, e.target.checked)}
                                        />
                                    ) : (
                                        <input
                                            type={col.type}
                                            value={formData[col.key] || ''}
                                            onChange={(e) => handleChange(col.key, e.target.value)}
                                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                    )}
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <button type="button" onClick={closeModal} style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer', background: '#ccc', border: 'none', borderRadius: '4px' }}>Cancel</button>
                                <button type="submit" disabled={saving} style={{ padding: '10px 20px', cursor: 'pointer', background: '#f97316', color: 'white', border: 'none', borderRadius: '4px' }}>
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
