"use client";

import { useState } from "react";
import { ContactVisual } from "@/components/sections/ContactVisual";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

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
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=Portfolio%20Inquiry&body=${body}`;
    setSent(true);
  };

  const links = [
    { label: "Email", href: `mailto:${siteConfig.email}` },
    { label: "LinkedIn", href: siteConfig.links.linkedin },
    { label: "GitHub", href: siteConfig.links.github },
    { label: "WhatsApp", href: siteConfig.links.whatsapp },
  ];

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            label="Contact"
            title="Let's build something extraordinary"
            description="Magnetic interactions, glowing fields, and a cinematic send experience."
          />
          <div className="relative mt-6 h-64 w-full overflow-hidden rounded-2xl border border-white/10 lg:h-80">
            <ContactVisual />
          </div>
          <ul className="mt-6 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-neon/30 px-4 py-2 text-xs font-semibold text-neon transition hover:bg-neon/10"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="glass-panel neon-border rounded-3xl p-6 md:p-8">
          {(["name", "email", "message"] as const).map((field) => (
            <label key={field} className="mb-4 block">
              <span className="text-xs uppercase tracking-widest text-muted">
                {field === "message" ? "Message" : field.charAt(0).toUpperCase() + field.slice(1)}
              </span>
              {field === "message" ? (
                <textarea
                  rows={4}
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-void/60 px-4 py-3 text-sm text-white outline-none transition focus:border-neon/60 focus:shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-void/60 px-4 py-3 text-sm text-white outline-none transition focus:border-neon/60 focus:shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                />
              )}
              {errors[field] && (
                <p className="mt-1 text-xs text-red-400">{errors[field]}</p>
              )}
            </label>
          ))}
          <MagneticButton type="submit">Send Message</MagneticButton>
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
        </form>
      </div>
    </section>
  );
}
