import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

const reviewSchema = z.object({
  productId: z.string().min(1).max(100),
  productName: z.string().min(1).max(150),
  author: z.string().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10).max(800),
  honeypot: z.string().max(0).optional(),
})

const rateLimitMap = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 })
    return true
  }
  if (entry.count >= 3) return false
  entry.count++
  return true
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Trop de demandes. Réessayez dans une minute.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const parsed = reviewSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Données invalides.' }, { status: 422 })
  }

  // Honeypot check
  if (parsed.data.honeypot) {
    return NextResponse.json({ success: true })
  }

  const { productId, productName, author, rating, comment } = parsed.data
  const safeAuthor = escapeHtml(author)
  const safeProductName = escapeHtml(productName)
  const safeComment = escapeHtml(comment)
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
  const to = process.env.CONTACT_EMAIL ?? 'arprotect77@gmail.com'

  try {
    await resend.emails.send({
      from: 'AR Protect <onboarding@resend.dev>',
      to,
      subject: `Nouvel avis produit — ${safeProductName} (${rating}/5)`,
      html: `<!DOCTYPE html>
<html lang="fr" style="color-scheme: light only;">
<head>
  <meta charset="UTF-8">
  <meta name="color-scheme" content="light only">
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6; padding: 40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%;">

        <tr>
          <td style="background:#1f2937; border-radius:12px 12px 0 0; padding:32px 40px; text-align:center;">
            <p style="margin:0 0 4px; font-size:11px; font-weight:700; letter-spacing:0.2em; color:#dc2626; text-transform:uppercase;">AR Protect</p>
            <h1 style="margin:0; font-size:22px; font-weight:700; color:#ffffff;">Nouvel avis client</h1>
          </td>
        </tr>

        <tr>
          <td style="background:#dc2626; padding:14px 40px; text-align:center;">
            <p style="margin:0; font-size:22px; color:#ffffff; letter-spacing:0.05em;">${stars}</p>
            <p style="margin:4px 0 0; font-size:13px; font-weight:700; color:rgba(255,255,255,0.85);">${rating}/5 — ${safeProductName}</p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff; padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; border-collapse:separate; border-spacing:0;">
              <tr>
                <td style="padding:12px 16px; background:#f9fafb; color:#6b7280; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; width:130px; border-bottom:1px solid #e5e7eb;">Auteur</td>
                <td style="padding:12px 16px; background:#ffffff; color:#111827; font-size:15px; font-weight:600; border-bottom:1px solid #e5e7eb;">${safeAuthor}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px; background:#f9fafb; color:#6b7280; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; border-bottom:1px solid #e5e7eb;">Produit</td>
                <td style="padding:12px 16px; background:#ffffff; color:#111827; font-size:15px; border-bottom:1px solid #e5e7eb;">${safeProductName} <span style="color:#6b7280; font-size:12px;">(id: ${escapeHtml(productId)})</span></td>
              </tr>
              <tr>
                <td style="padding:12px 16px; background:#f9fafb; color:#6b7280; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Note</td>
                <td style="padding:12px 16px; background:#ffffff; color:#dc2626; font-size:20px; font-weight:700;">${stars} <span style="color:#111827; font-size:15px;">(${rating}/5)</span></td>
              </tr>
            </table>

            <p style="margin:24px 0 10px; font-size:11px; font-weight:700; letter-spacing:0.12em; color:#6b7280; text-transform:uppercase;">Commentaire</p>
            <div style="background:#f9fafb; border-left:3px solid #dc2626; border-radius:0 8px 8px 0; padding:16px 20px;">
              <p style="margin:0; font-size:15px; color:#374151; line-height:1.6; white-space:pre-wrap;">${safeComment}</p>
            </div>

            <p style="margin:24px 0 0; font-size:13px; color:#9ca3af; text-align:center;">
              Pour publier cet avis, ajoutez-le manuellement dans <code style="background:#f3f4f6; padding:2px 6px; border-radius:4px;">lib/products.ts</code> dans le tableau <code style="background:#f3f4f6; padding:2px 6px; border-radius:4px;">reviews</code> du produit <strong>${safeProductName}</strong>.
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#111827; border-radius:0 0 12px 12px; padding:20px 40px; text-align:center;">
            <p style="margin:0; font-size:12px; color:#9ca3af;">Avis généré automatiquement depuis la boutique AR Protect</p>
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
