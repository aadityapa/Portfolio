import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { projects } from "@/lib/data/projects";

export default function CaseStudiesPage() {
  const featured = projects.filter((p) =>
    ["trustocr-ai", "corporate-network-infrastructure", "nexovo-helling-cloud", "ritika-infotech"].includes(
      p.slug
    )
  );

  return (
    <>
      <PageHero
        label="Case Studies"
        title="Premium storytelling"
        description="Deep-dive narratives for flagship builds — architecture, metrics, and outcomes."
      />
      <section className="section-cinematic section-pad pt-0">
        <div className="container-page space-y-6">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="card-interactive glass-panel group flex flex-col gap-6 rounded-3xl p-8 transition hover:border-neon/30 md:flex-row md:items-center"
            >
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest" style={{ color: p.accent }}>
                  Case Study
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white group-hover:text-neon">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{p.longDescription}</p>
              </div>
              <span className="shrink-0 rounded-full border border-neon/40 px-5 py-2 text-sm font-semibold text-neon">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
