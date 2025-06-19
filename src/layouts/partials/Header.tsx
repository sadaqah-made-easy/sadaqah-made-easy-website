"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { INavigationLink } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const navMenuRef = useRef<HTMLUListElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLLIElement | null>(null);
  const pathname = usePathname();

  // scroll to top on route change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;

  // Handle scroll without GSAP for better performance
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const position = window.scrollY;

      // Apply inline styles directly instead of using GSAP
      if (headerRef.current && navMenuRef.current && logoRef.current && buttonRef.current) {
        const header = headerRef.current;
        const navMenu = navMenuRef.current;
        const logo = logoRef.current;
        const button = buttonRef.current;

        // Calculate values based on scroll position
        const progress = Math.min(position / 500, 1); // 500px is our animation distance
        const isSmallScreen = window.innerWidth <= 1024;
        const bgOpacity = Math.min(progress * 1.5, 1);
        const yOffset = isSmallScreen ? 0 : Math.min(progress * 20, 20);
        const shadowOpacity = Math.min(progress * 0.1, 0.1);
        const scale = 1 - progress * 0.1;
        const fontSize = 1.125 - progress * 0.125;
        const paddingX = 1.75 - progress * 0.75;

        // Apply styles directly to DOM - more performant than GSAP for simple animations
        header.style.backgroundColor = `rgba(255, 255, 255, ${bgOpacity})`;
        header.style.boxShadow = `0 0px 30px 5px rgba(0, 0, 0, ${shadowOpacity})`;
        header.style.transform = `translateY(${yOffset}px)`;

        if (!isSmallScreen) {
          navMenu.style.padding = `0rem ${paddingX}rem`;
        }

        logo.style.transform = `scale(${scale})`;
        button.style.fontSize = `${fontSize}rem`;
      }
    };

    // Use requestAnimationFrame for smoother scrolling
    let ticking = false;

    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    // Initial call to set correct styles
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [pathname]); // Re-run the effect on pathname change

  const toggleMenu = (isOpen: boolean) => {
    const navMenu = navMenuRef.current;
    if (!navMenu) return;

    // Use CSS classes for animation instead of GSAP
    if (isOpen) {
      navMenu.style.display = "block";
      // Use setTimeout to ensure display block takes effect before animation
      setTimeout(() => {
        navMenu.classList.add("menu-open");
        navMenu.classList.remove("menu-closed");
      }, 10);
    } else {
      navMenu.classList.remove("menu-open");
      navMenu.classList.add("menu-closed");
      // Wait for animation to finish before hiding
      setTimeout(() => {
        navMenu.style.display = "none";
      }, 400); // Match this to the CSS transition duration
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
        <div ref={logoRef} className="order-0 logo-container">
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
          className="navbar-nav order-3 hidden w-full lg:order-1 lg:flex lg:w-auto lg:pb-0 max-lg:py-3 max-lg:bg-primary max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:right-0 "
        >
          {/* search button */}
          {settings.search && (
            <li className="flex items-center max-lg:p-4">
              <button
                className="text-white lg:text-primary transition-all duration-300 border-primary/20 mr-7 inline-block lg:border-r pr-5 text-xl"
                aria-label="search"
                data-search-trigger
              >
                <IoSearch />
              </button>
            </li>
          )}

          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`nav-link inline-flex items-center ${menu.children?.some((child) => isActive(child.url))
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
                          className={`nav-dropdown-link block py-1 font-semibold text-dark transition hover:text-primary ${isActive(child.url) ? "active" : ""
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
                    className={`nav-link block font-semibold transition px-4 lg:px-2 lg:py-3 ${isActive(menu.url) ? "active" : ""
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
