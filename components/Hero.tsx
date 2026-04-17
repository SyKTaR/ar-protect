'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Play } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
}

interface HeroProps {
  videoSrc?: string
}

export default function Hero({ videoSrc }: HeroProps = {}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-ar-black to-neutral-950 flex items-center justify-center">
            {/* Decorative geometric lines */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ar-red to-transparent" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
              <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-ar-red to-transparent" />
              <div className="absolute top-0 bottom-0 right-1/4 w-px bg-gradient-to-b from-transparent via-white to-transparent opacity-20" />
            </div>

            {/* Video placeholder visual */}
            <div className="relative flex flex-col items-center gap-4 opacity-20">
              <div className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center">
                <Play size={32} className="text-white ml-1" />
              </div>
              <span className="text-white/50 text-xs uppercase tracking-widest">Slow-motion video</span>
            </div>

            {/* Radial glow */}
            <div className="absolute inset-0 pointer-events-none hero-radial-glow" />
          </div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-ar-black/60" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ar-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-24">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 border border-ar-red/40 bg-ar-red/10 px-4 py-2 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ar-red animate-pulse" />
          <span className="text-ar-red text-xs font-semibold uppercase tracking-[0.2em]">
            DÉPLACEMENT EN ÎLE DE FRANCE
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] uppercase tracking-tight mb-6"
        >
          <span className="block text-white">L&apos;excellence</span>
          <span className="block text-gradient-red">esthétique</span>
          <span className="block text-white">pour votre</span>
          <span className="block text-white/80">véhicule</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-xl mx-auto text-white/60 text-base sm:text-lg font-light leading-relaxed mb-10"
        >
          Nettoyage intérieur comme extérieur, soin des cuirs, lustrage éclatant et rénovation de phare miroir. 
          Un travail de haute précision pour un résultat irréprochable.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="btn-primary w-full sm:w-auto text-center">
            Prendre rendez-vous
          </a>
          <a href="#galerie" className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2">
            <Play size={14} />
            Voir nos réalisations
          </a>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs uppercase tracking-widest">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
