import { TicketPlus, User } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function PassesHero() {
  return (
    <section
      aria-labelledby="ateliers-passes-hero-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-16"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1
          id="ateliers-passes-hero-titre"
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
        >
          Mes ateliers passés
        </h1>

        <p className="mt-6 font-body text-base md:text-lg leading-relaxed text-warm-700">
          Retrouvez les ateliers que j&apos;ai animés au fil des saisons. Des moments de partage et de pratique, en petit groupe, pour reprendre le pouvoir sur sa santé au quotidien.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
          <ButtonLink href="/ateliers/thematiques" variant="secondary">
            Voir les thématiques
            <TicketPlus
              aria-hidden="true"
              className="w-4 h-4"
              strokeWidth={1.5}
            />
          </ButtonLink>
          <ButtonLink href="/qui-suis-je" variant="primary">
            Découvrir mon parcours
            <User
              aria-hidden="true"
              className="w-4 h-4"
              strokeWidth={1.5}
            />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
