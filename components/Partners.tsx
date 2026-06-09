'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

type Partner = {
  id: number
  name: string
  logo: string | null
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
]

function PartnerCard({
  partner,
  index,
  isInView,
}: {
  partner: Partner
  index: number
  isInView: boolean
}) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
      className="group border border-ar-border hover:border-ar-red/40 transition-all duration-300 bg-ar-dark hover:bg-ar-anthracite rounded-md p-px overflow-hidden"
    >
      {/* Zone logo sur fond blanc — accommode les logos avec fond blanc */}
      <div className="flex items-center justify-center w-56 h-24 bg-white/90 group-hover:bg-white transition-colors duration-300 px-6 py-4 rounded-md">
        {partner.logo ? (
          <Image
            src={partner.logo}
            alt={partner.name}
            width={300}
            height={120}
            className="object-contain max-h-full max-w-full w-auto h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        ) : (
          <span className="font-display font-black text-sm uppercase tracking-widest text-black/40 group-hover:text-black/70 transition-colors duration-300 text-center leading-tight">
            {partner.name}
          </span>
        )}
      </div>
    </motion.div>
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

        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner, i) => (
            <PartnerCard key={partner.id} partner={partner} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
