"use client";

import config from "@/config/config.json";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export default function GoogleTagManager() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && config.params.tag_manager_id) {
      const tagManagerArgs = {
        gtmId: config.params.tag_manager_id,
      };

      const timerId = setTimeout(() => {
        TagManager.initialize(tagManagerArgs);
      }, 12000);

      return () => clearTimeout(timerId);
    }
  }, []);

  return null;
}
