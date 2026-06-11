import './Problem.css';

const problems = [
    {
        emoji: '💔',
        iconBg: '#EDE9FE',      // soft lavender
        title: 'Emails Break in\nOutlook',
        desc: 'Your beautifully designed template looks completely broken in Outlook 2016, 2019, and 365.',
    },
    {
        emoji: '📱',
        iconBg: '#FEF3C7',      // soft amber
        title: 'Not Mobile\nResponsive',
        desc: 'Over 60% of emails are opened on mobile. Non-responsive templates lose more than half your audience.',
    },
    {
        emoji: '🔧',
        iconBg: '#FCE7F3',      // soft pink
        title: 'Importing into\nESPs',
        desc: 'Drag-and-drop builders never produce the same result as a hand-coded template when imported into Klaviyo or Mailchimp.',
    },
    {
        emoji: '💼',
        iconBg: '#D1FAE5',      // soft green
        title: 'Unprofessional\nSignatures',
        desc: "Generic email signatures that look amateurish in clients' inboxes hurt your brand credibility every single email.",
    },
];

export default function Problem() {
    return (
        <section className="problem-section" id="problem">
            <div className="problem-container problem-split-layout">

                {/* Left Column: Title and info */}
                <div className="problem-info-col">
                    <div className="problem-badge">
                        <span>🧠</span> THE PROBLEM
                    </div>
                    <h2 className="problem-heading">
                        Tired of Emails That Look Perfect…<br />
                        <span className="problem-heading-accent">Until You Send Them?</span>
                    </h2>
                    <p className="problem-subtitle">
                        A broken email is a lost customer. Skip the rendering headaches and get custom templates
                        that actually work on every screen, every time.
                    </p>
                </div>

                {/* Right Column: Grid of Cards */}
                <div className="problem-grid-col">
                    <div className="problem-grid">
                        {problems.map((p, i) => (
                            <div className="problem-card" key={i}>
                                <div
                                    className="problem-icon-wrap"
                                    style={{ background: p.iconBg }}
                                >
                                    <span className="problem-emoji">{p.emoji}</span>
                                </div>

                                <h3 className="problem-card-title">
                                    {p.title.split('\n').map((line, j) => (
                                        <span key={j}>{line}{j < p.title.split('\n').length - 1 && <br />}</span>
                                    ))}
                                </h3>

                                <p className="problem-card-desc">{p.desc}</p>

                                <div className="problem-check">
                                    <svg viewBox="0 0 20 20" fill="none">
                                        <circle cx="10" cy="10" r="10" fill="#D1FAE5" />
                                        <path d="M6 10.5l3 3 5-5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
