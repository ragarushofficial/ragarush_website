"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE_LOGO_MARK_64, SITE_NAME } from "@/lib/site";

export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) {
      return;
    }
    const minMs = 1500;
    const started = Date.now();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const scheduleHide = () => {
      const wait = Math.max(0, minMs - (Date.now() - started));
      timeoutId = setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === "complete") {
      scheduleHide();
    } else {
      window.addEventListener("load", scheduleHide, { once: true });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [reduce]);

  if (reduce) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-[#0a0614]"
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={SITE_LOGO_MARK_64.src}
            alt={SITE_LOGO_MARK_64.alt}
            width={SITE_LOGO_MARK_64.width}
            height={SITE_LOGO_MARK_64.height}
            className="loading-logo-pulse"
            priority
          />
          <p className="loading-screen-title font-heading text-xl tracking-wide text-secondary md:text-2xl">
            {SITE_NAME}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
