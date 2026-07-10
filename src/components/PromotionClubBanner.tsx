import Link from "next/link";

export function PromotionClubBanner() {
  return (
    <aside
      className="promotion-club-banner relative overflow-hidden rounded-2xl border border-secondary/22 px-4 py-4 shadow-[0_0_0_1px_rgba(212,168,67,0.06),0_8px_32px_rgba(13,10,26,0.35)] sm:px-6 sm:py-5"
      aria-label="Raga Rush Promotion Club"
    >
      <div
        className="promotion-club-gold-pattern pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#140d1c]/95 via-[#100818]/92 to-[#140d1c]/95"
        aria-hidden
      />

      <Link
        href="/promotion-club"
        className="group relative z-10 flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-2 py-2 text-center transition-colors hover:text-secondary sm:gap-3"
      >
        <span className="text-secondary/75 transition-colors group-hover:text-secondary" aria-hidden>
          ✦
        </span>
        <span className="font-sans text-sm leading-snug text-cream/88 sm:text-[0.9375rem] md:text-base">
          Earn rewards — join the Raga Rush Promotion Club
        </span>
        <span
          className="shrink-0 text-secondary/90 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        >
          →
        </span>
      </Link>
    </aside>
  );
}
