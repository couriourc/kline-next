import { codeInspectorPlugin } from "code-inspector-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import("next").NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    // why did you render
    if (dev && !isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const wdrPath = path.resolve(__dirname, "./vendors/whyDidYouRender.js");
        const entries = await originalEntry();
        if (entries["main.js"] && !entries["main.js"].includes(wdrPath)) {
          entries["main.js"].unshift(wdrPath);
        }
        return entries;
      };
    }
    config.resolve.alias = {
      // Spread everything to avoid remove any alias they might have
      ...config.resolve.alias,
      // Your custom aliases here
      klinecharts: path.resolve(
        __dirname,
        "node_modules/couriourc-klinecharts/"
      ),
      "@components/": path.resolve(__dirname, "app/_components/"),
      "@lib/": path.resolve(__dirname, "app/_lib/"),
      "$types/": path.resolve(__dirname, "app/_types/"),
      "@styles/": path.resolve(__dirname, "app/_styles/"),
      "@services/": path.resolve(__dirname, "app/_services/"),
    };
    config.plugins.push(codeInspectorPlugin({ bundler: "webpack" }));

    return config;
  },
  compiler: {
    styledComponents: true
  },
  productionBrowserSourceMaps: false, // enable browser source map generation during the production build
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"]
  },
  // fix all before production. Now it slow the develop speed.
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  typescript: {
    // https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
    ignoreBuildErrors: true
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false
      }
    ];
  },
  output: "standalone",
  transpilePackages:['rasterizehtml']
};

export default nextConfig;
