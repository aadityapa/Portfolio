"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, projectCategories } from "@/lib/data/projects";
import { cn } from "@/lib/utils/cn";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter(
      (p) =>
        p.category === filter ||
        p.categories.some((c) => c.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [filter]);

  return (
    <>
      <PageHero
        label="Projects"
        title="Cinematic project universe"
        description="Eight builds — from AI OCR and AIOps to enterprise infrastructure and immersive 3D. Every project has a dedicated case study."
      />
      <section className="section-pad pt-0">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition",
                  filter === cat
                    ? "border-neon bg-neon/15 text-neon"
                    : "border-white/15 text-slate-400 hover:border-white/30"
                )}
                data-cursor="pointer"
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
