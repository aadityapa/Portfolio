"use client";

import { Canvas } from "@react-three/fiber";
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
  const particleCount = isMobile ? 80 : 220;

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 45 }}
        dpr={[1, isMobile ? 1.1 : 1.35]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <GradientMesh mouse={{ x: mouse.normalizedX, y: mouse.normalizedY }} />
          <GridFloor />
          <Particles count={particleCount} />
          <WorkspaceScene mouse={mouse} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/20 via-transparent to-void" />
    </div>
  );
}
