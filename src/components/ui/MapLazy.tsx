"use client";

import dynamic from "next/dynamic";

/**
 * MapLazy — wrapper client autour de `Map.tsx` pour différer le chargement
 * de MapLibre (200+ KB gz) hors du bundle critique de la landing.
 *
 * `dynamic({ ssr: false })` ne peut être appelé que dans un Client
 * Component depuis Next 15. Ce fichier sert juste de boundary client
 * pour que `Cabinet.tsx` (Server Component) puisse continuer d'être RSC
 * tout en bénéficiant du lazy-load.
 *
 * Le placeholder a exactement les mêmes dimensions que la map (transmis
 * par className depuis Cabinet) → CLS reste à 0 pendant le chargement.
 */
const Map = dynamic(() => import("@/components/ui/Map"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="w-full h-full bg-warm-300/30"
    />
  ),
});

interface MapLazyProps {
  className?: string;
}

export default function MapLazy({ className }: MapLazyProps) {
  return <Map className={className} />;
}
