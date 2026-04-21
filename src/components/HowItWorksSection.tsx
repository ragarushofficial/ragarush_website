"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const STEPS = [
  "Submit Your Requirement",
  "Consultation & Planning",
  "Creation",
  "Refinement",
  "Delivery",
] as const;

const NOTE_PATH =
  "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3z";

const SCATTER_NOTES = [
  { top: "6%", left: "3%", size: 0.85, rotate: "-12deg", opacity: 0.18 },
  { top: "18%", right: "5%", size: 0.65, rotate: "8deg", opacity: 0.14 },
  { top: "42%", left: "8%", size: 0.7, rotate: "6deg", opacity: 0.16 },
  { top: "55%", right: "10%", size: 0.55, rotate: "-5deg", opacity: 0.12 },
  { top: "72%", left: "4%", size: 0.6, rotate: "-9deg", opacity: 0.15 },
  { top: "88%", right: "6%", size: 0.75, rotate: "10deg", opacity: 0.14 },
] as const;

function TimelineConnectorH() {
  return (
    <div
      className="timeline-connector-glow-h pointer-events-none mt-7 hidden h-[2px] min-w-[0.75rem] flex-1 md:block"
      aria-hidden
    />
  );
}

function TimelineConnectorV({ className }: { className?: string }) {
  return (
    <div
      className={`timeline-connector-glow-v pointer-events-none absolute w-[2px] ${className ?? ""}`}
      aria-hidden
    />
  );
}

export function HowItWorksSection() {
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const stepAnim = () =>
    `transition-[opacity,transform] duration-700 ease-out ${
      reducedMotion ? "transition-none" : ""
    } ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="process-how-it-works scroll-mt-28 relative overflow-hidden rounded-3xl border border-secondary/12 bg-primary/26 px-5 py-16 shadow-[inset_0_1px_0_rgba(212,168,67,0.04)] backdrop-blur-sm sm:px-8 md:px-10 md:py-20 lg:px-12"
      aria-labelledby="how-it-works-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {SCATTER_NOTES.map((n, i) => (
          <svg
            key={i}
            className={`absolute text-secondary ${i >= 3 ? "hidden sm:block" : ""}`}
            style={{
              top: n.top,
              ...("left" in n ? { left: n.left } : {}),
              ...("right" in n ? { right: n.right } : {}),
              width: `${1.1 * n.size}rem`,
              height: `${1.75 * n.size}rem`,
              opacity: n.opacity,
              transform: `rotate(${n.rotate})`,
            }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d={NOTE_PATH} />
          </svg>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2
          id="how-it-works-heading"
          className="font-heading text-center text-2xl text-cream sm:text-3xl md:text-4xl"
        >
          How It Works
        </h2>
        <p className="font-sans mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-cream/75 md:text-base">
          A clear path from your first idea to the final master — five thoughtful steps.
        </p>

        {/* Mobile: vertical timeline */}
        <div className="relative mt-12 md:hidden">
          <TimelineConnectorV className="bottom-8 left-[1.75rem] top-8" />

          <ol className="relative space-y-10">
            {STEPS.map((title, index) => (
              <li
                key={title}
                className={`relative flex gap-4 ${stepAnim()}`}
                style={{
                  transitionDelay: reducedMotion ? "0ms" : `${index * 110}ms`,
                }}
              >
                <div
                  className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-[#0d0a1a]/95 font-heading text-lg font-semibold text-secondary shadow-[0_0_20px_rgba(212,168,67,0.25),inset_0_0_12px_rgba(212,168,67,0.12)]"
                  aria-hidden
                >
                  {index + 1}
                </div>
                <div className="min-w-0 pt-2">
                  <h3 className="font-heading text-lg leading-snug text-cream">{title}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop: horizontal timeline — connectors between step columns */}
        <div className="relative mt-14 hidden md:flex md:w-full md:items-start md:justify-center md:gap-0 md:px-1 lg:px-2">
          {STEPS.map((title, index) => (
            <Fragment key={title}>
              {index > 0 && <TimelineConnectorH />}
              <div
                className={`flex min-w-0 flex-1 flex-col items-center px-1 ${stepAnim()}`}
                style={{
                  transitionDelay: reducedMotion ? "0ms" : `${index * 110}ms`,
                }}
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-[#0d0a1a]/95 font-heading text-lg font-semibold text-secondary shadow-[0_0_22px_rgba(212,168,67,0.28),inset_0_0_14px_rgba(212,168,67,0.12)]"
                  aria-hidden
                >
                  {index + 1}
                </div>
                <h3 className="font-heading mt-4 max-w-[11rem] text-center text-[0.78rem] leading-snug text-cream sm:text-[0.82rem] lg:text-[0.95rem]">
                  {title}
                </h3>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
