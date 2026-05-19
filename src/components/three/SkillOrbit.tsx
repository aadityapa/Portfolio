"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { orbitSkills, type OrbitSkill } from "@/lib/data/skill-logos";
import { SkillLogo } from "@/components/ui/SkillLogo";

function SkillLogoNode({
  skill,
  position,
}: {
  skill: OrbitSkill;
  position: THREE.Vector3;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const scale = hovered ? 1.12 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={hovered ? 0.35 : 0.18}
        />
      </mesh>

      <Html
        center
        distanceFactor={9}
        transform
        sprite
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        style={{ pointerEvents: "auto" }}
      >
        <div
          className="flex cursor-pointer flex-col items-center gap-2 transition-transform duration-300"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          data-cursor="pointer"
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-slate-900/90 p-2.5 shadow-lg backdrop-blur-md md:h-16 md:w-16"
            style={{
              boxShadow: hovered
                ? `0 0 32px ${skill.glow}, inset 0 0 0 1px rgba(255,255,255,0.08)`
                : `0 0 16px ${skill.glow}`,
            }}
          >
            <SkillLogo skill={skill} size={40} />
          </div>
          <span
            className="whitespace-nowrap rounded-full border border-white/10 bg-void/90 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm md:text-xs"
            style={{
              opacity: hovered ? 1 : 0.85,
              boxShadow: hovered ? `0 0 12px ${skill.glow}` : undefined,
            }}
          >
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

export function SkillOrbit() {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const nodes = useMemo(() => {
    const radius = 2.35;
    return orbitSkills.map((skill, i) => {
      const angle = (i / orbitSkills.length) * Math.PI * 2;
      return {
        skill,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(i * 0.65) * 0.45,
          Math.sin(angle) * radius
        ),
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.55}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      {nodes.map(({ skill, position }) => (
        <SkillLogoNode key={skill.name} skill={skill} position={position} />
      ))}
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={1.8} color="#818cf8" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#22d3ee" />
    </group>
  );
}
