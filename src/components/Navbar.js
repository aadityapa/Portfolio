import React from "react";
import { Link } from "react-scroll";

export default function Navbar() {
  const sections = ["hero", "cto-summary", "about", "skills", "experience", "projects", "engagement", "contact"];
  const resumePDF =
    process.env.PUBLIC_URL +
    "/Aaditya-Padiya-Innovating-the-Digital-Frontier.pdf";
  const sectionLabels = {
    hero: "Home",
    "cto-summary": "CTO Summary",
    about: "Profile",
    skills: "Competencies",
    experience: "Experience",
    projects: "Projects",
    engagement: "Engagement",
    contact: "Contact",
  };

  return (
    <header className="p-5 shadow-xl sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-cyan-300/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div>
          <div className="text-xl md:text-2xl font-bold text-cyan-300 tracking-wide">Aaditya Padiya</div>
          <p className="text-[11px] text-slate-400 tracking-[0.16em] uppercase hidden md:block">
            Technology Leadership Portfolio
          </p>
        </div>
        <nav className="space-x-6 hidden md:flex flex-1 justify-center">
          {sections.map((s) => (
            <Link
              key={s}
              to={s}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass="text-cyan-300 font-semibold"
              className="cursor-pointer text-slate-200 hover:text-cyan-300 transition-colors duration-300"
            >
              {sectionLabels[s] || s.charAt(0).toUpperCase() + s.slice(1)}
            </Link>
          ))}
        </nav>
        <a
          href={resumePDF}
          download
          className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cyan-300/60 bg-slate-900/70 text-cyan-200 text-sm font-semibold hover:bg-cyan-400 hover:text-slate-900 transition-colors duration-300 whitespace-nowrap"
        >
          Download Executive Profile
        </a>
        <a
          href={resumePDF}
          download
          className="lg:hidden fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-300/60 bg-slate-900/90 text-cyan-100 text-xs font-semibold shadow-xl backdrop-blur-md"
        >
          Download Profile
        </a>
      </div>
    </header>
  );
}
