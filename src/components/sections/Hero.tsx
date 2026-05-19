"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { HERO_PHOTO_SIZES, IMAGE_BLUR } from "@/components/ui/LazyImage";
import { heroContent, siteConfig } from "@/lib/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { TypingText } from "@/components/ui/TypingText";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

const techIcons = ["React", "Next", "AI", "R3F", "Node", "GSAP"];

export function Hero() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <HeroCanvas />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-40" />

      {/* Orbiting tech labels */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {techIcons.map((label, i) => (
          <motion.span
            key={label}
            className="absolute rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-slate-300 backdrop-blur-md"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 22}%`,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, i % 2 ? 3 : -3, 0],
            }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {label}
          </motion.span>
        ))}
      </div>

      <div className="section-pad relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          className="glass-panel neon-border rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-neon">
            Portfolio 2026
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl">
            <span className="neon-text block">
              <SplitText text={heroContent.name} delay={2.5} />
            </span>
          </h1>
          <p className="mt-4 font-display text-xl font-medium text-slate-200 md:text-2xl">
            <SplitText text={heroContent.headline} delay={2.7} />
          </p>
          <p className="mt-3 text-sm text-neon/90 md:text-base">
            {heroContent.tags.join(" • ")}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {heroContent.subtitle}
          </p>
          <motion.div className="mt-6">
            <TypingText lines={heroContent.typingLines} />
          </motion.div>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#contact">Start a Project</MagneticButton>
            <MagneticButton href="#projects" variant="ghost">
              View Work
            </MagneticButton>
            <MagneticButton href={siteConfig.resume} variant="ghost">
              Download CV
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden justify-center lg:flex"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
        >
          <div className="absolute inset-0 rounded-full bg-neon/20 blur-[100px]" />
          <motion.div
            className="relative h-[min(520px,70vh)] w-full max-w-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={siteConfig.photo}
              alt={siteConfig.name}
              fill
              sizes={HERO_PHOTO_SIZES}
              priority={isDesktop}
              loading={isDesktop ? "eager" : "lazy"}
              fetchPriority={isDesktop ? "high" : "low"}
              placeholder="blur"
              blurDataURL={IMAGE_BLUR}
              className="object-contain drop-shadow-[0_0_60px_rgba(34,211,238,0.25)]"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted"
        animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}
