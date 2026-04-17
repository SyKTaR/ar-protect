import type { Metadata } from 'next'
import './globals.css'

const siteUrl = 'https://www.arprotect.fr'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AR PROTECT | Detailing Automobile Île-de-France — Nettoyage & Protection',
    template: '%s | AR Protect',
  },
  description:
    'AR Protect, expert en detailing automobile en Île-de-France (77). Nettoyage intérieur/extérieur, protection céramique, polissage, rénovation de phares et soin des cuirs. Devis gratuit.',
  keywords: [
    'detailing automobile',
    'nettoyage voiture',
    'protection céramique',
    'polissage carrosserie',
    'rénovation phares',
    'soin cuir voiture',
    'nettoyage intérieur voiture',
    'lavage voiture à domicile',
    'detailing Île-de-France',
    'detailing Seine-et-Marne',
    'detailing 77',
    'AR Protect',
    'arprotect',
    'detailing Chevry-Cossigny',
    'lustrage voiture',
    'shampoing siège voiture',
  ],
  authors: [{ name: 'AR Protect', url: siteUrl }],
  creator: 'AR Protect',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/arprotect_logo.jpg',
    apple: '/arprotect_logo.jpg',
  },
  openGraph: {
    title: 'AR Protect | Detailing Automobile Île-de-France',
    description:
      'Expert en detailing automobile en Île-de-France. Nettoyage intérieur/extérieur, protection céramique, polissage et rénovation de phares. Résultats professionnels garantis.',
    url: siteUrl,
    siteName: 'AR Protect',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/arprotect_logo.jpg',
        width: 800,
        height: 800,
        alt: 'AR Protect — Detailing Automobile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AR Protect | Detailing Automobile Île-de-France',
    description:
      'Expert en detailing automobile en Île-de-France. Nettoyage, polissage, protection céramique. Devis gratuit.',
    images: ['/arprotect_logo.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': siteUrl,
  name: 'AR Protect',
  description:
    'Expert en detailing automobile en Île-de-France. Nettoyage intérieur/extérieur, protection céramique, polissage, rénovation de phares et soin des cuirs.',
  url: siteUrl,
  telephone: '+33636230807',
  email: 'arprotect77@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 rue Georges Méliès',
    addressLocality: 'Chevry-Cossigny',
    postalCode: '77173',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.7167,
    longitude: 2.7167,
  },
  areaServed: {
    '@type': 'State',
    name: 'Île-de-France',
  },
  sameAs: [
    'https://www.instagram.com/arprotect/',
    'https://www.tiktok.com/@ar.protect',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  priceRange: '€€',
  image: `${siteUrl}/arprotect_logo.jpg`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de detailing automobile',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nettoyage intérieur automobile' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nettoyage extérieur automobile' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Protection céramique' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Polissage carrosserie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rénovation de phares' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Soin des cuirs' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shampoing sièges' } },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ar-black text-white antialiased grain">
        {children}
      </body>
    </html>
  )
}
