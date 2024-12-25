"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { INavigationLink } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);
  const navMenuRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();

  // scroll to top on route change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;

  // Function to setup the scroll-triggered animation for the header
  const setupAnimation = (
    header: HTMLElement,
    navMenu: HTMLElement,
    logo: HTMLElement,
    button: HTMLElement,
  ) => {
    const updateStyles = (progress: number) => {
      const isSmallScreen = window.innerWidth <= 1024;
      const bgOpacity = Math.min(progress * 1.5, 1);
      const yOffset = isSmallScreen ? 0 : Math.min(progress * 20, 20);
      const shadowOpacity = Math.min(progress * 0.1, 0.1);
      const scale = 1 - progress * 0.1;
      const fontSize = 1.125 - progress * 0.125;
      const paddingX = 1.75 - progress * 0.75;

      gsap.to(header, {
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
        boxShadow: `0 0px 30px 5px rgba(0, 0, 0, ${shadowOpacity})`,
        y: yOffset,
        duration: 0.2,
        ease: "power1.out",
      });

      if (!isSmallScreen) {
        gsap.to(navMenu, {
          padding: `${0}rem ${paddingX}rem`,
          duration: 0.2,
        });
      }

      gsap.to(logo, { scale, duration: 0.2 });
      gsap.to(button, { fontSize: `${fontSize}rem`, duration: 0.2 });
    };

    // Initialize ScrollTrigger for header
    const scrollTrigger = ScrollTrigger.create({
      start: "top top",
      end: "top+=500",
      onUpdate: (self) => updateStyles(self.progress),
    });

    // Cleanup ScrollTrigger on unmount or when pathname changes
    return scrollTrigger;
  };

  useEffect(() => {
    const header = headerRef.current;
    const navMenu = navMenuRef.current;
    const logo = logoRef.current;
    const button = buttonRef.current;

    if (!header || !navMenu || !logo || !button) return;

    // Kill any existing ScrollTrigger on the header before setting up a new one
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === header) trigger.kill();
    });

    // Set up new animation
    const scrollTrigger = setupAnimation(header, navMenu, logo, button);
    ScrollTrigger.refresh(); // Ensure ScrollTrigger recalculates when pathname changes

    // Cleanup on unmount or pathname change
    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]); // Re-run the effect on pathname change

  const toggleMenu = (isOpen: boolean) => {
    const navMenu = navMenuRef.current;
    const tl = gsap.timeline();

    if (isOpen) {
      tl.set(navMenu, { display: "block" }).fromTo(
        navMenu,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      );
    } else {
      tl.to(navMenu, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      }).set(navMenu, { display: "none" });
    }
  };

  const isActive = (url: string) => pathname === url || pathname === `${url}/`;

  return (
    <header
      ref={headerRef}
      className={`header z-50 ${settings.sticky_header ? "sticky top-0" : ""} mx-auto bg-transparent container`}
    >
      <nav className="navbar relative flex flex-wrap items-center justify-between px-4 py-3">
        {/* Logo */}
        <div ref={logoRef} className="order-0">
          <Logo src={config.site.logo} />
        </div>

        {/* Navbar Toggler */}
        <input
          id="nav-toggle"
          type="checkbox"
          className="hidden"
          onChange={(e) => toggleMenu(e.target.checked)}
        />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer flex items-center lg:hidden text-dark lg:order-1"
        >
          <svg
            id="show-button"
            className="h-6 fill-current block"
            viewBox="0 0 20 20"
          >
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg
            id="hide-button"
            className="h-6 fill-current hidden"
            viewBox="0 0 20 20"
          >
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>

        {/* Navigation Menu */}
        <ul
          ref={navMenuRef}
          className="navbar-nav order-3 hidden w-full lg:order-1 lg:flex lg:w-auto lg:pb-0 max-lg:py-3 max-lg:bg-primary max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:right-0"
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`nav-link inline-flex items-center ${
                      menu.children?.some((child) => isActive(child.url))
                        ? "active"
                        : ""
                    }`}
                  >
                    {menu.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:absolute lg:opacity-0 lg:group-hover:opacity-100">
                    {menu.children?.map((child, i) => (
                      <li key={`child-${i}`} className="nav-dropdown-item mb-2">
                        <Link
                          href={child.url}
                          className={`nav-dropdown-link block py-1 font-semibold text-dark transition hover:text-primary ${
                            isActive(child.url) ? "active" : ""
                          }`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    href={menu.url}
                    className={`nav-link block p-3 font-semibold transition lg:px-2 lg:py-3 ${
                      isActive(menu.url) ? "active" : ""
                    }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}

          {navigation_button.enable && (
            <li ref={buttonRef} className="inline-block my-auto">
              <Link
                href={navigation_button.link}
                className="btn btn-underline max-lg:text-white"
              >
                {navigation_button.label}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
