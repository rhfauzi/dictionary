/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-dnd'])
const path = require('path');

const nextConfig = {
  //   images: {
  //     domains: ['mdm-portal.nabatisnack.co.id'],
  //   },
  experimental: {
    outputStandalone: true,
    esmExternals: true,
    serverless: true,
    // optimizeCss: true,
    // optimizeImages: true,
    // optimizeFonts: true,
    target: 'experimental-serverless-esbuild',
  },
  basePath: '/hc',
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!isServer) {
      config.resolve.alias['esbuild_output'] = path.resolve(__dirname, 'esbuild_output');
    }

    return config
  },
  typescript: { ignoreBuildErrors: true },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  devIndicators: { buildActivity: false },
}

module.exports = withTM(nextConfig)
