'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X, Phone, ChevronDown, User, Briefcase } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#galerie' },
  { label: 'Avis clients', href: '#avis' },
]

const contactOptions = [
  { label: 'Particulier', desc: 'Réserver ma prestation', href: '#contact', icon: User },
  { label: 'Professionnel', desc: 'Garage, concession, flotte', href: '#pro', icon: Briefcase },
]

const servicesMenu = [
  {
    category: 'Intérieur',
    items: [
      { label: 'Nettoyage intérieur', href: '/services/nettoyage-interieur-voiture' },
      { label: 'Shampoing des sièges', href: '/services/shampoing-sieges-voiture' },
      { label: 'Soin des cuirs', href: '/services/soin-cuir-voiture' },
    ],
  },
  {
    category: 'Extérieur',
    items: [
      { label: 'Nettoyage extérieur', href: '/services/nettoyage-exterieur-voiture' },
      { label: 'Nettoyage moteur', href: '/services/nettoyage-moteur-voiture' },
      { label: 'Déstickage', href: '/services/destickage-voiture' },
      { label: 'Désiglage', href: '/services/desiglage-voiture' },
    ],
  },
  {
    category: 'Correction & protection',
    items: [
      { label: 'Lustrage', href: '/services/polissage-lustrage-voiture' },
      { label: 'Traitement céramique', href: '/services/protection-ceramique-voiture' },
      { label: 'Traitement hydrophobe', href: '/services/traitement-hydrophobe-voiture' },
      { label: 'Revernissage à froid', href: '/services/revernissage-a-froid-voiture' },
      { label: 'Retouche peinture carrosserie', href: '/services/retouche-peinture-carrosserie-voiture' },
      { label: 'Retouche peinture plastique', href: '/services/retouche-peinture-plastique-voiture' },
      { label: 'Réparation jante', href: '/services/reparation-jantes-voiture' },
      { label: 'Correction optique de phare', href: '/services/renovation-phares-voiture' },
    ],
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesHover, setServicesHover] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [contactHover, setContactHover] = useState(false)
  const [contactOpenMobile, setContactOpenMobile] = useState(false)
  const pathname = usePathname()
  const isSubPage = pathname !== '/'

  const resolveHref = (href: string) => href.startsWith('#') && isSubPage ? `/${href}` : href

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ar-black/95 backdrop-blur-md border-b border-ar-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <a href={resolveHref('#')} className="flex items-center gap-3 group">
              <div className="relative w-28 h-28 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-ar-blanc.png"
                  alt="AR Protect Detailing Logo"
                  fill
                  sizes="112px"
                  className="object-contain"
                  priority
                />
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                if (link.label === 'Services') {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setServicesHover(true)}
                      onMouseLeave={() => setServicesHover(false)}
                    >
                      <a
                        href={resolveHref(link.href)}
                        className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 uppercase tracking-widest relative group"
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${servicesHover ? 'rotate-180' : ''}`}
                        />
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-ar-red group-hover:w-full transition-all duration-300" />
                      </a>

                      <AnimatePresence>
                        {servicesHover && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[560px] bg-ar-dark border border-ar-border rounded-lg shadow-2xl overflow-hidden z-50"
                          >
                            <div className="grid grid-cols-3 gap-4 p-5">
                              {servicesMenu.map((group) => (
                                <div key={group.category}>
                                  <p className="text-xs font-semibold text-ar-red uppercase tracking-widest mb-3">
                                    {group.category}
                                  </p>
                                  <ul className="flex flex-col gap-2">
                                    {group.items.map((item) => (
                                      <li key={item.label}>
                                        <a
                                          href={resolveHref(item.href)}
                                          className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                                        >
                                          {item.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <a
                              href={resolveHref('#services')}
                              className="flex items-center justify-center gap-2 py-3 border-t border-ar-border text-sm font-medium text-white/70 hover:text-white hover:bg-ar-red/10 transition-all duration-200"
                            >
                              Découvrir tous nos services
                              <ChevronDown size={14} className="-rotate-90" />
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <a
                    key={link.href}
                    href={resolveHref(link.href)}
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 uppercase tracking-widest relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-ar-red group-hover:w-full transition-all duration-300" />
                  </a>
                )
              })}

              {/* Contact dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setContactHover(true)}
                onMouseLeave={() => setContactHover(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 uppercase tracking-widest relative group"
                >
                  Contact
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${contactHover ? 'rotate-180' : ''}`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-ar-red group-hover:w-full transition-all duration-300" />
                </button>

                <AnimatePresence>
                  {contactHover && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-4 w-64 bg-ar-dark border border-ar-border rounded-lg shadow-2xl overflow-hidden z-50"
                    >
                      {contactOptions.map((option) => {
                        const Icon = option.icon
                        return (
                          <a
                            key={option.label}
                            href={resolveHref(option.href)}
                            className="flex items-start gap-3 p-4 hover:bg-ar-red/10 transition-colors duration-150 border-b border-ar-border last:border-0"
                          >
                            <Icon size={16} className="text-ar-red flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-white">{option.label}</div>
                              <div className="text-xs text-white/40 mt-0.5">{option.desc}</div>
                            </div>
                          </a>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* CTA Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+33636230807"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <Phone size={14} />
                <span className="font-medium">06 36 23 08 07</span>
              </a>
              <a
                href={resolveHref('#contact')}
                className="btn-primary text-xs"
              >
                Réserver
              </a>
            </div>

            {/* Mobile burger */}
            <button
              className="lg:hidden min-h-11 min-w-11 text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ar-black px-8 pt-24"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                if (link.label === 'Services') {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="border-b border-ar-border pb-4"
                    >
                      <button
                        type="button"
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex items-center justify-between w-full text-2xl font-display font-bold text-white hover:text-ar-red transition-colors duration-200 uppercase tracking-widest"
                      >
                        Services
                        <ChevronDown
                          size={22}
                          className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 flex flex-col gap-4">
                              {servicesMenu.map((group) => (
                                <div key={group.category}>
                                  <p className="text-xs font-semibold text-ar-red uppercase tracking-widest mb-2">
                                    {group.category}
                                  </p>
                                  <ul className="flex flex-col gap-2 pl-2">
                                    {group.items.map((item) => (
                                      <li key={item.label}>
                                        <a
                                          href={resolveHref(item.href)}
                                          onClick={() => { setMobileOpen(false); setServicesOpen(false) }}
                                          className="text-base text-white/60 hover:text-white transition-colors duration-150"
                                        >
                                          {item.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <a
                                href={resolveHref('#services')}
                                onClick={() => { setMobileOpen(false); setServicesOpen(false) }}
                                className="text-sm font-semibold text-ar-red hover:text-white transition-colors duration-150 mt-1"
                              >
                                Découvrir tous nos services →
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                }

                return (
                  <motion.a
                    key={link.href}
                    href={resolveHref(link.href)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-display font-bold text-white hover:text-ar-red transition-colors duration-200 uppercase tracking-widest border-b border-ar-border pb-4"
                  >
                    {link.label}
                  </motion.a>
                )
              })}

              {/* Contact dropdown — mobile */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="border-b border-ar-border pb-4"
              >
                <button
                  type="button"
                  onClick={() => setContactOpenMobile(!contactOpenMobile)}
                  className="flex items-center justify-between w-full text-2xl font-display font-bold text-white hover:text-ar-red transition-colors duration-200 uppercase tracking-widest"
                >
                  Contact
                  <ChevronDown
                    size={22}
                    className={`transition-transform duration-300 ${contactOpenMobile ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {contactOpenMobile && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 flex flex-col gap-4">
                        {contactOptions.map((option) => {
                          const Icon = option.icon
                          return (
                            <a
                              key={option.label}
                              href={resolveHref(option.href)}
                              onClick={() => { setMobileOpen(false); setContactOpenMobile(false) }}
                              className="flex items-start gap-3 text-white/60 hover:text-white transition-colors duration-150"
                            >
                              <Icon size={18} className="text-ar-red flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-base font-semibold">{option.label}</div>
                                <div className="text-xs text-white/40 mt-0.5">{option.desc}</div>
                              </div>
                            </a>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto mb-12"
            >
              <a href={resolveHref('#contact')} onClick={() => setMobileOpen(false)} className="btn-primary block text-center">
                Réserver mon diagnostic
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
