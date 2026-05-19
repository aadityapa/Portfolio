import { siteConfig } from "./site-config";

export type ProjectCategory =
  | "AI"
  | "Blockchain"
  | "Infrastructure"
  | "AIOps"
  | "Web"
  | "Enterprise"
  | "3D";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categories: string[];
  description: string;
  longDescription: string;
  features: string[];
  stack: string[];
  image: string;
  demo?: string;
  github?: string;
  accent: string;
  period?: string;
  company?: string;
  metrics?: { label: string; value: string }[];
  highlights?: string[];
};

/** All projects — existing four preserved + four new flagship builds */
export const projects: Project[] = [
  {
    id: "trustocr",
    slug: "trustocr-ai",
    title: "TrustOCR AI — Blockchain-Verified Document Intelligence",
    category: "AI",
    categories: ["AI", "Blockchain", "OCR", "Enterprise SaaS"],
    description:
      "Full-stack AI OCR platform with document structuring, OpenAI/Ollama insights, and EVM on-chain verification.",
    longDescription:
      "TrustOCR AI combines browser-side OCR and document parsing (images, PDF, Word) with AI-driven structuring and insights. Optional EVM registry stores SHA-256 fingerprints on-chain with verification certificates and a 3D pipeline view for compliance-grade workflows.",
    features: [
      "OCR extraction from PDF, image, and Word",
      "AI document structuring (OpenAI / Ollama)",
      "SHA-256 blockchain verification",
      "EVM on-chain registry",
      "Verification certificate UX",
      "3D pipeline visualization",
    ],
    stack: ["Next.js", "React", "Solidity", "Hardhat", "OpenAI", "OCR", "Vercel"],
    image: "/images/projects/trustocr.jpg",
    demo: "https://ocr-chi-ivory.vercel.app",
    github: "https://github.com/aadityapa/ocr.git",
    accent: "#a78bfa",
    period: "Mar 2026 — Apr 2026",
    company: "Nexovo Tech Services Private Limited",
    metrics: [
      { label: "Formats", value: "PDF · Image · Word" },
      { label: "Verification", value: "On-chain EVM" },
      { label: "License", value: "MIT Open Source" },
    ],
  },
  {
    id: "corporate-network",
    slug: "corporate-network-infrastructure",
    title: "Corporate Network Infrastructure",
    category: "Infrastructure",
    categories: ["Enterprise Infrastructure", "Networking", "Security"],
    description:
      "Enterprise-grade network for 350 users — SonicWALL, VLAN segmentation, DMZ, and HA architecture.",
    longDescription:
      "Designed and documented end-to-end corporate network infrastructure for Godrej Properties Limited: dual ISP failover, load balancing, department VLANs, LACP uplinks, and HP Gen10 DMZ services across nine managed switches.",
    features: [
      "SonicWALL TZ540 firewall",
      "Dual ISP failover & load balancing",
      "VLAN segmentation & LACP uplinks",
      "HP Gen10 DMZ server",
      "9 managed switches",
      "350 systems across secure subnets",
    ],
    stack: ["SonicWALL", "D-Link L3", "VLAN", "DMZ", "ITIL", "Documentation"],
    image: "/images/projects/network.jpg",
    github: "https://github.com/aadityapa/corporate-network-infrastructure.git",
    accent: "#22d3ee",
    period: "Sep 2025 — Oct 2025",
    company: "Godrej Properties Limited",
    metrics: [
      { label: "Users", value: "350" },
      { label: "Switches", value: "9" },
      { label: "Availability", value: "HA Design" },
    ],
  },
  {
    id: "nexovo-helling",
    slug: "nexovo-helling-cloud",
    title: "Nexovo Helling Cloud Platform — AI-Native Reliability Automation",
    category: "AIOps",
    categories: ["AIOps", "DevOps", "SRE", "Cloud"],
    description:
      "AI-driven reliability automation — incident detection, explainable RCA, escalation workflows, and audit-grade visibility.",
    longDescription:
      "Full-stack AIOps control plane moving teams from reactive firefighting to proactive reliability. Real-time detection, AI-assisted remediation, webhook integrations (Slack, Jira), KPI intelligence, runbooks, and ROI estimation on a cloud-native Render stack.",
    features: [
      "Incident detection & explainable RCA",
      "Escalation & owner workflows",
      "Webhook integrations",
      "KPI intelligence dashboards",
      "Runbook guidance",
      "Threaded collaboration",
    ],
    stack: ["Streamlit", "FastAPI", "Kubernetes", "Python", "Cloud-native", "AI"],
    image: "/images/projects/aiops.jpg",
    github: "https://github.com/aadityapa/Self-Healing-Cloud-Platform",
    accent: "#818cf8",
    company: "Nexovo Tech Services Private Limited",
    metrics: [
      { label: "Focus", value: "MTTR ↓" },
      { label: "Stack", value: "K8s Native" },
      { label: "Deploy", value: "Render Cloud" },
    ],
  },
  {
    id: "ritika-infotech",
    slug: "ritika-infotech",
    title: "Ritika Infotech — SEO-Optimized IT Service Platform",
    category: "Web",
    categories: ["Web Development", "SEO", "Hosting"],
    description:
      "Production SEO-optimized IT services website — visibility, performance, and scalable deployment.",
    longDescription:
      "Built and deployed a production-grade SEO-optimized platform improving Google visibility and customer engagement. Responsive design, domain & hosting management, and performance-tuned frontend architecture.",
    features: [
      "SEO optimization & rankings",
      "Responsive production UI",
      "Domain & hosting management",
      "Performance optimization",
      "Scalable frontend architecture",
    ],
    stack: ["HTML", "CSS", "JavaScript", "SEO", "Hosting", "Analytics"],
    image: "/images/projects/ritika.jpg",
    demo: "https://ritikainfotech.in",
    github: "https://github.com/aadityapa/ritikainfotech.git",
    accent: "#34d399",
    company: "Nexovo Tech Services Private Limited",
    metrics: [
      { label: "Status", value: "Live Production" },
      { label: "Focus", value: "SEO Growth" },
      { label: "Stack", value: "Web + Ops" },
    ],
  },
  {
    id: "infra",
    slug: "enterprise-infrastructure-optimization",
    title: "Enterprise Infrastructure Optimization",
    category: "Enterprise",
    categories: ["Enterprise", "IT Operations"],
    description:
      "Proactive system administration, capacity planning, and governance for reliability at scale.",
    longDescription:
      "Improved infrastructure reliability and performance through proactive administration, capacity planning, and operational governance across enterprise systems.",
    features: [
      "Capacity planning",
      "Preventive maintenance",
      "Uptime monitoring",
      "Governance controls",
    ],
    stack: ["Windows Server", "Networking", "Monitoring", "ITIL"],
    image: "/images/projects/infra.jpg",
    demo: siteConfig.links.linkedin,
    github: siteConfig.links.linkedin,
    accent: "#22d3ee",
    metrics: [
      { label: "Focus", value: "Uptime" },
      { label: "Scope", value: "Enterprise" },
    ],
  },
  {
    id: "security",
    slug: "security-compliance-hardening",
    title: "Security & Compliance Hardening",
    category: "Enterprise",
    categories: ["Security", "Compliance"],
    description:
      "Policy controls, audit readiness, and preventive monitoring across endpoints and cloud.",
    longDescription:
      "Strengthened endpoint and network security with policy controls, audit readiness practices, and preventive monitoring for enterprise compliance.",
    features: [
      "Policy enforcement",
      "Audit readiness",
      "Endpoint security",
      "Preventive monitoring",
    ],
    stack: ["M365", "Identity", "Compliance", "Security"],
    image: "/images/projects/security.jpg",
    demo: siteConfig.links.linkedin,
    github: siteConfig.links.linkedin,
    accent: "#818cf8",
  },
  {
    id: "delivery",
    slug: "service-delivery-excellence",
    title: "Service Delivery Excellence",
    category: "Enterprise",
    categories: ["IT Service", "Operations"],
    description:
      "Streamlined incident response, software lifecycle management, and cross-functional coordination.",
    longDescription:
      "Enhanced user support quality with streamlined incident response, software lifecycle management, and efficient cross-functional coordination.",
    features: [
      "Incident response",
      "Software lifecycle",
      "Cross-team coordination",
      "SLA alignment",
    ],
    stack: ["Support", "Automation", "Documentation", "SLA"],
    image: "/images/projects/delivery.jpg",
    demo: siteConfig.links.linkedin,
    github: siteConfig.links.linkedin,
    accent: "#34d399",
  },
  {
    id: "immersive",
    slug: "immersive-portfolio-experience",
    title: "Immersive Portfolio Experience",
    category: "3D",
    categories: ["3D", "Web", "Creative Dev"],
    description:
      "Cinematic 3D web experience with React Three Fiber, shaders, and scroll-driven storytelling.",
    longDescription:
      "This portfolio — a multi-page cinematic experience with WebGL, GSAP ScrollTrigger, Lenis, and premium motion design.",
    features: [
      "React Three Fiber scenes",
      "GSAP scroll storytelling",
      "Lenis smooth scroll",
      "Glassmorphism UI",
    ],
    stack: ["Next.js", "R3F", "GSAP", "Framer Motion", "Three.js"],
    image: "/images/projects/immersive.jpg",
    demo: "/",
    github: siteConfig.links.github,
    accent: "#f472b6",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export const projectCategories = [
  "All",
  "AI",
  "Blockchain",
  "Infrastructure",
  "AIOps",
  "Web",
  "Enterprise",
  "3D",
] as const;
