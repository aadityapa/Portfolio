"use client";

import { Float, MeshDistortMaterial, RoundedBox, Sphere, Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function DashboardPanel({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        <RoundedBox args={[1.7, 1.05, 0.08]} radius={0.04} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0.6, 0.05]}>
          <planeGeometry args={[1.5, 0.9]} />
          <MeshDistortMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.28}
            distort={0.08}
            speed={2}
            transparent
            opacity={0.75}
          />
        </mesh>
        <RoundedBox args={[0.15, 0.45, 0.15]} radius={0.02} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.35} />
        </RoundedBox>
        <RoundedBox args={[1.2, 0.08, 0.6]} radius={0.02} position={[0, -0.33, 0]}>
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </RoundedBox>
      </group>
    </Float>
  );
}

function NeuralConnections() {
  const ref = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const pointCount = 24;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < pointCount; i += 1) {
      const angle = (Math.PI * 2 * i) / pointCount;
      const radius = 1 + (i % 3) * 0.24;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, (Math.random() - 0.5) * 1.4, Math.sin(angle) * radius));
    }
    const vertices: number[] = [];
    for (let i = 0; i < points.length; i += 1) {
      const a = points[i];
      const b = points[(i + 5) % points.length];
      vertices.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return buffer;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.12;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.15;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#22d3ee" transparent opacity={0.3} />
    </lineSegments>
  );
}

function AICore() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.14;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <group ref={ref} position={[0.2, 0.5, 0]}>
      <Sphere args={[0.66, 48, 48]}>
        <meshPhysicalMaterial
          color="#0ea5e9"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
          roughness={0.22}
          metalness={0.45}
          transmission={0.25}
          transparent
          opacity={0.9}
        />
      </Sphere>
      <Torus args={[1.06, 0.02, 16, 128]} rotation={[Math.PI / 2.7, 0, 0]}>
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.4} />
      </Torus>
      <Torus args={[1.26, 0.018, 16, 128]} rotation={[Math.PI / 3.6, 0.8, 0]}>
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.35} />
      </Torus>
      <NeuralConnections />
    </group>
  );
}

function TelemetryBars() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, idx) => {
      const mesh = child as THREE.Mesh;
      mesh.scale.y = 0.5 + Math.abs(Math.sin(state.clock.elapsedTime * 1.8 + idx * 0.6)) * 1.2;
      mesh.position.y = -0.35 + mesh.scale.y * 0.17;
    });
  });

  return (
    <group ref={ref} position={[-0.9, -0.3, 0.55]}>
      {Array.from({ length: 8 }, (_, idx) => (
        <mesh key={idx} position={[idx * 0.12, 0, 0]}>
          <boxGeometry args={[0.06, 0.2, 0.06]} />
          <meshStandardMaterial color={idx % 3 === 0 ? "#818cf8" : "#22d3ee"} emissive="#22d3ee" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
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
    <group ref={group} position={[1.55, -0.15, 0]}>
      <AICore />
      <DashboardPanel position={[1.9, 0.02, -0.2]} />
      <TelemetryBars />
      <Float speed={1.5} floatIntensity={0.28}>
        <RoundedBox args={[0.4, 0.1, 0.3]} radius={0.02} position={[-1.15, 0.08, 0.28]}>
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.15} />
        </RoundedBox>
      </Float>
      <Float speed={1.2} floatIntensity={0.22}>
        <Torus args={[0.9, 0.015, 16, 96]} position={[-0.25, 0.7, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.25} />
        </Torus>
      </Float>
      <pointLight position={[2.1, 2.8, 2]} intensity={1.7} color="#22d3ee" />
      <pointLight position={[-1.7, 1.2, -1]} intensity={1.1} color="#818cf8" />
      <pointLight position={[0.2, 0.8, 1.4]} intensity={1} color="#0ea5e9" />
      <ambientLight intensity={0.28} />
    </group>
  );
}
