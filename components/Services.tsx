'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Droplets, Sparkles, CircleDot, Shield, ArrowUpRight, X, Check, Clock, ChevronRight } from 'lucide-react'

const services = [
  {
    id: 'interieur',
    icon: Droplets,
    title: 'Nettoyage Intérieur',
    subtitle: 'Deep Clean',
    description:
      "Aspiration complète, traitement des surfaces, nettoyage des sièges et moquettes, désinfection et déodorisation pour un habitacle immaculé.",
    detailedDescription:
      "Notre service de nettoyage intérieur est une prestation complète qui redonne vie à votre habitacle. Nous utilisons des équipements professionnels et des produits adaptés à chaque matière (cuir, alcantara, tissu, plastique) pour garantir un résultat impeccable sans abîmer les surfaces.",
    features: ['Aspiration complète', 'Traitement cuir', 'Désinfection UV', 'Déodorisation'],
    process: [
      { step: '1', label: 'Aspiration intégrale', desc: 'Sièges, moquettes, coffre, coins et recoins avec un aspirateur industriel.' },
      { step: '2', label: 'Nettoyage des surfaces', desc: 'Tableau de bord, portes, console centrale et plastiques traités avec des produits adaptés.' },
      { step: '3', label: 'Traitement des sièges', desc: 'Cuir nourri et protégé, tissu shampouiné en profondeur et séché correctement.' },
      { step: '4', label: 'Désinfection & déodorisation', desc: 'Traitement UV antibactérien et désodorisation ozono ou spray premium.' },
    ],
    duration: 'À partir de 3h',
    price: 'Dès 120€',
    accentPosition: 'top-left',
  },
  {
    id: 'exterieur',
    icon: Sparkles,
    title: 'Nettoyage Extérieur',
    subtitle: 'Full Detail',
    description:
      "Lavage à la main, décontamination de la carrosserie, traitement des jantes, protection des plastiques extérieurs et finition à l'huile de cire.",
    detailedDescription:
      "Le lavage à la main est la méthode la plus douce et la plus respectueuse de votre peinture. Contrairement aux stations de lavage automatiques, notre technique élimine les risques de micro-rayures et assure une finition uniforme sur toute la carrosserie.",
    features: ['Lavage main', 'Décontamination', 'Jantes & vitres', 'Cire protectrice'],
    process: [
      { step: '1', label: 'Pré-rinçage & dégraissage', desc: 'Mousse active appliquée sur l\'ensemble du véhicule pour décoller les salissures.' },
      { step: '2', label: 'Lavage à la main', desc: 'Gants microfibres et savon pH neutre pour préserver la peinture.' },
      { step: '3', label: 'Jantes & pneumatiques', desc: 'Nettoyage des jantes, traitement des étriers et nourrissage des pneus.' },
      { step: '4', label: 'Séchage & finition cire', desc: 'Séchage microfibres et application d\'une cire de protection pour la brillance.' },
    ],
    duration: 'À partir de 2h',
    price: 'Dès 80€',
    accentPosition: 'top-right',
  },
  {
    id: 'polissage',
    icon: CircleDot,
    title: 'Polissage Expert',
    subtitle: 'Paint Correction',
    description:
      "Correction de peinture par étapes avec des machines à orbite professionnelles. Élimination des micro-rayures, swirl marks et oxydations.",
    detailedDescription:
      "Le polissage est l'étape incontournable avant toute protection. Nos techniciens utilisent des machines à orbite double action de dernière génération pour corriger la peinture en douceur, sans risque de brûlure, et révéler tout l'éclat de votre carrosserie.",
    features: ['Correction 1 étape', 'Correction 2 étapes', 'Anti-hologramme', 'Finition gloss'],
    process: [
      { step: '1', label: 'Décontamination chimique & mécanique', desc: 'Iron remover et clay bar pour éliminer toutes les particules incrustées.' },
      { step: '2', label: 'Inspection paint gauge', desc: 'Mesure de l\'épaisseur de peinture pour déterminer le protocole de correction adapté.' },
      { step: '3', label: 'Correction par étapes', desc: 'Polissage en 1 ou 2 passes selon la sévérité des défauts, avec composés abrasifs calibrés.' },
      { step: '4', label: 'Finition anti-hologramme', desc: 'Passe finale avec polish finisseur pour un résultat gloss parfait, exempt de tout défaut.' },
    ],
    duration: 'À partir de 6h',
    price: 'Dès 280€',
    accentPosition: 'bottom-left',
  },
  {
    id: 'ceramique',
    icon: Shield,
    title: 'Protection Céramique',
    subtitle: 'Ceramic Coating',
    description:
      "Application de revêtements céramiques professionnels pour une protection durable jusqu'à 5 ans. Hydrophobie maximale et brillance incomparable.",
    detailedDescription:
      "Le revêtement céramique est la protection ultime pour votre véhicule. Il crée une couche nano-cristalline qui fusionne avec la peinture, offrant une résistance exceptionnelle aux agressions chimiques, UV, rayures légères et salissures. Un investissement qui préserve la valeur de votre véhicule.",
    features: ['Céramique 1 couche', 'Céramique 2+ couches', 'Protection 5 ans', 'Garantie offerte'],
    process: [
      { step: '1', label: 'Paint correction préalable', desc: 'Polissage complet de la peinture obligatoire pour sceller une surface parfaite.' },
      { step: '2', label: 'Dégraissage IPA', desc: 'Nettoyage à l\'alcool isopropylique pour éliminer toute trace de gras ou de silicone.' },
      { step: '3', label: 'Application céramique', desc: 'Application en panneau par panneau dans un environnement contrôlé et sans poussière.' },
      { step: '4', label: 'Nano-cuisson & inspection', desc: 'Temps de réticulation suivi, inspection finale sous éclairage LED et certificat de garantie.' },
    ],
    duration: 'À partir de 8h',
    price: 'Dès 450€',
    accentPosition: 'bottom-right',
    highlight: true,
  },
]

type Service = typeof services[0]

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const Icon = service.icon
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
          <div className="p-7 space-y-8">
            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed">
              {service.detailedDescription}
            </p>

            {/* Features */}
            <div>
              <h4 className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
                Inclus dans la prestation
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {service.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-sm text-white/70">
                    <Check size={13} className="text-ar-red flex-shrink-0" strokeWidth={2.5} />
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
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
          </div>

          {/* Footer */}
          <div className="px-7 pb-7">
            <div className="h-px bg-ar-border/40 mb-5" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div>
                  <span className="text-white/30 text-[10px] uppercase tracking-widest block mb-0.5">Durée</span>
                  <span className="text-white/70 text-sm flex items-center gap-1.5">
                    <Clock size={12} className="text-ar-red" />
                    {service.duration}
                  </span>
                </div>
                <div>
                  <span className="text-white/30 text-[10px] uppercase tracking-widest block mb-0.5">Tarif</span>
                  <span className="text-white font-bold text-sm">{service.price}</span>
                </div>
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

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedService, setSelectedService] = useState<Service | null>(null)

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <p className="text-white/50 max-w-sm text-sm leading-relaxed">
              Chaque prestation est réalisée avec des produits professionnels et des techniques
              éprouvées pour des résultats irréprochables.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative card-base p-6 md:p-7 hover:border-ar-red/50 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col"
                style={{
                  background: service.highlight
                    ? 'linear-gradient(135deg, #1a0000 0%, #0f0000 100%)'
                    : undefined,
                }}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-px transition-all duration-500 ${service.highlight ? 'bg-ar-red' : 'bg-ar-border group-hover:bg-ar-red/60'}`} />

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.06) 0%, transparent 70%)',
                  }}
                />

                {/* Badge */}
                {service.highlight && (
                  <div className="absolute top-4 right-4 bg-ar-red px-2 py-0.5 text-white text-[10px] font-bold uppercase tracking-widest">
                    Premium
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 flex items-center justify-center mb-6 transition-colors duration-300 ${service.highlight ? 'text-ar-red' : 'text-white/40 group-hover:text-ar-red'}`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                {/* Subtitle */}
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
                <ul className="space-y-1.5 mb-6">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-white/60">
                      <span className="w-1 h-1 rounded-full bg-ar-red flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-ar-border/50">
                  <button
                    type="button"
                    aria-label={`Voir les détails de ${service.title}`}
                    onClick={() => setSelectedService(service)}
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
          })}
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
