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

  async rewrites() {
    return {
      beforeFiles: [
        {
          // Proxy requests that have a file extension directly to the backend
          // This keeps the URL as mailstora.com while streaming the image directly
          source: '/Email_Template/:path([^/]+.[a-zA-Z0-9]+)',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/Email_Template/:path`,
        },
        {
          source: '/Email_Template/:folder*/:file([^/]+.[a-zA-Z0-9]+)',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/Email_Template/:folder*/:file`,
        }
      ],
      afterFiles: [],
      fallback: [
        {
          source: '/Email_Template/:path*',
          destination: '/Email_Template_Index/:path*',
        },
      ],
    };
  },

  // Required for Netlify's Next.js adapter
  output: 'standalone',
};

export default nextConfig;
