import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ["usedeshi.blob.core.windows.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "usedeshi.blob.core.windows.net",
        port: "",
        pathname: "/use-deshi-images/**",
      },
    ],
  },
};

console.log("Next config i18n:", i18n);
export default nextConfig;
