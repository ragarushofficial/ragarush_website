import { IconWhatsApp } from "@/components/icons/IconWhatsApp";
import { WHATSAPP_URL } from "@/lib/site";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Raga Rush on WhatsApp"
      className="fixed bottom-5 right-5 z-[80] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <IconWhatsApp className="h-7 w-7" />
    </a>
  );
}
