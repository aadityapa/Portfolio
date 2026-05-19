"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/animations/gsap-register";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    registerGsap();

    if (reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    // Refresh after layout, fonts, and dynamic sections mount
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const refreshId2 = window.setTimeout(() => ScrollTrigger.refresh(), 2000);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(refreshId);
      window.clearTimeout(refreshId2);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
