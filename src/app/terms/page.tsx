import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for commissioning bespoke music and related services from Raga Rush.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <div className="mx-auto max-w-2xl px-4 py-14 text-cream sm:px-6 sm:py-16">
        <h1 className="font-heading text-2xl text-secondary sm:text-3xl">Terms</h1>
        <p className="font-sans mt-6 leading-relaxed text-cream/85">
          This page is a placeholder. Replace with your full terms of service when ready.
        </p>
      </div>
    </main>
  );
}
