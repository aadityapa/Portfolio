"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { orbitalHighlights, skillGroups } from "@/lib/data/skill-groups";
import { cn } from "@/lib/utils/cn";

type RingConfig = {
  key: string;
  radius: number;
  speed: number;
  groups: string[];
};

function CategoryCard({
  title,
  icon,
  accent,
  specialization,
  isActive,
  onActivate,
}: {
  title: string;
  icon: string;
  accent: string;
  specialization: string;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.button
      type="button"
      className={cn(
        "group relative flex h-[110px] w-[180px] flex-col justify-between rounded-2xl border bg-slate-950/80 p-4 text-left backdrop-blur-md transition",
        isActive ? "border-neon/65" : "border-white/15 hover:border-white/35"
      )}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
      style={{ boxShadow: isActive ? `0 0 24px ${accent}55` : "0 0 0 transparent" }}
      data-cursor="pointer"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-[15px] font-semibold leading-tight text-white">{title}</p>
        <span
          className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-white/10 bg-void/70 px-1.5 text-[10px] font-bold text-white"
          style={{ boxShadow: `0 0 12px ${accent}50` }}
        >
          {icon}
        </span>
      </div>
      <p className="text-[11px] leading-normal text-slate-300">{specialization}</p>
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent bg-linear-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent" />
    </motion.button>
  );
}

function Ring({
  config,
  activeId,
  setActiveId,
  cardScale,
  reduced,
}: {
  config: RingConfig;
  activeId: string;
  setActiveId: (id: string) => void;
  cardScale: number;
  reduced: boolean;
}) {
  const groups = useMemo(
    () => config.groups
      .map((id) => skillGroups.find((group) => group.id === id))
      .filter((group): group is NonNullable<typeof group> => Boolean(group)),
    [config.groups]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: config.radius * 2,
        height: config.radius * 2,
        marginLeft: -config.radius,
        marginTop: -config.radius,
      }}
      animate={reduced ? undefined : { rotate: 360 }}
      transition={reduced ? undefined : { duration: config.speed, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="absolute inset-0 rounded-full border border-white/10"
        style={{ boxShadow: "0 0 18px rgba(34,211,238,0.08)" }}
      />
      {groups.map((group, idx) => {
        const angle = (360 / groups.length) * idx - 90;
        return (
          <div
            key={group.id}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${angle}deg) translateY(-${config.radius}px)` }}
          >
            <motion.div
              className="relative -translate-x-1/2"
              animate={reduced ? undefined : { rotate: -360 }}
              transition={reduced ? undefined : { duration: config.speed, repeat: Infinity, ease: "linear" }}
              style={{ scale: cardScale }}
            >
              <CategoryCard
                title={group.title}
                icon={group.icon}
                accent={group.accent}
                specialization={group.specialization}
                isActive={activeId === group.id}
                onActivate={() => setActiveId(group.id)}
              />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

export function SkillsOrbitSystem() {
  const reduced = useReducedMotion();
  const isTablet = useMediaQuery("(max-width: 1200px)");
  const isLaptop = useMediaQuery("(max-width: 1440px)");
  const [activeId, setActiveId] = useState(skillGroups[0]?.id ?? "ai-automation");
  const active = skillGroups.find((group) => group.id === activeId) ?? skillGroups[0];

  const rings: RingConfig[] = useMemo(() => {
    if (isTablet) {
      return [
        { key: "r1", radius: 165, speed: 72, groups: ["ai-automation", "full-stack"] },
        { key: "r2", radius: 245, speed: 92, groups: ["cloud-devops", "enterprise-infra"] },
        { key: "r3", radius: 325, speed: 114, groups: ["blockchain-web3", "seo-digital"] },
      ];
    }
    if (isLaptop) {
      return [
        { key: "r1", radius: 190, speed: 76, groups: ["ai-automation", "full-stack"] },
        { key: "r2", radius: 274, speed: 98, groups: ["cloud-devops", "enterprise-infra"] },
        { key: "r3", radius: 356, speed: 120, groups: ["blockchain-web3", "seo-digital"] },
      ];
    }
    return [
      { key: "r1", radius: 210, speed: 78, groups: ["ai-automation", "full-stack"] },
      { key: "r2", radius: 300, speed: 100, groups: ["cloud-devops", "enterprise-infra"] },
      { key: "r3", radius: 390, speed: 124, groups: ["blockchain-web3", "seo-digital"] },
    ];
  }, [isLaptop, isTablet]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/55" data-story-section>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_62%)]" />

        <div className={cn("relative mx-auto w-full", isTablet ? "h-[760px]" : "h-[920px]")}>
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-45" aria-hidden>
            {[0, 1, 2].map((idx) => (
              <line
                key={idx}
                x1={`${18 + idx * 28}%`}
                y1="12%"
                x2={`${78 - idx * 18}%`}
                y2="88%"
                className="energy-line"
                stroke="rgba(34,211,238,0.18)"
                strokeWidth="1"
              />
            ))}
          </svg>

          <div className={cn("pointer-events-none absolute inset-0", isTablet && "opacity-55")}>
            {orbitalHighlights.map((item, i) => (
              <motion.span
                key={item.name}
                className="absolute rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-200"
                style={{
                  left: `${10 + (i % 4) * (isTablet ? 20 : 22)}%`,
                  top: `${12 + Math.floor(i / 4) * (isTablet ? 56 : 58)}%`,
                  boxShadow: `0 0 12px ${item.glow}`,
                }}
                animate={reduced ? undefined : { opacity: [0.3, 0.85, 0.3], y: [0, -5, 0] }}
                transition={{ duration: 3 + (i % 3) * 0.8, repeat: Infinity, delay: i * 0.18 }}
              >
                {item.name}
              </motion.span>
            ))}
          </div>

          {rings.map((ring) => (
            <Ring
              key={ring.key}
              config={ring}
              activeId={activeId}
              setActiveId={setActiveId}
              cardScale={isTablet ? 0.84 : isLaptop ? 0.92 : 1}
              reduced={reduced}
            />
          ))}

          <motion.div
            className={cn(
              "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/45 bg-void/95 text-center",
              isTablet ? "h-[160px] w-[160px]" : "h-[200px] w-[200px]"
            )}
            animate={reduced ? undefined : { boxShadow: ["0 0 32px rgba(34,211,238,0.2)", "0 0 54px rgba(34,211,238,0.45)", "0 0 32px rgba(34,211,238,0.2)"] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.2),transparent_68%)]" />
            <div className="absolute inset-[12%] rounded-full border border-dashed border-neon/35" />
            <motion.div
              className="absolute inset-[7%] rounded-full border border-white/10"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative flex h-full flex-col items-center justify-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-300">Core</p>
              <p className="mt-1 font-display text-2xl font-bold text-neon md:text-3xl">Skills</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">Command</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-14 md:mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id}
            className="card-pro neon-border mx-auto max-w-3xl p-6! md:p-8!"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-neon">Active Cluster</p>
            <div className="mt-3 flex items-center gap-3">
              <span
                className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-white/10 bg-void/70 px-2 text-xs font-bold text-white"
                style={{ boxShadow: `0 0 14px ${active?.accent ?? "#22d3ee"}55` }}
              >
                {active?.icon}
              </span>
              <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">{active?.title}</h3>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-slate-300 md:text-base">{active?.specialization}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {active?.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-slate-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-2 md:grid-cols-3">
              {active?.outcomes.map((outcome) => (
                <p
                  key={outcome}
                  className="rounded-xl border border-neon/20 bg-neon/5 px-3 py-2 text-xs leading-normal text-neon/90"
                >
                  {outcome}
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
