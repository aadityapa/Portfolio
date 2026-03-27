import React, { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import AOS from "aos";
import "aos/dist/aos.css";

const KPI_TARGETS = [
  { label: "Years of Experience", value: 3, suffix: "+" },
  { label: "Core Domains", value: 6, suffix: "+" },
  { label: "Leadership Projects", value: 15, suffix: "+" },
  { label: "Operational Uptime Focus", value: 99, suffix: "%" },
];

export default function App() {
  // Image paths
  // Online media backgrounds (top sources: Unsplash + Pexels)
  const bgUnsplashTechGrid =
    "https://images.unsplash.com/photo-1759210358926-4673cc44d35f?auto=format&fit=crop&w=2000&q=80";
  const bgPexelsTechAbstract =
    "https://images.pexels.com/photos/31032753/pexels-photo-31032753.jpeg?auto=compress&cs=tinysrgb&w=2000";
  const bgPexelsCyberPattern =
    "https://images.pexels.com/photos/7135072/pexels-photo-7135072.jpeg?auto=compress&cs=tinysrgb&w=2000";
  const bgHero = bgUnsplashTechGrid;
  const aadityaPhoto = process.env.PUBLIC_URL + "/images/aaditya-photo.png";
  const contactBg = bgPexelsTechAbstract;
  const skillsBg = bgPexelsTechAbstract;
  const certificationsBg = bgPexelsCyberPattern;
  const resumePDF =
    process.env.PUBLIC_URL +
    "/Aaditya-Padiya-Innovating-the-Digital-Frontier.pdf";
  const linkedinProfile =
    "https://www.linkedin.com/in/aaditya-padiya?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  const [kpiValues, setKpiValues] = useState(KPI_TARGETS.map(() => 0));
  const [isHighVfx, setIsHighVfx] = useState(true);
  const skillsData = [
    {
      icon: "infrastructure",
      title: "IT Infrastructure Management",
      desc: "Designing and maintaining secure, scalable, and resilient enterprise systems.",
      tags: ["Security", "Uptime", "Governance"],
      details: [
        "Windows server administration and endpoint lifecycle",
        "Network uptime monitoring and incident response",
        "Capacity planning with preventive maintenance",
      ],
    },
    {
      icon: "software",
      title: "Software Installation",
      desc: "Standardized deployment and configuration of business-critical applications.",
      tags: ["Automation", "Deployment", "Support"],
      details: [
        "Enterprise software rollout with policy alignment",
        "Patch, upgrade, and compatibility management",
        "Troubleshooting, user enablement, and support documentation",
      ],
    },
    {
      icon: "office365",
      title: "Office 365 Administration",
      desc: "Operational management of Microsoft 365 services with governance controls.",
      tags: ["Identity", "Compliance", "Collaboration"],
      details: [
        "User provisioning, licensing, and access governance",
        "Mail and collaboration service reliability",
        "Security baselines, audit readiness, and policy enforcement",
      ],
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setKpiValues((prev) =>
        prev.map((current, index) => {
          const target = KPI_TARGETS[index].value;
          const step = Math.max(1, Math.ceil(target / 30));
          return current < target ? Math.min(target, current + step) : current;
        })
      );
    }, 45);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const mediaQuerySmall = window.matchMedia("(max-width: 1024px)");
    const mediaQueryReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncVfxMode = () => {
      if (mediaQuerySmall.matches || mediaQueryReduced.matches) {
        setIsHighVfx(false);
      }
    };

    syncVfxMode();
    mediaQuerySmall.addEventListener("change", syncVfxMode);
    mediaQueryReduced.addEventListener("change", syncVfxMode);

    return () => {
      mediaQuerySmall.removeEventListener("change", syncVfxMode);
      mediaQueryReduced.removeEventListener("change", syncVfxMode);
    };
  }, []);

  const renderTagIcon = (tag) => {
    const iconClass = "w-3.5 h-3.5";

    if (tag === "Security") {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9">
          <path d="M12 3 5 6v6c0 4.5 2.8 7.4 7 9 4.2-1.6 7-4.5 7-9V6z" />
        </svg>
      );
    }
    if (tag === "Uptime") {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9">
          <path d="M12 3v9l6 3" />
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      );
    }
    if (tag === "Governance" || tag === "Compliance") {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9">
          <path d="m5 12 4 4 10-10" />
          <rect x="3.5" y="4" width="17" height="16" rx="2.2" />
        </svg>
      );
    }
    if (tag === "Automation") {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.8 1.8 0 1 1-2.5 2.5l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1.8 1.8 0 1 1-3.6 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a1.8 1.8 0 1 1-2.5-2.5l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1.8 1.8 0 1 1 0-3.6h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a1.8 1.8 0 1 1 2.5-2.5l.1.1a1 1 0 0 0 1.1.2H9a1 1 0 0 0 .6-.9V4a1.8 1.8 0 1 1 3.6 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l.1-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.1a1 1 0 0 0-.2 1.1V9c0 .4.2.7.6.9h.2a1.8 1.8 0 1 1 0 3.6h-.2a1 1 0 0 0-.9.7z" />
        </svg>
      );
    }
    if (tag === "Deployment") {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9">
          <path d="m12 4 7 4-7 4-7-4z" />
          <path d="m5 12 7 4 7-4" />
          <path d="m5 16 7 4 7-4" />
        </svg>
      );
    }
    if (tag === "Support") {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9">
          <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-2v-7h4" />
          <path d="M4 12v5a2 2 0 0 0 2 2h2v-7H4" />
        </svg>
      );
    }
    if (tag === "Identity") {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9">
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
    }
    if (tag === "Collaboration") {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9">
          <circle cx="8" cy="9" r="2.4" />
          <circle cx="16" cy="9" r="2.4" />
          <path d="M3.5 19a4.5 4.5 0 0 1 9 0M11.5 19a4.5 4.5 0 0 1 9 0" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M3 12h18" />
      </svg>
    );
  };

  return (
    <div className={`app-shell font-sans bg-slate-950 text-slate-100 ${isHighVfx ? "high-vfx" : "normal-vfx"}`}>
      <div className="tech-vfx-grid"></div>
      <div className="tech-vfx-glow"></div>
      <div className="tech-vfx-cursor"></div>
      {isHighVfx && <div className="tech-vfx-particles"></div>}
      {isHighVfx && <div className="tech-vfx-scanlines"></div>}
      <button
        type="button"
        onClick={() => setIsHighVfx((prev) => !prev)}
        className="vfx-toggle-btn"
      >
        VFX: {isHighVfx ? "High" : "Normal"}
      </button>
      {/* HERO */}
      <Parallax bgImage={bgHero} strength={300}>
        <section
          id="hero"
          className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-8 py-20 text-white"
        >
          <div className="absolute inset-0 bg-slate-950/80"></div>
          <div className="vfx-orb vfx-orb-one"></div>
          <div className="vfx-orb vfx-orb-two"></div>
          <div
            className="relative z-10 md:w-1/2 space-y-6"
            data-aos="fade-right"
          >
            <div className="monogram-badge">AP</div>
            <h1 className="hero-title text-5xl font-bold leading-tight">
              Aaditya Padiya: <br /> Building Reliable Technology That Delivers Results
            </h1>
            <p className="text-lg italic text-slate-200">
              Enterprise technology leadership focused on security, uptime, and measurable business outcomes.
            </p>
            <p className="text-slate-300">
              I help organizations reduce downtime, improve operational efficiency, and strengthen digital readiness through disciplined IT execution.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-300/30 bg-slate-900/50 text-cyan-200 text-xs">
                System Administrator (Karnex)
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-300/30 bg-slate-900/50 text-cyan-200 text-xs">
                Director (NEXOVO TECH SERVICES PRIVATE LIMITED)
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-300/30 bg-slate-900/50 text-cyan-200 text-xs">
                DIN: 11617549
              </span>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-slate-200">
              <li>Improve infrastructure reliability and service continuity.</li>
              <li>Standardize secure deployments and reduce operational risk.</li>
              <li>Strengthen governance with practical compliance controls.</li>
              <li>Enable teams with faster, stable, and scalable IT support.</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="#contact"
                className="btn-executive px-5 py-2 rounded"
              >
                Get in Touch
              </a>
              <a
                href="#skills"
                className="border border-cyan-300 text-cyan-200 hover:bg-cyan-400 hover:text-slate-900 px-5 py-2 rounded transition-colors duration-300"
              >
                View Skills
              </a>
              <a
                href={resumePDF}
                download
                className="bg-white text-black px-5 py-2 rounded hover:bg-cyan-100"
              >
                Download Resume
              </a>
              <a
                href={resumePDF}
                download
                className="border border-cyan-300 text-cyan-200 px-5 py-2 rounded hover:bg-cyan-400 hover:text-slate-900 transition-colors duration-300"
              >
                Download Executive Profile
              </a>
              <a
                href={linkedinProfile}
                target="_blank"
                rel="noreferrer"
                className="border border-cyan-300 text-cyan-200 px-5 py-2 rounded hover:bg-cyan-400 hover:text-slate-900 transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div
            className="relative z-10 md:w-1/2 flex justify-center mt-10 md:mt-0"
            data-aos="fade-left"
          >
            <img
              src={aadityaPhoto}
              alt="Aaditya Padiya"
              className="hero-photo max-h-[500px] object-contain"
            />
          </div>
        </section>
      </Parallax>

      {/* CTO EXECUTIVE SUMMARY */}
      <section id="cto-summary" className="relative py-16 bg-slate-950 text-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_45%)]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="rounded-2xl border border-cyan-300/25 bg-slate-900/70 p-8 lg:p-10 shadow-2xl" data-aos="fade-up">
            <p className="uppercase tracking-[0.22em] text-xs text-cyan-300 mb-4">CTO Executive Summary</p>
            <h2 className="text-3xl lg:text-4xl font-semibold leading-tight">
              Building Secure, Scalable Technology Operations for Business Growth
            </h2>
            <p className="text-slate-300 mt-5 max-w-4xl">
              I bring a delivery-first leadership style that combines governance, reliability engineering, and operational discipline. My approach helps clients achieve stronger uptime, predictable operations, and secure collaboration at scale.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="summary-pill">
                <p className="summary-pill-title">Strategic Vision</p>
                <p className="summary-pill-text">Roadmaps aligned to growth priorities and execution timelines.</p>
              </div>
              <div className="summary-pill">
                <p className="summary-pill-title">Architecture & Reliability</p>
                <p className="summary-pill-text">Stable systems, performance optimization, and continuity planning.</p>
              </div>
              <div className="summary-pill">
                <p className="summary-pill-title">Governance & Security</p>
                <p className="summary-pill-text">Identity governance, compliance controls, and risk-aware operations.</p>
              </div>
            </div>
            <div className="mt-8">
              <a
                href={resumePDF}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
                </svg>
                Download Executive Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / EXECUTIVE PROFILE */}
      <section id="about" className="bg-slate-900 text-slate-100 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(34,211,238,0.18), transparent 50%)",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 rounded-xl border border-cyan-300/25 bg-slate-900/70 p-8 shadow-2xl" data-aos="fade-up">
            <p className="uppercase tracking-[0.25em] text-xs text-cyan-300 mb-4">Executive Profile</p>
            <h2 className="text-4xl font-semibold mb-5 leading-tight">
              CTO-Style Technology Leadership for Reliable, Secure Operations
            </h2>
            <p className="text-slate-300">
              I lead end-to-end IT operations with a focus on security, governance, reliability, and continuity.
            </p>
            <p className="text-slate-300 mt-4">
              I am employed at Karnex Software Solution as a System Administrator, and I serve as Director of NEXOVO TECH SERVICES PRIVATE LIMITED—combining hands-on delivery with strategic direction.
            </p>
          </div>
          <div className="rounded-xl border border-cyan-300/25 bg-slate-900/70 p-8 shadow-2xl" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-2xl font-semibold mb-4">Executive Credentials</h3>
            <div className="space-y-3 text-slate-300">
              <p><span className="text-cyan-300 font-semibold">Name:</span> Aaditya Padiya</p>
              <p><span className="text-cyan-300 font-semibold">Current Employment:</span> System Administrator, Karnex Software Solution</p>
              <p><span className="text-cyan-300 font-semibold">Director Position:</span> NEXOVO TECH SERVICES PRIVATE LIMITED</p>
              <p><span className="text-cyan-300 font-semibold">DIN:</span> 11617549</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {KPI_TARGETS.map((item, index) => (
              <div key={item.label} className="kpi-card rounded-lg px-5 py-6 text-center" data-aos="fade-up" data-aos-delay={index * 80}>
                <p className="text-3xl lg:text-4xl font-bold text-cyan-300">
                  {kpiValues[index]}
                  {item.suffix}
                </p>
                <p className="text-slate-300 text-sm mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <Parallax bgImage={skillsBg} strength={300}>
        <section id="skills" className="relative py-20 text-white">
          <div className="absolute inset-0 bg-slate-950/85"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div data-aos="fade-up">
              <h3 className="text-4xl font-semibold mb-2 text-center text-cyan-200">
                Core Competencies
              </h3>
              <p className="text-slate-300 mb-10 text-center max-w-3xl mx-auto">
                Execution-focused capabilities designed to improve uptime, security posture, and operational efficiency.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" data-aos="fade-up">
              {skillsData.map((skill, idx) => (
                <div
                  key={idx}
                  className="skill-card relative border border-cyan-300/35 rounded-lg p-6 h-full"
                >
                  <div className="absolute -top-7 left-6 bg-cyan-400 w-14 h-14 rounded-full flex items-center justify-center skill-icon">
                    {skill.icon === "infrastructure" && (
                      <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-900" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="4" width="18" height="5" rx="1.5" />
                        <rect x="3" y="10" width="18" height="5" rx="1.5" />
                        <rect x="3" y="16" width="18" height="4" rx="1.5" />
                        <circle cx="7" cy="6.5" r="0.8" fill="currentColor" />
                        <circle cx="7" cy="12.5" r="0.8" fill="currentColor" />
                        <circle cx="7" cy="18" r="0.8" fill="currentColor" />
                      </svg>
                    )}
                    {skill.icon === "software" && (
                      <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-900" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z" />
                        <path d="M8 8h8M8 12h5M8 16h8" />
                        <path d="m15.5 12.5 1.8 1.8-3.6 3.6-1.2.2.2-1.2z" />
                      </svg>
                    )}
                    {skill.icon === "office365" && (
                      <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-900" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="4" y="4" width="7" height="7" rx="1.5" />
                        <rect x="13" y="4" width="7" height="7" rx="1.5" />
                        <rect x="4" y="13" width="7" height="7" rx="1.5" />
                        <rect x="13" y="13" width="7" height="7" rx="1.5" />
                      </svg>
                    )}
                  </div>
                  <h4 className="text-xl font-semibold mt-4">
                    {skill.title}
                  </h4>
                  <p className="text-slate-300 mt-2 leading-relaxed">
                    {skill.desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="skill-tag">
                        {renderTagIcon(tag)}
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-3 text-sm text-slate-300/90 list-disc pl-5 space-y-1">
                    {skill.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Parallax>

      {/* CERTIFICATES */}
      <Parallax bgImage={certificationsBg} strength={300}>
        <section id="certifications" className="relative py-10 text-white min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-slate-950/85"></div>
          <div
            className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
            data-aos="fade-up"
          >
            <h3 className="text-4xl font-semibold mb-12 text-cyan-200">
              Certificates & Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-slate-900/40 border border-cyan-300/20 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-2">
                  AWS Certified Solutions Architect
                </h4>
                <p className="text-slate-300">Amazon Web Services</p>
              </div>
              <div className="p-6 bg-slate-900/40 border border-cyan-300/20 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-2">
                  Microsoft 365 Certified: Enterprise Administrator
                </h4>
                <p className="text-slate-300">Microsoft</p>
              </div>
              <div className="p-6 bg-slate-900/40 border border-cyan-300/20 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-2">
                  Google IT Support Professional
                </h4>
                <p className="text-slate-300">Google</p>
              </div>
            </div>
          </div>
        </section>
      </Parallax>

      {/* EXPERIENCE */}
      <section id="experience" className="experience-section relative py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top, rgba(34,211,238,0.16), transparent 45%)",
          }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.88),rgba(15,23,42,0.95))]"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" data-aos="fade-up">
          <h3 className="text-4xl font-semibold mb-2 text-center text-cyan-200">Professional Experience</h3>
          <p className="text-slate-300 mb-10 text-center max-w-3xl mx-auto">
            Career timeline showcasing progressive responsibility across infrastructure operations, governance, and technology service delivery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              {
                id: "1",
                period: "November 2025 - Present",
                role: "System Administrator",
                company: "Karnex Software Solution, Pune, Maharashtra, India",
              },
              {
                id: "2",
                period: "January 2025 - November 2025",
                role: "Information Technology Engineer",
                company: "Godrej Properties Limited, Pune, Maharashtra, India",
              },
              {
                id: "3",
                period: "January 2024 - January 2025",
                role: "IT Manager",
                company: "Mediprobe Consultancy Services Pvt. Ltd., Pune, Maharashtra, India",
              },
            ].map((item) => (
              <div key={item.id} className="experience-card p-6 rounded-xl border border-cyan-300/30 relative h-full">
                <div className="timeline-dot absolute -top-6 left-6">{item.id}</div>
                <p className="text-base md:text-lg text-cyan-300 font-semibold mt-2">{item.period}</p>
                <h4 className="text-2xl font-bold leading-snug mt-1">{item.role}</h4>
                <p className="mt-2 text-slate-300">{item.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative py-20 bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(34,211,238,0.16), transparent 58%)",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" data-aos="fade-up">
          <h3 className="text-4xl font-semibold mb-4 text-center text-cyan-200">Strategic Projects</h3>
          <p className="text-center text-slate-300 max-w-3xl mx-auto mb-12">
            A selection of high-impact initiatives focused on reliability, security, and service excellence. The complete project portfolio is available on LinkedIn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise Infrastructure Optimization",
                desc: "Improved infrastructure reliability and performance through proactive system administration, capacity planning, and operational governance.",
              },
              {
                title: "Security and Compliance Hardening",
                desc: "Strengthened endpoint and network security posture by implementing policy controls, audit readiness practices, and preventive monitoring.",
              },
              {
                title: "Service Delivery Excellence",
                desc: "Enhanced user support quality with streamlined incident response, software lifecycle management, and efficient cross-functional coordination.",
              },
            ].map((project, index) => (
              <div key={index} className="executive-card p-7 rounded-xl border border-cyan-300/25 bg-slate-900/75 shadow-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3">Project {index + 1}</p>
                <h4 className="text-xl font-semibold mb-3">{project.title}</h4>
                <p className="text-slate-300">{project.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={linkedinProfile}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-7 py-3 rounded-md bg-cyan-400 text-slate-900 hover:bg-cyan-300 transition-colors duration-300 font-semibold"
            >
              View Full LinkedIn Projects
            </a>
          </div>
        </div>
      </section>

      {/* CLIENT ENGAGEMENT */}
      <section id="engagement" className="relative py-20 bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at left center, rgba(34,211,238,0.15), transparent 52%)",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" data-aos="fade-up">
          <h3 className="text-4xl font-semibold mb-4 text-center text-cyan-200">Client Engagement</h3>
          <p className="text-center text-slate-300 max-w-3xl mx-auto mb-12">
            Structured service engagement designed to deliver measurable outcomes, stronger operations, and secure execution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                audience: "SME Businesses",
                focus: "Cost-efficient stability and dependable day-to-day IT operations.",
              },
              {
                audience: "Enterprise Teams",
                focus: "Governance-driven execution with uptime, compliance, and process discipline.",
              },
              {
                audience: "Startups & Scaleups",
                focus: "Fast, secure setup and scalable systems aligned to growth milestones.",
              },
            ].map((segment) => (
              <div key={segment.audience} className="audience-card">
                <p className="audience-card-title">{segment.audience}</p>
                <p className="audience-card-text">{segment.focus}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "IT Health Audit",
                desc: "Comprehensive assessment of infrastructure, performance, and security baselines.",
                outcome: "Clear risk map and 30-day optimization priorities.",
              },
              {
                title: "Infrastructure Optimization",
                desc: "Targeted improvements for uptime, response speed, and operational consistency.",
                outcome: "Reduced incident frequency and improved service reliability.",
              },
              {
                title: "Managed IT Support",
                desc: "Ongoing governance, monitoring, support workflows, and preventive maintenance.",
                outcome: "Sustainable operations with predictable delivery standards.",
              },
            ].map((item) => (
              <div key={item.title} className="service-card rounded-xl p-6 border border-cyan-300/25 bg-slate-900/70">
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="text-slate-300 mt-2">{item.desc}</p>
                <p className="text-cyan-300 text-sm mt-4">{item.outcome}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-cyan-300/25 bg-slate-900/70 p-6">
              <h4 className="text-2xl font-semibold mb-4">Delivery Timeline</h4>
              <div className="space-y-3">
                {[
                  "Week 1: Discovery and technical assessment",
                  "Week 2: Prioritized roadmap and action plan",
                  "Weeks 3-4: Implementation and stabilization",
                  "Ongoing: Monitoring, support, and optimization",
                ].map((step) => (
                  <div key={step} className="process-step">
                    <span className="process-step-dot"></span>
                    <p className="text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-cyan-300/25 bg-slate-900/70 p-6">
              <h4 className="text-2xl font-semibold mb-4">Why Clients Work With Me</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Reliable Delivery", "Security First", "Clear Communication", "Business Alignment"].map((item) => (
                  <span key={item} className="trust-badge">{item}</span>
                ))}
              </div>
              <p className="text-slate-300">
                I deliver practical technology solutions with accountability, transparent communication, and measurable impact on business operations.
              </p>
              <a
                href="#contact"
                className="inline-block mt-5 px-5 py-2 rounded-md bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 transition-colors duration-300"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <Parallax bgImage={contactBg} strength={300}>
        <section id="contact" className="relative py-20 text-white">
          <div className="absolute inset-0 bg-slate-950/85"></div>
          <div
            className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center"
            data-aos="fade-up"
          >
            <h3 className="text-4xl font-semibold mb-12 text-cyan-200">
              Let’s Build Your Next Reliable IT Environment
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-6">
              If you need stronger IT operations, secure systems, and dependable service delivery, let’s connect and discuss your requirements.
            </p>
            <p className="mb-4">Mobile: 9423477787</p>
            <p className="mb-4">
              Email:{" "}
              <a
                href="mailto:aadityapadiya@gmail.com"
                className="text-cyan-300 hover:underline"
              >
                aadityapadiya@gmail.com
              </a>
            </p>
            <a
              href={linkedinProfile}
              className="text-cyan-300 hover:underline"
            >
              LinkedIn Profile
            </a>
          </div>
        </section>
      </Parallax>

      {/* FOOTER */}
      <footer className="text-center py-6 bg-gray-900 text-white border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} Aaditya Padiya. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">
          Employee at Karnex Software Solution | Director at NEXOVO TECH SERVICES PRIVATE LIMITED
        </p>
      </footer>
    </div>
  );
}
