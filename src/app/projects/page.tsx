import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Project } from "@/types";
import path from "path";
import config from "@/config/config.json";
const { pagination } = config.settings;

const page = () => {
  const postIndex = getListPage(path.join("projects/_index.md"));
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const projects: Project[] = getSinglePage(path.join("projects"));
  const sortedProjects = sortByDate(projects);
  const totalPages = Math.ceil(sortedProjects.length / pagination);
  const currentProjects = sortedProjects.slice(0, pagination);

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
            {currentProjects.length > 0 ? (
              currentProjects.map((post: Project, index: number) => (
                <ProjectCard key={index} project={post} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                Currently, there are no projects available.
              </p>
            )}

            <Pagination
              section={"projects"}
              currentPage={1}
              totalPages={totalPages}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
