import { AteliersExploration } from "@/components/sections/ateliers/Exploration";
import { AteliersOrganiser } from "@/components/sections/ateliers/Organiser";
import { AccordionFAQ } from "@/components/ui/AccordionFAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  BUSINESS_ID,
  buildBreadcrumb,
  buildFaqPage,
  buildGraph,
  buildWebPage,
} from "@/lib/schema";
import { faqAteliers } from "@/data/ateliers-faq";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Mes ateliers en naturopathie à Décines et à Lyon",
  description:
    "Ateliers pratiques de cosmétiques maison, fermentation, alimentation hormonale et diététique saisonnière, animés par Asmaa Mansouri dans l'Est lyonnais.",
  path: "/ateliers",
  ogTitle: "Ateliers bien-être et santé féminine",
  ogDescription:
    "Ateliers pratiques cosmétiques maison, fermentation, alimentation hormonale et diététique saisonnière à Décines-Charpieu.",
});

export default function AteliersPage() {
  const pageUrl = absUrl("/ateliers");
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: "Mes ateliers en naturopathie à Décines et à Lyon",
      description:
        "Ateliers pratiques de cosmétiques maison, fermentation, alimentation hormonale et diététique saisonnière, animés par Asmaa Mansouri dans l'Est lyonnais.",
      about: BUSINESS_ID,
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildFaqPage(faqAteliers, pageUrl),
    buildBreadcrumb([{ name: "Ateliers", url: pageUrl }], pageUrl),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <AteliersOrganiser />
      <AteliersExploration />
      <AccordionFAQ faq={faqAteliers} idPrefix="ateliers-faq" />
    </main>
  );
}
