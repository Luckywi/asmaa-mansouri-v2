import { Hero } from "@/components/sections/Hero";
import { Presentation } from "@/components/sections/Presentation";
import { Specialites } from "@/components/sections/Specialites";
import { Cabinet } from "@/components/sections/Cabinet";
import { Prestations } from "@/components/sections/Prestations";
import { Temoignages } from "@/components/sections/Temoignages";

export default function Home() {
  return (
    <main id="contenu-principal" className="flex-1">
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
