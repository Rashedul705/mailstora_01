import './Problem.css';

export default function Problem() {
    const problems = [
        {
            title: "Email Designs Break in Outlook",
            desc: "Tables collapse, fonts swap, and images disappear – costing you credibility on every send.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    <line x1="3" y1="3" x2="21" y2="21"></line>
                </svg>
            )
        },
        {
            title: "Layout Not Mobile Responsive",
            desc: "Over 60% of emails are opened on mobile. A broken layout kills your click-through rate.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    <path d="M9 7h6"></path>
                    <path d="M9 11h3"></path>
                    <path d="M14 11h1"></path>
                    <path d="M9 15h4"></path>
                </svg>
            )
        },
        {
            title: "Import Issues in Mailchimp or Klaviyo",
            desc: "Pasting raw HTML into ESPs introduces render bugs that only surface after you hit send.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            )
        },
        {
            title: "Unprofessional Email Signatures",
            desc: "Inconsistent team signatures make your brand look disorganized to every client and prospect.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
            )
        },
    ];

    return (
        <section className="problem-section" id="problem">
            <div className="container">
                <div className="problem-header">
                    <h2 className="problem-section-title">Tired of Emails That Look Perfect… Until You Send Them?</h2>
                    <p className="problem-section-subtitle">
                        You spend hours designing an email. It looks perfect in your browser. Then it breaks in Outlook.
                        The layout shifts on mobile. Your branding looks inconsistent.
                        <br /><br />
                        That's not just frustrating, it costs you credibility and conversions.
                    </p>
                </div>

                <div className="problem-grid">
                    {problems.map((problem, idx) => (
                        <div key={idx} className="problem-card">
                            <div className="problem-icon">
                                {problem.icon}
                            </div>
                            <h3 className="problem-title">{problem.title}</h3>
                            <p className="problem-desc">{problem.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
