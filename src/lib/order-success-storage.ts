export const ORDER_SUCCESS_STORAGE_KEY = "rr-order-success-v1";

export type OrderSuccessPayload = {
  firstName: string;
  planLabel: string;
  orderId: string;
  estimatedTotal: number;
  whatsappUpdates: boolean;
};

export function saveOrderSuccessPayload(payload: OrderSuccessPayload): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(ORDER_SUCCESS_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}

export function readOrderSuccessPayload(): OrderSuccessPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ORDER_SUCCESS_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as OrderSuccessPayload;
    if (
      typeof data.firstName === "string" &&
      typeof data.planLabel === "string" &&
      typeof data.orderId === "string" &&
      typeof data.whatsappUpdates === "boolean" &&
      typeof data.estimatedTotal === "number" &&
      Number.isFinite(data.estimatedTotal)
    ) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearOrderSuccessPayload(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(ORDER_SUCCESS_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Generate display order id: #RR-{timestamp}{short random} */
export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RR-${ts}${rand}`;
}
