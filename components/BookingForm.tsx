'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Car, Wrench, User, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'

const vehicleTypes = [
  { id: 'citadine', label: 'Citadine', desc: 'Clio, 208, Fiesta...' },
  { id: 'berline', label: 'Berline', desc: 'A4, Série 3, C-Class...' },
  { id: 'suv', label: 'SUV / 4x4', desc: 'X5, Q7, Cayenne...' },
  { id: 'sportive', label: 'Sportive', desc: 'M3, RS, AMG, Porsche...' },
  { id: 'prestige', label: 'Prestige', desc: 'Ferrari, Lamborghini, Bentley...' },
]

const serviceOptions = [
  { id: 'interieur', label: 'Nettoyage Intérieur', price: 'Dès 80€ TTC' },
  { id: 'exterieur', label: 'Nettoyage Extérieur', price: 'Dès 60€ TTC' },
  { id: 'full', label: 'Full Detail (Int + Ext.)', price: 'Dès 140€ TTC' },
  { id: 'optiques', label: 'Optiques de phares', price: 'Dès 49€ TTC' },
  { id: 'shampoing', label: 'Shampoing des sièges', price: 'Dès 69€ TTC' },
  { id: 'cuirs', label: 'Soin des cuirs', price: 'Sur devis' },
  { id: 'lustrage', label: 'Lustrage', price: 'Sur devis' },
]

const steps = [
  { id: 1, label: 'Véhicule', icon: Car },
  { id: 2, label: 'Service', icon: Wrench },
  { id: 3, label: 'Contact', icon: User },
]

type FormData = {
  vehicle: string
  service: string
  name: string
  phone: string
  email: string
  message: string
  date: string
}

export default function BookingForm() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    vehicle: '',
    service: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    date: '',
  })

  const canNext =
    (step === 1 && formData.vehicle !== '') ||
    (step === 2 && formData.service !== '') ||
    step === 3

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
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
                href="tel:+33600000000"
                className="text-white font-semibold hover:text-ar-red transition-colors duration-200"
              >
                06 36 23 08 07
              </a>
              <br />
              <a
                href="mailto:contact@arprotect.fr"
                className="text-white/50 text-sm hover:text-ar-red transition-colors duration-200"
              >
                arprotect@gmail.com
              </a>
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
                  className="bg-ar-card border border-ar-green-500/30 border-emerald-500/30 p-10 text-center"
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
                <motion.div key="form" className="bg-ar-card border border-ar-border p-6 md:p-8">
                  {/* Steps indicator */}
                  <div className="flex items-center gap-0 mb-8">
                    {steps.map((s, i) => {
                      const Icon = s.icon
                      const isActive = s.id === step
                      const isDone = s.id < step
                      return (
                        <div key={s.id} className="flex items-center flex-1">
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className={`w-9 h-9 flex items-center justify-center transition-all duration-300 ${
                                isActive
                                  ? 'bg-ar-red text-white'
                                  : isDone
                                  ? 'bg-ar-red/30 text-ar-red border border-ar-red/50'
                                  : 'bg-ar-anthracite text-white/30 border border-ar-border'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle size={16} />
                              ) : (
                                <Icon size={16} />
                              )}
                            </div>
                            <span
                              className={`text-[10px] uppercase tracking-widest ${
                                isActive ? 'text-white' : isDone ? 'text-ar-red/70' : 'text-white/20'
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                          {i < steps.length - 1 && (
                            <div
                              className={`flex-1 h-px mx-2 mb-5 transition-colors duration-500 ${
                                step > s.id ? 'bg-ar-red/50' : 'bg-ar-border'
                              }`}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <form onSubmit={handleSubmit}>
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
                      {step === 2 && (
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
                                className={`flex items-center justify-between p-3.5 border cursor-pointer transition-all duration-200 ${
                                  formData.service === s.id
                                    ? 'border-ar-red bg-ar-red/10'
                                    : 'border-ar-border hover:border-white/30'
                                }`}
                              >
                                <div className="flex items-center gap-3">
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
                                  <span className="text-white text-sm">{s.label}</span>
                                </div>
                                <span className="text-ar-red text-xs font-semibold">{s.price}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3 — Contact */}
                      {step === 3 && (
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
                            <label className="text-white/50 text-xs uppercase tracking-widest block mb-1.5">
                              Date souhaitée
                            </label>
                            <input
                              type="date"
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
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={() => setStep((s) => s - 1)}
                          className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
                        >
                          <ChevronLeft size={16} />
                          Retour
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          disabled={!canNext}
                          onClick={() => setStep((s) => s + 1)}
                          className={`flex items-center gap-2 btn-primary text-xs transition-opacity duration-300 ${
                            !canNext ? 'opacity-40 cursor-not-allowed' : ''
                          }`}
                        >
                          Suivant
                          <ChevronRight size={16} />
                        </button>
                      ) : (
                        <div className="flex flex-col items-end gap-1">
                          <button type="submit" disabled={sending} className="btn-primary text-xs disabled:opacity-50">
                            {sending ? 'Envoi en cours...' : 'Envoyer ma demande'}
                          </button>
                          {error && (
                            <span className="text-red-400 text-xs">Erreur lors de l&apos;envoi. Réessayez.</span>
                          )}
                        </div>
                      )}
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
