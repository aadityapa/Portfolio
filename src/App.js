import React, { useEffect } from "react";
import { Parallax } from "react-parallax";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  // Image paths
  const bgHero = process.env.PUBLIC_URL + "/images/hero-bg.jpg";
  const aadityaPhoto = process.env.PUBLIC_URL + "/images/aaditya-photo.png";
  const contactBg = process.env.PUBLIC_URL + "/images/contact-bg.jpg";
  const neonShapes = process.env.PUBLIC_URL + "/images/neon-shapes.jpg";
  const neonLines = process.env.PUBLIC_URL + "/images/neon-lines.jpg";
  const skillsBg = process.env.PUBLIC_URL + "/images/skills-bg.jpg";
  const certificationsBg =process.env.PUBLIC_URL + "/images/certifications-bg.jpg";
  const networkImg = process.env.PUBLIC_URL + "/images/network2.jpg";
  const resumePDF =
    process.env.PUBLIC_URL +
    "/Aaditya-Padiya-Innovating-the-Digital-Frontier.pdf";

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="font-sans text-gray-900">
      {/* HERO */}
      <Parallax bgImage={bgHero} strength={300}>
        <section
          id="hero"
          className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-8 py-20 text-white"
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div
            className="relative z-10 md:w-1/2 space-y-6"
            data-aos="fade-right"
          >
            <h1 className="text-5xl font-bold leading-tight">
              Aaditya Padiya: <br /> Innovating the Digital Frontier
            </h1>
            <p className="text-lg italic">
              Explore a profile of expertise in IT, development, and digital
              solutions.
            </p>
            <p>
              With a steadfast commitment to pioneering advancements, Aaditya
              Padiya stands at the forefront of digital transformation.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Driving impactful IT strategies.</li>
              <li>Mastering full–stack development and cloud technologies.</li>
              <li>Championing secure and robust digital solutions.</li>
              <li>Fostering innovation in emerging tech landscapes.</li>
            </ul>
            <div className="flex space-x-4 pt-4">
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded"
              >
                Get in Touch
              </a>
              <a
                href="#skills"
                className="border border-white hover:bg-white hover:text-black px-5 py-2 rounded"
              >
                View Skills
              </a>
              <a
                href={resumePDF}
                download
                className="bg-white text-black px-5 py-2 rounded hover:bg-gray-200"
              >
                Download Resume
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
              className="max-h-[500px] object-contain"
            />
          </div>
        </section>
      </Parallax>

      {/* SKILLS */}
      <Parallax bgImage={skillsBg} strength={300}>
        <section id="skills" className="relative py-20 text-white">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 items-start">
            <div data-aos="fade-right">
              <img
                src={neonShapes}
                alt="Neon Shapes"
                className="max-w-sm w-full mx-auto"
              />
            </div>
            <div data-aos="fade-left">
              <h3 className="text-4xl font-semibold mb-12 text-center md:text-left">
                Core Competencies
              </h3>
              <div className="space-y-14">
                {[
                  {
                    icon: "/icons/server-icon.svg",
                    title: "IT Infrastructure Management",
                    desc: "Expertise in overseeing and optimizing IT systems.",
                  },
                  {
                    icon: "/icons/software-icon.svg",
                    title: "Software Installation",
                    desc: "Proficient in deploying and configuring various software solutions.",
                  },
                  {
                    icon: "/icons/windows-icon.svg",
                    title: "Office 365 Administration",
                    desc: "Skilled in managing and maintaining Office 365 environments.",
                  },
                ].map((skill, idx) => (
                  <div
                    key={idx}
                    className="skill-card relative border border-blue-500 rounded-lg p-6"
                  >
                    <div className="absolute -top-7 left-6 bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center skill-icon">
                      <img
                        src={process.env.PUBLIC_URL + skill.icon}
                        alt={`${skill.title} Icon`}
                        className="w-7 h-7"
                      />
                    </div>
                    <h4 className="text-xl font-semibold mt-4">
                      {skill.title}
                    </h4>
                    <p className="text-gray-300 mt-2 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Parallax>

      {/* CERTIFICATES */}
      <Parallax bgImage={certificationsBg} strength={300}>
        <section id="certifications" className="relative py-10 text-white min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div
            className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
            data-aos="fade-up"
          >
            <h3 className="text-4xl font-semibold mb-12">
              Certificates & Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-2">
                  AWS Certified Solutions Architect
                </h4>
                <p className="text-gray-300">Amazon Web Services</p>
              </div>
              <div className="p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-2">
                  Microsoft 365 Certified: Enterprise Administrator
                </h4>
                <p className="text-gray-300">Microsoft</p>
              </div>
              <div className="p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-2">
                  Google IT Support Professional
                </h4>
                <p className="text-gray-300">Google</p>
              </div>
            </div>
          </div>
        </section>
      </Parallax>

      {/* EXPERIENCE - ALTERNATING TIMELINE */}
<Parallax bgImage={networkImg} strength={300}>
  <section id="experience" className="relative py-20 text-white">
    {/* Light overlay for slight dim effect */}
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" data-aos="fade-up">
      <h3 className="text-4xl font-semibold mb-16 text-center">Professional Experience</h3>

      <div className="relative">
        {/* Vertical line in the center */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 border-l-2 border-blue-500"></div>

        {/* Box 1 - Top Left */}
        <div className="mb-20 flex justify-start">
          <div className="w-1/2 pr-8 relative" data-aos="fade-right">
            <div className="timeline-dot absolute -right-6 top-1/2 transform -translate-y-1/2">1</div>
            <div className="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg">
              <p className="text-lg text-blue-300 font-semibold">January 2025 - Present</p>
              <h4 className="text-2xl font-bold">Information Technology Engineer</h4>
              <p className="mt-2 text-gray-200">
                Godrej Properties Limited, Pune, Maharashtra, India (7 months)
              </p>
            </div>
          </div>
        </div>

        {/* Box 2 - Middle Right */}
        <div className="flex justify-end mt-32">
          <div className="w-1/2 pl-8 relative" data-aos="fade-left">
            <div className="timeline-dot absolute -left-6 top-1/2 transform -translate-y-1/2">2</div>
            <div className="bg-black bg-opacity-60 p-6 rounded-lg shadow-lg">
              <p className="text-lg text-blue-300 font-semibold">January 2024 - January 2025</p>
              <h4 className="text-2xl font-bold">IT Manager</h4>
              <p className="mt-2 text-gray-200">
                Mediprobe Consultancy Services Pvt Ltd, Pune, Maharashtra, India (1 year 1 month)
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</Parallax>

      {/* EDUCATION */}
<Parallax bgImage={neonLines} strength={300}>
  <section id="education" className="relative py-90 text-white min-h-[400px] flex items-center">
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10" data-aos="fade-up">
      <h3 className="text-3xl font-semibold mb-6">Education</h3>
      <div>
        <h4 className="text-xl font-bold">Bachelor of Computer Applications (BCA)</h4>
        <p className="text-gray-300">Shri Shivaji Science College | Sep 2020 - Jun 2023</p>
      </div>
    </div>
  </section>
</Parallax>


      {/* CONTACT */}
      <Parallax bgImage={contactBg} strength={300}>
        <section id="contact" className="relative py-20 text-white">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div
            className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center"
            data-aos="fade-up"
          >
            <h3 className="text-4xl font-semibold mb-12">
              Connect with Aaditya
            </h3>
            <p className="mb-4">Mobile: 9423477787</p>
            <p className="mb-4">
              Email:{" "}
              <a
                href="mailto:aadityapadiya@gmail.com"
                className="text-blue-400 hover:underline"
              >
                aadityapadiya@gmail.com
              </a>
            </p>
            <a
              href="https://www.linkedin.com/in/aadityapadiya"
              className="text-blue-400 hover:underline"
            >
              LinkedIn Profile
            </a>
          </div>
        </section>
      </Parallax>

      {/* FOOTER */}
      <footer className="text-center py-6 bg-gray-900 text-white border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} Aaditya Padiya. All rights reserved.</p>
      </footer>
    </div>
  );
}
