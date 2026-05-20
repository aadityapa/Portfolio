"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
  onClick,
  type = "button",
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 360, damping: 22 });
  const sy = useSpring(y, { stiffness: 360, damping: 22 });
  const rx = useTransform(sy, [-10, 10], [3, -3]);
  const ry = useTransform(sx, [-10, 10], [-3, 3]);
  const glowX = useTransform(sx, [-18, 18], ["30%", "70%"]);
  const glowY = useTransform(sy, [-18, 18], ["35%", "65%"]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.28), transparent 52%)`;

  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold transition-colors",
    variant === "primary"
      ? "bg-neon text-void shadow-[0_0_40px_rgba(34,211,238,0.35)] hover:shadow-[0_0_56px_rgba(34,211,238,0.52)]"
      : "border border-white/20 bg-white/5 text-white hover:border-neon/50",
    className
  );

  const inner = (
    <motion.span
      style={{ x: sx, y: sy, rotateX: rx, rotateY: ry }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative z-10 flex items-center gap-2"
      data-cursor="pointer"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={base} data-cursor="pointer">
        <motion.span
          className="absolute inset-0 rounded-full border border-neon/30 opacity-0 group-hover:opacity-100"
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />
        <span className="absolute inset-0 bg-linear-to-r from-neon/0 via-white/10 to-neon/0 opacity-0 transition group-hover:opacity-100" />
        {inner}
      </Link>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={base} data-cursor="pointer">
      <motion.span
        className="absolute inset-0 rounded-full border border-neon/30 opacity-0 group-hover:opacity-100"
        animate={{ opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />
      {inner}
    </motion.button>
  );
}
