type WhatIsProps = {
  title: string;
  content: string;
};

/**
 * Section "Qu'est-ce que la [service]" — explication long-form.
 *
 * Layout centré, même pattern que le bloc intro des pages /specialites/[slug]
 * (article component). Max-width 3xl pour un confort de lecture typo, pas
 * de card ni de background : texte posé sur le body.
 *
 * Server Component pur.
 */
export function WhatIs({ title, content }: WhatIsProps) {
  return (
    <section
      aria-labelledby="prestation-what-is-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-8 lg:px-12">
        <h2
          id="prestation-what-is-titre"
          className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900 text-center text-balance"
        >
          {title}
        </h2>

        <p className="mt-8 font-body text-base md:text-lg leading-relaxed text-warm-700 text-center">
          {content}
        </p>
      </div>
    </section>
  );
}
