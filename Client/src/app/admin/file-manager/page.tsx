'use client';

import { useState, useEffect, useRef } from 'react';

export default function FileManagerPage() {
    const [currentPath, setCurrentPath] = useState('');
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchFiles = async (path: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/file-manager?path=${encodeURIComponent(path)}`);
            const data = await res.json();
            if (res.ok) {
                setFiles(data.files || []);
                setCurrentPath(data.path);
            } else {
                setError(data.error);
            }
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchFiles('');
    }, []);

    const handleNavigate = (folderName: string) => {
        const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
        fetchFiles(newPath);
    };

    const handleNavigateUp = () => {
        if (!currentPath) return;
        const parts = currentPath.split('/');
        parts.pop();
        fetchFiles(parts.join('/'));
    };

    const handleCreateFolder = async () => {
        const name = prompt('Enter new folder name:');
        if (!name) return;

        const formData = new FormData();
        formData.append('action', 'create_folder');
        formData.append('name', name);
        formData.append('path', currentPath);

        try {
            await fetch('/api/file-manager', { method: 'POST', body: formData });
            fetchFiles(currentPath);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('action', 'upload');
        formData.append('file', file);
        formData.append('path', currentPath);

        try {
            setLoading(true);
            await fetch('/api/file-manager', { method: 'POST', body: formData });
            fetchFiles(currentPath);
        } catch (err: any) {
            alert(err.message);
            setLoading(false);
        }

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = async (fileName: string) => {
        if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;

        const fullPath = currentPath ? `${currentPath}/${fileName}` : fileName;
        try {
            await fetch(`/api/file-manager?path=${encodeURIComponent(fullPath)}`, { method: 'DELETE' });
            fetchFiles(currentPath);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0';
        const k = 1024;
        const sizes = ['b', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit'
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    File Manager <span style={{fontSize: '14px', color: '#666', fontWeight: 'normal'}}>(Email_Template)</span>
                </h1>
            </div>

            {/* Toolbar */}
            <div style={{ 
                display: 'flex', gap: '15px', padding: '10px 15px', 
                background: '#f8f9fa', border: '1px solid #ddd', borderBottom: 'none',
                borderTopLeftRadius: '6px', borderTopRightRadius: '6px'
            }}>
                <button onClick={handleCreateFolder} className="btn-toolbar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
                    + Folder
                </button>
                <button onClick={handleUploadClick} className="btn-toolbar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    Upload File
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload} 
                />
            </div>

            {/* Breadcrumb Path */}
            <div style={{ padding: '10px 15px', background: '#fff', border: '1px solid #ddd', borderBottom: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b7280"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                <strong style={{color: '#0056b3'}}>public_html/Email_Template{currentPath ? '/' + currentPath : ''}</strong>
            </div>

            {/* File List */}
            <div style={{ background: '#fff', border: '1px solid #ddd', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
                            <th style={{ padding: '10px 15px', color: '#444', fontWeight: '600', fontSize: '13px' }}>Name</th>
                            <th style={{ padding: '10px 15px', color: '#444', fontWeight: '600', fontSize: '13px' }}>Size</th>
                            <th style={{ padding: '10px 15px', color: '#444', fontWeight: '600', fontSize: '13px' }}>Last Modified</th>
                            <th style={{ padding: '10px 15px', color: '#444', fontWeight: '600', fontSize: '13px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPath && (
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td colSpan={4} style={{ padding: '10px 15px' }}>
                                    <button onClick={handleNavigateUp} style={{ background: 'none', border: 'none', color: '#0056b3', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                                        Up One Level
                                    </button>
                                </td>
                            </tr>
                        )}
                        
                        {loading && !files.length ? (
                            <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>Loading...</td></tr>
                        ) : files.length === 0 ? (
                            <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#888' }}>This folder is empty.</td></tr>
                        ) : files.map((file) => (
                            <tr key={file.name} style={{ borderBottom: '1px solid #eee' }} className="file-row">
                                <td style={{ padding: '10px 15px' }}>
                                    {file.isDirectory ? (
                                        <button onClick={() => handleNavigate(file.name)} style={{ background: 'none', border: 'none', color: '#0056b3', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                                            {file.name}
                                        </button>
                                    ) : (
                                        <a href={`/Email_Template/${currentPath ? currentPath + '/' : ''}${file.name}`} target="_blank" style={{ color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                                            {file.name}
                                        </a>
                                    )}
                                </td>
                                <td style={{ padding: '10px 15px', color: '#666', fontSize: '13px' }}>
                                    {file.isDirectory ? '-' : formatSize(file.size)}
                                </td>
                                <td style={{ padding: '10px 15px', color: '#666', fontSize: '13px' }}>
                                    {formatDate(file.lastModified)}
                                </td>
                                <td style={{ padding: '10px 15px', textAlign: 'right' }}>
                                    <button onClick={() => handleDelete(file.name)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .btn-toolbar {
                    background: transparent;
                    border: none;
                    color: #444;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    padding: 4px 8px;
                    border-radius: 4px;
                }
                .btn-toolbar:hover {
                    background: #e2e8f0;
                }
                .file-row:hover {
                    background: #f8fafc !important;
                }
            `}} />
        </div>
    );
}
