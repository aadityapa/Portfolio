"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], ["25%", "75%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["25%", "75%"]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, ${project.accent}26, transparent 38%)`;
  const keyMetric = project.metrics?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="card-interactive group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/90 backdrop-blur-md transition-shadow hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      data-cursor="view"
    >
      <div className="relative aspect-16/10 shrink-0 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/25 to-transparent" />
        <span
          className="absolute left-4 top-4 rounded-full border border-white/20 bg-void/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md"
          style={{ color: project.accent }}
        >
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-[1.7] text-slate-400 md:text-base">
          {project.description}
        </p>
        {keyMetric && (
          <div className="mt-4 rounded-xl border border-white/10 bg-void/55 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">{keyMetric.label}</p>
            <p className="mt-0.5 font-display text-base text-white">{keyMetric.value}</p>
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/3 px-2.5 py-1 text-[10px] font-medium text-slate-400"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-full bg-neon px-5 py-2.5 text-xs font-semibold text-void transition hover:shadow-[0_0_28px_rgba(34,211,238,0.4)]"
            data-cursor="pointer"
          >
            Case Study
          </Link>
          {project.demo && (
            <Link
              href={project.demo}
              target={project.demo.startsWith("/") ? undefined : "_blank"}
              rel="noreferrer"
              className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold text-white transition hover:border-neon/50 hover:text-neon"
              data-cursor="pointer"
            >
              Live
            </Link>
          )}
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-neon/80">
          Narrative case study with architecture timeline
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 80px ${project.accent}18` }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
    </motion.article>
  );
}
