import Image from "next/image";
import "./Portfolio.css";

const items = [
    { type: "Email Template", title: "SaaS Welcome Email", tag: "SaaS" },
    { type: "Email Template", title: "E-commerce Newsletter", tag: "E-commerce" },
    { type: "Email Signature", title: "Corporate Email Signature", tag: "Corporate" },
    { type: "Email Template", title: "Event Invitation Template", tag: "Event" },
];

export default function Portfolio() {
    return (
        <section className="portfolio-section section section-alt" id="portfolio">
            <div className="container">
                <div className="portfolio-header text-center">
                    <h2 className="section-title">Recent Work That Delivers Results</h2>
                    <p className="section-subtitle">Real templates built for real businesses, hand-coded and tested.</p>
                </div>

                <div className="portfolio-grid">
                    {items.map((item, idx) => (
                        <div key={idx} className="portfolio-item">
                            <div className="portfolio-image-wrapper">
                                <Image
                                    src="/mockup.png"
                                    alt={item.title}
                                    width={400}
                                    height={250}
                                    className="portfolio-img"
                                />
                                <div className="portfolio-overlay">
                                    <a href="#contact" className="portfolio-view-btn">View Details →</a>
                                </div>
                            </div>
                            <div className="portfolio-content">
                                <span className="portfolio-type">{item.type}</span>
                                <h3 className="portfolio-title">{item.title}</h3>
                                <span className="portfolio-tag">{item.tag}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="portfolio-action text-center">
                    <a href="#contact" className="btn btn-primary">See Full Portfolio</a>
                </div>
            </div>
        </section>
    );
}
