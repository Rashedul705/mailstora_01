'use client';

import { useState, useEffect } from 'react';
import './pricing.css';

interface PricingTier {
    id: number;
    name: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
}

export default function PricingManagement() {
    const [tiers, setTiers] = useState<PricingTier[]>([
        {
            id: 1,
            name: 'Single Template',
            price: '$199',
            description: 'Perfect for a one-off newsletter or automated welcome email.',
            features: ['1 Custom HTML Email Template', 'Tested in 90+ Email Clients']
        },
        {
            id: 2,
            name: 'Standard Package',
            price: '$499',
            description: 'The most popular choice for growing businesses and agencies.',
            features: ['1 Custom HTML Email Templates', '1 Professional HTML Signature'],
            isPopular: true
        },
        {
            id: 3,
            name: 'Enterprise Custom',
            price: 'Custom',
            description: 'Full service email architecture for complex design systems.',
            features: ['Unlimited Custom Templates', 'Modular Email Design Systems']
        },
    ]);

    useEffect(() => {
        const stored = localStorage.getItem('adminPricing');
        if (stored) {
            setTiers(JSON.parse(stored));
        } else {
            localStorage.setItem('adminPricing', JSON.stringify(tiers));
        }
    }, []);

    const handleUpdate = (id: number, field: keyof PricingTier, value: any) => {
        const updated = tiers.map(t => t.id === id ? { ...t, [field]: value } : t);
        setTiers(updated);
        localStorage.setItem('adminPricing', JSON.stringify(updated));
    };

    const togglePopular = (id: number) => {
        const updated = tiers.map(t => {
            if (t.id === id) return { ...t, isPopular: !t.isPopular };
            return { ...t, isPopular: false }; // Only one can be popular
        });
        setTiers(updated);
        localStorage.setItem('adminPricing', JSON.stringify(updated));
    };

    return (
        <div className="pricing-mgmt-page">
            <header className="admin-header">
                <h1 className="admin-title">Pricing Management</h1>
            </header>

            <div className="pricing-grid">
                {tiers.map((tier) => (
                    <div key={tier.id} className="admin-card pricing-edit-card">
                        <div className="card-header-flex">
                            <h2>{tier.name}</h2>
                            {tier.isPopular && <span className="popular-tag">Popular Plan</span>}
                        </div>

                        <div className="admin-form">
                            <div className="form-group">
                                <label>Plan Name</label>
                                <input
                                    type="text"
                                    value={tier.name}
                                    onChange={(e) => handleUpdate(tier.id, 'name', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="text"
                                    value={tier.price}
                                    onChange={(e) => handleUpdate(tier.id, 'price', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    rows={2}
                                    value={tier.description}
                                    onChange={(e) => handleUpdate(tier.id, 'description', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Features (bullet points)</label>
                                <textarea
                                    rows={4}
                                    value={tier.features.join('\n')}
                                    onChange={(e) => handleUpdate(tier.id, 'features', e.target.value.split('\n'))}
                                    placeholder="Enter each feature on a new line"
                                />
                            </div>

                            <div className="toggle-popular" onClick={() => togglePopular(tier.id)}>
                                <input type="checkbox" checked={!!tier.isPopular} readOnly />
                                <span>Mark as Most Popular</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
