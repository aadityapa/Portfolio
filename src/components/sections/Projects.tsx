"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/data/portfolio";
import { LazyImage, PROJECT_CARD_SIZES } from "@/components/ui/LazyImage";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/animations/gsap-register";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const CARD_W = 440;
const GAP = 32;

export function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    registerGsap();
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!wrap || !track) return;

    const getScrollLength = () => {
      const distance = track.scrollWidth - window.innerWidth + 120;
      return Math.max(window.innerHeight * 0.75, distance);
    };

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(track, { x: 0 });
        return;
      }

      gsap.to(track, {
        x: () => {
          const max = track.scrollWidth - window.innerWidth + 120;
          return -Math.max(0, max);
        },
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${getScrollLength()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) progress.style.width = `${self.progress * 100}%`;
            const idx = Math.min(
              projects.length - 1,
              Math.round(self.progress * (projects.length - 1))
            );
            setActiveIndex(idx);
          },
        },
      });
    }, wrap);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} id="projects" className="relative bg-void">
      <section className="flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="section-pad z-20 shrink-0 pb-4 pt-24 md:pt-28">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon">
                Projects
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-5xl">
                Product-grade showcases
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted md:text-base">
                Keep scrolling — cards move horizontally through each case study.
              </p>
            </div>
            <div className="hidden w-48 md:block">
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  ref={progressRef}
                  className="h-full w-0 rounded-full bg-gradient-to-r from-neon to-accent"
                />
              </div>
              <p className="mt-2 text-right text-xs text-muted">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center overflow-hidden py-6">
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ gap: GAP, paddingLeft: "max(1.5rem, calc(50vw - 220px))", paddingRight: "4rem" }}
          >
            {projects.map((project, i) => (
              <article
                key={project.id}
                className="group relative flex h-[min(68vh,600px)] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl"
                style={{ width: CARD_W, maxWidth: "min(88vw, 440px)" }}
                data-cursor="view"
              >
                <div className="relative h-[48%] min-h-[180px] w-full shrink-0 overflow-hidden">
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    sizes={PROJECT_CARD_SIZES}
                    rootMargin="600px"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-void/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-neon backdrop-blur-md">
                    Project {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-display text-xl font-bold leading-snug text-white md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                    <Link
                      href={project.demo}
                      target={project.demo.startsWith("#") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="rounded-full bg-neon px-5 py-2.5 text-xs font-semibold text-void"
                      data-cursor="pointer"
                    >
                      Live Demo
                    </Link>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold text-white hover:border-neon/50"
                      data-cursor="pointer"
                    >
                      GitHub
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
