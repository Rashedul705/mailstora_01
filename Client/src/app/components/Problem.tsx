import './Problem.css';

export default function Problem() {
    const problems = [
        {
            title: "Email Designs Break in Outlook",
            desc: "Tables collapse, fonts swap, and images disappear – costing you credibility on every send.",
        },
        {
            title: "Layout Not Mobile Responsive",
            desc: "Over 60% of emails are opened on mobile. A broken layout kills your click-through rate.",
        },
        {
            title: "Import Issues in Mailchimp or Klaviyo",
            desc: "Pasting raw HTML into ESPs introduces render bugs that only surface after you hit send.",
        },
        {
            title: "Unprofessional Email Signatures",
            desc: "Inconsistent team signatures make your brand look disorganized to every client and prospect.",
        },
    ];

    return (
        <section className="problem-section section section-alt">
            <div className="container">
                <div className="problem-header">
                    <h2 className="section-title">Tired of Emails That Look Perfect… Until You Send Them?</h2>
                    <p className="section-subtitle">
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
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
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
