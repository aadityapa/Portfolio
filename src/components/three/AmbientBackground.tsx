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

function DataStreams({ count }: { count: number }) {
  const ref = useRef<THREE.Group>(null);
  const streams = useMemo(() => {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      x: -12 + (index % 6) * 4.6,
      y: -6 + Math.floor(index / 6) * 2.2,
      z: -4 + (index % 4) * 1.8,
      scale: 0.6 + (index % 3) * 0.2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.04;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.22;
  });

  return (
    <group ref={ref}>
      {streams.map((stream) => (
        <mesh
          key={stream.id}
          position={[stream.x, stream.y, stream.z]}
          rotation={[0, 0, Math.PI * 0.14]}
          scale={[stream.scale, stream.scale, 1]}
        >
          <planeGeometry args={[1.7, 0.02]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.18} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export function AmbientBackground() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");
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
        <div className="env-vignette absolute inset-0" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <div className="env-gradient absolute inset-0" />
      <div className="env-fog absolute inset-0" />
      <div className="env-aurora absolute inset-0" />
      <div className="env-streaks absolute inset-0 opacity-45" />
      <div className="env-scanlines absolute inset-0 opacity-20" />
      <div className="env-noise absolute inset-0" />
      <div className="grid-floor absolute inset-0 opacity-15" />
      <div className="env-vignette absolute inset-0" />

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
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, isTablet ? 1.15 : 1.3]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <ParticleField count={isTablet ? 120 : 180} />
          <NeuralLattice />
          <DataStreams count={isTablet ? 14 : 22} />
        </Canvas>
      )}
    </div>
  );
}
