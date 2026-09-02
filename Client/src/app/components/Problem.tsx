import './Problem.css';

const problems = [
    {
        emoji: '💔',
        iconBg: '#EDE9FE',      // soft lavender
        title: 'Emails Break in\nOutlook',
        desc: 'Your beautifully designed template looks completely broken in Outlook 2016, 2019, and 365.',
    },
    {
        emoji: '💼',
        iconBg: '#D1FAE5',      // soft green
        title: 'Signatures That\nLook Amateur',
        desc: "Generic email signatures that look unpolished in clients' inboxes hurt your brand credibility every single email.",
    },
    {
        emoji: '🔧',
        iconBg: '#FCE7F3',      // soft pink
        title: 'Campaigns That\nMiss the Brand',
        desc: 'Drag-and-drop builders never produce the same result as a hand-coded template when imported into Klaviyo or Mailchimp.',
    },
    {
        emoji: '🔄',
        iconBg: '#DBEAFE',      // soft blue
        title: 'Flows Nobody\nSet Up Right',
        desc: 'Half-finished automation means abandoned carts and new subscribers never hear from you at the moment that actually matters.',
    },
    {
        emoji: '🛍️',
        iconBg: '#FEF3C7',      // soft amber
        title: "Shopify Stores\nThat Don't Convert",
        desc: "A store that loads slow or looks generic loses the sale before someone even reaches checkout.",
    },
    {
        emoji: '📉',
        iconBg: '#F3E8FF',      // soft purple
        title: 'Feeds That\nGo Quiet',
        desc: 'An inconsistent posting schedule kills reach and makes a brand look inactive, even when the business behind it is thriving.',
    }
];

export default function Problem() {
    return (
        <section className="problem-section" id="problem">
            <div className="problem-container">
                <div className="problem-header">
                    <h2 className="problem-heading">
                        Every Piece Looks Fine On Its Own...<br />
                        <span className="problem-heading-accent">Until You Try to Make It Work Together?</span>
                    </h2>
                    <p className="problem-subtitle">
                        A broken template, a flow that never fires, a store that doesn't convert, or a feed nobody's posted to in weeks — each one quietly costs you customers. Skip the patchwork of freelancers and get every piece built to work as one system.
                    </p>
                </div>

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
        </section>
    );
}
