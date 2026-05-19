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

function NeuralLattice() {
  const ref = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const nodes = 30;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodes; i += 1) {
      points.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10
        )
      );
    }
    const lines: number[] = [];
    for (let i = 0; i < points.length; i += 1) {
      const a = points[i];
      const b = points[(i + 7) % points.length];
      lines.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    return buffer;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.01;
    ref.current.rotation.x = Math.sin(performance.now() * 0.00008) * 0.08;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#22d3ee" transparent opacity={0.16} />
    </lineSegments>
  );
}

export function AmbientBackground() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reduced = useReducedMotion();

  const labels = [
    "neural mesh",
    "agent loop",
    "sync node",
    "cloud bus",
    "ocr stream",
    "security layer",
  ];

  if (reduced) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-20 bg-void">
        <div className="env-gradient absolute inset-0" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <div className="env-gradient absolute inset-0" />
      <div className="env-fog absolute inset-0" />
      <div className="env-streaks absolute inset-0 opacity-45" />
      <div className="env-scanlines absolute inset-0 opacity-20" />
      <div className="grid-floor absolute inset-0 opacity-15" />

      <div className="absolute inset-0 hidden lg:block">
        {labels.map((label, i) => (
          <span
            key={label}
            className="env-code-label absolute"
            style={{
              left: `${6 + (i % 3) * 30}%`,
              top: `${14 + Math.floor(i / 3) * 58}%`,
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {!isMobile && (
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.2]} gl={{ antialias: false, alpha: true }}>
          <ParticleField count={140} />
          <NeuralLattice />
        </Canvas>
      )}
    </div>
  );
}
