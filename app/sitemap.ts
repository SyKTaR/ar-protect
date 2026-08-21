import type { MetadataRoute } from 'next'
import { seoServiceSlugs } from '@/lib/seo-services'

const siteUrl = 'https://www.arprotect.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const contentLastModified = new Date('2026-07-21')

  return [
    {
      url: siteUrl,
      lastModified: contentLastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/zones/seine-et-marne`,
      lastModified: contentLastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...seoServiceSlugs.map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified: contentLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
