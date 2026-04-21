"use client";

export function OrderSuccessCheckmark({ className }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32 ${className ?? ""}`}
    >
      <svg
        className="h-full w-full drop-shadow-[0_0_24px_rgba(212,168,67,0.45)]"
        viewBox="0 0 88 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="order-check-gold" x1="6" y1="6" x2="82" y2="82">
            <stop stopColor="#fff8e7" />
            <stop offset="0.45" stopColor="#d4a843" />
            <stop offset="1" stopColor="#b8892a" />
          </linearGradient>
        </defs>
        <circle
          className="order-success-check-circle"
          cx="44"
          cy="44"
          r="38"
          stroke="url(#order-check-gold)"
          strokeWidth="3"
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
        />
        <path
          className="order-success-check-path"
          d="M26 44.5 L38.5 57 L62 33"
          stroke="url(#order-check-gold)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden
      />
    </div>
  );
}
