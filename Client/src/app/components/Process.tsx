import './Process.css';

const steps = [
    {
        num: "01",
        title: "Share Your Design",
        desc: "Send your Figma, PSD, or design brief. No design? Just share your idea and I'll handle the creative direction.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
        ),
    },
    {
        num: "02",
        title: "I Code & Test the Email",
        desc: "Your email is hand-coded in clean HTML/CSS and rigorously tested across 30+ clients including Outlook, Gmail, and Apple Mail.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        num: "03",
        title: "You Review & Request Changes",
        desc: "Preview the template and request any revisions. Your satisfaction is guaranteed before final delivery.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
    {
        num: "04",
        title: "Final Delivery",
        desc: "Receive clean, production-ready HTML files ready to import into any email platform and launch immediately.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
        ),
    },
];

export default function Process() {
    return (
        <section className="process-section section" id="process">
            <div className="container">
                <div className="process-header text-center">
                    <h2 className="section-title">A Simple, Transparent Process</h2>
                    <p className="section-subtitle">From design to delivery, clear steps, zero surprises.</p>
                </div>

                <div className="process-steps">
                    {steps.map((step, idx) => (
                        <div key={idx} className="process-step">
                            <div className="step-icon-wrapper">
                                <div className="step-icon">{step.icon}</div>
                            </div>
                            <div className="step-number">{step.num}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.desc}</p>
                            {idx < steps.length - 1 && (
                                <div className="step-connector"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
