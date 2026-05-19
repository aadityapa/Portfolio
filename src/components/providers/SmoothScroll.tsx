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

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("main section");
      sections.forEach((section, index) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0.88, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(section, {
          yPercent: index % 2 === 0 ? -1.6 : -1,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      const parallaxLayers = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      parallaxLayers.forEach((el) => {
        const depth = Number(el.dataset.parallax ?? "0.12");
        gsap.to(el, {
          yPercent: depth * -100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      });

      gsap.to(".env-code-label", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
        },
      });
    });

    // Refresh after layout, fonts, and dynamic sections mount
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const refreshId2 = window.setTimeout(() => ScrollTrigger.refresh(), 2000);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(refreshId);
      window.clearTimeout(refreshId2);
      gsap.ticker.remove(onTick);
      ctx.revert();
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
