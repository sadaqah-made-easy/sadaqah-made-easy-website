"use client";

import config from "@/config/config.json";
import { slugSelector } from "@/lib/utils/slugSelector";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = ({ src, lang }: { src?: string; lang: string }) => {
  // Destructuring items from config object
  const {
    logo,
    logo_width,
    logo_height,
    logo_text,
    title,
  }: {
    logo: string;
    logo_width: any;
    logo_height: any;
    logo_text: string;
    title: string;
  } = config.site;

  const logoPath = src || logo;

  return (
    <Link href={slugSelector(lang, "")} className="navbar-brand inline-block">
      {logoPath ? (
        <Image
          width={logo_width.replace("px", "") * 2}
          height={logo_height.replace("px", "") * 2}
          src={logoPath}
          alt={title}
          priority
          style={{
            height: logo_height.replace("px", "") + "px",
            width: logo_width.replace("px", "") + "px",
          }}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
