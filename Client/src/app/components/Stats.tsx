import './Stats.css';

export default function Stats() {
    const stats = [
        { value: "3+", label: "Years Experience" },
        { value: "400+", label: "Templates Developed" },
        { value: "15,000+", label: "Upwork Hours" },
        { value: "100%", label: "Cross-Client Compatibility Tested" },
    ];

    return (
        <section className="stats-section section-alt">
            <div className="container">
                <div className="stats-header text-center">
                    <h2 className="section-title">Trusted by Businesses Worldwide</h2>
                </div>
                <div className="stats-grid">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="stat-item">
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <div className="stats-footer">
                    <a
                        href="https://www.upwork.com/freelancers/~01e77f8c3283919883"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="upwork-link"
                    >
                        View Profile on Upwork
                    </a>
                </div>
            </div>
        </section>
    );
}
