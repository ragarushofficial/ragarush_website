import type { Metadata } from "next";
import { Suspense } from "react";
import { StartSongForm } from "@/components/start-song/StartSongForm";
export const metadata: Metadata = {
  title: "Start Your Musical Journey",
  description:
    "Tell us your story — share details for your custom song in Hindi, Marathi, or English. Raga Rush.",
  alternates: { canonical: "/start" },
};

function StartFallback() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6">
      <p className="font-sans text-cream/70">Loading form…</p>
    </div>
  );
}

export default function StartPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Suspense fallback={<StartFallback />}>
        <StartSongForm />
      </Suspense>
    </main>
  );
}
