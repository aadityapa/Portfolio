"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { orbitSkills } from "@/lib/data/skill-logos";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function TechBrandStrip() {
  const reduced = useReducedMotion();
  const items = [...orbitSkills, ...orbitSkills];

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-void/60 py-4 md:mt-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-void to-transparent" />
      <motion.div
        className="flex w-max items-center gap-8 px-6 md:gap-12 md:px-10"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={reduced ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="group flex shrink-0 flex-col items-center gap-2"
            title={skill.name}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-surface/80 p-2 transition group-hover:border-neon/40 md:h-14 md:w-14"
              style={{ boxShadow: `0 0 18px ${skill.glow}` }}
            >
              <Image
                src={skill.logo}
                alt={skill.name}
                width={32}
                height={32}
                className={`h-7 w-7 object-contain md:h-8 md:w-8 ${skill.invert ? "brightness-0 invert" : ""}`}
              />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
              {skill.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
