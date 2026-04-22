'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { formatProductPrice, productCatalog, type Product, type ProductCategory, type Review } from '@/lib/products'

type Category = 'Tous' | ProductCategory

type ReviewFormData = {
  author: string
  rating: number
  comment: string
}

type CartItem = {
  product: Product
  quantity: number
}

const categories: Category[] = ['Tous', 'Lavage', 'Habitacle', 'Protection', 'Packs']

function ProductPhoto({ product, className }: { product: Product; className?: string }) {
  const fallbackImage = '/arprotect_logo.jpg'
  const [imageSrc, setImageSrc] = useState(product.image.src)

  useEffect(() => {
    setImageSrc(product.image.src)
  }, [product.image.src])

  return (
    <div className={`relative overflow-hidden bg-[#0b0b0b] ${className ?? 'h-60 border-b border-ar-border'}`}>
      <Image
        src={imageSrc}
        alt={product.image.alt}
        fill
        sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
        onError={() => setImageSrc(fallbackImage)}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          className={i < rating ? 'fill-ar-red text-ar-red' : 'fill-white/10 text-white/10'}
        />
      ))}
    </div>
  )
}

function ReviewForm({
  product,
  onSubmitted,
}: {
  product: Product
  onSubmitted: (review: Review) => void
}) {
  const [form, setForm] = useState<ReviewFormData>({ author: '', rating: 0, comment: '' })
  const [hovered, setHovered] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.rating === 0) { setErrorMsg('Veuillez sélectionner une note.'); return }
    if (form.author.trim().length < 2) { setErrorMsg('Le prénom doit faire au moins 2 caractères.'); return }
    if (form.comment.trim().length < 10) { setErrorMsg('Le commentaire doit faire au moins 10 caractères.'); return }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          author: form.author.trim(),
          rating: form.rating,
          comment: form.comment.trim(),
          honeypot: '',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? 'Erreur serveur')
      }

      setStatus('success')
      const now = new Date()
      const date = now.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
      onSubmitted({ author: form.author.trim(), rating: form.rating, comment: form.comment.trim(), date })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-ar-red/30 bg-ar-red/5 p-5 text-center">
        <p className="text-sm font-semibold text-white">Merci pour votre avis !</p>
        <p className="mt-1 text-xs text-white/45">Votre commentaire est visible ci-dessus et sera examiné par notre équipe.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Note étoiles */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Votre note <span className="text-ar-red">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setForm((f) => ({ ...f, rating: n }))}
              aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
              className="p-0.5 transition-transform hover:scale-110"
            >
              <Star
                size={26}
                className={
                  n <= (hovered || form.rating)
                    ? 'fill-ar-red text-ar-red'
                    : 'fill-white/10 text-white/20'
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Prénom */}
      <div>
        <label htmlFor="review-author" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Prénom <span className="text-ar-red">*</span>
        </label>
        <input
          id="review-author"
          type="text"
          value={form.author}
          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
          maxLength={80}
          placeholder="Votre prénom"
          className="w-full border border-ar-border bg-ar-black px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-ar-red/50 transition-colors"
          required
        />
      </div>

      {/* Commentaire */}
      <div>
        <label htmlFor="review-comment" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Commentaire <span className="text-ar-red">*</span>
        </label>
        <textarea
          id="review-comment"
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          maxLength={800}
          rows={4}
          placeholder="Partagez votre expérience avec ce produit…"
          className="w-full resize-none border border-ar-border bg-ar-black px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-ar-red/50 transition-colors"
          required
        />
        <p className="mt-1 text-right text-[0.6rem] text-white/25">{form.comment.length}/800</p>
      </div>

      {/* Honeypot caché */}
      <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

      {errorMsg && (
        <p className="text-xs text-ar-red">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary flex w-full items-center justify-center gap-2 px-4 disabled:opacity-50 disabled:pointer-events-none"
      >
        {status === 'loading' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Envoi en cours…
          </>
        ) : (
          'Publier mon avis'
        )}
      </button>

      <p className="text-[0.65rem] leading-relaxed text-white/25 text-center">
        Votre avis sera examiné avant publication définitive.
      </p>
    </form>
  )
}

function ProductModal({
  product,
  quantity,
  extraReviews,
  onClose,
  onUpdateQuantity,
  onSubmitReview,
}: {
  product: Product
  quantity: number
  extraReviews: Review[]
  onClose: () => void
  onUpdateQuantity: (product: Product, qty: number) => void
  onSubmitReview: (productId: string, review: Review) => void
}) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const allReviews = [...(product.reviews ?? []), ...extraReviews]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-ar-dark border border-ar-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center bg-black/60 text-white/60 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="relative h-64 border-b border-ar-border">
          <ProductPhoto product={product} className="h-64" />
          {product.badge && (
            <span className="absolute top-4 left-4 border border-ar-red/35 bg-ar-red/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-ar-red">
              {product.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ar-red/80">
            {product.category} · {product.volume}
          </p>
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-white">
              {product.name}
            </h2>
            <strong className="font-display text-2xl font-black text-white whitespace-nowrap">
              {formatProductPrice(product.price)}
            </strong>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/55">{product.description}</p>

          {/* Caractéristiques */}
          <div className="mt-6">
            <h3 className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-white/35">
              Caractéristiques
            </h3>
            <ul className="space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-white/65">
                  <Check size={12} className="text-ar-red shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Mode d'emploi */}
          {product.usage && (
            <div className="mt-6">
              <h3 className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-white/35">
                {"Mode d'emploi"}
              </h3>
              <p className="text-sm leading-relaxed text-white/55">{product.usage}</p>
            </div>
          )}

          {/* Avis clients */}
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-white/35">
                Avis clients {allReviews.length > 0 && `(${allReviews.length})`}
              </h3>
              {!showReviewForm && (
                <button
                  type="button"
                  onClick={() => setShowReviewForm(true)}
                  className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ar-red hover:text-white transition-colors"
                >
                  + Laisser un avis
                </button>
              )}
            </div>

            {showReviewForm && (
              <div className="mb-5 border border-ar-border p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Votre avis</p>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="text-white/30 hover:text-white transition-colors"
                    aria-label="Annuler"
                  >
                    <X size={16} />
                  </button>
                </div>
                <ReviewForm
                  product={product}
                  onSubmitted={(review) => {
                    onSubmitReview(product.id, review)
                    setShowReviewForm(false)
                  }}
                />
              </div>
            )}

            {allReviews.length > 0 ? (
              <div className="space-y-3">
                {allReviews.map((review, i) => (
                  <div key={i} className="border border-ar-border p-4 bg-ar-black/40">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold text-white">{review.author}</span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-xs leading-relaxed text-white/50">{review.comment}</p>
                    <p className="mt-2 text-[0.6rem] uppercase tracking-widest text-white/25">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              !showReviewForm && (
                <p className="text-sm text-white/30 text-center py-4">
                  Aucun avis pour ce produit. Soyez le premier !
                </p>
              )
            )}
          </div>

          {/* Ajouter au panier */}
          <div className="mt-8 pt-6 border-t border-ar-border">
            {quantity > 0 ? (
              <div className="grid grid-cols-[2.75rem_1fr_2.75rem] overflow-hidden border border-ar-red/45">
                <button
                  type="button"
                  aria-label={`Retirer ${product.name}`}
                  onClick={() => onUpdateQuantity(product, quantity - 1)}
                  className="flex min-h-12 items-center justify-center bg-ar-red/10 text-white transition-colors hover:bg-ar-red"
                >
                  <Minus size={16} />
                </button>
                <span className="flex min-h-12 items-center justify-center border-x border-ar-red/35 text-sm font-bold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label={`Ajouter ${product.name}`}
                  onClick={() => onUpdateQuantity(product, quantity + 1)}
                  className="flex min-h-12 items-center justify-center bg-ar-red text-white transition-colors hover:bg-ar-red-hover"
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onUpdateQuantity(product, 1)}
                className="btn-primary flex w-full items-center justify-center gap-2 px-4"
              >
                <ShoppingBag size={15} />
                Ajouter au panier
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProductStore() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous')
  const [cart, setCart] = useState<Record<string, CartItem>>({})
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [mobileCartOpen, setMobileCartOpen] = useState(false)
  const [sessionReviews, setSessionReviews] = useState<Record<string, Review[]>>({})

  const addSessionReview = (productId: string, review: Review) => {
    setSessionReviews((prev) => ({
      ...prev,
      [productId]: [...(prev[productId] ?? []), review],
    }))
  }

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'Tous') return productCatalog
    return productCatalog.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  const cartItems = useMemo(() => Object.values(cart), [cart])
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const updateQuantity = (product: Product, nextQuantity: number) => {
    setCart((current) => {
      const next = { ...current }
      if (nextQuantity <= 0) {
        delete next[product.id]
      } else {
        next[product.id] = { product, quantity: nextQuantity }
      }
      return next
    })
  }

  const orderLines = cartItems.map(
    (item) => `${item.quantity} x ${item.product.name} (${formatProductPrice(item.product.price)})`
  )

  const whatsappHref = `https://wa.me/33636230807?text=${encodeURIComponent(
    `Bonjour AR Protect, je souhaite commander :\n${orderLines.join('\n')}\n\nTotal produits : ${formatProductPrice(subtotal)}`
  )}`

  const mailHref = `mailto:arprotect77@gmail.com?subject=${encodeURIComponent(
    'Commande produits AR Protect'
  )}&body=${encodeURIComponent(
    `Bonjour AR Protect,\n\nJe souhaite commander :\n${orderLines.join('\n')}\n\nTotal produits : ${formatProductPrice(
      subtotal
    )}\n\nMerci.`
  )}`

  const CartContent = () => (
    <>
      <div className="border-b border-ar-border p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-ar-red">
              Commande
            </p>
            <h2 className="mt-1 font-display text-2xl font-black uppercase text-white">
              Panier
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 min-w-12 items-center justify-center border border-ar-red/35 bg-ar-red/10 px-3 text-sm font-black text-white">
              {cartCount}
            </div>
            <button
              type="button"
              onClick={() => setMobileCartOpen(false)}
              className="lg:hidden flex h-9 w-9 items-center justify-center text-white/50 hover:text-white transition-colors"
              aria-label="Fermer le panier"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-44 p-5">
        {cartItems.length === 0 ? (
          <div className="flex min-h-32 flex-col justify-center border border-dashed border-white/15 p-5 text-center">
            <ShoppingBag size={26} className="mx-auto mb-3 text-white/25" />
            <p className="text-sm font-semibold uppercase tracking-widest text-white/45">
              Panier vide
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="border-b border-ar-border/70 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold uppercase leading-tight text-white">{item.product.name}</p>
                    <p className="mt-1 text-xs text-white/40">
                      {item.quantity} x {formatProductPrice(item.product.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Supprimer ${item.product.name}`}
                    onClick={() => updateQuantity(item.product, 0)}
                    className="flex h-11 w-11 items-center justify-center text-white/35 transition-colors hover:text-ar-red"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-ar-border p-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/35">
            Total produits
          </span>
          <strong className="font-display text-3xl font-black text-white">
            {formatProductPrice(subtotal)}
          </strong>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <a
            href={cartItems.length ? whatsappHref : undefined}
            aria-disabled={cartItems.length === 0 ? 'true' : 'false'}
            className={`btn-primary flex items-center justify-center gap-2 px-4 text-center ${
              cartItems.length === 0 ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            Commander
            <ArrowRight size={15} />
          </a>
          <a
            href={cartItems.length ? mailHref : undefined}
            aria-disabled={cartItems.length === 0 ? 'true' : 'false'}
            className={`btn-outline flex items-center justify-center px-4 text-center ${
              cartItems.length === 0 ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            Commander par email
          </a>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-white/35">
          Retrait ou expédition à confirmer avec AR Protect selon disponibilité.
        </p>
      </div>
    </>
  )

  return (
    <>
      {/* Bouton panier flottant mobile — positionné à côté du burger */}
      <div className="lg:hidden fixed top-[18px] right-14 z-50">
        <button
          type="button"
          onClick={() => setMobileCartOpen(true)}
          aria-label={`Panier — ${cartCount} article${cartCount !== 1 ? 's' : ''}`}
          className="relative flex h-10 w-10 items-center justify-center text-white"
        >
          <ShoppingBag size={22} />
          <span
            className={`absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center bg-ar-red px-1 text-[0.6rem] font-black text-white leading-none transition-all duration-300 ${
              cartCount > 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            {cartCount}
          </span>
        </button>
      </div>

      {/* Tiroir panier mobile */}
      <AnimatePresence>
        {mobileCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/60 lg:hidden"
              onClick={() => setMobileCartOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-[56] max-h-[80vh] overflow-y-auto bg-[#101010] border-t border-ar-border lg:hidden"
            >
              <CartContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modale détail produit */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            quantity={cart[selectedProduct.id]?.quantity ?? 0}
            extraReviews={sessionReviews[selectedProduct.id] ?? []}
            onClose={() => setSelectedProduct(null)}
            onUpdateQuantity={updateQuantity}
            onSubmitReview={addSessionReview}
          />
        )}
      </AnimatePresence>

      <section className="relative min-h-[92vh] overflow-hidden bg-ar-black pt-28">
        <div className="absolute inset-0">
          <Image
            src="/apres_ext.png"
            alt="Carrosserie automobile brillante après entretien AR Protect"
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-ar-black/75 to-ar-black" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ar-black to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(92vh-7rem)] max-w-7xl flex-col justify-center px-4 pb-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <span className="mb-6 inline-flex items-center gap-2 border border-ar-red/35 bg-ar-red/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ar-red">
              <ShoppingBag size={14} />
              Boutique entretien auto
            </span>

            <h1 className="font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Produits
              <span className="block text-gradient-red">AR Protect</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/62 sm:text-lg">
              Les essentiels pour garder un véhicule net entre deux prestations : lavage,
              habitacle, jantes, pneus et finition protectrice.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#catalogue" className="btn-primary inline-flex items-center justify-center gap-2">
                Voir les produits
                <ArrowRight size={15} />
              </a>
              <a href="#panier" className="btn-outline inline-flex items-center justify-center gap-2">
                Panier
                <span className="inline-flex h-5 min-w-5 items-center justify-center bg-ar-red px-1.5 text-[0.7rem] font-bold text-white">
                  {cartCount}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="catalogue" className="section-padding relative bg-ar-black">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-ar-red/70 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-ar-red">
                Catalogue
              </span>
              <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Entretien à domicile,
                <span className="block text-white/45">niveau atelier.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-11 border px-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === category
                      ? 'border-ar-red bg-ar-red text-white'
                      : 'border-ar-border bg-white/[0.02] text-white/50 hover:border-white/35 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_23rem] xl:grid-cols-[minmax(0,1fr)_25rem]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product, index) => {
                const quantity = cart[product.id]?.quantity ?? 0

                return (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className="group flex min-h-[32rem] flex-col overflow-hidden border border-ar-border bg-ar-card transition-all duration-300 hover:-translate-y-1 hover:border-ar-red/50"
                  >
                    {/* Zone cliquable → ouvre la modale */}
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-ar-red"
                      aria-label={`Voir les détails de ${product.name}`}
                    >
                      <ProductPhoto product={product} />

                      <div className="flex items-start justify-between gap-3 px-5 pt-5">
                        <div>
                          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ar-red/80">
                            {product.category} · {product.volume}
                          </p>
                          <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight text-white">
                            {product.name}
                          </h3>
                        </div>
                        {product.badge && (
                          <span className="border border-ar-red/35 bg-ar-red/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-ar-red shrink-0">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </button>

                    <div className="flex flex-1 flex-col px-5 pb-5">
                      <p className="mt-3 text-sm leading-relaxed text-white/50">{product.description}</p>

                      <ul className="mt-5 space-y-2">
                        {product.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-2 text-xs text-white/48">
                            <Check size={13} className="text-ar-red" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-6">
                        <div className="mb-4 flex items-end justify-between gap-4">
                          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/30">
                            Prix TTC
                          </span>
                          <strong className="font-display text-2xl font-black text-white">
                            {formatProductPrice(product.price)}
                          </strong>
                        </div>

                        {quantity > 0 ? (
                          <div className="grid grid-cols-[2.75rem_1fr_2.75rem] overflow-hidden border border-ar-red/45">
                            <button
                              type="button"
                              aria-label={`Retirer ${product.name}`}
                              onClick={() => updateQuantity(product, quantity - 1)}
                              className="flex min-h-11 items-center justify-center bg-ar-red/10 text-white transition-colors hover:bg-ar-red"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="flex min-h-11 items-center justify-center border-x border-ar-red/35 text-sm font-bold text-white">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Ajouter ${product.name}`}
                              onClick={() => updateQuantity(product, quantity + 1)}
                              className="flex min-h-11 items-center justify-center bg-ar-red text-white transition-colors hover:bg-ar-red-hover"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => updateQuantity(product, 1)}
                            className="btn-primary flex w-full items-center justify-center gap-2 px-4"
                          >
                            <ShoppingBag size={15} />
                            Ajouter
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>

            {/* Panier sidebar desktop */}
            <aside id="panier" className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-ar-border bg-[#101010]">
                <CartContent />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
