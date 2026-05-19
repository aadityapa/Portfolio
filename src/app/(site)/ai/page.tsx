import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function AiPage() {
  const aiProjects = projects.filter(
    (p) =>
      p.category === "AI" ||
      p.category === "AIOps" ||
      p.categories.some((c) => c.includes("AI"))
  );

  return (
    <>
      <PageHero
        label="AI Systems"
        title="Agentic intelligence layer"
        description="OCR pipelines, reliability automation, and AI-native control planes."
      />
      <section className="section-pad pt-0">
        <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2">
          {aiProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-3xl glass-panel rounded-3xl p-8 text-center">
          <p className="text-sm text-muted">
            Orchestrating OpenAI, Ollama, FastAPI, and Streamlit into production-grade AI workflows.
          </p>
          <Link href="/contact" className="mt-4 inline-block text-neon hover:underline">
            Discuss an AI build →
          </Link>
        </div>
      </section>
    </>
  );
}
