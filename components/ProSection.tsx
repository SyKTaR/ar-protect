'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, ArrowUpRight } from 'lucide-react'

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const perks = [
  'Tarifs dégressifs',
  'Facturation professionnelle sur devis',
  'Prise en charge dédiée & prioritaire',
  'Déplacement en Île-de-France inclus',
]

export default function ProSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="section-padding bg-ar-black border-t border-ar-border relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-ar-red via-ar-red/60 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Left — headline + perks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-ar-red text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
              Professionnels
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none mb-6">
              Garagiste, concessionnaire{' '}
              <br className="hidden sm:block" />
              ou flotte de véhicules ?
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
              Tarifs préférentiels et prise en charge dédiée pour les professionnels de l&apos;automobile.
            </p>

            <ul className="space-y-3.5">
              {perks.map((perk, i) => (
                <li key={perk}>
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <span className="w-5 h-5 flex items-center justify-center bg-ar-red/10 border border-ar-red/30 flex-shrink-0">
                      <Check size={11} className="text-ar-red" strokeWidth={2.5} />
                    </span>
                    {perk}
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — contact card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative card-base p-8 lg:p-10 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)' }}
          >
            {/* Card top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-ar-red/60" />

            {/* Subtle glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.05) 0%, transparent 70%)',
              }}
            />

            <div className="relative">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-semibold mb-2">
                Offre professionnelle
              </p>
              <p className="text-white font-semibold text-lg mb-1">
                Contactez-nous directement
              </p>
              <p className="text-white/40 text-sm mb-5">
                Devis personnalisé sous 24h — sans engagement.
              </p>

              <a
                href="https://wa.me/33636230807?text=Bonjour%2C%20je%20suis%20professionnel%20et%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20offres."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-[#25D366]/10 border border-[#25D366]/40 hover:bg-[#25D366]/20 hover:border-[#25D366]/70 text-[#25D366] font-semibold px-6 py-4 text-sm transition-all duration-200 uppercase tracking-widest mb-3 group"
              >
                <span className="flex items-center gap-3">
                  <WhatsAppIcon />
                  WhatsApp
                </span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>

              <div className="h-px bg-ar-border/40 my-6" />

              <div className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-ar-red flex-shrink-0 mt-2" />
                <p className="text-white/30 text-xs leading-relaxed">
                  Garagistes, concessionnaires, loueurs et gestionnaires de flotte, tarifs sur mesure.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
