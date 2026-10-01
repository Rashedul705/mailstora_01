"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "../../utils/siteConfig";
import "./HomeSections.css";

const SERVICES = [
    ["template", "HTML Email Templates"],
    ["signature", "HTML Email Signatures"],
    ["klaviyo_flow", "Klaviyo Automation Flows"],
    ["esp_campaign", "Klaviyo & Mailchimp Campaigns"],
    ["shopify", "Shopify Store Development"],
    ["social_media", "Social Media Management"],
    ["other", "Other / Custom Request"],
];

const { founder } = siteConfig;

export default function HomeContact() {
    const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [error, setError] = useState("");

    const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setError("");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}/api/inquiries`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || "Failed to send message.");
            }
            setStatus("sent");
            setForm({ name: "", email: "", service: "", message: "" });
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        }
    };

    return (
        <section className="hs-section hs-contact" id="contact" aria-labelledby="contact-title">
            {/* Decorative floating icons: mail, Gmail, Outlook, send, @, inbox */}
            <div className="hs-contact-deco" aria-hidden="true">
                <svg className="d1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                <svg className="d2" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" /></svg>
                <svg className="d3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>
                <svg className="d4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" /></svg>
                <svg className="d5" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="13" height="16" rx="2" /><circle cx="8.5" cy="12" r="3.3" fill="#0b3b2c" /><path d="M16 7h6v10h-6z" opacity="0.6" /></svg>
                <svg className="d6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z" /></svg>
                <svg className="d7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
            </div>

            <div className="container hs-contact-inner">
                <div className="hs-contact-info">
                    <p className="home-eyebrow">Get in Touch</p>
                    <h2 id="contact-title" className="hs-title hs-title--left">
                        Let&apos;s Talk About <span>Your Project</span>
                    </h2>
                    <p className="hs-subtitle hs-subtitle--left">
                        Tell us what you need and get a reply from the founder, usually within 2 to 4 hours.
                    </p>

                    {/* Who replies: the founder */}
                    <div className="hs-contact-founder">
                        <Image src="/images/brand/rashedul-islam-founder.webp" alt={founder.name} width={64} height={64} />
                        <div>
                            <strong>{founder.name}</strong>
                            <span>Founder &amp; Lead Email Developer, MailStora</span>
                        </div>
                    </div>

                    <ul className="hs-contact-methods">
                        <li>
                            <a href={`https://wa.me/${founder.whatsapp}?text=Hi%2C%20I%27m%20interested%20in%20your%20services`} target="_blank" rel="noopener noreferrer">
                                <span className="hs-contact-icon hs-contact-icon--wa" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.05 2C6.5 2 2.07 6.43 2.07 11.97c0 1.76.46 3.48 1.34 5L2 22l5.17-1.36a9.9 9.9 0 0 0 4.87 1.25h.01c5.54 0 9.97-4.44 9.97-9.98A9.94 9.94 0 0 0 12.05 2zm5.8 14.12c-.25.69-1.43 1.32-2 1.4-.51.08-1.16.11-1.87-.12-.43-.13-.99-.32-1.7-.62-2.98-1.29-4.93-4.29-5.08-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.6.84 2.06.92 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.66 2.06 1.13 1.01 2.09 1.33 2.39 1.48.3.15.47.12.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.74.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.18 1.41z" /></svg>
                                </span>
                                <span>
                                    <strong>WhatsApp</strong>
                                    <small>Fastest reply</small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${founder.email}`}>
                                <span className="hs-contact-icon hs-contact-icon--mail" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                                </span>
                                <span>
                                    <strong>Email</strong>
                                    <small>{founder.email}</small>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href={founder.socials.upwork} target="_blank" rel="noopener noreferrer">
                                <span className="hs-contact-icon hs-contact-icon--up" aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor"><path d="M24.75 17.542c-1.469 0-2.849-.61-4.081-1.638l.303-1.437.013-.066c.264-1.511 1.094-4.047 3.765-4.047 1.98 0 3.595 1.627 3.595 3.595 0 1.979-1.615 3.593-3.595 3.593zM24.75 8c-3.43 0-6.017 2.287-7.122 6.019-.838-1.548-1.459-3.414-1.838-4.985H12.9v5.967c0 1.905-.87 3.808-2.775 3.808-1.905 0-2.906-1.903-2.906-3.808l.011-5.967H4.25v5.967c0 3.748 1.95 6.722 5.875 6.722 3.925 0 5.918-3.15 5.918-6.906l-.003-.638c.35 1.104.831 2.276 1.438 3.293L15.56 26h2.97l1.123-5.447c1.203.813 2.593 1.301 4.097 1.301 3.748 0 6.75-3.027 6.75-6.75 0-3.722-3.002-6.104-5.75-6.104z" /></svg>
                                </span>
                                <span>
                                    <strong>Upwork</strong>
                                    <small>Hire with Upwork protection</small>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="hs-contact-card">
                    {status === "sent" ? (
                        <div className="hs-contact-sent" role="status">
                            <h3>Message sent!</h3>
                            <p>Thanks for reaching out. You will get a reply within 2 to 4 hours.</p>
                            <button type="button" className="hs-btn-ghost" onClick={() => setStatus("idle")}>
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="hs-contact-form">
                            {status === "error" && <p className="hs-contact-error" role="alert">{error}</p>}
                            <div className="hs-field-row">
                                <label>
                                    <span>Name</span>
                                    <input name="name" required value={form.name} onChange={update} placeholder="Your name" autoComplete="name" />
                                </label>
                                <label>
                                    <span>Email</span>
                                    <input name="email" type="email" required value={form.email} onChange={update} placeholder="you@company.com" autoComplete="email" />
                                </label>
                            </div>
                            <label>
                                <span>Service needed</span>
                                <select name="service" required value={form.service} onChange={update}>
                                    <option value="" disabled>Select a service</option>
                                    {SERVICES.map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <span>Project details</span>
                                <textarea name="message" rows={5} required value={form.message} onChange={update} placeholder="Tell us about your project, platform and timeline" />
                            </label>
                            <button type="submit" className="home-btn-primary hs-contact-submit" disabled={status === "sending"}>
                                {status === "sending" ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
