/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // replaces `next export`
  images: { unoptimized: true },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
