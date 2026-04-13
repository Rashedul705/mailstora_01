import './Trust.css';

export default function Trust({ data = [] }: { data?: any[] }) {
    if (!data || data.length === 0) {
        return null; // hide section if no logos configured
    }

    return (
        <section className="trust-section">
            <div className="container">
                <h2 className="trust-title">Businesses That Trust Us</h2>
                <div className="trust-carousel-container">
                    <button className="carousel-btn prev" aria-label="Previous">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    
                    <div className="trust-logos">
                        {data.map((partner, idx) => (
                            <div key={idx} className="trust-logo-item">
                                <img src={partner.image_url} alt={partner.name} className="partner-logo-img" />
                            </div>
                        ))}
                    </div>

                    <button className="carousel-btn next" aria-label="Next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
