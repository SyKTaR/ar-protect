'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Car, Wrench, User, CheckCircle, ChevronRight, ChevronLeft, FileText, X, Edit2, ClipboardList } from 'lucide-react'

const vehicleTypes = [
  { id: 'citadine', label: 'Citadine', desc: 'Clio, 208, Fiesta...' },
  { id: 'berline', label: 'Berline', desc: 'A4, Série 3, C-Class...' },
  { id: 'suv/monospace', label: 'SUV / Monospace', desc: 'X5, Q7, Espace...' },
  { id: 'utilitaire', label: 'Utilitaire', desc: 'C-100, Transit, Trafic...' },
  { id: 'prestige', label: 'Prestige', desc: 'Ferrari, Lamborghini, Bentley...' },
]

const serviceOptions = [
  { id: 'interieur', label: 'Nettoyage Intérieur', price: 'Dès 80€ TTC' },
  { id: 'exterieur', label: 'Nettoyage Extérieur', price: 'Dès 60€ TTC' },
  { id: 'full', label: 'Full Detail (Int + Ext.)', price: 'Dès 140€ TTC' },
  { id: 'shampoing', label: 'Shampoing des sièges', price: 'Dès 69€ TTC' },
  { id: 'cuirs', label: 'Soin des cuirs', price: 'Sur devis' },
  { id: 'optiques', label: 'Renovations des optiques', price: 'Dès 49€ TTC' },
  { id: 'lustrage', label: 'Lustrage', price: 'Sur devis' },
  { id: 'devis', label: 'Demande de devis personnalisé', price: 'Sur devis' },
]


type FormData = {
  vehicle: string
  service: string
  name: string
  phone: string
  email: string
  message: string
  date: string
  interiorCondition: string
  seatShampoing: string
  carpetShampoing: string
  exteriorWash: string
  vehicleEmptied: string
}

const emptyForm: FormData = {
  vehicle: '',
  service: '',
  name: '',
  phone: '',
  email: '',
  message: '',
  date: '',
  interiorCondition: '',
  seatShampoing: '',
  carpetShampoing: '',
  exteriorWash: '',
  vehicleEmptied: '',
}

export default function BookingForm() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState(1)
  const [showSummary, setShowSummary] = useState(false)
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [interiorSubStep, setInteriorSubStep] = useState(0)

  const dynamicSteps = [
    { id: 1, label: 'Véhicule', icon: Car },
    { id: 2, label: 'Service', icon: Wrench },
    ...(formData.service === 'interieur' ? [{ id: 2.5, label: 'Intérieur', icon: ClipboardList }] : []),
    { id: 3, label: 'Contact', icon: User },
    { id: 4, label: 'Récapitulatif', icon: FileText },
  ]

  const currentStep = showSummary ? 4 : interiorSubStep > 0 ? 2.5 : step

  const interiorFieldForSubStep: (keyof FormData)[] = [
    'interiorCondition', 'seatShampoing', 'carpetShampoing', 'exteriorWash', 'vehicleEmptied',
  ]

  const canNext =
    (step === 1 && formData.vehicle !== '') ||
    (step === 2 && interiorSubStep === 0 && formData.service !== '') ||
    (interiorSubStep > 0 && formData[interiorFieldForSubStep[interiorSubStep - 1]] !== '') ||
    (step === 3 && interiorSubStep === 0)

  const canGoToSummary = !!(formData.name && formData.phone && formData.email)

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.email) return
    setSending(true)
    setError(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      setShowSummary(false)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const handleReset = () => {
    setFormData(emptyForm)
    setStep(1)
    setInteriorSubStep(0)
    setShowSummary(false)
    setError(false)
    setShowWhatsAppModal(true)
  }

  const goEditStep = (s: number) => {
    setShowSummary(false)
    setInteriorSubStep(0)
    setStep(s)
  }

  const handleNext = () => {
    if (interiorSubStep > 0) {
      if (interiorSubStep < 5) {
        setInteriorSubStep(interiorSubStep + 1)
      } else {
        setInteriorSubStep(0)
        setStep(3)
      }
    } else if (step === 2 && formData.service === 'interieur') {
      setInteriorSubStep(1)
    } else if (step < 3) {
      setStep(step + 1)
    } else if (step === 3 && canGoToSummary) {
      setShowSummary(true)
    }
  }

  const handleBack = () => {
    if (interiorSubStep === 1) {
      setInteriorSubStep(0)
      setStep(2)
    } else if (interiorSubStep > 1) {
      setInteriorSubStep(interiorSubStep - 1)
    } else if (step === 3 && formData.service === 'interieur') {
      setInteriorSubStep(5)
    } else if (step > 1) {
      setStep(step - 1)
    }
  }

  // Labels for summary
  const vehicleLabel = vehicleTypes.find((v) => v.id === formData.vehicle)?.label ?? '—'
  const serviceObj = serviceOptions.find((s) => s.id === formData.service)

  const interiorConditionLabel: Record<string, string> = {
    propre: 'Propre', sale: 'Sale', tres_sale: 'Très sale',
  }
  const seatShampoinglabel: Record<string, string> = {
    non: 'Non, pas de tâches', quelques: 'Oui, quelques tâches', encrassees: 'Oui, tâches encrassées',
  }
  const exteriorWashLabel: Record<string, string> = {
    oui: 'Oui, préparation complète', non: "Non, seulement l'intérieur",
  }
  const vehicleEmptiedLabel: Record<string, string> = {
    oui: 'Oui', non: 'Non (+10€ TTC)',
  }

  return (
    <>
      {/* WhatsApp modal */}
      <AnimatePresence>
        {showWhatsAppModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            onClick={() => setShowWhatsAppModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-[#1a1a1a] border border-ar-border max-w-sm w-full p-8 relative text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setShowWhatsAppModal(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              {/* Icon */}
              <div className="w-14 h-14 bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>

              <h3 className="font-display font-black text-xl text-white uppercase mb-2">
                Besoin d&apos;aide ?
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Vous préférez nous écrire directement ? Contactez-nous sur WhatsApp pour obtenir plus d&apos;informations, un conseil personnalisé ou une demande sur mesure.
              </p>

              <a
                href="https://wa.me/33636230807"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full bg-[#25D366]/10 border border-[#25D366]/40 hover:border-[#25D366]/80 hover:bg-[#25D366]/20 text-[#25D366] font-semibold px-5 py-3.5 transition-all duration-200 text-sm"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contacter via WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setShowWhatsAppModal(false)}
                className="mt-3 text-white/30 hover:text-white/60 text-xs transition-colors"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="contact" ref={ref} className="section-padding bg-ar-anthracite relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 100% at 100% 50%, #dc2626 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-ar-red text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">
                Prise de rendez-vous
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none mb-6">
                Réservez <br />
                <span className="text-gradient-red">votre</span> <br />
                diagnostic
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-sm">
                Décrivez-nous votre projet en 3 étapes simples. Nous vous contactons dans les 24h
                avec un devis précis et personnalisé.
              </p>

              {/* What to expect */}
              <div className="space-y-4">
                {[
                  { title: 'Diagnostic gratuit', desc: "Évaluation complète de l'état de votre véhicule" },
                  { title: 'Devis transparent', desc: "Prix fixés à l'avance, sans surprise" },
                  { title: 'Prise en charge', desc: 'Ramassage et livraison possible sur demande' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 bg-ar-red/20 border border-ar-red/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={12} className="text-ar-red" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{item.title}</div>
                      <div className="text-white/40 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact direct */}
              <div className="mt-10 pt-8 border-t border-ar-border">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
                  Contact direct
                </p>
                <a
                  href="tel:+33636230807"
                  className="text-white font-semibold hover:text-ar-red transition-colors duration-200"
                >
                  06 36 23 08 07
                </a>
                <br />
                <a
                  href="mailto:arprotect@gmail.com"
                  className="text-white/50 text-sm hover:text-ar-red transition-colors duration-200"
                >
                  arprotect@gmail.com
                </a>
                <div className="mt-4 pt-4 border-t border-ar-border/50">
                  <a
                    href="https://wa.me/33636230807"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366]/70 text-[#25D366] hover:bg-[#25D366]/20 text-xs font-semibold px-4 py-2.5 transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <p className="text-white/30 text-xs mt-2">
                    Si vous souhaitez avoir plus d&apos;informations sur nos prestations ou bien concernant une flottes de véhicules
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-ar-card border border-emerald-500/30 p-10 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} className="text-emerald-400" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-white uppercase mb-3">
                      Demande envoyée !
                    </h3>
                    <p className="text-white/50 text-sm">
                      Merci {formData.name}. Nous vous contacterons dans les 24h pour confirmer votre
                      rendez-vous et établir votre devis personnalisé.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="bg-ar-card border border-ar-border p-4 sm:p-6 md:p-8">
                    {/* Steps indicator */}
                    <div className="flex items-center gap-0 mb-6 sm:mb-8">
                      {dynamicSteps.map((s, i) => {
                        const Icon = s.icon
                        const isActive = s.id === currentStep
                        const isDone = s.id < currentStep
                        return (
                          <div key={s.id} className="flex items-center flex-1 min-w-0">
                            <div className="flex flex-col items-center gap-1 flex-shrink-0">
                              <div
                                className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center transition-all duration-300 ${
                                  isActive
                                    ? 'bg-ar-red text-white'
                                    : isDone
                                    ? 'bg-ar-red/30 text-ar-red border border-ar-red/50'
                                    : 'bg-ar-anthracite text-white/30 border border-ar-border'
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle size={13} />
                                ) : (
                                  <Icon size={13} />
                                )}
                              </div>
                              <span
                                className={`hidden sm:block text-[9px] sm:text-[10px] uppercase tracking-wide sm:tracking-widest whitespace-nowrap ${
                                  isActive ? 'text-white' : isDone ? 'text-ar-red/70' : 'text-white/20'
                                }`}
                              >
                                {s.label}
                              </span>
                            </div>
                            {i < dynamicSteps.length - 1 && (
                              <div
                                className={`flex-1 h-px mx-1 sm:mx-2 sm:mb-5 transition-colors duration-500 ${
                                  currentStep > s.id ? 'bg-ar-red/50' : 'bg-ar-border'
                                }`}
                              />
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      {/* Summary — step 4 */}
                      {showSummary ? (
                        <motion.div
                          key="summary"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-white font-semibold mb-1 text-sm uppercase tracking-widest">
                            Récapitulatif
                          </h3>
                          <p className="text-white/40 text-xs mb-5">
                            Vérifiez vos informations avant d&apos;envoyer la demande
                          </p>

                          <div className="space-y-3">
                            {/* Véhicule */}
                            <div className="border border-ar-border p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-ar-red text-[10px] uppercase tracking-[0.2em] font-semibold">Véhicule</span>
                                <button
                                  type="button"
                                  onClick={() => goEditStep(1)}
                                  className="flex items-center gap-1 text-white/30 hover:text-white text-xs transition-colors"
                                >
                                  <Edit2 size={11} />
                                  Modifier
                                </button>
                              </div>
                              <p className="text-white text-sm font-medium">{vehicleLabel}</p>
                            </div>

                            {/* Service */}
                            <div className="border border-ar-border p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-ar-red text-[10px] uppercase tracking-[0.2em] font-semibold">Service</span>
                                <button
                                  type="button"
                                  onClick={() => goEditStep(2)}
                                  className="flex items-center gap-1 text-white/30 hover:text-white text-xs transition-colors"
                                >
                                  <Edit2 size={11} />
                                  Modifier
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-white text-sm font-medium">{serviceObj?.label ?? '—'}</p>
                                {serviceObj && <span className="text-ar-red text-xs font-semibold">{serviceObj.price}</span>}
                              </div>
                              {formData.service === 'interieur' && (
                                <div className="mt-3 pt-3 border-t border-ar-border/50 space-y-1.5">
                                  {formData.interiorCondition && (
                                    <div className="flex gap-2 text-xs">
                                      <span className="text-white/40">État :</span>
                                      <span className="text-white/70">{interiorConditionLabel[formData.interiorCondition]}</span>
                                    </div>
                                  )}
                                  {formData.seatShampoing && (
                                    <div className="flex gap-2 text-xs">
                                      <span className="text-white/40">Sièges :</span>
                                      <span className="text-white/70">{seatShampoinglabel[formData.seatShampoing]}</span>
                                    </div>
                                  )}
                                  {formData.carpetShampoing && (
                                    <div className="flex gap-2 text-xs">
                                      <span className="text-white/40">Moquettes :</span>
                                      <span className="text-white/70">{seatShampoinglabel[formData.carpetShampoing]}</span>
                                    </div>
                                  )}
                                  {formData.exteriorWash && (
                                    <div className="flex gap-2 text-xs">
                                      <span className="text-white/40">Extérieur :</span>
                                      <span className="text-white/70">{exteriorWashLabel[formData.exteriorWash]}</span>
                                    </div>
                                  )}
                                  {formData.vehicleEmptied && (
                                    <div className="flex gap-2 text-xs">
                                      <span className="text-white/40">Véhicule vidé :</span>
                                      <span className="text-white/70">{vehicleEmptiedLabel[formData.vehicleEmptied]}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Coordonnées */}
                            <div className="border border-ar-border p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-ar-red text-[10px] uppercase tracking-[0.2em] font-semibold">Coordonnées</span>
                                <button
                                  type="button"
                                  onClick={() => goEditStep(3)}
                                  className="flex items-center gap-1 text-white/30 hover:text-white text-xs transition-colors"
                                >
                                  <Edit2 size={11} />
                                  Modifier
                                </button>
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex gap-2 text-xs">
                                  <span className="text-white/40">Nom :</span>
                                  <span className="text-white/80">{formData.name}</span>
                                </div>
                                <div className="flex gap-2 text-xs">
                                  <span className="text-white/40">Téléphone :</span>
                                  <span className="text-white/80">{formData.phone}</span>
                                </div>
                                <div className="flex gap-2 text-xs">
                                  <span className="text-white/40">Email :</span>
                                  <span className="text-white/80">{formData.email}</span>
                                </div>
                                {formData.date && (
                                  <div className="flex gap-2 text-xs">
                                    <span className="text-white/40">Date souhaitée :</span>
                                    <span className="text-white/80">{formData.date}</span>
                                  </div>
                                )}
                                {formData.message && (
                                  <div className="flex gap-2 text-xs">
                                    <span className="text-white/40 flex-shrink-0">Message :</span>
                                    <span className="text-white/80">{formData.message}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          {error && (
                            <p className="text-red-400 text-xs mt-3 text-center">
                              Erreur lors de l&apos;envoi. Veuillez réessayer.
                            </p>
                          )}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5 pt-4 border-t border-ar-border">
                            <button
                              type="button"
                              onClick={handleSubmit}
                              disabled={sending}
                              className="order-1 sm:order-2 flex-1 btn-primary !px-4 !py-3 text-xs disabled:opacity-50"
                            >
                              {sending ? 'Envoi...' : 'Envoyer la demande'}
                            </button>
                            <button
                              type="button"
                              onClick={handleReset}
                              className="order-2 sm:order-1 flex-1 border border-ar-border text-white/50 hover:text-white hover:border-white/40 text-xs font-semibold px-4 py-3 transition-all duration-200 uppercase tracking-widest"
                            >
                              Recommencer
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            if (step === 3 && canGoToSummary) setShowSummary(true)
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {/* Step 1 — Vehicle */}
                            {step === 1 && (
                              <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                              >
                                <h3 className="text-white font-semibold mb-1 text-sm uppercase tracking-widest">
                                  Type de véhicule
                                </h3>
                                <p className="text-white/40 text-xs mb-5">
                                  Sélectionnez la catégorie de votre véhicule
                                </p>
                                <div className="space-y-2">
                                  {vehicleTypes.map((v) => (
                                    <label
                                      key={v.id}
                                      className={`flex items-center gap-4 p-3.5 border cursor-pointer transition-all duration-200 ${
                                        formData.vehicle === v.id
                                          ? 'border-ar-red bg-ar-red/10'
                                          : 'border-ar-border hover:border-white/30'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name="vehicle"
                                        value={v.id}
                                        className="sr-only"
                                        onChange={() =>
                                          setFormData((f) => ({ ...f, vehicle: v.id }))
                                        }
                                      />
                                      <div
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                                          formData.vehicle === v.id
                                            ? 'border-ar-red'
                                            : 'border-white/30'
                                        }`}
                                      >
                                        {formData.vehicle === v.id && (
                                          <div className="w-2 h-2 rounded-full bg-ar-red" />
                                        )}
                                      </div>
                                      <div>
                                        <div className="text-white text-sm font-medium">{v.label}</div>
                                        <div className="text-white/40 text-xs">{v.desc}</div>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {/* Step 2 — Service */}
                            {step === 2 && interiorSubStep === 0 && (
                              <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                              >
                                <h3 className="text-white font-semibold mb-1 text-sm uppercase tracking-widest">
                                  Service souhaité
                                </h3>
                                <p className="text-white/40 text-xs mb-5">
                                  Choisissez la prestation qui correspond à vos besoins
                                </p>
                                <div className="space-y-2">
                                  {serviceOptions.map((s) => (
                                    <label
                                      key={s.id}
                                      className={`flex items-center justify-between gap-2 p-3 sm:p-3.5 border cursor-pointer transition-all duration-200 ${
                                        formData.service === s.id
                                          ? 'border-ar-red bg-ar-red/10'
                                          : 'border-ar-border hover:border-white/30'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3 min-w-0">
                                        <input
                                          type="radio"
                                          name="service"
                                          value={s.id}
                                          className="sr-only"
                                          onChange={() =>
                                            setFormData((f) => ({ ...f, service: s.id }))
                                          }
                                        />
                                        <div
                                          className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                                            formData.service === s.id ? 'border-ar-red' : 'border-white/30'
                                          }`}
                                        >
                                          {formData.service === s.id && (
                                            <div className="w-2 h-2 rounded-full bg-ar-red" />
                                          )}
                                        </div>
                                        <span className="text-white text-sm leading-tight">{s.label}</span>
                                      </div>
                                      <span className="text-ar-red text-xs font-semibold flex-shrink-0">{s.price}</span>
                                    </label>
                                  ))}
                                </div>

                              </motion.div>
                            )}

                            {/* Step 2.5 — Interior questions */}
                            {interiorSubStep > 0 && (() => {
                              const interiorQuestions = [
                                {
                                  key: 'interiorCondition' as keyof FormData,
                                  question: "Comment considérez-vous l'état général de votre véhicule ?",
                                  options: [
                                    { value: 'propre', label: 'Propre' },
                                    { value: 'sale', label: 'Sale' },
                                    { value: 'tres_sale', label: 'Très sale' },
                                  ],
                                },
                                {
                                  key: 'seatShampoing' as keyof FormData,
                                  question: "Avez-vous besoin d'un shampoing des sièges ?",
                                  options: [
                                    { value: 'non', label: 'Non, pas de tâches' },
                                    { value: 'quelques', label: 'Oui, quelques tâches' },
                                    { value: 'encrassees', label: 'Oui, tâches encrassées' },
                                  ],
                                },
                                {
                                  key: 'carpetShampoing' as keyof FormData,
                                  question: "Avez-vous besoin d'un shampoing des tapis et moquettes ?",
                                  options: [
                                    { value: 'non', label: 'Non, pas de tâches' },
                                    { value: 'quelques', label: 'Oui, quelques tâches' },
                                    { value: 'encrassees', label: 'Oui, tâches encrassées' },
                                  ],
                                },
                                {
                                  key: 'exteriorWash' as keyof FormData,
                                  question: "Avez-vous besoin d'un nettoyage extérieur ?",
                                  options: [
                                    { value: 'oui', label: 'Oui, préparation complète' },
                                    { value: 'non', label: "Non, simplement l'intérieur" },
                                  ],
                                },
                                {
                                  key: 'vehicleEmptied' as keyof FormData,
                                  question: 'Votre véhicule sera-t-il vidé ?',
                                  options: [
                                    { value: 'oui', label: 'Oui' },
                                    { value: 'non', label: 'Non' },
                                  ],
                                },
                              ]
                              const current = interiorQuestions[interiorSubStep - 1]
                              return (
                                <motion.div
                                  key={`interior-${interiorSubStep}`}
                                  initial={{ opacity: 0, x: 30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -30 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-white font-semibold text-sm uppercase tracking-widest">
                                      Détails intérieur
                                    </h3>
                                    <span className="text-white/30 text-xs">{interiorSubStep} / 5</span>
                                  </div>
                                  <p className="text-white/40 text-xs mb-6">
                                    Précisez votre besoin pour un devis personnalisé
                                  </p>
                                  <p className="text-white/80 text-sm font-medium mb-4">{current.question}</p>
                                  <div className="space-y-2">
                                    {current.options.map((opt) => (
                                      <label
                                        key={opt.value}
                                        className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-all duration-200 ${
                                          formData[current.key] === opt.value
                                            ? 'border-ar-red bg-ar-red/10'
                                            : 'border-ar-border hover:border-white/20'
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          name={current.key}
                                          value={opt.value}
                                          className="sr-only"
                                          onChange={() => {
                                            setFormData((f) => ({ ...f, [current.key]: opt.value }))
                                            setTimeout(handleNext, 200)
                                          }}
                                        />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${formData[current.key] === opt.value ? 'border-ar-red' : 'border-white/30'}`}>
                                          {formData[current.key] === opt.value && <div className="w-2 h-2 rounded-full bg-ar-red" />}
                                        </div>
                                        <span className="text-white/80 text-sm">{opt.label}</span>
                                      </label>
                                    ))}
                                  </div>
                                </motion.div>
                              )
                            })()}

                            {/* Step 3 — Contact */}
                            {step === 3 && interiorSubStep === 0 && (
                              <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                              >
                                <h3 className="text-white font-semibold mb-1 text-sm uppercase tracking-widest">
                                  Vos coordonnées
                                </h3>
                                <p className="text-white/40 text-xs mb-5">
                                  Nous vous contacterons pour confirmer le rendez-vous
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-1.5">
                                      Nom *
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      value={formData.name}
                                      onChange={(e) =>
                                        setFormData((f) => ({ ...f, name: e.target.value }))
                                      }
                                      className="w-full bg-ar-anthracite border border-ar-border px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-ar-red transition-colors duration-200"
                                      placeholder="Jean Dupont"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-white/50 text-xs uppercase tracking-widest block mb-1.5">
                                      Téléphone *
                                    </label>
                                    <input
                                      type="tel"
                                      required
                                      value={formData.phone}
                                      onChange={(e) =>
                                        setFormData((f) => ({ ...f, phone: e.target.value }))
                                      }
                                      className="w-full bg-ar-anthracite border border-ar-border px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-ar-red transition-colors duration-200"
                                      placeholder="06 00 00 00 00"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-1.5">
                                    Email *
                                  </label>
                                  <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                      setFormData((f) => ({ ...f, email: e.target.value }))
                                    }
                                    className="w-full bg-ar-anthracite border border-ar-border px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-ar-red transition-colors duration-200"
                                    placeholder="jean@exemple.fr"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="booking-date" className="text-white/50 text-xs uppercase tracking-widest block mb-1.5">
                                    Date souhaitée
                                  </label>
                                  <input
                                    id="booking-date"
                                    type="date"
                                    title="Date souhaitée"
                                    value={formData.date}
                                    onChange={(e) =>
                                      setFormData((f) => ({ ...f, date: e.target.value }))
                                    }
                                    className="w-full bg-ar-anthracite border border-ar-border px-4 py-3 text-white text-sm focus:outline-none focus:border-ar-red transition-colors duration-200 [color-scheme:dark]"
                                  />
                                </div>
                                <div>
                                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-1.5">
                                    Message (optionnel)
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) =>
                                      setFormData((f) => ({ ...f, message: e.target.value }))
                                    }
                                    className="w-full bg-ar-anthracite border border-ar-border px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-ar-red transition-colors duration-200 resize-none"
                                    placeholder="Précisez votre demande, l'état de votre véhicule..."
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Navigation */}
                          <div className="flex items-center justify-between mt-6 pt-4 border-t border-ar-border">
                            {step > 1 || interiorSubStep > 0 ? (
                              <button
                                type="button"
                                onClick={handleBack}
                                className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
                              >
                                <ChevronLeft size={16} />
                                Retour
                              </button>
                            ) : (
                              <div />
                            )}

                            {step === 3 && interiorSubStep === 0 ? (
                              <button
                                type="button"
                                disabled={!canGoToSummary}
                                onClick={handleNext}
                                className={`flex items-center gap-2 btn-primary !px-4 !py-3 sm:!px-6 text-xs transition-opacity duration-300 ${
                                  !canGoToSummary ? 'opacity-40 cursor-not-allowed' : ''
                                }`}
                              >
                                <span className="hidden sm:inline">Voir le récapitulatif</span>
                                <span className="sm:hidden">Récap.</span>
                                <ChevronRight size={16} />
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={!canNext}
                                onClick={handleNext}
                                className={`flex items-center gap-2 btn-primary !px-4 !py-3 sm:!px-6 text-xs transition-opacity duration-300 ${
                                  !canNext ? 'opacity-40 cursor-not-allowed' : ''
                                }`}
                              >
                                Suivant
                                <ChevronRight size={16} />
                              </button>
                            )}
                          </div>
                        </form>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
