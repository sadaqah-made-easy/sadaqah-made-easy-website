import FloodCard from "@/components/FloodCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import path from "path";

const FloodAffectedSection = () => {
  const posts: any = getSinglePage(path.join("flood-affected"));
  const sortedPosts = sortByDate(posts).slice(0, 6);

  return (
    <section className="section">
      <div className="container">
        <h2 className="text-center mb-16">Flood Affected</h2>

        <div className="row g-5 relative z-20">
          {sortedPosts?.map((post: any, index: number) => (
            <FloodCard key={index} data={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FloodAffectedSection;
