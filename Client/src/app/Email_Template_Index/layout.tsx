import type { Metadata } from "next";

// Internal file browser for template assets: keep out of search results
export const metadata: Metadata = {
    title: "Email Template Files | MailStora",
    robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
