'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PostEditor from '../../../components/PostEditor';
import { use } from 'react';

export default function EditPostPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const [post, setPost] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
                const res = await fetch(`${API_BASE}/api/admin/blog/${params.id}`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                }
            } catch (error) {
                console.error('Failed to fetch post:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchPost();
        }
    }, [params.id]);

    if (isLoading) return <div className="admin-loading">Loading Post Data...</div>;
    if (!post) return <div className="admin-loading">Post not found</div>;

    return (
        <div className="admin-page">
            <PostEditor initialData={post} />
        </div>
    );
}
