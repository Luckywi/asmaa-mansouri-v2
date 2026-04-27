import {
  CircleDot,
  Flower2,
  GalleryVerticalEnd,
  HandHeart,
  HeartHandshake,
  MapPin,
  MessageCircle,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { BridgesGrid, type BridgeItem } from "@/components/ui/BridgesGrid";
import type { PrestationBridge } from "@/types";

/**
 * Mapping iconKey → composant lucide, pour sérializer les icônes dans
 * la data (`src/data/prestations.ts`). Les données restent pures
 * JSON-like, le composant résout l'icône au render.
 */
const iconMap: Record<PrestationBridge["iconKey"], LucideIcon> = {
  user: UserRound,
  flower: Flower2,
  map: MapPin,
  gallery: GalleryVerticalEnd,
  massage: HandHeart,
  cupping: CircleDot,
  heart: HeartHandshake,
  message: MessageCircle,
};

type Props = {
  /** Les 3 bridges à afficher (ordre préservé) */
  readonly bridges: readonly PrestationBridge[];
};

/**
 * Section de maillage interne bas de page slug.
 *
 * Thin wrapper autour de `BridgesGrid`. Convertit les `PrestationBridge`
 * (data sérialisable avec `iconKey`) en `BridgeItem` (rendu avec
 * `icon: LucideIcon`) via `iconMap`, puis délègue la grille.
 *
 * Server Component pur.
 */
export function Bridges({ bridges }: Props) {
  const items: readonly BridgeItem[] = bridges.map((b) => ({
    icon: iconMap[b.iconKey],
    title: b.title,
    description: b.description,
    ctaLabel: b.ctaLabel,
    href: b.href,
  }));

  return (
    <section
      aria-labelledby="prestation-bridges-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal>
          <h2
            id="prestation-bridges-titre"
            className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900 text-center text-balance"
          >
            Pour aller plus loin
          </h2>
        </Reveal>

        <BridgesGrid items={items} />
      </div>
    </section>
  );
}
