"use client";

import Link from "next/link";
import { RagaRushMarkImg } from "@/components/brand/RagaRushMarkImg";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";
import { OrderSuccessCheckmark } from "./OrderSuccessCheckmark";

type OrderSuccessContentProps = {
  firstName: string;
  planLabel: string;
  orderId: string;
  estimatedTotal: number;
  whatsappUpdates: boolean;
  onBackHome?: () => void;
  /** Full page vs compact modal width */
  variant?: "page" | "modal";
};

export function OrderSuccessContent({
  firstName,
  planLabel,
  orderId,
  estimatedTotal,
  whatsappUpdates,
  onBackHome,
  variant = "page",
}: OrderSuccessContentProps) {
  const continueOnWhatsAppHref = whatsappLink(
    `Hi, I just submitted a song request — my name is ${firstName}.`
  );
  const questionsWaHref = whatsappLink(
    `Hi Raga Rush — I just submitted order ${orderId}. I have a question.`
  );

  const shell =
    variant === "modal"
      ? "relative max-h-[min(90vh,40rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-secondary/35 bg-white/[0.07] p-8 shadow-[0_0_0_1px_rgba(212,168,67,0.12),0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-10"
      : "relative mx-auto w-full max-w-lg rounded-3xl border border-secondary/25 bg-white/[0.05] p-8 shadow-[inset_0_1px_0_rgba(212,168,67,0.08),0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:max-w-xl sm:p-12";

  return (
    <div className={`${shell} text-center`}>
      <div className="relative z-10">
        <OrderSuccessCheckmark className="mb-6" />

        <h1
          id="order-success-title"
          className="font-heading text-balance text-2xl leading-tight text-cream sm:text-3xl md:text-[2rem]"
        >
          🎶 Your Musical Journey Has Begun!
        </h1>

        <p className="font-sans mt-4 text-base leading-relaxed text-cream/85 sm:text-lg">
          Thank you, {firstName}! We&apos;ve received your song request.
        </p>

        <div className="mt-8 rounded-2xl border border-secondary/20 bg-black/30 px-5 py-5 text-left shadow-[inset_0_1px_0_rgba(212,168,67,0.06)]">
          <dl className="space-y-3 font-sans text-sm text-cream/88 sm:text-[0.95rem]">
            <div className="flex items-center gap-3 sm:gap-4">
              <RagaRushMarkImg className="h-12 w-12 shrink-0" loading="lazy" />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                <dt className="text-cream/65">Order ID</dt>
                <dd className="font-medium tracking-wide text-secondary">#{orderId}</dd>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-cream/65">Plan</dt>
              <dd className="font-medium text-cream">{planLabel}</dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="text-cream/65">Estimated total</dt>
              <dd className="font-medium text-secondary">
                ₹{estimatedTotal.toLocaleString("en-IN")}
              </dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-white/10 pt-4 text-center text-sm leading-relaxed text-cream/78">
            Our team will reach out within <span className="text-secondary/95">24 hours</span> to
            discuss your song.
          </p>
        </div>

        {whatsappUpdates ? (
          <p className="font-sans mt-5 text-sm italic text-secondary/85" role="status">
            We&apos;ll send you WhatsApp updates about your order when there&apos;s news.
          </p>
        ) : null}

        <p className="font-sans mt-6 text-sm leading-relaxed text-cream/72">
          Questions? WhatsApp us at{" "}
          <a
            href={questionsWaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-secondary underline-offset-2 transition-colors hover:text-[#e8c97a] hover:underline"
          >
            {WHATSAPP_DISPLAY}
          </a>
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          {onBackHome ? (
            <button
              type="button"
              onClick={onBackHome}
              className="cta-start-song no-btn-glow inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-full px-10 font-semibold text-[#0d0a1a] transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Back to Home
            </button>
          ) : (
            <Link
              href="/"
              className="cta-start-song no-btn-glow inline-flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-full px-10 font-semibold text-[#0d0a1a] transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Back to Home
            </Link>
          )}
          <a
            href={continueOnWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center gap-2 rounded-full border border-[#25D366]/60 bg-[#25D366]/10 px-8 font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/20 sm:w-auto"
          >
            Continue on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
