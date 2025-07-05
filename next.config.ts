
import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",          
  trailingSlash: true,       
  basePath: "/xac",     
  distDir: "docs",     
  images: {
    unoptimized: true
  },
}

export default nextConfig;
