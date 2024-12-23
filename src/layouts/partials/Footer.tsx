"use client"

import Logo from "@/components/Logo";
import Social from "@/components/Social";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import { markdownify } from "@/lib/utils/textConverter";
import { TMenuItem } from "@/types";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const bgRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const initAnimation = () => {
      const footer = footerRef.current;
      const bg = bgRef.current;

      if (!footer || !bg) return;

      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === footer) {
          trigger.kill();
        }
      });

      gsap.set(bg, {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '100%',
        backgroundColor: '#294E4A',
        maxWidth: '1320px',
      });

      // Create new animation
      gsap.to(bg, {
        maxWidth: '100vw',
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom-=100',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true, // Recalculate on page resize
          markers: false // Set to true for debugging
        },
      });
    };

    // Small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      initAnimation();
    }, 100);

    // Refresh ScrollTrigger when the route changes
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pathname]);

  return (
    <footer ref={footerRef} className="relative">
      <div ref={bgRef} />
      <div className="container relative">
        <div className="section-sm pb-16">
          <div className="row justify-center">
            <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:text-left">
              <Logo src={config.site.logo} />
              <p
                className="mt-8 mb-6 text-white/80 text-balance"
                dangerouslySetInnerHTML={markdownify(config.params.footer_description)}
              />
              <Social source={social.main} className="social-icons" />
            </div>

            <div className="col-8 lg:col-5 columns-2">
              {
                Object.entries(menu)
                  .filter(([key]) => key !== "main")
                  .map(([sectionTitle, items]) => (
                    <div className="mb-10 break-inside-avoid" key={sectionTitle}>
                      <h5 className="mb-8 text-white font-primary font-medium">
                        {sectionTitle.charAt(0).toUpperCase() +
                          sectionTitle.slice(1)}
                      </h5>
                      <ul className="space-y-2.5">
                        {items.map((item: TMenuItem, index: number) => (
                          <li key={index}>
                            <a
                              className="flex items-center gap-2 text-white transition-all hover:underline"
                              href={item.url}
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
              }
            </div>

            <div className="col-6 lg:col-3">
              <div className="bg-white p-8">
                <h5 className="mb-6">We Work Together For a Beautiful World, ComeJoin Us Today!</h5>
                <a href="#!" className="btn btn-primary">
                  <div className="primary-button-text">Donate Now</div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <p
          className="border-t border-white py-8 text-white text-center [&>a]:underline"
          dangerouslySetInnerHTML={markdownify(config.params.copyright)}
        />
      </div>
    </footer>
  );
};

export default Footer;
