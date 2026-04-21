"use client";

import { useState } from "react";
import { temoignages } from "@/data/temoignages";
import type { Temoignage } from "@/types";
import { TemoignageCard } from "./Card";
import { TemoignageModal } from "./Modal";
import { VideoCard } from "./VideoCard";
import { AudioCard } from "./AudioCard";

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

  // Rééquilibrage desktop : la colonne 1 porte la video 9:16 donc elle est
  // bien plus haute. On déplace Nassima B. (massage Google) vers col 0 et
  // Sonia B. vers col 2 pour compenser.
  const nassimaIdx = desktopColumns[1].findIndex(
    (t) => t.name === "Nassima B." && t.source === "google",
  );
  if (nassimaIdx !== -1) {
    desktopColumns[0].push(desktopColumns[1].splice(nassimaIdx, 1)[0]);
  }
  const soniaIdx = desktopColumns[1].findIndex((t) => t.name === "Sonia B.");
  if (soniaIdx !== -1) {
    desktopColumns[2].push(desktopColumns[1].splice(soniaIdx, 1)[0]);
  }

  return (
    <section className="relative pb-12 lg:pb-22">
      <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
        {/* Mobile : texte → video → 2 textes → audio → reste */}
        <div className="flex flex-col gap-4 sm:hidden">
          {temoignages.slice(0, 1).map((t, i) => (
            <TemoignageCard
              key={`m-${t.name}-${i}`}
              temoignage={t}
              onOpenDetails={() => setSelected(t)}
            />
          ))}
          <VideoCard />
          {temoignages.slice(1, 3).map((t, i) => (
            <TemoignageCard
              key={`m-${t.name}-${i + 1}`}
              temoignage={t}
              onOpenDetails={() => setSelected(t)}
            />
          ))}
          <AudioCard />
          {temoignages.slice(3).map((t, i) => (
            <TemoignageCard
              key={`m-${t.name}-${i + 3}`}
              temoignage={t}
              onOpenDetails={() => setSelected(t)}
            />
          ))}
        </div>

        {/* Tablette : 2 colonnes masonry, video en tête de la colonne droite */}
        <div className="hidden items-start justify-center gap-6 sm:flex lg:hidden">
          {tabletColumns.map((column, colIndex) => (
            <div key={`t-${colIndex}`} className="flex flex-1 flex-col gap-6">
              {colIndex === 1 && <VideoCard />}
              {colIndex === 1 && <AudioCard />}
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

        {/* Desktop : 3 colonnes masonry + video short dans la colonne centrale */}
        <div className="hidden items-start justify-center gap-6 lg:flex">
          {desktopColumns.map((column, colIndex) => (
            <div key={`d-${colIndex}`} className="flex flex-1 flex-col gap-6">
              {colIndex === 1 && <VideoCard />}
              {column.map((t, i) => (
                <>
                  <TemoignageCard
                    key={`d-${colIndex}-${t.name}-${i}`}
                    temoignage={t}
                    onOpenDetails={() => setSelected(t)}
                  />
                  {colIndex === 2 && i === 0 && <AudioCard />}
                </>
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
