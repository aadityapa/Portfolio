import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function HomePage() {
  const featured = projects.slice(0, 4);

  return (
    <>
      <Hero />
      <section className="section-cinematic section-pad relative border-t border-white/10 bg-void/80">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-neon">Featured Work</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-5xl">
                Flagship systems
              </h2>
            </div>
            <MagneticButton href="/projects">Explore all projects</MagneticButton>
          </div>
          <div className="mt-12 grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/ai", label: "AI Systems", desc: "Agents & automation" },
              { href: "/infrastructure", label: "Infrastructure", desc: "Enterprise topology" },
              { href: "/labs", label: "Labs", desc: "Experiments" },
              { href: "/case-studies", label: "Case Studies", desc: "Deep dives" },
            ].map((portal) => (
              <Link
                key={portal.href}
                href={portal.href}
                className="card-pro group hover:border-neon/40"
                data-cursor="pointer"
              >
                <p className="font-display text-lg font-semibold text-white group-hover:text-neon">
                  {portal.label}
                </p>
                <p className="mt-1 text-sm text-muted">{portal.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
