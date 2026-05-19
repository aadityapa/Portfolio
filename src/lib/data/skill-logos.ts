/** Official brand logos (Devicon + Simple Icons) — stored in /public/logos */
export type OrbitSkill = {
  name: string;
  logo: string;
  color: string;
  glow: string;
  /** Lighten dark SVG marks on dark UI */
  invert?: boolean;
};

export const orbitSkills: OrbitSkill[] = [
  {
    name: "React",
    logo: "/logos/react.svg",
    color: "#61dafb",
    glow: "rgba(97,218,251,0.5)",
  },
  {
    name: "Next.js",
    logo: "/logos/nextjs.svg",
    color: "#ffffff",
    glow: "rgba(255,255,255,0.35)",
  },
  {
    name: "AI Automation",
    logo: "/logos/openai.svg",
    color: "#10a37f",
    glow: "rgba(16,163,127,0.45)",
  },
  {
    name: "Node.js",
    logo: "/logos/nodejs.svg",
    color: "#68a063",
    glow: "rgba(104,160,99,0.45)",
  },
  {
    name: "Three.js",
    logo: "/logos/threejs.svg",
    color: "#ffffff",
    glow: "rgba(4,158,244,0.45)",
  },
  {
    name: "MongoDB",
    logo: "/logos/mongodb.svg",
    color: "#00ed64",
    glow: "rgba(0,237,100,0.4)",
  },
  {
    name: "Python",
    logo: "/logos/python.svg",
    color: "#ffd43b",
    glow: "rgba(255,212,59,0.4)",
  },
  {
    name: "UI/UX",
    logo: "/logos/figma.svg",
    color: "#f24e1e",
    glow: "rgba(242,78,30,0.4)",
  },
  {
    name: "GSAP",
    logo: "/logos/gsap.svg",
    color: "#88ce02",
    glow: "rgba(136,206,2,0.45)",
    invert: true,
  },
  {
    name: "Framer Motion",
    logo: "/logos/framer.svg",
    color: "#0055ff",
    glow: "rgba(0,85,255,0.45)",
  },
];
