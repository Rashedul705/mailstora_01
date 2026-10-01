import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../utils/siteConfig";
import "./HomeSections.css";

const { founder, stats, upwork } = siteConfig;

export default function FounderQuote() {
    return (
        <section className="hs-section hs-quote" aria-labelledby="quote-title">
            <div className="container">
                <figure className="hs-quote-card">
                    <div className="hs-quote-photo">
                        <Image
                            src="/images/brand/rashedul-islam-founder.webp"
                            alt={`${founder.name}, founder of MailStora`}
                            width={220}
                            height={220}
                        />
                        <span className="hs-quote-badge">{upwork.badge} on Upwork</span>
                    </div>

                    <div className="hs-quote-body">
                        <p className="home-eyebrow" id="quote-title">A Note From the Founder</p>
                        <blockquote className="hs-quote-text">
                            <p>
                                &ldquo;I believe that if you approve a design in Figma, it should look exactly like that in the
                                inbox, whether your subscriber is on an iPhone or Outlook 2016. No compromises, no excuses.&rdquo;
                            </p>
                        </blockquote>
                        <p className="hs-quote-story">
                            I built my reputation fixing the Outlook rendering bugs other developers couldn&apos;t solve. Over{" "}
                            {stats.yearsExperience} years and {stats.upworkHours} hours on Upwork, I have delivered{" "}
                            {stats.templatesBuilt} pixel-perfect email templates for ecommerce brands and marketing agencies
                            worldwide, and I still code every project myself.
                        </p>
                        <figcaption className="hs-quote-author">
                            <span className="hs-quote-name">{founder.name}</span>
                            <span className="hs-quote-role">Founder &amp; Lead Email Developer, MailStora</span>
                        </figcaption>
                        <div className="hs-quote-actions">
                            <Link href={siteConfig.links.schedule} className="home-btn-primary">
                                Book a Free Consultation
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                            <a href={founder.socials.upwork} target="_blank" rel="noopener noreferrer" className="hs-btn-ghost">
                                View Upwork Profile
                            </a>
                        </div>
                    </div>
                </figure>
            </div>
        </section>
    );
}
