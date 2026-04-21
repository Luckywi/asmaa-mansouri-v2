import { Flower2, Sun, Leaf, Snowflake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ThematiqueAtelier } from "@/types";

type Saisons = NonNullable<ThematiqueAtelier["saisons"]>;
type SaisonName = Saisons[number]["name"];

type SaisonsGridProps = {
  saisons: Saisons;
};

const ICONS: Record<SaisonName, LucideIcon> = {
  Printemps: Flower2,
  "Été": Sun,
  Automne: Leaf,
  Hiver: Snowflake,
};

export function SaisonsGrid({ saisons }: SaisonsGridProps) {
  return (
    <ul className="grid grid-cols-2 divide-x divide-y divide-warm-700/10 border border-warm-700/10">
      {saisons.map((saison) => {
        const Icon = ICONS[saison.name];
        return (
          <li
            key={saison.name}
            className="flex flex-col items-center text-center gap-2 py-8 px-6"
          >
            <Icon
              aria-hidden="true"
              className="w-5 h-5 text-accent"
              strokeWidth={1.5}
            />
            <h3 className="font-display text-base lg:text-lg font-medium tracking-tight text-warm-900">
              {saison.name}
            </h3>
            <p className="font-body text-xs font-medium text-warm-700/70">
              {saison.organe}
            </p>
            <p className="font-body text-[13px] leading-relaxed text-warm-700">
              {saison.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
