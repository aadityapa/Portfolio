"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data/portfolio";

const socials = [
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "GitHub", href: siteConfig.links.github },
  { label: "Email", href: `mailto:${siteConfig.email}` },
  { label: "WhatsApp", href: siteConfig.links.whatsapp },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-void py-12 md:py-16 lg:py-20" data-story-section>
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-15" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-neon/12 blur-[90px]"
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container-page relative text-center">
        <div className="divider-glow mx-auto mb-10 max-w-md" />

        <motion.div
          className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          AP<span className="text-neon">.</span>
        </motion.div>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Crafted with Next.js, Framer Motion & GSAP
        </p>
        <p className="mt-2 text-xs text-slate-600">
          Karnex Software Solution · NEXOVO TECH SERVICES PRIVATE LIMITED
        </p>
        <motion.p
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-neon/75"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        >
          session.end() · systems synchronized
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10 md:gap-4">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 transition hover:border-neon/40 hover:text-neon hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              data-cursor="pointer"
            >
              {s.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
