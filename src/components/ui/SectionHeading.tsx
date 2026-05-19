"use client";

import { motion } from "framer-motion";
import { SplitText } from "./SplitText";
import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  label,
  title,
  description,
  className,
}: {
  label: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.header
      className={cn("mb-10 max-w-3xl md:mb-12 lg:mb-14", className)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-neon">
        {label}
      </p>
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
        <SplitText text={title} />
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-[1.7] text-slate-300 md:text-lg">
          {description}
        </p>
      )}
    </motion.header>
  );
}
