'use client';

import { useState } from 'react';

export default function ShareButtons({ title, slug }: { title: string, slug: string }) {
    const [copied, setCopied] = useState(false);
    
    // Fallback to window.location if not available during SSR
    const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : `https://mailstora.com/blog/${slug}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="share-buttons">
            <a 
                href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="share-btn"
            >
                LinkedIn
            </a>
            <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} 
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
