'use client';

import { useState, useEffect } from 'react';

export default function ShareButtons({ title, slug }: { title: string, slug: string }) {
    const [copied, setCopied] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        // Set URL on mount to avoid hydration mismatch
        setUrl(`${window.location.origin}/blog/${slug}`);
    }, [slug]);

    const handleCopy = () => {
        if (!url) return;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="share-buttons">
            <a 
                href={url ? `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` : '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-btn"
            >
                LinkedIn
            </a>
            <a 
                href={url ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` : '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-btn"
            >
                Twitter
            </a>
            <button onClick={handleCopy} className="share-btn">
                {copied ? 'Copied!' : 'Copy Link'}
            </button>
        </div>
    );
}
