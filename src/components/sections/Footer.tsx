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
    <footer className="relative overflow-hidden border-t border-white/10 bg-void py-16">
      <motion.div className="grid-floor pointer-events-none absolute inset-0 opacity-20" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-neon/15 blur-[100px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-7xl px-6 text-center md:px-12">
        <motion.div
          className="font-display text-5xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          AP<span className="text-neon">.</span>
        </motion.div>
        <p className="mt-3 text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Crafted with Next.js, R3F & GSAP.
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Karnex Software Solution · NEXOVO TECH SERVICES PRIVATE LIMITED
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 transition hover:border-neon/50 hover:text-neon"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 12 }}
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
