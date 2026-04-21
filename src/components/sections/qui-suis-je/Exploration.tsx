import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Section Exploration — posée après Portrait sur /qui-suis-je.
 *
 * Deux mini-sections éditoriales texte avec CTA primary accent, plutôt
 * que des cards glass : plus sobre, plus lisible, plus "éditorial". Les
 * CTA primary olive tirent l'œil et rendent l'action attendue explicite
 * (pas un "En savoir plus" générique, mais un verbe d'action spécifique).
 *
 * Layout :
 *   - Mobile : stack vertical, hairline de séparation entre les deux blocs.
 *   - md+ : grid 2 cols, sans hairline (l'espacement gap suffit).
 *
 * Server Component pur.
 */
type ExplorationBlock = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly ctaLabel: string;
};

const blocks: readonly ExplorationBlock[] = [
  {
    title: "La naturopathie",
    description:
      "Définition officielle, principes fondateurs, ce que la naturopathie n'est pas et pourquoi consulter.",
    href: "/qui-suis-je/la-naturopathie",
    ctaLabel: "Découvrir la naturopathie",
  },
  {
    title: "Mes médecines ancestrales",
    description:
      "Les deux traditions qui nourrissent ma pratique au quotidien : la médecine traditionnelle chinoise et la médecine prophétique.",
    href: "/qui-suis-je/medecines-ancestrales",
    ctaLabel: "Découvrir mon approche",
  },
] as const;

export function Exploration() {
  return (
    <section aria-label="Pour aller plus loin" className="relative py-12 lg:py-22">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/*
          Layout :
          - Mobile : stack vertical, hairline horizontale entre les 2 blocs.
          - md+    : grid 2 cols avec séparateur vertical central via
                     `divide-x`. Chaque bloc est en flex-col pour permettre
                     au CTA d'être poussé en bas (mt-auto) → boutons
                     alignés sur la même baseline quelle que soit la
                     longueur du paragraphe de description.
        */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-warm-700/15">
          {blocks.map(({ title, description, href, ctaLabel }, i) => (
            <div
              key={href}
              className={[
                i > 0
                  ? "pt-10 mt-10 border-t border-warm-700/15 md:pt-0 md:mt-0 md:border-t-0 md:pl-10 lg:md:pl-16"
                  : "md:pr-10 lg:md:pr-16",
                "flex flex-col",
              ].join(" ")}
            >
              <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900 text-center">
                {title}
              </h3>
              <p className="mt-4 font-body text-base lg:text-lg leading-relaxed text-warm-700 text-center">
                {description}
              </p>
              {/* mt-auto pousse le CTA en bas → même baseline entre les 2 blocs md+ */}
              <div className="mt-6 md:mt-auto md:pt-6 flex justify-center">
                <ButtonLink href={href} variant="primary">
                  {ctaLabel}
                  <ArrowRight
                    aria-hidden="true"
                    className="w-4 h-4"
                    strokeWidth={1.5}
                  />
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
