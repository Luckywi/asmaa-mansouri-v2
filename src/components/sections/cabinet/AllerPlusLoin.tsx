import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * AllerPlusLoin — section finale de /cabinet.
 *
 * Rupture volontairement légère avec le reste de la page : pas de card
 * glass ici, mais pas non plus de bloc plein. Juste **une liste
 * éditoriale** posée sur le fond warm-100 du body, avec des hairlines
 * `warm-700/15` entre les rangées. Aucune ombre, aucun radius (hors
 * flèche), aucun backdrop-blur : le rythme vient de la typo display
 * et de l'animation de la flèche au hover.
 *
 * Pattern "table des matières éditoriale" : gros titre display
 * → courte description → flèche ArrowUpRight qui glisse en diagonale
 * au hover. Pas de titre de section, pas de numéro — la hiérarchie
 * vient uniquement de la typo. Reste dans la palette warm-100/700/900.
 *
 * Server Component — aucun état, aucun JS.
 */

type NextStep = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
};

const steps: readonly NextStep[] = [
  {
    title: "Mes spécialités",
    description:
      "SOPK, endométriose, fertilité, préménopause et toutes les problématiques de santé féminine que j'accompagne au cabinet.",
    href: "/specialites",
  },
  {
    title: "Mes prestations",
    description:
      "Consultations naturopathie, massage Tuina, cupping-thérapie et accompagnements sur plusieurs mois.",
    href: "/prestations",
  },
  {
    title: "Les ateliers",
    description:
      "Ateliers collectifs autour de l'alimentation anti-inflammatoire, du soutien de l'immunité et de la santé féminine au quotidien.",
    href: "/ateliers",
  },
] as const;

export function AllerPlusLoin() {
  return (
    <section
      id="aller-plus-loin"
      aria-label="Poursuivre la visite"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Liste éditoriale — hairlines warm-700/15 entre rangées.
               `border-y` sur le <ul> ferme le bloc en haut et en bas,
               les <li> suivants ajoutent leur propre border-t. ─── */}
        <ul className="border-y border-warm-700/15">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className={i > 0 ? "border-t border-warm-700/15" : ""}
            >
              <Link
                href={step.href}
                className={[
                  "group relative flex items-center gap-6 md:gap-10",
                  "py-7 md:py-9 lg:py-10",
                  "transition-colors duration-200 ease-out",
                  "hover:text-warm-900",
                  "focus-visible:outline-none",
                ].join(" ")}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 md:mt-3 font-body text-sm md:text-base leading-relaxed text-warm-700 max-w-2xl">
                    {step.description}
                  </p>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={[
                    "w-7 h-7 md:w-9 md:h-9 shrink-0 text-warm-700",
                    "transition-all duration-300 ease-out",
                    "group-hover:translate-x-1 group-hover:-translate-y-1",
                    "group-hover:text-warm-900",
                  ].join(" ")}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
