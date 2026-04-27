import { Hero } from "@/components/sections/Hero";
import { Presentation } from "@/components/sections/Presentation";
import { Specialites } from "@/components/sections/Specialites";
import { Cabinet } from "@/components/sections/Cabinet";
import { Prestations } from "@/components/sections/Prestations";
import { Temoignages } from "@/components/sections/Temoignages";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  BUSINESS_ID,
  buildGraph,
  buildWebPage,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Asmaa Mansouri, naturopathe santé féminine à Décines-Charpieu",
  description:
    "Naturopathe santé féminine à Décines-Charpieu : SOPK, hormones, digestion, burn-out. Cabinet à dix minutes de Lyon ou visio. Rendez-vous en ligne.",
  path: "/",
  ogTitle: "Asmaa Mansouri, naturopathe à Décines-Charpieu",
  ogDescription:
    "Accompagnement naturopathique pour femmes à Décines-Charpieu : hormones, digestion, burn-out. Cabinet à dix minutes de Lyon ou en visio.",
});

export default function Home() {
  const pageUrl = absUrl("/");
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: "Asmaa Mansouri, naturopathe santé féminine à Décines-Charpieu",
      description:
        "Naturopathe santé féminine à Décines-Charpieu : SOPK, hormones, digestion, burn-out. Cabinet à dix minutes de Lyon ou visio. Rendez-vous en ligne.",
      about: BUSINESS_ID,
      mainEntity: BUSINESS_ID,
    }),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      {/* Hero — section d'accueil (titre, sous-titre, CTA Resalib, LogoMark) */}
      <Hero />

      {/*
        Sections placeholders avec id pour que les anchor links du Header
        soient testables dès maintenant. Elles seront remplacées par les
        vraies sections (Presentation, CabinetBloc, ServicesGrid,
        Temoignages) au fil des prochaines étapes du plan.

        La hauteur min-h-screen sur chaque placeholder garantit que les
        anchors fonctionnent visuellement (sinon tout serait sur le même
        écran et le scroll-padding-top ne se voit pas).
      */}
      {/* Présentation — extrait "Qui suis-je" (photo + intro + CTA discovery) */}
      <Presentation />

      {/* Spécialités — 3 buckets macro (hormonal, stress, transitions) + CTA vers /specialites */}
      <Specialites />

      {/* Cabinet — adresse + map themée + CTAs Appeler / Itinéraire */}
      <Cabinet />

      {/* Prestations — selector master-detail (desktop) / accordion (mobile) */}
      <Prestations />

      {/* Témoignages — marquee vertical 2 colonnes (Marquee custom) + CTA Resalib */}
      <Temoignages />
    </main>
  );
}
