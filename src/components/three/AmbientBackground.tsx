"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#22d3ee" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function AmbientBackground() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduced = useReducedMotion();
  if (reduced) return <div className="pointer-events-none fixed inset-0 -z-20 bg-void" />;

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.08),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(129,140,248,0.06),transparent_40%)]" />
      {!isMobile && (
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.2]} gl={{ antialias: false, alpha: true }}>
          <ParticleField count={120} />
        </Canvas>
      )}
    </div>
  );
}
