export type SeoService = {
  slug: string
  metaTitle: string
  metaDescription: string
  h1: string
  eyebrow: string
  summary: string
  price: string
  intro: string[]
  included: string[]
  process: { title: string; description: string }[]
  benefits: { title: string; description: string }[]
  faq: { question: string; answer: string }[]
  unavailable?: boolean
}

export const seoServices: SeoService[] = [
  {
    slug: 'nettoyage-interieur-voiture',
    metaTitle: 'Nettoyage intérieur voiture 77 | AR Protect',
    metaDescription:
      'Nettoyage intérieur de voiture à domicile en Seine-et-Marne : aspiration, plastiques, vitres, sièges et moquettes. Dès 69 € TTC. Devis gratuit AR Protect.',
    h1: 'Nettoyage intérieur de voiture en Seine-et-Marne',
    eyebrow: 'Nettoyage intérieur',
    summary:
      'Un nettoyage automobile intérieur méthodique, réalisé à domicile en Seine-et-Marne et en Île-de-France, pour retrouver un habitacle propre et sain.',
    price: 'Dès 69 € TTC',
    intro: [
      "Poussière incrustée, traces sur les plastiques, miettes, poils ou tissus ternis finissent par dégrader le confort de l'habitacle. AR Protect adapte le nettoyage intérieur à l'état réel du véhicule et au niveau de finition recherché.",
      "La prestation est réalisée sur rendez-vous, directement à domicile. Quatre niveaux de finition permettent de choisir entre un entretien essentiel et une remise en état plus poussée avec shampoing des sièges, des moquettes et protection anti-UV.",
    ],
    included: [
      'Aspiration complète et dépoussiérage minutieux',
      'Nettoyage et dégraissage des plastiques et surfaces',
      'Vitres intérieures et seuils de portes',
      'Shampoing des sièges selon la formule choisie',
      'Shampoing des moquettes selon la formule choisie',
      'Finition parfumée et traitement anti-UV en formule Signature',
    ],
    process: [
      { title: 'Diagnostic de l’habitacle', description: 'Évaluation des surfaces, tissus, taches et zones qui nécessitent une attention particulière.' },
      { title: 'Aspiration et dépoussiérage', description: 'Traitement méthodique des sièges, tapis, coffre, rangements et zones difficiles d’accès.' },
      { title: 'Nettoyage des surfaces', description: 'Dégraissage des plastiques, vitres, seuils et éléments de contact avec des produits adaptés.' },
      { title: 'Traitement en profondeur', description: 'Shampoing et extraction des tissus ou moquettes lorsque la formule sélectionnée le prévoit.' },
    ],
    benefits: [
      { title: 'Prestation adaptée', description: 'Le niveau de nettoyage est choisi selon l’état du véhicule, sans imposer une formule inutile.' },
      { title: 'Intervention à domicile', description: 'AR Protect se déplace en Seine-et-Marne et plus largement en Île-de-France sur rendez-vous.' },
      { title: 'Finitions professionnelles', description: 'Chaque zone est traitée avec une méthode et des produits adaptés à sa matière.' },
    ],
    faq: [
      { question: 'Le shampoing des sièges est-il toujours inclus ?', answer: 'Il est inclus dans les formules Confort, Premium et Signature. La formule Essentiel se concentre sur l’aspiration, les surfaces, les vitres et les seuils.' },
      { question: 'Pouvez-vous intervenir sur un véhicule très sale ?', answer: 'Oui. Un diagnostic permet d’identifier les taches, poils, odeurs ou salissures importantes et de recommander la formule adaptée.' },
      { question: 'Dans quelles zones intervenez-vous ?', answer: 'AR Protect intervient principalement en Seine-et-Marne et se déplace plus largement en Île-de-France selon la prestation.' },
    ],
  },
  {
    slug: 'nettoyage-exterieur-voiture',
    metaTitle: 'Nettoyage extérieur voiture 77 | AR Protect',
    metaDescription:
      'Nettoyage extérieur de voiture à domicile en Seine-et-Marne : prélavage, lavage manuel, jantes, séchage et finitions. Dès 59 € TTC.',
    h1: 'Nettoyage extérieur de voiture à domicile dans le 77',
    eyebrow: 'Nettoyage extérieur',
    summary:
      'Un lavage automobile extérieur manuel pour nettoyer la carrosserie, les jantes et les finitions sans recourir aux rouleaux automatiques.',
    price: 'Dès 59 € TTC',
    intro: [
      "Le nettoyage extérieur AR Protect associe prélavage, lavage manuel et finitions précises. L'objectif est de retirer le film routier et les salissures tout en limitant les gestes susceptibles de marquer la carrosserie.",
      "La prestation couvre la carrosserie, les jantes, les passages de roues, les vitres et les éléments extérieurs. Elle est réalisée à domicile en Seine-et-Marne et dans les secteurs desservis d'Île-de-France.",
    ],
    included: [
      'Prélavage à la mousse active',
      'Lavage manuel de la carrosserie',
      'Nettoyage des jantes et passages de roues',
      'Nettoyage des joints, plastiques et logos',
      'Séchage manuel et vitres extérieures',
      'Dressing des plastiques et des pneus',
    ],
    process: [
      { title: 'Prélavage', description: 'La mousse active aide à décoller les salissures avant toute action mécanique sur la carrosserie.' },
      { title: 'Lavage manuel', description: 'La carrosserie et les éléments extérieurs sont nettoyés méthodiquement à la main.' },
      { title: 'Jantes et zones basses', description: 'Les zones les plus exposées aux poussières de frein et projections routières sont traitées séparément.' },
      { title: 'Séchage et finitions', description: 'Séchage manuel, nettoyage des vitres et finition des pneus et plastiques extérieurs.' },
    ],
    benefits: [
      { title: 'Lavage sans rouleaux', description: 'Le travail manuel offre davantage de contrôle sur chaque zone du véhicule.' },
      { title: 'Résultat homogène', description: 'Les jantes, passages de roues, joints et finitions sont inclus dans le processus.' },
      { title: 'Tarif selon le gabarit', description: 'Le tarif de base tient compte du véhicule ; un devis est établi pour les cas particuliers.' },
    ],
    faq: [
      { question: 'Quel est le tarif du nettoyage extérieur ?', answer: 'La prestation démarre à 59 € TTC. Le tarif final dépend du gabarit et de l’état du véhicule, précisé lors du diagnostic.' },
      { question: 'Le nettoyage comprend-il les jantes ?', answer: 'Oui, le nettoyage des jantes, passages de roues et zones basses fait partie de la prestation extérieure.' },
      { question: 'La prestation retire-t-elle les micro-rayures ?', answer: 'Un lavage nettoie et ravive l’aspect général, mais la correction des micro-rayures nécessite une prestation de lustrage dédiée.' },
    ],
  },
  {
    slug: 'nettoyage-moteur-voiture',
    metaTitle: 'Nettoyage moteur voiture 77 | AR Protect',
    metaDescription:
      'Nettoyage du compartiment moteur à domicile en Seine-et-Marne : dégraissage et rinçage maîtrisé des surfaces. Prestation à 49 € TTC.',
    h1: 'Nettoyage moteur de voiture en Seine-et-Marne',
    eyebrow: 'Nettoyage moteur',
    summary:
      'Un nettoyage du compartiment moteur pour retirer les dépôts de graisse et de poussière accumulés, avec des précautions adaptées aux éléments sensibles.',
    price: '49 € TTC',
    intro: [
      "Le compartiment moteur accumule poussière, résidus d'huile et traces de graisse au fil des kilomètres. Un nettoyage régulier facilite le repérage visuel d'une fuite ou d'une usure et redonne un aspect plus net au compartiment.",
      "AR Protect protège au préalable les éléments électriques et sensibles, puis applique un dégraissant adapté avant rinçage maîtrisé. L'intervention reste prudente vis-à-vis des composants qui ne tolèrent pas l'humidité.",
    ],
    included: [
      'Protection des éléments électriques et sensibles',
      'Application d’un dégraissant adapté aux surfaces moteur',
      'Brossage des zones encrassées',
      'Rinçage maîtrisé, sans excès d’eau',
      'Séchage et contrôle visuel du compartiment',
      'Finition des caches plastiques apparents',
    ],
    process: [
      { title: 'Protection préalable', description: 'Les connecteurs, filtres et éléments sensibles sont protégés avant toute application de produit.' },
      { title: 'Dégraissage', description: 'Un produit dégraissant est appliqué sur les zones encrassées et laissé agir avant brossage.' },
      { title: 'Rinçage contrôlé', description: 'Le rinçage est réalisé avec un débit maîtrisé pour limiter les projections vers les éléments sensibles.' },
      { title: 'Séchage et finition', description: 'Séchage du compartiment et remise en état visuelle des caches et plastiques.' },
    ],
    benefits: [
      { title: 'Aspect plus net', description: 'Le compartiment retrouve un aspect propre, plus agréable à l’ouverture du capot.' },
      { title: 'Méthode prudente', description: 'Les zones électriques sont protégées avant toute intervention avec de l’eau ou du produit.' },
      { title: 'Tarif fixe', description: 'La prestation est proposée à un tarif unique de 49 € TTC.' },
    ],
    faq: [
      { question: 'Le nettoyage moteur est-il sans risque pour l’électronique ?', answer: 'Les éléments sensibles sont protégés avant intervention et le rinçage est maîtrisé, mais un compartiment moteur très ancien ou déjà fragilisé peut nécessiter davantage de précautions, évaluées lors du diagnostic.' },
      { question: 'Le nettoyage moteur répare-t-il une fuite ?', answer: 'Non. Il permet de nettoyer les surfaces et de mieux repérer une éventuelle fuite, mais ne remplace pas une intervention mécanique.' },
      { question: 'Quel est le prix du nettoyage moteur ?', answer: 'La prestation est facturée 49 € TTC.' },
    ],
  },
  {
    slug: 'shampoing-sieges-voiture',
    metaTitle: 'Shampoing sièges voiture 77 | AR Protect',
    metaDescription:
      'Shampoing des sièges de voiture en Seine-et-Marne : aspiration, mousse active, lessivage et vapeur antibactérienne. Dès 59 € TTC (2 sièges inclus).',
    h1: 'Shampoing des sièges de voiture en Seine-et-Marne',
    eyebrow: 'Shampoing des sièges',
    summary:
      'Une intervention ciblée sur les sièges en tissu pour traiter les salissures, rafraîchir les fibres et améliorer l’hygiène de l’habitacle.',
    price: 'Dès 59 € TTC (2 sièges inclus, +10 € TTC par siège supplémentaire, au-delà de 9 sièges sur devis)',
    intro: [
      "Les sièges accumulent poussière, traces et salissures liées à l'usage quotidien. Un simple passage d'aspirateur ne suffit pas lorsque les fibres sont marquées ou que des taches se sont installées.",
      "AR Protect combine aspiration, mousse active, lessivage en profondeur et vapeur antibactérienne. Le résultat dépend toujours de la nature, de l'ancienneté de la tache et de l'état initial du tissu.",
    ],
    included: [
      'Aspiration minutieuse des sièges',
      'Application d’une mousse active adaptée',
      'Travail en profondeur des fibres',
      'Traitement vapeur antibactérien',
      'Traitement des odeurs légères liées aux tissus',
      'Contrôle visuel des zones traitées',
    ],
    process: [
      { title: 'Inspection des tissus', description: 'Identification de la matière, des taches et des zones fragiles avant le traitement.' },
      { title: 'Aspiration', description: 'Retrait des poussières et particules afin de préparer correctement les fibres.' },
      { title: 'Shampoing en profondeur', description: 'Application de la solution, travail des fibres et extraction des salissures.' },
      { title: 'Vapeur et contrôle', description: 'Finition vapeur antibactérienne puis vérification du résultat sur chaque siège.' },
    ],
    benefits: [
      { title: 'Traitement ciblé', description: 'La prestation se concentre sur les sièges lorsque le reste de l’habitacle ne nécessite pas un nettoyage complet.' },
      { title: 'Méthode adaptée aux tissus', description: 'Le diagnostic initial évite d’appliquer le même traitement à toutes les matières.' },
      { title: 'Intervention locale', description: 'Service disponible à domicile en Seine-et-Marne et selon déplacement en Île-de-France.' },
    ],
    faq: [
      { question: 'Toutes les taches peuvent-elles disparaître ?', answer: 'Non, aucune disparition totale ne peut être garantie. Le résultat dépend de la substance, de l’ancienneté de la tache et de la réaction du tissu.' },
      { question: 'Le tarif évolue-t-il avec le nombre de sièges ?', answer: 'Le tarif de base inclut 2 sièges. Chaque siège supplémentaire est facturé 10 € TTC. Au-delà de 9 sièges, la prestation passe sur devis.' },
      { question: 'Combien coûte le shampoing des sièges ?', answer: 'La prestation démarre à 59 € TTC pour 2 sièges.' },
    ],
  },
  {
    slug: 'soin-cuir-voiture',
    metaTitle: 'Soin des cuirs voiture 77 | AR Protect',
    metaDescription:
      'Nettoyage et soin des cuirs de l’habitacle en Seine-et-Marne : sièges, portes, tableau de bord. Aspiration, nettoyage, lait nourrissant et anti-UV. 89 € TTC.',
    h1: 'Soin des cuirs automobile en Seine-et-Marne',
    eyebrow: 'Soin des cuirs',
    summary:
      'Un protocole dédié aux surfaces cuir de l’habitacle pour nettoyer, nourrir la matière et limiter le dessèchement lié à l’usage et aux UV.',
    price: '89 € TTC (toutes les surfaces cuir de l’habitacle : sièges, portes, tableau de bord, etc.)',
    intro: [
      "Le cuir automobile demande un entretien spécifique. Les frottements, la poussière, la chaleur et les UV peuvent ternir la surface et accélérer son dessèchement lorsque les soins ne sont pas adaptés.",
      "AR Protect procède à une aspiration détaillée, un nettoyage progressif, puis applique un soin nourrissant et une protection anti-UV sur l'ensemble des surfaces cuir de l'habitacle : sièges, contre-portes, tableau de bord et autres éléments concernés.",
    ],
    included: [
      'Aspiration détaillée des surfaces cuir',
      'Inspection des zones d’usure et de frottement',
      'Nettoyage intégral du cuir (sièges, portes, tableau de bord, etc.)',
      'Application d’un lait nourrissant protecteur',
      'Traitement anti-UV',
      'Contrôle des finitions',
    ],
    process: [
      { title: 'Diagnostic du cuir', description: 'Observation de la finition, de l’encrassement et des éventuelles zones fragilisées.' },
      { title: 'Aspiration et préparation', description: 'Retrait des particules dans les coutures, jonctions et zones de contact.' },
      { title: 'Nettoyage progressif', description: 'Travail des surfaces avec une méthode adaptée à chaque élément en cuir de l’habitacle.' },
      { title: 'Nutrition et protection', description: 'Application du soin nourrissant puis d’une protection destinée à limiter les effets des UV.' },
    ],
    benefits: [
      { title: 'Protocole spécifique', description: 'Les cuirs ne sont pas traités comme des plastiques ou des tissus classiques.' },
      { title: 'Toutes les surfaces cuir', description: 'Sièges, portes, tableau de bord et autres éléments cuir de l’habitacle sont couverts par la prestation.' },
      { title: 'Finition maîtrisée', description: 'L’objectif est un aspect propre et soigné, sans effet artificiellement gras.' },
    ],
    faq: [
      { question: 'Le soin répare-t-il les fissures du cuir ?', answer: 'Non. Le nettoyage et la nutrition entretiennent la matière, mais ne remplacent pas une réparation ou une recoloration lorsque le cuir est fissuré ou déchiré.' },
      { question: 'Quelles surfaces sont concernées ?', answer: 'Toutes les parties en cuir de l’habitacle : sièges, contre-portes, tableau de bord et autres éléments similaires.' },
      { question: 'Quel est le prix du soin des cuirs ?', answer: 'La prestation est proposée à 89 € TTC.' },
    ],
  },
  {
    slug: 'traitement-hydrophobe-voiture',
    metaTitle: 'Traitement hydrophobe voiture 77 | AR Protect',
    metaDescription:
      'Traitement hydrophobe pour tissus et capote de voiture en Seine-et-Marne : intérieur 99 € TTC, extérieur 129 € TTC, pack 199 € TTC.',
    h1: 'Traitement hydrophobe automobile en Seine-et-Marne',
    eyebrow: 'Traitement hydrophobe',
    summary:
      'Un traitement déperlant appliqué sur les tissus, l’alcantara ou la capote pour limiter la pénétration de l’eau et faciliter l’entretien courant.',
    price: 'Intérieur (tissus, alcantara) 99 € TTC · Extérieur (capote) 129 € TTC · Pack 199 € TTC',
    intro: [
      "Le traitement hydrophobe applique une couche déperlante sur une surface propre et préparée. Il ne remplace pas un nettoyage, mais vient compléter une surface déjà correctement entretenue.",
      "AR Protect propose deux volets distincts : un traitement intérieur pour les tissus et l'alcantara, et un traitement extérieur dédié à la capote des véhicules décapotables, avec un tarif pack pour les deux prestations combinées.",
    ],
    included: [
      'Nettoyage et préparation de la surface concernée',
      'Application du traitement déperlant',
      'Contrôle de la répartition du produit',
      'Temps de séchage et de fixation respecté',
      'Conseils d’entretien après application',
      'Choix entre traitement intérieur, extérieur ou pack combiné',
    ],
    process: [
      { title: 'Préparation', description: 'La surface est nettoyée et séchée avant application, condition nécessaire à la tenue du traitement.' },
      { title: 'Application', description: 'Le produit déperlant est appliqué de façon homogène sur les tissus, l’alcantara ou la capote selon la formule choisie.' },
      { title: 'Séchage', description: 'Un temps de séchage est respecté pour permettre la fixation du traitement.' },
      { title: 'Contrôle final', description: 'Vérification visuelle de l’application avant restitution du véhicule.' },
    ],
    benefits: [
      { title: 'Entretien facilité', description: 'Une surface traitée limite la pénétration de l’eau et facilite le nettoyage courant.' },
      { title: 'Deux volets distincts', description: 'Le traitement intérieur et le traitement extérieur répondent à des besoins différents, avec un tarif pack si les deux sont souhaités.' },
      { title: 'Application sur surface préparée', description: 'Le traitement est réalisé après nettoyage, pour une meilleure tenue.' },
    ],
    faq: [
      { question: 'Le traitement hydrophobe rend-il les tissus imperméables ?', answer: 'Non. Il limite la pénétration de l’eau et facilite l’entretien, mais ne rend pas la matière totalement imperméable dans la durée.' },
      { question: 'Quelle est la différence entre le traitement intérieur et extérieur ?', answer: 'Le traitement intérieur s’applique sur les tissus et l’alcantara de l’habitacle, tandis que le traitement extérieur est dédié à la capote des véhicules décapotables.' },
      { question: 'Quel est le tarif du pack ?', answer: 'Le pack combinant traitement intérieur et extérieur est proposé à 199 € TTC, contre 99 € et 129 € TTC séparément.' },
    ],
  },
  {
    slug: 'protection-ceramique-voiture',
    metaTitle: 'Traitement céramique voiture 77 | AR Protect',
    metaDescription:
      'Traitement céramique intérieur et extérieur automobile en Seine-et-Marne. Prestation actuellement indisponible, bientôt proposée par AR Protect.',
    h1: 'Traitement céramique automobile en Seine-et-Marne',
    eyebrow: 'Traitement céramique',
    summary:
      'Une protection céramique intérieure et extérieure appliquée sur une carrosserie ou un habitacle préparé, pour faciliter l’entretien courant.',
    price: 'Indisponible pour le moment',
    unavailable: true,
    intro: [
      "Le traitement céramique ne remplace ni le lavage ni la correction des défauts. Sa qualité dépend directement de la préparation préalable de la surface concernée, intérieure comme extérieure.",
      "Cette prestation est actuellement en cours de mise en place chez AR Protect et n'est pas encore réservable. Elle figure sur cette page à titre indicatif et sera proposée prochainement.",
    ],
    included: [
      'Diagnostic de l’état de la surface concernée',
      'Nettoyage et préparation avant application',
      'Décontamination avant traitement',
      'Application méthodique de la protection céramique',
      'Volet intérieur et volet extérieur',
      'Conseils d’entretien après la prestation',
    ],
    process: [
      { title: 'Inspection', description: 'Évaluation de la surface et définition du niveau de préparation nécessaire.' },
      { title: 'Préparation', description: 'Nettoyage et décontamination avant l’application du traitement.' },
      { title: 'Application', description: 'Pose contrôlée de la protection céramique sur les surfaces concernées.' },
      { title: 'Consignes d’entretien', description: 'Explication des précautions et méthodes d’entretien adaptées après la prestation.' },
    ],
    benefits: [
      { title: 'Entretien facilité', description: 'Une surface correctement protégée est généralement plus simple à entretenir au quotidien.' },
      { title: 'Deux volets possibles', description: 'Le traitement céramique est envisagé aussi bien pour l’intérieur que l’extérieur du véhicule.' },
      { title: 'Prestation à venir', description: 'AR Protect prépare la mise en place de cette prestation avant de la proposer à la réservation.' },
    ],
    faq: [
      { question: 'Puis-je réserver le traitement céramique dès maintenant ?', answer: 'Non, cette prestation n’est pas encore disponible à la réservation. Elle est affichée à titre indicatif en attendant sa mise en place.' },
      { question: 'La céramique empêche-t-elle les rayures ?', answer: 'Non. Elle apporte une protection de surface et facilite l’entretien, mais ne rend pas la carrosserie invulnérable aux impacts ou rayures.' },
      { question: 'Quand cette prestation sera-t-elle disponible ?', answer: 'Aucune date n’est communiquée pour le moment. N’hésitez pas à nous contacter pour être informé de sa mise en place.' },
    ],
  },
  {
    slug: 'revernissage-a-froid-voiture',
    metaTitle: 'Revernissage à froid voiture 77 | AR Protect',
    metaDescription:
      'Revernissage à froid de carrosserie en Seine-et-Marne. Prestation actuellement indisponible, bientôt proposée par AR Protect.',
    h1: 'Revernissage à froid automobile en Seine-et-Marne',
    eyebrow: 'Revernissage à froid',
    summary:
      'Une prestation de revernissage à froid destinée à redonner de la profondeur et de la brillance à une carrosserie ternie.',
    price: 'Indisponible pour le moment',
    unavailable: true,
    intro: [
      "Le revernissage à froid vise à redéposer une couche protectrice sur une carrosserie dont le vernis est terni, sans recourir à une cuisson en cabine. Cette technique nécessite un diagnostic précis de l'état du vernis existant.",
      "Cette prestation est actuellement en cours de mise en place chez AR Protect et n'est pas encore réservable. Elle figure sur cette page à titre indicatif et sera proposée prochainement.",
    ],
    included: [
      'Diagnostic de l’état du vernis',
      'Préparation et décontamination de la surface',
      'Application du produit de revernissage',
      'Contrôle de l’uniformité de la surface traitée',
      'Recommandations d’entretien post-application',
      'Prestation à confirmer selon l’état du véhicule',
    ],
    process: [
      { title: 'Diagnostic', description: 'Analyse de l’état du vernis existant et de la faisabilité du revernissage à froid.' },
      { title: 'Préparation', description: 'Nettoyage et décontamination de la carrosserie avant application.' },
      { title: 'Application', description: 'Pose du produit de revernissage sur les zones concernées.' },
      { title: 'Contrôle', description: 'Vérification de l’uniformité et de la finition obtenue.' },
    ],
    benefits: [
      { title: 'Technique ciblée', description: 'Le revernissage à froid s’adresse aux carrosseries dont le vernis est terni mais encore en état d’être traité.' },
      { title: 'Diagnostic préalable', description: 'La faisabilité est toujours évaluée avant toute intervention.' },
      { title: 'Prestation à venir', description: 'AR Protect prépare la mise en place de cette prestation avant de la proposer à la réservation.' },
    ],
    faq: [
      { question: 'Puis-je réserver le revernissage à froid dès maintenant ?', answer: 'Non, cette prestation n’est pas encore disponible à la réservation. Elle est affichée à titre indicatif en attendant sa mise en place.' },
      { question: 'Le revernissage à froid convient-il à tous les véhicules ?', answer: 'Non. Son intérêt dépend de l’état du vernis existant, qui doit être diagnostiqué avant toute décision.' },
      { question: 'Quand cette prestation sera-t-elle disponible ?', answer: 'Aucune date n’est communiquée pour le moment. N’hésitez pas à nous contacter pour être informé de sa mise en place.' },
    ],
  },
  {
    slug: 'retouche-peinture-plastique-voiture',
    metaTitle: 'Retouche peinture plastiques voiture 77 | AR Protect',
    metaDescription:
      'Retouche de peinture sur plastiques automobiles en Seine-et-Marne : pare-chocs, baguettes et éléments plastiques. Prestation sur devis.',
    h1: 'Retouche peinture plastiques automobile en Seine-et-Marne',
    eyebrow: 'Retouche peinture plastique',
    summary:
      'Une retouche de peinture ciblée sur les éléments plastiques du véhicule, réalisée après diagnostic des dommages et de la teinte à reproduire.',
    price: 'Sur devis',
    intro: [
      "Pare-chocs griffés, baguettes ternies ou éclats sur un rétroviseur : les éléments plastiques peints se marquent différemment de la carrosserie et demandent une préparation et des produits adaptés à leur matière.",
      "Chaque retouche nécessite un diagnostic de l'étendue des dommages, de la teinte et de la finition du plastique concerné avant l'établissement d'un devis.",
    ],
    included: [
      'Inspection des éléments plastiques concernés',
      'Identification de la teinte et de la finition',
      'Préparation de la surface avant retouche',
      'Application de la peinture adaptée aux plastiques',
      'Contrôle du raccord avec les zones environnantes',
      'Conseils d’entretien après intervention',
    ],
    process: [
      { title: 'Diagnostic', description: 'Évaluation de l’étendue des dommages et de la teinte à reproduire.' },
      { title: 'Préparation', description: 'Nettoyage et préparation de la surface plastique avant application.' },
      { title: 'Retouche', description: 'Application de la peinture adaptée, en tenant compte de la finition d’origine.' },
      { title: 'Contrôle final', description: 'Vérification du raccord avec les éléments environnants.' },
    ],
    benefits: [
      { title: 'Méthode adaptée aux plastiques', description: 'Les plastiques ne réagissent pas comme la tôle et nécessitent des produits spécifiques.' },
      { title: 'Diagnostic avant devis', description: 'Le tarif est défini selon l’étendue réelle des dommages et la teinte à reproduire.' },
      { title: 'Résultat mesuré', description: 'L’objectif est un raccord cohérent avec l’état général du véhicule.' },
    ],
    faq: [
      { question: 'Le raccord de teinte est-il toujours parfait ?', answer: 'Un raccord au plus proche de la teinte d’origine est recherché, mais un résultat identique au neuf ne peut être garanti sur un élément déjà exposé au temps.' },
      { question: 'Pourquoi la prestation est-elle sur devis ?', answer: 'L’étendue des dommages, la teinte et la finition du plastique varient d’un véhicule à l’autre et déterminent le temps de travail nécessaire.' },
      { question: 'Cette prestation concerne-t-elle aussi la carrosserie ?', answer: 'Non, elle est dédiée aux éléments plastiques. Pour la carrosserie, une retouche peinture carrosserie est proposée séparément.' },
    ],
  },
  {
    slug: 'retouche-peinture-carrosserie-voiture',
    metaTitle: 'Retouche peinture carrosserie voiture 77 | AR Protect',
    metaDescription:
      'Retouche de peinture sur carrosserie automobile en Seine-et-Marne : éclats, rayures et petites zones à reprendre. Prestation sur devis.',
    h1: 'Retouche peinture carrosserie automobile en Seine-et-Marne',
    eyebrow: 'Retouche peinture carrosserie',
    summary:
      'Une retouche ciblée sur la carrosserie pour reprendre un éclat, une rayure ou une zone marquée, après diagnostic de l’étendue du défaut.',
    price: 'Sur devis',
    intro: [
      "Un éclat de gravillon, une rayure localisée ou une petite zone endommagée peuvent être repris sans nécessiter une réfection complète du panneau. La retouche cible la zone concernée après diagnostic.",
      "Le tarif dépend de l'étendue du défaut, de la teinte du véhicule et de la finition recherchée. Un devis est établi après inspection.",
    ],
    included: [
      'Inspection de la zone endommagée',
      'Identification de la teinte du véhicule',
      'Préparation de la surface avant retouche',
      'Application de la peinture sur la zone concernée',
      'Contrôle du raccord avec la carrosserie environnante',
      'Conseils d’entretien après intervention',
    ],
    process: [
      { title: 'Diagnostic', description: 'Analyse de l’étendue du défaut et de la teinte à reproduire.' },
      { title: 'Préparation', description: 'Nettoyage et préparation de la zone avant application de la peinture.' },
      { title: 'Retouche', description: 'Application ciblée de la peinture sur la zone concernée.' },
      { title: 'Contrôle final', description: 'Vérification du raccord avec les panneaux environnants.' },
    ],
    benefits: [
      { title: 'Intervention ciblée', description: 'La retouche traite la zone concernée sans nécessiter une réfection complète.' },
      { title: 'Diagnostic avant devis', description: 'Le tarif est défini selon l’étendue réelle du défaut et la teinte à reproduire.' },
      { title: 'Résultat mesuré', description: 'L’objectif est un raccord cohérent avec l’état général de la carrosserie.' },
    ],
    faq: [
      { question: 'Toutes les rayures peuvent-elles être reprises ?', answer: 'Une retouche convient aux défauts localisés. Une rayure très étendue ou profonde peut nécessiter une réfection plus large, évaluée lors du diagnostic.' },
      { question: 'Pourquoi la prestation est-elle sur devis ?', answer: 'L’étendue du défaut, la teinte du véhicule et le temps de travail varient fortement d’un cas à l’autre.' },
      { question: 'Le raccord sera-t-il invisible ?', answer: 'Un raccord au plus proche de la teinte d’origine est recherché, sans garantie d’un résultat totalement invisible selon l’exposition de la zone.' },
    ],
  },
  {
    slug: 'reparation-jantes-voiture',
    metaTitle: 'Réparation jantes voiture 77 | AR Protect',
    metaDescription:
      'Réparation de jantes automobiles en Seine-et-Marne : éclats, rayures et frottements sur jantes alliage. Prestation sur devis.',
    h1: 'Réparation de jantes automobile en Seine-et-Marne',
    eyebrow: 'Réparation jantes',
    summary:
      'Une réparation ciblée des jantes marquées par un frottement de trottoir, un éclat ou une rayure, après diagnostic de l’état de la jante.',
    price: 'Sur devis',
    intro: [
      "Un frottement contre un trottoir, un éclat sur l'arête ou des rayures superficielles marquent rapidement l'aspect d'une jante alliage. La réparation cible la zone endommagée selon l'état du support.",
      "Le tarif dépend de l'étendue des dommages, du nombre de jantes concernées et de la finition d'origine. Un devis est établi après inspection de chaque jante.",
    ],
    included: [
      'Inspection de l’état de chaque jante',
      'Ponçage et préparation de la zone endommagée',
      'Comblement des éclats lorsque nécessaire',
      'Application de la peinture ou finition adaptée',
      'Contrôle du raccord avec la jante environnante',
      'Conseils d’entretien après intervention',
    ],
    process: [
      { title: 'Diagnostic', description: 'Évaluation de l’étendue des dommages et de la finition d’origine de la jante.' },
      { title: 'Préparation', description: 'Ponçage et nettoyage de la zone endommagée avant réparation.' },
      { title: 'Réparation', description: 'Comblement des éclats et application de la finition adaptée.' },
      { title: 'Contrôle final', description: 'Vérification du raccord et de l’aspect général de la jante.' },
    ],
    benefits: [
      { title: 'Intervention ciblée', description: 'La réparation traite la zone endommagée sans nécessiter un remplacement de la jante.' },
      { title: 'Diagnostic avant devis', description: 'Le tarif est défini selon l’étendue réelle des dommages et le nombre de jantes concernées.' },
      { title: 'Résultat mesuré', description: 'L’objectif est un raccord cohérent avec la finition d’origine de la jante.' },
    ],
    faq: [
      { question: 'Toutes les jantes peuvent-elles être réparées ?', answer: 'Cela dépend de l’étendue et de la nature du dommage. Une jante fissurée ou déformée relève d’un contrôle mécanique et non d’une simple réparation esthétique.' },
      { question: 'Pourquoi la prestation est-elle sur devis ?', answer: 'L’étendue des dommages, le nombre de jantes concernées et la finition d’origine varient d’un véhicule à l’autre.' },
      { question: 'Le raccord de couleur sera-t-il parfait ?', answer: 'Un raccord au plus proche de la finition d’origine est recherché, sans garantie d’un résultat identique au neuf.' },
    ],
  },
  {
    slug: 'polissage-lustrage-voiture',
    metaTitle: 'Lustrage voiture 77 | AR Protect',
    metaDescription:
      'Lustrage automobile en Seine-et-Marne pour améliorer la brillance et atténuer les défauts légers de la carrosserie. Prestation sur devis.',
    h1: 'Lustrage automobile en Seine-et-Marne',
    eyebrow: 'Lustrage',
    summary:
      'Une prestation sur devis destinée à améliorer la brillance de la carrosserie et à atténuer certains défauts de surface après diagnostic du vernis.',
    price: 'Sur devis',
    intro: [
      "Le lavage retire les salissures, mais il ne corrige pas les défauts présents dans le vernis. Le lustrage intervient après une préparation complète afin d'atténuer les micro-rayures, traces circulaires et pertes de brillance compatibles avec l'épaisseur et l'état du vernis.",
      "Chaque carrosserie nécessite un diagnostic. Le type de peinture, la profondeur des défauts, le gabarit et le niveau de correction recherché déterminent le protocole et le devis.",
    ],
    included: [
      'Inspection visuelle de la carrosserie',
      'Lavage et préparation des surfaces',
      'Décontamination adaptée avant lustrage',
      'Choix du niveau de correction après diagnostic',
      'Lustrage des zones convenues',
      'Finition et recommandations d’entretien',
    ],
    process: [
      { title: 'Diagnostic du vernis', description: 'Analyse des défauts visibles et définition d’un objectif réaliste avant toute correction.' },
      { title: 'Préparation', description: 'Nettoyage et décontamination afin de travailler sur une surface correctement préparée.' },
      { title: 'Correction', description: 'Travail progressif des zones selon la dureté du vernis et la profondeur des défauts.' },
      { title: 'Finition', description: 'Contrôle sous éclairage et préparation de la surface à recevoir une protection adaptée.' },
    ],
    benefits: [
      { title: 'Diagnostic avant devis', description: 'Le prix et le résultat attendu sont définis selon l’état réel de la carrosserie.' },
      { title: 'Correction mesurée', description: 'Le protocole privilégie un résultat cohérent avec l’état et les limites du vernis.' },
      { title: 'Brillance améliorée', description: 'Le lustrage réduit l’aspect terne et met davantage en valeur la couleur du véhicule.' },
    ],
    faq: [
      { question: 'Toutes les rayures peuvent-elles être supprimées ?', answer: 'Non. Les rayures profondes qui traversent le vernis ne doivent pas être promises comme supprimables par un simple lustrage.' },
      { question: 'Pourquoi le tarif est-il sur devis ?', answer: 'Le gabarit, la peinture, le niveau de défauts et le temps de correction varient fortement d’un véhicule à l’autre.' },
      { question: 'Faut-il protéger la carrosserie après le lustrage ?', answer: 'Une protection est généralement recommandée après la correction afin de préserver plus facilement la finition obtenue.' },
    ],
  },
  {
    slug: 'renovation-phares-voiture',
    metaTitle: 'Correction optique de phares voiture 77 | AR Protect',
    metaDescription:
      'Correction optique de phares en Seine-et-Marne : ponçage et polissage des optiques ternis. 49 € l’unité ou 79 € la paire.',
    h1: 'Correction optique de phares en Seine-et-Marne',
    eyebrow: 'Correction optique de phare',
    summary:
      'Une rénovation ciblée des optiques ternis ou jaunis pour restaurer leur transparence et améliorer l’aspect de la face avant.',
    price: '49 € l’unité · 79 € la paire',
    intro: [
      "Sous l'effet des UV, des intempéries et de l'usure, les optiques en polycarbonate peuvent devenir ternes ou jaunir. Cette dégradation nuit à l'apparence du véhicule et peut réduire la qualité de diffusion de l'éclairage.",
      "La correction optique AR Protect combine ponçage progressif et polissage afin de retirer la couche oxydée et de restaurer la transparence dans la limite de l'état de l'optique.",
    ],
    included: [
      'Inspection de l’état des optiques',
      'Protection des éléments voisins',
      'Ponçage progressif de la couche oxydée',
      'Polissage des optiques',
      'Contrôle de la transparence',
      'Conseils pour préserver le résultat',
    ],
    process: [
      { title: 'Diagnostic', description: 'Vérification du jaunissement, de l’oxydation et de l’état général de chaque optique.' },
      { title: 'Préparation', description: 'Protection des zones adjacentes avant le travail de rénovation.' },
      { title: 'Ponçage progressif', description: 'Retrait maîtrisé de la couche altérée avec plusieurs niveaux de finition.' },
      { title: 'Polissage', description: 'Restauration de la transparence et contrôle final des deux optiques.' },
    ],
    benefits: [
      { title: 'Aspect plus net', description: 'La disparition de l’aspect jaune ou terne rajeunit visuellement la face avant.' },
      { title: 'Intervention ciblée', description: 'La prestation peut être réalisée à l’unité ou sur la paire selon les besoins.' },
      { title: 'Tarifs transparents', description: '49 € TTC pour un phare ou 79 € TTC pour la paire.' },
    ],
    faq: [
      { question: 'Quel est le prix de la correction optique de phares ?', answer: 'Le tarif est de 49 € TTC pour un phare et 79 € TTC pour la paire.' },
      { question: 'La correction répare-t-elle un phare fissuré ?', answer: 'Non. Elle traite l’oxydation et la surface ternie, mais ne répare pas un optique fissuré, cassé ou présentant un défaut interne.' },
      { question: 'Les deux phares doivent-ils être traités ensemble ?', answer: 'La prestation peut être réalisée à l’unité, mais traiter la paire permet souvent de conserver un aspect plus homogène.' },
    ],
  },
  {
    slug: 'destickage-voiture',
    metaTitle: 'Déstickage voiture 77 | AR Protect',
    metaDescription:
      'Déstickage automobile en Seine-et-Marne : retrait de stickers, lettrages et covering sans endommager la peinture. 39 € TTC par élément.',
    h1: 'Déstickage automobile en Seine-et-Marne',
    eyebrow: 'Déstickage',
    summary:
      'Un retrait méthodique de stickers, lettrages ou éléments de covering, avec une attention particulière portée à la surface sous-jacente.',
    price: '39 € TTC par élément (format type L1 H1)',
    intro: [
      "Autocollants publicitaires, lettrages professionnels ou anciens covering laissent souvent des traces de colle une fois arrachés sans méthode. Le déstickage AR Protect vise à retirer l'élément proprement tout en préservant la peinture sous-jacente.",
      "Le tarif s'applique par élément, pour un format standard de type L1 H1. Les éléments plus grands ou plus nombreux sont évalués lors du diagnostic.",
    ],
    included: [
      'Inspection de l’élément à retirer et du support',
      'Chauffe contrôlée pour faciliter le décollage',
      'Retrait progressif du sticker ou du covering',
      'Élimination des résidus de colle',
      'Contrôle de l’état de la surface après retrait',
      'Conseils pour la suite si une retouche est nécessaire',
    ],
    process: [
      { title: 'Diagnostic', description: 'Évaluation du type d’adhésif, de sa taille et de l’état du support avant intervention.' },
      { title: 'Décollage progressif', description: 'Retrait méthodique de l’élément à l’aide d’une chauffe contrôlée.' },
      { title: 'Retrait des résidus', description: 'Élimination des traces de colle restantes sans agresser la surface.' },
      { title: 'Contrôle final', description: 'Vérification de l’état de la surface une fois l’élément retiré.' },
    ],
    benefits: [
      { title: 'Méthode maîtrisée', description: 'Le retrait progressif limite le risque de marquer la peinture sous-jacente.' },
      { title: 'Tarif à l’élément', description: 'Le prix est fixé par élément de format type L1 H1, pour plus de transparence.' },
      { title: 'Adapté à plusieurs supports', description: 'Stickers, lettrages et éléments de covering peuvent être concernés selon leur état.' },
    ],
    faq: [
      { question: 'Le déstickage laisse-t-il des traces ?', answer: 'L’objectif est de retirer l’élément sans marquer la surface, mais le résultat dépend de l’ancienneté de l’adhésif et de l’état de la peinture en dessous.' },
      { question: 'Le tarif change-t-il selon la taille du sticker ?', answer: 'Le tarif de 39 € TTC correspond à un élément de format type L1 H1. Les formats plus grands sont évalués lors du diagnostic.' },
      { question: 'Peut-on repeindre la zone après déstickage ?', answer: 'Si la zone nécessite une reprise après retrait, une retouche peinture carrosserie peut être proposée séparément.' },
    ],
  },
  {
    slug: 'desiglage-voiture',
    metaTitle: 'Désiglage voiture 77 | AR Protect',
    metaDescription:
      'Désiglage automobile en Seine-et-Marne : retrait des emblèmes et logos sans endommager la carrosserie. 29 € TTC pour 1 emblème, 59 € pour 2 et plus.',
    h1: 'Désiglage automobile en Seine-et-Marne',
    eyebrow: 'Désiglage',
    summary:
      'Un retrait soigné des emblèmes et logos de carrosserie, avec traitement des points de fixation pour une surface nette.',
    price: '29 € TTC pour 1 emblème · 59 € TTC pour 2 emblèmes et plus',
    intro: [
      "Le désiglage consiste à retirer un ou plusieurs emblèmes de carrosserie pour un rendu plus épuré. Chaque logo est fixé différemment selon le modèle, ce qui demande une méthode adaptée pour éviter de marquer la peinture.",
      "AR Protect retire l'emblème, élimine les résidus de colle ou les points de fixation, puis contrôle l'état de la surface dégagée.",
    ],
    included: [
      'Inspection du mode de fixation de l’emblème',
      'Retrait méthodique du ou des emblèmes',
      'Élimination des résidus de colle',
      'Traitement des points de fixation apparents',
      'Contrôle de l’état de la surface après retrait',
      'Conseils pour une éventuelle retouche',
    ],
    process: [
      { title: 'Diagnostic', description: 'Identification du mode de fixation de chaque emblème avant intervention.' },
      { title: 'Retrait', description: 'Décollage méthodique du ou des emblèmes selon leur fixation.' },
      { title: 'Nettoyage', description: 'Élimination des résidus de colle et traitement des points de fixation.' },
      { title: 'Contrôle final', description: 'Vérification de l’état de la surface une fois les emblèmes retirés.' },
    ],
    benefits: [
      { title: 'Rendu épuré', description: 'Le retrait des emblèmes donne un aspect plus sobre à la carrosserie.' },
      { title: 'Méthode adaptée', description: 'Chaque emblème est traité selon son mode de fixation propre.' },
      { title: 'Tarif dégressif', description: '29 € TTC pour un emblème, 59 € TTC à partir de deux emblèmes retirés.' },
    ],
    faq: [
      { question: 'Le désiglage laisse-t-il des marques ?', answer: 'L’objectif est de ne pas marquer la peinture, mais certains points de fixation anciens peuvent nécessiter une retouche complémentaire, évaluée sur place.' },
      { question: 'Peut-on retirer plusieurs emblèmes en une fois ?', answer: 'Oui, le tarif passe à 59 € TTC à partir de deux emblèmes retirés lors de la même intervention.' },
      { question: 'Le désiglage est-il réversible ?', answer: 'Le retrait d’un emblème est définitif. Il est recommandé de bien confirmer son choix avant l’intervention.' },
    ],
  },
]

export const seoServiceSlugs = seoServices.map((service) => service.slug)

export function getSeoService(slug: string) {
  return seoServices.find((service) => service.slug === slug)
}
