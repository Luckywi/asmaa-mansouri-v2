import { TicketPlus, TicketCheck, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

type ExplorationBlock = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly icon: LucideIcon;
  readonly ctaLabel: string;
};

const blocks: readonly ExplorationBlock[] = [
  {
    title: "Les thématiques",
    description:
      "Cosmétiques maison, fermentation, gourmandises saines, santé féminine, diététique saisonnière : cinq ateliers pensés à la croisée de la naturopathie et de la médecine chinoise.",
    href: "/ateliers/thematiques",
    icon: TicketPlus,
    ctaLabel: "Découvrir les thématiques",
  },
  {
    title: "Les ateliers passés",
    description:
      "Retrouvez les ateliers déjà animés, en images et en détail, pour témoigner d'une pratique qui se construit dans la durée.",
    href: "/ateliers/passes",
    icon: TicketCheck,
    ctaLabel: "Voir les ateliers passés",
  },
] as const;


export function AteliersExploration() {
  return (
    <section aria-label="Explorer les ateliers" className="relative py-12 lg:py-22">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal as="div" className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-warm-700/15">
          {blocks.map(({ title, description, href, icon: Icon, ctaLabel }, i) => (
            <div
              key={href}
              className={[
                i > 0
                  ? "pt-10 mt-10 border-t border-warm-700/15 md:pt-0 md:mt-0 md:border-t-0 md:pl-10 lg:md:pl-16"
                  : "md:pr-10 lg:md:pr-16",
                "flex flex-col items-center text-center",
              ].join(" ")}
            >
              <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                {title}
              </h2>
              <p className="mt-4 font-body text-base lg:text-lg leading-relaxed text-warm-700">
                {description}
              </p>
              <div className="mt-6 md:mt-auto md:pt-6">
                <ButtonLink href={href} variant="primary">
                  {ctaLabel}
                  <Icon
                    aria-hidden="true"
                    className="w-4 h-4"
                    strokeWidth={1.5}
                  />
                </ButtonLink>
              </div>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  );
}
