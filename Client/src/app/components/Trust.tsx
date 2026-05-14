'use client';

import { useEffect, useState, useRef } from 'react';
import './Trust.css';

interface Logo {
    _id: string;
    name: string;
    url: string;
    logoUrl: string;
    active: boolean;
    order: number;
}

interface Settings {
    speed: 'Slow' | 'Normal' | 'Fast';
    showStats: boolean;
}

const SPEED_MAP: Record<string, number> = { Slow: 30, Normal: 20, Fast: 12 };

const STATS = [
    { number: '180+', label: 'Happy Clients' },
    { number: '400+', label: 'Templates Built' },
    { number: '15k+', label: 'Hours on Upwork' },
];

export default function Trust() {
    const [logos,    setLogos]    = useState<Logo[]>([]);
    const [settings, setSettings] = useState<Settings>({ speed: 'Normal', showStats: true });
    const [loaded,   setLoaded]   = useState(false);

    useEffect(() => {
        const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

        Promise.all([
            fetch(`${API}/api/trust-logos`).then(r => r.json()),
            fetch(`${API}/api/trust-logos/settings`).then(r => r.json()),
        ]).then(([logosData, settingsData]) => {
            setLogos(Array.isArray(logosData) ? logosData : []);
            if (settingsData?.speed) setSettings(settingsData);
        }).catch(() => {}).finally(() => setLoaded(true));
    }, []);

    if (!loaded || logos.length === 0) return null;

    // Duplicate array for seamless loop
    const doubled = [...logos, ...logos];
    const duration = SPEED_MAP[settings.speed] ?? 20;

    return (
        <section className="trust-section" id="trust">
            <div className="trust-container">

                {/* Header */}
                <p className="trust-label">TRUSTED PARTNERS</p>
                <h2 className="trust-heading">Businesses That Trust Us</h2>
                <p className="trust-subtitle">
                    Helping companies worldwide send emails that actually get read.
                </p>
                <div className="trust-divider" />

                {/* Marquee */}
                <div className="trust-marquee-wrapper">
                    <div
                        className="trust-marquee-track"
                        style={{ animationDuration: `${duration}s` }}
                    >
                        {doubled.map((logo, i) => (
                            <div className="trust-pill" key={`${logo._id}-${i}`}>
                                {logo.logoUrl ? (
                                    <img
                                        src={logo.logoUrl}
                                        alt={logo.name}
                                        className="trust-pill-img"
                                    />
                                ) : (
                                    <span className="trust-pill-name">{logo.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Strip */}
                {settings.showStats && (
                    <div className="trust-stats">
                        {STATS.map(s => (
                            <div className="trust-stat" key={s.label}>
                                <div className="trust-stat-number">
                                    <span className="trust-stat-dot">•</span>
                                    {s.number}
                                </div>
                                <div className="trust-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
