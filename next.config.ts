import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
   webpack: (config, { isServer }) => {
    // Exclude server-only packages from client-side bundles
    if (!isServer) {
      config.externals = [
        ...(config.externals || []),
        'firebase-admin',
        '@opentelemetry/exporter-jaeger',
        'express',
      ];
    }
    
    // Add a fallback for the 'fs' module used by some server-side packages
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

export default nextConfig;
