import type { PrestationStep } from "@/types";

type StepsProps = {
  title: string;
  items: readonly PrestationStep[];
};

/**
 * Section "Déroulé d'une séance" — 3 à 4 étapes numérotées.
 *
 * Deux rendus distincts selon breakpoint :
 * - `< sm` : timeline verticale compacte (pastille accent + connector
 *   line + titre/desc alignés à droite). Tout visible d'un coup, pas
 *   d'interaction (évite le doublon avec la FAQ accordéon en dessous).
 * - `>= sm` : grid 2 cols tablette, 3 ou 4 cols desktop selon items.
 *   Cards glass standard avec gros numéro accent.
 *
 * Server Component.
 */
export function Steps({ title, items }: StepsProps) {
  const colsLg = items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section
      aria-labelledby="prestation-steps-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <h2
          id="prestation-steps-titre"
          className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900 text-center text-balance"
        >
          {title}
        </h2>

        {/* Mobile — timeline verticale compacte */}
        <ol className="sm:hidden mt-10">
          {items.map(({ number, title: stepTitle, description }, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li
                key={number}
                className={`relative flex gap-4 ${isLast ? "" : "pb-6"}`}
              >
                <div className="relative shrink-0">
                  <div
                    className={[
                      "relative z-10 flex items-center justify-center w-10 h-10 rounded-md",
                      "bg-[var(--glass-bg)]",
                      "backdrop-blur-xl backdrop-saturate-[1.8]",
                      "border-[0.5px] border-white/50",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                    ].join(" ")}
                  >
                    <span className="font-display text-sm font-medium text-accent">
                      {number}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="absolute top-10 bottom-0 left-1/2 -translate-x-1/2 w-px bg-warm-500/50"
                    />
                  )}
                </div>
                <div className="flex-1 pt-1.5">
                  <h3 className="font-display text-lg font-medium tracking-tight text-warm-900">
                    {stepTitle}
                  </h3>
                  <p className="mt-2 font-body text-[15px] leading-relaxed text-warm-700">
                    {description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Tablette & desktop — grid cards glass */}
        <ol
          className={`hidden sm:grid mt-14 lg:mt-16 grid-cols-2 ${colsLg} gap-6 lg:gap-8`}
        >
          {items.map(({ number, title: stepTitle, description }) => (
            <li
              key={number}
              className={[
                "flex flex-col items-center text-center p-6 lg:p-8 rounded-md",
                "bg-[var(--glass-bg)]",
                "backdrop-blur-xl backdrop-saturate-[1.8]",
                "border-[0.5px] border-white/50",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl lg:text-5xl font-medium text-accent leading-none"
              >
                {number}
              </span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-warm-900">
                {stepTitle}
              </h3>
              <p className="mt-3 font-body text-base leading-relaxed text-warm-700">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
