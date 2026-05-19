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

export function About({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-neon/10 blur-[120px]" />
      <div className="container-page relative">
        {showHeading && (
          <SectionHeading
            label="About"
            title="Engineering with cinematic precision"
            description="Enterprise discipline meets product-grade creativity — from infrastructure to immersive web."
          />
        )}

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {aboutBlocks.map((block, i) => (
            <motion.article
              key={block.title}
              className="card-pro neon-border flex h-full flex-col group hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                {block.title}
              </h3>
              <p className="prose-body mt-4 flex-1 text-sm md:text-base">{block.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 grid items-stretch gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_1.15fr] lg:gap-10">
          <motion.div
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-neon/25 shadow-[0_0_50px_rgba(34,211,238,0.08)] lg:mx-0"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <LazyImage
              src={siteConfig.photo}
              alt={siteConfig.name}
              sizes={ABOUT_PHOTO_SIZES}
              rootMargin="200px"
              className="object-cover"
            />
            <motion.div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/20 to-transparent" />
          </motion.div>

          <motion.div
            className="card-pro flex flex-col justify-center"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Credentials</p>
            <ul className="mt-5 space-y-4 text-base leading-[1.7] text-slate-300">
              <li>
                <span className="font-medium text-white">Employment:</span> {credentials.employment}
              </li>
              <li>
                <span className="font-medium text-white">Director:</span> {credentials.director}
              </li>
              <li>
                <span className="font-medium text-white">DIN:</span> {credentials.din}
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:mt-14 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              className="card-pro flex min-h-[120px] flex-col items-center justify-center text-center hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <Counter value={kpi.value} suffix={kpi.suffix} />
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted md:text-sm">
                {kpi.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
