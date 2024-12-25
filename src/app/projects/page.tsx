import ProjectCard from "@/components/ProjectCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import path from "path";

const page = () => {
  const postIndex: any = getListPage(path.join(`projects/_index.md`));
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: any = getSinglePage(path.join("projects"));
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
          <div className="row g-4 max-md:justify-center">
            {sortedPosts?.map((post: any, index: number) => (
              <ProjectCard key={index} project={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
