import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO:Remove this when you deploy your app
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000","https://upgraded-space-meme-gv67xr5w9572wvx9-3000.app.github.dev"],
      // allowedForwardedHosts: ["localhost:3000","https://upgraded-space-meme-gv67xr5w9572wvx9-3000.app.github.dev"],
      // ^ You might have to use this property depending on your exact version.
    }
  }
};

export default nextConfig;
