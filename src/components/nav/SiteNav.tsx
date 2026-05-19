"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { mainNav, extendedNav } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils/cn";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > lastY.current && y > 100);
    lastY.current = y;
  });

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      className={cn(
        "fixed top-4 left-1/2 z-[100] w-[min(96vw,1200px)] -translate-x-1/2 rounded-2xl border border-white/10 glass-panel px-3 py-2.5 transition-transform duration-500 md:px-5",
        hidden && "-translate-y-[140%]"
      )}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="font-display text-lg font-bold text-white" data-cursor="pointer">
          AP<span className="text-neon">.</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-lg px-2.5 py-1.5 text-xs font-medium transition md:px-3 md:text-sm",
                isActive(item.href) ? "text-neon" : "text-slate-300 hover:text-white"
              )}
              data-cursor="pointer"
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span
                  layoutId="site-nav-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-neon/10 ring-1 ring-neon/30"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={siteConfig.resume}
            download
            className="rounded-full border border-neon/40 px-3 py-1.5 text-xs font-semibold text-neon hover:bg-neon/10"
            data-cursor="pointer"
          >
            Resume
          </Link>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={cn("h-0.5 w-5 bg-white transition", open && "translate-y-1.5 rotate-45")} />
          <span className={cn("h-0.5 w-5 bg-white transition", open && "opacity-0")} />
          <span className={cn("h-0.5 w-5 bg-white transition", open && "-translate-y-1.5 -rotate-45")} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="grid gap-1 pt-3 pb-1">
              {[...mainNav, ...extendedNav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
