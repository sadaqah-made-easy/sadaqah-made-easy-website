import dateFormat from "@/lib/utils/dateFormat";
import { plainify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ProjectCardProps {
  project: Post;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const PROJECT_FOLDER = "projects";
  const { title, image, date } = project.frontmatter;
  const projectUrl = `/${PROJECT_FOLDER}/${project.slug}`;

  return (
    <article className="col-11 md:col-6 lg:col-4">
      <div className="flex flex-col h-full bg-body border border-primary/20 group relative">
        {image && (
          <figure className="aspect-video overflow-hidden">
            <Image
              className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
              src={image}
              alt={title}
              width={445}
              height={277}
              priority={true}
            />
          </figure>
        )}

        <div className="flex flex-col flex-grow p-6">
          {date && (
            <ul className="mb-2">
              <li className="inline-block text-sm">{dateFormat(date)}</li>
            </ul>
          )}

          <h4 className="mb-4 font-secondary h5 text-primary">
            <Link className="stretched-link" href={projectUrl}>
              {title}
            </Link>
          </h4>

          <p className="mb-6 line-clamp-2">{plainify(project?.content!)}</p>

          <div className="mt-auto">
            <Link
              className="btn btn-outline-primary group-hover:btn-secondary"
              href={projectUrl}
              rel="noopener noreferrer"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
