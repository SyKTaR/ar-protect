'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronsLeftRight } from 'lucide-react'
import Image from 'next/image'

type ViewType = 'exterieur' | 'interieur'

const views: Record<ViewType, { before: string; after: string; label: string }> = {
  exterieur: {
    before: '/avant.png',
    after: '/apres.png',
    label: 'Extérieur',
  },
  interieur: {
    before: '/avant_interieur.png',
    after: '/apres_interieur.png',
    label: 'Intérieur',
  },
}

export default function BeforeAfterSlider() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [activeView, setActiveView] = useState<ViewType>('exterieur')

  const updatePosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      updatePosition(e.touches[0].clientX)
    },
    [isDragging, updatePosition]
  )

  const stopDrag = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', stopDrag)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', stopDrag)
    }
  }, [onMouseMove, onTouchMove, stopDrag])

  return (
    <section ref={sectionRef} id="avant-apres" className="section-padding bg-ar-anthracite relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, #dc2626 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-ar-red text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
            Transformation
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
            Avant <span className="text-gradient-red">/</span> Après
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            Glissez le curseur pour révéler la transformation. Chaque détail compte.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div
            ref={sliderRef}
            className="relative w-full aspect-[16/9] overflow-hidden cursor-col-resize select-none border border-ar-border"
            onMouseDown={(e) => {
              setIsDragging(true)
              updatePosition(e.clientX)
            }}
            onTouchStart={(e) => {
              setIsDragging(true)
              updatePosition(e.touches[0].clientX)
            }}
          >
            {/* AFTER — base layer (right side / full) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={views[activeView].after}
                alt="Après traitement AR Protect"
                fill
                className="object-cover pointer-events-none"
                draggable={false}
                priority
              />
              {/* After label */}
              <div className="absolute bottom-4 right-4 bg-ar-red px-3 py-1.5 text-white text-xs font-bold uppercase tracking-widest z-10">
                Après
              </div>
            </div>

            {/* BEFORE — clipped left side */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <div
                className="absolute inset-0"
                style={{ width: `${100 / (position / 100)}%` }}
              >
                <Image
                  src={views[activeView].before}
                  alt="Avant traitement AR Protect"
                  fill
                  className="object-cover pointer-events-none"
                  draggable={false}
                  priority
                />
                {/* Before label */}
                <div className="absolute bottom-4 left-4 bg-white/10 border border-white/20 px-3 py-1.5 text-white text-xs font-bold uppercase tracking-widest z-10">
                  Avant
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-px bg-white z-20 pointer-events-none"
              style={{ left: `${position}%` }}
            />

            {/* Drag handle */}
            <div
              className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
              style={{ left: `${position}%` }}
            >
              <motion.div
                animate={{ scale: isDragging ? 1.1 : 1 }}
                className="w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-white"
              >
                <ChevronsLeftRight size={20} className="text-ar-black" />
              </motion.div>
            </div>
          </div>

          {/* Hint text */}
          <p className="text-center text-white/30 text-xs uppercase tracking-widest mt-6">
            Faites glisser le curseur pour comparer
          </p>

          {/* View selector */}
          <div className="flex justify-center gap-3 mt-6">
            {(Object.keys(views) as ViewType[]).map((view) => (
              <button
                type="button"
                key={view}
                onClick={() => {
                  setActiveView(view)
                  setPosition(50)
                }}
                className={`px-6 py-2 text-xs uppercase tracking-widest font-semibold border rounded-full transition-all duration-200 ${
                  activeView === view
                    ? 'bg-ar-red border-ar-red text-white'
                    : 'bg-transparent border-ar-border text-white/50 hover:border-white/40 hover:text-white/80'
                }`}
              >
                {views[view].label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
