"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="section-pad bg-void">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading
          label="Testimonials"
          title="Trusted by leaders"
          description="Glass cards with cinematic transitions."
          className="mx-auto text-center"
        />

        <div className="relative mt-8 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              className="glass-panel mx-auto rounded-3xl p-8 md:p-12"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg leading-relaxed text-slate-200 md:text-xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <p className="font-display font-semibold text-white">{current.author}</p>
                <p className="text-sm text-neon">{current.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-neon" : "w-2 bg-white/20"
              }`}
              aria-label={`Testimonial ${i + 1}`}
              data-cursor="pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
