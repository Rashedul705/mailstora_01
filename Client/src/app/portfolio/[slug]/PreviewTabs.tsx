"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
    title: string;
    label: string;
    desktop?: string;
    mobile?: string;
};

/** Desktop / Mobile preview of the email: a browser window or a phone frame. */
export default function PreviewTabs({ title, label, desktop, mobile }: Props) {
    const [view, setView] = useState<"desktop" | "mobile">("desktop");
    const mobileSrc = mobile || desktop;
    const alt = `${title}, HTML email designed and coded by MailStora`;

    return (
        <div className="pj-preview">
            <div className="pj-view-tabs" role="tablist" aria-label="Preview size">
                {(["desktop", "mobile"] as const).map((v) => (
                    <button key={v} type="button" role="tab" aria-selected={view === v} aria-controls={`pj-view-${v}`} className={view === v ? "is-active" : ""} onClick={() => setView(v)}>
                        {v === "desktop" ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
                        )}
                        {v === "desktop" ? "Desktop" : "Mobile"}
                    </button>
                ))}
            </div>

            {view === "desktop" ? (
                <div className="pj-window" id="pj-view-desktop" role="tabpanel">
                    <div className="pj-window-bar" aria-hidden="true"><i /><i /><i /><span>{label}</span></div>
                    <div className="pj-window-body">
                        {desktop && <Image src={desktop} alt={alt} width={900} height={1200} priority sizes="(max-width: 1024px) 92vw, 560px" />}
                    </div>
                </div>
            ) : (
                <div className="pj-phone" id="pj-view-mobile" role="tabpanel">
                    <div className="pj-phone-notch" aria-hidden="true" />
                    <div className="pj-phone-screen">
                        {mobileSrc && <Image src={mobileSrc} alt={`${alt} (mobile view)`} width={600} height={1200} sizes="300px" />}
                    </div>
                </div>
            )}
            <p className="pj-preview-hint">Hover the preview to scroll through the whole email.</p>
        </div>
    );
}
