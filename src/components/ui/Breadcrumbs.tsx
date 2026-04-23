import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Breadcrumbs — fil d'Ariane visuel + schema.org BreadcrumbList.
 *
 * Placé en haut de chaque page de niveau 2 (voir CLAUDE.md). Le rendu
 * JSON-LD est émis dans le même composant pour rester synchronisé avec
 * le visuel : une seule source de vérité par page.
 *
 * L'item courant (dernier de la liste) n'est pas un lien — marqué
 * `aria-current="page"` et rendu en warm-900. Les items intermédiaires
 * pointent vers le hub parent.
 *
 * Positionnement : composant full-width avec top-padding qui remplace
 * le pt-32 du Hero (le Hero perd son clearance de header fixe quand il
 * est précédé d'un Breadcrumbs).
 */

const SITE_URL = "https://naturopathe-decines.fr";

export type BreadcrumbItem = {
  readonly label: string;
  readonly href: string;
};

type Props = {
  readonly items: readonly BreadcrumbItem[];
};

export function Breadcrumbs({ items }: Props) {
  const trail: readonly BreadcrumbItem[] = [
    { label: "Accueil", href: "/" },
    ...items,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <nav
      aria-label="Fil d'Ariane"
      className="relative pt-28 md:pt-32 lg:pt-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <ol className="flex flex-wrap items-center gap-1.5 font-body text-sm text-warm-700">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-medium text-warm-900"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-warm-900 hover:underline underline-offset-4 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-warm-700/60"
                    strokeWidth={1.5}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
