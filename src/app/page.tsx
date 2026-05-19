import dynamic from "next/dynamic";
import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";

const Skills = dynamic(() =>
  import("@/components/sections/Skills").then((m) => m.Skills)
);
const Projects = dynamic(() =>
  import("@/components/sections/Projects").then((m) => m.Projects)
);
const Services = dynamic(() =>
  import("@/components/sections/Services").then((m) => m.Services)
);
const Experience = dynamic(() =>
  import("@/components/sections/Experience").then((m) => m.Experience)
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials)
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => m.Contact)
);

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
