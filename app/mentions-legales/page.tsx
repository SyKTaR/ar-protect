import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mentions Légales — AR Protect',
  description: 'Mentions légales du site AR Protect.',
}

const sections = [
  {
    id: 1,
    title: 'Éditeur du site',
    content: (
      <div className="space-y-2 text-white/65 text-sm leading-relaxed">
        <p><strong className="text-white/90">AR PROTECT</strong> — Entreprise spécialisée dans l&apos;entretien esthétique automobile et la vente d&apos;accessoires et produits d&apos;entretien.</p>
        <ul className="mt-3 space-y-1.5">
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Forme juridique</span> Auto-entrepreneur</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Siège social</span> 1 rue Georges Méliès, Chevry-Cossigny 77173 — France</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">SIRET</span> 92891664200020</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">TVA</span> Non applicable — article 293 B du Code Général des Impôts (CGI)</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Responsable</span> Thomas FOURNIER</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">E-mail</span> <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Téléphone</span> <a href="tel:+33636230807" className="hover:text-white transition-colors">06.36.23.08.07</a></li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Hébergeur du site',
    content: (
      <div className="space-y-2 text-white/65 text-sm leading-relaxed">
        <p>Le site <strong className="text-white/90">www.arprotect.fr</strong> est hébergé par :</p>
        <ul className="mt-3 space-y-1.5">
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Hébergeur</span> Vercel Inc.</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Adresse</span> 340 Pine Street, Suite 701, San Francisco, CA 94104 — États-Unis</li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Site</span> www.vercel.com</li>
        </ul>
        <p className="mt-3 text-white/40 text-xs italic">
          Les données des utilisateurs européens sont traitées conformément au RGPD. Vercel dispose de garanties contractuelles équivalentes pour les transferts hors UE.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Conception et réalisation du site',
    content: (
      <div className="space-y-2 text-white/65 text-sm leading-relaxed">
        <p>Site conçu et développé par <strong className="text-white/90">AR PROTECT</strong>.</p>
        <ul className="mt-3 space-y-1.5">
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">E-mail</span> <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></li>
          <li><span className="text-white/40 uppercase text-xs tracking-widest mr-2">Site</span> www.arprotect.fr</li>
        </ul>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Activité de l\'entreprise',
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p className="mb-3">AR PROTECT exerce les activités suivantes :</p>
        <ul className="space-y-2">
          {[
            'Nettoyage automobile intérieur / extérieur',
            'Rénovation de phares',
            'Lustrage et protection carrosserie',
            'Pose de pièces et accessoires',
            'Vente de produits d\'entretien et accessoires via la boutique en ligne',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4">Les prestations sont réalisées sur rendez-vous et selon les conditions précisées dans les <Link href="/conditions-generales-utilisation" className="text-ar-red hover:underline">CGV/CGU</Link> du site.</p>
      </div>
    ),
  },
  {
    id: 5,
    title: "Conditions d'utilisation du site",
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>L&apos;accès et l&apos;utilisation du site impliquent l&apos;acceptation pleine et entière des <Link href="/conditions-generales-utilisation" className="text-ar-red hover:underline">Conditions Générales d&apos;Utilisation (CGU)</Link> disponibles sur le site.</p>
        <p>L&apos;utilisateur s&apos;engage à utiliser le site de manière conforme aux lois en vigueur et à ne pas porter atteinte à son intégrité ou à celle de son contenu.</p>
        <p>AR PROTECT se réserve le droit de modifier à tout moment le contenu du site, les prestations proposées ou les présentes mentions légales, sans préavis.</p>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Propriété intellectuelle',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>L&apos;ensemble des éléments du site (textes, logos, charte graphique, photographies, vidéos, illustrations, icônes, structure, code source, etc.) est la propriété exclusive de <strong className="text-white/90">AR PROTECT</strong>, sauf indication contraire.</p>
        <p>Les images, vidéos ou ressources visuelles issues de banques d&apos;images libres de droits demeurent la propriété de leurs auteurs respectifs et sont utilisées conformément à leurs licences d&apos;utilisation.</p>
        <p>Toute reproduction, représentation, modification, diffusion ou exploitation totale ou partielle du contenu du site, sans autorisation écrite préalable de AR PROTECT, est strictement interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.</p>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Marques et logos',
    content: (
      <div className="text-white/65 text-sm leading-relaxed">
        <p>Les noms, logos et marques présents sur le site sont protégés. Toute utilisation, reproduction ou représentation, totale ou partielle, sans autorisation écrite de leurs titulaires respectifs est interdite.</p>
      </div>
    ),
  },
  {
    id: 8,
    title: 'Liens hypertextes',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Le site <strong className="text-white/90">www.arprotect.fr</strong> peut contenir des liens vers d&apos;autres sites. AR PROTECT n&apos;exerce aucun contrôle sur ces sites tiers et ne peut être tenue responsable de leur contenu, de leurs pratiques, ni des dommages pouvant résulter de leur consultation.</p>
        <p>Toute création d&apos;un lien hypertexte vers le site doit faire l&apos;objet d&apos;une autorisation préalable de AR PROTECT.</p>
      </div>
    ),
  },
  {
    id: 9,
    title: 'Responsabilité',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>AR PROTECT s&apos;efforce de fournir des informations à jour et exactes, mais ne saurait garantir l&apos;exactitude, la complétude ou l&apos;actualité des données.</p>
        <p>AR PROTECT ne pourra être tenue responsable :</p>
        <ul className="space-y-2 mt-2">
          {[
            'De tout dommage direct ou indirect résultant de l\'accès ou de l\'impossibilité d\'accéder au site',
            'D\'un mauvais usage du site ou de ses fonctionnalités',
            'D\'erreurs ou omissions dans les informations diffusées',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 bg-ar-red rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>AR PROTECT se réserve le droit de suspendre temporairement l&apos;accès au site pour maintenance, mise à jour ou toute autre raison technique.</p>
      </div>
    ),
  },
  {
    id: 10,
    title: 'Services et produits en ligne',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Les prestations et produits proposés sur le site sont détaillés dans les <Link href="/conditions-generales-utilisation" className="text-ar-red hover:underline">CGV/CGU</Link> consultables directement sur le site.</p>
        <p>Les descriptions et photos des produits n&apos;ont qu&apos;une valeur indicative. AR PROTECT ne saurait être tenue responsable des différences minimes entre les visuels et les produits livrés, ni des erreurs de stock indépendantes de sa volonté.</p>
      </div>
    ),
  },
  {
    id: 11,
    title: 'Données personnelles et RGPD',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>AR PROTECT respecte la réglementation française et européenne en matière de protection des données personnelles (RGPD).</p>
        <p>Les données collectées via le site sont destinées uniquement à AR PROTECT pour : traiter les demandes et devis, assurer la facturation et le suivi des commandes, et envoyer des informations commerciales si le client l&apos;a accepté. Elles ne sont ni revendues ni transmises à des tiers non autorisés.</p>
        <p>Chaque utilisateur dispose d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition et de portabilité exercé par e-mail à : <a href="mailto:arprotect77@gmail.com" className="text-ar-red hover:underline">arprotect77@gmail.com</a></p>
        <p>Pour plus de détails, consultez notre <Link href="/politique-de-confidentialite" className="text-ar-red hover:underline">Politique de Confidentialité</Link>.</p>
      </div>
    ),
  },
  {
    id: 12,
    title: 'Cookies',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Le site utilise des cookies afin d&apos;améliorer l&apos;expérience utilisateur et d&apos;analyser la fréquentation du site. L&apos;utilisateur peut à tout moment refuser, paramétrer ou supprimer les cookies via les paramètres de son navigateur.</p>
        <p>Des informations détaillées sont disponibles dans notre <Link href="/politique-de-confidentialite" className="text-ar-red hover:underline">Politique de Confidentialité</Link>.</p>
      </div>
    ),
  },
  {
    id: 13,
    title: 'Droit applicable et juridiction compétente',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut de solution amiable, compétence exclusive est attribuée aux tribunaux du ressort du siège social de AR PROTECT, sauf disposition légale contraire.</p>
      </div>
    ),
  },
  {
    id: 14,
    title: 'Crédits visuels',
    content: (
      <div className="text-white/65 text-sm leading-relaxed space-y-3">
        <p>Certaines images, vidéos ou icônes utilisées sur ce site proviennent de banques d&apos;images libres de droits :</p>
        <ul className="flex flex-wrap gap-3 mt-2">
          {['Unsplash', 'Pixabay', 'Pexels', 'Freepik'].map((source) => (
            <li key={source} className="px-3 py-1 border border-ar-border text-xs text-white/50">{source}</li>
          ))}
        </ul>
        <p>Elles sont utilisées conformément à leurs licences respectives. Les autres photographies et visuels sont la propriété exclusive de AR PROTECT.</p>
      </div>
    ),
  },
  {
    id: 15,
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

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main className="bg-ar-black min-h-screen pt-32 pb-24">
        {/* Hero */}
        <div className="border-b border-ar-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <p className="text-ar-red text-xs uppercase tracking-widest font-semibold mb-4">Informations légales</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white">Mentions Légales</h1>
            <p className="mt-4 text-white/40 text-sm">Dernière mise à jour : mars 2026</p>
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
