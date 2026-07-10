"use client";

import { useCallback, useRef, useState } from "react";

export type AudioSampleCardProps = {
  title: string;
  subtitle: string;
  /** TODO: replace with real sample audio file */
  src: string;
};

function IconPlay({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l11.07-6.86a1 1 0 000-1.68L9.54 4.3A1 1 0 008 5.14z" />
    </svg>
  );
}

function IconPause({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

export function AudioSampleCard({ title, subtitle, src }: AudioSampleCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  const handleEnded = useCallback(() => setIsPlaying(false), []);

  return (
    <article className="audio-sample-card group relative flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-6">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/45 bg-secondary/15 text-secondary shadow-[0_0_20px_rgba(212,168,67,0.2)] transition hover:border-secondary/70 hover:bg-secondary/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          {isPlaying ? (
            <IconPause className="h-5 w-5" />
          ) : (
            <IconPlay className="h-5 w-5 translate-x-0.5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg leading-snug text-cream sm:text-xl">{title}</h3>
          <p className="mt-1 font-sans text-sm leading-relaxed text-cream/75 sm:text-[0.95rem]">
            {subtitle}
          </p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onEnded={handleEnded}
        onPause={() => setIsPlaying(false)}
        className="w-full accent-secondary"
        controls
        aria-label={`Audio player for ${title}`}
      />
    </article>
  );
}
