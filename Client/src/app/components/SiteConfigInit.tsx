"use client";

import { siteConfig } from "../../utils/siteConfig";
import { mergeSite } from "../../lib/siteSettings";

/** Applies Admin › Site Settings to siteConfig in the browser. Rendered first in <body> so client components see the same values as the server. */
export default function SiteConfigInit({ data }: { data: Record<string, unknown> }) {
    mergeSite(siteConfig as unknown as Record<string, unknown>, data);
    return null;
}
