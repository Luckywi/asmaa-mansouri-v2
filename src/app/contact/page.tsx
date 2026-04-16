import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/Hero";
import { FormulaireEtCoordonnees } from "@/components/sections/contact/FormulaireEtCoordonnees";
import { ContactLocalisation } from "@/components/sections/contact/Localisation";
import { AllerPlusLoin } from "@/components/sections/contact/AllerPlusLoin";

// Metadata minimale Phase 1. Le SEO technique (Open Graph, schema.org
// ContactPage / PostalAddress / LocalBusiness, canonical) viendra
// Phase 2 avec le reste du site.
export const metadata: Metadata = {
  title: "Contact — Asmaa Mansouri, naturopathe à Décines-Charpieu",
  description:
    "Prendre rendez-vous avec Asmaa Mansouri, naturopathe à Décines-Charpieu. Téléphone, email, Instagram, formulaire de contact, adresse du cabinet et horaires.",
  robots: { index: false, follow: false },
};

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
  return (
    <main id="contenu-principal" className="flex-1">
      <ContactHero />
      <FormulaireEtCoordonnees />
      <ContactLocalisation />
      <AllerPlusLoin />
    </main>
  );
}
