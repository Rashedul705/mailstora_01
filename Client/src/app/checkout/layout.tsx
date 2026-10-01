import type { Metadata } from "next";

// Payment step for accepted quotes: not a search landing page
export const metadata: Metadata = {
    title: "Checkout | MailStora",
    robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
