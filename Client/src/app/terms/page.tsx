import { pageMeta } from "@/lib/pageMeta";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import LegalLayout, { type LegalSection } from "../components/LegalLayout";
import { siteConfig } from "../../utils/siteConfig";

const { founder } = siteConfig;

const baseMetadata = (): Metadata => pageMeta("/terms/");

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata());
}

const SECTIONS = (): LegalSection[] => [
    {
        id: "agreement",
        title: "About These Terms",
        body: [
            `These terms apply when you use mailstora.com or hire MailStora, the HTML email development agency led by ${founder.name}. By requesting a quote or starting a project, you agree to them.`,
            "If you hire us through Upwork or another platform, that platform's terms also apply. Where they conflict, the platform's terms take priority for payment and disputes.",
        ],
    },
    {
        id: "services",
        title: "Our Services",
        body: [
            "We provide HTML email template development, design to HTML conversion, email testing and Outlook fixes, email signatures, Klaviyo flow setup, campaign management, ESP templates, Shopify development, social media management and white-label work for agencies.",
            "The exact deliverables, price and timeline for your project are set out in your quote. Anything not listed in the quote is outside the project scope.",
        ],
    },
    {
        id: "quotes-payment",
        title: "Quotes and Payment",
        body: [
            [
                "Quotes are free and valid for 30 days.",
                "Prices are in US dollars and are one-time fees unless a monthly package is agreed.",
                "We may ask for full or partial payment before work starts, depending on project size.",
                "Payments through Upwork follow Upwork's milestone and payment rules.",
                "Extra work outside the agreed scope is quoted separately before we start it.",
            ],
        ],
    },
    {
        id: "delivery",
        title: "Timelines and Delivery",
        body: [
            "Delivery times start when we have everything we need: final designs, copy, images, brand assets and any platform access.",
            "Most templates and signatures are delivered in 24 to 48 hours. Larger projects follow the timeline in your quote. Delays in feedback or materials from your side move the delivery date.",
        ],
    },
    {
        id: "revisions",
        title: "Revisions",
        body: [
            "Each package includes the number of revision rounds stated in your quote. A revision is a change to the agreed design or content, not a new design or new feature.",
            "Requests beyond the included rounds, or changes to an approved design, may be charged at our standard rate. We always confirm the cost first.",
        ],
    },
    {
        id: "client-responsibilities",
        title: "Your Responsibilities",
        body: [
            [
                "Provide accurate designs, copy and brand assets on time.",
                "Make sure you have the right to use every image, font, logo and piece of content you send us.",
                "Review and approve work within a reasonable time.",
                "Keep your email platform, domain and sending settings in good standing.",
                "Follow email laws such as CAN-SPAM and GDPR when you send emails built by us.",
            ],
        ],
    },
    {
        id: "ownership",
        title: "Ownership of Work",
        body: [
            "When your project is paid in full, you own the final HTML code and design files we deliver for your project, and you may use and change them as you wish.",
            "We keep the right to reuse general techniques, code patterns and know-how that are not specific to your brand.",
            "Unless you ask us not to, we may show finished work in our portfolio. For white-label and NDA projects, we never show or mention your work without written permission.",
        ],
    },
    {
        id: "platform-access",
        title: "Access to Your Platforms",
        body: [
            "For some projects you may give us access to Klaviyo, Mailchimp, HubSpot, Shopify or another platform. We only use that access for your project and never share it.",
            "You stay responsible for your account, subscribers and sends. Please remove our access when the project ends.",
        ],
    },
    {
        id: "warranty",
        title: "Testing and Warranty",
        body: [
            "We test every email in major email clients before delivery. If you find a rendering problem in a delivered email within 30 days, tell us and we will fix it free of charge.",
            "Email clients and platforms change their software without notice. We cannot guarantee that emails will look the same forever, or control changes made to the code by others after delivery.",
            "We do not guarantee specific open rates, clicks, sales, deliverability or follower growth, because these depend on factors outside our control.",
        ],
    },
    {
        id: "cancellation",
        title: "Cancellations and Refunds",
        body: [
            "You can cancel a project at any time. Work already completed is charged, and any unused prepayment for work not started is refunded.",
            "Once final files have been delivered and approved, payments are not refundable. Refunds for projects through Upwork follow Upwork's dispute process.",
        ],
    },
    {
        id: "liability",
        title: "Limitation of Liability",
        body: [
            "To the extent the law allows, our total liability for any claim related to a project is limited to the amount you paid for that project.",
            "We are not liable for indirect losses such as lost profits, lost data or problems caused by third-party platforms, email clients or hosting services.",
        ],
    },
    {
        id: "confidentiality",
        title: "Confidentiality",
        body: [
            "We keep your project information, files and business details confidential and use them only to deliver your project. An NDA is available on request.",
        ],
    },
    {
        id: "changes",
        title: "Changes and Contact",
        body: [
            "We may update these terms from time to time. The terms in effect when your project starts apply to that project.",
            `Questions about these terms: ${founder.email}.`,
        ],
    },
];

export default function TermsPage() {
    return (
        <LegalLayout
            title="Terms &"
            accent="Conditions"
            slug="terms"
            lead="The terms that apply when you use the MailStora website or hire us for an email project."
            updated="September 27, 2026"
            summary={[
                "Your quote sets the deliverables, price and timeline for your project.",
                "You own the final code and designs once the project is paid in full.",
                "Revision rounds are included; extra scope is quoted before we start.",
                "Rendering issues found within 30 days of delivery are fixed free.",
            ]}
            sections={SECTIONS()}
            related={{ label: "Read our Privacy Policy", href: "/privacy/" }}
        />
    );
}
