'use client';

import { useEffect, useState } from 'react';
import './Trust.css';

interface Logo { _id: string; name: string; url: string; logoUrl: string; active: boolean; order: number; }
interface Settings { speed: 'Slow' | 'Normal' | 'Fast'; showStats: boolean; }

const SPEED_MAP: Record<string, number> = { Slow: 40, Normal: 25, Fast: 14 };

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
        ]).then(([ld, sd]) => {
            setLogos(Array.isArray(ld) ? ld : []);
            if (sd?.speed) setSettings(sd);
        }).catch(() => {}).finally(() => setLoaded(true));
    }, []);

    if (!loaded || logos.length === 0) return null;

    const duration = SPEED_MAP[settings.speed] ?? 25;
    // Duplicate enough times so first half always overflows viewport (no simultaneous duplicates)
    const MIN_PER_HALF = 8;
    const copies = Math.max(1, Math.ceil(MIN_PER_HALF / logos.length));
    const half   = Array(copies).fill(logos).flat();
    const track  = [...half, ...half]; // two identical halves → translateX(-50%) loops seamlessly

    return (
        <section className="trust-section" id="trust">
            <div className="trust-container">
                <p className="trust-label">TRUSTED PARTNERS</p>
                <h2 className="trust-heading">Businesses That Trust Us</h2>
                <p className="trust-subtitle">Helping companies worldwide send emails that actually get read.</p>
                <div className="trust-divider" />

                {/* Marquee */}
                <div className="trust-marquee-wrapper">
                    <div
                        className="trust-marquee-track"
                        style={{ animationDuration: `${duration}s` }}
                    >
                        {track.map((logo, i) => (
                            <div className="trust-pill" key={`${logo._id}-${i}`}>
                                {logo.logoUrl
                                    ? <img src={logo.logoUrl} alt={logo.name} className="trust-pill-img" />
                                    : <span className="trust-pill-name">{logo.name}</span>
                                }
                            </div>
                        ))}
                    </div>
                </div>

                    <div className="trust-stats-wrap">
                        <div className="trust-stats">
                            {STATS.map(s => (
                                <div className="trust-stat" key={s.label}>
                                    <div className="trust-stat-number"><span className="trust-stat-dot">•</span>{s.number}</div>
                                    <div className="trust-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                        <a
                            href="https://www.upwork.com/freelancers/~01e77f8c3283919883"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="trust-upwork-btn"
                        >
                            <svg width="15" height="15" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                                <path d="M24.75 17.542c-1.469 0-2.849-.61-4.081-1.638l.303-1.437.013-.066c.264-1.511 1.094-4.047 3.765-4.047 1.98 0 3.595 1.627 3.595 3.595 0 1.979-1.615 3.593-3.595 3.593zM24.75 8c-3.43 0-6.017 2.287-7.122 6.019-.838-1.548-1.459-3.414-1.838-4.985H12.9v5.967c0 1.905-.87 3.808-2.775 3.808-1.905 0-2.906-1.903-2.906-3.808l.011-5.967H4.25v5.967c0 3.748 1.95 6.722 5.875 6.722 3.925 0 5.918-3.15 5.918-6.906l-.003-.638c.35 1.104.831 2.276 1.438 3.293L15.56 26h2.97l1.123-5.447c1.203.813 2.593 1.301 4.097 1.301 3.748 0 6.75-3.027 6.75-6.75 0-3.722-3.002-6.104-5.75-6.104z"/>
                            </svg>
                            View Upwork Profile
                        </a>
                    </div>
            </div>
        </section>
    );
}
