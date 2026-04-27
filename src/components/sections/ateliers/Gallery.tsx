"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useFocusTrap } from "@/lib/useFocusTrap";

type GalleryProps = {
  images: readonly string[];
  /**
   * Texte descriptif de l'atelier — sert de base pour l'`alt` des photos,
   * suffixé par "— photo N".
   */
  alt: string;
};

/**
 * Recette glass partagée des 3 boutons du lightbox (fermer, précédent,
 * suivant). Alignée sur les tags, mini-cards et bouton secondary-on-glass
 * du site : h-10, rounded-md, --glass-bg + backdrop-blur + border 0.5px
 * white/50 + shadow 3 layers. L'iconographie lucide en stroke 1.75 pour
 * rester dans la même famille que les autres icônes UI (ButtonLink, etc.).
 *
 * Le positionnement (`absolute right-... top-...`) est ajouté par chaque
 * appelant, pour ne pas dupliquer 3 fois la recette chrome.
 */
const LIGHTBOX_BUTTON_CLASS = [
  "pointer-events-auto",
  "inline-flex items-center justify-center h-10 w-10 rounded-md",
  "bg-[var(--glass-bg)]",
  "backdrop-blur-xl backdrop-saturate-[1.8]",
  "border-[0.5px] border-white/50",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
  "text-warm-700 transition-colors duration-150 ease-out",
  "hover:border-white/70 hover:text-warm-900",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
].join(" ");

/**
 * AtelierGallery — grille de miniatures portrait + lightbox plein écran.
 *
 * Rendu dans la modale de l'atelier (`Modal.tsx`) quand `atelier.images`
 * est renseigné. Toutes les photos doivent être en orientation portrait
 * — la cohérence de la grille dépend de cette hypothèse côté source
 * (pas de correction CSS artificielle, pas de rotation runtime).
 *
 * Miniatures :
 *   - Grid 3 colonnes mobile, 4 colonnes ≥ sm
 *   - `aspect-[3/4]` + `object-cover` → cadre portrait uniforme
 *   - `rounded-md` (token --radius-md, 6px — boutons/cards/tags)
 *
 * Lightbox (`activeIndex !== null`) :
 *   - Backdrop aligné sur le Modal du site (bg-warm-900/10 backdrop-blur-md)
 *     pour garder la même teinte neutre — pas d'overlay sombre/vert.
 *   - Photo en `object-contain` dans un container `rounded-xl`
 *     (--radius-xl, 10px : réservé aux photos/panels par DESIGN.md).
 *   - 3 boutons chrome (fermer, précédent, suivant) : recette glass du
 *     site + rounded-md.
 *   - Compteur "N / total" : pastille glass rounded-md alignée sur le
 *     pattern "tag" du site.
 *   - Navigation clavier : Escape = close, ← / → = prev/next.
 *
 * Client Component — state local + listeners clavier.
 */
export function AtelierGallery({ images, alt }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  useFocusTrap(activeIndex !== null, lightboxRef);

  const close = useCallback(() => setActiveIndex(null), []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [activeIndex, close, next, prev]);

  if (images.length === 0) return null;

  return (
    <>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {images.map((src, i) => (
          <li key={src} className="flex">
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Agrandir la photo ${i + 1} sur ${images.length}`}
              className={[
                "group relative w-full aspect-[3/4] overflow-hidden rounded-md",
                "border-[0.5px] border-white/40 bg-warm-500/10",
                "transition-all duration-200 ease-out",
                "hover:border-white/70",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
              ].join(" ")}
            >
              <Image
                src={src}
                alt={`${alt} — photo ${i + 1}`}
                fill
                sizes="(min-width: 640px) 140px, 30vw"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {activeIndex !== null && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-0 z-[60] bg-warm-900/10 backdrop-blur-md"
              onClick={close}
              aria-hidden="true"
            />

            <m.div
              ref={lightboxRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Photo ${activeIndex + 1} sur ${images.length}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10 pointer-events-none"
            >
              <div className="relative h-full w-full max-w-4xl pointer-events-auto rounded-xl overflow-hidden">
                <Image
                  key={images[activeIndex]}
                  src={images[activeIndex]}
                  alt={`${alt} — photo ${activeIndex + 1}`}
                  fill
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Fermer l'aperçu"
                className={`${LIGHTBOX_BUTTON_CLASS} absolute right-4 top-4 sm:right-6 sm:top-6`}
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Photo précédente"
                    className={`${LIGHTBOX_BUTTON_CLASS} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
                  >
                    <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Photo suivante"
                    className={`${LIGHTBOX_BUTTON_CLASS} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
                  >
                    <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
                  </button>

                  <div
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6",
                      "inline-flex items-center h-7 px-3 rounded-md",
                      "bg-[var(--glass-bg)]",
                      "backdrop-blur-xl backdrop-saturate-[1.8]",
                      "border-[0.5px] border-white/50",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                      "font-body text-xs font-medium text-warm-700",
                    ].join(" ")}
                  >
                    {activeIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
