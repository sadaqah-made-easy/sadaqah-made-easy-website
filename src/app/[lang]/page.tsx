import languages from "@/config/language.json";
import { getListPage } from "@/lib/contentParser";
import { getActiveLanguages } from "@/lib/languageParser";
import FloodAffectedSection from "@/partials/FloodAffectedSection";
import HeroBanner from "@/partials/HeroBanner";
import SeoMeta from "@/partials/SeoMeta";
import { Button, Feature } from "@/types";
import path from "path";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}

const Home = ({ params }: { params: { lang: string } }) => {
  const lang = params.lang;
  const language = languages.find(
    (language) => language.languageCode === lang,
  )!;
  const homepage = getListPage(
    path.join(language?.contentDir, "homepage/_index.md"),
  );

  const { frontmatter } = homepage;
  const {
    banner
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <HeroBanner banner={banner} />
      <FloodAffectedSection lang={lang} />
    </>
  );
};

export default Home;
