import { getListPage } from "@/lib/contentParser";
import FloodAffectedSection from "@/partials/FloodAffectedSection";
import HeroBanner from "@/partials/HeroBanner";
import SeoMeta from "@/partials/SeoMeta";
import { Button, Feature } from "@/types";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <HeroBanner banner={banner} />
      <FloodAffectedSection />
    </>
  );
};

export default Home;
