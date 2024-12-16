const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");
const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
    ],
  },
};

// Use an async IIFE to handle the `await`
if (process.env.NODE_ENV === "development") {
  (async () => {
    try {
      await setupDevPlatform();
    } catch (err) {
      console.error("Error setting up dev platform:", err);
    }
  })();
}

module.exports = nextConfig;
