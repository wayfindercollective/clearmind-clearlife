import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Scope file tracing to THIS project (a stray package-lock.json in the home dir
  // otherwise makes Next infer C:\Users\natha as the workspace root).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
