'use client';

import { useState } from 'react';
import GenericCrudPage from '../components/GenericCrudPage';

export default function ContentPage() {
    const [tab, setTab] = useState<'hero' | 'website'>('hero');

    return (
        <div>
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <button
                    onClick={() => setTab('hero')}
                    style={{ marginRight: '10px', padding: '10px 20px', background: tab === 'hero' ? '#f97316' : '#eee', color: tab === 'hero' ? '#fff' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Hero Section
                </button>
                <button
                    onClick={() => setTab('website')}
                    style={{ padding: '10px 20px', background: tab === 'website' ? '#f97316' : '#eee', color: tab === 'website' ? '#fff' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    General Content
                </button>
            </div>

            {tab === 'hero' ? (
                <GenericCrudPage
                    title="Hero Content"
                    endpoint="/api/content/hero"
                    columns={[
                        { key: 'title', label: 'Title', type: 'textarea' },
                        { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
                        { key: 'cta_text', label: 'CTA Text', type: 'text' },
                        { key: 'cta_link', label: 'CTA Link', type: 'text' },
                        { key: 'background_image', label: 'Image URL', type: 'text' },
                        { key: 'is_active', label: 'Is Active', type: 'boolean' }
                    ]}
                />
            ) : (
                <GenericCrudPage
                    title="Website Strings"
                    endpoint="/api/content/website"
                    columns={[
                        { key: 'section', label: 'Section', type: 'text' },
                        { key: 'content_key', label: 'Key', type: 'text' },
                        { key: 'content_value', label: 'Value', type: 'textarea' }
                    ]}
                />
            )}
        </div>
    );
}
