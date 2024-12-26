"use client";

import Logo from "@/components/Logo";
import Social from "@/components/Social";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import { markdownify } from "@/lib/utils/textConverter";
import { TMenuItem } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const bgRef = useRef(null);
  const pathname = usePathname();

  const filteredMenu = useMemo(
    () => Object.entries(menu).filter(([key]) => key !== "main"),
    [],
  );

  const setupAnimation = (footer: HTMLElement, bg: HTMLElement) => {
    gsap.set(bg, {
      width: "100%",
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      height: "100%",
      backgroundColor: "#294E4A",
      maxWidth: "1320px",
    });

    gsap.to(bg, {
      maxWidth: "100vw",
      scrollTrigger: {
        trigger: footer,
        start: "top bottom-=100",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  };

  useEffect(() => {
    const footer = footerRef.current;
    const bg = bgRef.current;

    if (!footer || !bg) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === footer) trigger.kill();
    });

    const timeoutId = setTimeout(() => setupAnimation(footer, bg), 100);
    ScrollTrigger.refresh();

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  const renderMenuItem = (item: TMenuItem, index: number) => (
    <li key={index}>
      <a
        className="flex items-center gap-2 text-white transition-all hover:text-secondary"
        href={item.url}
      >
        {item.name}
      </a>
    </li>
  );

  const renderMenuSection = ([sectionTitle, items]: [string, TMenuItem[]]) => (
    <div className="mb-10 break-inside-avoid" key={sectionTitle}>
      <h5 className="mb-8 text-white font-primary font-semibold">
        {sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1)}
      </h5>
      <ul className="space-y-2.5">{items.map(renderMenuItem)}</ul>
    </div>
  );

  return (
    <footer ref={footerRef} className="relative">
      <div ref={bgRef} />
      <div className="container relative">
        <div className="section-sm pb-16">
          <div className="row max-lg:justify-center g-4">
            <div className="mb-8 text-center lg:col-4 lg:mb-0 lg:text-left">
              <Logo src={config.site.logo_footer} />
              <p
                className="mt-8 mb-6 text-white text-balance"
                dangerouslySetInnerHTML={markdownify(
                  config.params.footer_description,
                )}
              />
              <Social source={social.main} className="social-icons" />
            </div>

            <div className="col-8 lg:col-4 columns-2 lg:ml-auto">
              {filteredMenu.map(renderMenuSection)}
            </div>

            <div className="col-8 md:col-6 lg:col-4 lg:ml-auto max-lg:mb-10">
              <div className="bg-white p-8">
                <h5 className="mb-6 leading-9">
                  We Work Together For a Beautiful World, Come Join Us Today!
                </h5>
                <Link
                  href="/projects"
                  className="btn btn-secondary text-lg w-full py-4"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p
          className="border-t border-white/10 py-5 text-white text-center [&>a]:font-bold text-sm"
          dangerouslySetInnerHTML={markdownify(config.params.copyright)}
        />
      </div>
    </footer>
  );
};

export default Footer;
