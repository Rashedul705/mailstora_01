import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Terms from "../components/Terms";

export default function TermsPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <Terms />
            </div>
            <Footer />
        </main>
    );
}
