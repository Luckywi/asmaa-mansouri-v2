import { Reveal } from "@/components/motion/Reveal";
import { BridgesGrid, type BridgeItem } from "@/components/ui/BridgesGrid";

type Props = {
  /** 3 bridges affichés bas de page (ordre préservé). */
  readonly bridges: readonly BridgeItem[];
};

/**
 * Bridges — section de maillage interne bas de page, pour les sous-pages
 * /qui-suis-je/la-naturopathie et /qui-suis-je/medecines-ancestrales.
 *
 * Thin wrapper autour de `BridgesGrid`. Apporte uniquement la `<section>`,
 * le H2 "Pour aller plus loin" et les IDs aria propres à ce contexte.
 *
 * Server Component pur.
 */
export function Bridges({ bridges }: Props) {
  return (
    <section
      aria-labelledby="qui-suis-je-bridges-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal>
          <h2
            id="qui-suis-je-bridges-titre"
            className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900 text-center text-balance"
          >
            Pour aller plus loin
          </h2>
        </Reveal>

        <BridgesGrid items={bridges} />
      </div>
    </section>
  );
}
