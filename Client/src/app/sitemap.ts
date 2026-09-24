import { MetadataRoute } from 'next';
import { siteConfig } from '../utils/siteConfig';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const baseUrl = siteConfig.url;
  
  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    // Pillar 1
    { url: `${baseUrl}/html-email-template-development/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/figma-to-html-email/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/psd-to-html-email/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/klaviyo-email-templates/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/mailchimp-email-templates/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/hubspot-email-templates/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/zoho-campaigns-email-templates/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/mailerlite-email-templates/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/transactional-email-templates/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/newsletter-email-templates/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/responsive-email-template-design/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/outlook-email-rendering-fix/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Pillar 2
    { url: `${baseUrl}/html-email-signature-design/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/outlook-email-signature/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/gmail-email-signature/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/company-email-signature-deployment/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Supporting pages
    { url: `${baseUrl}/klaviyo-flow-setup/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/klaviyo-campaign-management/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/white-label-email-development/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/shopify-development/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/social-media-management/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Info & Collections
    { url: `${baseUrl}/portfolio/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/case-studies/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pricing/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/process/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/reviews/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/quote/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/schedule/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  try {
    // Fetch dynamic portfolio routes
    const portfolioRes = await fetch(`${API_BASE}/api/portfolio?limit=100`, { cache: 'no-store' });
    if (portfolioRes.ok) {
      const pData = await portfolioRes.json();
      if (pData.items) {
        pData.items.forEach((item: any) => {
          routes.push({
            url: `${baseUrl}/portfolio/${item.slug}/`,
            lastModified: new Date(item.updatedAt || Date.now()),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        });
      }
    }

    // Fetch dynamic blog routes
    const blogRes = await fetch(`${API_BASE}/api/blog?limit=100`, { cache: 'no-store' });
    if (blogRes.ok) {
      const bData = await blogRes.json();
      if (bData.posts) {
        bData.posts.forEach((post: any) => {
          routes.push({
            url: `${baseUrl}/blog/${post.slug}/`,
            lastModified: new Date(post.updatedAt || post.publishedAt),
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        });
      }
    }
  } catch (error) {
    console.error("Error generating sitemap dynamic routes", error);
  }

  return routes;
}
