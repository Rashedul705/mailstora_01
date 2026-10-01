const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export type CaseStudyItem = {
    _id: string;
    slug: string;
    title: string;
    clientName: string;
    type?: string;
    esp?: string;
    industry?: string;
    year?: string;
    coverImage?: string;
    shortDescription?: string;
    fullDescription?: string;
    whatWasIncluded?: string;
    compatibility?: string[];
    tags?: string[];
    updatedAt?: string;
    createdAt?: string;
    portfolioSlug?: string;
    caseStudy: {
        enabled: boolean;
        headline?: string;
        seoTitle?: string;
        seoDescription?: string;
        summary?: string;
        challenge?: string;
        solution?: string;
        approach?: string;
        results?: string;
        duration?: string;
        testimonialQuote?: string;
        testimonialAuthor?: string;
        testimonialRole?: string;
    };
};

// Case studies live in their own collection (/api/case-studies). The pages read them in this nested shape.
type CaseStudyDoc = Omit<CaseStudyItem, "caseStudy"> & Omit<CaseStudyItem["caseStudy"], "enabled"> & { portfolioSlug?: string };

const toItem = (d: CaseStudyDoc): CaseStudyItem => ({
    _id: d._id, slug: d.slug, title: d.title, clientName: d.clientName, type: d.type, esp: d.esp, industry: d.industry,
    year: d.year, coverImage: d.coverImage, whatWasIncluded: d.whatWasIncluded, compatibility: d.compatibility, tags: d.tags,
    updatedAt: d.updatedAt, createdAt: d.createdAt, portfolioSlug: d.portfolioSlug,
    caseStudy: {
        enabled: true, headline: d.headline, seoTitle: d.seoTitle, seoDescription: d.seoDescription, summary: d.summary,
        challenge: d.challenge, solution: d.solution, approach: d.approach, results: d.results, duration: d.duration,
        testimonialQuote: d.testimonialQuote, testimonialAuthor: d.testimonialAuthor, testimonialRole: d.testimonialRole,
    },
});

export async function getCaseStudies(): Promise<CaseStudyItem[]> {
    try {
        const res = await fetch(`${API}/api/case-studies`, { next: { revalidate: 60 } });
        return res.ok ? ((await res.json()) as CaseStudyDoc[]).map(toItem) : [];
    } catch {
        return [];
    }
}

export async function getCaseStudy(slug: string): Promise<CaseStudyItem | null> {
    const all = await getCaseStudies();
    return all.find((c) => c.slug === slug) || null;
}

/** The case study written about a portfolio project, if there is one */
export async function getCaseStudyForProject(portfolioSlug: string): Promise<CaseStudyItem | null> {
    const all = await getCaseStudies();
    return all.find((c) => c.portfolioSlug === portfolioSlug) || null;
}

/** "38% | Open rate" lines into { value, label } pairs */
export const parseResults = (s = "") =>
    s.split("\n").map((l) => l.split("|").map((x) => x.trim())).filter(([v, l]) => v && l).map(([value, label]) => ({ value, label }));

export const lines = (s = "") => s.split("\n").map((l) => l.trim()).filter(Boolean);

export const headlineOf = (c: CaseStudyItem) => c.caseStudy.headline || `${c.clientName}: ${c.title}`;
