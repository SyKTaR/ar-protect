import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — AR Protect',
  description: 'Politique de confidentialité et de traitement des données personnelles du site AR Protect.',
}

const retentionData = [
  { type: 'Données de contact / devis', duration: '3 ans après le dernier contact' },
  { type: 'Données de commande', duration: '10 ans (obligation légale comptable)' },
  { type: 'Données de facturation', duration: '10 ans' },
  { type: 'Données de navigation (cookies)', duration: '13 mois maximum' },
  { type: 'Données newsletter', duration: "Jusqu'à désinscription de l'utilisateur" },
]

const sections = [
  {
    id: 1,
    title: 'Identité du responsable du traitement',
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p className="mb-3"><strong className="text-white/90">AR PROTECT</strong> — Entreprise spécialisée dans l&apos;entretien esthétique automobile et la vente d&apos;accessoires et produits d&apos;entretien.</p>
        <ul className="space-y-1.5">
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Forme juridique</span> Auto-entrepreneur</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Siège social</span> 1 rue Georges Méliès, Chevry-Cossigny 77173 — France</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">SIRET</span> 92891664200020</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Responsable</span> Thomas FOURNIER</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">E-mail</span> <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Téléphone</span> <a href="tel:+33636230807" className="hover:text-white transition-colors">06.36.23.08.07</a></li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Données personnelles collectées',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-4">
        <p>AR PROTECT collecte uniquement les données strictement nécessaires à la gestion de son activité et à la bonne exécution de ses services.</p>

        <div>
          <p className="text-white/80 font-semibold mb-2">Lors de la navigation sur le site</p>
          <p>Adresse IP, type de navigateur, pages visitées, durée de la visite (via les cookies et outils statistiques).</p>
        </div>

        <div>
          <p className="text-white/80 font-semibold mb-2">Lors d&apos;une demande de contact ou de devis</p>
          <ul className="space-y-1">
            {['Nom et prénom', 'Adresse e-mail', 'Numéro de téléphone', 'Informations concernant le véhicule ou la demande spécifique', 'Message libre'].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/80 font-semibold mb-2">Lors d&apos;une commande sur la boutique en ligne</p>
          <ul className="space-y-1">
            {['Nom et prénom', 'Adresse postale (livraison et facturation)', 'Adresse e-mail', 'Numéro de téléphone', 'Détails de la commande', 'Informations de paiement (traitées uniquement par les prestataires de paiement sécurisés)'].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/80 font-semibold mb-2">Lors d&apos;une inscription à la newsletter</p>
          <p>Adresse e-mail uniquement.</p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Finalités du traitement',
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p className="mb-3">Les données collectées par AR PROTECT sont utilisées exclusivement pour :</p>
        <ul className="space-y-2">
          {[
            'Gérer les demandes de devis, de contact ou d\'informations',
            'Gérer les commandes, livraisons et facturations',
            'Améliorer les prestations et le service client',
            'Envoyer, avec le consentement de l\'utilisateur, des offres commerciales ou informations promotionnelles',
            'Assurer la sécurité du site et prévenir la fraude',
            'Respecter les obligations légales et comptables',
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
    id: 4,
    title: 'Base légale du traitement',
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p className="mb-3">Le traitement des données personnelles repose sur plusieurs fondements juridiques :</p>
        <ul className="space-y-2">
          {[
            'L\'exécution d\'un contrat ou de mesures précontractuelles (commande, devis, contact client)',
            'Le consentement explicite de l\'utilisateur (formulaires, cookies, newsletter)',
            'L\'intérêt légitime de AR PROTECT (sécurisation du site, prévention de la fraude, amélioration du service)',
            'Le respect d\'obligations légales (facturation, comptabilité, garanties légales)',
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
    id: 5,
    title: 'Destinataires des données',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Les données collectées sont destinées exclusivement à AR PROTECT. Elles peuvent être transmises à des prestataires techniques ou partenaires de confiance lorsque cela est nécessaire à l&apos;exécution d&apos;un service, notamment :</p>
        <ul className="space-y-2">
          {[
            'Hébergeur du site',
            'Plateforme de paiement en ligne (ex : Stripe, PayPal)',
            'Transporteurs et services de livraison (ex : Colissimo, Mondial Relay)',
            'Outils de statistiques (ex : Google Analytics)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>Ces prestataires sont soumis à des obligations strictes de confidentialité et de sécurité des données.</p>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Durée de conservation des données',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-4">
        <p>AR PROTECT conserve les données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :</p>
        <div className="border border-ar-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-ar-border bg-ar-anthracite">
                <th className="px-4 py-3 text-left text-white/60 uppercase tracking-wider font-semibold">Type de données</th>
                <th className="px-4 py-3 text-left text-white/60 uppercase tracking-wider font-semibold">Durée de conservation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ar-border">
              {retentionData.map((row) => (
                <tr key={row.type} className="hover:bg-ar-anthracite/50 transition-colors">
                  <td className="px-4 py-3 text-white/70">{row.type}</td>
                  <td className="px-4 py-3 text-white/50">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/40 text-xs">Au-delà de ces délais, les données sont supprimées ou anonymisées.</p>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Droits des utilisateurs',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Conformément au RGPD, tout utilisateur dispose des droits suivants sur ses données personnelles :</p>
        <ul className="space-y-2">
          {[
            { label: 'Droit d\'accès', desc: 'obtenir la confirmation que ses données sont traitées et en recevoir une copie.' },
            { label: 'Droit de rectification', desc: 'corriger ou compléter ses données inexactes.' },
            { label: 'Droit à l\'effacement', desc: 'demander la suppression de ses données (sous certaines conditions légales).' },
            { label: 'Droit à la limitation du traitement', desc: 'suspendre temporairement l\'utilisation des données.' },
            { label: 'Droit à la portabilité', desc: 'récupérer ses données dans un format structuré pour transmission à un autre responsable de traitement.' },
            { label: 'Droit d\'opposition', desc: 's\'opposer au traitement de ses données à des fins de prospection commerciale.' },
          ].map((item) => (
            <li key={item.label} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              <span><strong className="text-white/80">{item.label}</strong> : {item.desc}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 p-4 border border-ar-border bg-ar-anthracite/50">
          <p className="text-white/80 font-semibold text-xs uppercase tracking-widest mb-2">Pour exercer vos droits</p>
          <p>Par e-mail : <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></p>
          <p>Par courrier : AR PROTECT — 1 rue Georges Méliès, Chevry-Cossigny 77173 - France</p>
          <p className="mt-2 text-white/40 text-xs">Une réponse sera apportée dans un délai maximum de 30 jours.</p>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: 'Sécurité des données',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>AR PROTECT met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité, la confidentialité et l&apos;intégrité des données personnelles collectées.</p>
        <p>Ces mesures incluent notamment :</p>
        <ul className="space-y-2">
          {[
            'L\'accès restreint aux données (uniquement par le gérant ou les prestataires autorisés)',
            'La protection des systèmes informatiques par mot de passe et antivirus',
            'Le chiffrement des paiements via des prestataires certifiés (SSL/HTTPS)',
            'La sauvegarde régulière des données',
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
    id: 9,
    title: 'Cookies et traceurs',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Le site <strong className="text-white/90">www.arprotect.fr</strong> utilise des cookies afin d&apos;améliorer la navigation et d&apos;analyser la fréquentation du site.</p>
        <p>Les cookies peuvent servir à :</p>
        <ul className="space-y-2 mb-3">
          {[
            'Mémoriser les préférences utilisateur',
            'Établir des statistiques anonymes de visite (via Google Analytics ou outils similaires)',
            'Permettre le bon fonctionnement du panier et de la boutique en ligne',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>L&apos;utilisateur peut à tout moment accepter ou refuser les cookies via la bannière de consentement affichée lors de sa première visite, paramétrer son navigateur pour les refuser, ou les supprimer depuis les paramètres du navigateur.</p>
        <p className="text-white/40 text-xs">Le refus de certains cookies peut limiter certaines fonctionnalités du site (ex. : panier, compte client).</p>
      </div>
    ),
  },
  {
    id: 10,
    title: "Transfert des données hors de l'Union européenne",
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>En principe, AR PROTECT ne transfère pas de données personnelles en dehors de l&apos;Union européenne.</p>
        <p>Cependant, certains prestataires (ex. Google, Stripe, PayPal) peuvent héberger leurs serveurs dans des pays tiers. Dans ce cas, AR PROTECT s&apos;assure que ces prestataires offrent un niveau de protection équivalent au RGPD (clauses contractuelles types ou certification Privacy Shield lorsque applicable).</p>
      </div>
    ),
  },
  {
    id: 11,
    title: 'Sous-traitance',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-4">
        <div>
          <p className="text-white/80 font-semibold mb-2">Sous-traitance technique (liée au site internet)</p>
          <p>Pour le bon fonctionnement du site et de la boutique en ligne, AR PROTECT peut confier certaines opérations à des prestataires spécialisés (hébergeur, développeur web, maintenance technique, solutions de paiement, etc.). Ces sous-traitants agissent uniquement sur instruction de AR PROTECT et sont tenus aux mêmes obligations de sécurité et de confidentialité.</p>
        </div>
        <div>
          <p className="text-white/80 font-semibold mb-2">Sous-traitance de prestations de services</p>
          <p>Dans certains cas, AR PROTECT peut confier la réalisation de certaines prestations automobiles (ex. nettoyage, lustrage, rénovation de phares) à des professionnels partenaires. Ces partenaires s&apos;engagent à respecter les standards de qualité, de confidentialité et d&apos;exécution définis par AR PROTECT.</p>
          <p className="mt-2">Le client sera informé de la sous-traitance éventuelle lorsque cela est nécessaire, sans que cela ne modifie les obligations contractuelles de AR PROTECT, qui demeure l&apos;unique responsable vis-à-vis du client.</p>
        </div>
      </div>
    ),
  },
  {
    id: 12,
    title: 'Réclamations',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Si l&apos;utilisateur estime que ses droits ne sont pas respectés, il peut adresser une réclamation directement à AR PROTECT via <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a>.</p>
        <p>En cas de désaccord persistant, il dispose également du droit d&apos;introduire une réclamation auprès de l&apos;autorité de contrôle compétente :</p>
        <div className="p-4 border border-ar-border bg-ar-anthracite/50">
          <p className="text-white/80 font-semibold">CNIL — Commission Nationale de l&apos;Informatique et des Libertés</p>
          <p>3 Place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07</p>
          <p>Site : <span className="text-ar-red">www.cnil.fr</span></p>
        </div>
      </div>
    ),
  },
  {
    id: 13,
    title: 'Modification de la politique de confidentialité',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>AR PROTECT se réserve le droit de modifier à tout moment la présente politique afin de l&apos;adapter aux évolutions légales, techniques ou organisationnelles.</p>
        <p>La version en vigueur est celle publiée sur le site à la date de consultation.</p>
      </div>
    ),
  },
  {
    id: 14,
    title: 'Contact',
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p className="mb-3">Pour toute question relative à la protection de vos données :</p>
        <ul className="space-y-1.5">
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Adresse</span> 1 rue Georges Méliès, Chevry-Cossigny 77173 — France</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Téléphone</span> <a href="tel:+33636230807" className="hover:text-white transition-colors">06.36.23.08.07</a></li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">E-mail</span> <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></li>
        </ul>
      </div>
    ),
  },
]

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Header />
      <main className="bg-ar-black min-h-screen pt-32 pb-24">
        {/* Hero */}
        <div className="border-b border-ar-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <p className="text-ar-red text-xs uppercase tracking-widest font-semibold mb-4">Protection des données</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white">Politique de Confidentialité</h1>
            <p className="mt-4 text-white/40 text-sm max-w-2xl">
              Cette politique a pour objectif de vous informer sur la manière dont AR PROTECT collecte, traite et protège vos données personnelles, conformément au RGPD.
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
