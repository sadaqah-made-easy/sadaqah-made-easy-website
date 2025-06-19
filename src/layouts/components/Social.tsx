import DynamicIcon from "@/helpers/DynamicIcon";
import Link from "next/link";

export interface ISocial {
  name: string;
  icon: string;
  link: string;
}

const Social = ({
  source,
  className,
}: {
  source: ISocial[];
  className: string;
}) => {
  return (
    <ul className={className}>
      {source.map((social) => (
        <li key={social.name}>
          <Link
            aria-label={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <span className="sr-only">{social.name}</span>
            <DynamicIcon className="inline-block" icon={social.icon} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Social;
