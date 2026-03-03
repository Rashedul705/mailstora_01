'use client';

import Link from 'next/link';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                {/* Logo/Brand */}
                <div className="navbar-brand">
                    <Link href="/">MailStora</Link>
                </div>

                {/* Center Links (Hidden on mobile) */}
                <div className="navbar-links">
                    <Link href="#templates" className="nav-link">Templates</Link>
                    <Link href="#signatures" className="nav-link">Signatures</Link>
                    <Link href="#process" className="nav-link">Process</Link>
                    <Link href="#portfolio" className="nav-link">Portfolio</Link>
                </div>

                {/* Right Actions */}
                <div className="navbar-actions">
                    <Link href="#login" className="nav-link nav-login">Login</Link>
                    <Link href="#quote" className="btn btn-secondary nav-btn nav-signup-desktop">Sign Up</Link>
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

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="mobile-menu">
                    <Link href="#templates" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Templates</Link>
                    <Link href="#signatures" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Signatures</Link>
                    <Link href="#process" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Process</Link>
                    <Link href="#portfolio" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Portfolio</Link>
                    <Link href="#login" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
                    <Link href="#quote" className="btn btn-primary mobile-signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </div>
            )}
        </nav>
    );
}
