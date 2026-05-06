'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_BASE}/api/admin/blog`, {
                credentials: 'omit'
            });
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deletePost = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_BASE}/api/admin/blog/${id}`, {
                method: 'DELETE',
                credentials: 'omit' // Ideally 'include' if auth cookie is required
            });
            if (res.ok) {
                fetchPosts();
            }
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    if (isLoading) return <div className="admin-loading">Loading Posts...</div>;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">Blog Posts</h1>
                <Link href="/admin/blog/new" className="admin-btn admin-btn-primary">
                    + New Post
                </Link>
            </div>

            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Published Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No posts found. Create one!</td>
                                </tr>
                            ) : (
                                posts.map(post => (
                                    <tr key={post._id}>
                                        <td style={{ fontWeight: 600 }}>{post.title}</td>
                                        <td>{post.category}</td>
                                        <td>
                                            <span className={`badge ${post.status === 'published' ? 'badge-completed' : post.status === 'scheduled' ? 'badge-progress' : 'badge-pending'}`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'N/A'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <Link href={`/admin/blog/${post._id}/edit`} className="admin-btn" style={{ padding: '0.5rem 1rem', background: '#F1F5F9', color: '#0F172A' }}>
                                                    Edit
                                                </Link>
                                                <button onClick={() => deletePost(post._id)} className="admin-btn admin-btn-danger" style={{ padding: '0.5rem 1rem' }}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
