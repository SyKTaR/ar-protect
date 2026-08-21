import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ChevronRight, MapPin, Phone } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { seoServices } from '@/lib/seo-services'

const siteUrl = 'https://www.arprotect.fr'
const canonical = `${siteUrl}/zones/seine-et-marne`

export const metadata: Metadata = {
  title: { absolute: 'Nettoyage voiture Seine-et-Marne 77 | AR Protect' },
  description:
    'Nettoyage et detailing automobile à domicile en Seine-et-Marne (77) : intérieur, extérieur, sièges, phares, polissage et protection. Devis gratuit.',
  alternates: { canonical },
  openGraph: {
    title: 'Nettoyage voiture en Seine-et-Marne (77) | AR Protect',
    description:
      'AR Protect intervient à domicile en Seine-et-Marne pour le nettoyage intérieur, extérieur et les soins automobiles.',
    url: canonical,
    locale: 'fr_FR',
    type: 'website',
  },
}

const cities = [
  'Chevry-Cossigny',
  'Brie-Comte-Robert',
  'Pontault-Combault',
  'Ozoir-la-Ferrière',
  'Roissy-en-Brie',
  'Combs-la-Ville',
  'Lieusaint',
  'Melun',
  'Serris',
  'Bussy-Saint-Georges',
  'Torcy',
  'Chelles',
]

const faq = [
  {
    question: 'AR Protect intervient-il dans toute la Seine-et-Marne ?',
    answer:
      'AR Protect est basé à Chevry-Cossigny et se déplace dans le 77 sur rendez-vous. La faisabilité dépend de la commune, de la prestation et des conditions d’intervention ; elle est confirmée lors du devis.',
  },
  {
    question: 'Quelles prestations sont disponibles à domicile ?',
    answer:
      'Le nettoyage intérieur, le lavage extérieur, les packs complets, le shampoing des sièges, le soin des cuirs, la rénovation des phares et les prestations de protection ou de correction sur devis sont proposés selon les conditions du véhicule.',
  },
  {
    question: 'Comment obtenir un tarif précis ?',
    answer:
      'Indiquez la commune, le modèle du véhicule, son état et la prestation souhaitée. AR Protect pourra alors confirmer le déplacement et établir un devis adapté.',
  },
]

export default function SeineEtMarnePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: 'Nettoyage voiture en Seine-et-Marne (77)',
        description: metadata.description,
        about: { '@id': `${siteUrl}#localbusiness` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Seine-et-Marne', item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-ar-black text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

        <section className="relative overflow-hidden border-b border-ar-border bg-ar-dark pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.13),transparent_45%)]" />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Fil d’Ariane" className="mb-8 flex items-center gap-2 text-sm text-white/45">
              <Link href="/" className="min-h-11 content-center hover:text-white">Accueil</Link>
              <ChevronRight aria-hidden="true" size={14} />
              <span className="text-white/70">Seine-et-Marne</span>
            </nav>
            <div className="max-w-5xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-ar-red">Service automobile à domicile · 77</p>
              <h1 className="font-display text-4xl font-black uppercase leading-[0.98] tracking-tight sm:text-5xl lg:text-7xl">
                Nettoyage de voiture en Seine-et-Marne
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
                AR Protect intervient à domicile en Seine-et-Marne pour le nettoyage intérieur et extérieur, le soin des tissus et cuirs, la rénovation des phares et le detailing automobile.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/#contact" className="btn-primary min-h-12 content-center text-center">Demander un devis gratuit</Link>
                <a href="tel:+33636230807" className="flex min-h-12 items-center justify-center gap-2 border border-ar-border px-5 text-sm font-semibold hover:border-ar-red hover:text-ar-red">
                  <Phone aria-hidden="true" size={16} /> 06 36 23 08 07
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ar-red">Une présence locale dans le 77</p>
              <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">Le detailing vient jusqu’à votre véhicule</h2>
              <div className="mt-6 max-w-3xl space-y-5 text-base leading-8 text-white/65">
                <p>
                  Basé à Chevry-Cossigny, AR Protect propose des prestations de nettoyage automobile à domicile dans les secteurs desservis de Seine-et-Marne. Le rendez-vous est préparé en fonction du modèle, du niveau de salissure et du service demandé.
                </p>
                <p>
                  Cette organisation permet de choisir une intervention ciblée, comme le shampoing des sièges ou la rénovation des phares, ou une remise au propre complète de l’intérieur et de l’extérieur. Les besoins en accès à l’eau ou à l’électricité sont précisés avant le déplacement lorsqu’ils sont nécessaires.
                </p>
                <p>
                  Les tarifs sont annoncés avant l’intervention. Les prestations dont la durée dépend fortement de l’état du véhicule, comme le polissage ou la protection céramique, font l’objet d’un diagnostic et d’un devis personnalisé.
                </p>
              </div>
            </div>
            <aside className="h-fit border-l-2 border-ar-red bg-ar-anthracite p-6">
              <MapPin aria-hidden="true" className="text-ar-red" size={24} />
              <h2 className="mt-4 text-xl font-bold">Votre commune n’est pas listée ?</h2>
              <p className="mt-3 text-base leading-7 text-white/60">
                Contactez AR Protect avec votre code postal et la prestation souhaitée pour confirmer le déplacement.
              </p>
              <Link href="/#contact" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-ar-red hover:text-white">
                Vérifier votre zone <ChevronRight aria-hidden="true" size={15} />
              </Link>
            </aside>
          </div>
        </section>

        <section className="border-y border-ar-border bg-ar-anthracite py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">Secteurs desservis en Seine-et-Marne</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/60">
              La liste ci-dessous présente des secteurs de référence. Chaque déplacement est confirmé au moment du devis.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {cities.map((city) => (
                <li key={city} className="flex min-h-14 items-center gap-2 border border-ar-border bg-ar-black px-4 text-sm text-white/70">
                  <MapPin aria-hidden="true" size={14} className="shrink-0 text-ar-red" /> {city}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ar-red">Prestations dans le 77</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">Choisir votre nettoyage automobile</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {seoServices.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group flex min-h-48 flex-col justify-between border border-ar-border bg-ar-dark p-5 hover:border-ar-red">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-ar-red">{service.eyebrow}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/55">{service.summary}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-white/60 group-hover:text-white">
                    Voir la prestation <ChevronRight aria-hidden="true" size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ar-dark py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">Questions sur les interventions dans le 77</h2>
            <div className="mt-8 divide-y divide-ar-border border-y border-ar-border">
              {faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-bold sm:text-lg">
                    {item.question}<span aria-hidden="true" className="text-xl text-ar-red group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-2 pr-8 text-base leading-7 text-white/60">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ar-red py-12 sm:py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">Votre véhicule est en Seine-et-Marne ?</h2>
              <p className="mt-2 text-base text-white/80">Demandez la disponibilité et le tarif de votre intervention à domicile.</p>
            </div>
            <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center bg-white px-6 text-sm font-bold uppercase tracking-wider text-ar-black hover:bg-ar-black hover:text-white">
              Obtenir mon devis
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
