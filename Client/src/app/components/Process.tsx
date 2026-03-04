import './Process.css';

export default function Process() {
    const steps = [
        { num: "01", title: "Share Idea & Needs", desc: "Have a ready design? Great! If not, no problem—just share your idea and needs, and I'll handle the design for you." },
        { num: "02", title: "I Code & Test", desc: "Your email is hand-coded and tested across major clients." },
        { num: "03", title: "You Review", desc: "Request changes if needed." },
        { num: "04", title: "Final Delivery", desc: "Clean HTML files ready for immediate deployment." },
    ];

    return (
        <section className="process-section section">
            <div className="container">
                <div className="process-header text-center">
                    <h2 className="section-title">A Simple, Transparent Process</h2>
                </div>

                <div className="process-steps">
                    {steps.map((step, idx) => (
                        <div key={idx} className="process-step">
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
