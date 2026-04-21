"use client";

import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    title: "Emotion + Cultural Authenticity",
    description:
      "We capture the true essence of Marathi and Hindi expression.",
    Icon: IconHeart,
  },
  {
    title: "Personalized Service",
    description: "We listen, understand, and refine until it feels just right.",
    Icon: IconConversation,
  },
  {
    title: "Studio-Grade Quality",
    description: "Clear, polished, professional sound across all platforms.",
    Icon: IconWaveform,
  },
  {
    title: "Premium Yet Affordable",
    description:
      "The perfect balance between expensive studios and generic outputs.",
    Icon: IconBalance,
  },
] as const;

function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.35l-1.45-1.32C5.4 13.36 2 10.28 2 6.5 2 4.42 3.42 3 5.5 3c1.74 0 3.41 1.01 4.5 2.09C10.59 4.01 12.26 3 14 3 16.58 3 18 4.42 18 6.5c0 3.78-3.4 6.86-8.55 12.54L12 20.35z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconConversation({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.84L3 20l1.55-3.47A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWaveform({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12v-1M8 8v8M12 5v14M16 9v6M20 11v2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBalance({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v18M5 8h14M8 8v5a4 4 0 008 0V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhyRagaRush() {
  const [visible, setVisible] = useState([false, false, false, false]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    if (mq.matches) {
      setVisible([true, true, true, true]);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const nodes = section.querySelectorAll<HTMLElement>("[data-why-card]");
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-why-card"));
          if (Number.isNaN(idx)) return;
          setVisible((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-raga-rush"
      ref={sectionRef}
      className="why-raga-rush scroll-mt-28 relative overflow-hidden rounded-3xl border border-secondary/15 bg-primary/28 px-5 py-16 shadow-[inset_0_1px_0_rgba(212,168,67,0.05)] sm:px-8 md:px-10 md:py-20 lg:px-12"
      aria-labelledby="why-raga-rush-heading"
    >
      {/* Off-center rose-gold decorative glow */}
      <div
        className="pointer-events-none absolute -right-[18%] top-[8%] h-[min(85vw,32rem)] w-[min(85vw,32rem)] rounded-full bg-[radial-gradient(circle_at_35%_40%,rgba(232,200,130,0.45)_0%,rgba(201,85,107,0.22)_42%,transparent_68%)] blur-[64px] md:-right-[12%] md:top-[12%] md:blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[20%] -left-[15%] h-[min(70vw,24rem)] w-[min(70vw,24rem)] rounded-full bg-[radial-gradient(circle_at_60%_50%,rgba(201,85,107,0.18)_0%,transparent_55%)] blur-[56px] opacity-90"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2
          id="why-raga-rush-heading"
          className="font-heading text-center text-2xl text-cream sm:text-3xl md:text-4xl"
        >
          Why Raga Rush?
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-11 sm:grid-cols-2 sm:gap-10 lg:mt-16 lg:grid-cols-4 lg:gap-10">
          {FEATURES.map((item, index) => {
            const Icon = item.Icon;
            const isVisible = visible[index];
            return (
              <div
                key={item.title}
                data-why-card={index}
                className={`flex flex-col items-center text-center will-change-transform ${
                  reducedMotion
                    ? "transition-none"
                    : "transition-[opacity,transform] duration-700 ease-out"
                } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{
                  transitionDelay: reducedMotion ? "0ms" : `${index * 90}ms`,
                }}
              >
                <div
                  className="why-raga-icon-ring mb-5 flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-full border-2 border-secondary/90 text-secondary shadow-[inset_0_0_28px_rgba(212,168,67,0.22),0_0_24px_rgba(212,168,67,0.18),0_0_1px_rgba(212,168,67,0.6)]"
                  aria-hidden
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-lg leading-snug text-secondary md:text-xl">
                  {item.title}
                </h3>
                <p className="font-sans mt-3 text-[0.95rem] leading-relaxed text-cream md:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
