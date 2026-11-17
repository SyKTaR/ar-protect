'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { initAnalytics, OPEN_CONSENT_EVENT, readConsent, saveConsent } from '@/lib/analytics'

export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initAnalytics()
    if (!readConsent()) setOpen(true)
    const reopen = () => {
      setAnalytics(readConsent()?.analytics === true)
      setCustomizing(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  useEffect(() => {
    if (open && customizing) panelRef.current?.focus()
  }, [open, customizing])

  const choose = useCallback((value: boolean) => {
    saveConsent(value)
    setOpen(false)
    setCustomizing(false)
  }, [])

  if (!open) return null

  const buttonBase =
    'min-h-11 flex-1 px-4 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ar-card'

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[10000] border-t border-ar-border bg-ar-card shadow-[0_-8px_32px_rgba(0,0,0,0.5)] outline-none sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-md sm:border"
    >
      <div className="max-h-[85vh] overflow-y-auto p-4 sm:p-5">
        <p id="cookie-consent-title" className="text-sm font-bold text-white">
          Vos choix sur les cookies
        </p>
        <p id="cookie-consent-desc" className="mt-2 text-xs leading-relaxed text-white/70">
          Nous utilisons Google Analytics pour mesurer la fréquentation du site et savoir quelles pages
          mènent à une demande de devis. Rien n&apos;est déposé sans votre accord. Vous pouvez changer
          d&apos;avis à tout moment depuis le pied de page.{' '}
          <Link href="/politique-de-confidentialite#cookies" className="text-white underline underline-offset-2 hover:text-ar-red">
            En savoir plus
          </Link>
        </p>

        {customizing && (
          <div className="mt-4 space-y-3 border-t border-ar-border pt-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-white">Cookies nécessaires</p>
                <p className="mt-1 text-xs text-white/50">
                  Aucun cookie de suivi n&apos;est nécessaire au fonctionnement du site. Votre choix est
                  mémorisé 6 mois dans votre navigateur.
                </p>
              </div>
              <span className="mt-0.5 text-[11px] uppercase tracking-widest text-white/40">Toujours actif</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <label htmlFor="cookie-analytics" className="text-xs font-semibold text-white">
                  Mesure d&apos;audience (Google Analytics)
                </label>
                <p className="mt-1 text-xs text-white/50">
                  Pages vues, appels, e-mails, WhatsApp et demandes de devis envoyées. Aucune donnée
                  saisie dans le formulaire n&apos;est transmise.
                </p>
              </div>
              <input
                id="cookie-analytics"
                type="checkbox"
                role="switch"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-[#cc0000]"
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {customizing ? (
            <button
              type="button"
              onClick={() => choose(analytics)}
              className={`${buttonBase} bg-ar-red text-white hover:bg-ar-red-hover`}
            >
              Enregistrer mes choix
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => choose(false)}
                className={`${buttonBase} border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10`}
              >
                Tout refuser
              </button>
              <button
                type="button"
                onClick={() => choose(true)}
                className={`${buttonBase} border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10`}
              >
                Tout accepter
              </button>
            </>
          )}
        </div>
        {!customizing && (
          <button
            type="button"
            onClick={() => {
              setAnalytics(false)
              setCustomizing(true)
            }}
            className="mt-2 min-h-11 w-full text-xs uppercase tracking-widest text-white/60 underline underline-offset-4 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Personnaliser
          </button>
        )}
      </div>
    </div>
  )
}
