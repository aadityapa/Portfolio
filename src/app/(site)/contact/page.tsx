import { Contact } from "@/components/sections/Contact";
import { PageHero } from "@/components/layout/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Initialize collaboration"
        description="Futuristic terminal-style contact — let's build your next intelligent system."
      />
      <Contact showHeading={false} />
    </>
  );
}
