export type ProductCategory = 'Packs' | 'Lavage' | 'Protection' | 'Habitacle'

export type Product = {
  id: string
  name: string
  category: ProductCategory
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

export const productCatalog: Product[] = [
  {
    id: 'shampoing-ph-neutre',
    name: 'Shampoing pH neutre',
    category: 'Lavage',
    volume: '500 ml',
    price: 12.9,
    badge: 'Carrosserie',
    description: 'Un lavage doux qui respecte les protections, cires et traitements déjà posés.',
    highlights: ['Mousse dense', 'Sans trace', 'Compatible lavage manuel'],
    image: {
      src: '/arprotect_logo.jpg',
      alt: 'Shampoing pH neutre AR Protect',
    },
  },
  {
    id: 'quick-detailer',
    name: 'Quick Detailer',
    category: 'Protection',
    volume: '500 ml',
    price: 17.9,
    badge: 'Finition',
    description: 'La finition rapide pour raviver la brillance après lavage et limiter les traces d’eau.',
    highlights: ['Brillance instantanée', 'Effet déperlant', 'Parfait après prestation'],
    image: {
      src: '/arprotect_logo.jpg',
      alt: 'Quick Detailer AR Protect',
    },
  },
  {
    id: 'nettoyant-jantes',
    name: 'Nettoyant jantes',
    category: 'Lavage',
    volume: '500 ml',
    price: 14.9,
    description: 'Dissout les poussières de frein et saletés routières sans agresser les jantes vernies.',
    highlights: ['Action ciblée', 'Jantes vernies', 'Finition nette'],
    image: {
      src: '/arprotect_logo.jpg',
      alt: 'Nettoyant jantes AR Protect',
    },
  },
  {
    id: 'nettoyant-interieur',
    name: 'Nettoyant intérieur',
    category: 'Habitacle',
    volume: '500 ml',
    price: 13.9,
    badge: 'Habitacle',
    description: 'Un nettoyant polyvalent pour plastiques, seuils, inserts et surfaces de l’habitacle.',
    highlights: ['Plastiques', 'Surfaces mates', 'Odeur fraîche'],
    image: {
      src: '/arprotect_logo.jpg',
      alt: 'Nettoyant intérieur AR Protect',
    },
  },
  {
    id: 'dressing-pneus',
    name: 'Dressing pneus',
    category: 'Protection',
    volume: '250 ml',
    price: 13.9,
    description: 'Redonne un noir satiné aux pneus et aide à protéger les flancs entre deux lavages.',
    highlights: ['Noir satiné', 'Application rapide', 'Finition extérieure'],
    image: {
      src: '/arprotect_logo.jpg',
      alt: 'Dressing pneus AR Protect',
    },
  },
  {
    id: 'soin-cuirs-nourrissant',
    name: 'Soin cuirs nourrissant',
    category: 'Habitacle',
    volume: '250 ml',
    price: 18.9,
    badge: 'Cuir',
    description: 'Un lait d’entretien pour garder les cuirs souples, propres et moins sensibles au dessèchement.',
    highlights: ['Nourrit le cuir', 'Finition non grasse', 'Aide anti-dessèchement'],
    image: {
      src: '/arprotect_logo.jpg',
      alt: 'Soin cuirs nourrissant AR Protect',
    },
  },
  {
    id: 'protection-vitres-hydrophobe',
    name: 'Protection vitres hydrophobe',
    category: 'Protection',
    volume: '250 ml',
    price: 15.9,
    description: 'Un traitement simple pour améliorer l’écoulement de l’eau sur pare-brise et vitrages.',
    highlights: ['Effet pluie', 'Visibilité', 'Pare-brise et vitres'],
    image: {
      src: '/arprotect_logo.jpg',
      alt: 'Protection vitres hydrophobe AR Protect',
    },
  },
  {
    id: 'pack-entretien-complet',
    name: 'Pack entretien complet',
    category: 'Packs',
    volume: '4 produits',
    price: 69.9,
    badge: 'Best seller',
    description: 'Le kit simple pour entretenir un véhicule propre après une prestation AR Protect.',
    highlights: ['Shampoing', 'Intérieur', 'Brosse', 'Microfibre offerte'],
    image: {
      src: '/products/pack-entretien-complet.jpg',
      alt: 'Pack entretien complet AR Protect',
    },
  },
]

const recommendationsByService: Record<string, string[]> = {
  interieur: ['nettoyant-interieur', 'soin-cuirs-nourrissant', 'pack-entretien-complet'],
  exterieur: ['shampoing-ph-neutre', 'nettoyant-jantes', 'dressing-pneus', 'quick-detailer'],
  full: ['pack-entretien-complet', 'quick-detailer', 'nettoyant-jantes', 'nettoyant-interieur'],
  shampoing: ['nettoyant-interieur', 'pack-entretien-complet'],
  cuirs: ['soin-cuirs-nourrissant', 'nettoyant-interieur', 'pack-entretien-complet'],
  optiques: ['protection-vitres-hydrophobe', 'quick-detailer'],
  lustrage: ['shampoing-ph-neutre', 'quick-detailer', 'pack-entretien-complet'],
  devis: ['pack-entretien-complet', 'nettoyant-interieur', 'quick-detailer'],
}

export const formatProductPrice = (value: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)

export function getRecommendedProductsForService(serviceId: string) {
  const productIds = recommendationsByService[serviceId] ?? recommendationsByService.devis
  return productIds
    .map((id) => productCatalog.find((product) => product.id === id))
    .filter((product): product is Product => product !== undefined)
}

export function getProductById(productId: string) {
  return productCatalog.find((product) => product.id === productId)
}
