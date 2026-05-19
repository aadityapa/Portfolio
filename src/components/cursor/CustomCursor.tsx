"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type CursorMode = "default" | "pointer" | "text" | "view";

export function CustomCursor() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const trailX = useSpring(x, { stiffness: 280, damping: 28 });
  const trailY = useSpring(y, { stiffness: 280, damping: 28 });
  const ringX = useSpring(x, { stiffness: 120, damping: 18 });
  const ringY = useSpring(y, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (isMobile || reduced) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='view']")) setMode("view");
      else if (target.closest("[data-cursor='text']")) setMode("text");
      else if (target.closest("a, button, [data-cursor='pointer']")) setMode("pointer");
      else setMode("default");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile, reduced, x, y]);

  if (isMobile || reduced) return null;

  const size =
    mode === "view" ? 72 : mode === "pointer" ? 44 : mode === "text" ? 36 : 12;
  const ringSize = mode === "view" ? 88 : mode === "pointer" ? 56 : 40;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[300] mix-blend-difference"
        style={{ x: trailX, y: trailY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ width: size, height: size }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[299]"
        style={{ x: ringX, y: ringY, opacity: visible ? 0.85 : 0 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/60"
          style={{
            boxShadow: "0 0 30px rgba(34,211,238,0.35)",
          }}
          animate={{ width: ringSize, height: ringSize }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        />
      </motion.div>
    </>
  );
}
