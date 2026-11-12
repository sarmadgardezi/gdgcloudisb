import Hero from "@/components/website/home/hero";
import Stats from "@/components/website/home/stats";
import DevFestSection from "@/components/website/home/devfest-section";
import FocusPillars from "@/components/website/home/focus-pillars";
import EventsSection from "@/components/website/home/events-section";
import TeamSection from "@/components/website/home/team-section";
import CtaBanner from "@/components/website/home/cta-banner";

const COMMUNITY_URL = "https://gdg.community.dev/gdg-cloud-islamabad/";

export default function Home() {
  return (
    <>
      <Hero communityUrl={COMMUNITY_URL} />
      <Stats />
      <DevFestSection />
      <FocusPillars />
      <EventsSection communityUrl={COMMUNITY_URL} />
      <TeamSection communityUrl={COMMUNITY_URL} />
      <CtaBanner communityUrl={COMMUNITY_URL} />
    </>
  );
}
