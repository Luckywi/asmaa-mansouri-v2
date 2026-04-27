const anchors = [
  { label: "Cosmétiques maison", href: "#atelier-diy" },
  { label: "Fermentation", href: "#atelier-fermentation" },
  { label: "Gourmandises saines", href: "#atelier-gourmand" },
  { label: "Santé féminine", href: "#atelier-sante-feminine" },
  { label: "Diététique saisonnière", href: "#atelier-saisons" },
] as const;

export function ThematiquesNav() {
  return (
    <section aria-label="Navigation des thématiques" className="relative py-12 lg:py-22">
      <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900">
          Cinq thématiques
        </h2>
        <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-warm-700">
          Chaque atelier est pensé dans une approche globale, à la croisée de la naturopathie et de la médecine chinoise, pour que vous repartiez non seulement avec des recettes ou des outils, mais avec une véritable compréhension de votre terrain.
        </p>

        <nav aria-label="Accès direct aux thématiques" className="mt-8 flex flex-wrap justify-center gap-2.5">
          {anchors.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={[
                "inline-flex items-center px-4 py-2 rounded-md",
                "bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-[1.8]",
                "border-[0.5px] border-white/50",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                "font-body text-sm lg:text-base font-medium text-warm-700",
                "hover:text-warm-900 hover:border-white/70",
                "transition-colors duration-200 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
              ].join(" ")}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
