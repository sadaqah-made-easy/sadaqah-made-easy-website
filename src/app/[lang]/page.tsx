import Logo from "@/components/Logo";
import languages from "@/config/language.json";
import { getListPage } from "@/lib/contentParser";
import { getActiveLanguages } from "@/lib/languageParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
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
    banner: { title: string; image: string; content: string; };
  } = frontmatter;

  return (
    <>
      <SeoMeta />

      <section
        className="section h-screen"
        style={{
          backgroundImage: 'url(/images/bg-image.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container h-full flex flex-col justify-center">
          <Logo lang={lang} />
          <div className="main-section ">
            <h1 dangerouslySetInnerHTML={markdownify(banner.title)} />
            <p dangerouslySetInnerHTML={markdownify(banner.content)} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
