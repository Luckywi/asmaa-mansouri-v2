"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { Play, Pause, X } from "lucide-react";
import { useFocusTrap } from "@/lib/useFocusTrap";

const VIDEO_SRC = "/temoignages/temoignage-video.mp4";
const POSTER_SRC = "/temoignages/temoignage-poster.jpg";

// TODO a11y : fournir sous-titres (<track kind="captions" src="…/temoignage-video.fr.vtt"
// srclang="fr" label="Français">) et/ou transcription textuelle (WCAG 1.2.2 A).
// À produire avec Asmaa avant mise en ligne publique.

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ─── Modale player (mobile / tablette uniquement) ─────────── */

function VideoModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  // `playing=true` dès le render initial : la modale est toujours ouverte
  // par un user gesture (tap miniature), on lance la vidéo immédiatement
  // dans l'effet d'en bas. Initialiser à `true` évite le flash Play→Pause
  // au mount.
  const [playing, setPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useFocusTrap(true, dialogRef);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const seekTo = useCallback(
    (clientX: number) => {
      const bar = progressRef.current;
      const v = videoRef.current;
      if (!bar || !v || !duration) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      v.currentTime = ratio * duration;
    },
    [duration],
  );

  const dragging = useRef(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      seekTo(e.clientX);
    },
    [seekTo],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      seekTo(e.clientX);
    },
    [seekTo],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const v = videoRef.current;
      if (!v || !duration) return;
      const step = 5;
      let nextTime: number | null = null;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          nextTime = Math.min(duration, v.currentTime + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          nextTime = Math.max(0, v.currentTime - step);
          break;
        case "Home":
          nextTime = 0;
          break;
        case "End":
          nextTime = duration;
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          togglePlay();
          return;
      }
      if (nextTime !== null) {
        e.preventDefault();
        v.currentTime = nextTime;
      }
    },
    [duration, togglePlay],
  );

  const pct = duration ? (current / duration) * 100 : 0;

  return (
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
        aria-label="Témoignage vidéo"
        className={[
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100%-2rem)] max-w-sm",
          "flex flex-col overflow-hidden",
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
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-warm-900/50 text-white backdrop-blur-sm transition-colors hover:bg-warm-900/70"
        >
          <X className="w-5 h-5" strokeWidth={1.8} />
        </button>

        <div className="relative aspect-[9/16] bg-warm-900/5">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            preload="none"
            playsInline
            aria-label="Témoignage vidéo"
            onClick={togglePlay}
            onTimeUpdate={() => setCurrent(videoRef.current?.currentTime ?? 0)}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
            onEnded={() => setPlaying(false)}
            className="absolute inset-0 h-full w-full object-cover cursor-pointer"
          />

          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Mettre en pause" : "Lire la vidéo"}
            className={[
              "absolute inset-0 z-10 flex items-center justify-center",
              "transition-opacity duration-300",
              playing ? "opacity-0 hover:opacity-100" : "opacity-100",
            ].join(" ")}
          >
            <span className="flex items-center justify-center h-16 w-16 rounded-full bg-warm-900/50 text-white backdrop-blur-sm">
              {playing ? (
                <Pause className="w-7 h-7" fill="currentColor" stroke="none" />
              ) : (
                <Play className="w-7 h-7 translate-x-0.5" fill="currentColor" stroke="none" />
              )}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Lecture"}
            className="shrink-0 text-warm-700 transition-colors hover:text-warm-900"
          >
            {playing ? (
              <Pause className="w-4 h-4" fill="currentColor" stroke="none" />
            ) : (
              <Play className="w-4 h-4 translate-x-px" fill="currentColor" stroke="none" />
            )}
          </button>

          <div
            ref={progressRef}
            role="slider"
            tabIndex={0}
            aria-label="Progression de la vidéo"
            aria-valuemin={0}
            aria-valuemax={Math.max(0, Math.floor(duration))}
            aria-valuenow={Math.floor(current)}
            aria-valuetext={`${formatTime(current)} sur ${formatTime(duration)}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={onKeyDown}
            className="relative flex-1 h-1.5 rounded-full bg-warm-500/20 cursor-pointer touch-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-700"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-warm-700 transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>

          <span className="shrink-0 font-body text-xs tabular-nums text-warm-700/80">
            {formatTime(current)}/{formatTime(duration)}
          </span>
        </div>
      </m.div>
    </>
  );
}

/* ─── Player inline desktop ────────────────────────────────── */

function DesktopPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <div
      className={[
        "relative overflow-hidden",
        "aspect-[9/16]",
        "rounded-md",
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
      ].join(" ")}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        preload="none"
        playsInline
        aria-label="Témoignage vidéo"
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover rounded-md"
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mettre en pause" : "Lire la vidéo"}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <span
          className={[
            "flex items-center justify-center",
            "h-14 w-14 rounded-full",
            "bg-warm-900/60 backdrop-blur-sm",
            "text-white",
            "transition-opacity duration-300",
            playing ? "opacity-0 hover:opacity-100" : "opacity-100",
          ].join(" ")}
        >
          {playing ? (
            <Pause className="w-6 h-6" fill="currentColor" stroke="none" />
          ) : (
            <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" stroke="none" />
          )}
        </span>
      </button>
    </div>
  );
}

/* ─── Miniature mobile (ouvre la modale) ───────────────────── */

function MobileThumbnail({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Voir le témoignage vidéo"
      className={[
        "group relative overflow-hidden w-full text-left",
        "aspect-[4/5]",
        "rounded-md",
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
        "hover:border-white/70",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
      ].join(" ")}
    >
      <Image
        src={POSTER_SRC}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 220px, 180px"
        className="absolute inset-0 h-full w-full object-cover rounded-md pointer-events-none"
      />

      <span className="absolute inset-0 z-10 flex items-center justify-center">
        <span className="flex items-center justify-center h-14 w-14 rounded-full bg-warm-900/60 text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
          <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" stroke="none" />
        </span>
      </span>
    </button>
  );
}

/* ─── Export : routing desktop / mobile ────────────────────── */

export function VideoCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop : player inline dans la grille */}
      <div className="hidden lg:block">
        <DesktopPlayer />
      </div>

      {/* Mobile / tablette : miniature → modale */}
      <div className="lg:hidden">
        <MobileThumbnail onOpen={() => setOpen(true)} />
      </div>

      <AnimatePresence>
        {open && <VideoModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
