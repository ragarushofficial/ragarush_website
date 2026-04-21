const PROMISES = [
  "Music that feels personal and real",
  "Quality you can trust",
  "Service that truly listens",
  "Pricing that stays practical",
] as const;

function GoldQuotationMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 44"
      fill="currentColor"
      aria-hidden
    >
      <text
        x="4"
        y="36"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="38"
        fontWeight={600}
        opacity={0.72}
      >
        “
      </text>
    </svg>
  );
}

export function OurPromiseSection() {
  return (
    <section
      id="our-promise"
      className="our-promise-section scroll-mt-28 rounded-3xl border border-secondary/15 bg-primary/28 px-5 py-16 shadow-[inset_0_1px_0_rgba(212,168,67,0.05)] backdrop-blur-sm sm:px-8 md:px-10 md:py-20 lg:px-12"
      aria-labelledby="our-promise-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="our-promise-heading"
          className="font-heading text-center text-2xl text-cream sm:text-3xl md:text-4xl"
        >
          Our Promise
        </h2>
        <p className="font-sans mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-cream/75 md:text-base">
          Four commitments we stand by — in every session and every song.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
          {PROMISES.map((text) => (
            <article
              key={text}
              className="promise-quote-card relative overflow-hidden rounded-2xl border border-secondary/20 bg-white/[0.04] px-6 pb-7 pt-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <GoldQuotationMark className="pointer-events-none absolute left-5 top-5 h-10 w-10 text-secondary opacity-[0.55] drop-shadow-[0_0_12px_rgba(212,168,67,0.35)] md:h-11 md:w-11" />
              <p className="font-sans relative z-[1] pl-1 text-lg italic leading-relaxed text-cream/92 md:text-[1.05rem]">
                <span className="mr-1.5 text-secondary not-italic opacity-90" aria-hidden>
                  ✔
                </span>
                {text}
              </p>
              <div
                className="promise-card-underline mt-5 h-px max-w-[10rem] bg-gradient-to-r from-secondary via-secondary/70 to-transparent"
                aria-hidden
              />
            </article>
          ))}
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl text-center md:mt-20">
          <p className="text-[clamp(1.25rem,3.8vw,2.15rem)] leading-[1.5]">
            <span
              lang="hi"
              className="promise-tagline-shimmer font-devanagari block font-medium tracking-tight md:inline"
            >
              Har Kahani Ko Mile Apna Sur.
            </span>
            <span
              lang="en"
              className="promise-tagline-shimmer font-heading mt-2 block font-normal md:mt-0 md:inline md:pl-2"
            >
              {" "}
              — &ldquo;Only at Raga Rush.&rdquo;
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
