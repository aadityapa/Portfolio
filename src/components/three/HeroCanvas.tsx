"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import { useMousePosition } from "@/lib/hooks/useMousePosition";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { GradientMesh } from "./GradientMesh";
import { GridFloor } from "./GridFloor";
import { Particles } from "./Particles";
import { WorkspaceScene } from "./WorkspaceScene";

export function HeroCanvas() {
  const mouse = useMousePosition();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");
  const particleCount = isMobile ? 110 : isTablet ? 220 : 360;

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 45 }}
        dpr={[1, isMobile ? 1.05 : isTablet ? 1.2 : 1.35]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <GradientMesh mouse={{ x: mouse.normalizedX, y: mouse.normalizedY }} />
          <GridFloor />
          <Particles count={particleCount} />
          <WorkspaceScene mouse={mouse} />
          {!isMobile && (
            <Sparkles
              count={isTablet ? 22 : 36}
              speed={0.18}
              size={isTablet ? 1.6 : 1.9}
              color="#22d3ee"
              opacity={0.24}
              scale={[8, 4, 6]}
            />
          )}
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-void/20 via-transparent to-void" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_24%,rgba(34,211,238,0.14),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(34,211,238,0.04)_45%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-size-[100%_4px] opacity-20 [background:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px)]" />
    </div>
  );
}
