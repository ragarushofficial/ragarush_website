import type { ReactNode } from "react";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";

function HeadingSparkles() {
  return (
    <div
      className="pointer-events-none absolute -left-2 top-1/2 flex -translate-y-1/2 gap-1 md:-left-8 md:gap-1.5"
      aria-hidden
    >
      <svg
        className="h-6 w-6 text-secondary opacity-90 md:h-8 md:w-8"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l1.2 4.2L17 8l-3.8 1.8L12 14l-1.2-4.2L7 8l3.8-1.8L12 2z" />
      </svg>
      <svg
        className="h-4 w-4 translate-y-1 text-secondary/75 md:h-5 md:w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 1l1.5 5.5L19 9l-5.5 2L12 17l-1.5-6L5 9l5.5-2.5L12 1z" />
      </svg>
    </div>
  );
}

function HeadingSparklesRight() {
  return (
    <div
      className="pointer-events-none absolute -right-2 top-1/2 flex -translate-y-1/2 gap-1 md:-right-8 md:gap-1.5"
      aria-hidden
    >
      <svg
        className="h-4 w-4 -translate-y-0.5 text-secondary/75 md:h-5 md:w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 1l1.5 5.5L19 9l-5.5 2L12 17l-1.5-6L5 9l5.5-2.5L12 1z" />
      </svg>
      <svg
        className="h-6 w-6 text-secondary opacity-90 md:h-8 md:w-8"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l1.2 4.2L17 8l-3.8 1.8L12 14l-1.2-4.2L7 8l3.8-1.8L12 2z" />
      </svg>
    </div>
  );
}

const PLAN_WHATSAPP_MESSAGE = {
  "Quick Song": WHATSAPP_MESSAGES.quickSong,
  "Full Story Song": WHATSAPP_MESSAGES.fullStorySong,
  "Signature Experience": WHATSAPP_MESSAGES.signatureExperience,
} as const;

const PLAN_CTA_LABEL = {
  "Quick Song": "Get This Plan",
  "Full Story Song": "Choose This One",
  "Signature Experience": "Go Signature",
} as const;

const PLANS = [
  {
    name: "Quick Song",
    badge: "🥉",
    popular: false,
    features: [
      "Basic personalized song",
      "1 style/genre",
      "Standard delivery",
      "MP3 format",
    ],
    addons: ["Social media release (₹499)", "Bulk discount available"],
  },
  {
    name: "Full Story Song",
    badge: "🥈",
    badgeExtra: "⭐",
    popular: true,
    features: [
      "Fully customized song",
      "Choice of mood/style",
      "1–2 revisions",
      "MP3 + WAV",
    ],
    addons: ["Social media release (₹499)", "Bulk discount available"],
  },
  {
    name: "Signature Experience",
    badge: "🥇",
    popular: false,
    features: [
      "Premium song",
      "Advanced storytelling",
      "Priority delivery (24–48 hrs)",
      "2–3 revisions",
      "Audio + video/reel",
      "Social media release included",
    ],
    addons: ["Bulk discount available"],
  },
] as const;

function FeatureRow({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-left">
      <span
        className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-secondary shadow-[0_0_8px_rgba(212,168,67,0.6)]"
        aria-hidden
      />
      <span className="font-sans text-[0.95rem] leading-relaxed text-cream/90 md:text-base">
        {children}
      </span>
    </li>
  );
}

export function PlansSection() {
  return (
    <section
      id="plans"
      className="scroll-mt-28 relative overflow-x-hidden rounded-3xl border border-secondary/15 bg-primary/26 px-5 py-16 shadow-[inset_0_1px_0_rgba(212,168,67,0.05)] backdrop-blur-sm sm:px-8 md:px-10 md:py-20 lg:px-12"
      aria-labelledby="plans-heading"
    >
      <header className="relative mx-auto mb-14 max-w-3xl text-center md:mb-16">
        <div className="relative inline-block min-w-0 max-w-full px-10 sm:px-14 md:px-20">
          <HeadingSparkles />
          <h2
            id="plans-heading"
            className="font-heading text-2xl tracking-tight sm:text-3xl md:text-4xl lg:text-[2.35rem]"
          >
            Our Plans
          </h2>
          <HeadingSparklesRight />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:items-start lg:gap-6 xl:gap-8">
        {PLANS.map((plan, planIndex) => (
          <article
            key={plan.name}
            className={`plan-card relative flex flex-col overflow-visible rounded-2xl border bg-white/[0.07] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-[transform,box-shadow] duration-300 ${
              plan.popular
                ? "plan-card--popular border-secondary/55 lg:z-10 lg:scale-[1.06] lg:shadow-[0_0_0_1px_rgba(212,168,67,0.5),0_0_48px_rgba(212,168,67,0.28),0_24px_56px_rgba(0,0,0,0.35)]"
                : "border-white/12 lg:translate-y-2"
            } ${
              planIndex === PLANS.length - 1
                ? "sm:col-span-2 sm:mx-auto sm:max-w-xl lg:col-span-1 lg:mx-0 lg:max-w-none"
                : ""
            }`}
          >
            {plan.popular && (
              <>
                {/* <div
                  className="pointer-events-none absolute -right-1 top-7 z-20 w-[11.5rem] origin-top-right rotate-45 bg-gradient-to-r from-secondary via-[#f0d78c] to-secondary py-2 text-center text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#0d0a1a] shadow-[0_0_24px_rgba(212,168,67,0.85),0_4px_12px_rgba(0,0,0,0.25)]"
                  role="status"
                >
                  Most Popular
                </div> */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-90"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(212, 168, 67, 0.25), 0 0 40px rgba(212, 168, 67, 0.15)",
                  }}
                  aria-hidden
                />
              </>
            )}

            <div className="relative z-10 flex flex-1 flex-col">
              <div className="mb-4 flex items-center gap-2 text-3xl md:text-[2rem]">
                <span aria-hidden>{plan.badge}</span>
                {"badgeExtra" in plan && plan.badgeExtra ? (
                  <span aria-hidden className="text-2xl md:text-[1.75rem]">
                    {plan.badgeExtra}
                  </span>
                ) : null}
              </div>

              <h3 className="font-heading text-2xl text-cream md:text-[1.65rem]">{plan.name}</h3>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <FeatureRow key={f}>{f}</FeatureRow>
                ))}
              </ul>

              {plan.addons.length > 0 && (
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-heading mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-secondary/90">
                    {plan.name === "Signature Experience" ? "Also" : "Add-ons"}
                  </p>
                  <ul className="space-y-2">
                    {plan.addons.map((a) => (
                      <li
                        key={a}
                        className="font-sans text-sm leading-relaxed text-cream/78 md:text-[0.95rem]"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8">
                <a
                  href={whatsappLink(PLAN_WHATSAPP_MESSAGE[plan.name])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="plan-choose-btn flex min-h-[44px] w-full items-center justify-center rounded-full py-3.5 text-center font-medium text-[#0d0a1a]"
                >
                  {PLAN_CTA_LABEL[plan.name]}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
