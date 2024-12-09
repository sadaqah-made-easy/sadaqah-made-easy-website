import ProjectCard from "@/components/ProjectCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import HeroBanner from "@/partials/HeroBanner";
import SeoMeta from "@/partials/SeoMeta";
import { Button, Feature } from "@/types";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const { frontmatter } = homepage;
  const {
    banner,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
  } = frontmatter;

  const posts: any = getSinglePage("projects");
  const sortedPosts = sortByDate(posts);

  return (
    <>
      <SeoMeta />
      <HeroBanner banner={banner} />

      <section className="section">
        <div className="container">
          <h2 className="text-center mb-16">Projects</h2>

          <div className="row mx-auto g-4 relative z-20">
            {sortedPosts?.map((post: any) => (
              <ProjectCard key={post.slug} data={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
