"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 m = uMouse * 0.15;
  float wave = sin((uv.x + uTime * 0.08 + m.x) * 6.0) * 0.5 + 0.5;
  float wave2 = cos((uv.y - uTime * 0.06 + m.y) * 5.0) * 0.5 + 0.5;
  vec3 c1 = vec3(0.02, 0.05, 0.12);
  vec3 c2 = vec3(0.08, 0.55, 0.65);
  vec3 c3 = vec3(0.35, 0.25, 0.75);
  vec3 col = mix(c1, c2, wave);
  col = mix(col, c3, wave2 * 0.45);
  float vignette = 1.0 - distance(uv, vec2(0.5)) * 0.9;
  gl_FragColor = vec4(col * vignette, 1.0);
}
`;

export function GradientMesh({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
  });

  return (
    <mesh ref={ref} position={[0, 0, -2]} scale={[12, 8, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
