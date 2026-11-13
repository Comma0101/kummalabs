import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ~/Documents has its own lockfile; pin the workspace root to this project.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
