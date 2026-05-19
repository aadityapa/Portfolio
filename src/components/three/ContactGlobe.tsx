"use client";

import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function ContactGlobe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          metalness={0.85}
          roughness={0.15}
        />
        <Edges color="#22d3ee" threshold={15} />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 4]} intensity={2} color="#818cf8" />
    </group>
  );
}
