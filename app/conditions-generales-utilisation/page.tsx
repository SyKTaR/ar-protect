import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — AR Protect",
  description: "Conditions générales d'utilisation, de vente et de prestations de services du site AR Protect.",
}

const sections = [
  {
    id: 1,
    title: "Présentation de l'entreprise",
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p className="mb-3"><strong className="text-white/90">AR PROTECT</strong> — Entreprise spécialisée dans l&apos;entretien esthétique automobile et la vente d&apos;accessoires et produits d&apos;entretiens.</p>
        <ul className="space-y-1.5">
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Siège social</span> 1 rue Georges Méliès, Chevry-Cossigny 77173 — France</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">SIRET</span> 92891664200020</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Téléphone</span> <a href="tel:+33636230807" className="hover:text-white transition-colors">06.36.23.08.07</a></li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">E-mail</span> <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Responsable légal</span> Thomas FOURNIER</li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Objet des présentes conditions',
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p className="mb-3">Les présentes conditions ont pour objet de :</p>
        <ul className="space-y-2">
          {[
            'Définir les modalités d\'accès et d\'utilisation du site www.arprotect.fr',
            'Encadrer les conditions de réservation et d\'exécution des prestations de services',
            'Régir les ventes réalisées sur la boutique en ligne du site AR PROTECT',
            'Déterminer les droits et obligations de AR PROTECT et de ses clients particuliers ou professionnels',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Prestations proposées',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-4">
        <p>AR PROTECT propose des services de soins automobiles haut de gamme :</p>

        {[
          {
            title: 'Nettoyage automobile intérieur et extérieur',
            items: [
              'Lavage à la main, séchage microfibre, nettoyage jantes, dressing pneus, etc.',
              'Aspiration complète, shampoing des sièges, soin des plastiques et désinfection',
            ],
          },
          {
            title: 'Rénovation de phares',
            items: ['Ponçage, polissage et application d\'un vernis protecteur anti-UV'],
          },
          {
            title: 'Lustrage et protection',
            items: ['Décontamination, correction des micro-rayures, lustrage complet et application de cires ou traitements céramiques'],
          },
          {
            title: 'Pièces & accessoires',
            items: ['Pose d\'éléments décoratifs ou utiles sur le véhicule (système Carplay, LED, etc.)'],
          },
        ].map((service) => (
          <div key={service.title} className="border-l-2 border-ar-border pl-4">
            <p className="text-white/80 font-semibold mb-1">{service.title}</p>
            {service.items.map((item) => (
              <p key={item} className="text-white/55 text-xs">{item}</p>
            ))}
          </div>
        ))}

        <div className="border-l-2 border-ar-border pl-4">
          <p className="text-white/80 font-semibold mb-1">Boutique en ligne</p>
          <p className="text-white/55 text-xs">Produits d&apos;entretien automobile (microfibres, cires, nettoyants, parfums, etc.) et accessoires de nettoyage.</p>
          <p className="text-white/40 text-xs mt-1">Les produits présentés sur le site sont décrits avec le plus grand soin. Les photographies n&apos;ont qu&apos;une valeur indicative.</p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Tarifs et devis',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-4">
        <p>Les prix affichés sur le site sont exprimés en euros TTC (toutes taxes comprises). Ils peuvent varier selon la nature de la prestation, le type de véhicule ou les produits choisis.</p>

        <div>
          <p className="text-white/80 font-semibold mb-2">Prestations de services</p>
          <p className="mb-2">Un devis personnalisé peut être établi avant intervention. Ce devis détaille :</p>
          <ul className="space-y-1">
            {['Les prestations convenues', 'Le prix total TTC', 'Les éventuels frais de déplacement ou suppléments', 'Les conditions et délais d\'exécution'].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-white/45 text-xs">Le devis est valable 30 jours dès l&apos;émission. Toute validation de devis vaut acceptation des présentes conditions.</p>
        </div>

        <div>
          <p className="text-white/80 font-semibold mb-2">Boutique en ligne</p>
          <p>Les prix des produits sont ceux affichés au moment de la commande, hors frais de livraison éventuels.</p>
        </div>

        <p className="text-white/40 text-xs">AR PROTECT se réserve le droit de modifier ses prix à tout moment, sans préavis, tout en garantissant le tarif en vigueur au moment de la validation.</p>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Commandes et paiement',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-5">
        <div>
          <p className="text-white/80 font-semibold mb-2">5.1 — Commande de prestations</p>
          <p className="mb-2">Les réservations se font :</p>
          <ul className="space-y-1">
            {['Par téléphone', 'Par e-mail', 'Via le site internet (formulaire de contact ou module de réservation)'].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-white/45 text-xs">La réservation devient définitive à réception de la confirmation écrite de AR PROTECT.</p>
        </div>

        <div>
          <p className="text-white/80 font-semibold mb-2">5.2 — Commande de produits</p>
          <p>Le client ajoute les produits à son panier et valide sa commande après vérification. Le paiement valide la commande et entraîne acceptation totale des présentes conditions.</p>
        </div>

        <div>
          <p className="text-white/80 font-semibold mb-2">5.3 — Moyens de paiement</p>
          <ul className="space-y-1">
            {[
              'Espèces et carte bancaire pour les particuliers (prestations physiques)',
              'Virement pour les professionnels (prestations physiques)',
              'Carte bancaire ou autre moyen sécurisé sur la boutique en ligne (Stripe, PayPal, etc.)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-white/45 text-xs">Les paiements sont entièrement sécurisés. La commande ne sera expédiée qu&apos;après encaissement intégral du montant dû.</p>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Livraison pour la boutique en ligne',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Les produits commandés sur le site sont livrés à l&apos;adresse indiquée par le client, dans un délai de 2 à 7 jours ouvrés, selon la destination et le transporteur. Les frais et délais de livraison sont précisés avant la validation finale de la commande.</p>
        <div className="p-4 border border-ar-border bg-ar-anthracite/50">
          <p className="text-white/80 font-semibold text-xs uppercase tracking-widest mb-2">Retards ou pertes</p>
          <p>En cas de retard ou perte du colis, AR PROTECT assiste le client dans les démarches auprès du transporteur. Cependant, AR PROTECT ne saurait être tenue responsable des retards indépendants de sa volonté (grève, conditions météo, etc.).</p>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Droit de rétractation',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-4">
        <div>
          <p className="text-white/80 font-semibold mb-2">Prestations de service</p>
          <p>Conformément à l&apos;article L221-18 du Code de la Consommation, le client dispose d&apos;un délai de rétractation de <strong className="text-white/80">14 jours</strong> à compter de la signature du devis, sauf si :</p>
          <ul className="mt-2 space-y-1">
            {[
              'La prestation a déjà été réalisée avant la fin du délai, avec son accord express',
              'Il s\'agit d\'une intervention urgente demandée par le client',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/80 font-semibold mb-2">Produits de la boutique</p>
          <p>Le client dispose d&apos;un droit de rétractation de <strong className="text-white/80">14 jours</strong> à compter de la réception du produit. Les produits doivent être retournés neufs, non utilisés et dans leur emballage d&apos;origine.</p>
          <p className="mt-2">Les frais de retour sont à la charge du client, sauf erreur de préparation imputable à AR PROTECT. Un remboursement ou un avoir sera proposé dès réception et vérification du produit retourné.</p>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: 'Garanties légales',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Tous les produits vendus bénéficient :</p>
        <ul className="space-y-2">
          {[
            'De la garantie légale de conformité (articles L217-4 à L217-14 du Code de la consommation)',
            'De la garantie contre les vices cachés (articles 1641 et suivants du Code civil)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>Si un produit est défectueux, AR PROTECT s&apos;engage à le remplacer ou le rembourser après examen, selon la situation.</p>
      </div>
    ),
  },
  {
    id: 9,
    title: 'Obligations du client',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Le client s&apos;engage à :</p>
        <ul className="space-y-2">
          {[
            'Fournir l\'accès complet au véhicule',
            'Retirer ses effets personnels avant l\'intervention',
            'Mettre à disposition une prise d\'eau et/ou de courant si nécessaire pour les interventions à domicile',
            'Signaler tout dommage, défaut ou élément sensible du véhicule',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-white/40 text-xs">En cas de non-respect, AR PROTECT peut refuser ou reporter la prestation sans indemnité.</p>
      </div>
    ),
  },
  {
    id: 10,
    title: 'Responsabilité et limites',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>AR PROTECT réalise toutes ses prestations avec soin et professionnalisme. Cependant, la société ne saurait garantir :</p>
        <ul className="space-y-2">
          {[
            'La disparition totale de certaines rayures, taches, oxydations profondes ou défauts de vernis',
            'Un résultat identique à un véhicule neuf',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>La responsabilité de AR PROTECT ne peut être engagée :</p>
        <ul className="space-y-2">
          {[
            'En cas de dommage antérieur sur le véhicule',
            'En cas d\'usure normale, faute du client ou mauvaise utilisation ultérieure',
            'En cas de force majeure ou incident indépendant de sa volonté (intempérie, panne, etc.)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 11,
    title: 'Réclamations et service client',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Toute réclamation concernant une prestation ou un produit doit être adressée :</p>
        <ul className="space-y-1.5">
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">E-mail</span> <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Courrier</span> 1 rue Georges Méliès, Chevry-Cossigny 77173 — France</li>
        </ul>
        <p className="text-white/45 text-xs">Les réclamations doivent être formulées dans les <strong className="text-white/70">48 heures</strong> suivant la prestation ou la réception du produit.</p>
        <p>AR PROTECT s&apos;engage à traiter toute demande dans les plus brefs délais et à privilégier une résolution amiable.</p>
      </div>
    ),
  },
  {
    id: 12,
    title: 'Données personnelles et cookies',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>AR PROTECT collecte des données personnelles uniquement dans le cadre de la gestion des devis et commandes, de la facturation, et du suivi client. Les données sont traitées conformément au RGPD.</p>
        <p>L&apos;utilisateur peut exercer à tout moment ses droits d&apos;accès, de rectification et de suppression en écrivant à : <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></p>
        <p>Pour plus d&apos;informations, consultez notre <Link href="/politique-de-confidentialite" className="text-ar-red hover:underline">Politique de Confidentialité</Link>.</p>
      </div>
    ),
  },
  {
    id: 13,
    title: 'Propriété intellectuelle',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>L&apos;ensemble des éléments du site (textes, logos, charte graphique, photographies, vidéos, contenus et structure) est la propriété exclusive de AR PROTECT.</p>
        <p>Les images, vidéos ou ressources visuelles issues de banques d&apos;images libres de droits demeurent la propriété de leurs auteurs respectifs et sont utilisées conformément à leurs licences d&apos;utilisation.</p>
        <p>Toute reproduction, représentation, modification, diffusion ou exploitation non autorisée du contenu du site est strictement interdite et pourra donner lieu à des poursuites.</p>
      </div>
    ),
  },
  {
    id: 14,
    title: 'Modification des conditions',
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p>AR PROTECT se réserve le droit de modifier à tout moment les présentes conditions afin de les adapter aux évolutions légales, techniques ou commerciales. Les conditions applicables sont celles en vigueur à la date de la commande.</p>
      </div>
    ),
  },
  {
    id: 15,
    title: 'Droit applicable et juridiction',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-2">
        <p>Les présentes conditions sont régies par le droit français.</p>
        <p>Tout litige sera soumis aux tribunaux compétents du ressort du siège social de AR PROTECT, sauf disposition légale impérative contraire.</p>
      </div>
    ),
  },
  {
    id: 16,
    title: 'Contact',
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p className="mb-3">Pour toute question, réclamation ou demande d&apos;information :</p>
        <ul className="space-y-1.5">
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Adresse</span> 1 rue Georges Méliès, Chevry-Cossigny 77173 — France</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Téléphone</span> <a href="tel:+33636230807" className="hover:text-white transition-colors">06.36.23.08.07</a></li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">E-mail</span> <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></li>
        </ul>
      </div>
    ),
  },
]

export default function CGUPage() {
  return (
    <>
      <Header />
      <main className="bg-ar-black min-h-screen pt-32 pb-24">
        {/* Hero */}
        <div className="border-b border-ar-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <p className="text-ar-red text-xs uppercase tracking-widest font-semibold mb-4">Conditions d&apos;utilisation</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white">CGU / CGV</h1>
            <p className="mt-4 text-white/40 text-sm max-w-2xl">
              Conditions Générales d&apos;Utilisation, de Vente et de Prestations de Services. En accédant à ce site ou en achetant un produit / service, vous acceptez les présentes conditions.
            </p>
            <p className="mt-2 text-white/30 text-sm">Dernière mise à jour : mars 2026</p>
          </div>
        </div>

        {/* Sections */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-0 divide-y divide-ar-border">
          {sections.map((section) => (
            <div key={section.id} className="py-8 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
              <div className="flex items-start gap-3">
                <span className="text-ar-red font-mono text-xs font-bold mt-0.5 tabular-nums w-5 flex-shrink-0">
                  {String(section.id).padStart(2, '0')}
                </span>
                <h2 className="text-white font-semibold text-sm leading-snug">{section.title}</h2>
              </div>
              <div>{section.content}</div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest hover:text-white transition-colors"
          >
            <span>←</span> Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
