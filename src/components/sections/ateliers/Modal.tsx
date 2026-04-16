"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Phone, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { association } from "@/data/ateliers";
import type { Atelier } from "@/types";
import { AtelierGallery } from "./Gallery";

type ModalProps = {
  atelier: Atelier | null;
  onClose: () => void;
};

function formatDateLong(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * AtelierModal — détail d'un atelier en surcouche au-dessus de la liste.
 *
 * Pattern calqué sur `temoignages/Modal.tsx` pour la cohérence visuelle
 * du site : backdrop blurred, panel glass centré, scale+fade in/out
 * via framer-motion, lock scroll body, close via Escape / backdrop / X.
 *
 * Structure interne :
 *   - header : tag theme + titre
 *   - description longue (scrollable si dépasse `max-h`)
 *   - bloc meta : date / durée / lieu (affichés seulement si renseignés)
 *   - highlights en liste à puces (si renseignés)
 *   - footer : CTA "Réserver au [tel]" → tel: de la présidente de l'asso
 *
 * Client Component — useEffect pour Escape + scroll lock, framer-motion.
 */
export function AtelierModal({ atelier, onClose }: ModalProps) {
  useEffect(() => {
    if (!atelier) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [atelier, onClose]);

  return (
    <AnimatePresence>
      {atelier && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-warm-900/10 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="atelier-modal-title"
            className={[
              "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-xl",
              "-translate-x-1/2 -translate-y-1/2",
              "p-6 sm:p-8",
              "rounded-xl",
              "bg-[var(--glass-bg)]",
              "backdrop-blur-xl backdrop-saturate-[1.8]",
              "border-[0.5px] border-white/50",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_12px_40px_-8px_rgba(60,30,25,0.25)]",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-warm-700 transition-colors hover:bg-warm-500/15 hover:text-warm-900"
            >
              <X className="w-5 h-5" strokeWidth={1.8} />
            </button>

            <header className="pr-10">
              {atelier.theme && (
                <span
                  className={[
                    "inline-flex items-center h-7 px-3 rounded-md",
                    "bg-warm-500/15 border-[0.5px] border-warm-500/35",
                    "font-body text-xs font-medium text-warm-700",
                  ].join(" ")}
                >
                  {atelier.theme}
                </span>
              )}
              <h2
                id="atelier-modal-title"
                className="mt-3 font-display text-2xl sm:text-3xl font-medium tracking-[-0.01em] leading-[1.15] text-warm-900"
              >
                {atelier.title}
              </h2>
            </header>

            <div className="mt-6 max-h-[55vh] overflow-y-auto pr-1 scroll-elegant">
              <p className="font-body text-sm leading-relaxed text-warm-700 whitespace-pre-line">
                {atelier.longDescription}
              </p>

              {atelier.highlights && atelier.highlights.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {atelier.highlights.map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 font-body text-sm leading-relaxed text-warm-700 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {atelier.images && atelier.images.length > 0 && (
                <div className="mt-6">
                  <AtelierGallery images={atelier.images} alt={atelier.title} />
                </div>
              )}

              {(atelier.date || atelier.duration || atelier.location) && (
                <ul className="mt-6 space-y-2.5 border-t border-warm-500/20 pt-5 font-body text-sm text-warm-700">
                  {atelier.date && (
                    <li className="flex items-center gap-2.5">
                      <CalendarDays
                        aria-hidden="true"
                        className="w-4 h-4 shrink-0 text-warm-700/70"
                        strokeWidth={1.5}
                      />
                      {formatDateLong(atelier.date)}
                    </li>
                  )}
                  {atelier.duration && (
                    <li className="flex items-center gap-2.5">
                      <Clock
                        aria-hidden="true"
                        className="w-4 h-4 shrink-0 text-warm-700/70"
                        strokeWidth={1.5}
                      />
                      {atelier.duration}
                    </li>
                  )}
                  <li className="flex items-start gap-2.5">
                    <MapPin
                      aria-hidden="true"
                      className="w-4 h-4 shrink-0 text-warm-700/70 mt-[3px]"
                      strokeWidth={1.5}
                    />
                    <span>
                      {atelier.location ?? `${association.name}, ${association.address}`}
                    </span>
                  </li>
                </ul>
              )}
            </div>

            <footer className="mt-6 flex flex-col items-center gap-3 border-t border-warm-500/20 pt-5">
              <ButtonLink
                href={association.phoneHref}
                variant="secondary-on-glass"
              >
                Infos et réservations au {association.phone}
                <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
              </ButtonLink>
              <p className="font-body text-xs text-warm-700/70 whitespace-nowrap">
                Adhésion annuelle à l&apos;association :{" "}
                {association.adhesionAmount}.
              </p>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
