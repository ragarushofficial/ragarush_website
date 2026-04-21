function IconSpotify({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="Spotify"
    >
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

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="YouTube"
    >
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

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="Instagram"
    >
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

export function SocialMediaReleaseBanner() {
  return (
    <aside
      className="social-release-banner relative overflow-hidden rounded-2xl border border-secondary/20 px-4 py-5 shadow-[0_0_0_1px_rgba(212,168,67,0.08),0_8px_40px_rgba(13,10,26,0.45)] sm:px-6 md:px-8 md:py-6"
      aria-labelledby="social-release-heading"
    >
      <div
        className="social-release-banner-inner pointer-events-none absolute inset-0 rounded-2xl"
        aria-hidden
      />
      <div
        className="social-release-banner-pattern pointer-events-none absolute inset-0 rounded-2xl"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col gap-4 md:gap-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <h3
            id="social-release-heading"
            className="font-heading flex shrink-0 items-center gap-2.5 text-base leading-snug text-cream sm:text-lg md:text-xl"
          >
            <span className="text-secondary/80" aria-hidden>
              ✦
            </span>
            <span>Take Your Song to the World</span>
          </h3>

          <div className="flex flex-wrap items-center gap-5 md:gap-6">
            <div className="flex items-center gap-3 text-secondary drop-shadow-[0_0_12px_rgba(212,168,67,0.35)] md:gap-4">
              <IconSpotify className="h-8 w-8 md:h-9 md:w-9" />
              <IconYouTube className="h-8 w-8 md:h-9 md:w-9" />
              <IconInstagram className="h-8 w-8 md:h-9 md:w-9" />
            </div>

            <div className="font-sans min-w-0 flex-1 rounded-xl border border-white/12 bg-white/[0.035] px-3.5 py-3 text-[0.8125rem] leading-relaxed text-cream/86 shadow-[inset_0_1px_0_rgba(255,248,231,0.04)] backdrop-blur-sm md:px-4 md:text-sm">
              <p>
                <span className="font-heading text-base font-semibold text-secondary md:text-lg">
                  ₹499
                </span>{" "}
                <span className="text-cream/75">
                  add-on for <span className="text-cream/90">Quick</span> &{" "}
                  <span className="text-cream/90">Full Story</span>
                </span>
                <span className="text-cream/40"> · </span>
                <span className="text-cream/82">
                  <span className="font-medium text-secondary">Included</span> in Signature
                </span>
              </p>
            </div>
          </div>
        </div>

        <p className="font-sans border-t border-secondary/15 pt-4 text-center text-sm leading-relaxed text-cream/78 md:text-left md:text-[0.95rem]">
          Perfect for creators, artists, or anyone who wants their song to reach the world.
        </p>
      </div>
    </aside>
  );
}
