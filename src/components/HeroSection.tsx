import { RagaRushLogoSvg } from "@/components/brand/RagaRushLogoSvg";
import { HeroFloatingNotes } from "@/components/HeroFloatingNotes";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";

// TODO: replace with real numbers
const SONGS_DELIVERED = 150;
const CLIENT_RATING = 4.9;
const HUMAN_PRODUCED_PERCENT = 100;

const TRUST_STATS = [
  { value: `${SONGS_DELIVERED}+`, label: "songs delivered" },
  { value: `${CLIENT_RATING}★`, label: "client rating" },
  { value: `${HUMAN_PRODUCED_PERCENT}%`, label: "human-produced" },
] as const;

export function HeroSection() {
  return (
    <section
      id="home"
      className="hero-section relative flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-6 sm:px-6 md:min-h-[calc(100svh-5rem)] md:px-10 md:pb-20 md:pt-8"
      aria-label="Raga Rush introduction"
    >
      {/* Slow cinematic gradient + static candlelit warmth */}
      <div className="hero-cinematic-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-cinematic-warmth absolute inset-0" aria-hidden />
      <div className="hero-candle-vignette absolute inset-x-0 bottom-0 h-[38%] max-h-[min(22rem,45vh)]" aria-hidden />

      <HeroFloatingNotes />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <div className="mb-8 flex w-full justify-center md:mb-10">
          <RagaRushLogoSvg className="block h-[52px] w-[200px] md:h-[72px] md:w-[280px]" />
        </div>
        {/* Rose-gold radial aura behind heading */}
        <div className="relative w-full px-1 sm:px-2">
          <div className="hero-heading-aura pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <h1
            lang="hi"
            className="hero-title-shimmer font-devanagari relative z-10 mx-auto max-w-5xl text-[clamp(1.75rem,5.8vw,3.75rem)] font-semibold leading-[1.28] tracking-tight sm:leading-[1.25] md:leading-[1.2]"
          >
            Har Kahani Ko Mile Apna Sur
          </h1>
        </div>

        <p className="font-heading mt-7 max-w-2xl text-base italic leading-relaxed text-cream/[0.94] sm:mt-9 sm:text-xl md:text-2xl md:leading-relaxed">
          Every Story Deserves Its Own Melody
        </p>

        <p className="mt-4 flex max-w-xl items-start justify-center gap-2.5 px-1 sm:mt-5 sm:max-w-2xl sm:items-center">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-secondary/80 sm:mt-0"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="0.85" opacity="0.55" />
            <path
              d="M6.5 10.25l2.1 2.1 5-5.2"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5 4.5l.65 1.35 1.35.65-1.35.65-.65 1.35-.65-1.35-1.35-.65 1.35-.65.65-1.35z"
              fill="currentColor"
              opacity="0.75"
            />
          </svg>
          <span className="font-sans text-left text-[0.8125rem] leading-[1.65] text-cream/62 sm:text-center sm:text-sm sm:leading-relaxed">
            Every track is AI-accelerated, human-produced — a real producer refines every song
            before it reaches you.
          </span>
        </p>

        <div className="mt-6 flex justify-center sm:mt-7" aria-hidden>
          <svg
            className="h-5 w-28 text-secondary/50 sm:h-6 sm:w-32"
            viewBox="0 0 120 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 14c18-10 34-10 56 0s38 10 56 0"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d="M52 4c6 8 10 12 16 12s10-4 16-12"
              stroke="currentColor"
              strokeWidth="0.65"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>
        </div>

        <p className="font-sans mt-6 max-w-2xl text-[0.9375rem] leading-[1.75] text-cream/85 sm:mt-7 sm:text-base md:text-lg md:leading-relaxed">
          We blend modern sound with the richness of Indian storytelling to create songs that feel
          deeply personal.
        </p>

        <div className="mt-12 flex w-full max-w-lg flex-col items-stretch gap-3 sm:mt-14 sm:max-w-none sm:flex-row sm:justify-center sm:gap-6">
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.heroGeneral)}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-start-song inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-8 py-3 text-center font-medium text-[#0d0a1a] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            Let&apos;s Create It
          </a>
          <a
            href="#services"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-secondary/70 bg-white/[0.04] px-8 py-3 text-center font-medium text-secondary shadow-[inset_0_1px_0_rgba(255,248,231,0.06)] backdrop-blur-[2px] transition-colors hover:border-secondary hover:bg-secondary/[0.12] sm:w-auto"
          >
            Explore Services
          </a>
        </div>

        <ul
          className="mt-8 grid w-full max-w-xl grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 shadow-[inset_0_1px_0_rgba(212,168,67,0.08)] backdrop-blur-sm sm:mt-10 sm:gap-0 sm:px-6"
          aria-label="Trust indicators"
        >
          {TRUST_STATS.map((stat, index) => (
            <li
              key={stat.label}
              className={`flex flex-col items-center px-1 text-center sm:px-4 ${
                index < TRUST_STATS.length - 1
                  ? "border-r border-secondary/20"
                  : ""
              }`}
            >
              <span className="font-heading text-base leading-none text-secondary sm:text-xl">
                {stat.value}
              </span>
              <span className="mt-1 font-sans text-[0.625rem] uppercase leading-tight tracking-[0.1em] text-cream/55 sm:text-xs sm:tracking-[0.12em]">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
