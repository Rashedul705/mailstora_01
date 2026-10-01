import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "../components/LegalLayout";
import { siteConfig } from "../../utils/siteConfig";

const { founder } = siteConfig;

const baseMetadata = (): Metadata => pageMeta("/privacy/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

const SECTIONS = (): LegalSection[] => [
    {
        id: "who-we-are",
        title: "Who We Are",
        body: [
            `MailStora ("we", "us") is an HTML email development agency led by ${founder.name}. We build email templates, email signatures, Klaviyo automation and related services for businesses and agencies.`,
            `This policy explains how we handle personal information when you visit mailstora.com, contact us or work with us. For any privacy question, email ${founder.email}.`,
        ],
    },
    {
        id: "information-we-collect",
        title: "Information We Collect",
        body: [
            "We collect only the information we need to answer you and deliver your project:",
            [
                "Contact details you send us: name, email address, company and phone or WhatsApp number.",
                "Project details: your message, selected service, briefs, design files (Figma, PSD, PDF), brand assets and email content.",
                "Booking details when you schedule a consultation, such as your preferred date and time zone.",
                "Account access you choose to give us for a project, such as a user login to Klaviyo, Mailchimp, HubSpot or Shopify.",
                "Basic technical data sent by your browser, such as IP address, browser type and pages visited, used to keep the site secure and working.",
            ],
            "We do not collect payment card details on this website. Payments made through Upwork or other payment providers are handled by those providers.",
        ],
    },
    {
        id: "how-we-use",
        title: "How We Use Your Information",
        body: [
            [
                "To reply to enquiries and send quotes.",
                "To plan, build, test and deliver your email project.",
                "To send project updates, invoices and support messages.",
                "To schedule and hold consultations you request.",
                "To keep the website secure and fix technical problems.",
            ],
            "We do not sell your personal information, and we do not add you to marketing lists without your permission.",
        ],
    },
    {
        id: "client-files",
        title: "Client Files, Designs and Email Data",
        body: [
            "Design files, brand assets and email content you share are used only for your project. We do not share them with other clients.",
            "When we work inside your email platform, we only access what the project needs. We do not export, copy or use your subscriber lists or customer data for any other purpose.",
            "Please remove our access to your accounts when a project ends. We are happy to confirm when we have stopped using any login you provided.",
            "Images used in finished emails may be hosted on an image service so they load for your subscribers. These images are public by design, so do not include private information in them.",
        ],
    },
    {
        id: "sharing",
        title: "Service Providers We Use",
        body: [
            "We use a small number of trusted services to run the website and deliver projects. They process data only to provide their service to us:",
            [
                "Website and database hosting, to store enquiries and bookings.",
                "Email delivery, to send replies, confirmations and project messages.",
                "Image hosting, for images used in email templates.",
                "Communication tools you choose, such as WhatsApp, email and Upwork.",
            ],
            "We may disclose information if the law requires it, or to protect our rights and the safety of others.",
        ],
    },
    {
        id: "cookies",
        title: "Cookies",
        body: [
            "The public website uses only the cookies needed for it to work, such as keeping the admin area secure. We do not use advertising cookies.",
            "If we add analytics or other optional cookies in the future, we will update this policy and ask for your consent where the law requires it.",
        ],
    },
    {
        id: "retention",
        title: "How Long We Keep Data",
        body: [
            "We keep enquiries and project records for as long as needed to provide the service, handle support and meet legal and accounting duties, and then delete them.",
            "You can ask us to delete your enquiry or project files at any time, unless we must keep them by law.",
        ],
    },
    {
        id: "security",
        title: "How We Protect Data",
        body: [
            "We use secure connections (HTTPS), password-protected systems and limited access to protect your information.",
            "No online system is completely secure, so we cannot guarantee absolute security, but we act quickly if a problem occurs.",
        ],
    },
    {
        id: "your-rights",
        title: "Your Rights",
        body: [
            "Depending on where you live, including under the GDPR in the UK and EU and privacy laws in the United States, you may have the right to:",
            [
                "Access the personal information we hold about you.",
                "Correct information that is wrong or incomplete.",
                "Ask us to delete your information.",
                "Object to or limit how we use it.",
                "Receive a copy of your information in a portable format.",
            ],
            `To use any of these rights, email ${founder.email}. We reply within 30 days.`,
        ],
    },
    {
        id: "international",
        title: "International Transfers",
        body: [
            "We work remotely with clients worldwide, so your information may be processed in countries other than your own. We use reputable service providers and take reasonable steps to protect your data wherever it is processed.",
        ],
    },
    {
        id: "children",
        title: "Children's Privacy",
        body: ["Our services are for businesses. We do not knowingly collect information from anyone under 16."],
    },
    {
        id: "changes",
        title: "Changes and Contact",
        body: [
            "We may update this policy when our services or the law change. The date at the top shows the latest version.",
            `Questions or requests: ${founder.email}.`,
        ],
    },
];

export default function PrivacyPage() {
    return (
        <LegalLayout
            title="Privacy"
            accent="Policy"
            slug="privacy"
            lead="How MailStora collects, uses and protects your information when you visit our website or work with us."
            updated="September 27, 2026"
            summary={[
                "We collect only what we need to answer you and deliver your project.",
                "We never sell your data or add you to marketing lists without permission.",
                "Your designs, files and subscriber data are used only for your project.",
                "You can ask to see, correct or delete your data at any time.",
            ]}
            sections={SECTIONS()}
            related={{ label: "Read our Terms & Conditions", href: "/terms/" }}
        />
    );
}
