'use client';
import { useState, useEffect, use } from 'react';
import PortfolioEditor from "../../components/PortfolioEditor";

export default function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}`;
            const res = await fetch(`${API_BASE}/api/admin/portfolio/${id}`, { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setItem(data);
            }
        };
        fetchItem();
    }, [id]);

    if (!item) return <div style={{ padding: '2rem' }}>Loading editor...</div>;

    return <PortfolioEditor initialData={item} />;
}
