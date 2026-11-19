import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'
import { CONSENT_DEFAULT_SNIPPET } from '@/lib/analytics'

const siteUrl = 'https://www.arprotect.fr'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Detailing auto en Île-de-France et Seine-et-Marne | AR Protect',
    template: '%s | AR Protect',
  },
  description:
    'Nettoyage et detailing auto à domicile en Seine-et-Marne : intérieur, extérieur, polissage et phares. Demandez votre devis gratuit.',
  keywords: [
    'detailing automobile',
    'nettoyage voiture',
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
      'Expert en detailing automobile en Île-de-France. Nettoyage intérieur/extérieur, polissage et rénovation de phares. Résultats professionnels garantis.',
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
      'Expert en detailing automobile en Île-de-France. Nettoyage, polissage et rénovation de phares. Devis gratuit.',
    images: ['/arprotect_logo.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}#localbusiness`,
  name: 'AR Protect',
  description:
    'Expert en detailing automobile en Île-de-France. Nettoyage intérieur/extérieur, polissage, rénovation de phares et soin des cuirs.',
  url: siteUrl,
  telephone: '+33636230807',
  email: 'contact@arprotect.fr',
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
    'https://www.google.com/search?hl=fr-FR&gl=fr&q=AR+PROTECT&ludocid=2814090523952500646&lsig=AB86z5UWweasKggHlxyl0s4oPbJM&source=g.page.m._&laa=merchant-review-solicitation&pli=1#lrd=0xa24a85d79d490341:0x270da86bfdfb4fa6,3',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
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
    <html lang="fr" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SNIPPET }} />
      </head>
      <body className="bg-ar-black text-white antialiased grain">
        <CookieConsent />
        {children}
      </body>
    </html>
  )
}
