"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsOrbit } from "@/components/sections/SkillsOrbit";
import { SkillsFallback } from "@/components/sections/SkillsFallback";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function Skills() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <section id="skills" className="section-pad relative overflow-hidden bg-void">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Skills"
          title="Orbital mastery of modern stacks"
          description="Official technology logos in a smooth orbit — hover each node to explore the stack."
        />
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/40">
          {isMobile ? <SkillsFallback /> : <SkillsOrbit />}
        </div>
      </div>
    </section>
  );
}
