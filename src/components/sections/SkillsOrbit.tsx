"use client";

import { orbitSkills } from "@/lib/data/skill-logos";
import { SkillLogo } from "@/components/ui/SkillLogo";
import { cn } from "@/lib/utils/cn";

/** CSS 3D orbit — stable spacing, no Html-in-R3F overlap, GPU-friendly */
export function SkillsOrbit() {
  const count = orbitSkills.length;
  const radius = 168;

  return (
    <div className="relative mx-auto flex h-[min(520px,72vh)] w-full max-w-3xl items-center justify-center">
      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-neon/40 bg-void/90 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
        <span className="font-display text-xl font-bold text-neon">AP</span>
      </div>

      <div
        className="orbit-ring absolute left-1/2 top-1/2"
        style={{
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
        }}
      >
        {orbitSkills.map((skill, i) => {
          const angle = (360 / count) * i;
          return (
            <div
              key={skill.name}
              className="orbit-node absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translateY(-${radius}px)`,
              }}
            >
              <div className="orbit-node-inner -translate-x-1/2">
                <div
                  className={cn(
                    "group flex w-[108px] flex-col items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/90 p-3 backdrop-blur-md transition",
                    "hover:border-neon/40"
                  )}
                  style={{ boxShadow: `0 0 0 transparent`, ["--glow" as string]: skill.glow }}
                  data-cursor="pointer"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${skill.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 transparent";
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-void/50"
                    style={{ boxShadow: `0 0 18px ${skill.glow}` }}
                  >
                    <SkillLogo skill={skill} size={32} />
                  </div>
                  <span className="text-center text-[10px] font-medium leading-tight text-slate-200">
                    {skill.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,transparent_35%,#030712_78%)]" />
    </div>
  );
}
