'use client'

import Image from 'next/image'
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const links = {
  services: [
    { label: 'Nettoyage Intérieur', href: '#services' },
    { label: 'Nettoyage Extérieur', href: '#services' },
    { label: 'Polissage', href: '#services' },
    { label: 'Protection Céramique', href: '#services' },
  ],
  navigation: [
    { label: 'Avant / Après', href: '#avant-apres' },
    { label: 'Réalisations', href: '#galerie' },
    { label: 'Avis Clients', href: '#avis' },
    { label: 'Réserver', href: '#contact' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ar-black border-t border-ar-border">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14">
                <Image
                  src="/arprotect_logo.jpg"
                  alt="AR Protect"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              L&apos;excellence du detailing automobile haut de gamme. Chaque véhicule mérite un
              traitement d&apos;exception — nous sommes là pour ça.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 border border-ar-border flex items-center justify-center text-white/50 hover:text-white hover:border-ar-red transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 border border-ar-border flex items-center justify-center text-white/50 hover:text-white hover:border-ar-red transition-all duration-300"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-10 h-10 border border-ar-border flex items-center justify-center text-white/50 hover:text-white hover:border-ar-red transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.22 8.22 0 004.82 1.55V6.89a4.85 4.85 0 01-1.05-.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-ar-red transition-all duration-300 overflow-hidden" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+33600000000"
                  className="flex items-start gap-3 text-white/50 hover:text-white transition-colors duration-200 group"
                >
                  <Phone size={14} className="mt-0.5 text-ar-red flex-shrink-0" />
                  <span className="text-sm">06 36 23 08 07</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@arprotect.fr"
                  className="flex items-start gap-3 text-white/50 hover:text-white transition-colors duration-200"
                >
                  <Mail size={14} className="mt-0.5 text-ar-red flex-shrink-0" />
                  <span className="text-sm">arprotect@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50">
                <MapPin size={14} className="mt-0.5 text-ar-red flex-shrink-0" />
                <span className="text-sm">
                  Chervry Cossigny (77173)
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-ar-red text-xs uppercase tracking-widest font-semibold hover:gap-3 transition-all duration-300"
              >
                Prendre RDV
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ar-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {currentYear} AR Protect. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
