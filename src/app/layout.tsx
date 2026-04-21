import type { Metadata, Viewport } from "next";
import { Lora, Noto_Sans_Devanagari, Playfair_Display } from "next/font/google";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ParallaxGradient } from "@/components/ParallaxGradient";
import { SiteNavbar } from "@/components/SiteNavbar";
import {
  DEFAULT_TITLE,
  OG_IMAGE_ABSOLUTE,
  SITE_DESCRIPTION,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  TWITTER_IMAGE_ABSOLUTE,
} from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "custom song",
    "bespoke music",
    "Hindi song",
    "Marathi song",
    "wedding song",
    "personalized music",
    "Raga Rush",
    "Indian music studio",
    "poem to song",
  ],
  category: "music",
  icons: {
    icon: [
      {
        url: SITE_LOGO.src,
        type: "image/png",
        sizes: `${SITE_LOGO.width}x${SITE_LOGO.height}`,
      },
    ],
    shortcut: SITE_LOGO.src,
    apple: [{ url: SITE_LOGO.src, sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_ABSOLUTE,
        width: 1200,
        height: 630,
        alt: "Raga Rush — gold lettering on a deep purple gradient",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    images: [TWITTER_IMAGE_ABSOLUTE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d0a1a" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-cream">
        <OrganizationJsonLd />
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:block focus:rounded-lg focus:bg-secondary focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-[#0d0a1a] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cream/50"
        >
          Skip to main content
        </a>
        <ParallaxGradient />
        <LoadingScreen />
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}
