'use client';

import Link from 'next/link';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                {/* Multi-color Logo */}
                <div className="navbar-brand">
                    <Link href="/">
                        <span className="brand-mail">Mail</span><span className="brand-stora">Stora</span>
                    </Link>
                </div>

                {/* Center Links */}
                <div className="navbar-links">
                    <Link href="#services" className="nav-link">Services</Link>
                    <Link href="#portfolio" className="nav-link">Portfolio</Link>
                    <Link href="#prices" className="nav-link">Pricing</Link>
                    <Link href="#process" className="nav-link">Process</Link>
                    <Link href="#contact" className="nav-link">Contact</Link>
                </div>

                {/* Right Actions */}
                <div className="navbar-actions">
                    <Link href="/quote" className="btn btn-primary nav-cta nav-cta-desktop">Get a Free Quote</Link>
                    {/* Hamburger */}
                    <button
                        className="nav-hamburger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="mobile-menu">
                    <Link href="#services" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Services</Link>
                    <Link href="#portfolio" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Portfolio</Link>
                    <Link href="#prices" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Pricing</Link>
                    <Link href="#process" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Process</Link>
                    <Link href="#contact" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
                    <Link href="/quote" className="btn btn-primary mobile-signup-btn" onClick={() => setMenuOpen(false)}>Get a Free Quote</Link>
                </div>
            )}
        </nav>
    );
}
