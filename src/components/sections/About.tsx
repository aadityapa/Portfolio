"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LazyImage, ABOUT_PHOTO_SIZES } from "@/components/ui/LazyImage";
import { aboutBlocks, credentials, kpis, siteConfig } from "@/lib/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, registerGsap } from "@/lib/animations/gsap-register";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerGsap();
    const proxy = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => setCount(Math.round(proxy.val)),
      });
    });
    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={ref} className="font-display text-4xl font-bold text-neon md:text-5xl">
      {count}
      {suffix}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-neon/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="About"
          title="Engineering with cinematic precision"
          description="Enterprise discipline meets product-grade creativity — from infrastructure to immersive web."
        />

        <motion.div className="grid gap-6 lg:grid-cols-2">
          {aboutBlocks.map((block, i) => (
            <motion.article
              key={block.title}
              className="glass-panel neon-border group rounded-2xl p-6 transition-transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
            >
              <h3 className="font-display text-xl font-semibold text-white">{block.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{block.body}</p>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-neon/20"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
          >
            <LazyImage
              src={siteConfig.photo}
              alt={siteConfig.name}
              sizes={ABOUT_PHOTO_SIZES}
              rootMargin="200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
          </motion.div>

          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-neon">Credentials</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <span className="text-white">Employment:</span> {credentials.employment}
              </li>
              <li>
                <span className="text-white">Director:</span> {credentials.director}
              </li>
              <li>
                <span className="text-white">DIN:</span> {credentials.din}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="glass-panel rounded-xl p-5 text-center transition hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
            >
              <Counter value={kpi.value} suffix={kpi.suffix} />
              <p className="mt-2 text-xs text-muted">{kpi.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
