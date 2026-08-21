import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ChevronRight, MapPin, Phone } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSeoService, seoServices, seoServiceSlugs } from '@/lib/seo-services'

const siteUrl = 'https://www.arprotect.fr'

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return seoServiceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getSeoService(slug)

  if (!service) {
    return {}
  }

  const canonical = `${siteUrl}/services/${service.slug}`

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonical,
      type: 'website',
      locale: 'fr_FR',
      images: [
        {
          url: '/arprotect_logo.jpg',
          width: 800,
          height: 800,
          alt: `${service.h1} — AR Protect`,
        },
      ],
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getSeoService(slug)

  if (!service) {
    notFound()
  }

  const canonical = `${siteUrl}/services/${service.slug}`
  const relatedServices = seoServices.filter((item) => item.slug !== service.slug).slice(0, 3)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: service.h1,
        description: service.metaDescription,
        url: canonical,
        provider: {
          '@id': `${siteUrl}#localbusiness`,
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Seine-et-Marne' },
          { '@type': 'AdministrativeArea', name: 'Île-de-France' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/#services` },
          { '@type': 'ListItem', position: 3, name: service.eyebrow, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-ar-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="relative overflow-hidden border-b border-ar-border bg-ar-dark pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.13),transparent_45%)]" />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Fil d’Ariane" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/45">
              <Link href="/" className="min-h-11 content-center hover:text-white">Accueil</Link>
              <ChevronRight aria-hidden="true" size={14} />
              <Link href="/#services" className="min-h-11 content-center hover:text-white">Services</Link>
              <ChevronRight aria-hidden="true" size={14} />
              <span className="text-white/70">{service.eyebrow}</span>
            </nav>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-ar-red">
                  {service.eyebrow} · Intervention à domicile
                </p>
                <h1 className="max-w-5xl font-display text-4xl font-black uppercase leading-[0.98] tracking-tight sm:text-5xl lg:text-7xl">
                  {service.h1}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
                  {service.summary}
                </p>
              </div>

              <aside className="border border-ar-border bg-black/25 p-5 sm:p-6">
                {service.unavailable && (
                  <span className="mb-3 inline-block border border-ar-red/40 bg-ar-red/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ar-red">
                    Bientôt disponible
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">Tarif</p>
                <p className="mt-2 text-2xl font-black text-white">{service.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {service.unavailable
                    ? 'Cette prestation n’est pas encore ouverte à la réservation.'
                    : 'Devis gratuit selon le véhicule, son état et la prestation retenue.'}
                </p>
                <div className="mt-5 grid grid-cols-1 gap-3">
                  {service.unavailable ? (
                    <span className="btn-primary min-h-12 content-center text-center opacity-40 cursor-not-allowed pointer-events-none">
                      Prestation indisponible
                    </span>
                  ) : (
                    <Link href="/#contact" className="btn-primary min-h-12 content-center text-center">
                      Demander un devis
                    </Link>
                  )}
                  <a
                    href="tel:+33636230807"
                    className="flex min-h-12 items-center justify-center gap-2 border border-ar-border px-4 text-sm font-semibold text-white hover:border-ar-red hover:text-ar-red"
                  >
                    <Phone aria-hidden="true" size={16} />
                    06 36 23 08 07
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ar-red">La prestation</p>
              <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
                Un service adapté à votre véhicule
              </h2>
              <div className="mt-6 max-w-3xl space-y-5 text-base leading-8 text-white/65">
                {service.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <h2 className="mt-12 font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
                Ce que comprend la prestation
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.included.map((item) => (
                  <li key={item} className="flex min-h-14 items-start gap-3 border border-ar-border bg-ar-dark p-4 text-sm leading-6 text-white/70">
                    <Check aria-hidden="true" size={17} className="mt-1 shrink-0 text-ar-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="h-fit border-l-2 border-ar-red bg-ar-anthracite p-6 lg:sticky lg:top-28">
              <MapPin aria-hidden="true" className="text-ar-red" size={24} />
              <h2 className="mt-4 text-xl font-bold">Intervention en Seine-et-Marne</h2>
              <p className="mt-3 text-base leading-7 text-white/60">
                AR Protect est basé à Chevry-Cossigny et intervient à domicile dans le 77 ainsi que dans les secteurs desservis d’Île-de-France.
              </p>
              <Link href="/#contact" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-ar-red hover:text-white">
                Vérifier votre zone d’intervention
                <ChevronRight aria-hidden="true" size={15} />
              </Link>
            </aside>
          </div>
        </section>

        <section className="border-y border-ar-border bg-ar-anthracite py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ar-red">Méthode AR Protect</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">Les étapes de l’intervention</h2>
            <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <li key={step.title} className="border border-ar-border bg-ar-black p-5 sm:p-6">
                  <span className="text-sm font-black text-ar-red">0{index + 1}</span>
                  <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-base leading-7 text-white/55">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">Pourquoi choisir cette prestation ?</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {service.benefits.map((benefit) => (
                <article key={benefit.title} className="border border-ar-border p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
                  <p className="mt-3 text-base leading-7 text-white/60">{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ar-dark py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ar-red">Questions fréquentes</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">À savoir avant de réserver</h2>
            <div className="mt-8 divide-y divide-ar-border border-y border-ar-border">
              {service.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-white sm:text-lg">
                    {item.question}
                    <span aria-hidden="true" className="text-xl text-ar-red group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-2 pr-8 text-base leading-7 text-white/60">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">Services complémentaires</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group flex min-h-40 flex-col justify-between border border-ar-border bg-ar-anthracite p-5 transition-colors hover:border-ar-red sm:p-6"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ar-red">{item.eyebrow}</p>
                    <h3 className="mt-3 text-xl font-bold text-white">{item.h1}</h3>
                  </div>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-white/55 group-hover:text-white">
                    Découvrir le service <ChevronRight aria-hidden="true" size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ar-border bg-ar-red py-12 sm:py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Obtenir un devis gratuit</h2>
              <p className="mt-2 text-base text-white/80">Décrivez votre véhicule et la prestation souhaitée à AR Protect.</p>
            </div>
            <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center bg-white px-6 text-sm font-bold uppercase tracking-wider text-ar-black hover:bg-ar-black hover:text-white">
              Prendre rendez-vous
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
