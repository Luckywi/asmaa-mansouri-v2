"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ExternalLink, Star, X } from "lucide-react";
import { site } from "@/data/site";
import type { Temoignage } from "@/types";
import { useFocusTrap } from "@/lib/useFocusTrap";

type ModalProps = {
  temoignage: Temoignage | null;
  onClose: () => void;
};

const SOURCE_LABELS: Record<NonNullable<Temoignage["source"]>, string> = {
  resalib: "Resalib",
  google: "Google",
};

function getSourceUrl(source: NonNullable<Temoignage["source"]>): string {
  return source === "resalib" ? site.resalibReviewsUrl : site.googleReviewsUrl;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

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
 * TemoignageModal — détail d'un avis en surcouche au-dessus de la liste.
 *
 * Ouverte depuis le bouton "Voir plus" de chaque Card. Affiche l'avatar,
 * le nom, les étoiles, le texte intégral (scrollable si très long), et un
 * footer avec la date + source + bouton "Voir le commentaire" qui renvoie
 * vers la fiche Resalib ou Google d'Asmaa.
 *
 * Motion : AnimatePresence pour fade/scale à l'ouverture et à la fermeture
 * (framer-motion déjà utilisé ailleurs dans le projet). Lock scroll body
 * + Escape pour fermer, backdrop cliquable pour fermer.
 *
 * Client Component — nécessite useEffect et framer-motion.
 */
export function TemoignageModal({ temoignage, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(Boolean(temoignage), dialogRef);

  useEffect(() => {
    if (!temoignage) return;

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
  }, [temoignage, onClose]);

  return (
    <AnimatePresence>
      {temoignage && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-warm-900/10 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <m.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="temoignage-modal-title"
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

            <header className="flex items-center gap-4 pr-8">
              <div
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-warm-500/15 font-display text-sm font-medium text-warm-700"
              >
                {getInitials(temoignage.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  id="temoignage-modal-title"
                  className="font-display text-base font-medium text-warm-900"
                >
                  {temoignage.name}
                </p>
                {temoignage.role && (
                  <p className="font-body text-xs text-warm-700/80 mt-0.5">
                    {temoignage.role}
                  </p>
                )}
                <div
                  className="mt-1 flex gap-0.5"
                  aria-label={`Note : ${temoignage.rating ?? 5} sur 5`}
                >
                  {Array.from({ length: temoignage.rating ?? 5 }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-warm-700"
                      fill="currentColor"
                      stroke="none"
                    />
                  ))}
                </div>
              </div>
            </header>

            <p className="mt-6 max-h-[50vh] overflow-y-auto pr-1 scroll-elegant font-body text-sm leading-relaxed text-warm-700 whitespace-pre-line">
              {temoignage.body}
            </p>

            <footer className="mt-6 flex flex-col gap-4 border-t border-warm-500/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="shrink-0 whitespace-nowrap font-body text-xs text-warm-700/80">
                {temoignage.date
                  ? `Publié le ${formatDateLong(temoignage.date)} via ${
                      SOURCE_LABELS[temoignage.source ?? "resalib"]
                    }`
                  : `Avis publié sur ${
                      SOURCE_LABELS[temoignage.source ?? "resalib"]
                    }`}
              </p>
              {/*
                Recette "secondary-on-glass" (cf. ButtonLink.tsx) :
                identique à secondary mais sans backdrop-filter — pour
                que le bouton ressorte clair sur le cream du modal
                au lieu de se diluer. Conservé inline ici (pas passé
                par ButtonLink) parce que la taille est volontairement
                compacte (text-xs, px-4 py-2) vs les CTA standards du
                ButtonLink (h-10, text-[14px]).
              */}
              <Link
                href={getSourceUrl(temoignage.source ?? "resalib")}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
                  "rounded-md px-4 py-2",
                  "font-body text-xs font-medium",
                  "text-warm-700 bg-[var(--glass-bg)]",
                  "border-[0.5px] border-white/50",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                  "transition-colors hover:border-white/70 hover:text-warm-900",
                ].join(" ")}
              >
                Voir le commentaire
                <ExternalLink
                  className="w-3.5 h-3.5 shrink-0"
                  strokeWidth={2}
                />
              </Link>
            </footer>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
