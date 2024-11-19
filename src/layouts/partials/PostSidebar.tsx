import config from "@/config/config.json";
import { getTranslations } from "@/lib/languageParser";
import { slugSelector } from "@/lib/utils/slugSelector";
import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
const { blog_folder } = config.settings;

const PostSidebar = async ({
  tags,
  categories,
  allCategories,
  lang,
}: {
  tags: string[];
  categories: string[];
  allCategories: string[];
  lang: string;
}) => {
  const { categories: categoryTitle } = await getTranslations(lang);
  return (
    <div className="lg:col-4">
      {/* <!-- categories --> */}
      <div className="mb-8">
        <h5 className="mb-6">{categoryTitle}</h5>
        <div className="rounded bg-theme-light p-8 ">
          <ul className="space-y-4">
            {categories.map((category: string) => {
              const count = allCategories.filter(
                (c: string) => c === category,
              ).length;
              return (
                <li key={category}>
                  <Link
                    className="flex justify-between hover:text-primary "
                    href={slugSelector(lang, `/categories/${category}`)}
                  >
                    {humanize(category)} <span>({count})</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* <!-- tags --> */}
      <div className="mb-8">
        <h5 className="mb-6">Tags</h5>
        <div className="rounded bg-theme-light p-6 ">
          <ul>
            {tags.map((tag: string) => {
              return (
                <li className="inline-block" key={tag}>
                  <Link
                    className="m-1 block rounded bg-white px-3 py-1 hover:bg-primary hover:text-white   "
                    href={slugSelector(lang, `/tags/${tag}`)}
                  >
                    {humanize(tag)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
