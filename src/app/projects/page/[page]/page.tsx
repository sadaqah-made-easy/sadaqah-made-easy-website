import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/ProjectCard";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Project } from "@/types";

const { pagination } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const allProject: Project[] = getSinglePage("projects");
  const allSlug: string[] = allProject.map((item) => item.slug!);
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths: { page: string }[] = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      page: (i + 1).toString(),
    });
  }

  return paths;
};

// for all regular pages
const Projects = async (props: { params: Promise<{ page: number }> }) => {
  const params = await props.params;
  const postIndex: Project = getListPage(`${"projects"}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const projects: Project[] = getSinglePage("projects");
  const sortedProjects = sortByDate(projects);
  const totalPages = Math.ceil(projects.length / pagination);
  const currentPage =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentProjects = sortedProjects.slice(indexOfFirstPost, indexOfLastPost);

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
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
