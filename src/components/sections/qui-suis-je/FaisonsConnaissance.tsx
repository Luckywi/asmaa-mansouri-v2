import {
  Flower2,
  GalleryVerticalEnd,
  MapPin,
  PhoneCall,
  Eye,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

/**
 * 3 bridges de maillage interne pour prolonger la visite après /qui-suis-je.
 *
 * **Phase 1** — `href` pointe vers les ancres de la landing (pattern aligné
 * sur Footer.tsx : /#specialites, /#cabinet, /#prestations). Dès que les
 * pages dédiées existent (/specialites, /cabinet, /prestations), on switch
 * ces href vers les vraies routes — on garde `futureHref` en doc pour
 * faciliter ce swap.
 *
 * Inlinés ici parce que cette section est l'unique consommatrice de ces
 * bridges. Si on les réutilise ailleurs (page /prestations, etc.),
 * extraire vers `src/data/bridges.ts`.
 */
const bridges = [
  {
    icon: Flower2,
    title: "Mes spécialités",
    description:
      "Déséquilibres hormonaux, troubles digestifs et transitions de vie.",
    ctaLabel: "Voir les spécialités",
    href: "/#specialites",
    futureHref: "/specialites",
  },
  {
    icon: MapPin,
    title: "Mon cabinet",
    description:
      "À Décines-Charpieu, à quelques minutes de Lyon. Consultations en cabinet ou en visio.",
    ctaLabel: "Voir le cabinet",
    href: "/#cabinet",
    futureHref: "/cabinet",
  },
  {
    icon: GalleryVerticalEnd,
    title: "Mes prestations",
    description:
      "Consultations, massages Tuina, cupping therapy, accompagnement sur trois mois.",
    ctaLabel: "Voir les prestations",
    href: "/#prestations",
    futureHref: "/prestations",
  },
] as const;

/**
 * FaisonsConnaissance — section de clôture de /qui-suis-je.
 *
 * Merge de deux blocs précédents (AllerPlusLoin + CTAFinal) en une seule
 * section unifiée :
 *
 *   1. Header centré : H2 "Faisons connaissance" + subtitle + CTA primary
 *      "Réserver un appel découverte gratuit" (PhoneCall, → Resalib).
 *      Le CTA est posé directement sous le subtitle parce que c'est
 *      l'action de conversion principale de la page — pas à scroller
 *      pour la trouver.
 *
 *   2. Grid 3 bridges en dessous (Spécialités / Cabinet / Prestations)
 *      comme alternatives pour le visiteur qui souhaite encore explorer
 *      avant de prendre RDV. Chaque card reprend le pattern Specialites
 *      (watermark icon + glass par-dessus + ButtonLink primary).
 *
 * Intérêt SEO : 3 liens internes contextuels vers les hubs thématiques.
 * Intérêt UX : une action de conversion forte + 3 chemins de continuation.
 *
 * Server Component pur — aucun state, aucune interactivité en dehors des
 * Link et ButtonLink nativement gérés par Next.
 */
export function FaisonsConnaissance() {
  return (
    <section
      id="faisons-connaissance"
      aria-labelledby="faisons-connaissance-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Header : H2 + subtitle + CTA primary ────────── */}
        <div className="text-center max-w-3xl mx-auto">
          <h2
            id="faisons-connaissance-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Faisons connaissance
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Un premier échange pour poser vos questions et voir si nous pouvons
            avancer ensemble.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href={site.resalibUrl} variant="primary">
              Réserver un appel découverte gratuit
              <PhoneCall
                aria-hidden="true"
                className="w-4 h-4"
                strokeWidth={1.5}
              />
            </ButtonLink>
          </div>
        </div>

        {/* ─── Grid 3 bridges ──────────────────────────────── */}
        <ul className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {bridges.map(({ icon: Icon, title, description, ctaLabel, href }) => (
            <li
              key={title}
              className="group relative flex flex-col rounded-md overflow-hidden"
            >
              {/* Couche 1 — icône watermark */}
              <Icon
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-warm-700/50 pointer-events-none"
                strokeWidth={2}
              />

              {/* Couche 2 — card glass */}
              <div
                className={[
                  "relative flex-1 flex flex-col",
                  "p-6 lg:p-8",
                  "bg-[var(--glass-bg)]",
                  "backdrop-blur-xl backdrop-saturate-[1.8]",
                  "border-[0.5px] border-white/50",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                  "group-hover:border-white/70",
                  "transition-colors duration-200 ease-out",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    aria-hidden="true"
                    className="w-7 h-7 text-warm-700 shrink-0"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight text-warm-900">
                    {title}
                  </h3>
                </div>

                <p className="mt-4 font-body text-base leading-relaxed text-warm-700">
                  {description}
                </p>

                <div className="mt-auto pt-6">
                  <ButtonLink href={href} variant="primary">
                    {ctaLabel}
                    <Eye
                      aria-hidden="true"
                      className="w-4 h-4"
                      strokeWidth={1.5}
                    />
                  </ButtonLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
