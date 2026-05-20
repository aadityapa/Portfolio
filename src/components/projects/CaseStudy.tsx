"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data/projects";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CaseStudy({ project }: { project: Project }) {
  const timeline = [
    { phase: "Discovery", detail: "Inputs, constraints, and architecture strategy" },
    { phase: "Build", detail: "Implementation of core automation and infrastructure logic" },
    { phase: "Validation", detail: "Testing, observability, and reliability checks" },
    { phase: "Delivery", detail: "Production rollout and measurable outcomes" },
  ];

  return (
    <article>
      <section className="section-cinematic relative min-h-[76vh] overflow-hidden pt-28" data-story-section>
        <div className="section-seam section-seam-bottom" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-void via-void/80 to-void/40" />
        <div className="section-pad relative z-10 flex min-h-[62vh] flex-col justify-end pb-16">
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
          <div className="mt-5 flex flex-wrap gap-2">
            {(project.highlights ?? project.features.slice(0, 3)).map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-neon/25 bg-neon/5 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-neon/90"
              >
                {highlight}
              </span>
            ))}
          </div>
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

          <motion.div
            className="mt-8 grid gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {(project.metrics ?? [
              { label: "Reliability", value: "99.9%" },
              { label: "Automation", value: "High" },
              { label: "Impact", value: "Enterprise" },
            ]).slice(0, 3).map((m, i) => (
              <motion.div
                key={m.label}
                className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 backdrop-blur-md"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{m.label}</p>
                <p className="mt-1 font-display text-xl text-white">{m.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {project.metrics && (
        <section className="section-cinematic section-pad border-y border-white/10 bg-surface/30" data-story-section>
          <div className="section-seam section-seam-top" />
          <div className="section-seam section-seam-bottom" />
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <motion.div
                key={m.label}
                className="card-interactive glass-panel rounded-2xl p-6 text-center"
                whileHover={{ y: -4 }}
              >
                <p className="font-display text-3xl font-bold" style={{ color: project.accent }}>
                  {m.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section className="section-cinematic section-pad" data-story-section>
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
                <motion.span
                  key={t}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  style={{ boxShadow: `0 0 20px ${project.accent}15` }}
                  whileHover={{ y: -2, borderColor: "rgba(34,211,238,0.4)" }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-cinematic section-pad bg-void" data-story-section>
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

          <div className="mt-14">
            <h2 className="font-display text-2xl font-bold text-white">Execution Timeline</h2>
            <div className="relative mt-8 space-y-6">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-linear-to-b from-neon via-accent to-transparent" />
              {timeline.map((item, i) => (
                <motion.div
                  key={item.phase}
                  className="relative pl-10"
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-neon/50 bg-void text-[10px] text-neon">
                    {i + 1}
                  </span>
                  <div className="card-interactive rounded-2xl border border-white/10 bg-slate-900/65 p-4 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.2em] text-neon">{item.phase}</p>
                    <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
