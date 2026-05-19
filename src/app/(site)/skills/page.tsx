import { Skills } from "@/components/sections/Skills";
import { PageHero } from "@/components/layout/PageHero";

export default function SkillsPage() {
  return (
    <>
      <PageHero
        label="Skills"
        title="Recruiter-ready technical specialization"
        description="A focused capability architecture across AI engineering, cloud-native automation, enterprise infrastructure, and premium web systems."
      />
      <Skills showHeading={false} />
    </>
  );
}
