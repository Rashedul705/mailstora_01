import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Pin the project root: a second package-lock.json in the parent folder made Turbopack pick the wrong root
  turbopack: { root: __dirname },
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

  // Keep utility areas out of search results. A noindex header (not a robots.txt block) is used,
  // because search engines must be able to fetch a URL to see that it should be dropped.
  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, noimageindex' }];
    return [
      { source: '/Email_Template', headers: noindex },
      { source: '/Email_Template/:path*', headers: noindex },
      { source: '/Email_Template_Index/:path*', headers: noindex },
      { source: '/checkout/:path*', headers: noindex },
    ];
  },

  async redirects() {
    return [
      {
        source: '/portfolio/investment-programes/',
        destination: '/portfolio/investment-programs/',
        permanent: true,
      },
      // Merged service pages (duplicate intent) point to the page that now covers them
      { source: '/psd-to-html-email/', destination: '/figma-to-html-email/', permanent: true },
      { source: '/responsive-email-template-design/', destination: '/html-email-template-development/', permanent: true },
      { source: '/company-email-signature-deployment/', destination: '/html-email-signature-design/', permanent: true },
      { source: '/process/', destination: '/', permanent: true },
      { source: '/zoho-campaigns-email-templates/', destination: '/html-email-template-development/', permanent: true },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          // Proxy requests that have a file extension directly to the backend
          // This keeps the URL as mailstora.com while streaming the image directly
          source: '/Email_Template/:path([^/]+\\.[a-zA-Z0-9]+)',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/Email_Template/:path`,
        },
        {
          source: '/Email_Template/:folder*/:file([^/]+\\.[a-zA-Z0-9]+)',
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
