"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, string> = {
  brain: "◎",
  globe: "◉",
  mobile: "▢",
  palette: "◈",
  cube: "◇",
  cloud: "☁",
};

export function Services() {
  return (
    <section id="services" className="section-pad bg-void">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Services"
          title="Premium capabilities, delivered"
          description="Expandable cards with glow, tilt, and micro-interactions."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              className="glass-panel neon-border group relative overflow-hidden rounded-2xl p-6"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-3xl text-neon">{icons[service.icon] ?? "◆"}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
              <motion.div
                className="mt-4 h-px w-0 bg-neon group-hover:w-full"
                transition={{ duration: 0.5 }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
