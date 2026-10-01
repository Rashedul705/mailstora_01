import Link from "next/link";
import "./HomeSections.css";

const POINTS = [
    { title: "Your brand, not ours", text: "Emails are delivered under your agency's name. We never contact or show work to your clients." },
    { title: "NDA on request", text: "Sign an NDA before the brief. Files, logins and client data stay private." },
    { title: "Built for your stack", text: "Templates ready for Klaviyo, Mailchimp, HubSpot, Salesforce Marketing Cloud and more." },
    { title: "Overflow and ongoing work", text: "One-off rush jobs or a steady monthly flow of templates, flows and fixes." },
];

/** White-label offer for agencies: a key buyer group for email development. */
export default function HomeAgencies() {
    return (
        <section className="hs-section" aria-labelledby="agencies-title" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#e2e8f0" }}>
            <div className="container" style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "center" }}>
                <div>
                    <p className="home-eyebrow">For Marketing Agencies</p>
                    <h2 id="agencies-title" className="hs-title hs-title--left" style={{ color: "#fff" }}>
                        White-Label Email Development <span>for Agencies</span>
                    </h2>
                    <p className="hs-subtitle hs-subtitle--left" style={{ color: "#cbd5e1" }}>
                        Add HTML email development and Klaviyo setup to your services without hiring. MailStora works as your
                        behind-the-scenes email team, so you can take on more clients and keep your margins.
                    </p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: "1.5rem" }}>
                        <Link href="/white-label-email-development/" className="home-btn-primary">White-Label Service</Link>
                        <Link href="/quote/" className="home-hero-btn home-hero-btn--ghost" style={{ color: "#fff", borderColor: "#fff" }}>Get Agency Pricing</Link>
                    </div>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                    {POINTS.map((p) => (
                        <li key={p.title} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "1.25rem" }}>
                            <h3 style={{ color: "#fff", fontSize: "1.05rem", margin: "0 0 0.4rem" }}>{p.title}</h3>
                            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "#cbd5e1" }}>{p.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
