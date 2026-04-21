"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RagaRushLogoSvg } from "@/components/brand/RagaRushLogoSvg";
import { SITE_NAME } from "@/lib/site";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#plans", label: "Plans" },
  { href: "#process", label: "Process" },
  { href: "#promotion-club", label: "Promotion Club" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`navbar sticky top-0 z-50 border-b border-secondary/25 shadow-[inset_0_-1px_0_rgba(212,168,67,0.06)] backdrop-blur-xl transition-[padding,background-color,box-shadow] duration-300 ease-out ${
          scrolled ? "scrolled bg-[#100818]/94 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.28)]" : "bg-[#0d0a1a]/55 py-4 md:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 md:px-8 lg:px-12">
          <Link
            href="/#home"
            className="navbar-logo-link relative shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a1a]"
            aria-label={`${SITE_NAME} — Home`}
          >
            <RagaRushLogoSvg className="navbar-logo" decorative />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex lg:gap-0.5 xl:gap-1"
            aria-label="Main"
          >
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`inline-flex min-h-[44px] items-center rounded-lg px-2.5 py-2 text-cream/90 transition-colors hover:bg-white/5 hover:text-cream xl:px-3 ${
                  scrolled ? "text-sm" : "text-[0.9375rem]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="/start"
              className={`cta-start-song inline-flex min-h-[44px] items-center justify-center rounded-full font-medium text-[#0d0a1a] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                scrolled ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-[0.9375rem]"
              }`}
            >
              Start Your Song
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-secondary/40 text-cream transition-colors hover:bg-white/5 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            aria-label="Open menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay + drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobile}
          tabIndex={mobileOpen ? 0 : -1}
          aria-label="Close menu"
        />

        <aside
          id="mobile-drawer"
          className={`absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l-2 border-secondary/50 bg-[#0d0a1a]/97 shadow-[-8px_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-secondary/30 p-4">
            <Link
              href="/#home"
              onClick={closeMobile}
              className="navbar-logo-link rounded-md outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a1a]"
              aria-label={`${SITE_NAME} — Home`}
            >
              <RagaRushLogoSvg className="navbar-logo" decorative />
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-secondary/40 text-cream hover:bg-white/5"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Mobile">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={closeMobile}
                className="flex min-h-[44px] items-center rounded-lg border border-transparent px-3 py-2.5 text-cream/95 transition-colors hover:border-secondary/40 hover:bg-white/5"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="border-t border-secondary/30 p-4">
            <a
              href="/start"
              onClick={closeMobile}
              className="cta-start-song flex min-h-[44px] w-full items-center justify-center rounded-full py-3 font-medium text-[#0d0a1a]"
            >
              Start Your Song
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
