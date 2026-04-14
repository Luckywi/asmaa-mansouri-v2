import type { Specialite } from "@/types";

type Props = {
  definition: Specialite["definition"];
  symptomes: Specialite["symptomes"];
  approche: Specialite["approche"];
};

/**
 * Article — corps long-form de la page spécialité.
 *
 * Combine 3 sections successives (Definition, Symptômes, Approche)
 * dans un même `<article>` à largeur de lecture (max-w-3xl). H2 et
 * paragraphes left-aligned pour confort de lecture (vs centrage du
 * Hero).
 *
 * Structure :
 *   - Definition : H2 + content (paragraphes via `whitespace-pre-line`)
 *   - Symptômes  : H2 + intro + liste à puces (custom dot warm-700)
 *   - Approche   : H2 + content (paragraphes via `whitespace-pre-line`)
 *
 * Le `whitespace-pre-line` sur les `<p>` content permet à Asmaa
 * d'écrire ses paragraphes avec des `\n` simples dans le data file —
 * pas besoin de wrapping manuel en multiples `<p>`.
 *
 * Server Component pur.
 */
export function Article({ definition, symptomes, approche }: Props) {
  return (
    <section className="relative pb-12 lg:pb-22">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        {/* ─── Definition ──────────────────────────────────────── */}
        <article>
          <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
            {definition.title}
          </h2>
          <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700 whitespace-pre-line">
            {definition.content}
          </p>
        </article>

        {/* ─── Symptômes ───────────────────────────────────────── */}
        <article className="mt-16 lg:mt-20">
          <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
            {symptomes.title}
          </h2>
          <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700">
            {symptomes.intro}
          </p>
          <ul className="mt-6 space-y-3">
            {symptomes.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 font-body text-base lg:text-lg leading-relaxed text-warm-700"
              >
                {/*
                  Custom bullet (dot rond warm-700) — `mt-3` aligne le
                  dot sur la baseline du texte à la première ligne.
                */}
                <span
                  aria-hidden="true"
                  className="mt-3 w-1.5 h-1.5 bg-warm-700 rounded-full shrink-0"
                />
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* ─── Approche ────────────────────────────────────────── */}
        <article className="mt-16 lg:mt-20">
          <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
            {approche.title}
          </h2>
          <p className="mt-6 font-body text-base lg:text-lg leading-relaxed text-warm-700 whitespace-pre-line">
            {approche.content}
          </p>
        </article>
      </div>
    </section>
  );
}
