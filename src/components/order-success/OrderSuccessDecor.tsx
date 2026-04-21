"use client";

const NOTE_PATH =
  "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3z";

/** Subtle gold confetti + floating notes — respects prefers-reduced-motion via CSS */
export function OrderSuccessDecor() {
  const confetti = [
    { left: "8%", delay: "0s", dur: "2.8s" },
    { left: "22%", delay: "0.4s", dur: "3.2s" },
    { left: "45%", delay: "0.2s", dur: "2.5s" },
    { left: "68%", delay: "0.6s", dur: "3s" },
    { left: "82%", delay: "0.1s", dur: "2.7s" },
    { left: "55%", delay: "0.8s", dur: "3.4s" },
  ];

  const notes = [
    { left: "12%", bottom: "18%", scale: 0.55, delay: "0s", dur: "22s" },
    { left: "78%", bottom: "22%", scale: 0.48, delay: "2s", dur: "26s" },
    { left: "88%", bottom: "40%", scale: 0.42, delay: "1s", dur: "24s" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      {confetti.map((c, i) => (
        <span
          key={`c-${i}`}
          className="order-success-confetti absolute top-0 h-2 w-2 rounded-sm bg-gradient-to-br from-secondary to-[#f0d78c] shadow-[0_0_8px_rgba(212,168,67,0.6)]"
          style={{
            left: c.left,
            animationDelay: c.delay,
            animationDuration: c.dur,
          }}
        />
      ))}
      {notes.map((n, i) => (
        <svg
          key={`n-${i}`}
          className="hero-floating-note absolute text-secondary"
          style={{
            left: n.left,
            bottom: n.bottom,
            width: `${1.1 * n.scale}rem`,
            height: `${1.75 * n.scale}rem`,
            opacity: 0.16,
            animationDuration: n.dur,
            animationDelay: n.delay,
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
