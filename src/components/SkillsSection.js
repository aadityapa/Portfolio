import React from "react";

export default function SkillsSection() {
  const skills = [
    {
      icon: "/icons/server-icon.svg",
      title: "IT Infrastructure Management",
      desc: "Expertise in overseeing and optimizing IT systems."
    },
    {
      icon: "/icons/software-icon.svg",
      title: "Software Installation",
      desc: "Proficient in deploying and configuring various software solutions."
    },
    {
      icon: "/icons/windows-icon.svg",
      title: "Office 365 Administration",
      desc: "Skilled in managing and maintaining Office 365 environments."
    }
  ];

  return (
    <section id="skills" className="relative py-20 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative flex justify-center items-center">
          <img
            src={process.env.PUBLIC_URL + "/images/neon-shapes-left.png"}
            alt="Neon Shapes"
            className="w-auto max-w-[80%] object-contain animate-pulse-slow"
          />
        </div>
        <div>
          <h3 className="text-4xl font-semibold mb-12 text-center md:text-left">
            Core Competencies
          </h3>
          <div className="space-y-12">
            {skills.map((skill, idx) => (
              <div key={idx} className="relative border border-blue-500 rounded-lg p-6 pt-12 bg-black bg-opacity-40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] transition-all duration-300">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center w-full px-6">
                  <div className="flex-grow border-t border-blue-500"></div>
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-black mx-2 icon-glow transition-all duration-300">
                    <img src={process.env.PUBLIC_URL + skill.icon} alt={skill.title} className="w-8 h-8" />
                  </div>
                  <div className="flex-grow border-t border-blue-500"></div>
                </div>
                <h4 className="text-xl font-bold text-center mt-8">{skill.title}</h4>
                <p className="text-gray-300 text-center mt-2">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
