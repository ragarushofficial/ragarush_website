"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function ParallaxGradient() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1800], [0, 48]);

  if (reduce) {
    return <div className="gradient-romantic pointer-events-none fixed inset-0 -z-10" aria-hidden />;
  }

  return (
    <motion.div
      aria-hidden
      className="gradient-romantic pointer-events-none fixed inset-0 -z-10 will-change-transform"
      style={{ y }}
    />
  );
}
