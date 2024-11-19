import dateFormat from "@/lib/utils/dateFormat";
import { humanize, markdownify } from "@/lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { BsTagFill } from "react-icons/bs";

const FloodCard = ({ data }: any) => {
  const { title, image, org_ref_type, tags } = data.frontmatter;

  return (
    <div className="mx-auto col-11 md:col-6 lg:col-4">
      <div className="shadow-xl rounded-lg overflow-hidden border">
        <Link href={`/flood-affected/${data.slug}`} className="">
          <div className="card ramadan__project-card h-100">
            <Image
              src={image}
              className="bg-cover object-cover w-full rounded-t-lg"
              alt="project-img"
              width={600}
              height={500}
            />

            <div className="p-4">
              <h5
                className="pb-5"
                dangerouslySetInnerHTML={markdownify(title)}
              />
              <p className="pb-3">
                Org/Ref/Type: <b>{org_ref_type}</b>
              </p>
              <p className="text-light">
                Created: {dateFormat(data.frontmatter.date)}
              </p>

              <div className="pt-4 flex justify-between items-center">
                <button className="btn btn-primary">View details</button>

                <div>
                  <div className="bg-[#FFC107] px-2 py-1 flex items-center gap-2 text-[12px] font-bold rounded-md">
                    <BsTagFill className="inline" />
                    {tags?.map((tag: string, index: number) => (
                      <p key={index}>
                        {humanize(tag)}
                        {index !== tags.length - 1 && ", "}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FloodCard;
