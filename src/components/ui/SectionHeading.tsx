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
      className={cn("mb-14 max-w-3xl", className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-neon">
        {label}
      </p>
      <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
        <SplitText text={title} />
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      )}
    </motion.header>
  );
}
