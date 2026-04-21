import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Raga Rush collects, uses, and protects your information when you commission custom music.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <div className="mx-auto max-w-2xl px-4 py-14 text-cream sm:px-6 sm:py-16">
        <h1 className="font-heading text-2xl text-secondary sm:text-3xl">Privacy Policy</h1>
        <p className="font-sans mt-6 leading-relaxed text-cream/85">
          This page is a placeholder. Replace with your full privacy policy when ready.
        </p>
      </div>
    </main>
  );
}
