import GradientBg from "@/components/GradientBg";
import Share from "@/components/Share";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import { FaRegClock, FaRegFolder } from "react-icons/fa";

const PostSingle = async ({
  params,
}: {
  params: { single: string; lang: string };
}) => {
  const posts: Post[] = getSinglePage(path.join("projects"));
  const post = posts.find((page) => page.slug === params.single);

  if (!post) return notFound();

  const { frontmatter, content } = post;
  const { title, meta_title, description, image, categories, date, tags } =
    frontmatter;

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
            <article className="lg:col-10">
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
                <div className="my-14">
                  <ImageFallback
                    src={image}
                    height={700}
                    width={1200}
                    alt={title}
                    className="rounded aspect-[16/9] object-fill"
                  />
                </div>
              )}

              <div className="content mb-10">
                <MDXContent content={content} />
              </div>

              <div className="row items-start justify-between">
                {tags?.length > 0 && (
                  <div className="mb-10 flex items-center lg:col-5 lg:mb-0">
                    <h5 className="mr-3">Tags :</h5>
                    <ul>
                      {tags.map((tag) => (
                        <li key={tag} className="inline-block">
                          <Link
                            className="m-1 block rounded bg-theme-light px-3 py-1 hover:bg-primary hover:text-white"
                            href={`/tags/${slugify(tag)}`}
                          >
                            {humanize(tag)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex items-center lg:col-4">
                  <h5 className="mr-3">Share :</h5>
                  <Share
                    className="social-icons"
                    title={title}
                    description={description}
                    slug={post.slug!}
                  />
                </div>
              </div>
            </article>
          </div>

          {/* Decorative Gradient Layers */}
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
