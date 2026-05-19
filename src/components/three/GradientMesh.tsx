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

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i + vec2(0.0, 0.0));
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.05 + 0.12;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  vec2 m = uMouse * 0.16;
  float time = uTime * 0.08;

  float wave = sin((uv.x + time + m.x) * 6.0) * 0.5 + 0.5;
  float wave2 = cos((uv.y - time * 0.8 + m.y) * 5.0) * 0.5 + 0.5;
  float n = fbm(uv * 3.4 + vec2(time * 0.6, -time * 0.35));
  float n2 = fbm((uv + m * 0.8) * 6.6 - vec2(time * 0.9, time * 0.5));
  float pulse = 0.5 + 0.5 * sin(uTime * 0.9);

  vec3 c1 = vec3(0.02, 0.05, 0.12);
  vec3 c2 = vec3(0.06, 0.48, 0.68);
  vec3 c3 = vec3(0.29, 0.22, 0.72);
  vec3 c4 = vec3(0.02, 0.65, 0.58);

  vec3 col = mix(c1, c2, wave * 0.68 + n * 0.32);
  col = mix(col, c3, wave2 * 0.36 + n2 * 0.22);
  col += c4 * (0.06 + pulse * 0.05) * smoothstep(0.55, 0.0, length(centered + m * 0.35));

  float vignette = 1.0 - distance(uv, vec2(0.5)) * 1.05;
  float scan = 0.985 + 0.015 * sin((uv.y + uTime * 0.3) * 420.0);
  float highlight = smoothstep(0.35, 0.0, length(centered - vec2(0.18, -0.05))) * 0.24;

  col *= vignette;
  col += highlight * vec3(0.06, 0.16, 0.22);
  col *= scan;
  gl_FragColor = vec4(col, 1.0);
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
