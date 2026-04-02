'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Notre ADN', href: '#notre-adn' },
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#galerie' },
  { label: 'Avis clients', href: '#avis' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isSubPage = pathname !== '/'

  const resolveHref = (anchor: string) => isSubPage ? `/${anchor}` : anchor

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
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href={resolveHref('#')} className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-ar-blanc.png"
                  alt="AR Protect Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 uppercase tracking-widest relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-ar-red group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* CTA Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+33600000000"
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
              className="md:hidden text-white p-2"
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
            className="fixed inset-0 z-40 bg-ar-black flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
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
              ))}
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
