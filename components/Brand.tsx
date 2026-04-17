'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, ShieldCheck, Wrench } from 'lucide-react'

const pillars = [
  {
    icon: Sparkles,
    title: 'Nettoyage complet',
    desc: 'Un intérieur sain et un extérieur qui brille vraiment. On ne fait pas semblant.',
  },
  {
    icon: ShieldCheck,
    title: 'Rénovation & Protection',
    desc: 'Phares ternis, micro-rayures, plastiques défraîchis. On efface, on rénove et on protège pour durer.',
  },
  {
    icon: Wrench,
    title: 'Utilisation de produits professionnels uniquement',
    desc: 'Des formules professionnelles, respectueuses de vos matériaux. Rien de cheap.',
  },
]

const words = ['On', 'prend', 'soin', 'de', 'votre', 'voiture,', 'comme', 'si', "c'était", 'la', 'nôtre.']

export default function Brand() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="notre-adn" ref={ref} className="section-padding bg-ar-anthracite relative overflow-hidden">
      {/* Decorative large text background */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display font-black uppercase text-white/[0.025] leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(80px, 18vw, 260px)' }}
        >
          AR PROTECT
        </span>
      </div>

      {/* Top red line accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-ar-red via-ar-red/60 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — brand story */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-ar-red text-xs uppercase tracking-[0.3em] font-semibold mb-6 block"
            >
              Notre ADN
            </motion.span>

            {/* Animated word-by-word headline */}
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[1.05] mb-8">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.055, ease: 'easeOut' }}
                  className={`inline-block mr-[0.22em] ${
                    word === 'nôtre.' ? 'text-gradient-red' : 'text-white'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Body text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="space-y-4 text-white/55 text-sm leading-relaxed"
            >
              <p>
                On le sait : votre voiture, c&apos;est bien plus qu&apos;un simple moyen de transport.
                C&apos;est du temps passé au volant, des souvenirs, et parfois un petit bijou
                qu&apos;on aime voir briller.
              </p>
              <p>
                Chez AR Protect, on est avant tout des{' '}
                <span className="text-white font-semibold">passionnés de belles mécaniques</span>.
                Notre but ? Redonner ce petit coup de jeune qui fait plaisir à chaque fois que
                vous ouvrez votre portière.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-px bg-ar-border my-8"
            />

            {/* Quote pull */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="border-l-2 border-ar-red pl-5"
            >
              <p className="text-white/70 text-sm leading-relaxed italic">
                &ldquo;Le détail fait la différence, et la différence notre signature.&rdquo;
              </p>
              <span className="text-ar-red text-xs uppercase tracking-widest font-semibold mt-2 block">
                — L&apos;équipe AR Protect
              </span>
            </motion.blockquote>
          </div>

          {/* RIGHT — pillars */}
          <div className="flex flex-col gap-0">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/30 text-xs uppercase tracking-[0.3em] font-semibold mb-8"
            >
              Ce qu&apos;on fait concrètement pour vous
            </motion.p>

            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                  className="group relative flex gap-5 py-7 border-b border-ar-border/60 last:border-b-0"
                >
                  {/* Number */}
                  <span className="absolute right-0 top-7 font-display font-black text-5xl text-white/[0.04] leading-none select-none">
                    0{i + 1}
                  </span>

                  {/* Icon box */}
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-ar-border/60 group-hover:border-ar-red/50 group-hover:text-ar-red text-white/40 transition-all duration-300">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1.5 group-hover:text-ar-red transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-8"
            >
              <a href="#contact" className="btn-primary inline-block">
                Prendre rendez-vous
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
