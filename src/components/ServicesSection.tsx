import { ServicesTabbedGrid } from "@/components/ServicesTabbedGrid";

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

        <ServicesTabbedGrid />
      </div>
    </section>
  );
}
