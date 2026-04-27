import { ContactHero } from "@/components/sections/contact/Hero";
import { FormulaireEtCoordonnees } from "@/components/sections/contact/FormulaireEtCoordonnees";
import { ContactLocalisation } from "@/components/sections/contact/Localisation";
import { AllerPlusLoin } from "@/components/sections/contact/AllerPlusLoin";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  BUSINESS_ID,
  buildBreadcrumb,
  buildGraph,
  buildWebPage,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact et prise de rendez-vous, naturopathe Décines",
  description:
    "Téléphone, email, formulaire et prise de rendez-vous en ligne sur Resalib. Cabinet 48 rue Francisco Ferrer, 69150 Décines-Charpieu, accès tramway T3.",
  path: "/contact",
  ogTitle: "Me contacter et prendre rendez-vous",
  ogDescription:
    "Contacter le cabinet de naturopathie à Décines-Charpieu : téléphone, email, formulaire ou rendez-vous en ligne Resalib.",
});

/**
 * `/contact` — page dédiée à tous les canaux de prise de contact.
 *
 * Architecture :
 *   1. Hero — H1 "Prendre contact" + intro + 3 CTAs rapides
 *      (Instagram, tel, RDV Resalib).
 *   2. Formulaire + coordonnées — form d'envoi (POST /api/contact → Resend)
 *      à gauche, carte coordonnées directes à droite (tel cabinet, email,
 *      Instagram, tel ateliers).
 *   3. Localisation — map du cabinet + adresse + horaires + CTAs.
 *
 * Le wrapper <main id="contenu-principal" className="flex-1"> est
 * obligatoire pour le skip link et le sticky footer pattern du layout.
 */
export default function ContactPage() {
  const pageUrl = absUrl("/contact");
  const jsonLd = buildGraph([
    buildWebPage({
      type: "ContactPage",
      url: pageUrl,
      name: "Contact et prise de rendez-vous, naturopathe Décines",
      description:
        "Téléphone, email, formulaire et prise de rendez-vous en ligne sur Resalib. Cabinet 48 rue Francisco Ferrer, 69150 Décines-Charpieu, accès tramway T3.",
      about: BUSINESS_ID,
      mainEntity: BUSINESS_ID,
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildBreadcrumb([{ name: "Contact", url: pageUrl }], pageUrl),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <ContactHero />
      <FormulaireEtCoordonnees />
      <ContactLocalisation />
      <AllerPlusLoin />
    </main>
  );
}
