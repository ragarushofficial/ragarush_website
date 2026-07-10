/** Canonical site URL for metadata, OG, JSON-LD, and sitemap. Override via NEXT_PUBLIC_SITE_URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://ragarush.studio";

/** Absolute origin for OG / Twitter image URLs (defaults to ragarush.in). */
export const OG_SITE_ORIGIN =
  process.env.NEXT_PUBLIC_OG_ORIGIN?.replace(/\/$/, "") ?? "https://ragarush.in";

export const OG_IMAGE_ABSOLUTE = `${OG_SITE_ORIGIN}/og-image.png`;
export const TWITTER_IMAGE_ABSOLUTE = `${OG_SITE_ORIGIN}/twitter-image.png`;

export const SITE_NAME = "Raga Rush";

export const SITE_TAGLINE =
  "Bespoke Music for Your Stories | Custom Songs in Hindi, Marathi & English";

export const SITE_DESCRIPTION =
  "Transform your stories, poems, and moments into studio-quality original music. Personalized songs for weddings, brands, creators & more. Har Kahani Ko Mile Apna Sur.";

export const DEFAULT_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

/** Brand mark served from `/public/images` (source PNG for inline SVG + raster exports). */
export const SITE_LOGO = {
  src: "/images/raga-rush-logo.png",
  width: 320,
  height: 160,
  alt: "Raga Rush logo",
} as const;

/** Square mark for loading / success (generated to `public/images/raga-rush-mark-48.png`). */
export const SITE_LOGO_MARK_48 = {
  src: "/images/raga-rush-mark-48.png",
  width: 48,
  height: 48,
  alt: "Raga Rush logo",
} as const;

/** Square mark 64×64 for loading screen pulse. */
export const SITE_LOGO_MARK_64 = {
  src: "/images/raga-rush-mark-64.png",
  width: 64,
  height: 64,
  alt: "Raga Rush logo",
} as const;

/** WhatsApp contact — preferred channel for Indian market. */
export const WHATSAPP_NUMBER = "919970155508"; // no + or spaces, country code included

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  heroGeneral:
    "Hi Raga Rush! I'd like to create a personalized song. Can you tell me more about the process and pricing?",
  businessAudio:
    "Hi Raga Rush! I'm interested in brand/business audio (jingles, scoring, or sonic branding). Can we discuss my project?",
  quickSong:
    "Hi Raga Rush! I'm interested in the Quick Song plan. Can you share pricing and how to get started?",
  fullStorySong:
    "Hi Raga Rush! I'm interested in the Full Story Song plan. Can you share pricing and how to get started?",
  signatureExperience:
    "Hi Raga Rush! I'm interested in the Signature Experience plan. Can you share pricing and the details?",
  footerGeneral:
    "Hi Raga Rush! I'd like to create a song. Can you help me get started?",
  promotionClub:
    "Hi Raga Rush! I'd like to join the Promotion Club. How does registration work?",
} as const;

export const WHATSAPP_DISPLAY = "+91 9970155508";

export const WHATSAPP_URL = whatsappLink(
  "Hi Raga Rush! I'd like to know more about custom songs."
);
