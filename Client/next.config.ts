import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from your backend and external services
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.netlify.app' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'ibb.co' },
      // Add your Render backend hostname here after deploying:
      // { protocol: 'https', hostname: 'mailstora-server.onrender.com' },
    ],
  },

  // Required for Netlify's Next.js adapter
  output: 'standalone',
};

export default nextConfig;
