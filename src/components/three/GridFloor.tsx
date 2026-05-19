"use client";

import { Grid } from "@react-three/drei";

export function GridFloor() {
  return (
    <Grid
      position={[0, -1.2, 0]}
      args={[20, 20]}
      cellSize={0.5}
      cellThickness={0.6}
      cellColor="#22d3ee"
      sectionSize={2}
      sectionThickness={1}
      sectionColor="#818cf8"
      fadeDistance={18}
      fadeStrength={1.2}
      infiniteGrid
    />
  );
}
