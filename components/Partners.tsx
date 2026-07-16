'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

type Partner = {
  id: number
  name: string
  logo: string | null
  logoDisplay?: 'volkswagen' | 'skoda'
  url?: string
}

const partners: Partner[] = [
  {
    id: 1,
    name: 'JL Perf',
    logo: '/partners/jlperf.png',
  },
  {
    id: 2,
    name: 'Atlas Automobiles',
    logo: '/partners/atlas-automobiles.png',
  },
  {
    id: 3,
    name: 'Hygie Meca',
    logo: '/partners/hygie-meca.png',
  },
  {
    id: 4,
    name: 'Volkswagen',
    logo: '/partners/vw.PNG',
    logoDisplay: 'volkswagen',
  },
  {
    id: 5,
    name: 'Škoda',
    logo: '/partners/skoda.PNG',
    logoDisplay: 'skoda',
  },
  {
    id: 6,
    name: 'Jallu-Berthier',
    logo: '/partners/jallu_berthier.PNG',
  },
]

// Une séquence doit rester plus large que les grands écrans pour éviter tout vide dans la boucle.
const marqueePartners = Array.from({ length: 3 }, () => partners).flat()

function PartnerCard({ partner }: { partner: Partner }) {
  const logoClassName =
    partner.logoDisplay === 'volkswagen'
      ? 'object-contain w-24 h-24 sm:w-28 sm:h-28 max-w-none max-h-none opacity-80 group-hover:opacity-100 transition-opacity duration-300'
      : partner.logoDisplay === 'skoda'
        ? 'object-contain w-48 h-48 sm:w-56 sm:h-56 max-w-none max-h-none opacity-80 group-hover:opacity-100 transition-opacity duration-300'
        : 'object-contain max-h-full max-w-full w-auto h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300'

  const inner = (
    <div className="group shrink-0 border border-ar-border hover:border-ar-red/40 transition-all duration-300 bg-ar-dark hover:bg-ar-anthracite rounded-md p-px overflow-hidden">
      {/* Zone logo sur fond blanc — accommode les logos avec fond blanc */}
      <div className="flex items-center justify-center w-44 h-20 sm:w-56 sm:h-24 bg-white/90 group-hover:bg-white transition-colors duration-300 px-5 py-3 sm:px-6 sm:py-4 rounded-md">
        {partner.logo ? (
          <Image
            src={partner.logo}
            alt={partner.name}
            width={partner.logoDisplay ? 224 : 300}
            height={partner.logoDisplay ? 224 : 120}
            className={logoClassName}
          />
        ) : (
          <span className="font-display font-black text-sm uppercase tracking-widest text-black/40 group-hover:text-black/70 transition-colors duration-300 text-center leading-tight">
            {partner.name}
          </span>
        )}
      </div>
    </div>
  )

  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  )
}

export default function Partners() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-ar-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-ar-red text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
            Ils nous font confiance
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
            Nos <span className="text-gradient-red">Partenaires</span>
          </h2>
        </motion.div>

      </div>

      <div className="partners-marquee overflow-hidden" aria-label="Nos partenaires">
        <div className="partners-marquee-track flex w-max">
          <div className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6">
            {marqueePartners.map((partner, index) => (
              <PartnerCard key={`${index}-${partner.id}`} partner={partner} />
            ))}
          </div>

          <div className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6" aria-hidden="true">
            {marqueePartners.map((partner, index) => (
              <PartnerCard key={`duplicate-${index}-${partner.id}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
