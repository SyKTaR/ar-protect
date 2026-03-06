'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Thomas K.',
    car: 'Peugeot 207',
    rating: 5,
    text: "Un travail d'une précision remarquable. Ma voiture brille comme au premier jour, voire mieux. L'équipe AR Protect traite chaque véhicule avec un soin exceptionnel. Je ne confierai ma voiture qu'à eux désormais.",
    date: 'Novembre 2025',
    service: 'Protection Céramique',
  },
  {
    id: 2,
    name: 'Sophie L.',
    car: 'Audi RS6',
    rating: 5,
    text: "Je suis bluffée par le résultat du polissage. Des rayures que je croyais permanentes ont tout simplement disparu. Le service est professionnel, ponctuel et le résultat dépasse toutes mes attentes.",
    date: 'Octobre 2025',
    service: 'Polissage Expert',
  },
  {
    id: 3,
    name: 'Karim B.',
    car: 'BMW M4 Competition',
    rating: 5,
    text: "Detailing complet intérieur/extérieur + céramique sur ma M4. Le résultat est tout simplement spectaculaire. La carrosserie repousse l'eau de façon incroyable. Rapport qualité/prix excellent pour ce niveau de service.",
    date: 'Janvier 2026',
    service: 'Full Detail + Céramique',
  },
  {
    id: 4,
    name: 'Marie-Claire V.',
    car: 'Range Rover',
    rating: 5,
    text: "Mon Range Rover semblait usé après 3 ans. Après une journée chez AR Protect, il ressort comme neuf. Les cuirs sont traités, la peinture est parfaite. Un vrai travail d'orfèvre comme ils le disent eux-mêmes.",
    date: 'Fevrier 2026',
    service: 'Nettoyage Intérieur & Extérieur',
  },
  {
    id: 5,
    name: 'Alexandre D.',
    car: 'Renault Clio 5',
    rating: 5,
    text: "Confier une voiture demande une confiance absolue. AR Protect l'a méritée. Soin méticuleux, produits premium, résultat irréprochable. Ma clio 5 n'a jamais été aussi belle depuis sa sortie d'usine.",
    date: 'Décembre 2025',
    service: 'Correction de Peinture + Céramique',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-ar-red fill-ar-red' : 'text-white/20'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [])

  const testimonial = testimonials[current]

  return (
    <section id="avis" ref={ref} className="section-padding bg-ar-anthracite relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 21px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-ar-red text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
            Ils nous font confiance
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
            Avis <span className="text-gradient-red">Clients</span>
          </h2>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 mb-16"
        >
          {[
            { value: '4.7', label: 'Note de satisfaction', sub: '23 avis' },
            { value: '100%', label: 'Clients satisfaits', sub: 'Taux de satisfaction' },
            { value: '+100', label: 'Véhicules', sub: 'Traités depuis 2025' },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-6 border-r border-ar-border last:border-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-white">{stat.value}</div>
              <div className="text-white/60 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
              <div className="text-white/30 text-xs mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Main slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="bg-ar-card border border-ar-border p-8 md:p-12 relative"
              >
                {/* Quote icon */}
                <Quote
                  size={48}
                  className="text-ar-red/20 absolute top-6 right-8 fill-ar-red/10"
                />

                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Text */}
                <blockquote className="mt-6 text-white/80 text-base md:text-lg leading-relaxed font-light italic">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-ar-red/20 border border-ar-red/30 flex items-center justify-center text-ar-red font-bold text-sm">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                      <div className="text-white/40 text-xs">{testimonial.car}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-ar-red/80 text-xs font-semibold uppercase tracking-wider">
                      {testimonial.service}
                    </div>
                    <div className="text-white/30 text-xs mt-0.5">{testimonial.date}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 border border-ar-border hover:border-ar-red flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1)
                    setCurrent(i)
                  }}
                  className={`transition-all duration-300 ${
                    i === current ? 'w-8 h-1 bg-ar-red' : 'w-2 h-1 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Avis ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 border border-ar-border hover:border-ar-red flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
