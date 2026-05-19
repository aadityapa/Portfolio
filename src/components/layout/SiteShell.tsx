"use client";

import dynamic from "next/dynamic";
import { SiteNav } from "@/components/nav/SiteNav";
import { Footer } from "@/components/sections/Footer";

const AmbientBackground = dynamic(
  () => import("@/components/three/AmbientBackground").then((m) => m.AmbientBackground),
  { ssr: false }
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main className="relative z-10">
        <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-24 bg-linear-to-b from-void via-void/50 to-transparent" />
        {children}
      </main>
      <Footer />
    </>
  );
}
