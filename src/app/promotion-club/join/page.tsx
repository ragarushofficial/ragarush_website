import type { Metadata } from "next";
import Link from "next/link";
import { RagaRushLogoSvg } from "@/components/brand/RagaRushLogoSvg";
import { PromotionClubJoinForm } from "@/components/promotion-club/PromotionClubJoinForm";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the Promotion Club",
  description:
    "Register for the Raga Rush Promotion Club — ₹99/year. Turn your network into a powerful earning opportunity.",
  openGraph: {
    title: `Join the Promotion Club | ${SITE_NAME}`,
    description:
      "Register for the Raga Rush Promotion Club. Transparent incentives, referral code, and tracking access.",
  },
};

export default function PromotionClubJoinPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="club-join-page relative min-h-[calc(100vh-5rem)] overflow-hidden px-4 py-10 outline-none sm:px-6 md:py-14"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-secondary via-secondary/50 to-secondary/10"
        aria-hidden
      />
      <div className="promotion-club-gold-pattern pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#100818]/90 via-[#140d1c]/95 to-[#0a0610]/98"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex font-sans text-sm text-secondary/95 underline-offset-4 hover:text-secondary hover:underline"
        >
          ← Back to Home
        </Link>

        <header className="mx-auto mt-8 max-w-3xl text-center md:mt-12">
          <div className="mb-6 flex justify-center md:mb-8">
            <RagaRushLogoSvg className="block h-[52px] w-[200px] md:h-[72px] md:w-[280px]" />
          </div>
          <h1 className="font-heading text-balance text-3xl leading-tight text-secondary md:text-4xl lg:text-[2.35rem]">
            🤝 Join the Raga Rush Promotion Club
          </h1>
          <p className="font-sans mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream/78 md:text-lg">
            Turn your network into a powerful earning opportunity. Register today for just ₹99/year.
          </p>
        </header>

        <div className="mt-10 md:mt-14">
          <PromotionClubJoinForm />
        </div>
      </div>
    </main>
  );
}
