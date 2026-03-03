import Image from "next/image";
import "./Hero.css";

export default function Hero() {
    return (
        <section className="hero section">
            <div className="container hero-container">
                <div className="hero-content">
                    <h2 className="hero-title">
                        Custom HTML Email Templates That Never Break in Outlook
                    </h2>
                    <p className="hero-subtitle">
                        Stop losing engagement due to broken formatting. Get responsive, perfectly rendered email templates and professional signatures built for real-world email clients.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary">Get a Free Quote</button>
                        <button className="btn btn-secondary">View Portfolio</button>
                    </div>
                    <p className="hero-trust">Tested in Outlook, Gmail, Apple Mail, Klaviyo & HubSpot</p>
                </div>
                <div className="hero-image-wrapper">
                    <div className="hero-image-inner">
                        <Image
                            src="/mockup.png"
                            alt="Professional Email Template Mockup"
                            width={600}
                            height={500}
                            className="hero-image"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
