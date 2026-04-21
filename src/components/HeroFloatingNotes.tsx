/** Single note (filled), Material-style, 24×24 viewBox */
const NOTE_PATH =
  "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3z";

/** 7 notes: slow, varied drift — indices ≥4 hidden below `sm` (640px) to reduce mobile work */
const FLOATING_NOTES = [
  { left: "8%", delay: "0s", duration: "32s", scale: 0.75 },
  { left: "22%", delay: "3s", duration: "38s", scale: 0.6 },
  { left: "38%", delay: "1s", duration: "28s", scale: 0.85 },
  { left: "52%", delay: "6s", duration: "34s", scale: 0.55 },
  { left: "65%", delay: "2s", duration: "30s", scale: 0.7 },
  { left: "78%", delay: "4s", duration: "36s", scale: 0.65 },
  { left: "92%", delay: "1.5s", duration: "33s", scale: 0.58 },
] as const;

export function HeroFloatingNotes() {
  return (
    <div
      className="hero-notes pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {FLOATING_NOTES.map((note, i) => (
        <svg
          key={i}
          className={`hero-floating-note absolute text-secondary ${i >= 4 ? "hidden sm:block" : ""}`}
          style={{
            left: note.left,
            bottom: "-8%",
            width: `${1.25 * note.scale}rem`,
            height: `${2 * note.scale}rem`,
            opacity: 0.22,
            animationDuration: note.duration,
            animationDelay: note.delay,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={NOTE_PATH} />
        </svg>
      ))}
    </div>
  );
}
