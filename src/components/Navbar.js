import React from "react";
import { Link } from "react-scroll";

export default function Navbar() {
  const sections = ["hero", "about", "skills", "experience", "education", "contact"];

  return (
    <header className="p-6 shadow-md sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600">Aaditya Padiya</div>
        <nav className="space-x-6 hidden md:flex">
          {sections.map((s) => (
            <Link
              key={s}
              to={s}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass="text-indigo-600 font-bold"
              className="cursor-pointer hover:text-indigo-600"
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
