"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/** Holographic sphere with particles — lightweight CSS + Framer Motion */
export function ContactVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-2xl border border-white/10 bg-void md:min-h-[360px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(34,211,238,0.22),transparent_55%)]" />
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        animate={reduced ? undefined : { backgroundPosition: ["0px 0px", "32px 32px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neon/20 md:h-[260px] md:w-[260px]"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="contact-globe relative h-40 w-40 rounded-full border border-neon/35 md:h-48 md:w-48"
          animate={reduced ? undefined : { scale: [1, 1.03, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="contact-globe-grid absolute inset-0 rounded-full opacity-70" />
          <div className="absolute inset-3 rounded-full border border-accent/25" />
          <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-neon/30 via-transparent to-accent/25 blur-sm" />
        </motion.div>
      </div>

      {[...Array(16)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-neon"
          style={{
            left: `${8 + (i % 5) * 18}%`,
            top: `${12 + Math.floor(i / 5) * 22}%`,
          }}
          animate={
            reduced
              ? undefined
              : {
                  opacity: [0.15, 0.7, 0.15],
                  y: [0, -8 - (i % 3) * 4, 0],
                }
          }
          transition={{ duration: 2.5 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}
