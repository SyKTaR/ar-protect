'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Maxence E.',
    car: 'Renault Clio 4',
    rating: 5,
    text: "Hyper professionnel je recommande !",
    date: 'Mars 2026',
    service: 'Int, Shampoing sièges',
  },
  {
    id: 2,
    name: 'Sandrine P.',
    car: 'Renault Scenic',
    rating: 5,
    text: "Travail d'excellente qualité et minutieux. La voiture est rendue comme neuve. Je suis ravie de la prestation et je recommande fortement !",
    date: 'Aout 2025',
    service: 'Intérieur & Traitement UV',
  },
  {
    id: 3,
    name: 'Andy G.',
    car: 'Ford Fiesta',
    rating: 5,
    text: "Merci AR PROTECT pour l’expertise !",
    date: 'Mars 2026',
    service: 'Nettoyage Intérieur',
  },
  {
    id: 4,
    name: 'Zoé L.',
    car: 'Suzuki Swift',
    rating: 5,
    text: "Thomas travaille avec sérieux et passion, ça se voit dans le résultat final, ma voiture est comme neuve !!! Je recommande sans hésiter :)",
    date: 'Mars 2026',
    service: 'Nettoyage Intérieur & Extérieur',
  },
  {
    id: 5,
    name: 'Mathilde B.',
    car: 'Renault Twingo 4',
    rating: 5,
    text: "Service impeccable ! 👌 L’intérieur de ma voiture est comme neuf : sièges parfaitement nettoyés, moquettes impeccables et aucune trace de saleté. Et surtout plus de poils de chien ! On voit tout de suite le détail et le professionnalisme. Je recommande à 100 %, je reviendrai sans hésiter !",
    date: 'Février 2026',
    service: 'Nettoyage Intérieur & Extérieur',
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
            { value: '5', label: 'Note de satisfaction', sub: '21 avis' },
            { value: '100%', label: 'Clients satisfaits', sub: 'Taux de satisfaction' },
            { value: '+250', label: 'Véhicules', sub: 'Traités depuis 2026' },
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

          {/* Google Review CTA */}
          <div className="text-center mt-10">
            <a
              href="https://www.google.com/search?hl=fr-FR&gl=fr&q=AR+PROTECT&ludocid=2814090523952500646&lsig=AB86z5UWweasKggHlxyl0s4oPbJM&source=g.page.m._&laa=merchant-review-solicitation&pli=1#lrd=0xa24a85d79d490341:0x270da86bfdfb4fa6,3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-ar-red text-white/50 hover:text-white text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3.5 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm6.116 7.006l-1.767 8.34c-.13.58-.48.72-.974.448l-2.688-1.98-1.297 1.25c-.143.143-.264.264-.54.264l.192-2.727 4.96-4.478c.216-.192-.047-.298-.334-.106L6.73 12.553 4.076 11.74c-.567-.177-.578-.567.118-.84l10.978-4.232c.47-.177.883.106.944.338z"/>
              </svg>
              Laisser un avis Google
              <ExternalLink size={11} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
