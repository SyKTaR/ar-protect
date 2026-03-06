import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, phone, vehicle, service, date, message } = await request.json()

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
    polissage: 'Polissage',
    ceramique: 'Protection Céramique',
    devis: 'Demande de devis personnalisé',
  }

  try {
    await resend.emails.send({
      from: 'AR Protect <onboarding@resend.dev>',
      to: 'lucas.dsnts77@gmail.com',
      replyTo: email,
      subject: `Nouvelle demande de réservation — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; padding: 32px; border-radius: 8px;">
          <h2 style="color: #dc2626; margin-top: 0;">Nouvelle demande de réservation</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #999; width: 140px;">Nom</td>
              <td style="padding: 8px 0; color: #fff; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Téléphone</td>
              <td style="padding: 8px 0; color: #fff;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Email</td>
              <td style="padding: 8px 0; color: #fff;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Véhicule</td>
              <td style="padding: 8px 0; color: #fff;">${vehicleLabels[vehicle] ?? vehicle}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Service</td>
              <td style="padding: 8px 0; color: #fff;">${serviceLabels[service] ?? service}</td>
            </tr>
            ${date ? `
            <tr>
              <td style="padding: 8px 0; color: #999;">Date souhaitée</td>
              <td style="padding: 8px 0; color: #fff;">${date}</td>
            </tr>` : ''}
            ${message ? `
            <tr>
              <td style="padding: 8px 0; color: #999; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; color: #fff;">${message}</td>
            </tr>` : ''}
          </table>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
