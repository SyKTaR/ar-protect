import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductStore from '@/components/ProductStore'
import { productCatalog } from '@/lib/products'

const siteUrl = 'https://www.arprotect.fr'

export const metadata: Metadata = {
  title: 'Produits entretien automobile',
  description:
    'Boutique AR Protect : produits d’entretien automobile pour lavage, habitacle, jantes, pneus, protection et finition entre deux prestations.',
  alternates: {
    canonical: `${siteUrl}/produits`,
  },
  openGraph: {
    title: 'Produits entretien automobile | AR Protect',
    description:
      'Découvrez les essentiels AR Protect pour entretenir votre véhicule à domicile : lavage, intérieur, jantes, pneus et finition.',
    url: `${siteUrl}/produits`,
    siteName: 'AR Protect',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/apres_ext.png',
        width: 1200,
        height: 630,
        alt: 'Produits entretien automobile AR Protect',
      },
    ],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Produits entretien automobile AR Protect',
  url: `${siteUrl}/produits`,
  description:
    'Catalogue de produits d’entretien automobile pour garder un véhicule propre et protégé entre deux prestations AR Protect.',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      ...productCatalog.map((product) => product.name),
    ].map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
    })),
  },
}

export default function ProduitsPage() {
  return (
    <main className="min-h-screen bg-ar-black">
      <Header />
      <ProductStore />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
