import DonationGoals from "@/components/DonationGoals";
import GradientBg from "@/components/GradientBg";
import ProjectEndTimer from "@/components/ProjectEndTimer";
import Share from "@/components/Share";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post, TDonationGoals, TOrganizer } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaRegClock, FaRegFolder } from "react-icons/fa";

const PostSingle = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const posts: Post[] = getSinglePage("projects");
  const post = posts.find((page) => page.slug === params.single);

  const organizers: TOrganizer[] = getSinglePage("organizer");

  if (!post) return notFound();

  const { frontmatter, content } = post;
  const {
    title,
    meta_title,
    description,
    image,
    categories,
    date,
    project_end_date,
    donation_goals,
    organizer: organizerSlug,
  } = frontmatter;

  const organizer = organizers.find((org) => org.slug === organizerSlug);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section-sm overflow-x-clip">
        <div className="container relative">
          <div className="row justify-center relative z-10">
            <article className="lg:col-8">
              <h1
                className="h2 mb-4"
                dangerouslySetInnerHTML={{ __html: humanize(title) }}
              />

              <ul className="mb-4">
                {categories?.length > 0 && (
                  <li className="mr-4 inline-block">
                    <FaRegFolder className="-mt-1 mr-2 inline-block" />
                    {categories.map((category, index) => (
                      <Link
                        key={category}
                        href={`/categories/${slugify(category)}`}
                      >
                        {humanize(category)}
                        {index !== categories.length - 1 && ", "}
                      </Link>
                    ))}
                  </li>
                )}
                {date && (
                  <li className="mr-4 inline-block">
                    <FaRegClock className="-mt-1 mr-2 inline-block" />
                    {dateFormat(date)}
                  </li>
                )}
              </ul>

              {image && (
                <div className="py-14">
                  <ImageFallback
                    src={image}
                    height={700}
                    width={1200}
                    alt={title}
                    className="aspect-[16/9] object-fill"
                  />
                </div>
              )}

              <div className="content mb-10">
                <MDXContent content={content} />
              </div>

              <div className="flex items-center">
                <h5 className="mr-3">Share :</h5>
                <Share
                  className="social-icons"
                  title={title}
                  description={description}
                  slug={post.slug!}
                />
              </div>
            </article>

            <aside className="lg:col-4">
              <div className="max-w-md bg-white shadow-lg p-6 sticky mt-10 lg:top-28 mx-auto">
                {project_end_date && project_end_date.enable && (
                  <ProjectEndTimer endDate={project_end_date.end_date} />
                )}
                <DonationGoals
                  donationGoals={donation_goals as TDonationGoals}
                />

                {organizer && (
                  <>
                    <div className="flex items-center gap-4">
                      <ImageFallback
                        src={
                          organizer.frontmatter.image || "/images/avatar.png"
                        }
                        alt={organizer.frontmatter.title}
                        className="w-16 h-16 object-cover"
                        fallback="/images/avatar.png"
                        width={56}
                        height={56}
                      />
                      <div>
                        <h6 className="font-medium mb-2">
                          {organizer.frontmatter.title}
                        </h6>
                        <p>Organizer</p>
                      </div>
                    </div>
                    <p className="text-xs mt-4 text-light">
                      {organizer.frontmatter.description}
                    </p>
                  </>
                )}
              </div>
            </aside>
          </div>

          <GradientBg />
        </div>
      </section>
    </>
  );
};

export default PostSingle;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const posts: Post[] = getSinglePage("projects");

  return posts.map((post) => ({
    single: post.slug!,
  }));
};
