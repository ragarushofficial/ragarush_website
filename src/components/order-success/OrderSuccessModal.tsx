"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { OrderSuccessPayload } from "@/lib/order-success-storage";
import { OrderSuccessContent } from "./OrderSuccessContent";

type OrderSuccessModalProps = {
  open: boolean;
  payload: OrderSuccessPayload | null;
  onClose: () => void;
};

export function OrderSuccessModal({ open, payload, onClose }: OrderSuccessModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !payload) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-success-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="order-success-modal-enter relative z-10 w-full max-w-lg">
        <OrderSuccessContent
          variant="modal"
          firstName={payload.firstName}
          planLabel={payload.planLabel}
          orderId={payload.orderId}
          estimatedTotal={payload.estimatedTotal}
          whatsappUpdates={payload.whatsappUpdates}
          onBackHome={() => {
            onClose();
            router.push("/");
          }}
        />
      </div>
    </div>
  );
}
