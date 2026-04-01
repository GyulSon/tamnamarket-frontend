// 넥스트 설정 파일
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@vapor-ui/core", "@vapor-ui/icons"],
};

export default nextConfig;
