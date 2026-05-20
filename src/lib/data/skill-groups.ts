export type SkillItem = {
  name: string;
  description?: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  icon: string;
  accent: string;
  specialization: string;
  theme: string;
  outcomes: string[];
  skills: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai-automation",
    title: "AI & Automation",
    icon: "AI",
    accent: "#8b5cf6",
    specialization: "AI-native systems and automated intelligence pipelines.",
    theme: "Neural intelligence mesh",
    outcomes: [
      "Automated incident triage",
      "Production OCR intelligence",
      "Agentic workflow orchestration",
    ],
    skills: [
      { name: "OpenAI", description: "LLM integration and workflow logic" },
      { name: "Ollama", description: "Local model orchestration" },
      { name: "AI Agents", description: "Multi-step agent systems" },
      { name: "AI Automation", description: "Repeatable operational pipelines" },
      { name: "OCR Pipelines", description: "Document extraction and validation" },
      { name: "AI Workflow Systems", description: "Task routing and orchestration" },
      { name: "Incident Intelligence", description: "Signal-driven response automation" },
      { name: "AI Observability", description: "Quality and model output tracking" },
    ],
  },
  {
    id: "full-stack",
    title: "Full Stack Development",
    icon: "FS",
    accent: "#22d3ee",
    specialization: "Product-grade web experiences with premium motion UI.",
    theme: "Cinematic interface systems",
    outcomes: [
      "High-conversion frontend architecture",
      "Type-safe full stack delivery",
      "Cinematic interaction design",
    ],
    skills: [
      { name: "Next.js", description: "App Router and server rendering" },
      { name: "React.js", description: "Component architecture at scale" },
      { name: "TypeScript", description: "Type-safe development workflow" },
      { name: "Node.js", description: "Backend services and APIs" },
      { name: "FastAPI", description: "High-performance Python endpoints" },
      { name: "Tailwind CSS", description: "Consistent spacing and design system" },
      { name: "Framer Motion", description: "Interactive motion architecture" },
      { name: "GSAP", description: "Scroll-linked cinematic animation" },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "CL",
    accent: "#818cf8",
    specialization: "Cloud-native deployment, monitoring, and infrastructure automation.",
    theme: "Distributed cloud fabric",
    outcomes: [
      "Reliable container orchestration",
      "Operational observability",
      "Automated infrastructure pipelines",
    ],
    skills: [
      { name: "Kubernetes", description: "Container orchestration" },
      { name: "Docker", description: "Portable runtime environments" },
      { name: "AWS", description: "Cloud architecture and deployment" },
      { name: "Cloud Computing", description: "Scalable infrastructure strategy" },
      { name: "DevOps", description: "Delivery and reliability workflows" },
      { name: "Linux Administration", description: "Production host management" },
      { name: "Server Monitoring", description: "Health and uptime visibility" },
      { name: "Infrastructure Automation", description: "Repeatable ops execution" },
    ],
  },
  {
    id: "enterprise-infra",
    title: "Enterprise Infrastructure",
    icon: "EN",
    accent: "#22c55e",
    specialization: "Enterprise-grade networking, identity, and security controls.",
    theme: "Secure packet topology",
    outcomes: [
      "Segmented secure networking",
      "Identity and access governance",
      "Hardened enterprise perimeters",
    ],
    skills: [
      { name: "Network Infrastructure", description: "Campus and enterprise network planning" },
      { name: "VLAN Architecture", description: "Logical segmentation and isolation" },
      { name: "SonicWALL Firewall", description: "Policy and perimeter security" },
      { name: "DNS Server", description: "Name resolution services" },
      { name: "Active Directory", description: "Identity and access control" },
      { name: "Windows Server", description: "Directory and server operations" },
      { name: "VMware", description: "Virtualized infrastructure operations" },
      { name: "Network Security", description: "Secure enterprise connectivity" },
    ],
  },
  {
    id: "blockchain-web3",
    title: "Blockchain & Web3",
    icon: "BC",
    accent: "#f472b6",
    specialization: "Verification-first smart contract engineering.",
    theme: "Trust and verification chain",
    outcomes: [
      "Smart contract lifecycle delivery",
      "On-chain verification patterns",
      "EVM-compatible system design",
    ],
    skills: [
      { name: "Solidity", description: "Contract authoring and logic" },
      { name: "Hardhat", description: "Build, test, deploy workflow" },
      { name: "EVM", description: "Execution model understanding" },
      { name: "Blockchain Verification", description: "On-chain validation patterns" },
      { name: "Smart Contract Development", description: "Secure protocol features" },
    ],
  },
  {
    id: "seo-digital",
    title: "SEO & Digital Systems",
    icon: "SEO",
    accent: "#eab308",
    specialization: "Growth-aware web delivery and performance systems.",
    theme: "Signal and growth analytics",
    outcomes: [
      "Search visibility improvements",
      "Performance-led deployment quality",
      "Domain and hosting reliability",
    ],
    skills: [
      { name: "SEO Optimization", description: "Search-first technical execution" },
      { name: "Domain & Hosting Management", description: "DNS, hosting, and lifecycle control" },
      { name: "Performance Optimization", description: "Speed, Core Web Vitals, and UX" },
      { name: "Web Deployment", description: "Production release operations" },
    ],
  },
];

/** Curated orbital highlights for premium presentation */
export const orbitalHighlights = [
  { name: "OpenAI", color: "#8b5cf6", glow: "rgba(139,92,246,0.45)" },
  { name: "AI Agents", color: "#22d3ee", glow: "rgba(34,211,238,0.45)" },
  { name: "Next.js", color: "#ffffff", glow: "rgba(255,255,255,0.35)" },
  { name: "TypeScript", color: "#3b82f6", glow: "rgba(59,130,246,0.45)" },
  { name: "Kubernetes", color: "#818cf8", glow: "rgba(129,140,248,0.45)" },
  { name: "Enterprise Network", color: "#22c55e", glow: "rgba(34,197,94,0.45)" },
  {
    name: "Blockchain Verification",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.45)",
  },
  { name: "SEO Optimization", color: "#eab308", glow: "rgba(234,179,8,0.45)" },
];
