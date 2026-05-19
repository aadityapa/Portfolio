import { Experience } from "@/components/sections/Experience";
import { PageHero } from "@/components/layout/PageHero";

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        label="Experience"
        title="Career trajectory"
        description="From IT management to system administration — delivering reliability at scale."
      />
      <Experience showHeading={false} />
    </>
  );
}
