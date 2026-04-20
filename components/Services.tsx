'use client'

import { useRef, useState, type UIEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Droplets, Sparkles, Layers, Gem, Lightbulb, Wind, ArrowUpRight, X, Check, ChevronRight, ChevronLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ProcessStep {
  step: string
  label: string
  desc: string
}

interface PricingRow {
  label: string
  prices: string[]
  savings?: string[]
}

interface PricingTable {
  title?: string
  headers: string[]
  rows: PricingRow[]
  note?: string
}

interface SimplePrice {
  label: string
  price: string
}

interface FormulaDetail {
  name: string
  items: string[]
}

interface Service {
  id: string
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  features: string[]
  price: string
  highlight?: boolean
  modalDescription: string
  process: ProcessStep[]
  pricingTable?: PricingTable
  simplePricing?: SimplePrice[]
  includes?: string[]
  formulaDetails?: FormulaDetail[]
}

const services: Service[] = [
  {
    id: 'interieur',
    icon: Droplets,
    title: 'HABITACLE & SOIN',
    subtitle: 'INTERIOR CARE',
    description:
      "Une remise à neuf complète de votre intérieur. Nous proposons 4 niveaux de finition pour répondre exactement à vos besoins de propreté et d'hygiène.",
    features: ['Essentiel', 'Confort', 'Premium', 'Signature'],
    price: 'Dès 99€ TTC',
    modalDescription:
      "Une remise à neuf méticuleuse de votre habitacle adaptée à votre type de véhicule. Nous utilisons des techniques d'extraction et de traitement vapeur pour un résultat professionnel.",

    process: [
      { step: '1', label: 'Aspiration & Dépoussiérage', desc: "Aspiration complète de l'habitacle et dépoussiérage minutieux." },
      { step: '2', label: 'Nettoyage Technique', desc: 'Plastiques, surfaces et vitres intérieures nettoyés et dégraissés.' },
      { step: '3', label: 'Traitement Profond', desc: 'Shampoing des sièges et moquettes (selon formule choisie).' },
      { step: '4', label: 'Finition & Protection', desc: 'Nettoyage des seuils, spray parfumé et traitement anti-UV (Formule Signature).' },
    ],
    formulaDetails: [
      {
        name: 'Essentiel',
        items: [
          'Aspiration complète et dépoussiérage',
          'Plastiques & surfaces nettoyés et dégraissés',
          'Vitres intérieures nettoyées et dégraissées',
          'Nettoyage des seuils de porte / coffre',
          'Spray parfumé anti-odeur',
        ],
      },
      {
        name: 'Confort',
        items: [
          'Aspiration complète et dépoussiérage',
          'Plastiques & surfaces nettoyés et dégraissés',
          'Vitres intérieures nettoyées et dégraissées',
          'Nettoyage des seuils de porte / coffre',
          'Spray parfumé anti-odeur',
          'Shampoing des sièges',
        ],
      },
      {
        name: 'Premium',
        items: [
          'Aspiration complète et dépoussiérage',
          'Plastiques & surfaces nettoyés et dégraissés',
          'Vitres intérieures nettoyées et dégraissées',
          'Nettoyage des seuils de porte / coffre',
          'Spray parfumé anti-odeur',
          'Shampoing des sièges',
          'Shampoing des moquettes',
        ],
      },
      {
        name: 'Signature',
        items: [
          'Aspiration complète et dépoussiérage',
          'Plastiques & surfaces nettoyés et dégraissés',
          'Vitres intérieures nettoyées et dégraissées',
          'Nettoyage des seuils de porte / coffre',
          'Spray parfumé anti-odeur',
          'Shampoing des sièges',
          'Shampoing des moquettes',
          'Traitement anti-UV de toutes les surfaces',
        ],
      },
    ],
  },
  {
    id: 'exterieur',
    icon: Sparkles,
    title: 'ÉCLAT EXTÉRIEUR',
    subtitle: 'EXTERIOR CARE',
    description:
      "Un nettoyage manuel méticuleux pour redonner de l'éclat à votre carrosserie tout en protégeant les éléments sensibles comme les joints et les plastiques.",
    features: ['Prélavage mousse active', 'Lavage carrosserie à la main', 'Nettoyage jantes & passages de roues', 'Dressing plastiques et pneus'],
    price: 'Dès 89€ TTC',
    modalDescription:
      "Un lavage manuel haute précision pour purifier votre carrosserie et redonner de l'éclat aux éléments extérieurs sans risque de micro-rayures.",
    simplePricing: [
      { label: 'Citadine', price: '89€ TTC' },
      { label: 'Berline', price: '99€ TTC' },
      { label: 'SUV / Prestige', price: '109€ TTC' },
      { label: 'Utilitaire', price: 'Sur Devis' },
    ],
    process: [
      { step: '1', label: 'Prélavage & Décontamination', desc: 'Mousse active et nettoyage des jantes, garde-boue et bas de caisse.' },
      { step: '2', label: 'Lavage à la Main', desc: 'Nettoyage minutieux de la carrosserie, des joints, plastiques et logos.' },
      { step: '3', label: 'Séchage & Vitres', desc: 'Séchage manuel complet de la carrosserie et nettoyage des vitres extérieures.' },
      { step: '4', label: 'Finition Brillance', desc: 'Nettoyage des seuils de porte et dressing des plastiques et pneus.' },
    ],
  },
  {
    id: 'pack',
    icon: Layers,
    title: 'PACK INT + EXT',
    subtitle: 'BEST SELLER',
    description:
      "La solution complète AR Protect. Profitez d'un tarif avantageux en combinant le nettoyage intérieur et extérieur pour une métamorphose totale de votre véhicule.",
    features: ['Formules "Plus" optimisées', 'Nettoyage complet manuel', 'Économie immédiate incluse', 'Idéal pour la revente'],
    price: 'Dès 149€ TTC',
    highlight: true,
    modalDescription:
      'La métamorphose complète. Profitez de nos formules combinées pour offrir à votre véhicule un aspect "sortie de showroom" intérieur comme extérieur à prix réduit.',
    pricingTable: {
      title: 'Avantage Pack — Tarifs combinés',
      headers: ['Formule', 'Citadine', 'Berline', 'SUV / Prestige'],
      rows: [
        { label: 'Essentiel+', prices: ['149€', '169€', '189€'], savings: ['au lieu de 188€', 'au lieu de 208€', 'au lieu de 228€'] },
        { label: 'Confort+',   prices: ['169€', '189€', '209€'], savings: ['au lieu de 218€', 'au lieu de 238€', 'au lieu de 258€'] },
        { label: 'Premium+',   prices: ['199€', '209€', '229€'], savings: ['au lieu de 248€', 'au lieu de 268€', 'au lieu de 288€'] },
        { label: 'Signature+', prices: ['249€', '259€', '279€'], savings: ['au lieu de 308€', 'au lieu de 328€', 'au lieu de 348€'] },
      ],
    },
    process: [],
  },
  {
    id: 'cuirs',
    icon: Gem,
    title: 'SOIN DES CUIRS',
    subtitle: 'LUXURY CARE',
    description:
      "Un traitement spécifique pour redonner éclat et souplesse à vos selleries. Idéal pour les cuirs ternes, secs ou encrassés.",
    features: ['Nettoyage intégral des cuirs', "Application d'un nourrissant", 'Traitement anti-UV protecteur', 'Aspiration minutieuse'],
    price: '179€ TTC',
    modalDescription:
      'Un traitement de prestige pour les selleries cuir. Idéal pour redonner souplesse et éclat aux cuirs ternis par le temps.',
    includes: [
      'Aspiration détaillée des cuirs',
      'Nettoyage intégral en profondeur',
      "Application d'un lait nourrissant protecteur",
      'Traitement spécifique anti-UV pour prévenir les craquelures',
    ],
    process: [],
  },
  {
    id: 'optiques',
    icon: Lightbulb,
    title: 'OPTIQUES DE PHARES',
    subtitle: 'SAFETY & STYLE',
    description:
      "Retrouvez une visibilité optimale et un aspect neuf pour vos phares. Une étape cruciale pour la sécurité et le passage au contrôle technique.",
    features: ['Ponçage des optiques', 'Lustrage haute brillance', "Option à l'unité ou par paire"],
    price: 'Dès 49€ TTC',
    modalDescription:
      'Restaurez la clarté de vos phares pour améliorer votre visibilité nocturne et garantir le passage au contrôle technique.',
    simplePricing: [
      { label: "L'unité", price: '49€ TTC' },
      { label: 'La paire', price: '79€ TTC' },
    ],
    process: [
      { step: '1', label: 'Ponçage', desc: "Élimination de la couche d'oxydation jaune des optiques." },
      { step: '2', label: 'Polissage', desc: 'Restauration de la transparence et de la brillance.' },
    ],
  },
  {
    id: 'shampoing',
    icon: Wind,
    title: 'SHAMPOING SIÈGES',
    subtitle: 'HYGIÈNE PLUS',
    description:
      "Élimine les taches tenaces, les odeurs et les bactéries. Redonnez de la fraîcheur et une hygiène saine à vos tissus de sièges.",
    features: ['Application mousse active', 'Lessivage en profondeur', 'Traitement vapeur antibactérien', 'Élimination des odeurs'],
    price: '69€ TTC',
    modalDescription:
      'Une intervention ciblée sur vos tissus pour éliminer les taches tenaces et les odeurs persistantes.',
    process: [
      { step: '1', label: 'Aspiration & Mousse', desc: "Aspiration des sièges et application d'une mousse active." },
      { step: '2', label: 'Lessivage Mécanique', desc: 'Lessivage mécanique des fibres.' },
      { step: '3', label: 'Traitement Vapeur', desc: 'Traitement vapeur antibactérien pour une fraîcheur durable.' },
    ],
  },
]

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const Icon = service.icon
  const [showFormulas, setShowFormulas] = useState(false)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none border border-ar-border"
          style={{
            background: service.highlight
              ? 'linear-gradient(135deg, #1a0000 0%, #0a0000 100%)'
              : 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 ${service.highlight ? 'bg-ar-red' : 'bg-ar-red/60'}`} />

          {/* Header */}
          <div className="p-7 pb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 flex items-center justify-center border border-ar-border/50 ${service.highlight ? 'text-ar-red' : 'text-white/50'}`}>
                <Icon size={30} strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-ar-red/70 text-[10px] uppercase tracking-[0.3em] font-semibold block mb-1">
                  {service.subtitle}
                </span>
                <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight leading-none">
                  {service.title}
                </h3>
              </div>
            </div>
            <button
              type="button"
              title="Fermer"
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors duration-200 flex-shrink-0 mt-1"
            >
              <X size={22} />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-ar-border/40 mx-7" />

          {/* Body */}
          <div className="p-7 space-y-7">
            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed">
              {service.modalDescription}
            </p>

            {/* Pricing Table (Intérieur, Pack) */}
            {service.pricingTable && (
              <div>
                <h4 className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
                  {service.pricingTable.title ?? 'Grille tarifaire'}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-ar-border/40">
                        {service.pricingTable.headers.map((h, i) => (
                          <th
                            key={h}
                            className={`pb-2.5 font-semibold text-white/30 uppercase tracking-wider text-[10px] ${i === 0 ? 'text-left pr-4' : 'text-center px-2'}`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {service.pricingTable.rows.map((row) => (
                        <tr key={row.label} className="border-b border-ar-border/20 last:border-0">
                          <td className="py-2.5 pr-4 text-white/70 font-medium whitespace-nowrap">{row.label}</td>
                          {row.prices.map((price, pi) => (
                            <td key={pi} className="py-2.5 px-2 text-center">
                              <span className="text-white font-bold">{price}</span>
                              {row.savings?.[pi] && (
                                <span className="block text-white/30 line-through text-[10px] mt-0.5">
                                  {row.savings[pi]}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {service.pricingTable.note && (
                  <p className="text-white/35 text-[11px] mt-3 italic">
                    * {service.pricingTable.note}
                  </p>
                )}

                {/* Formula details toggle */}
                {service.formulaDetails && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setShowFormulas((v) => !v)}
                      className="flex items-center gap-1.5 text-white/40 hover:text-white text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-200"
                    >
                      <ChevronRight
                        size={11}
                        className={`transition-transform duration-200 ${showFormulas ? 'rotate-90' : ''}`}
                      />
                      {showFormulas ? 'Masquer' : 'Voir'} le contenu des formules
                    </button>
                    {showFormulas && (
                      <div className="mt-4 grid grid-cols-2 gap-2.5">
                        {service.formulaDetails.map((formula) => (
                          <div
                            key={formula.name}
                            className="bg-black/20 border border-ar-border/30 p-3"
                          >
                            <h5 className="text-white text-[10px] font-bold uppercase tracking-widest mb-2.5">
                              {formula.name}
                            </h5>
                            <ul className="space-y-1.5">
                              {formula.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-[11px] text-white/55 leading-snug"
                                >
                                  <Check
                                    size={10}
                                    className="text-ar-red flex-shrink-0 mt-0.5"
                                    strokeWidth={2.5}
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Simple Pricing (Extérieur, Optiques) */}
            {service.simplePricing && (
              <div>
                <h4 className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
                  Tarifs
                </h4>
                <div className="space-y-0">
                  {service.simplePricing.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-2.5 border-b border-ar-border/20 last:border-0"
                    >
                      <span className="text-white/60 text-sm">{item.label}</span>
                      <span className="text-white font-bold text-sm">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Includes (Cuirs — no process steps) */}
            {service.includes && (
              <div>
                <h4 className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
                  Inclus dans la prestation
                </h4>
                <div className="space-y-2">
                  {service.includes.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Check size={13} className="text-ar-red flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process */}
            {service.process.length > 0 && (
              <div>
                <h4 className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-semibold mb-4">
                  Notre processus
                </h4>
                <div className="space-y-3">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="w-7 h-7 flex items-center justify-center bg-ar-red/10 border border-ar-red/30 text-ar-red text-xs font-bold flex-shrink-0 mt-0.5">
                        {step.step}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold mb-0.5">{step.label}</p>
                        <p className="text-white/45 text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-7 pb-7">
            <div className="h-px bg-ar-border/40 mb-4" />
            <p className="text-white/25 text-[10px] mb-4 italic">
              * Déplacement inclus en Île-de-France à partir de 99€ TTC de prestation.
            </p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/30 text-[10px] uppercase tracking-widest block mb-0.5">Tarif</span>
                <span className="text-white font-bold text-sm">{service.price}</span>
              </div>
              <a
                href="#contact"
                onClick={onClose}
                className="flex items-center gap-2 bg-ar-red text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-md hover:bg-ar-red/90 transition-colors duration-200"
              >
                Réserver
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ServiceCard({
  service,
  index,
  isInView,
  onDetails,
}: {
  service: Service
  index: number
  isInView: boolean
  onDetails: (s: Service) => void
}) {
  const Icon = service.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
      className="group relative card-base p-6 md:p-7 hover:border-ar-red/50 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col h-full"
      style={{
        background: service.highlight
          ? 'linear-gradient(135deg, #1a0000 0%, #0f0000 100%)'
          : undefined,
      }}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-px transition-all duration-500 ${service.highlight ? 'bg-ar-red' : 'bg-ar-border group-hover:bg-ar-red/60'}`} />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Badge */}
      {service.highlight && (
        <div className="absolute top-4 right-4 bg-ar-red px-2 py-0.5 text-white text-[10px] font-bold uppercase tracking-widest">
          Best Seller
        </div>
      )}

      {/* Icon */}
      <div className={`w-12 h-12 flex items-center justify-center mb-6 transition-colors duration-300 ${service.highlight ? 'text-ar-red' : 'text-white/40 group-hover:text-ar-red'}`}>
        <Icon size={28} strokeWidth={1.5} />
      </div>

      {/* Subtitle / tag */}
      <span className="text-ar-red/70 text-[10px] uppercase tracking-[0.25em] font-semibold mb-2 block">
        {service.subtitle}
      </span>

      {/* Title */}
      <h3 className="font-display font-black text-lg md:text-xl uppercase text-white mb-3 tracking-tight leading-tight">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-1.5 mb-5">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2 text-xs text-white/60">
            <span className="w-1 h-1 rounded-full bg-ar-red flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mb-4">
        <span className="text-white font-bold text-sm">{service.price}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-ar-border/50">
        <button
          type="button"
          aria-label={`Voir les détails de ${service.title}`}
          onClick={() => onDetails(service)}
          className="text-white/40 hover:text-white text-xs uppercase tracking-wider transition-colors duration-200 border border-ar-border/40 hover:border-white/30 px-3 py-1.5 rounded-md"
        >
          Détails
        </button>
        <a
          href="#contact"
          className="flex items-center gap-1 text-ar-red text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all duration-300"
        >
          Réserver
          <ArrowUpRight size={12} />
        </a>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const visibleOnDesktop = 4
  const maxIndex = Math.max(0, services.length - visibleOnDesktop)

  function getCarouselStep(carousel: HTMLDivElement) {
    const firstItem = carousel.children[0] as HTMLElement | undefined
    const secondItem = carousel.children[1] as HTMLElement | undefined

    if (firstItem && secondItem) {
      return secondItem.offsetLeft - firstItem.offsetLeft
    }

    return firstItem?.offsetWidth ?? carousel.clientWidth
  }

  function scrollToService(index: number) {
    const carousel = carouselRef.current
    if (!carousel) return

    const step = getCarouselStep(carousel)
    const left = Math.max(0, index * step)
    carousel.scrollTo({ left, behavior: 'smooth' })
  }

  function scrollCarousel(dir: 1 | -1) {
    const next = Math.max(0, Math.min(maxIndex, carouselIndex + dir))
    setCarouselIndex(next)
    scrollToService(next)
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const carousel = event.currentTarget
    const step = getCarouselStep(carousel)
    const index = step > 0 ? Math.round(carousel.scrollLeft / step) : 0

    setCarouselIndex(Math.max(0, Math.min(services.length - 1, index)))
  }

  return (
    <>
    {selectedService && (
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
    )}
    <section id="services" ref={ref} className="section-padding bg-ar-black relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="text-ar-red text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
            Nos expertises
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
              Nos <br className="hidden md:block" />
              <span className="text-gradient-red">Services</span>
            </h2>
            <div className="flex flex-col gap-4 items-start md:items-end">
              <p className="text-white/50 max-w-sm text-sm leading-relaxed">
                Chaque prestation est réalisée avec des produits professionnels et des techniques
                éprouvées pour des résultats irréprochables.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Carousel — desktop: shows 4, scrolls to reveal 2 more — mobile: all scroll */}
        <div className="relative">
          {/* Left arrow — desktop only */}
          <button
            type="button"
            onClick={() => scrollCarousel(-1)}
            disabled={carouselIndex === 0}
            className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center border border-ar-border/50 bg-ar-black text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 z-10"
            aria-label="Précédent"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Right arrow — desktop only */}
          <button
            type="button"
            onClick={() => scrollCarousel(1)}
            disabled={carouselIndex >= maxIndex}
            className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center border border-ar-border/50 bg-ar-black text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 z-10"
            aria-label="Suivant"
          >
            <ChevronRight size={16} />
          </button>

          {/* Carousel scrollable */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="
              flex gap-4 md:gap-6
              overflow-x-auto scroll-smooth
              snap-x snap-mandatory
              lg:overflow-x-hidden
              pb-2 lg:pb-0
              [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
          >
            {services.map((service, i) => (
              <div
                key={service.id}
                className="
                  snap-start flex-shrink-0
                  w-[80vw] sm:w-[45vw] lg:w-[calc(25%-18px)]
                "
              >
                <ServiceCard
                  service={service}
                  index={i}
                  isInView={isInView}
                  onDetails={setSelectedService}
                />
              </div>
            ))}
          </div>

          {/* Mobile scroll dots */}
          <div className="flex lg:hidden justify-center gap-1.5 mt-5">
            {services.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  setCarouselIndex(i)
                  scrollToService(i)
                }}
                aria-label={`Voir le service ${i + 1}`}
                className="flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === carouselIndex ? 'bg-ar-red w-4' : 'bg-white/20 w-1.5'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-white/40 text-sm mb-5">
            Vous ne savez pas quelle prestation choisir ?
          </p>
          <a href="#contact" className="btn-outline inline-block">
            Obtenir un devis gratuit
          </a>
        </motion.div>
      </div>
    </section>
    </>
  )
}
