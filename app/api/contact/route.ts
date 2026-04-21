import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { formatProductPrice, getProductById } from '@/lib/products'

// Validate required env variable at startup
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

// --- Input validation schema ---
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().refine((v) => /^[0-9\s+\-().]{6,20}$/.test(v), { message: 'Numéro invalide' }),
  vehicleMakeModel: z.string().min(2).max(120),
  appointmentLocation: z.string().min(3).max(250),
  vehicle: z.enum(['citadine', 'berline', 'suv', 'suv/monospace', 'sportive', 'prestige', 'utilitaire']),
  service: z.enum(['interieur', 'exterieur', 'full', 'optiques', 'shampoing', 'cuirs', 'lustrage', 'devis']),
  date: z.string().min(1),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  message: z.string().max(2000).optional(),
  interiorCondition: z.string().max(50).optional(),
  seatShampoing: z.string().max(50).optional(),
  carpetShampoing: z.string().max(50).optional(),
  plasticUvTreatment: z.string().max(50).optional(),
  leatherUvTreatment: z.string().max(50).optional(),
  exteriorWash: z.string().max(50).optional(),
  vehicleEmptied: z.string().max(50).optional(),
  recommendedProducts: z.string().max(2000).optional(),
})

// --- Simple in-memory rate limiter ---
const rateLimitMap = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 5
const WINDOW_MS = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) return false

  entry.count++
  return true
}

// --- HTML escape to prevent injection ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

const vehicleLabels: Record<string, string> = {
  citadine: 'Citadine',
  berline: 'Berline',
  suv: 'SUV / 4x4',
  'suv/monospace': 'SUV / Monospace',
  sportive: 'Sportive',
  prestige: 'Prestige',
  utilitaire: 'Utilitaire',
}

const serviceLabels: Record<string, string> = {
  interieur: 'Nettoyage Intérieur',
  exterieur: 'Nettoyage Extérieur',
  full: 'Full Detail (Int. + Ext.)',
  optiques: 'Optiques de phares',
  shampoing: 'Shampoing des sièges',
  cuirs: 'Soin des cuirs',
  lustrage: 'Lustrage',
  devis: 'Demande de devis personnalisé',
}

const INTERIOR_BASE_PRICE = 99
const MAX_ATTACHMENT_FILES = 5
const MAX_ATTACHMENT_SIZE = 15 * 1024 * 1024
const MIN_BOOKING_HOUR = 9
const MAX_BOOKING_HOUR = 18

const interiorPriceTable: Record<string, Record<string, number>> = {
  interiorCondition: { propre: 0, sale: 20, tres_sale: 40 },
  seatShampoing: { non: 0, quelques: 49, encrassees: 69 },
  carpetShampoing: { non: 0, quelques: 39, encrassees: 59 },
  plasticUvTreatment: { oui: 29, non: 0 },
  leatherUvTreatment: { oui: 49, non: 0 },
  exteriorWash: { oui: 69, non: 0 },
  vehicleEmptied: { oui: 0, non: 10 },
}

function getAppointmentValidationError(date: string, time: string) {
  const selectedDateTime = new Date(`${date}T${time}:00`)
  if (Number.isNaN(selectedDateTime.getTime())) {
    return 'Date ou heure invalide.'
  }

  const [hour, minute] = time.split(':').map(Number)
  const selectedMinutes = hour * 60 + minute
  const minMinutes = MIN_BOOKING_HOUR * 60
  const maxMinutes = MAX_BOOKING_HOUR * 60

  if (selectedDateTime.getDay() === 0) {
    return 'Les réservations ne sont pas disponibles le dimanche.'
  }

  if (date.endsWith('-12-25') || date.endsWith('-12-31')) {
    return 'Les réservations ne sont pas disponibles le 25 décembre et le 31 décembre.'
  }

  if (selectedMinutes < minMinutes || selectedMinutes > maxMinutes) {
    return 'Veuillez choisir une heure entre 9h et 18h.'
  }

  if (selectedDateTime.getTime() < Date.now() + 24 * 60 * 60 * 1000) {
    return 'Veuillez choisir un créneau au moins 24h à l’avance.'
  }

  return null
}

function validateAttachments(files: File[]) {
  if (files.length > MAX_ATTACHMENT_FILES) {
    return `Vous pouvez joindre ${MAX_ATTACHMENT_FILES} fichiers maximum.`
  }

  const invalidFile = files.find((file) => !file.type.startsWith('image/') && !file.type.startsWith('video/'))
  if (invalidFile) {
    return 'Seules les photos et vidéos sont acceptées.'
  }

  const oversizedFile = files.find((file) => file.size > MAX_ATTACHMENT_SIZE)
  if (oversizedFile) {
    return 'Chaque fichier doit faire moins de 15 Mo.'
  }

  return null
}

function parseRecommendedProducts(rawProducts?: string) {
  if (!rawProducts) return []

  try {
    const parsed = JSON.parse(rawProducts)
    if (!Array.isArray(parsed)) return []

    return parsed
      .map((item) => {
        if (!item || typeof item !== 'object') return null

        const productId = typeof item.id === 'string' ? item.id : ''
        const product = getProductById(productId)
        const quantity = Number(item.quantity)

        if (!product || !Number.isFinite(quantity) || quantity <= 0) return null

        return {
          product,
          quantity: Math.min(Math.trunc(quantity), 9),
        }
      })
      .filter((item): item is { product: NonNullable<ReturnType<typeof getProductById>>; quantity: number } => item !== null)
  } catch {
    return []
  }
}

export async function POST(request: Request) {
  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Trop de requêtes. Réessayez dans une minute.' },
      { status: 429 }
    )
  }

  // Parse & validate body
  let body: unknown
  let attachments: File[] = []
  try {
    const contentType = request.headers.get('content-type') ?? ''
    if (contentType.includes('multipart/form-data')) {
      const multipart = await request.formData()
      const fields: Record<string, string> = {}

      multipart.forEach((value, key) => {
        if (key === 'attachments' && value instanceof File && value.size > 0) {
          attachments.push(value)
          return
        }

        if (typeof value === 'string') {
          fields[key] = value
        }
      })

      body = fields
    } else {
      body = await request.json()
    }
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Données invalides.' }, { status: 422 })
  }

  const appointmentError = getAppointmentValidationError(parsed.data.date, parsed.data.time)
  if (appointmentError) {
    return NextResponse.json({ success: false, error: appointmentError }, { status: 422 })
  }

  const attachmentError = validateAttachments(attachments)
  if (attachmentError) {
    return NextResponse.json({ success: false, error: attachmentError }, { status: 422 })
  }

  const {
    name,
    email,
    phone,
    vehicleMakeModel,
    appointmentLocation,
    vehicle,
    service,
    date,
    time,
    message,
    interiorCondition,
    seatShampoing,
    carpetShampoing,
    plasticUvTreatment,
    leatherUvTreatment,
    exteriorWash,
    vehicleEmptied,
    recommendedProducts,
  } = parsed.data

  // Escape all user content before inserting into HTML
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone)
  const safeVehicleMakeModel = escapeHtml(vehicleMakeModel)
  const safeAppointmentLocation = escapeHtml(appointmentLocation)
  const safeDate = date ? escapeHtml(date) : null
  const safeTime = escapeHtml(time)
  const safeMessage = message ? escapeHtml(message) : null

  const interiorConditionLabels: Record<string, string> = { propre: 'Propre', sale: 'Sale', tres_sale: 'Très sale' }
  const shampoingLabels: Record<string, string> = { non: 'Non, pas de tâches', quelques: 'Oui, quelques tâches', encrassees: 'Oui, tâches encrassées' }
  const yesNoLabels: Record<string, string> = { oui: 'Oui', non: 'Non' }
  const exteriorWashLabels: Record<string, string> = { oui: 'Oui, préparation complète', non: "Non, simplement l'intérieur" }
  const vehicleEmptiedLabels: Record<string, string> = { oui: 'Oui', non: 'Non (+10€ TTC)' }
  const getInteriorOptionPrice = (field: string, value?: string) =>
    value ? interiorPriceTable[field]?.[value] ?? 0 : 0
  const formatOptionWithPrice = (label: string, price: number) =>
    `${label} <span style="color:#dc2626; font-weight:700;">${price > 0 ? `(+${price}€)` : '(inclus)'}</span>`
  const interiorEstimatedTotal =
    service === 'interieur'
      ? INTERIOR_BASE_PRICE +
        getInteriorOptionPrice('interiorCondition', interiorCondition) +
        getInteriorOptionPrice('seatShampoing', seatShampoing) +
        getInteriorOptionPrice('carpetShampoing', carpetShampoing) +
        getInteriorOptionPrice('plasticUvTreatment', plasticUvTreatment) +
        getInteriorOptionPrice('leatherUvTreatment', leatherUvTreatment) +
        getInteriorOptionPrice('exteriorWash', exteriorWash) +
        getInteriorOptionPrice('vehicleEmptied', vehicleEmptied)
      : null
  const productsToPrepare = parseRecommendedProducts(recommendedProducts)
  const productsToPrepareTotal = productsToPrepare.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  // Format date in French (e.g. "12 avril 2026")
  const formattedDate = safeDate
    ? new Date(safeDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null
  const formattedAppointment = formattedDate ? `${formattedDate} à ${safeTime}` : null

  const to = process.env.CONTACT_EMAIL ?? 'arprotect77@gmail.com'

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 12px 16px; background: #f9fafb !important; color: #6b7280 !important; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; width: 160px; border-bottom: 1px solid #e5e7eb;">${label}</td>
      <td style="padding: 12px 16px; background: #ffffff !important; color: #111827 !important; font-size: 15px; border-bottom: 1px solid #e5e7eb;">${value}</td>
    </tr>`

  try {
    const emailAttachments = await Promise.all(
      attachments.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    )

    await resend.emails.send({
      from: 'AR Protect <onboarding@resend.dev>',
      to,
      replyTo: safeEmail,
      subject: `Nouvelle réservation — ${safeName} · ${serviceLabels[service]}`,
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
      html: `<!DOCTYPE html>
<html lang="fr" style="color-scheme: light only;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <style>
    :root { color-scheme: light only; }
    body { color-scheme: light only; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color-scheme: light only;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6; padding: 40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background: #1f2937 !important; border-radius: 12px 12px 0 0; padding: 36px 40px; text-align: center;">
            <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; color: #dc2626 !important; text-transform: uppercase;">AR Protect</p>
            <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff !important; line-height: 1.2;">Nouvelle demande de réservation</h1>
            <p style="margin: 12px 0 0; font-size: 14px; color: #d1d5db !important;">Reçue le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </td>
        </tr>

        <!-- SUMMARY BADGES -->
        <tr>
          <td style="background: #dc2626; padding: 16px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align: center; padding: 0 8px;">
                  <p style="margin: 0; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.08em;">Client</p>
                  <p style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: #ffffff;">${safeName}</p>
                </td>
                <td style="width: 1px; background: rgba(255,255,255,0.2);"></td>
                <td style="text-align: center; padding: 0 8px;">
                  <p style="margin: 0; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.08em;">Service</p>
                  <p style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: #ffffff;">${serviceLabels[service]}</p>
                </td>
                ${formattedAppointment ? `
                <td style="width: 1px; background: rgba(255,255,255,0.2);"></td>
                <td style="text-align: center; padding: 0 8px;">
                  <p style="margin: 0; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.08em;">Créneau souhaité</p>
                  <p style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: #ffffff;">${formattedAppointment}</p>
                </td>` : ''}
              </tr>
            </table>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background: #ffffff !important; padding: 32px 40px 0;">

            <!-- CONTACT INFO -->
            <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #6b7280; text-transform: uppercase;">Informations client</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; border-collapse: separate; border-spacing: 0;">
              ${row('Nom complet', `<strong>${safeName}</strong>`)}
              ${row('Téléphone', `<a href="tel:${safePhone}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${safePhone}</a>`)}
              ${row('Email', `<a href="mailto:${safeEmail}" style="color: #dc2626; text-decoration: none;">${safeEmail}</a>`)}
              ${row('Catégorie véhicule', vehicleLabels[vehicle] ?? vehicle)}
              ${row('Marque / modèle', safeVehicleMakeModel)}
              ${row('Lieu du RDV', safeAppointmentLocation)}
            </table>

            <!-- SERVICE DETAILS -->
            <p style="margin: 24px 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #6b7280; text-transform: uppercase;">Détails de la prestation</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; border-collapse: separate; border-spacing: 0;">
              ${row('Service demandé', `<span style="background: #fef2f2; color: #dc2626; padding: 3px 10px; border-radius: 20px; font-weight: 700; font-size: 13px;">${serviceLabels[service]}</span>`)}
              ${formattedAppointment ? row('Créneau souhaité', `<strong>${formattedAppointment}</strong>`) : ''}
              ${interiorEstimatedTotal ? row('Tarif estimé', `<strong>${interiorEstimatedTotal}€ TTC</strong>`) : ''}
              ${interiorCondition ? row('État intérieur', formatOptionWithPrice(interiorConditionLabels[interiorCondition] ?? escapeHtml(interiorCondition), getInteriorOptionPrice('interiorCondition', interiorCondition))) : ''}
              ${seatShampoing ? row('Shampoing sièges', formatOptionWithPrice(shampoingLabels[seatShampoing] ?? escapeHtml(seatShampoing), getInteriorOptionPrice('seatShampoing', seatShampoing))) : ''}
              ${carpetShampoing ? row('Shampoing moquettes', formatOptionWithPrice(shampoingLabels[carpetShampoing] ?? escapeHtml(carpetShampoing), getInteriorOptionPrice('carpetShampoing', carpetShampoing))) : ''}
              ${plasticUvTreatment ? row('Traitement UV plastiques', formatOptionWithPrice(yesNoLabels[plasticUvTreatment] ?? escapeHtml(plasticUvTreatment), getInteriorOptionPrice('plasticUvTreatment', plasticUvTreatment))) : ''}
              ${leatherUvTreatment ? row('Nourrissant et UV cuirs', formatOptionWithPrice(yesNoLabels[leatherUvTreatment] ?? escapeHtml(leatherUvTreatment), getInteriorOptionPrice('leatherUvTreatment', leatherUvTreatment))) : ''}
              ${exteriorWash ? row('Nettoyage extérieur', formatOptionWithPrice(exteriorWashLabels[exteriorWash] ?? escapeHtml(exteriorWash), getInteriorOptionPrice('exteriorWash', exteriorWash))) : ''}
              ${vehicleEmptied ? row('Véhicule vidé', formatOptionWithPrice(vehicleEmptiedLabels[vehicleEmptied] ?? escapeHtml(vehicleEmptied), getInteriorOptionPrice('vehicleEmptied', vehicleEmptied))) : ''}
              ${attachments.length > 0 ? row('Fichiers joints', attachments.map((file) => escapeHtml(file.name)).join('<br>')) : ''}
            </table>

            ${productsToPrepare.length > 0 ? `
            <!-- RECOMMENDED PRODUCTS -->
            <p style="margin: 24px 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #6b7280; text-transform: uppercase;">Produits à préparer avec la prestation</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; border-collapse: separate; border-spacing: 0;">
              ${productsToPrepare.map((item) =>
                row(
                  `${item.quantity} × ${escapeHtml(item.product.name)}`,
                  `<strong>${formatProductPrice(item.product.price * item.quantity)}</strong><br><span style="color:#6b7280; font-size: 12px;">${escapeHtml(item.product.category)} · ${escapeHtml(item.product.volume)}</span>`
                )
              ).join('')}
              ${row('Total produits', `<strong style="color:#dc2626;">${formatProductPrice(productsToPrepareTotal)}</strong>`)}
            </table>` : ''}

            ${safeMessage ? `
            <!-- MESSAGE -->
            <p style="margin: 24px 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #6b7280; text-transform: uppercase;">Message du client</p>
            <div style="background: #f9fafb; border-left: 3px solid #dc2626; border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 0;">
              <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
            </div>` : ''}

            <!-- CTA -->
            <div style="text-align: center; padding: 32px 0 36px;">
              <a href="mailto:${safeEmail}?subject=Re: Votre demande de réservation AR Protect" style="display: inline-block; background: #dc2626; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 36px; border-radius: 8px; letter-spacing: 0.02em;">Répondre au client</a>
            </div>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background: #111827 !important; border-radius: 0 0 12px 12px; padding: 24px 40px; text-align: center;">
            <p style="margin: 0; font-size: 13px; font-weight: 700; color: #dc2626 !important; letter-spacing: 0.1em; text-transform: uppercase;">AR Protect</p>
            <p style="margin: 6px 0 0; font-size: 12px; color: #9ca3af !important;">Cet email a été généré automatiquement depuis le formulaire de réservation.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
