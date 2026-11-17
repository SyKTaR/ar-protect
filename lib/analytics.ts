/**
 * Module unique : consentement cookies (CNIL) + Google Analytics 4 (Consent Mode v2).
 *
 * - Aucune requête vers Google tant que l'utilisateur n'a pas accepté la mesure d'audience.
 * - Le choix est mémorisé 6 mois dans le localStorage (pas de cookie déposé pour le mémoriser).
 * - Les événements de conversion passent tous par `trackEvent`, qui ne fait rien sans consentement.
 */

export const GA_MEASUREMENT_ID = 'G-SWYTC7BBMH'
export const CONSENT_STORAGE_KEY = 'arprotect_consent_v1'
export const CONSENT_DURATION_MS = 1000 * 60 * 60 * 24 * 183 // ~6 mois
export const OPEN_CONSENT_EVENT = 'arprotect:open-consent'
export const CONSENT_CHANGE_EVENT = 'arprotect:consent-change'

export type ConversionEvent = 'generate_lead' | 'click_phone' | 'click_email' | 'click_whatsapp'

type StoredConsent = { analytics: boolean; savedAt: number }

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    __arprotectAnalyticsInit?: boolean
    __arprotectGaLoaded?: boolean
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

/**
 * Script inline injecté dans <head> : définit gtag et le consentement par défaut (tout refusé)
 * AVANT tout chargement. Ne déclenche aucune requête réseau.
 */
export const CONSENT_DEFAULT_SNIPPET = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500});`

export function readConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (typeof parsed.analytics !== 'boolean' || typeof parsed.savedAt !== 'number') return null
    if (Date.now() - parsed.savedAt > CONSENT_DURATION_MS) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true
}

function deleteGaCookies() {
  const hostParts = window.location.hostname.split('.')
  const domains = new Set<string>([window.location.hostname])
  for (let i = 1; i < hostParts.length - 1; i += 1) domains.add(`.${hostParts.slice(i).join('.')}`)
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat'))
    .forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`
      })
    })
}

function loadGtag() {
  if (window.__arprotectGaLoaded) return
  window.__arprotectGaLoaded = true
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
  window.gtag?.('js', new Date())
  // La config envoie le page_view initial. Les changements de route Next sont couverts
  // par les mesures améliorées de GA4 (historique du navigateur).
  window.gtag?.('config', GA_MEASUREMENT_ID)
}

function applyConsent(analytics: boolean) {
  if (!window.gtag) return
  if (analytics) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' })
    loadGtag()
  } else {
    window.gtag('consent', 'update', { analytics_storage: 'denied' })
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true
    deleteGaCookies()
  }
}

export function saveConsent(analytics: boolean) {
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics, savedAt: Date.now() } satisfies StoredConsent),
    )
  } catch {
    /* stockage indisponible : le choix vaut pour la page courante seulement */
  }
  applyConsent(analytics)
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT))
}

export function openConsentPreferences() {
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT))
}

export function trackEvent(name: ConversionEvent) {
  if (typeof window === 'undefined' || !window.gtag || !hasAnalyticsConsent()) return
  window.gtag('event', name)
}

function conversionForHref(href: string): ConversionEvent | null {
  const lower = href.trim().toLowerCase()
  if (lower.startsWith('tel:')) return 'click_phone'
  if (lower.startsWith('mailto:')) return 'click_email'
  if (/^https?:\/\/wa\.me\//.test(lower)) return 'click_whatsapp'
  return null
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return
  const anchor = target.closest('a[href]')
  if (!anchor) return
  const conversion = conversionForHref(anchor.getAttribute('href') ?? '')
  if (conversion) trackEvent(conversion)
}

/** À appeler une seule fois au montage : restaure le choix mémorisé et écoute les clics tel/mailto/wa.me. */
export function initAnalytics() {
  if (window.__arprotectAnalyticsInit) return
  window.__arprotectAnalyticsInit = true
  document.addEventListener('click', onDocumentClick, true)
  if (hasAnalyticsConsent()) applyConsent(true)
}
