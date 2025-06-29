import ProjectCard from "@/components/ProjectCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import HeroBanner from "@/partials/HeroBanner";
import SeoMeta from "@/partials/SeoMeta";
import { Button, Feature, Project } from "@/types";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const { frontmatter } = homepage;
  const {
    banner,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
  } = frontmatter;

  const posts: Project[] = getSinglePage("projects");
  const sortedProjects = sortByDate(posts);

  return (
    <>
      <SeoMeta />
      <HeroBanner banner={banner} />

      <section className="section">
        <div className="container">
          <h2 className="text-center mb-16">Projects</h2>

          <div className="row g-4 max-md:justify-center relative z-20">
            {sortedProjects.length > 0 ? (
              sortedProjects.map((project: Project) => (
                <ProjectCard key={project.slug} project={project} />
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

export default Home;
