function GoldCheck({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-secondary/55 bg-secondary/[0.09] text-secondary shadow-[0_0_14px_rgba(212,168,67,0.28)] ${className ?? ""}`}
      aria-hidden
    >
      <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6L5 8.5L9.5 3"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const DELIVERABLES = [
  "High-quality audio (MP3 & WAV)",
  "Final lyrics document",
  "Ready-to-share formats",
  "Optional video/reel version",
] as const;

const USAGE_RIGHTS = [
  "Lifetime usage for personal sharing",
  "Safe for social media platforms",
  "Commercial usage options available",
] as const;

export function DeliverySection() {
  return (
    <section
      id="delivery"
      className="delivery-section scroll-mt-28 relative overflow-hidden rounded-3xl border border-secondary/12 px-5 py-14 shadow-[inset_0_1px_0_rgba(212,168,67,0.04)] sm:px-8 md:px-10 md:py-16 lg:px-12"
      aria-labelledby="delivery-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#221432] via-[#140d20] to-[#1a1028]"
        aria-hidden
      />
      <div className="delivery-staff-pattern pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl">
        <h2
          id="delivery-heading"
          className="font-heading text-center text-2xl text-cream sm:text-3xl md:text-4xl"
        >
          What You Get
        </h2>
        <p className="font-sans mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-cream/75 md:text-base">
          Every delivery is polished, documented, and ready to share — with clarity on how you can use it.
        </p>

        <div className="relative mt-10 grid grid-cols-1 gap-10 sm:mt-12 sm:grid-cols-2 sm:gap-12 lg:gap-16">
          {/* Decorative vertical divider (tablet+) */}
          <div
            className="pointer-events-none absolute left-1/2 top-2 z-[1] hidden h-[calc(100%-0.5rem)] w-px -translate-x-1/2 sm:block"
            aria-hidden
          >
            <div className="h-full w-full bg-gradient-to-b from-transparent via-secondary/75 to-transparent shadow-[0_0_12px_rgba(212,168,67,0.35)]" />
          </div>

          <div className="relative z-10 sm:pr-4 lg:pr-8">
            <p className="font-heading mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-secondary/90">
              Delivery
            </p>
            <ul className="flex flex-col gap-4">
              {DELIVERABLES.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <GoldCheck className="mt-0.5" />
                  <span className="font-sans text-[0.95rem] leading-relaxed text-cream/90 md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 border-t border-white/10 pt-8 sm:border-t-0 sm:pt-0 sm:pl-4 lg:pl-8">
            <p className="font-heading mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-secondary/90">
              Usage &amp; Rights
            </p>
            <ul className="flex flex-col gap-4">
              {USAGE_RIGHTS.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <GoldCheck className="mt-0.5" />
                  <span className="font-sans text-[0.95rem] leading-relaxed text-cream/90 md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
