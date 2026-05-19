"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { experience } from "@/lib/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, registerGsap } from "@/lib/animations/gsap-register";

export function Experience({ showHeading = true }: { showHeading?: boolean }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const line = lineRef.current;
    if (!line) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#experience",
            start: "top 70%",
            end: "bottom 25%",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section-pad relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-neon/5 blur-[100px]" />
      <div className="container-page relative mx-auto max-w-2xl">
        {showHeading && (
          <SectionHeading
            label="Experience"
            title="Timeline of impact"
            description="Enterprise operations, AI systems, and product engineering — connected through a cinematic progress line."
            className="mx-auto text-center md:mb-16 [&_h2]:mx-auto [&_p]:mx-auto"
          />
        )}

        <div className="relative mx-auto max-w-xl pl-12 md:pl-14">
          <motion.div
            ref={lineRef}
            className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-0.5 origin-top bg-gradient-to-b from-neon via-accent/80 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.35)] md:left-[21px]"
          />

          {experience.map((item, i) => (
            <motion.div
              key={item.role}
              className="relative mb-10 last:mb-0 md:mb-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="absolute -left-12 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-neon/50 bg-void text-xs font-bold text-neon shadow-[0_0_24px_rgba(34,211,238,0.35)] md:-left-14 md:h-11 md:w-11"
                whileHover={{ scale: 1.1, boxShadow: "0 0 32px rgba(34,211,238,0.5)" }}
              >
                {i + 1}
              </motion.span>
              <motion.div
                className="card-pro !p-6 md:!p-7"
                whileHover={{ y: -4, boxShadow: "0 0 40px rgba(34,211,238,0.08)" }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon">
                  {item.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-400">{item.company}</p>
                <p className="prose-body mt-3 text-sm">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
