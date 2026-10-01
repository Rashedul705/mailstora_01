"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../../utils/siteConfig";
import { RESOURCE_LINKS, SERVICE_GROUPS } from "./navData";
import "./Navbar.css";

type Menu = "services" | "resources" | null;

const Chevron = () => (
    <svg className="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12.05 2C6.5 2 2.07 6.43 2.07 11.97c0 1.76.46 3.48 1.34 5L2 22l5.17-1.36a9.9 9.9 0 0 0 4.87 1.25h.01c5.54 0 9.97-4.44 9.97-9.98A9.94 9.94 0 0 0 12.05 2zm5.8 14.12c-.25.69-1.43 1.32-2 1.4-.51.08-1.16.11-1.87-.12-.43-.13-.99-.32-1.7-.62-2.98-1.29-4.93-4.29-5.08-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.6.84 2.06.92 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.66 2.06 1.13 1.01 2.09 1.33 2.39 1.48.3.15.47.12.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.74.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.18 1.41z" />
    </svg>
);

export default function Navbar() {
    const [open, setOpen] = useState<Menu>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSection, setMobileSection] = useState<Menu>(null);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
        const onClick = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("keydown", onKey);
        document.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("scroll", onScroll);
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("click", onClick);
        };
    }, []);

    // Hover opens on desktop, with a short delay before closing so the pointer can reach the panel
    const enter = (m: Menu) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(m);
    };
    const leave = () => {
        closeTimer.current = setTimeout(() => setOpen(null), 150);
    };
    const closeAll = () => {
        setOpen(null);
        setMobileOpen(false);
    };

    const wa = `https://wa.me/${siteConfig.founder.whatsapp}?text=Hi%2C%20I%27m%20interested%20in%20your%20email%20template%20services`;

    return (
        <header className={`site-header${scrolled ? " is-scrolled" : ""}`} ref={navRef}>
            <nav className="container site-nav" aria-label="Main">
                <Link href="/" className="site-logo" onClick={closeAll}>
                    <Image src="/images/brand/mailstora-logo-2026.webp" alt="MailStora" width={190} height={35} priority />
                </Link>

                <ul className="site-menu">
                    <li onMouseEnter={() => enter("services")} onMouseLeave={leave}>
                        <button
                            type="button"
                            className={`site-menu-link${open === "services" ? " is-open" : ""}`}
                            aria-expanded={open === "services"}
                            aria-controls="mega-services"
                            onClick={() => setOpen(open === "services" ? null : "services")}
                        >
                            Services <Chevron />
                        </button>
                        <div id="mega-services" className={`mega${open === "services" ? " is-open" : ""}`}>
                            <div className="mega-inner">
                                {SERVICE_GROUPS.map((g) => (
                                    <div key={g.title} className="mega-col">
                                        <p className="mega-title">{g.title}</p>
                                        <ul>
                                            {g.links.map((l) => (
                                                <li key={l.href}>
                                                    <Link href={l.href} className="mega-link" onClick={closeAll}>
                                                        <span>{l.label}</span>
                                                        {l.desc && <small>{l.desc}</small>}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                <div className="mega-promo">
                                    <p className="mega-promo-eyebrow">Free Quote in 24 Hours</p>
                                    <p className="mega-promo-title">Custom HTML emails from $40</p>
                                    <p className="mega-promo-text">Hand-coded, tested in 50+ email clients and ready for your ESP.</p>
                                    <Link href="/quote/" className="mega-promo-btn" onClick={closeAll}>
                                        Get a Free Quote
                                    </Link>
                                    <Link href="/services/" className="mega-promo-all" onClick={closeAll}>
                                        View all services
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link href="/pricing/" className="site-menu-link">Pricing</Link>
                    </li>
                    <li>
                        <Link href="/portfolio/" className="site-menu-link">Portfolio</Link>
                    </li>
                    <li>
                        <Link href="/reviews/" className="site-menu-link site-menu-link--highlight">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                            </svg>
                            Client Reviews
                        </Link>
                    </li>
                    <li onMouseEnter={() => enter("resources")} onMouseLeave={leave} className="site-menu-rel">
                        <button
                            type="button"
                            className={`site-menu-link${open === "resources" ? " is-open" : ""}`}
                            aria-expanded={open === "resources"}
                            aria-controls="menu-resources"
                            onClick={() => setOpen(open === "resources" ? null : "resources")}
                        >
                            Company <Chevron />
                        </button>
                        <div id="menu-resources" className={`dropdown${open === "resources" ? " is-open" : ""}`}>
                            {RESOURCE_LINKS.map((l) => (
                                <Link key={l.href} href={l.href} className="mega-link" onClick={closeAll}>
                                    <span>{l.label}</span>
                                    {l.desc && <small>{l.desc}</small>}
                                </Link>
                            ))}
                        </div>
                    </li>
                    <li>
                        <Link href="/contact/" className="site-menu-link">Contact</Link>
                    </li>
                </ul>

                <div className="site-actions">
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="site-wa" aria-label="Chat on WhatsApp">
                        <WhatsAppIcon />
                        <span>WhatsApp</span>
                    </a>
                    <Link href="/quote/" className="site-cta">
                        Get a Free Quote
                    </Link>
                    <button
                        type="button"
                        className={`site-burger${mobileOpen ? " is-open" : ""}`}
                        aria-label="Menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>

            {/* Mobile menu: accordions for services and resources */}
            <div id="mobile-menu" className={`site-mobile${mobileOpen ? " is-open" : ""}`}>
                <div className="container">
                    <button type="button" className="site-mobile-toggle" aria-expanded={mobileSection === "services"} onClick={() => setMobileSection(mobileSection === "services" ? null : "services")}>
                        Services <Chevron />
                    </button>
                    {mobileSection === "services" &&
                        SERVICE_GROUPS.map((g) => (
                            <div key={g.title} className="site-mobile-group">
                                <p>{g.title}</p>
                                {g.links.map((l) => (
                                    <Link key={l.href} href={l.href} onClick={closeAll}>
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    <Link href="/pricing/" className="site-mobile-link" onClick={closeAll}>Pricing</Link>
                    <Link href="/portfolio/" className="site-mobile-link" onClick={closeAll}>Portfolio</Link>
                    <Link href="/reviews/" className="site-mobile-link site-mobile-link--highlight" onClick={closeAll}>Client Reviews ★</Link>
                    <button type="button" className="site-mobile-toggle" aria-expanded={mobileSection === "resources"} onClick={() => setMobileSection(mobileSection === "resources" ? null : "resources")}>
                        Company <Chevron />
                    </button>
                    {mobileSection === "resources" && (
                        <div className="site-mobile-group">
                            {RESOURCE_LINKS.map((l) => (
                                <Link key={l.href} href={l.href} onClick={closeAll}>
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    )}
                    <Link href="/contact/" className="site-mobile-link" onClick={closeAll}>Contact</Link>
                    <Link href="/quote/" className="site-cta site-mobile-cta" onClick={closeAll}>Get a Free Quote</Link>
                </div>
            </div>
        </header>
    );
}
