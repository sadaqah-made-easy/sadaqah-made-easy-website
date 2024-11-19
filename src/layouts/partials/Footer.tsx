"use client";

import Social from "@/components/Social";
import config from "@/config/config.json";
import { markdownify } from "@/lib/utils/textConverter";
import { INavigationLink } from "@/types";
import { FaEnvelope } from "react-icons/fa";
import social from "@/config/social.json";

const Footer = ({
  lang,
  menu,
}: {
  lang: string;
  menu: { footer: INavigationLink[] };
}) => {
  const { copyright } = config.params;

  const orgs = [
    {
      id: 2,
      orgName: "Al Manahil Foundation",
      link: "https://sadaqahmadeeasy.com/org/al-manahil-foundation",
    },
    {
      id: 3,
      orgName: "Munir Foundation",
      link: "https://sadaqahmadeeasy.com/org/munir-foundation",
    },
    {
      id: 4,
      orgName: "Sab'a Sanabil Foundation",
      link: "https://sadaqahmadeeasy.com/org/saba-sanabil-foundation",
    },
    {
      id: 1,
      orgName: "অভিযাত্রিক সমাজ কল্যাণ সংস্থা",
      link: "https://sadaqahmadeeasy.com/org/ovijatrik",
    },
    {
      id: 5,
      orgName: "JCI Dhaka West",
      link: "https://sadaqahmadeeasy.com/org/jci-dhaka-west",
    },
  ];

  return (
    <footer className="bg-[#004B3E]">
      <div className="container">
        <div className="pt-9 pb-12 flex flex-col items-center justify-center text-white text-center">
          <p className="mb-4">
            <FaEnvelope className="inline mr-2" />
            sadaqahmadeeasy@gmail.com
          </p>
          <p>
            We are updating continuously. More important features will be added
            soon.
          </p>

          <div className="my-9">
            <h6 className="underline text-white mb-4">Disclaimer</h6>
            <p>
              We don't collect money (sadaqah) and we aren't connected with any
              organization/party/group.
              <br />
              We just showcase authentic donation projects of any type.
            </p>
          </div>

          <div className="mb-9">
            <h6 className="underline text-white mb-4">Important</h6>
            <p className="text-balance">
              {" "}
              If we find any suspicious activity in any of the enlisted
              projects, we will remove the project without notifying and we may
              send report to the distinguished authority to investigate that
              certain project/org.{" "}
            </p>
          </div>

          <div>
            <h5 className="text-white">Help us building a better Bangladesh</h5>
          </div>
        </div>

        <div className="row justify-center">
          <div className="col-8">
            <div className="relative">
              <div className="bg-[#1aa78d] h-[1px]" />
              <div className="absolute -top-[1.5px] left-1/2 -translate-x-1/2 bg-[#1AA78D] w-[70%] h-1 flex justify-center items-center" />
            </div>
          </div>
        </div>

        <div className="my-11 flex justify-center">
          <Social source={social.main} className="social-icons-footer" />
        </div>

        <div>
          <h6 className="text-center mt-3 mb-4 text-white">
            Organizations we trust
          </h6>
          <div className="flex flex-wrap justify-center gap-6 text-white/60">
            {orgs.map((name) => (
              <a
                key={name.id}
                href={name.link}
                target="_blank"
                rel="noreferrer"
              >
                {name.orgName}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7">
        <div className="text-center text-white/70 bg-dark/70 text-[12px] py-2">
          <p dangerouslySetInnerHTML={markdownify(copyright)} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
