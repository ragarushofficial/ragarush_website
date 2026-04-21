import Link from "next/link";
import { RagaRushLogoSvg } from "@/components/brand/RagaRushLogoSvg";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.25" fill="currentColor" />
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="5.5"
        width="19"
        height="13"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10.5 9.8L15.3 12l-4.8 2.2V9.8z" fill="currentColor" />
    </svg>
  );
}

function IconSpotify({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 10.2c2.8-1 6.1-.9 8.8.6M6.8 13.4c3.4-1.2 7.4-.9 10.5 1M7.2 16.6c2.6-.9 5.6-.8 8 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const SOCIAL = [
  {
    name: "Instagram",
    href: "https://instagram.com/ragarush_official/",
    Icon: IconInstagram,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/",
    Icon: IconYouTube,
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/",
    Icon: IconSpotify,
  },
] as const;

export function ContactCTAFooter() {
  return (
    <div className="final-cta-footer-wrap relative mt-20 w-full md:mt-24">
      <div className="final-cta-footer-bg pointer-events-none absolute inset-0" aria-hidden />

      <section
        id="contact"
        className="scroll-mt-28 relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 md:px-12 md:pb-20 md:pt-16"
        aria-labelledby="final-cta-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="final-cta-heading"
            className="font-heading text-2xl leading-tight text-cream sm:text-3xl md:text-4xl lg:text-[2.35rem]"
          >
            Ready to Create Your Song?
          </h2>
          <p className="font-sans mx-auto mt-4 max-w-lg text-base leading-relaxed text-cream/82 sm:text-lg md:text-xl">
            Tell us your story. We&apos;ll turn it into music.
          </p>

          <div className="mt-10 flex w-full justify-center px-1">
            <a
              href="/start"
              className="cta-start-now inline-flex min-h-[44px] w-full max-w-md items-center justify-center rounded-full px-10 py-3.5 text-center text-base font-semibold text-[#0d0a1a] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:max-w-none sm:px-12 sm:py-4 sm:text-lg md:min-h-[3.75rem] md:px-14 md:text-xl"
            >
              Start Now
            </a>
          </div>

          <div className="font-sans mt-16 flex flex-col items-center gap-7 border-t border-secondary/15 pt-14 text-cream/86 md:mt-20">
            <div className="flex w-full max-w-md flex-col gap-1 text-center text-base sm:text-lg">
              <a
                href="mailto:hello@ragarush.studio"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg px-3 text-cream transition-colors hover:text-secondary"
              >
                hello@ragarush.studio
              </a>
              <a
                href="tel:++919970155508"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg px-3 text-cream transition-colors hover:text-secondary"
              >
                +91 9970155508
              </a>
              <a
                href="https://wa.me/+919970155508"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-3 text-cream transition-colors hover:text-secondary"
              >
                <IconWhatsApp className="h-6 w-6 shrink-0 text-secondary" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-5 md:gap-6">
              {SOCIAL.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-secondary transition-transform hover:scale-110 hover:text-[#e8c97a]"
                  aria-label={name}
                >
                  <Icon className="h-7 w-7 md:h-8 md:w-8" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-secondary/12 px-4 py-12 sm:px-6 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 text-left">
          <Link
            href="/#home"
            className="footer-logo-link inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Raga Rush — Home"
          >
            <RagaRushLogoSvg className="footer-logo" decorative />
          </Link>
          <p className="font-sans text-sm text-cream/55">
            © 2026 Raga Rush. All rights reserved.
          </p>
          <nav
            className="font-sans flex flex-wrap items-center justify-start gap-x-4 gap-y-1 text-sm text-cream/70 sm:gap-x-6 sm:gap-y-2"
            aria-label="Legal"
          >
            <Link
              href="/privacy-policy"
              className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-secondary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-secondary"
            >
              Terms
            </Link>
            <Link
              href="/refund-policy"
              className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-secondary"
            >
              Refund Policy
            </Link>
          </nav>
          <p
            lang="hi"
            className="font-devanagari max-w-md text-[0.9375rem] italic leading-relaxed text-cream/50 sm:text-sm"
          >
            Har Kahani Ko Mile Apna Sur.
          </p>
        </div>
      </footer>
    </div>
  );
}
