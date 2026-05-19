"use client";

import { Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Monitor({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group position={position}>
        <RoundedBox args={[1.6, 1, 0.08]} radius={0.04} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0.6, 0.05]}>
          <planeGeometry args={[1.4, 0.85]} />
          <MeshDistortMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.35}
            distort={0.15}
            speed={2}
            transparent
            opacity={0.85}
          />
        </mesh>
        <RoundedBox args={[0.15, 0.5, 0.15]} radius={0.02} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.35} />
        </RoundedBox>
        <RoundedBox args={[1.2, 0.08, 0.6]} radius={0.02} position={[0, -0.35, 0]}>
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </RoundedBox>
      </group>
    </Float>
  );
}

export function WorkspaceScene({
  mouse,
}: {
  mouse: { normalizedX: number; normalizedY: number };
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.normalizedX * 0.25,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.normalizedY * 0.08,
      0.05
    );
  });

  return (
    <group ref={group} position={[1.8, -0.2, 0]}>
      <Monitor position={[0, 0, 0]} />
      <Float speed={1.5} floatIntensity={0.3}>
        <RoundedBox args={[0.35, 0.08, 0.25]} radius={0.02} position={[-0.9, 0.15, 0.3]}>
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.15} />
        </RoundedBox>
      </Float>
      <pointLight position={[2, 3, 2]} intensity={2} color="#22d3ee" />
      <pointLight position={[-2, 1, -1]} intensity={1.2} color="#818cf8" />
      <ambientLight intensity={0.35} />
    </group>
  );
}
