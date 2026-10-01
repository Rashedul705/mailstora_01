import { siteConfig } from "../../utils/siteConfig";
import "./HomeSections.css";
import "./service/ServicePage.css";

const line = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

const STEPS = () => [
    {
        title: "Share Your Requirements",
        text: "Send your design, brand guide or brief, and get a clear quote within 24 hours.",
        icon: <svg {...line}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>,
    },
    {
        title: "We Develop & Test",
        text: "Your emails are hand-coded, then tested in 50+ email clients, devices and dark mode.",
        icon: <svg {...line}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>,
    },
    {
        title: "You Review",
        text: "Check the work and request changes. Revision rounds are included in every package.",
        icon: <svg {...line}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>,
    },
    {
        title: "Final Delivery",
        text: `Get ESP-ready files in ${siteConfig.stats.turnaround}, set up in Klaviyo, Mailchimp or HubSpot if you need.`,
        icon: <svg {...line}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>,
    },
];

/** "How MailStora Works": four-step process, shared styling with the service pages. */
export default function HomeProcess() {
    return (
        <section className="svc svc-section svc-process" aria-labelledby="home-process-title">
            <div className="container">
                <header className="hs-header">
                    <p className="home-eyebrow">How MailStora Works</p>
                    <h2 id="home-process-title" className="hs-title">
                        A Simple, Transparent <span>Email Development Process</span>
                    </h2>
                    <p className="hs-subtitle">From brief to inbox-ready email in four clear steps, with direct access to the developer throughout.</p>
                </header>
                <ol className="svc-steps">
                    {STEPS().map((s, i) => (
                        <li key={s.title} className={i % 2 ? "is-green" : "is-orange"}>
                            <span className="svc-step-icon" aria-hidden="true">{s.icon}</span>
                            <span className="svc-step-num">{String(i + 1).padStart(2, "0")}</span>
                            <h3>{s.title}</h3>
                            <p>{s.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
