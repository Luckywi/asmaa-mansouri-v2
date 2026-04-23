import Link from "next/link";
import { ArrowUpRight, Bell } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";
import type { ThematiqueAtelier } from "@/types";
import { SaisonsGrid } from "./SaisonsGrid";

type ThematiqueSectionProps = {
  thematique: ThematiqueAtelier;
};

export function ThematiqueSection({ thematique }: ThematiqueSectionProps) {
  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Atelier : ${thematique.title}`,
  )}&body=${encodeURIComponent(
    `Bonjour Asmaa,\n\nJe souhaite être informée des prochaines sessions de l'atelier "${thematique.title}".\n\nMerci,\n`,
  )}`;

  return (
    <section
      id={thematique.slug}
      aria-labelledby={`${thematique.slug}-titre`}
      className="scroll-mt-28 border-t border-warm-500/20 first:border-t-0 py-12 lg:py-22"
    >
      <div className="mx-auto max-w-5xl">
        {/* ─── Haut : centré ─── */}
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <p className="font-body text-xs font-medium tracking-[0.18em] text-warm-700/80">
            {thematique.eyebrow}
          </p>

          <h2
            id={`${thematique.slug}-titre`}
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900 text-balance"
          >
            {thematique.title}
          </h2>

          <p className="mt-3 font-body italic text-base lg:text-lg text-warm-700">
            {thematique.subtitle}
          </p>

          {thematique.saisons && thematique.saisons.length > 0 && (
            <div className="mt-8">
              <SaisonsGrid saisons={thematique.saisons} />
            </div>
          )}

          <p className="mt-5 font-body text-[15px] lg:text-base leading-relaxed text-warm-700">
            {thematique.highlight}
          </p>

          {thematique.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {thematique.tags.map((tag) => (
                <Link
                  key={tag.href + tag.label}
                  href={tag.href}
                  className={[
                    "group inline-flex items-center gap-1.5 h-8 px-3 rounded-md",
                    "bg-warm-500/15 border-[0.5px] border-warm-500/35",
                    "font-body text-xs font-medium text-warm-700",
                    "hover:bg-warm-500/25 hover:text-warm-900 hover:border-warm-500/55",
                    "transition-colors duration-150 ease-out",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
                  ].join(" ")}
                >
                  {tag.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="w-3 h-3 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </Link>
              ))}
            </div>
          )}

          {thematique.bullets && thematique.bullets.length > 0 && (
            <ul className="mt-6 flex flex-col gap-0">
              {thematique.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="py-2.5 border-t border-warm-700/10 last:border-b last:border-warm-700/10 font-body text-[15px] leading-relaxed text-warm-700"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex justify-center">
            <ButtonLink href={mailtoHref} variant="primary">
              Me tenir informée
              <Bell aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
            </ButtonLink>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
