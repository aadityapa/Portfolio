"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
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
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold transition-colors",
    variant === "primary"
      ? "bg-neon text-void shadow-[0_0_40px_rgba(34,211,238,0.35)]"
      : "border border-white/20 bg-white/5 text-white hover:border-neon/50",
    className
  );

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
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
      <Link href={href} className={cn(base, "group")} data-cursor="pointer">
        <span className="absolute inset-0 bg-gradient-to-r from-neon/0 via-white/10 to-neon/0 opacity-0 transition group-hover:opacity-100" />
        {inner}
      </Link>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={base} data-cursor="pointer">
      {inner}
    </motion.button>
  );
}
