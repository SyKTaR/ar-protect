import type { MetadataRoute } from 'next'
import { seoServices } from '@/lib/seo-services'

const siteUrl = 'https://www.arprotect.fr'

// Dates éditoriales tenues à la main : l'accueil change avec cette livraison,
// les sources des pages zone et services ont été modifiées le 21 août 2026.
const homeLastModified = new Date('2026-11-18T00:00:00.000Z')
const zoneLastModified = new Date('2026-08-21T00:00:00.000Z')
const servicesLastModified = new Date('2026-08-21T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: homeLastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/zones/seine-et-marne`,
      lastModified: zoneLastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...seoServices.filter((service) => !service.unavailable).map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: servicesLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
