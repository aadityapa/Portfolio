"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { experience } from "@/lib/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, registerGsap } from "@/lib/animations/gsap-register";

export function Experience() {
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
            end: "bottom 30%",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section-pad relative bg-surface">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          label="Experience"
          title="Timeline of impact"
          description="Scroll-revealed nodes with glowing progress."
        />

        <div className="relative pl-10">
          <div
            ref={lineRef}
            className="absolute left-[15px] top-0 h-full w-px origin-top bg-gradient-to-b from-neon via-accent to-transparent"
          />
          {experience.map((item, i) => (
            <motion.div
              key={item.role}
              className="relative mb-12 last:mb-0"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <span className="absolute -left-10 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-neon bg-void text-xs font-bold text-neon shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                {i + 1}
              </span>
              <div className="glass-panel rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-neon">
                  {item.period}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="text-sm text-slate-400">{item.company}</p>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
