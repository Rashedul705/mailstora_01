import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Privacy from "../components/Privacy";

export default function PrivacyPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <Privacy />
            </div>
            <Footer />
        </main>
    );
}
