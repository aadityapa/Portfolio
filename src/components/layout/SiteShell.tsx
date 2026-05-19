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
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
