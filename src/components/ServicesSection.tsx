const SERVICES = [
  {
    icon: "💒",
    title: "Your Story Song™",
    description: "Weddings, birthdays, anniversaries, lullabies — bespoke songs that honour your milestones.",
  },
  {
    icon: "✍️",
    title: "Poem-to-Song (Kavita-to-Kriti)",
    description: "Poetry to song in Marathi, Hindi, or English — your words, arranged with care.",
  },
  {
    icon: "📣",
    title: "Brand & Business Audio",
    description: "Jingles, ads, corporate anthems, and podcast branding that sounds unmistakably you.",
  },
  {
    icon: "🎸",
    title: "Creator & Theme Music",
    description: "Intros, outros, and themes across Sufi, Pop, Rock, Lo-fi, and beyond.",
  },
  {
    icon: "🎭",
    title: "Media & Performance Scoring",
    description: "Theatre, short films, and dance — scores and stems, BPM-matched to movement.",
  },
  {
    icon: "🧘",
    title: "Wellness & Lifestyle Soundscapes",
    description: "Gym, yoga, meditation, and focus music — immersive beds for body and mind.",
  },
  {
    icon: "💌",
    title: "Musical Invites & Tributes",
    description: "Audio invitations and tribute songs crafted to move hearts before the first note fades.",
  },
] as const;

function MandalaOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
      <svg
        className="services-mandala-svg h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 400"
      >
        <defs>
          <pattern id="rr-mandala" width="200" height="200" patternUnits="userSpaceOnUse">
            <g
              fill="none"
              stroke="#d4a843"
              strokeOpacity="1"
              strokeWidth="0.4"
              transform="translate(100 100)"
            >
              <circle r="88" />
              <circle r="68" />
              <circle r="48" />
              <circle r="28" />
              <path d="M0-92 L0 92 M92 0 L-92 0 M65-65 L-65 65 M65 65 L-65-65" />
              <path d="M0-72 L72 0 M0 72 L-72 0 M72 0 L0-72 M-72 0 L0 72" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rr-mandala)" />
      </svg>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="services-section scroll-mt-28 relative overflow-hidden rounded-3xl border border-white/10 shadow-[inset_0_1px_0_rgba(212,168,67,0.06)] px-5 py-16 sm:px-8 md:px-10 md:py-20 lg:px-12 lg:py-24"
    >
      <div className="services-section-base pointer-events-none absolute inset-0 rounded-3xl" aria-hidden />
      <MandalaOverlay />
      <svg
        className="services-corner-ornament pointer-events-none absolute left-0 top-0 h-24 w-24 -translate-x-1/4 -translate-y-1/4 text-secondary/40 sm:h-28 sm:w-28"
        viewBox="0 0 96 96"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 88c22-32 22-56 0-80M8 88c28-18 52-18 80 0"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="services-corner-ornament pointer-events-none absolute bottom-0 right-0 h-24 w-24 translate-x-1/4 translate-y-1/4 rotate-180 text-secondary/40 sm:h-28 sm:w-28"
        viewBox="0 0 96 96"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 88c22-32 22-56 0-80M8 88c28-18 52-18 80 0"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mb-14 text-center md:mb-16">
          <h2 className="font-heading text-2xl tracking-tight text-cream sm:text-3xl md:text-4xl lg:text-[2.35rem]">
            Our Signature Services
          </h2>
          <div
            className="mx-auto mt-5 flex max-w-md items-center justify-center gap-3 md:mt-6"
            aria-hidden
          >
            <span className="h-px flex-1 max-w-[4.5rem] bg-gradient-to-r from-transparent to-secondary/90" />
            <span className="h-1 w-1 shrink-0 rounded-full bg-secondary shadow-[0_0_12px_rgba(212,168,67,0.65)]" />
            <span className="h-px flex-1 bg-secondary/85" />
            <span className="h-1 w-1 shrink-0 rounded-full bg-secondary shadow-[0_0_12px_rgba(212,168,67,0.65)]" />
            <span className="h-px flex-1 max-w-[4.5rem] bg-gradient-to-l from-transparent to-secondary/90" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((item, idx) => (
            <article
              key={item.title}
              className={`service-card group relative flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md md:p-7 ${
                idx === 6
                  ? "sm:col-span-2 sm:mx-auto sm:max-w-lg lg:col-span-1 lg:mx-0 lg:max-w-none lg:[&:nth-child(7)]:col-start-2"
                  : ""
              }`}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/35 bg-secondary/10 text-2xl shadow-[0_0_20px_rgba(212,168,67,0.18)]"
                aria-hidden
              >
                <span className="drop-shadow-[0_0_8px_rgba(212,168,67,0.45)]">{item.icon}</span>
              </div>
              <h3 className="font-heading text-xl leading-snug text-cream md:text-[1.35rem]">
                {item.title}
              </h3>
              <p className="font-sans mt-3 text-[0.95rem] leading-relaxed text-cream/84 md:text-base md:leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
