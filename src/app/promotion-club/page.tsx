import type { Metadata } from "next";
import Link from "next/link";
import { PromotionClubSection } from "@/components/PromotionClubSection";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Promotion Club",
  description:
    "Join the Raga Rush Promotion Club — share referrals, earn slab-based incentives, and grow with us. ₹99/year membership.",
  alternates: { canonical: "/promotion-club" },
  openGraph: {
    title: `Promotion Club | ${SITE_NAME}`,
    description:
      "Earn rewards by sharing Raga Rush. Transparent incentive tiers, referral codes, and onboarding included.",
  },
};

export default function PromotionClubPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex flex-1 flex-col outline-none"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:px-12 md:py-14">
        <Link
          href="/"
          className="inline-flex font-sans text-sm text-secondary/95 underline-offset-4 hover:text-secondary hover:underline"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6 md:px-12 md:pb-24">
        <PromotionClubSection />
      </div>
    </main>
  );
}
