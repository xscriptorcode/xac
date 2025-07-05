
import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",          
  trailingSlash: true,       
  basePath: "/xac",          
  images: {
    unoptimized: true
  },
}

export default nextConfig;
