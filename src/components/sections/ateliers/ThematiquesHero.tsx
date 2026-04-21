"use client";

import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

const anchors = [
  { label: "Cosmétiques maison", href: "#atelier-diy" },
  { label: "Fermentation", href: "#atelier-fermentation" },
  { label: "Gourmandises saines", href: "#atelier-gourmand" },
  { label: "Santé féminine", href: "#atelier-sante-feminine" },
  { label: "Diététique saisonnière", href: "#atelier-saisons" },
] as const;

export function ThematiquesHero() {
  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    "Organisation d'un atelier",
  )}`;

  function handleClick(href: string) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      aria-labelledby="thematiques-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-16"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1
          id="thematiques-titre"
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
        >
          Les thématiques
        </h1>

        <p className="mt-6 font-body text-base md:text-lg leading-relaxed text-warm-700">
          Parce que prendre soin de soi ne s&apos;arrête pas à la salle de consultation, je vous propose des ateliers pratiques conçus pour vous redonner le pouvoir sur votre santé au quotidien. Fabriquer ses cosmétiques, nourrir son microbiote, se réconcilier avec les saveurs saines, comprendre ses cycles hormonaux&nbsp;: autant de gestes simples qui transforment profondément notre relation au corps et à la nature.
        </p>

        <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-warm-700">
          Chaque atelier est pensé dans une approche globale, à la croisée de la naturopathie et de la médecine chinoise, pour que vous repartiez non seulement avec des recettes ou des outils, mais avec une véritable compréhension de votre terrain.
        </p>

        <nav className="mt-8 flex flex-wrap justify-center gap-2.5">
          {anchors.map(({ label, href }) => (
            <button
              key={href}
              type="button"
              onClick={() => handleClick(href)}
              className={[
                "px-4 py-2 rounded-md",
                "bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-[1.8]",
                "border-[0.5px] border-white/50",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                "font-body text-sm lg:text-base font-medium text-warm-700",
                "hover:text-warm-900 hover:border-white/70",
                "transition-colors duration-200 ease-out cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-6 flex justify-center">
          <ButtonLink href={mailtoHref} variant="primary">
            Organiser un atelier
            <Mail aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
