"use client";

import { useState } from "react";
import { temoignages } from "@/data/temoignages";
import type { Temoignage } from "@/types";
import { TemoignageCard } from "./Card";
import { TemoignageModal } from "./Modal";

/**
 * Distribue un tableau en N colonnes via round-robin (indice modulo N).
 * Permet un layout bento/masonry équilibré : les items sont répartis
 * par index (col0 reçoit 0, 3, 6... ; col1 reçoit 1, 4, 7... ; etc.)
 * plutôt que de laisser un flow CSS créer des colonnes de hauteurs
 * très inégales.
 */
function distributeIntoColumns<T>(items: readonly T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => {
    columns[i % columnCount].push(item);
  });
  return columns;
}

/**
 * TemoignagesListe — grille responsive des avis, avec modale de détail.
 *
 * Layout :
 *   - Mobile (< sm) : 1 colonne empilée (pattern classique review feed).
 *   - Tablette (sm → lg) : 2 colonnes flex masonry (round-robin par index).
 *   - Desktop (≥ lg) : 3 colonnes flex masonry.
 *
 * La modale est tenue côté client (`selected` state). Un clic sur "Voir
 * plus" d'une card ouvre la modale sur cet avis ; la modale se ferme via
 * bouton X, clic backdrop, ou touche Escape.
 *
 * Client Component — nécessaire pour le state de sélection. Les Cards
 * elles-mêmes sont rendues comme des Server Components inertes (pas de
 * state interne), seul le callback `onOpenDetails` traverse la frontière.
 */
export function TemoignagesListe() {
  const [selected, setSelected] = useState<Temoignage | null>(null);

  const tabletColumns = distributeIntoColumns(temoignages, 2);
  const desktopColumns = distributeIntoColumns(temoignages, 3);

  return (
    <section className="relative pb-12 lg:pb-22">
      <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
        {/* Mobile : 1 colonne empilée */}
        <div className="flex flex-col gap-4 sm:hidden">
          {temoignages.map((t, i) => (
            <TemoignageCard
              key={`m-${t.name}-${i}`}
              temoignage={t}
              onOpenDetails={() => setSelected(t)}
            />
          ))}
        </div>

        {/* Tablette : 2 colonnes masonry */}
        <div className="hidden items-start justify-center gap-6 sm:flex lg:hidden">
          {tabletColumns.map((column, colIndex) => (
            <div key={`t-${colIndex}`} className="flex flex-1 flex-col gap-6">
              {column.map((t, i) => (
                <TemoignageCard
                  key={`t-${colIndex}-${t.name}-${i}`}
                  temoignage={t}
                  onOpenDetails={() => setSelected(t)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Desktop : 3 colonnes masonry */}
        <div className="hidden items-start justify-center gap-6 lg:flex">
          {desktopColumns.map((column, colIndex) => (
            <div key={`d-${colIndex}`} className="flex flex-1 flex-col gap-6">
              {column.map((t, i) => (
                <TemoignageCard
                  key={`d-${colIndex}-${t.name}-${i}`}
                  temoignage={t}
                  onOpenDetails={() => setSelected(t)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <TemoignageModal
        temoignage={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
