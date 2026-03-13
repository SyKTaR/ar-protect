'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import Image from 'next/image'

type GalleryItem = {
  id: number
  label: string
  aspect: 'tall' | 'wide' | 'normal'
  gradient: string
  category: string
  images?: string[] // Chemins vers les vraies photos (optionnel)
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    label: 'BMW Série 1',
    aspect: 'tall',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    category: 'full',
    images: [
      '/gallery/bmw-serie-1/image1.jpeg',
      '/gallery/bmw-serie-1/image2.jpeg',
      '/gallery/bmw-serie-1/image3.jpeg',
      '/gallery/bmw-serie-1/image4.jpeg',
      '/gallery/bmw-serie-1/image5.jpeg',
    ],
  },
  {
    id: 2,
    label: 'Audi S3',
    aspect: 'wide',
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    category: 'full',
    images: [
      '/gallery/audi-s3/image1.jpeg',
      '/gallery/audi-s3/image2.jpeg',
      '/gallery/audi-s3/image3.jpeg',
      '/gallery/audi-s3/image4.jpeg',
    ],
  },
  {
    id: 3,
    label: 'BMW X5',
    aspect: 'normal',
    gradient: 'linear-gradient(135deg, #1a0000, #3d0000, #1a0000)',
    category: 'full',
    images: [
      '/gallery/bmw-x5/image1.jpeg',
      '/gallery/bmw-x5/image2.jpeg',
      '/gallery/bmw-x5/image3.jpeg',
      '/gallery/bmw-x5/image4.jpeg',
    ],
  },
  {
    id: 4,
    label: 'Mercedes CLA',
    aspect: 'tall',
    gradient: 'linear-gradient(135deg, #200122, #6f0000)',
    category: 'full',
    images: [
      '/gallery/mercedes-cla/image1.jpeg',
      '/gallery/mercedes-cla/image2.jpeg',
      '/gallery/mercedes-cla/image3.jpeg',
      '/gallery/mercedes-cla/image4.jpeg',
      '/gallery/mercedes-cla/image5.jpeg',
    ],
  },
  {
    id: 5,
    label: 'Peugeot 308',
    aspect: 'normal',
    gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #2d2d2d)',
    category: 'full',
    images: [
      '/gallery/peugeot-308/image3.jpeg',
      '/gallery/peugeot-308/image2.jpeg',
      '/gallery/peugeot-308/image1.jpeg',
      '/gallery/peugeot-308/image4.jpeg',
    ],
  },
  {
    id: 6,
    label: 'Renault Rafale',
    aspect: 'wide',
    gradient: 'linear-gradient(135deg, #0a2342, #1e3a5f, #0a2342)',
    category: 'full',
    images: [
      '/gallery/renault-rafale/image4.jpeg',
      '/gallery/renault-rafale/image2.jpeg',
      '/gallery/renault-rafale/image3.jpeg',
      '/gallery/renault-rafale/image1.jpeg',
      '/gallery/renault-rafale/image5.jpeg',
    ],
  },
  {
    id: 7,
    label: 'Tesla Model 3',
    aspect: 'normal',
    gradient: 'linear-gradient(135deg, #1a0a00, #4a1500, #1a0a00)',
    category: 'full',
    images: [
      '/gallery/tesla-model3/image1.jpeg',
      '/gallery/tesla-model3/image2.jpeg',
      '/gallery/tesla-model3/image3.jpeg',
      '/gallery/tesla-model3/image4.jpeg',
      '/gallery/tesla-model3/image5.jpeg',
    ],
  },
  {
    id: 8,
    label: 'Mercedes CLA 35 AMG',
    aspect: 'tall',
    gradient: 'linear-gradient(135deg, #001f3f, #0074d9, #001f3f)',
    category: 'full',
    images: [
      '/gallery/mercedes-cla35/image1.jpeg',
      '/gallery/mercedes-cla35/image2.jpeg',
      '/gallery/mercedes-cla35/image3.jpeg',
      '/gallery/mercedes-cla35/image4.jpeg',
      '/gallery/mercedes-cla35/image5.jpeg',
      '/gallery/mercedes-cla35/image6.jpeg',
    ],
  },
  {
    id: 9,
    label: 'Bentley Continental',
    aspect: 'wide',
    gradient: 'linear-gradient(135deg, #1a1a00, #3d3d00, #1a1a00)',
    category: 'full',
    images: [
      '/gallery/bentley-continental/image1.jpeg',
    ],
  },
  {
    id: 10,
    label: 'Honda Civic',
    aspect: 'normal',
    gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #2d2d2d)',
    category: 'full',
    images: [
      '/gallery/honda-civic/image1.jpeg', 
    ]
  }
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
  item: GalleryItem
  onClick: () => void
  index: number
  isInView: boolean
}) {
  const heightClass =
    item.aspect === 'tall' ? 'h-72' : item.aspect === 'wide' ? 'h-40' : 'h-52'
  const hasPhotos = item.images && item.images.length > 0

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
        style={!hasPhotos ? { background: item.gradient } : {}}
      >
        {/* Real photo (first image as thumbnail) */}
        {hasPhotos && (
          <Image
            src={item.images![0]}
            alt={item.label}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-ar-black/20 group-hover:bg-ar-black/50 transition-colors duration-300" />

        {/* Center icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-ar-red/90 flex items-center justify-center">
            <ZoomIn size={20} className="text-white" />
          </div>
        </div>

        {/* Photo count badge */}
        {hasPhotos && item.images!.length > 1 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-ar-black/70 px-2 py-1 text-white text-[10px] uppercase tracking-wider">
            <Images size={10} />
            <span>{item.images!.length}</span>
          </div>
        )}

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-ar-black to-transparent">
          <p className="text-white text-xs font-semibold uppercase tracking-wider">{item.label}</p>
        </div>

        {/* Decorative car silhouette (only without real photo) */}
        {!hasPhotos && (
          <div className="absolute inset-0 flex items-center justify-center opacity-10 text-6xl select-none">
            🚗
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem
  onClose: () => void
}) {
  const hasPhotos = item.images && item.images.length > 0
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = hasPhotos ? item.images!.length : 1

  const prev = useCallback(() => {
    if (total <= 1) return
    setDirection(-1)
    setCurrentIndex((i) => (i - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    if (total <= 1) return
    setDirection(1)
    setCurrentIndex((i) => (i + 1) % total)
  }, [total])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-ar-black/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div
          className={`relative w-full aspect-video border border-ar-border overflow-hidden ${hasPhotos ? 'bg-[#0d0d0d]' : ''}`}
          style={!hasPhotos ? { background: item.gradient } : undefined}
        >
          {hasPhotos ? (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) next()
                  else if (info.offset.x > 60) prev()
                }}
              >
                <Image
                  src={item.images![currentIndex]}
                  alt={`${item.label} — photo ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="text-7xl mb-4 opacity-30">🚗</div>
              <p className="text-white font-display font-bold text-lg uppercase tracking-widest">
                {item.label}
              </p>
              <p className="text-white/40 text-xs mt-2 uppercase tracking-widest">
                Photo à remplacer par votre réalisation
              </p>
            </div>
          )}

          {/* Close button */}
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-ar-black/80 border border-ar-border flex items-center justify-center text-white hover:text-ar-red transition-colors"
          >
            <X size={18} />
          </button>

          {/* Arrow navigation */}
          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="Photo précédente"
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-ar-black/70 border border-ar-border flex items-center justify-center text-white hover:text-ar-red hover:border-ar-red/50 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Photo suivante"
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-ar-black/70 border border-ar-border flex items-center justify-center text-white hover:text-ar-red hover:border-ar-red/50 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Footer: label + dots */}
        <div className="flex items-center justify-between mt-3 px-1">
          <p className="text-white/70 text-xs uppercase tracking-widest">{item.label}</p>

          {total > 1 && (
            <div className="flex items-center gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  type="button"
                  aria-label={`Photo ${i + 1}`}
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1)
                    setCurrentIndex(i)
                  }}
                  className={`w-1.5 h-1.5 transition-all duration-300 ${
                    i === currentIndex ? 'bg-ar-red w-4' : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
              <span className="text-white/40 text-xs ml-2">
                {currentIndex + 1}/{total}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

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
        {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  )
}
