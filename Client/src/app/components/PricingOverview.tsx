import Link from "next/link";
import "./HomeSections.css";

type Feature = { text: string; included?: boolean; order?: number };
type Plan = {
    _id: string;
    name: string;
    label?: string;
    badgeText?: string;
    description?: string;
    price: string;
    priceUnit?: string;
    currency?: string;
    isPopular?: boolean;
    popular?: boolean;
    features?: Feature[];
};
type PricingData = { settings?: { sectionTitle?: string; sectionSubtitle?: string }; template?: Plan[]; signature?: Plan[] };

const check = (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function priceText(plan: Plan) {
    const isNumber = /^\d+(\.\d+)?$/.test(plan.price);
    return isNumber ? `$${plan.price}` : plan.price;
}

/** Short pricing overview: the email template plans from the pricing API, plus signature starting price. */
export default function PricingOverview({ data }: { data?: PricingData }) {
    const plans = (data?.template ?? []).slice(0, 3);
    if (plans.length === 0) return null;

    const signatureFrom = (data?.signature ?? [])
        .map((p) => Number(p.price))
        .filter((n) => !Number.isNaN(n))
        .sort((a, b) => a - b)[0];

    return (
        <section className="hs-section hs-pricing" aria-labelledby="pricing-title">
            <div className="container">
                <header className="hs-header">
                    <p className="home-eyebrow">Pricing</p>
                    <h2 id="pricing-title" className="hs-title">
                        Simple, <span>Transparent Pricing</span>
                    </h2>
                    <p className="hs-subtitle">
                        One-time project pricing for HTML email templates. No subscriptions and no hidden fees.
                    </p>
                </header>

                <ul className="hs-pricing-grid">
                    {plans.map((plan) => {
                        const popular = Boolean(plan.isPopular || plan.popular || plan.badgeText);
                        const features = (plan.features ?? [])
                            .filter((f) => f.included !== false)
                            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                            .slice(0, 4);
                        return (
                            <li key={plan._id} className={`hs-plan${popular ? " hs-plan--popular" : ""}`}>
                                {popular && <span className="hs-plan-badge">{plan.badgeText || "Most Popular"}</span>}
                                <p className="hs-plan-label">{plan.label || plan.name}</p>
                                <h3 className="hs-plan-name">{plan.name}</h3>
                                <p className="hs-plan-price">
                                    {priceText(plan)}
                                    {/^\d/.test(plan.price) && plan.priceUnit && <span>{plan.priceUnit}</span>}
                                </p>
                                {plan.description && <p className="hs-plan-desc">{plan.description}</p>}
                                <ul className="hs-plan-features">
                                    {features.map((f) => (
                                        <li key={f.text}>
                                            {check}
                                            {f.text}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>

                <div className="hs-pricing-footer">
                    {signatureFrom !== undefined && (
                        <p>
                            HTML email signatures from <strong>${signatureFrom}</strong>. Klaviyo flows, Shopify and social
                            media are quoted per project.
                        </p>
                    )}
                    <Link href="/pricing/" className="home-btn-primary">
                        See Full Pricing
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
