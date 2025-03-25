import ProjectCard from "@/components/ProjectCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import path from "path";

const page = () => {
  const postIndex = getListPage(path.join("projects/_index.md"));
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(path.join("projects"));
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
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post: Post, index: number) => (
                <ProjectCard key={index} project={post} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Currently, there are no projects available.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
