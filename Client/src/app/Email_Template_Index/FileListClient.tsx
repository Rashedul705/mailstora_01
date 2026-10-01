'use client';

import { useState } from 'react';

export default function FileListClient({ 
    fileList, 
    parentUrlPath, 
    currentUrlPath 
}: { 
    fileList: any[]; 
    parentUrlPath: string | null; 
    currentUrlPath: string;
}) {
    const [filter, setFilter] = useState('');

    const filteredFiles = fileList.filter(file => 
        file.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', padding: '40px', background: '#f4f5f7', minHeight: '100vh', color: '#333' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: '600' }}>
                Index of {currentUrlPath}/
            </h1>
            
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Filter Name" 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '4px', width: '300px', fontSize: '14px', outline: 'none' }}
                />
            </div>

            <div style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                            <th style={{ padding: '14px 20px', color: '#1d4ed8', fontWeight: '600', fontSize: '14px' }}>Name</th>
                            <th style={{ padding: '14px 20px', color: '#1d4ed8', fontWeight: '600', fontSize: '14px' }}>Last Modified</th>
                            <th style={{ padding: '14px 20px', color: '#1d4ed8', fontWeight: '600', fontSize: '14px', textAlign: 'right' }}>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parentUrlPath && !filter && (
                            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={{ padding: '12px 20px' }}>
                                    <a href={parentUrlPath} style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                                        Parent Directory
                                    </a>
                                </td>
                                <td style={{ padding: '12px 20px' }}></td>
                                <td style={{ padding: '12px 20px' }}></td>
                            </tr>
                        )}
                        
                        {filteredFiles.map((file) => {
                            const href = `${currentUrlPath}/${file.name}`;
                            return (
                                <tr key={file.name} style={{ borderBottom: '1px solid #f3f4f6' }} className="hover:bg-gray-50">
                                    <td style={{ padding: '12px 20px' }}>
                                        <a href={href} style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                            {file.isDirectory ? (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="#9ca3af"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                                            ) : (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                                            )}
                                            {file.name}{file.isDirectory ? '/' : ''}
                                        </a>
                                    </td>
                                    <td style={{ padding: '12px 20px', color: '#4b5563', fontSize: '14px' }}>
                                        {file.lastModified}
                                    </td>
                                    <td style={{ padding: '12px 20px', color: '#4b5563', fontSize: '14px', textAlign: 'right' }}>
                                        {file.isDirectory ? '-' : file.size}
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredFiles.length === 0 && (
                            <tr>
                                <td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>No files found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p style={{ marginTop: '30px', fontSize: '13px', color: '#6b7280' }}>
                Proudly Served by MailStora Server
            </p>
        </div>
    );
}
