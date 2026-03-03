import Image from "next/image";
import "./Portfolio.css";

export default function Portfolio() {
    const items = [
        { type: "Email Template", title: "SaaS Welcome Email" },
        { type: "Email Template", title: "E-commerce Newsletter" },
        { type: "Email Signature", title: "Corporate Standard" },
        { type: "Email Template", title: "Event Invitation" },
    ];

    return (
        <section className="portfolio-section section section-alt">
            <div className="container">
                <div className="portfolio-header text-center">
                    <h2 className="section-title">Recent Work That Delivers Results</h2>
                    <p className="section-subtitle">Real templates built for real businesses.</p>
                </div>

                <div className="portfolio-grid">
                    {items.map((item, idx) => (
                        <div key={idx} className="portfolio-item">
                            <div className="portfolio-image-placeholder">
                                <Image
                                    src="/mockup.png"
                                    alt={item.title}
                                    width={400}
                                    height={250}
                                    className="portfolio-img"
                                />
                            </div>
                            <div className="portfolio-content">
                                <span className="portfolio-type">{item.type}</span>
                                <h3 className="portfolio-title">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="portfolio-action text-center">
                    <button className="btn btn-primary">See Full Portfolio</button>
                </div>
            </div>
        </section>
    );
}
