"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsOrbitSystem } from "@/components/sections/SkillsOrbitSystem";
import { SkillsFallback } from "@/components/sections/SkillsFallback";
import { TechBrandStrip } from "@/components/sections/TechBrandStrip";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function Skills({ showHeading = true }: { showHeading?: boolean }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="skills"
      data-story-section
      className="section-cinematic section-pad relative overflow-hidden bg-void"
    >
      <div className="section-seam section-seam-top" />
      <div className="section-seam section-seam-bottom" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[480px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-page relative">
        {showHeading && (
          <SectionHeading
            label="Skills"
            title="Curated engineering capability architecture"
            description="Engineering AI-native systems blending automation, enterprise infrastructure, and cinematic digital experiences."
          />
        )}
        <div className="mb-6 flex flex-wrap gap-2 md:mb-8">
          {[
            "AI Systems",
            "Cloud Automation",
            "Enterprise Infrastructure",
            "Full Stack Experience",
            "Security-first Delivery",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neon/30 bg-neon/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-neon/90"
            >
              {tag}
            </span>
          ))}
        </div>
        <TechBrandStrip />
        {isMobile ? <SkillsFallback /> : <SkillsOrbitSystem />}
      </div>
    </section>
  );
}
