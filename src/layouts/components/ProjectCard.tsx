import dateFormat from "@/lib/utils/dateFormat";
import { humanize, markdownify } from "@/lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { BsTagFill } from "react-icons/bs";

const ProjectCard = ({ data }: any) => {
  const { title, image, org_ref_type, tags } = data.frontmatter;

  return (
    <article className="col-11 md:col-6 lg:col-4">
      <section className="shadow-3xl rounded-lg overflow-hidden border min-h-full flex flex-col">
        <Link href={`/projects/${data.slug}`} className="flex-grow">
          <figure>
            <Image
              src={image}
              className="bg-cover object-cover object-top w-full rounded-t-lg aspect-[16/9]"
              alt="project-img"
              width={600}
              height={500}
            />
          </figure>

          <section className="p-4 flex-grow">
            <h2
              className="pb-5 h5"
              dangerouslySetInnerHTML={markdownify(title)}
            />
            <p className="pb-3">
              Org/Ref/Type: <strong>{org_ref_type}</strong>
            </p>
            <time className="text-light block">
              Created: {dateFormat(data.frontmatter.date)}
            </time>
          </section>
        </Link>

        <footer className="p-4 mt-auto">
          <div className="pt-4 flex justify-between items-center">
            <Link href={`/projects/${data.slug}`} className="btn btn-primary">
              View details
            </Link>

            <aside>
              <div className="bg-[#FFC107] px-2 py-1 flex items-center gap-2 text-[12px] font-bold rounded-md">
                <BsTagFill className="inline" />
                {tags?.map((tag: string, index: number) => (
                  <span key={index}>
                    {humanize(tag)}
                    {index !== tags.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </footer>
      </section>
    </article>
  );
};

export default ProjectCard;
