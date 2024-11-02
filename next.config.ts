import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig: NextConfig = {
  // optimizePackageImports: ["@chakra-ui/react"],
  /* config options here */
};

if (process.env.NODE_ENV === "development") {
  (async function test() {
    await setupDevPlatform();
  })();
}

export default nextConfig;
