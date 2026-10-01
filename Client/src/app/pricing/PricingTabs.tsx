"use client";

import { useState } from "react";
import Link from "next/link";

type Feature = { text: string; included?: boolean; order?: number };
type Plan = {
    _id: string;
    name: string;
    label?: string;
    badgeText?: string;
    description?: string;
    price: string;
    priceUnit?: string;
    features?: Feature[];
    ctaText?: string;
    isPopular?: boolean;
    isVisible?: boolean;
    sortOrder?: number;
};
export type PricingData = Record<string, unknown> & { settings?: Record<string, unknown> };

const TABS = [
    { id: "template", label: "Email Templates", setting: "showTemplateTab", service: "HTML Email Templates" },
    { id: "signature", label: "Email Signatures", setting: "showSignatureTab", service: "HTML Email Signatures" },
    { id: "klaviyo_flow", label: "Klaviyo Flows", setting: "showKlaviyoFlowTab", service: "Klaviyo Flow Setup" },
    { id: "esp_campaign", label: "Email Campaigns", setting: "showEspCampaignTab", service: "Klaviyo & Mailchimp Campaigns" },
    { id: "shopify", label: "Shopify", setting: "showShopifyTab", service: "Shopify Store Development" },
    { id: "social_media", label: "Social Media", setting: "showSocialMediaTab", service: "Social Media Management" },
];

const isNumber = (p: string) => /^\d+(\.\d+)?$/.test(p);

/** Pricing plans by service, loaded from the pricing API and editable in Admin. */
export default function PricingTabs({ data }: { data: PricingData | null }) {
    const settings = (data?.settings ?? {}) as Record<string, unknown>;
    const tabs = TABS.filter((t) => settings[t.setting] !== false);
    const [active, setActive] = useState<string>((settings.defaultTab as string) || tabs[0]?.id || "template");

    const tab = tabs.find((t) => t.id === active) ?? tabs[0];
    const plans = ((data?.[tab.id] as Plan[]) ?? [])
        .filter((p) => p.isVisible !== false)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    return (
        <div className="pr-tabs-wrap">
            <div className="pr-tabs" role="tablist" aria-label="Service">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={t.id === tab.id}
                        className={t.id === tab.id ? "is-active" : ""}
                        onClick={() => setActive(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {plans.length > 0 ? (
                <ul className={`pr-plans pr-plans--${Math.min(plans.length, 3)}`} role="tabpanel">
                    {plans.map((p) => {
                        const popular = Boolean(p.isPopular);
                        const features = (p.features ?? []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                        const priced = isNumber(p.price);
                        return (
                            <li key={p._id} className={`pr-plan${popular ? " pr-plan--popular" : ""}`}>
                                {popular && <span className="pr-badge">{p.badgeText || "Most Popular"}</span>}
                                <p className="pr-label">{p.label || p.name}</p>
                                <h3>{p.name}</h3>
                                {p.description && <p className="pr-desc">{p.description}</p>}
                                <p className="pr-price">
                                    {priced ? <><sup>$</sup>{p.price}</> : p.price}
                                    {priced && p.priceUnit && <span>{p.priceUnit}</span>}
                                </p>
                                <Link
                                    href={`/quote/?service=${encodeURIComponent(`${tab.service}: ${p.name}`)}`}
                                    className={popular ? "pr-cta pr-cta--solid" : "pr-cta"}
                                >
                                    {priced ? "Get Started" : "Request a Quote"}
                                </Link>
                                <ul className="pr-features">
                                    {features.map((f) => (
                                        <li key={f.text} className={f.included === false ? "is-off" : ""}>
                                            <span aria-hidden="true">{f.included === false ? "–" : "✓"}</span>
                                            <span className="sr-only">{f.included === false ? "Not included: " : "Included: "}</span>
                                            {f.text}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="pr-custom" role="tabpanel">
                    <h3>{tab.service} is priced per project</h3>
                    <p>Every {tab.label.toLowerCase()} project is different. Tell us what you need and get a clear, fixed quote within 24 hours.</p>
                    <div>
                        <Link href={`/quote/?service=${encodeURIComponent(tab.service)}`} className="pr-cta pr-cta--solid">Get a Custom Quote</Link>
                        <Link href="/schedule/" className="pr-cta">Book a Free Consultation</Link>
                    </div>
                </div>
            )}
        </div>
    );
}
