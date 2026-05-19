"use client";

import { orbitSkills } from "@/lib/data/skill-logos";
import { SkillLogo } from "@/components/ui/SkillLogo";

/** 2D grid fallback when WebGL is heavy or on small screens */
export function SkillsFallback() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {orbitSkills.map((skill) => (
        <div
          key={skill.name}
          className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-md transition hover:border-neon/30"
          data-cursor="pointer"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl p-2"
            style={{ boxShadow: `0 0 20px ${skill.glow}` }}
          >
            <SkillLogo skill={skill} size={36} />
          </div>
          <span className="text-center text-[11px] font-medium text-slate-200">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}
