import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO:Remove this when you deploy your app
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dwhpe0oqy/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dsz3rgtpj/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  compress: true,
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: [
  //       "localhost:3000",
  //       "https://upgraded-space-meme-gv67xr5w9572wvx9-3000.app.github.dev",
  //     ],
  //     // allowedForwardedHosts: ["localhost:3000","https://upgraded-space-meme-gv67xr5w9572wvx9-3000.app.github.dev"],
  //     // ^ You might have to use this property depending on your exact version.
  //   },
  // },
};

export default nextConfig;
