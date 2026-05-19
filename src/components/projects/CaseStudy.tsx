"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data/projects";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <article>
      <section className="relative min-h-[70vh] overflow-hidden pt-28">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/40" />
        <div className="section-pad relative z-10 flex min-h-[60vh] flex-col justify-end pb-16">
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: project.accent }}>
            {project.categories.join(" · ")}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold text-white md:text-6xl">
            {project.title}
          </h1>
          {project.period && (
            <p className="mt-3 text-sm text-neon">
              {project.period}
              {project.company ? ` · ${project.company}` : ""}
            </p>
          )}
          <p className="mt-6 max-w-2xl text-lg text-slate-300">{project.longDescription}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.demo && (
              <MagneticButton href={project.demo}>Live Demo</MagneticButton>
            )}
            {project.github && (
              <MagneticButton href={project.github} variant="ghost">
                GitHub
              </MagneticButton>
            )}
            <MagneticButton href="/projects" variant="ghost">
              All Projects
            </MagneticButton>
          </div>
        </div>
      </section>

      {project.metrics && (
        <section className="section-pad border-y border-white/10 bg-surface/30">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="glass-panel rounded-2xl p-6 text-center">
                <p className="font-display text-3xl font-bold" style={{ color: project.accent }}>
                  {m.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Capabilities</h2>
            <ul className="mt-6 space-y-3">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Tech Stack</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  style={{ boxShadow: `0 0 20px ${project.accent}15` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-void">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-bold text-white">Architecture Flow</h2>
          <div
            className="mt-8 flex min-h-[280px] items-center justify-center rounded-3xl border border-dashed border-white/15 p-8"
            style={{
              background: `radial-gradient(circle at center, ${project.accent}12, transparent 70%)`,
            }}
          >
            <div className="grid gap-4 text-center sm:grid-cols-3">
              {["Ingest", "Process", "Deliver"].map((step, i) => (
                <div key={step} className="glass-panel rounded-2xl px-6 py-8">
                  <p className="text-xs text-neon">0{i + 1}</p>
                  <p className="mt-2 font-display font-semibold text-white">{step}</p>
                  <p className="mt-1 text-xs text-muted">
                    {i === 0 && "Inputs & sources"}
                    {i === 1 && "AI / infra core"}
                    {i === 2 && "Outcomes & UX"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
