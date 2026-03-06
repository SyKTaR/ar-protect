import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import Services from '@/components/Services'
import Brand from '@/components/Brand'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-ar-black">
      <Header />
      <Hero />
      <Brand />
      <BeforeAfterSlider />
      <Services />
      <Gallery />
      <Testimonials />
      <BookingForm />
      <Footer />
    </main>
  )
}
