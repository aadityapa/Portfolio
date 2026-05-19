import { About } from "@/components/sections/About";
import { PageHero } from "@/components/layout/PageHero";

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="Elite AI engineer meets enterprise operator"
        description="Technology leadership across infrastructure, AI automation, and cinematic product engineering."
      />
      <About showHeading={false} />
    </>
  );
}
