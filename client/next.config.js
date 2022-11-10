/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  fallbacks: {
    image: "/images/logo-192.png",
  },
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA({
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  nextConfig,
});
