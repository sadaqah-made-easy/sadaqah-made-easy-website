import Breadcrumbs from "@/components/Breadcrumbs";
import FloodCard from "@/components/FloodCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getActiveLanguages, getLanguageObj } from "@/lib/languageParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import path from "path";

const page = ({ params }: { params: { lang: string } }) => {
  const language = getLanguageObj(params.lang);
  const postIndex: any = getListPage(
    path.join(language.contentDir, `flood-affected/_index.md`),
  );
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: any = getSinglePage(
    path.join(language.contentDir, "flood-affected"),
  );
  const sortedPosts = sortByDate(posts);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />

      <PageHeader title={postIndex.frontmatter.title}>
        <Breadcrumbs lang={params.lang} />
      </PageHeader>

      <section className="section">
        <div className="container">
          <div className="row g-5">
            {sortedPosts?.map((post: any, index: number) => (
              <FloodCard key={index} data={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}
