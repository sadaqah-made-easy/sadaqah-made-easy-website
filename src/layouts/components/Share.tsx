import config from "@/config/config.json";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook, IoLogoLinkedin } from "react-icons/io5";

const Share = ({
  title,
  description,
  slug,
  className,
}: {
  title: string;
  description?: string;
  slug: string;
  className?: string;
}) => {
  const { base_url } = config.site;

  return (
    <ul className={className}>
      <li className="inline-block">
        <Link
          aria-label="facebook share button"
          href={`https://facebook.com/sharer/sharer.php?u=${base_url}/${slug}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoFacebook />
        </Link>
      </li>
      <li className="inline-block">
        <Link
          aria-label="x share button"
          href={`https://x.com/intent/tweet/?text=${title}&amp;url=${base_url}/${slug}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <FaXTwitter />
        </Link>
      </li>
      <li className="inline-block">
        <Link
          aria-label="linkedin share button"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${base_url}/${slug}&title=${title}&summary=${description}&source=${base_url}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoLinkedin />
        </Link>
      </li>
      {/* <li className="inline-block">
        <Link
          aria-label="pinterest share button"
          href={`https://pinterest.com/pin/create/button/?url=${base_url}/${slug}&media=&description=${description}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <IoLogoPinterest />
        </Link>
      </li> */}
    </ul>
  );
};

export default Share;
