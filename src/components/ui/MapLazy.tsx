"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * MapLazy — wrapper client autour de `Map.tsx`.
 *
 * Deux niveaux de lazy-loading :
 *
 *   1. `dynamic({ ssr: false })` — sort MapLibre du bundle SSR/RSC ; le
 *      chunk est demandé côté client uniquement, jamais inclus dans le
 *      premier HTML.
 *
 *   2. IntersectionObserver — ne **mount** le composant `Map` qu'au
 *      moment où le placeholder entre dans le viewport (avec une marge
 *      de 200 px pour démarrer le download juste avant). Tant que la
 *      section Cabinet est sous le fold, le chunk MapLibre (~200 KB gz)
 *      n'est même pas téléchargé — il ne pèse plus sur la bande passante
 *      pendant la fenêtre LCP.
 *
 * Le placeholder partage les mêmes dimensions que la map (transmises via
 * className depuis Cabinet : `w-[480px] h-[320px]` desktop, `w-full
 * h-[220px]` mobile) → CLS reste à 0 pendant le swap.
 */
const Map = dynamic(() => import("@/components/ui/Map"), {
  ssr: false,
  loading: () => (
    <div aria-hidden="true" className="w-full h-full bg-warm-300/30" />
  ),
});

interface MapLazyProps {
  className?: string;
}

export default function MapLazy({ className }: MapLazyProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldMount) return;

    // Fallback : navigateurs sans IntersectionObserver → mount tout de suite.
    if (typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMount(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [shouldMount]);

  return (
    <div ref={ref} className={className}>
      {shouldMount ? (
        <Map className="w-full h-full" />
      ) : (
        <div aria-hidden="true" className="w-full h-full bg-warm-300/30" />
      )}
    </div>
  );
}
