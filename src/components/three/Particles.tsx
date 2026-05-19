"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export function Particles({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const velocity = useRef(0);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 8 - 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    velocity.current = THREE.MathUtils.lerp(velocity.current, 0.14, 0.05);
    ref.current.rotation.y += delta * 0.024;
    ref.current.rotation.x = Math.sin(performance.now() * 0.0001) * 0.06;
    ref.current.position.z = Math.sin(performance.now() * 0.00012) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#22d3ee"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
