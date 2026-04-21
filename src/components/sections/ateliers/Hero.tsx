import Link from "next/link";

const heroTags = [
  { label: "Naturopathie", href: "/qui-suis-je/la-naturopathie" },
  { label: "Gestion du stress", href: "/specialites/stress-burn-out" },
  { label: "Équilibre hormonal", href: "/specialites/desequilibres-hormonaux" },
  { label: "Médecines ancestrales", href: "/qui-suis-je/medecines-ancestrales" },
  { label: "Troubles digestifs", href: "/specialites/troubles-digestifs" },
] as const;

export function AteliersHero() {
  return (
    <section
      aria-labelledby="ateliers-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-16"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1
          id="ateliers-titre"
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
        >
          Ateliers bien-être
        </h1>

        <div className="mt-6 space-y-5 text-left sm:text-center">
          <p className="font-body text-base md:text-lg leading-relaxed text-warm-700">
            Parce que prendre soin de soi ne s&apos;arrête pas à la salle de consultation, je vous propose des ateliers pratiques conçus pour vous redonner le pouvoir sur votre santé au quotidien. Fabriquer ses cosmétiques, nourrir son microbiote, se réconcilier avec les saveurs saines, comprendre ses cycles hormonaux&nbsp;: autant de gestes simples qui transforment profondément notre relation au corps et à la nature.
          </p>
          <p className="font-body text-base md:text-lg leading-relaxed text-warm-700">
            Chaque atelier est pensé dans une approche globale, à la croisée de la naturopathie et de la médecine chinoise, pour que vous repartiez non seulement avec des recettes ou des outils, mais avec une véritable compréhension de votre terrain.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {heroTags.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className={[
                  "inline-flex items-center px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-md",
                  "bg-[var(--glass-bg)]",
                  "backdrop-blur-xl backdrop-saturate-[1.8]",
                  "border-[0.5px] border-white/50",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                  "font-body text-xs lg:text-sm font-medium text-warm-700",
                  "hover:border-white/70 hover:text-warm-900",
                  "transition-colors duration-200 ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
