"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navItems, siteConfig } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > lastY.current && y > 120);
    lastY.current = y;
  });

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header
      className={cn(
        "fixed top-4 left-1/2 z-[100] w-[min(92vw,1100px)] -translate-x-1/2 rounded-2xl border border-white/10 glass-panel px-4 py-3 transition-transform duration-500 md:px-6",
        hidden && "-translate-y-[140%]"
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
    >
      <motion.div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="font-display text-lg font-bold tracking-tight text-white"
          data-cursor="pointer"
        >
          AP<span className="text-neon">.</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={cn(
                "relative px-3 py-1.5 text-sm transition-colors",
                active === item.id ? "text-neon" : "text-slate-300 hover:text-white"
              )}
              data-cursor="pointer"
            >
              {item.label}
              {active === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-px bg-neon shadow-[0_0_12px_#22d3ee]"
                />
              )}
            </button>
          ))}
        </nav>

        <a
          href={siteConfig.resume}
          download
          className="hidden rounded-full border border-neon/40 px-4 py-2 text-xs font-semibold text-neon transition hover:bg-neon/10 md:inline-flex"
          data-cursor="pointer"
        >
          Resume
        </a>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          data-cursor="pointer"
        >
          <span className={cn("h-0.5 w-6 bg-white transition", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-6 bg-white transition", open && "opacity-0")} />
          <span className={cn("h-0.5 w-6 bg-white transition", open && "-translate-y-2 -rotate-45")} />
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-2 pt-4 pb-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
