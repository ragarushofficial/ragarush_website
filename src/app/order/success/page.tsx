"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderSuccessContent } from "@/components/order-success/OrderSuccessContent";
import { OrderSuccessDecor } from "@/components/order-success/OrderSuccessDecor";
import {
  clearOrderSuccessPayload,
  readOrderSuccessPayload,
  type OrderSuccessPayload,
} from "@/lib/order-success-storage";

export default function OrderSuccessPage() {
  const router = useRouter();
  const [data, setData] = useState<OrderSuccessPayload | undefined>(undefined);

  useEffect(() => {
    const p = readOrderSuccessPayload();
    if (!p) {
      router.replace("/start");
      return;
    }
    setData(p);
    clearOrderSuccessPayload();
  }, [router]);

  if (data === undefined) {
    return (
      <main
        id="main-content"
        className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6"
      >
        <p className="font-sans text-cream/60">Loading…</p>
      </main>
    );
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden px-4 py-14 outline-none sm:px-8 sm:py-20"
    >
      <div className="start-form-hero-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0a1a]/40 to-[#0d0a1a]/90" aria-hidden />
      <OrderSuccessDecor />

      <div className="relative z-[2] mx-auto flex min-h-[min(80vh,52rem)] max-w-4xl flex-col items-center justify-center py-6">
        <OrderSuccessContent
          variant="page"
          firstName={data.firstName}
          planLabel={data.planLabel}
          orderId={data.orderId}
          estimatedTotal={data.estimatedTotal}
          whatsappUpdates={data.whatsappUpdates}
        />
      </div>
    </main>
  );
}
