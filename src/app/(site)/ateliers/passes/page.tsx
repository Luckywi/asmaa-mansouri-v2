import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PassesHero } from "@/components/sections/ateliers/PassesHero";
import { AteliersListe } from "@/components/sections/ateliers/Liste";
import { AccordionFAQ } from "@/components/ui/AccordionFAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  buildBreadcrumb,
  buildEvents,
  buildFaqPage,
  buildGraph,
  buildWebPage,
} from "@/lib/schema";
import { ateliers } from "@/data/ateliers";
import { faqPassesAteliers } from "@/data/ateliers-faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Retour sur mes ateliers naturopathie, Décines et Lyon",
  description:
    "Retour sur les ateliers déjà animés par Asmaa Mansouri à Décines-Charpieu : cosmétiques maison, fermentation, gourmandises saines, alimentation saisonnière.",
  path: "/ateliers/passes",
  ogDescription:
    "Les ateliers bien-être déjà animés à Décines-Charpieu : cosmétiques maison, fermentation, alimentation saisonnière.",
});

export default function AteliersPassesPage() {
  const pageUrl = absUrl("/ateliers/passes");
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: "Retour sur mes ateliers naturopathie, Décines et Lyon",
      description:
        "Retour sur les ateliers déjà animés par Asmaa Mansouri à Décines-Charpieu : cosmétiques maison, fermentation, gourmandises saines, alimentation saisonnière.",
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    ...buildEvents(ateliers),
    buildFaqPage(faqPassesAteliers, pageUrl),
    buildBreadcrumb(
      [
        { name: "Ateliers", url: absUrl("/ateliers") },
        { name: "Ateliers passés", url: pageUrl },
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
          { label: "Ateliers passés", href: "/ateliers/passes" },
        ]}
      />
      <PassesHero />
      <AteliersListe />
      <AccordionFAQ faq={faqPassesAteliers} idPrefix="passes-faq" />
    </main>
  );
}
