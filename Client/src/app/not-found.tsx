import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFoundLogger from "./components/NotFoundLogger";
import "./components/HomeSections.css";

export const metadata = { title: "Page Not Found | MailStora", robots: { index: false } };

export default function NotFound() {
    return (
        <>
            <NotFoundLogger />
            <Navbar />
            <main className="main" style={{ padding: "7rem 1.5rem", textAlign: "center", background: "#fdfaf7" }}>
                <p className="home-eyebrow">Error 404</p>
                <h1 className="hs-title">This page could not be found</h1>
                <p className="hs-subtitle" style={{ maxWidth: 560, margin: "0 auto 2rem" }}>
                    The page may have moved. Try one of these instead.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
                    <Link href="/" className="home-btn-primary">Go to Homepage</Link>
                    <Link href="/services/" className="hs-btn-ghost">View Services</Link>
                    <Link href="/blog/" className="hs-btn-ghost">Read the Blog</Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
