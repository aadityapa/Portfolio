"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TypingText({ lines }: { lines: string[] }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const line = lines[index % lines.length];

  useEffect(() => {
    let i = 0;
    setDisplay("");
    const type = setInterval(() => {
      i += 1;
      setDisplay(line.slice(0, i));
      if (i >= line.length) clearInterval(type);
    }, 28);
    return () => clearInterval(type);
  }, [line]);

  useEffect(() => {
    const t = setTimeout(() => setIndex((p) => p + 1), 4200);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <p className="font-mono text-sm text-neon/90 md:text-base">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {display}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-neon align-middle"
          />
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
