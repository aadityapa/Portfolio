import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { getProjectBySlug } from "@/lib/data/projects";

export default function InfrastructurePage() {
  const network = getProjectBySlug("corporate-network-infrastructure");
  const enterprise = getProjectBySlug("enterprise-infrastructure-optimization");

  return (
    <>
      <PageHero
        label="Infrastructure"
        title="Enterprise architecture command"
        description="Firewalls, VLANs, DMZ design, and reliability engineering at organizational scale."
      />
      <section className="section-cinematic section-pad">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            {[network, enterprise].filter(Boolean).map((p) => (
              <Link
                key={p!.slug}
                href={`/projects/${p!.slug}`}
                className="card-interactive glass-panel group rounded-3xl p-8 transition hover:border-neon/40"
              >
                <p className="text-xs uppercase tracking-widest text-neon">{p!.category}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">{p!.title}</h3>
                <p className="mt-3 text-sm text-muted">{p!.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-cyan-500/30 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent)] p-8">
            <div className="grid gap-4 text-center sm:grid-cols-5">
              {["ISP A", "FW", "Core", "DMZ", "Users"].map((node, i) => (
                <div key={node} className="relative">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-neon/40 bg-neon/10 text-xs font-bold text-neon">
                    {node}
                  </div>
                  {i < 4 && (
                    <span className="absolute right-0 top-1/2 hidden h-px w-8 translate-x-full bg-linear-to-r from-neon to-transparent sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
