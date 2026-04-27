import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Breadcrumbs — fil d'Ariane visuel. Le schema.org BreadcrumbList
 * correspondant est injecté par le système JSON-LD centralisé
 * (`src/lib/schema/breadcrumb.ts`) dans le graphe de chaque page,
 * pour éviter la duplication d'entités.
 *
 * Placé en haut de chaque page de niveau 2 (voir CLAUDE.md). L'item
 * courant (dernier de la liste) n'est pas un lien — marqué
 * `aria-current="page"` et rendu en warm-900. Les items intermédiaires
 * pointent vers le hub parent.
 *
 * Positionnement : composant full-width avec top-padding qui remplace
 * le pt-32 du Hero (le Hero perd son clearance de header fixe quand il
 * est précédé d'un Breadcrumbs).
 */

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
                    className="w-3.5 h-3.5 text-warm-700/80"
                    strokeWidth={1.5}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
