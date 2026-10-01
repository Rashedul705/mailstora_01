import type { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";
import "./PageHero.css";

type Props = {
    eyebrow: string;
    title: ReactNode;
    lead?: ReactNode;
    crumbs: { label: string; url: string }[];
    children?: ReactNode; // buttons or extras under the lead
};

/** Dark gradient hero shared by inner pages (about, pricing, contact, blog...). */
export default function PageHero({ eyebrow, title, lead, crumbs, children }: Props) {
    return (
        <section className="ph" aria-labelledby="ph-title">
            <div className="container">
                <Breadcrumb items={crumbs} />
                <div className="ph-inner">
                    <p className="ph-eyebrow">{eyebrow}</p>
                    <h1 id="ph-title">{title}</h1>
                    {lead && <p className="ph-lead">{lead}</p>}
                    {children && <div className="ph-extra">{children}</div>}
                </div>
            </div>
        </section>
    );
}
