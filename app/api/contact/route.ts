import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'

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
  vehicle: z.enum(['citadine', 'berline', 'suv', 'suv/monospace', 'sportive', 'prestige', 'utilitaire']),
  service: z.enum(['interieur', 'exterieur', 'full', 'optiques', 'shampoing', 'cuirs', 'lustrage', 'devis']),
  date: z.string().optional(),
  message: z.string().max(2000).optional(),
  interiorCondition: z.string().max(50).optional(),
  seatShampoing: z.string().max(50).optional(),
  carpetShampoing: z.string().max(50).optional(),
  exteriorWash: z.string().max(50).optional(),
  vehicleEmptied: z.string().max(50).optional(),
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
  sportive: 'Sportive',
  prestige: 'Prestige',
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
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Données invalides.' }, { status: 422 })
  }

  const { name, email, phone, vehicle, service, date, message, interiorCondition, seatShampoing, carpetShampoing, exteriorWash, vehicleEmptied } = parsed.data

  // Escape all user content before inserting into HTML
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone)
  const safeDate = date ? escapeHtml(date) : null
  const safeMessage = message ? escapeHtml(message) : null

  const interiorConditionLabels: Record<string, string> = { propre: 'Propre', sale: 'Sale', tres_sale: 'Très sale' }
  const shampoingLabels: Record<string, string> = { non: 'Non, pas de tâches', quelques: 'Oui, quelques tâches', encrassees: 'Oui, tâches encrassées' }
  const exteriorWashLabels: Record<string, string> = { oui: 'Oui, préparation complète', non: "Non, simplement l'intérieur" }
  const vehicleEmptiedLabels: Record<string, string> = { oui: 'Oui', non: 'Non (+10€ TTC)' }

  const to = process.env.CONTACT_EMAIL ?? 'lucas.dsnts77@gmail.com'

  try {
    await resend.emails.send({
      from: 'AR Protect <onboarding@resend.dev>',
      to,
      replyTo: safeEmail,
      subject: `Nouvelle demande de réservation — ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; padding: 32px; border-radius: 8px;">
          <h2 style="color: #dc2626; margin-top: 0;">Nouvelle demande de réservation</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #999; width: 140px;">Nom</td>
              <td style="padding: 8px 0; color: #fff; font-weight: bold;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Téléphone</td>
              <td style="padding: 8px 0; color: #fff;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Email</td>
              <td style="padding: 8px 0; color: #fff;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Véhicule</td>
              <td style="padding: 8px 0; color: #fff;">${vehicleLabels[vehicle]}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Service</td>
              <td style="padding: 8px 0; color: #fff;">${serviceLabels[service]}</td>
            </tr>
            ${safeDate ? `
            <tr>
              <td style="padding: 8px 0; color: #999;">Date souhaitée</td>
              <td style="padding: 8px 0; color: #fff;">${safeDate}</td>
            </tr>` : ''}
            ${interiorCondition ? `
            <tr><td colspan="2" style="padding: 12px 0 4px; color: #dc2626; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Détails nettoyage intérieur</td></tr>
            <tr>
              <td style="padding: 6px 0; color: #999;">État général</td>
              <td style="padding: 6px 0; color: #fff;">${interiorConditionLabels[interiorCondition] ?? interiorCondition}</td>
            </tr>` : ''}
            ${seatShampoing ? `
            <tr>
              <td style="padding: 6px 0; color: #999;">Shampoing sièges</td>
              <td style="padding: 6px 0; color: #fff;">${shampoingLabels[seatShampoing] ?? seatShampoing}</td>
            </tr>` : ''}
            ${carpetShampoing ? `
            <tr>
              <td style="padding: 6px 0; color: #999;">Shampoing moquettes</td>
              <td style="padding: 6px 0; color: #fff;">${shampoingLabels[carpetShampoing] ?? carpetShampoing}</td>
            </tr>` : ''}
            ${exteriorWash ? `
            <tr>
              <td style="padding: 6px 0; color: #999;">Nettoyage extérieur</td>
              <td style="padding: 6px 0; color: #fff;">${exteriorWashLabels[exteriorWash] ?? exteriorWash}</td>
            </tr>` : ''}
            ${vehicleEmptied ? `
            <tr>
              <td style="padding: 6px 0; color: #999;">Véhicule vidé</td>
              <td style="padding: 6px 0; color: #fff;">${vehicleEmptiedLabels[vehicleEmptied] ?? vehicleEmptied}</td>
            </tr>` : ''}
            ${safeMessage ? `
            <tr>
              <td style="padding: 8px 0; color: #999; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; color: #fff; white-space: pre-wrap;">${safeMessage}</td>
            </tr>` : ''}
          </table>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
