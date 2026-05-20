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
      const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
      const sections = gsap.utils.toArray<HTMLElement>("main section");
      const storySections = gsap.utils.toArray<HTMLElement>("[data-story-section]");
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

        if (!isMobileViewport) {
          gsap.to(section, {
            yPercent: index % 2 === 0 ? -1.6 : -1,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
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

      storySections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 62%",
          end: "bottom 38%",
          onEnter: () => section.classList.add("is-story-active"),
          onEnterBack: () => section.classList.add("is-story-active"),
          onLeave: () => section.classList.remove("is-story-active"),
          onLeaveBack: () => section.classList.remove("is-story-active"),
        });
      });

      const codeLabels = gsap.utils.toArray<HTMLElement>(".env-code-label");
      if (codeLabels.length > 0) {
        gsap.to(codeLabels, {
          yPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
      }

      gsap.to(":root", {
        "--scroll-story-progress": 1,
        ease: "none",
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
    });

    const scrollToHash = (immediate = false) => {
      const id = window.location.hash;
      if (!id) return;
      const target = document.querySelector<HTMLElement>(id);
      if (target) lenis.scrollTo(target, { offset: -96, immediate });
    };

    scrollToHash(true);
    const onHashChange = () => scrollToHash();
    window.addEventListener("hashchange", onHashChange);

    // Refresh after layout, fonts, and dynamic sections mount
    const refreshId = window.setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToHash(true);
    }, 400);
    const refreshId2 = window.setTimeout(() => ScrollTrigger.refresh(), 2000);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHashChange);
      window.clearTimeout(refreshId);
      window.clearTimeout(refreshId2);
      gsap.ticker.remove(onTick);
      ctx.revert();
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
