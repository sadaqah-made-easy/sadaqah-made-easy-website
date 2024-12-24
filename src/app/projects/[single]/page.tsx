import GradientBg from "@/components/GradientBg";
import ProjectEndTimer from "@/components/ProjectEndTimer";
import Share from "@/components/Share";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import { FaRegClock, FaRegFolder } from "react-icons/fa";

const PostSingle = async (props: {
  params: Promise<{ single: string; lang: string }>;
}) => {
  const params = await props.params;
  const posts: Post[] = getSinglePage(path.join("projects"));
  const post = posts.find((page) => page.slug === params.single);

  if (!post) return notFound();

  const { frontmatter, content } = post;
  const { title, meta_title, description, image, categories, date } =
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
                <div className="my-14">
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

              <div className="row items-start justify-between">
                {/* {tags?.length > 0 && (
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
                )} */}
                <div className="flex items-center">
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

            <aside className="lg:col-4 hidden">
              <div className="max-w-md bg-white shadow-lg p-6 sticky mt-10 lg:top-28 mx-auto">
                {/* End Date Section */}
                <ProjectEndTimer endDate="2024-12-28T12:00:00" />

                {/* Donations Section */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Donations</h3>
                  <div className="mb-1 border p-3">
                    <div className="text-xs text-gray-500">Goals</div>
                    <div className="text-lg font-bold">$27,000</div>
                  </div>
                </div>

                {/* Payment Methods Section */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Payment methods</h3>

                  {/* Bkash */}
                  <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Image
                        src="/images/projects/bkash.png"
                        alt="Bkash"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Bkash</div>
                      <div className="text-xs text-gray-500">0000000000</div>
                    </div>
                  </div>

                  {/* Nagad */}
                  <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Image
                        src="/images/projects/nagad.png"
                        alt="Bkash"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Nagad</div>
                      <div className="text-xs text-gray-500">00000000000</div>
                    </div>
                  </div>

                  {/* Bank */}
                  <div className="flex gap-3 p-3 bg-gray-50">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Image
                        src="/images/projects/bank.png"
                        alt="Bkash"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Bank</div>
                      <div className="text-xs text-gray-500">
                        <div>A/C: 0000000000000</div>
                        <div>Name: Kathryn Murphy</div>
                        <div>Bank: City Bank</div>
                        <div>Branch: Shyamoli, Dhaka</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Organizer Section */}
                <div className="flex items-center gap-4">
                  <img src="https://placehold.co/400" alt="John Terry" className="w-14 h-14" />
                  <div>
                    <div className="font-medium">John Terry</div>
                    <div className="text-xs text-gray-500">Organizer</div>

                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Voluntatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.
                </p>
              </div>
            </aside>
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
