import { MetadataRoute } from 'next';
import { siteConfig } from '../utils/siteConfig';

// Refresh the sitemap at most every hour
export const revalidate = 3600;

// Date the static pages last changed. Update it (or set SITE_UPDATED) when you edit page content,
// so search engines see an honest "last modified" instead of "changed on every visit".
const SITE_UPDATED = new Date(process.env.SITE_UPDATED || '2026-09-27');

const IMG = '/images/media/cropped/';
type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const base = siteConfig.url;
  const abs = (src?: string) => (!src ? undefined : src.startsWith('http') ? src : `${base}${src}`);

  const page = (path: string, priority: number, changeFrequency: Entry['changeFrequency'] = 'monthly', image?: string): Entry => ({
    url: `${base}${path}`,
    lastModified: SITE_UPDATED,
    changeFrequency,
    priority,
    ...(image ? { images: [abs(image) as string] } : {}),
  });

  const routes: MetadataRoute.Sitemap = [
    page('/', 1.0, 'weekly', '/images/home/html-email-template-design-hero.webp'),
    page('/services/', 0.9, 'monthly', IMG + 'service-html-email-templates.webp'),

    // Core services
    page('/html-email-template-development/', 0.9, 'monthly', IMG + 'service-html-email-templates.webp'),
    page('/figma-to-html-email/', 0.8, 'monthly', IMG + 'service-figma-psd-to-html-email.webp'),
    page('/klaviyo-email-templates/', 0.8, 'monthly', IMG + 'service-klaviyo-automation-flows.webp'),
    page('/mailchimp-email-templates/', 0.8),
    page('/hubspot-email-templates/', 0.8),
    page('/transactional-email-templates/', 0.8),
    page('/newsletter-email-templates/', 0.8),
    page('/outlook-email-rendering-fix/', 0.8, 'monthly', IMG + 'service-email-testing-outlook-fixes.webp'),
    page('/html-email-signature-design/', 0.9, 'monthly', IMG + 'service-html-email-signatures.webp'),
    page('/outlook-email-signature/', 0.8),
    page('/gmail-email-signature/', 0.8),
    page('/klaviyo-flow-setup/', 0.8, 'monthly', IMG + 'service-klaviyo-automation-flows.webp'),
    page('/klaviyo-campaign-management/', 0.8, 'monthly', IMG + 'service-klaviyo-mailchimp-campaigns.webp'),
    page('/white-label-email-development/', 0.8),
    page('/shopify-development/', 0.6),
    page('/social-media-management/', 0.6),
    page('/seo-aeo-geo-services/', 0.7),
    page('/performance-marketing/', 0.7),

    // Company and collections
    page('/portfolio/', 0.8, 'weekly'),
    page('/blog/', 0.7, 'weekly'),
    page('/pricing/', 0.8),
    page('/about/', 0.7),
    page('/reviews/', 0.7),
    page('/faq/', 0.7),
    page('/contact/', 0.6),
    page('/quote/', 0.6),
    page('/schedule/', 0.5),
    page('/privacy/', 0.2, 'yearly'),
    page('/terms/', 0.2, 'yearly'),
  ];

  const getJSON = async (path: string) => {
    try {
      const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 3600 } });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  };

  const [portfolio, cases, blog, hiddenRaw] = await Promise.all([
    getJSON('/api/portfolio?limit=200'),
    getJSON('/api/case-studies'),
    getJSON('/api/blog?limit=200'),
    getJSON('/api/seo/noindex'),
  ]);

  for (const item of portfolio?.items || []) {
    routes.push({
      url: `${base}/portfolio/${item.slug}/`,
      lastModified: new Date(item.updatedAt || SITE_UPDATED),
      changeFrequency: 'yearly',
      priority: 0.5,
      ...(item.coverImage ? { images: [abs(item.coverImage) as string] } : {}),
    });
  }

  // Case studies: the hub is listed only once at least one is published
  if (Array.isArray(cases) && cases.length) {
    const newest = Math.max(...cases.map((c: { updatedAt?: string }) => new Date(c.updatedAt || SITE_UPDATED).getTime()));
    routes.push({ url: `${base}/case-studies/`, lastModified: new Date(newest), changeFrequency: 'monthly', priority: 0.8 });
    for (const c of cases) {
      routes.push({
        url: `${base}/case-studies/${c.slug}/`,
        lastModified: new Date(c.updatedAt || SITE_UPDATED),
        changeFrequency: 'yearly',
        priority: 0.7,
        ...(c.coverImage ? { images: [abs(c.coverImage) as string] } : {}),
      });
    }
  }

  for (const post of blog?.posts || []) {
    routes.push({
      url: `${base}/blog/${post.slug}/`,
      lastModified: new Date(post.updatedAt || post.publishedAt || SITE_UPDATED),
      changeFrequency: 'monthly',
      priority: 0.7,
      ...(post.coverImage ? { images: [abs(post.coverImage) as string] } : {}),
    });
  }

  // Leave out pages set to noindex in Admin › SEO
  const hidden: string[] = Array.isArray(hiddenRaw) ? hiddenRaw : [];
  return hidden.length ? routes.filter((r) => !hidden.includes(new URL(r.url).pathname)) : routes;
}
