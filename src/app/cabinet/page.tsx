import type { Metadata } from "next";
import { Hero } from "@/components/sections/cabinet/Hero";
import { Carousel } from "@/components/sections/cabinet/Carousel";
import { Localisation } from "@/components/sections/cabinet/Localisation";
import { Acces } from "@/components/sections/cabinet/Acces";
import { AllerPlusLoin } from "@/components/sections/cabinet/AllerPlusLoin";

// Metadata minimale Phase 1 — schema.org LocalBusiness + Open Graph
// viendront Phase 2 (cf. CLAUDE.md > SEO Phase 2).
export const metadata: Metadata = {
  title:
    "Mon cabinet — Asmaa Mansouri, naturopathe à Décines-Charpieu (69150)",
  description:
    "Cabinet de naturopathie, médecine traditionnelle chinoise et massage Tuina à Décines-Charpieu, à quelques minutes de Lyon. Consultations en cabinet ou en visio.",
  robots: { index: false, follow: false },
};

/**
 * /cabinet — page de présentation du lieu de consultation.
 *
 * Architecture :
 *   1. Hero       — H1 dynamique ("Mon cabinet de [spécialité] à
 *                    Décines-Charpieu") avec rotation du mot-clé en
 *                    couleur accent, adresse cliquable + 2 CTAs.
 *   2. Carousel   — marquee plein écran avec les photos du cabinet
 *                    (bord à bord, échappe le max-w container).
 *   3. Localisation — map MapLibre + paragraphe descriptif + adresse +
 *                    horaires d'ouverture + 3 CTAs (RDV / Itinéraire / Appel).
 *
 * Le wrapper <main id="contenu-principal" className="flex-1"> est
 * obligatoire pour le skip link (a href="#contenu-principal") et le
 * sticky footer pattern du layout.
 */
export default function CabinetPage() {
  return (
    <main id="contenu-principal" className="flex-1">
      <Hero />
      <Carousel />
      <Localisation />
      <Acces />
      <AllerPlusLoin />
    </main>
  );
}
