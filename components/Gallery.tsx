'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

// Simulated gallery items with gradient placeholders
// Replace src with real image paths when available
const galleryItems = [
  {
    id: 1,
    label: 'Porsche 911 — Céramique',
    aspect: 'tall',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    category: 'ceramique',
  },
  {
    id: 2,
    label: 'BMW M3 — Polissage',
    aspect: 'wide',
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    category: 'polissage',
  },
  {
    id: 3,
    label: 'Audi RS7 — Full Detail',
    aspect: 'normal',
    gradient: 'linear-gradient(135deg, #1a0000, #3d0000, #1a0000)',
    category: 'full',
  },
  {
    id: 4,
    label: 'Ferrari — Correction peinture',
    aspect: 'tall',
    gradient: 'linear-gradient(135deg, #200122, #6f0000)',
    category: 'polissage',
  },
  {
    id: 5,
    label: 'Range Rover — Intérieur',
    aspect: 'normal',
    gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #2d2d2d)',
    category: 'interieur',
  },
  {
    id: 6,
    label: 'Mercedes AMG — Extérieur',
    aspect: 'wide',
    gradient: 'linear-gradient(135deg, #0a2342, #1e3a5f, #0a2342)',
    category: 'full',
  },
  {
    id: 7,
    label: 'Lamborghini — Céramique',
    aspect: 'normal',
    gradient: 'linear-gradient(135deg, #1a0a00, #4a1500, #1a0a00)',
    category: 'ceramique',
  },
  {
    id: 8,
    label: 'Maserati — Polissage',
    aspect: 'tall',
    gradient: 'linear-gradient(135deg, #001f3f, #0074d9, #001f3f)',
    category: 'polissage',
  },
  {
    id: 9,
    label: 'Bentley — Full Detail',
    aspect: 'wide',
    gradient: 'linear-gradient(135deg, #1a1a00, #3d3d00, #1a1a00)',
    category: 'full',
  },
]

const categories = [
  { id: 'all', label: 'Tout voir' },
  { id: 'ceramique', label: 'Céramique' },
  { id: 'polissage', label: 'Polissage' },
  { id: 'full', label: 'Full Detail' },
  { id: 'interieur', label: 'Intérieur' },
]

function GalleryCard({
  item,
  onClick,
  index,
  isInView,
}: {
  item: (typeof galleryItems)[0]
  onClick: () => void
  index: number
  isInView: boolean
}) {
  const heightClass =
    item.aspect === 'tall' ? 'h-72' : item.aspect === 'wide' ? 'h-40' : 'h-52'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="masonry-item"
    >
      <div
        className={`relative ${heightClass} overflow-hidden cursor-pointer group border border-ar-border hover:border-ar-red/50 transition-all duration-500`}
        onClick={onClick}
        style={{ background: item.gradient }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-ar-black/20 group-hover:bg-ar-black/40 transition-colors duration-300" />

        {/* Center icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-ar-red/90 flex items-center justify-center">
            <ZoomIn size={20} className="text-white" />
          </div>
        </div>

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-ar-black to-transparent">
          <p className="text-white text-xs font-semibold uppercase tracking-wider">{item.label}</p>
        </div>

        {/* Decorative car silhouette */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-6xl select-none">
          🚗
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null)

  const filtered =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeCategory)

  return (
    <section id="galerie" ref={ref} className="section-padding bg-ar-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-ar-red text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
            Portfolio
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
            Nos <span className="text-gradient-red">Réalisations</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm">
            Chaque véhicule raconte une histoire de transformation. Voici quelques-unes de nos
            réalisations récentes.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-ar-red text-white'
                  : 'border border-ar-border text-white/50 hover:border-ar-red/50 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {filtered.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => setLightbox(item)}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ar-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full aspect-video border border-ar-border overflow-hidden"
              style={{ background: lightbox.gradient }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="text-7xl mb-4 opacity-30">🚗</div>
                <p className="text-white font-display font-bold text-lg uppercase tracking-widest">
                  {lightbox.label}
                </p>
                <p className="text-white/40 text-xs mt-2 uppercase tracking-widest">
                  Photo à remplacer par votre réalisation
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-ar-black/80 border border-ar-border flex items-center justify-center text-white hover:text-ar-red transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
