"use client";

import { useState } from "react";
import { ateliers } from "@/data/ateliers";
import type { Atelier } from "@/types";
import { AtelierCard } from "./Card";
import { AtelierModal } from "./Modal";

/**
 * AteliersListe — grille responsive des ateliers + modale de détail.
 *
 * Layout :
 *   - Mobile (< sm) : 1 colonne empilée
 *   - Tablette (sm → lg) : 2 colonnes
 *   - Desktop (≥ lg) : 3 colonnes
 *
 * La modale est tenue côté client (`selected` state). Un clic sur une
 * card ouvre la modale sur cet atelier ; la modale se ferme via bouton
 * X, clic backdrop, ou touche Escape.
 *
 * Client Component — state de sélection. Les Cards sont rendues
 * comme des Server Components inertes (callback `onOpenDetails`
 * traverse la frontière).
 */
export function AteliersListe() {
  const [selected, setSelected] = useState<Atelier | null>(null);

  return (
    <section
      aria-labelledby="ateliers-derniers-titre"
      className="relative pb-12 lg:pb-22"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
        <h2
          id="ateliers-derniers-titre"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900 text-center mb-10 lg:mb-14"
        >
          Les derniers ateliers
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {ateliers.map((atelier) => (
            <li key={atelier.slug} className="flex">
              <AtelierCard
                atelier={atelier}
                onOpenDetails={() => setSelected(atelier)}
              />
            </li>
          ))}
        </ul>
      </div>

      <AtelierModal
        atelier={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
