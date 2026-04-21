"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Play, Pause } from "lucide-react";

const AUDIO_SRC = "/temoignages/temoignage-audio.m4a";
const BAR_COUNT = 40;

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const x = (i / BAR_COUNT) * Math.PI * 4;
  return 0.25 + 0.75 * Math.abs(Math.sin(x + 1.2) * Math.cos(x * 0.7 + 0.5));
});

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function AudioCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  }, []);

  const pct = duration ? current / duration : 0;
  const filledBars = Math.floor(pct * BAR_COUNT);

  const dragging = useRef(false);

  const seekTo = useCallback(
    (clientX: number) => {
      const wave = waveRef.current;
      const a = audioRef.current;
      if (!wave || !a || !duration) return;
      const rect = wave.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      a.currentTime = ratio * duration;
    },
    [duration],
  );

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

  return (
    <div
      className={[
        "flex items-center gap-3 p-4",
        "rounded-md",
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
      ].join(" ")}
    >
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => {
          setPlaying(false);
          if (audioRef.current) audioRef.current.currentTime = 0;
        }}
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mettre en pause" : "Écouter le témoignage"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-warm-700 text-white transition-colors hover:bg-warm-900"
      >
        {playing ? (
          <Pause className="w-4 h-4" fill="currentColor" stroke="none" />
        ) : (
          <Play className="w-4 h-4 translate-x-0.5" fill="currentColor" stroke="none" />
        )}
      </button>

      <div
        ref={waveRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex flex-1 items-center gap-[2px] h-10 cursor-pointer touch-none"
      >
        {BARS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-colors duration-150"
            style={{
              height: `${h * 100}%`,
              backgroundColor:
                i <= filledBars
                  ? "var(--color-warm-700)"
                  : "color-mix(in oklch, var(--color-warm-500) 30%, transparent)",
            }}
          />
        ))}
      </div>

      <span className="shrink-0 font-body text-xs tabular-nums text-warm-700/70">
        {playing || current > 0 ? formatTime(current) : formatTime(duration)}
      </span>
    </div>
  );
}
