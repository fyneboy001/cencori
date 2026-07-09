// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   experimental: {
//     optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
//   },
//   // Configure images to allow all local paths (Next.js 16 requirement)
//   images: {
//     localPatterns: [
//       {
//         pathname: "/**",
//       },
//     ],
//   },
//   // Security and caching headers
//   async headers() {
//     // Security headers to apply to all routes
//     const securityHeaders = [
//       {
//         key: "X-Content-Type-Options",
//         value: "nosniff",
//       },
//       {
//         key: "X-Frame-Options",
//         value: "DENY",
//       },
//       {
//         key: "X-XSS-Protection",
//         value: "1; mode=block",
//       },
//       {
//         key: "Referrer-Policy",
//         value: "strict-origin-when-cross-origin",
//       },
//       {
//         key: "Permissions-Policy",
//         value: "camera=(), microphone=(), geolocation=()",
//       },
//     ];

//     return [
//       {
//         // Apply security headers to ALL routes
//         source: "/:path*",
//         headers: securityHeaders,
//       },
//       {
//         // Cache OG image for 1 year (immutable since we version via filename)
//         source: "/og-image.(jpg|png)",
//         headers: [
//           ...securityHeaders,
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//       {
//         // Cache all static images for 1 year
//         source: "/:all*.(jpg|jpeg|png|gif|webp|svg|ico)",
//         headers: [
//           ...securityHeaders,
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  images: {
    // Allow local images
    localPatterns: [
      {
        pathname: "/**",
      },
    ],

    // Allow external images (Google avatars)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // Security and caching headers
  async headers() {
    // Security headers to apply to all routes
    const securityHeaders = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "DENY",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },

      // Content Security Policy
      {
        key: "Content-Security-Policy",
        value: `
          default-src 'self';
          
          script-src 'self' 'unsafe-inline' 'unsafe-eval'
            https://vercel.live
            https://*.vercel-scripts.com
            https://us-assets.i.posthog.com;

          style-src 'self' 'unsafe-inline'
            https://fonts.googleapis.com;

          font-src 'self'
            https://fonts.gstatic.com;

          img-src 'self' data: blob:
            https://lh3.googleusercontent.com;

          connect-src 'self'
            https://us.i.posthog.com
            https://us-assets.i.posthog.com;

          frame-ancestors 'none';
        `
          .replace(/\n/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim(),
      },
    ];

    return [
      {
        // Apply security headers to ALL routes
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Cache OG image for 1 year
        source: "/og-image.(jpg|png)",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache all static images for 1 year
        source: "/:all*.(jpg|jpeg|png|gif|webp|svg|ico)",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;