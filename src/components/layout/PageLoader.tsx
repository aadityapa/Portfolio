"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setLoading(false);
      return;
    }
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AP
          </motion.div>
          <motion.div
            className="mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-neon to-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
          <motion.p
            className="mt-4 text-xs uppercase tracking-[0.35em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Initializing experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
