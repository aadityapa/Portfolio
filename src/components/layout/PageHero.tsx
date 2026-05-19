"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";

export function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-8 pt-28 md:pb-10 md:pt-36 lg:pt-40">
      <div className="container-page">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.35em] text-neon"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {label}
        </motion.p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
          <SplitText text={title} />
        </h1>
        {description && (
          <motion.p
            className="mt-6 max-w-2xl text-base leading-[1.7] text-slate-300 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {description}
          </motion.p>
        )}
      </div>
      <div className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-neon/10 blur-[100px] md:h-72 md:w-72" />
    </section>
  );
}
