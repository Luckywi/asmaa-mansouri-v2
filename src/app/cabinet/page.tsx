import { Hero } from "@/components/sections/cabinet/Hero";
import { Carousel } from "@/components/sections/cabinet/Carousel";
import { Localisation } from "@/components/sections/cabinet/Localisation";
import { Acces } from "@/components/sections/cabinet/Acces";
import { Experiences } from "@/components/sections/cabinet/Experiences";
import { AllerPlusLoin } from "@/components/sections/cabinet/AllerPlusLoin";
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
  title: "Cabinet de naturopathie à Décines-Charpieu, Lyon Est",
  description:
    "48 rue Francisco Ferrer, 69150 Décines-Charpieu : tramway T3, parking, dix minutes de Lyon. Consultations en cabinet ou visio, du lundi au samedi.",
  path: "/cabinet",
  ogTitle: "Cabinet de naturopathie à Décines-Charpieu",
  ogDescription:
    "Cabinet de naturopathie à Décines-Charpieu, 48 rue Francisco Ferrer, directement accessible en tramway T3. Consultations en cabinet ou en visio.",
});

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
  const pageUrl = absUrl("/cabinet");
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: "Cabinet de naturopathie à Décines-Charpieu, Lyon Est",
      description:
        "48 rue Francisco Ferrer, 69150 Décines-Charpieu : tramway T3, parking, dix minutes de Lyon. Consultations en cabinet ou visio, du lundi au samedi.",
      about: BUSINESS_ID,
      mainEntity: BUSINESS_ID,
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildBreadcrumb([{ name: "Le cabinet", url: pageUrl }], pageUrl),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <Hero />
      <Carousel />
      <Localisation />
      <Acces />
      <Experiences />
      <AllerPlusLoin />
    </main>
  );
}
