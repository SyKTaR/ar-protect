'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react'

type Category = 'Tous' | 'Packs' | 'Lavage' | 'Protection' | 'Habitacle'

type Product = {
  id: string
  name: string
  category: Exclude<Category, 'Tous'>
  volume: string
  price: number
  badge?: string
  description: string
  highlights: string[]
  image: {
    src: string
    alt: string
  }
}

type CartItem = {
  product: Product
  quantity: number
}

const categories: Category[] = ['Tous', 'Lavage', 'Habitacle', 'Protection', 'Packs']

const products: Product[] = [
  {
    id: 'pack-entretien-complet',
    name: 'Pack entretien complet',
    category: 'Packs',
    volume: '4 produits',
    price: 69.9,
    description: 'Le kit simple pour entretenir un véhicule propre après une prestation AR Protect.',
    highlights: ['Shampoing', 'Intérieur', 'Brosse', 'Microfibre offerte'],
    image: {
      src: '/products/pack-entretien-complet.jpg',
      alt: 'Pack entretien complet AR Protect',
    },
  },
]

const formatPrice = (value: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)

function ProductPhoto({ product }: { product: Product }) {
  const fallbackImage = '/arprotect_logo.jpg'
  const [imageSrc, setImageSrc] = useState(product.image.src)

  useEffect(() => {
    setImageSrc(product.image.src)
  }, [product.image.src])

  return (
    <div className="relative h-60 overflow-hidden border-b border-ar-border bg-[#0b0b0b]">
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

export default function ProductStore() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous')
  const [cart, setCart] = useState<Record<string, CartItem>>({})

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'Tous') return products
    return products.filter((product) => product.category === activeCategory)
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
    (item) => `${item.quantity} x ${item.product.name} (${formatPrice(item.product.price)})`
  )

  const whatsappHref = `https://wa.me/33636230807?text=${encodeURIComponent(
    `Bonjour AR Protect, je souhaite commander :\n${orderLines.join('\n')}\n\nTotal produits : ${formatPrice(subtotal)}`
  )}`

  const mailHref = `mailto:arprotect77@gmail.com?subject=${encodeURIComponent(
    'Commande produits AR Protect'
  )}&body=${encodeURIComponent(
    `Bonjour AR Protect,\n\nJe souhaite commander :\n${orderLines.join('\n')}\n\nTotal produits : ${formatPrice(
      subtotal
    )}\n\nMerci.`
  )}`

  return (
    <>
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
                    <ProductPhoto product={product} />

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ar-red/80">
                            {product.category} · {product.volume}
                          </p>
                          <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight text-white">
                            {product.name}
                          </h3>
                        </div>
                        {product.badge && (
                          <span className="border border-ar-red/35 bg-ar-red/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-ar-red">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-sm leading-relaxed text-white/50">{product.description}</p>

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
                            {formatPrice(product.price)}
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

            <aside id="panier" className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-ar-border bg-[#101010]">
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
                    <div className="flex h-12 min-w-12 items-center justify-center border border-ar-red/35 bg-ar-red/10 px-3 text-sm font-black text-white">
                      {cartCount}
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
                                {item.quantity} x {formatPrice(item.product.price)}
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
                      {formatPrice(subtotal)}
                    </strong>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <a
                      href={cartItems.length ? whatsappHref : undefined}
                      aria-disabled={cartItems.length === 0}
                      className={`btn-primary flex items-center justify-center gap-2 px-4 text-center ${
                        cartItems.length === 0 ? 'pointer-events-none opacity-40' : ''
                      }`}
                    >
                      Commander
                      <ArrowRight size={15} />
                    </a>
                    <a
                      href={cartItems.length ? mailHref : undefined}
                      aria-disabled={cartItems.length === 0}
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
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
