import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import Services from '@/components/Services'
import Brand from '@/components/Brand'
import Partners from '@/components/Partners'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import BookingForm from '@/components/BookingForm'
import ProSection from '@/components/ProSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    absolute: 'Detailing auto en Île-de-France et Seine-et-Marne | AR Protect',
  },
  description:
    'Nettoyage et detailing auto à domicile en Seine-et-Marne : intérieur, extérieur, polissage, céramique et phares. Demandez votre devis gratuit.',
  alternates: {
    canonical: 'https://www.arprotect.fr',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-ar-black">
      <Header />
      <Hero videoSrc="/videolandingpage.mp4" />
      <Brand />
      <Partners />
      <BeforeAfterSlider />
      <Services />
      <Gallery />
      <Testimonials />
      <BookingForm />
      <ProSection />
      <Footer />
    </main>
  )
}
