import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AR Protect',
  description: "L'excellence esthétique pour votre véhicule. Protection céramique, polissage, nettoyage intérieur et extérieur par des experts du detailing.",
  keywords: ['detailing automobile', 'protection céramique', 'polissage', 'AR Protect', 'nettoyage voiture'],
  icons: {
    icon: '/arprotect_logo.jpg',
    apple: '/arprotect_logo.jpg',
  },
  openGraph: {
    title: 'AR Protect',
    description: "L'excellence esthétique pour votre véhicule.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-ar-black text-white antialiased grain">
        {children}
      </body>
    </html>
  )
}
