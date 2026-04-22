export type ProductCategory = 'Packs' | 'Lavage' | 'Protection' | 'Habitacle'

export type Review = {
  author: string
  rating: number
  comment: string
  date: string
}

export type Product = {
  id: string
  name: string
  category: ProductCategory
  volume: string
  price: number
  badge?: string
  description: string
  highlights: string[]
  usage?: string
  reviews?: Review[]
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
    usage: "Diluer 30 ml dans un seau de 10 L d'eau tiède. Appliquer à l'éponge ou au gant de lavage, rincer abondamment à l'eau claire. Éviter de l'utiliser en plein soleil.",
    reviews: [
      {
        author: 'Thomas M.',
        rating: 5,
        comment: "Excellent résultat, aucune trace après séchage. La mousse est dense et agréable à travailler. Je l'utilise maintenant à chaque lavage.",
        date: 'Mars 2025',
      },
      {
        author: 'Sarah L.',
        rating: 5,
        comment: 'Très satisfaite, ça ne raye pas et la carrosserie ressort impeccable. Compatible avec ma protection céramique, parfait.',
        date: 'Fév. 2025',
      },
      {
        author: 'Romain D.',
        rating: 4,
        comment: 'Efficace et facile à doser. Bon rapport qualité/prix pour un shampoing professionnel.',
        date: 'Janv. 2025',
      },
    ],
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
    description: "La finition rapide pour raviver la brillance après lavage et limiter les traces d'eau.",
    highlights: ['Brillance instantanée', 'Effet déperlant', 'Parfait après prestation'],
    usage: "Vaporiser directement sur le panneau de carrosserie sec ou humide, étaler avec un chiffon microfibre propre en mouvements circulaires, puis lustrer avec une face propre. Idéal après chaque lavage.",
    reviews: [
      {
        author: 'Julien P.',
        rating: 5,
        comment: 'Utilisé juste après ma prestation AR Protect — la carrosserie brille comme un miroir. Effet déperlant vraiment top.',
        date: 'Avr. 2025',
      },
      {
        author: 'Marine C.',
        rating: 5,
        comment: "Facile d'application, résultat professionnel en 5 minutes. La finition tient plusieurs semaines.",
        date: 'Mars 2025',
      },
      {
        author: 'Kevin B.',
        rating: 4,
        comment: "Bon produit, brillance immédiate. Je recommande de l'appliquer sur une carrosserie froide pour un meilleur résultat.",
        date: 'Janv. 2025',
      },
    ],
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
    usage: 'Vaporiser sur les jantes à température ambiante, laisser agir 2 à 3 minutes sans laisser sécher. Brosser si nécessaire, puis rincer abondamment. Ne pas utiliser sur des jantes très chaudes.',
    reviews: [
      {
        author: 'Nicolas F.',
        rating: 5,
        comment: "Les poussières de frein partent sans forcer. Mes jantes noires n'ont jamais été aussi propres.",
        date: 'Avr. 2025',
      },
      {
        author: 'Aurélie K.',
        rating: 5,
        comment: "Produit redoutablement efficace, l'odeur est forte mais le résultat est là. Impeccable.",
        date: 'Mars 2025',
      },
      {
        author: 'David R.',
        rating: 4,
        comment: "Très bon nettoyant, je complète avec une brosse à jantes pour les coins et c'est parfait.",
        date: 'Fév. 2025',
      },
    ],
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
    description: "Un nettoyant polyvalent pour plastiques, seuils, inserts et surfaces de l'habitacle.",
    highlights: ['Plastiques', 'Surfaces mates', 'Odeur fraîche'],
    usage: 'Vaporiser sur la surface à nettoyer ou sur un chiffon microfibre. Frotter doucement puis essuyer. Pour les zones délicates (tableau de bord, écrans), appliquer sur chiffon uniquement.',
    reviews: [
      {
        author: 'Émeline T.',
        rating: 5,
        comment: "L'habitacle sent bon et les plastiques retrouvent leur couleur d'origine. Je suis conquise.",
        date: 'Avr. 2025',
      },
      {
        author: 'Alexandre B.',
        rating: 4,
        comment: 'Très efficace sur les seuils de portes et les plastiques durs. Pas de résidu ni de trace grasse.',
        date: 'Mars 2025',
      },
      {
        author: 'Lucie M.',
        rating: 5,
        comment: "Polyvalent et agréable à utiliser. La fragrance est discrète et l'habitacle ressemble à du neuf.",
        date: 'Janv. 2025',
      },
    ],
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
    usage: "Appliquer sur des pneus propres et secs à l'aide d'une éponge applicatrice. Étaler uniformément sur les flancs. Laisser sécher 5 minutes avant de prendre la route.",
    reviews: [
      {
        author: 'Baptiste L.',
        rating: 5,
        comment: "Mes pneus ont l'air neufs après application. Le fini satiné est parfait, pas trop brillant.",
        date: 'Mars 2025',
      },
      {
        author: 'Célia V.',
        rating: 4,
        comment: 'Application simple avec une éponge. La tenue est bonne, environ 3-4 lavages avant de renouveler.',
        date: 'Fév. 2025',
      },
      {
        author: 'Mathieu G.',
        rating: 5,
        comment: 'Parfait pour finaliser un lavage complet. Rendu professionnel garanti.',
        date: 'Janv. 2025',
      },
    ],
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
    description: "Un lait d'entretien pour garder les cuirs souples, propres et moins sensibles au dessèchement.",
    highlights: ['Nourrit le cuir', 'Finition non grasse', 'Aide anti-dessèchement'],
    usage: "Appliquer une noisette sur un chiffon microfibre propre et travailler par petites zones en mouvements circulaires. Laisser pénétrer 10 minutes, puis essuyer l'excédent. Traiter tous les 2 à 3 mois.",
    reviews: [
      {
        author: 'Nathalie S.',
        rating: 5,
        comment: "Mes sièges cuir sont comme neufs ! La finition n'est pas grasse du tout, le toucher est incroyable.",
        date: 'Avr. 2025',
      },
      {
        author: 'Pierre A.',
        rating: 5,
        comment: 'Très bonne formule, le cuir reprend de la souplesse visible dès la première application. Odeur agréable.',
        date: 'Mars 2025',
      },
      {
        author: 'Camille H.',
        rating: 4,
        comment: 'Efficace, pas de résidu et les cuirs sont vraiment nourris. Idéal à combiner avec le nettoyant intérieur.',
        date: 'Fév. 2025',
      },
    ],
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
    description: "Un traitement simple pour améliorer l'écoulement de l'eau sur pare-brise et vitrages.",
    highlights: ['Effet pluie', 'Visibilité', 'Pare-brise et vitres'],
    usage: 'Nettoyer les vitres au préalable. Appliquer le produit sur un chiffon applicateur en petites sections circulaires jusqu\'à légère résistance. Attendre 5 minutes, puis polir avec un microfibre propre. Renouveler toutes les 6 semaines.',
    reviews: [
      {
        author: 'François D.',
        rating: 5,
        comment: 'Effet hydrophobe bluffant dès 80 km/h, les gouttes disparaissent seules. Vraiment utile pour la sécurité.',
        date: 'Avr. 2025',
      },
      {
        author: 'Isabelle M.',
        rating: 4,
        comment: "Application un peu technique mais le résultat vaut le coup. Les essuie-glaces passent beaucoup moins souvent.",
        date: 'Mars 2025',
      },
      {
        author: 'Olivier C.',
        rating: 5,
        comment: 'Indispensable en automne/hiver. Le pare-brise reste clair même sous la pluie battante.',
        date: 'Janv. 2025',
      },
    ],
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
    usage: "Chaque produit du pack est accompagné de sa fiche d'utilisation. Ce kit couvre l'intégralité d'un entretien complet : extérieur (shampoing + finition), intérieur (nettoyant + cuir), et outils de travail.",
    reviews: [
      {
        author: 'Arnaud P.',
        rating: 5,
        comment: 'Le meilleur investissement pour garder son véhicule en état entre deux prestations AR Protect. Complet et qualitatif.',
        date: 'Avr. 2025',
      },
      {
        author: 'Jennifer T.',
        rating: 5,
        comment: 'Parfait en cadeau ! Tout est là, plus besoin de chercher. La microfibre offerte est de bonne qualité.',
        date: 'Mars 2025',
      },
      {
        author: 'Michel B.',
        rating: 5,
        comment: "Excellent rapport qualité/prix comparé à l'achat à l'unité. Les produits sont efficaces et les odeurs agréables.",
        date: 'Fév. 2025',
      },
    ],
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
