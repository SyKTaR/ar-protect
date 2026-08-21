'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Droplets,
  Sparkles,
  Cog,
  Wind,
  Gem,
  ShieldCheck,
  Shield,
  PaintBucket,
  Paintbrush,
  PaintRoller,
  CircleDot,
  Wand2,
  Lightbulb,
  Sticker,
  Tag,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Category = 'interieur' | 'exterieur' | 'correction'

interface Service {
  id: string
  slug: string
  category: Category
  icon: LucideIcon
  title: string
  description: string
  price: string
  unavailable?: boolean
}

const services: Service[] = [
  // Intérieur
  {
    id: 'interieur',
    slug: 'nettoyage-interieur-voiture',
    category: 'interieur',
    icon: Droplets,
    title: 'Nettoyage intérieur',
    description: 'Nettoyage approfondi pour un habitacle propre et sain.',
    price: 'Dès 69€ TTC',
  },
  {
    id: 'shampoing',
    slug: 'shampoing-sieges-voiture',
    category: 'interieur',
    icon: Wind,
    title: 'Shampoing des sièges',
    description: 'Traitement ciblé des sièges en tissu pour un habitacle plus sain.',
    price: 'Dès 59€ TTC',
  },
  {
    id: 'cuirs',
    slug: 'soin-cuir-voiture',
    category: 'interieur',
    icon: Gem,
    title: 'Soin des cuirs',
    description: 'Nettoyage et nutrition de toutes les surfaces cuir de l’habitacle.',
    price: '89€ TTC',
  },
  // Extérieur
  {
    id: 'exterieur',
    slug: 'nettoyage-exterieur-voiture',
    category: 'exterieur',
    icon: Sparkles,
    title: 'Nettoyage extérieur',
    description: 'Nettoyage approfondi pour une carrosserie impeccable.',
    price: 'Dès 59€ TTC',
  },
  {
    id: 'moteur',
    slug: 'nettoyage-moteur-voiture',
    category: 'exterieur',
    icon: Cog,
    title: 'Nettoyage moteur',
    description: 'Dégraissage soigné du compartiment moteur, sans risque pour les éléments sensibles.',
    price: '49€ TTC',
  },
  {
    id: 'destickage',
    slug: 'destickage-voiture',
    category: 'exterieur',
    icon: Sticker,
    title: 'Déstickage',
    description: 'Retrait soigné de stickers, lettrages et covering.',
    price: '39€ TTC/élément',
  },
  {
    id: 'desiglage',
    slug: 'desiglage-voiture',
    category: 'exterieur',
    icon: Tag,
    title: 'Désiglage',
    description: 'Retrait propre des emblèmes et logos de carrosserie.',
    price: 'Dès 29€ TTC',
  },
  // Correction & protection
  {
    id: 'lustrage',
    slug: 'polissage-lustrage-voiture',
    category: 'correction',
    icon: Wand2,
    title: 'Lustrage',
    description: 'Correction de la brillance et atténuation des défauts légers du vernis.',
    price: 'Sur devis',
  },
  {
    id: 'ceramique',
    slug: 'protection-ceramique-voiture',
    category: 'correction',
    icon: Shield,
    title: 'Traitement céramique',
    description: 'Protection intérieure et extérieure après préparation de la carrosserie.',
    price: 'Indisponible',
    unavailable: true,
  },
  {
    id: 'hydrophobe',
    slug: 'traitement-hydrophobe-voiture',
    category: 'correction',
    icon: ShieldCheck,
    title: 'Traitement hydrophobe',
    description: 'Protection déperlante pour les tissus, l’alcantara ou la capote.',
    price: 'Dès 99€ TTC',
  },
  {
    id: 'revernissage',
    slug: 'revernissage-a-froid-voiture',
    category: 'correction',
    icon: PaintBucket,
    title: 'Revernissage à froid',
    description: 'Reprise du vernis pour redonner de la profondeur à la carrosserie.',
    price: 'Indisponible',
    unavailable: true,
  },
  {
    id: 'retouche-carrosserie',
    slug: 'retouche-peinture-carrosserie-voiture',
    category: 'correction',
    icon: Paintbrush,
    title: 'Retouche peinture carrosserie',
    description: 'Reprise de peinture localisée sur un éclat ou une rayure.',
    price: 'Sur devis',
  },
  {
    id: 'retouche-plastique',
    slug: 'retouche-peinture-plastique-voiture',
    category: 'correction',
    icon: PaintRoller,
    title: 'Retouche peinture plastique',
    description: 'Reprise de peinture ciblée sur les éléments plastiques du véhicule.',
    price: 'Sur devis',
  },
  {
    id: 'jantes',
    slug: 'reparation-jantes-voiture',
    category: 'correction',
    icon: CircleDot,
    title: 'Réparation jantes',
    description: 'Reprise des éclats et frottements sur jantes alliage.',
    price: 'Sur devis',
  },
  {
    id: 'optiques',
    slug: 'renovation-phares-voiture',
    category: 'correction',
    icon: Lightbulb,
    title: 'Correction optique de phare',
    description: 'Ponçage et polissage pour restaurer la transparence des optiques.',
    price: 'Dès 49€ TTC',
  },
]

const categories: { id: Category; label: string }[] = [
  { id: 'interieur', label: 'Intérieur' },
  { id: 'exterieur', label: 'Extérieur' },
  { id: 'correction', label: 'Correction & protection' },
]

function ServiceCard({ service, index, isInView }: { service: Service; index: number; isInView: boolean }) {
  const Icon = service.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.36) }}
      className="group relative card-base p-6 md:p-7 hover:border-ar-red/50 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-ar-border group-hover:bg-ar-red/60 transition-all duration-500" />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.06) 0%, transparent 70%)',
        }}
      />

      {service.unavailable && (
        <div className="absolute top-4 right-4 border border-ar-red/40 bg-ar-red/10 px-2 py-0.5 text-ar-red text-[10px] font-bold uppercase tracking-widest">
          Bientôt disponible
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center mb-6 text-white/40 group-hover:text-ar-red transition-colors duration-300">
        <Icon size={28} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <a href={`/services/${service.slug}`} className="block min-h-11">
        <h3 className="font-display font-black text-lg md:text-xl uppercase text-white mb-3 tracking-tight leading-tight hover:text-ar-red transition-colors">
          {service.title}
        </h3>
      </a>

      {/* Description */}
      <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">
        {service.description}
      </p>

      {/* Price */}
      <div className="mb-4">
        <span className={`font-bold text-sm ${service.unavailable ? 'text-white/40' : 'text-white'}`}>
          {service.price}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-ar-border/50">
        <a
          href={`/services/${service.slug}`}
          className="text-white/40 hover:text-white text-xs uppercase tracking-wider transition-colors duration-200 border border-ar-border/40 hover:border-white/30 px-3 py-1.5 rounded-md"
        >
          Détails
        </a>
        {service.unavailable ? (
          <span className="text-white/25 text-xs font-semibold uppercase tracking-wider cursor-not-allowed">
            Indisponible
          </span>
        ) : (
          <a
            href="#contact"
            className="flex items-center gap-1 text-ar-red text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all duration-300"
          >
            Réserver
            <ArrowUpRight size={12} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeCategory, setActiveCategory] = useState<Category>('interieur')

  const visibleServices = services.filter((s) => s.category === activeCategory)

  return (
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
          className="mb-10 md:mb-14"
        >
          <span className="text-ar-red text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
            Nos expertises
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
            Nos <span className="text-gradient-red">Services</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 md:mb-10"
        >
          {categories.map((cat) => {
            const count = services.filter((s) => s.category === cat.id).length
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-ar-red text-white'
                    : 'border border-ar-border text-white/50 hover:border-ar-red/50 hover:text-white'
                }`}
              >
                {cat.label}
                <span className={activeCategory === cat.id ? 'text-white/70' : 'text-white/30'}>
                  {count}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {visibleServices.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} isInView={isInView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 md:mt-12"
        >
          <p className="text-white/40 text-sm mb-5">
            Vous ne savez pas quelle prestation choisir ?
          </p>
          <a href="#contact" className="btn-outline inline-flex items-center gap-2">
            Obtenir un devis gratuit
            <ChevronRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
