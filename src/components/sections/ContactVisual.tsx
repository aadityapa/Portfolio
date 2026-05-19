"use client";

/** Lightweight CSS globe — avoids extra WebGL context and render glitches */
export function ContactVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-void">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.2),transparent_55%)]" />
      <div className="contact-globe absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/30 md:h-52 md:w-52">
        <div className="contact-globe-grid absolute inset-0 rounded-full opacity-60" />
        <div className="absolute inset-2 rounded-full border border-accent/20" />
        <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-neon/25 via-transparent to-accent/20 blur-sm" />
      </div>
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-neon/80"
          style={{
            left: `${15 + (i % 4) * 22}%`,
            top: `${20 + Math.floor(i / 4) * 25}%`,
            opacity: 0.35 + (i % 3) * 0.15,
          }}
        />
      ))}
    </div>
  );
}
