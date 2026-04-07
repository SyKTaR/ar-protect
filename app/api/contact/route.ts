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

  // Format date in French (e.g. "12 avril 2026")
  const formattedDate = safeDate
    ? new Date(safeDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const to = process.env.CONTACT_EMAIL ?? 'arprotect77@gmail.com'

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding: 12px 16px; background: #f9fafb !important; color: #6b7280 !important; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; width: 160px; border-bottom: 1px solid #e5e7eb;">${label}</td>
      <td style="padding: 12px 16px; background: #ffffff !important; color: #111827 !important; font-size: 15px; border-bottom: 1px solid #e5e7eb;">${value}</td>
    </tr>`

  try {
    await resend.emails.send({
      from: 'AR Protect <onboarding@resend.dev>',
      to,
      replyTo: safeEmail,
      subject: `Nouvelle réservation — ${safeName} · ${serviceLabels[service]}`,
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
                ${formattedDate ? `
                <td style="width: 1px; background: rgba(255,255,255,0.2);"></td>
                <td style="text-align: center; padding: 0 8px;">
                  <p style="margin: 0; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.08em;">Date souhaitée</p>
                  <p style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: #ffffff;">${formattedDate}</p>
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
              ${row('Véhicule', vehicleLabels[vehicle] ?? vehicle)}
            </table>

            <!-- SERVICE DETAILS -->
            <p style="margin: 24px 0 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #6b7280; text-transform: uppercase;">Détails de la prestation</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; border-collapse: separate; border-spacing: 0;">
              ${row('Service demandé', `<span style="background: #fef2f2; color: #dc2626; padding: 3px 10px; border-radius: 20px; font-weight: 700; font-size: 13px;">${serviceLabels[service]}</span>`)}
              ${formattedDate ? row('Date souhaitée', `<strong>${formattedDate}</strong>`) : ''}
              ${interiorCondition ? row('État intérieur', interiorConditionLabels[interiorCondition] ?? interiorCondition) : ''}
              ${seatShampoing ? row('Shampoing sièges', shampoingLabels[seatShampoing] ?? seatShampoing) : ''}
              ${carpetShampoing ? row('Shampoing moquettes', shampoingLabels[carpetShampoing] ?? carpetShampoing) : ''}
              ${exteriorWash ? row('Nettoyage extérieur', exteriorWashLabels[exteriorWash] ?? exteriorWash) : ''}
              ${vehicleEmptied ? row('Véhicule vidé', vehicleEmptiedLabels[vehicleEmptied] ?? vehicleEmptied) : ''}
            </table>

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
