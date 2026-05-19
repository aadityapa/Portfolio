export const siteConfig = {
  name: "Aaditya Padiya",
  title: "Aaditya Padiya | Intelligent Digital Experiences",
  description:
    "Building intelligent digital experiences — AI, web, automation, and immersive 3D.",
  email: "aadityapadiya@gmail.com",
  phone: "9423477787",
  resume: "/Aaditya-Padiya-Innovating-the-Digital-Frontier.pdf",
  photo: "/images/aaditya-photo.png",
  links: {
    linkedin:
      "https://www.linkedin.com/in/aaditya-padiya?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/aadityapadiya",
    whatsapp: "https://wa.me/919423477787",
  },
};

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
] as const;

export const heroContent = {
  name: "Aaditya Padiya",
  headline: "Building Intelligent Digital Experiences",
  tags: ["AI", "Web", "Automation", "3D Experiences"],
  subtitle:
    "System Administrator at Karnex · Director at NEXOVO TECH · Crafting premium web, AI automation, and cinematic 3D products.",
  typingLines: [
    "Enterprise IT & cloud operations",
    "AI-powered workflow automation",
    "Immersive React & Three.js experiences",
    "Full-stack SaaS & mobile products",
  ],
};

export const kpis = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Core Domains", value: 6, suffix: "+" },
  { label: "Leadership Projects", value: 15, suffix: "+" },
  { label: "Uptime Focus", value: 99, suffix: "%" },
];

export const aboutBlocks = [
  {
    title: "Who I Am",
    body: "Technology leader blending enterprise IT operations with modern product engineering — from infrastructure reliability to AI-driven digital experiences.",
  },
  {
    title: "What I Build",
    body: "Intelligent web platforms, automation pipelines, immersive 3D interfaces, and secure SaaS systems that feel premium and perform at scale.",
  },
  {
    title: "Technologies",
    body: "React, Next.js, Node.js, Python, MongoDB, Three.js, GSAP, Framer Motion, Microsoft 365, AWS, and AI automation stacks.",
  },
  {
    title: "Mission",
    body: "Deliver measurable outcomes — stronger uptime, faster delivery, and unforgettable user experiences that elevate brands.",
  },
];

export { orbitSkills } from "./skill-logos";

export const projects = [
  {
    id: "infra",
    title: "Enterprise Infrastructure Optimization",
    description:
      "Proactive system administration, capacity planning, and governance for reliability at scale.",
    stack: ["Windows Server", "Networking", "Monitoring", "ITIL"],
    image: "/images/projects/infra.jpg",
    demo: siteConfig.links.linkedin,
    github: siteConfig.links.linkedin,
    accent: "#22d3ee",
  },
  {
    id: "security",
    title: "Security & Compliance Hardening",
    description:
      "Policy controls, audit readiness, and preventive monitoring across endpoints and cloud.",
    stack: ["M365", "Identity", "Compliance", "Security"],
    image: "/images/projects/security.jpg",
    demo: siteConfig.links.linkedin,
    github: siteConfig.links.linkedin,
    accent: "#818cf8",
  },
  {
    id: "delivery",
    title: "Service Delivery Excellence",
    description:
      "Streamlined incident response, software lifecycle management, and cross-functional coordination.",
    stack: ["Support", "Automation", "Documentation", "SLA"],
    image: "/images/projects/delivery.jpg",
    demo: siteConfig.links.linkedin,
    github: siteConfig.links.linkedin,
    accent: "#34d399",
  },
  {
    id: "immersive",
    title: "Immersive Portfolio Experience",
    description:
      "Cinematic 3D web experience with React Three Fiber, shaders, and scroll-driven storytelling.",
    stack: ["Next.js", "R3F", "GSAP", "Framer Motion"],
    image: "/images/projects/immersive.jpg",
    demo: "#hero",
    github: siteConfig.links.github,
    accent: "#f472b6",
  },
];

export const services = [
  {
    title: "AI Automation",
    description: "Intelligent workflows, agents, and integrations that eliminate repetitive ops.",
    icon: "brain",
  },
  {
    title: "Web Development",
    description: "High-performance Next.js apps with premium motion and conversion-focused UX.",
    icon: "globe",
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform experiences with native feel and scalable backends.",
    icon: "mobile",
  },
  {
    title: "UI/UX Design",
    description: "Design systems, prototypes, and interfaces inspired by world-class product teams.",
    icon: "palette",
  },
  {
    title: "3D Websites",
    description: "WebGL, shaders, and interactive 3D that make brands unforgettable.",
    icon: "cube",
  },
  {
    title: "SaaS Development",
    description: "End-to-end SaaS from architecture to deployment with security built in.",
    icon: "cloud",
  },
];

export const experience = [
  {
    period: "Nov 2025 — Present",
    role: "System Administrator",
    company: "Karnex Software Solution, Pune",
    description: "Infrastructure reliability, deployments, and enterprise support at scale.",
  },
  {
    period: "Jan 2025 — Nov 2025",
    role: "Information Technology Engineer",
    company: "Godrej Properties Limited, Pune",
    description: "Enterprise IT operations, security, and cross-team technology delivery.",
  },
  {
    period: "Jan 2024 — Jan 2025",
    role: "IT Manager",
    company: "Mediprobe Consultancy Services Pvt. Ltd., Pune",
    description: "Team leadership, governance, and operational excellence across IT services.",
  },
];

export const testimonials = [
  {
    quote:
      "Aaditya brings rare discipline — enterprise-grade reliability with a product mindset for modern digital experiences.",
    author: "Technology Leadership",
    role: "Enterprise Client",
  },
  {
    quote:
      "Clear communication, fast execution, and security-first thinking. Our operations became measurably more stable.",
    author: "Operations Director",
    role: "Professional Services",
  },
  {
    quote:
      "From infrastructure to immersive web — the blend of IT depth and creative engineering is exceptional.",
    author: "Product Stakeholder",
    role: "Digital Transformation",
  },
];

export const credentials = {
  employment: "System Administrator, Karnex Software Solution",
  director: "Director, NEXOVO TECH SERVICES PRIVATE LIMITED",
  din: "11617549",
};
