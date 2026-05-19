"use client";

import type { OrbitSkill } from "@/lib/data/skill-logos";
import { cn } from "@/lib/utils/cn";

/** Native img — avoids Next/Image LCP + aspect-ratio warnings inside R3F Html */
export function SkillLogo({
  skill,
  size = 40,
  className,
}: {
  skill: OrbitSkill;
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={skill.logo}
      alt={`${skill.name} logo`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn(
        "max-h-full max-w-full object-contain",
        skill.invert && "brightness-0 invert",
        className
      )}
      style={{ width: "auto", height: "auto", maxWidth: size, maxHeight: size }}
    />
  );
}
