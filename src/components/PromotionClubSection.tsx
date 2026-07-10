import { Fragment } from "react";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";

const FLOW_STEPS = [
  "Register",
  "Get referral code",
  "Share",
  "Earn incentives",
] as const;

const INCENTIVE_ROWS = [
  { tier: "Up to ₹50,000", rate: "5%" },
  { tier: "₹50,001 – ₹1,00,000", rate: "10%" },
  { tier: "₹1,00,001 – ₹1,50,000", rate: "15%" },
  { tier: "₹1,50,000+", rate: "20%" },
] as const;

const WHO_TAGS = [
  "Students",
  "Content Creators",
  "Event Planners",
  "Anyone with a network",
] as const;

function FlowArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PromotionClubSection() {
  return (
    <section
      id="promotion-club"
      className="promotion-club-section scroll-mt-28 relative overflow-hidden rounded-3xl border border-secondary/18 px-5 py-14 shadow-[inset_0_1px_0_rgba(212,168,67,0.06)] backdrop-blur-sm sm:px-8 md:px-10 md:py-16 lg:px-12"
      aria-labelledby="promotion-club-heading"
    >
      <div className="promotion-club-gold-pattern pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#100818]/92 via-[#140d1c]/96 to-[#0a0610]/98"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <h2
          id="promotion-club-heading"
          className="font-heading text-center text-2xl text-cream sm:text-3xl md:text-4xl"
        >
          Raga Rush Promotion Club
        </h2>
        <p className="font-sans mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-cream/75 md:text-base">
          Grow with us — share Raga Rush, earn rewards, and help artists find their sound.
        </p>

        {/* A) How it works — mini flow */}
        <div className="mt-10 rounded-2xl border border-white/8 bg-black/25 p-5 md:p-6">
          <h3 className="font-heading mb-5 text-center text-lg text-secondary md:text-xl">
            How It Works
          </h3>
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-x-1 sm:gap-y-2 md:gap-x-2">
            {FLOW_STEPS.map((label, index) => (
              <Fragment key={label}>
                {index > 0 && (
                  <>
                    <span className="flex h-8 items-center justify-center text-secondary/85 sm:h-auto sm:w-8">
                      <FlowArrow className="h-5 w-5 rotate-90 sm:rotate-0 md:h-6 md:w-6" />
                    </span>
                  </>
                )}
                <span className="font-sans inline-flex min-h-[2.75rem] w-full max-w-sm items-center justify-center rounded-full border border-secondary/35 bg-white/[0.04] px-4 py-2.5 text-center text-[0.8125rem] text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:min-h-0 sm:w-auto sm:max-w-none sm:px-4 md:text-sm">
                  {label}
                </span>
              </Fragment>
            ))}
          </div>
        </div>

        {/* B) Sales incentive table */}
        <div className="mt-10">
          <h3 className="font-heading mb-4 text-center text-lg text-cream md:text-xl">
            Sales Incentive
          </h3>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="promotion-club-table w-full min-w-[280px] border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="promotion-club-table-head font-heading text-[0.8125rem] uppercase tracking-[0.06em] text-[#0d0a1a] md:text-sm">
                  <th scope="col" className="px-4 py-3 md:px-5 md:py-3.5">
                    Annual Business Generated
                  </th>
                  <th scope="col" className="px-4 py-3 pl-8 md:px-5 md:py-3.5 md:pl-12">
                    Incentive Rate
                  </th>
                </tr>
              </thead>
              <tbody className="font-sans text-cream">
                {INCENTIVE_ROWS.map((row, i) => (
                  <tr
                    key={row.tier}
                    className={`border-t border-white/8 ${i % 2 === 0 ? "bg-white/[0.04]" : "bg-white/[0.07]"}`}
                  >
                    <td className="px-4 py-3 md:px-5 md:py-3.5">{row.tier}</td>
                    <td className="px-4 py-3 pl-8 font-medium text-secondary md:px-7 md:py-3.5 md:pl-12" style={{ paddingLeft: '10%' }}>
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-sans mt-3 text-center text-xs italic text-cream/65 md:text-sm">
            Slab-based — each tier earns its own rate.
          </p>
        </div>

        {/* C) Who can join */}
        <div className="mt-10">
          <h3 className="font-heading mb-4 text-center text-lg text-cream md:text-xl">
            Who Can Join?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
            {WHO_TAGS.map((tag) => (
              <span
                key={tag}
                className="font-sans inline-flex items-center rounded-full border border-secondary/40 bg-secondary/[0.08] px-4 py-2 text-[0.8125rem] text-cream/92 shadow-[inset_0_1px_0_rgba(212,168,67,0.12)] md:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* D) Membership */}
        <div className="mt-10 rounded-2xl border border-secondary/25 bg-gradient-to-br from-secondary/[0.08] to-accent/[0.06] px-5 py-6 text-center md:px-8">
          <h3 className="font-heading text-lg text-cream md:text-xl">Membership</h3>
          <p className="font-heading mt-2 text-3xl text-secondary md:text-4xl">₹99/year</p>
          <p className="font-sans mt-2 text-sm text-cream/82 md:text-base">
            Includes onboarding + your personal referral code.
          </p>
        </div>

        {/* E) CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.promotionClub)}
            target="_blank"
            rel="noopener noreferrer"
            className="club-join-cta group relative inline-flex min-h-[44px] w-full max-w-md items-center justify-center overflow-hidden rounded-full px-10 py-3 font-medium text-[#0d0a1a] sm:w-auto sm:max-w-none md:min-h-[3.25rem] md:px-12"
          >
            <span
              className="pointer-events-none absolute left-3 text-base text-cream/95 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 md:left-4"
              aria-hidden
            >
              ✦
            </span>
            <span className="relative z-10 px-6">Join Now</span>
            <span
              className="pointer-events-none absolute right-3 text-base text-cream/95 opacity-0 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:opacity-100 md:right-4"
              aria-hidden
            >
              ✦
            </span>
            <span className="club-join-sparkle-layer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
              <span className="club-join-sparkle" />
              <span className="club-join-sparkle club-join-sparkle--delay" />
              <span className="club-join-sparkle club-join-sparkle--delay2" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
