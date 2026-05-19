"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data/skill-groups";

/** Mobile recruiter-focused skills layout */
export function SkillsFallback() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {skillGroups.map((group, i) => (
        <motion.article
          key={group.id}
          className="card-pro neon-border p-5!"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 4) * 0.05 }}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-white">{group.title}</h3>
            <span
              className="rounded-lg border border-white/10 bg-void/70 px-2.5 py-1 text-xs font-bold text-white"
              style={{ boxShadow: `0 0 14px ${group.accent}55` }}
            >
              {group.icon}
            </span>
          </div>
          <p className="mt-2 text-xs leading-[1.6] text-slate-400">{group.specialization}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {group.skills.slice(0, 6).map((skill) => (
              <span
                key={skill.name}
                className="rounded-full border border-white/10 bg-white/3 px-2.5 py-1 text-[11px] text-slate-200"
              >
                {skill.name}
              </span>
            ))}
            {group.skills.length > 6 && (
              <span className="rounded-full border border-neon/25 bg-neon/10 px-2.5 py-1 text-[11px] text-neon">
                +{group.skills.length - 6} more
              </span>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
