"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { heroContent, siteConfig } from "@/lib/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { TypingText } from "@/components/ui/TypingText";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

const microLabels = [
  "AI Orchestration",
  "Cloud Sync",
  "Neural Routing",
  "OCR Pipelines",
  "Security Layer",
];

const dashboardWidgets = [
  { title: "AI Accuracy", value: "99.2%", status: "stable" },
  { title: "Active Nodes", value: "128", status: "online" },
  { title: "Infra Health", value: "98.7%", status: "optimal" },
  { title: "Automation", value: "Live", status: "running" },
];

const terminalLogs = [
  "> initializing AI systems...",
  "> cloud sync active",
  "> OCR pipelines operational",
  "> neural routing connected",
  "> blockchain verification enabled",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isSmallLaptop = useMediaQuery("(max-width: 1366px)");
  const mouse = useMousePosition();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -38]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.82, 1], [1, 0.96, 0.78]);
  const aboutBlendOpacity = useTransform(scrollYProgress, [0.45, 1], [0, 1]);
  const activeWidgets = useMemo(
    () => (isSmallLaptop ? dashboardWidgets.slice(0, 3) : dashboardWidgets),
    [isSmallLaptop]
  );
  const activeLabels = useMemo(
    () => (isSmallLaptop ? microLabels.slice(0, 3) : microLabels),
    [isSmallLaptop]
  );
  const ambientDots = isSmallLaptop ? 8 : 12;

  return (
    <section ref={sectionRef} id="hero" className="section-cinematic relative flex min-h-[95vh] items-center overflow-hidden">
      <HeroCanvas />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,7,18,0.2)_0%,rgba(3,7,18,0.72)_95%)]" />
      <motion.div
        style={{ opacity: aboutBlendOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-56 bg-linear-to-b from-transparent via-void/55 to-surface"
      />

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {activeLabels.map((label, i) => (
          <motion.span
            key={label}
            className="absolute rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-slate-300 backdrop-blur-md"
            style={{
              left: `${8 + i * 15}%`,
              top: `${14 + (i % 2) * 66}%`,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.45, 0.95, 0.45],
            }}
            transition={{ duration: 4 + i * 0.32, repeat: Infinity, ease: "easeInOut" }}
          >
            {label}
          </motion.span>
        ))}
      </div>

      <div className="container-page relative z-10 grid w-full items-center gap-10 py-24 md:py-28 lg:grid-cols-2 lg:gap-12 lg:py-32">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="card-pro neon-border relative rounded-3xl p-7! md:p-9!"
          data-parallax="0.08"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="pointer-events-none absolute -right-20 top-8 h-44 w-44 rounded-full bg-neon/12 blur-[80px]"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-neon">
            AI Command Center
          </p>
          <h1 className="font-display text-4xl font-bold leading-[0.94] tracking-tight text-white md:text-6xl lg:text-7xl">
            {["ENGINEERING", "AI-NATIVE", "DIGITAL SYSTEMS"].map((line, idx) => (
              <span key={line} className="block">
                <span className="neon-text">
                  <SplitText text={line} delay={0.3 + idx * 0.14} />
                </span>
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-[1.75] text-slate-300 md:text-base">
            {heroContent.subtitle}
          </p>
          <p className="mt-3 text-sm font-medium text-neon/90 md:text-base">
            {heroContent.tags.join(" • ")}
          </p>
          <motion.div className="mt-6 rounded-xl border border-neon/25 bg-void/70 px-4 py-3 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
            <TypingText lines={heroContent.typingLines} />
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.16 } },
            }}
          >
            {[
              {
                key: "contact",
                element: (
                  <MagneticButton
                    href="/contact"
                    className="bg-linear-to-r from-neon via-cyan-300 to-neon text-void shadow-[0_0_36px_rgba(34,211,238,0.45)]"
                  >
                    Initialize Collaboration
                  </MagneticButton>
                ),
              },
              {
                key: "projects",
                element: (
                  <MagneticButton href="/projects" variant="ghost" className="border-neon/30 bg-neon/5">
                    View Work
                  </MagneticButton>
                ),
              },
              {
                key: "cv",
                element: (
                  <MagneticButton href={siteConfig.resume} variant="ghost" className="border-white/20 bg-white/3">
                    Download CV
                  </MagneticButton>
                ),
              },
            ].map((item, idx) => (
              <motion.div
                key={item.key}
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                whileHover={{ y: -2 }}
              >
                <motion.div
                  animate={{ y: [0, idx === 0 ? -0.9 : -0.6, 0] }}
                  transition={{ duration: 3.8 + idx * 0.45, repeat: Infinity, ease: "easeInOut" }}
                >
                  {item.element}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 rounded-2xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neon">Live AI Terminal</p>
            <div className="mt-3 space-y-1.5 font-mono text-xs text-slate-300">
              {terminalLogs.map((line, idx) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + idx * 0.12 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: rightY, opacity: contentOpacity }}
          className="relative"
          data-parallax="0.11"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="card-pro neon-border relative min-h-[520px] overflow-hidden rounded-3xl p-5! md:p-6!">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.14),transparent_58%)]" />
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/50 md:h-52 md:w-52"
              animate={isDesktop ? { rotate: 360 } : undefined}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-3 rounded-full border border-dashed border-accent/40" />
              <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.35),transparent_70%)]" />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ boxShadow: ["0 0 28px rgba(34,211,238,0.2)", "0 0 56px rgba(34,211,238,0.48)", "0 0 28px rgba(34,211,238,0.2)"] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neon/40 bg-void/90 text-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3.6, repeat: Infinity }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neon">AI Core</p>
            </motion.div>

            {activeWidgets.map((widget, idx) => (
              <motion.div
                key={widget.title}
                className="absolute z-40 w-[180px] rounded-xl border border-white/10 bg-slate-950/80 p-3 backdrop-blur-md"
                data-parallax="0.16"
                style={{
                  left: idx % 2 ? "auto" : "8%",
                  right: idx % 2 ? "8%" : "auto",
                  top: `${14 + Math.floor(idx / 2) * 56}%`,
                  x: mouse.normalizedX * (isSmallLaptop ? 5 : idx % 2 ? -10 : 10),
                  y: mouse.normalizedY * (isSmallLaptop ? 4 : idx % 2 ? -8 : 8),
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.4 + idx * 0.3, repeat: Infinity }}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{widget.title}</p>
                <p className="mt-1 font-display text-lg text-white">{widget.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-neon">{widget.status}</p>
              </motion.div>
            ))}

            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-40 rounded-xl border border-white/10 bg-void/75 p-3 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neon">System Pulse</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["AI Processing", "Cloud Sync", "Security Layers"].map((item, idx) => (
                  <motion.div
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/3 px-2 py-2 text-center"
                    animate={{ opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 2 + idx * 0.4, repeat: Infinity }}
                  >
                    <p className="text-[10px] text-slate-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0">
              {[...Array(ambientDots)].map((_, idx) => (
                <motion.span
                  key={idx}
                  className="absolute h-1.5 w-1.5 rounded-full bg-neon/80"
                  style={{
                    left: `${10 + (idx % 4) * 23}%`,
                    top: `${12 + Math.floor(idx / 4) * 27}%`,
                  }}
                  animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -6, 0] }}
                  transition={{ duration: 2.8 + idx * 0.12, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted"
        animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}
