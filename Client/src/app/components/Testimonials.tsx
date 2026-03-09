import './Testimonials.css';

const testimonials = [
    {
        initial: "SM",
        name: "Sarah Mitchell",
        role: "Marketing Manager",
        company: "BrightSend Co.",
        review: "Rashed delivered a flawless HTML email template that worked perfectly in Outlook and Gmail. The code was clean and the delivery was fast. Highly recommended!",
        stars: 5,
    },
    {
        initial: "JO",
        name: "James O'Brien",
        role: "E-commerce Founder",
        company: "ShopNest",
        review: "Our newsletter open rates went up after switching to Rashed's templates. Everything renders perfectly across clients, even in the notoriously difficult Outlook 2016.",
        stars: 5,
    },
    {
        initial: "PN",
        name: "Priya Nair",
        role: "Head of Growth",
        company: "LaunchStack",
        review: "The email signatures are polished and consistent across our whole team. It's made our outreach look so much more professional. Quick turnaround too!",
        stars: 5,
    },
];

export default function Testimonials({ data = [] }: { data?: any[] }) {
    const displayItems = data.length > 0 ? data : testimonials;

    return (
        <section className="testimonials-section section">
            <div className="container">
                <div className="testimonials-header text-center">
                    <h2 className="section-title">What Clients Are Saying</h2>
                    <p className="section-subtitle">Real results from real businesses who trust Mailstora.</p>
                </div>

                <div className="testimonials-grid">
                    {displayItems.map((t, idx) => (
                        <div key={idx} className="testimonial-card">
                            {/* Quote mark decoration */}
                            <div className="testimonial-quote-mark">"</div>

                            {/* Stars */}
                            <div className="testimonial-stars">
                                {Array.from({ length: t.stars }).map((_, i) => (
                                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f97316" stroke="none">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                ))}
                            </div>

                            <p className="testimonial-review">{t.review}</p>

                            {/* Client info */}
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">{t.initial}</div>
                                <div className="testimonial-author-info">
                                    <p className="testimonial-name">{t.name}</p>
                                    <p className="testimonial-role">{t.role} · {t.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
