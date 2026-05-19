"use client";

import dynamic from "next/dynamic";
import { PageHero } from "@/components/layout/PageHero";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

export default function LabsPage() {
  return (
    <>
      <PageHero
        label="Labs"
        title="Experimental playground"
        description="WebGL shaders, motion prototypes, and interaction R&D."
      />
      <section className="section-pad">
        <div className="relative mx-auto h-[60vh] max-w-7xl overflow-hidden rounded-3xl border border-white/10">
          <HeroCanvas />
          <div className="absolute inset-0 flex items-center justify-center bg-void/40 backdrop-blur-[2px]">
            <p className="glass-panel rounded-2xl px-6 py-4 text-sm text-slate-200">
              Live WebGL scene — drag the homepage hero into the lab.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
