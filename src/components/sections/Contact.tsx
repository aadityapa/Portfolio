"use client";

import { useState } from "react";
import { ContactVisual } from "@/components/sections/ContactVisual";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Contact({ showHeading = true }: { showHeading?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required";
    if (form.message.trim().length < 10) next.message = "Message must be at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=Portfolio%20Inquiry&body=${body}`;
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  };

  const links = [
    { label: "Email", href: `mailto:${siteConfig.email}` },
    { label: "LinkedIn", href: siteConfig.links.linkedin },
    { label: "GitHub", href: siteConfig.links.github },
    { label: "WhatsApp", href: siteConfig.links.whatsapp },
  ];

  return (
    <section
      id="contact"
      data-story-section
      className="section-cinematic section-pad relative overflow-hidden bg-surface"
    >
      <div className="section-seam section-seam-top" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
      <div className="container-page relative">
        {showHeading && (
          <SectionHeading
            label="Contact"
            title="Let's build something extraordinary"
            description="Initialize collaboration — premium terminal contact with holographic presence."
          />
        )}

        <motion.div
          className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={item} className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/90">
                Available for select engagements
              </span>
            </div>

            <ContactVisual />

            <motion.div className="card-pro card-interactive space-y-4 p-6!" variants={item}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Quick connect</p>
              <p className="prose-body text-sm md:text-base">
                <span className="text-white">{siteConfig.name}</span>
                <br />
                {siteConfig.description}
                <br />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-neon transition hover:underline"
                  data-cursor="pointer"
                >
                  {siteConfig.email}
                </a>
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-2" variants={item}>
              {[
                { label: "Cloud Sync", state: "Online" },
                { label: "AI Routes", state: "Stable" },
                { label: "Security", state: "Layered" },
                { label: "Automation", state: "Active" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-xs"
                >
                  <p className="text-slate-400">{stat.label}</p>
                  <p className="mt-0.5 font-semibold text-neon">{stat.state}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="hud-scan rounded-2xl border border-white/10 bg-void/70 p-4"
              variants={item}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-neon">Comms Protocol</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Encrypted", "Low Latency", "Verified Identity", "Priority Route"].map((protocol) => (
                  <span
                    key={protocol}
                    className="rounded-full border border-neon/25 bg-neon/5 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-neon/90"
                  >
                    {protocol}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.ul className="flex flex-wrap gap-3" variants={item}>
              {links.map((link) => (
                <motion.li key={link.label} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-neon/30 bg-neon/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neon transition hover:border-neon/60 hover:bg-neon/15 hover:shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                    data-cursor="pointer"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.form
            variants={item}
            onSubmit={onSubmit}
            className="card-pro card-interactive neon-border flex flex-col"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon">Transmission</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Send a secure message
            </h3>
            <p className="prose-body mt-2 text-sm">
              All fields validated locally — opens your mail client with a pre-filled payload.
            </p>

            <div className="mt-8 flex flex-1 flex-col gap-5">
              {(["name", "email", "message"] as const).map((field) => (
                <label key={field} className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {field === "message" ? "Message" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                  {field === "message" ? (
                    <textarea
                      rows={5}
                      value={form[field]}
                      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                      className="textarea-pro"
                      placeholder="Describe your project, timeline, and goals…"
                    />
                  ) : (
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                      className="input-pro"
                      placeholder={field === "email" ? "you@company.com" : "Your name"}
                    />
                  )}
                  {errors[field] && (
                    <p className="mt-1.5 text-xs text-red-400">{errors[field]}</p>
                  )}
                </label>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/3 p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Payload Preview</p>
              <p className="mt-2 font-mono text-xs text-slate-300">
                {`to=${siteConfig.email} · subject=Portfolio Inquiry · status=${loading ? "routing" : "ready"}`}
              </p>
            </div>

            <div className="mt-8">
              <MagneticButton type="submit" className="w-full sm:w-auto">
                {loading ? "Transmitting…" : "Send Message"}
              </MagneticButton>
              <AnimatePresence>
                {sent && (
                  <motion.p
                    className="mt-4 text-sm text-neon"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Opening your mail client — thank you!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
