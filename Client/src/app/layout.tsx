import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "./components/Analytics";
import SiteSchema from "./components/SiteSchema";
import CookieConsent from "./components/CookieConsent";
import SiteConfigInit from "./components/SiteConfigInit";
import PageEditsApplier from "./components/PageEditsApplier";
import { loadSiteSettings } from "@/lib/siteSettings";
import { siteConfig } from "../utils/siteConfig";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

type SeoSettings = {
  webmaster?: { google?: string; bing?: string; yandex?: string; pinterest?: string };
  analytics?: { ga4?: string; gtm?: string; clarity?: string; metaPixel?: string };
};

// Webmaster verification and tracking IDs come from Admin › SEO › Webmaster Tools
// Page Editor changes (Admin › Page Editor)
async function getPageEdits() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}/api/page-edits`, { next: { revalidate: 60 } });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

async function getSeoSettings(): Promise<SeoSettings> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}/api/seo/settings`, { next: { revalidate: 60 } });
    return res.ok ? await res.json() : {};
  } catch {
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { webmaster = {} } = await getSeoSettings();
  const other: Record<string, string> = {};
  if (webmaster.bing) other["msvalidate.01"] = webmaster.bing;
  if (webmaster.pinterest) other["p:domain_verify"] = webmaster.pinterest;
  return {
    metadataBase: new URL("https://mailstora.com"),
    title: "MailStora - Professional HTML Email Templates & Signatures",
    description: "Custom HTML Email Templates & Signatures. Responsive, tested, and compatible with Outlook, Gmail, and major email platforms.",
    // Favicon and touch icon come from app/icon.png and app/apple-icon.png (the M mark)
    verification: {
      ...(webmaster.google ? { google: webmaster.google } : {}),
      ...(webmaster.yandex ? { yandex: webmaster.yandex } : {}),
      ...(Object.keys(other).length ? { other } : {}),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ analytics = {} }, site, pageEdits] = await Promise.all([getSeoSettings(), loadSiteSettings(), getPageEdits()]);
  const hasTracking = Object.values(analytics).some(Boolean);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SiteSchema />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        {/^GTM-[A-Z0-9]{4,12}$/.test(analytics.gtm || "") && (
          // Google Tag Manager (noscript) for visitors with JavaScript turned off. The main GTM script loads in <Analytics> after cookie consent.
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${analytics.gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        )}
        <SiteConfigInit data={site} />
        {children}
        <PageEditsApplier all={pageEdits} />
        <a href={`https://wa.me/${siteConfig.founder.whatsapp}?text=Hi,%20I'm%20interested%20in%20your%20email%20template%20services`} target="_blank" rel="noopener noreferrer" className="floating-wa-btn" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span className="floating-wa-label">Chat on WhatsApp</span>
        </a>
        <CookieConsent enabled={hasTracking}>
          <Analytics ids={analytics} />
        </CookieConsent>
      </body>
    </html>
  );
}
