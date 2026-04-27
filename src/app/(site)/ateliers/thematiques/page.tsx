import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ThematiquesHero } from "@/components/sections/ateliers/ThematiquesHero";
import { AteliersThematiques } from "@/components/sections/ateliers/Thematiques";
import { AteliersOrganiser } from "@/components/sections/ateliers/Organiser";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  buildBreadcrumb,
  buildGraph,
  buildItemList,
  buildWebPage,
} from "@/lib/schema";
import { thematiques } from "@/data/atelier-thematiques";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Thématiques des ateliers naturopathie, Décines",
  description:
    "Quatre thématiques d'ateliers bien-être : cosmétiques maison, fermentation, alimentation hormonale, diététique saisonnière. Programme à Décines-Charpieu.",
  path: "/ateliers/thematiques",
  ogTitle: "Thématiques des ateliers bien-être",
  ogDescription:
    "Cosmétiques maison, fermentation, alimentation hormonale, diététique saisonnière : les thématiques abordées en atelier.",
});

export default function ThematiquesPage() {
  const pageUrl = absUrl("/ateliers/thematiques");
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: "Thématiques des ateliers naturopathie, Décines",
      description:
        "Quatre thématiques d'ateliers bien-être : cosmétiques maison, fermentation, alimentation hormonale, diététique saisonnière. Programme à Décines-Charpieu.",
      mainEntity: `${pageUrl}#itemlist`,
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildItemList(
      thematiques.map((t) => ({
        url: `${pageUrl}#${t.slug}`,
        name: t.title,
        description: t.subtitle,
      })),
      pageUrl,
    ),
    buildBreadcrumb(
      [
        { name: "Ateliers", url: absUrl("/ateliers") },
        { name: "Thématiques", url: pageUrl },
      ],
      pageUrl,
    ),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Ateliers", href: "/ateliers" },
          { label: "Thématiques", href: "/ateliers/thematiques" },
        ]}
      />
      <ThematiquesHero />
      <AteliersThematiques />
      <AteliersOrganiser as="section" title="Vous souhaitez organiser un atelier ?" />
    </main>
  );
}
