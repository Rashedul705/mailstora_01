import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import ServicePage from "../components/service/ServicePage";
import { serviceMetadata } from "../components/service/seoMeta";

const SLUG = "klaviyo-flow-setup";

const baseMetadata: Metadata = serviceMetadata(SLUG);

export async function generateMetadata(): Promise<Metadata> {
    return withSeo(baseMetadata);
}

export default function Page() {
    return <ServicePage slug={SLUG} />;
}
