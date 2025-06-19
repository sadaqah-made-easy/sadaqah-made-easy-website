import ProjectCard from "@/components/ProjectCard";
import { getSinglePage } from "@/lib/contentParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Project } from "@/types";

type StaticParams = () => { single: string }[];

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: StaticParams = () => {
  const categories = getTaxonomy("projects", "categories");

  const paths = categories.map((category) => ({
    single: category,
  }));

  return paths;
};

const CategorySingle = async (props: {
  params: Promise<{ single: string }>;
}) => {
  const params = await props.params;
  const posts: Project[] = getSinglePage("projects");
  const filterByCategories = taxonomyFilter(posts, "categories", params.single);
  const sortedPosts = sortByDate(filterByCategories);

  return (
    <>
      <SeoMeta title={humanize(params.single)} />
      <PageHeader title={humanize(params.single)} />
      <div className="section-sm pb-0">
        <div className="container">
          <div className="row">
            {sortedPosts.map((project: Project, index: number) => (
              <div className="mb-20" key={index}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySingle;
