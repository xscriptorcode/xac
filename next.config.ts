// next.config.ts
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
};

const pluginPWA = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

export default pluginPWA(nextConfig);
