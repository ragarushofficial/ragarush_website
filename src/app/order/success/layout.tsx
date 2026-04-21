import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your Raga Rush song request was received.",
  robots: { index: false, follow: false },
};

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
