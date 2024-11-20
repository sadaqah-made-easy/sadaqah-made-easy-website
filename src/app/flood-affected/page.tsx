import FloodCard from "@/components/FloodCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import path from "path";

const page = () => {
  const postIndex: any = getListPage(path.join(`flood-affected/_index.md`));
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: any = getSinglePage(path.join("flood-affected"));
  const sortedPosts = sortByDate(posts);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />

      <PageHeader title={postIndex.frontmatter.title} />

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
