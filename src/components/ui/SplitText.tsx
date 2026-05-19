"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export function SplitText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.28em]", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              delay: delay + i * 0.06,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
