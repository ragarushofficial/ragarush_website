import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { ListenFirstSection } from "@/components/ListenFirstSection";
import { SectionReveal } from "@/components/SectionReveal";

const ServicesSection = dynamic(
  () => import("@/components/ServicesSection").then((m) => ({ default: m.ServicesSection })),
  { ssr: true }
);
const WhyRagaRush = dynamic(
  () => import("@/components/WhyRagaRush").then((m) => ({ default: m.WhyRagaRush })),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/TestimonialsSection").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { ssr: true }
);
const PlansSection = dynamic(
  () => import("@/components/PlansSection").then((m) => ({ default: m.PlansSection })),
  { ssr: true }
);
const SocialMediaReleaseBanner = dynamic(
  () =>
    import("@/components/SocialMediaReleaseBanner").then((m) => ({
      default: m.SocialMediaReleaseBanner,
    })),
  { ssr: true }
);
const HowItWorksSection = dynamic(
  () => import("@/components/HowItWorksSection").then((m) => ({ default: m.HowItWorksSection })),
  { ssr: true }
);
const DeliverySection = dynamic(
  () => import("@/components/DeliverySection").then((m) => ({ default: m.DeliverySection })),
  { ssr: true }
);
const OurPromiseSection = dynamic(
  () => import("@/components/OurPromiseSection").then((m) => ({ default: m.OurPromiseSection })),
  { ssr: true }
);
const PromotionClubBanner = dynamic(
  () =>
    import("@/components/PromotionClubBanner").then((m) => ({
      default: m.PromotionClubBanner,
    })),
  { ssr: true }
);
const ContactCTAFooter = dynamic(
  () => import("@/components/ContactCTAFooter").then((m) => ({ default: m.ContactCTAFooter })),
  { ssr: true }
);

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex flex-1 flex-col outline-none"
    >
      <SectionReveal>
        <HeroSection />
      </SectionReveal>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-4 py-16 sm:gap-28 sm:px-6 md:gap-32 md:px-12 md:py-24">
        <SectionReveal>
          <ListenFirstSection />
        </SectionReveal>

        <SectionReveal>
          <ServicesSection />
        </SectionReveal>

        <SectionReveal>
          <WhyRagaRush />
        </SectionReveal>

        <SectionReveal>
          <TestimonialsSection />
        </SectionReveal>

        <SectionReveal>
          <PlansSection />
        </SectionReveal>

        <SectionReveal>
          <SocialMediaReleaseBanner />
        </SectionReveal>

        <SectionReveal>
          <HowItWorksSection />
        </SectionReveal>

        <SectionReveal>
          <DeliverySection />
        </SectionReveal>

        <SectionReveal>
          <OurPromiseSection />
        </SectionReveal>

        <SectionReveal>
          <PromotionClubBanner />
        </SectionReveal>
      </div>

      <SectionReveal>
        <ContactCTAFooter />
      </SectionReveal>
    </main>
  );
}
