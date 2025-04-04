const { setupHoneybadger } = require('@honeybadger-io/nextjs')
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'gixfxmpgzvlchdemfpsg.supabase.co', 
      't.me'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gixfxmpgzvlchdemfpsg.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/blog_images/**', // Supabase Storage pattern'i
      },
    ],
  },
};

const honeybadgerNextJsConfig = {

  disableSourceMapUpload: false,


  silent: true,


  webpackPluginOptions: {
      apiKey: process.env.NEXT_PUBLIC_HONEYBADGER_API_KEY,
      revision: process.env.NEXT_PUBLIC_HONEYBADGER_REVISION,
      endpoint: 'https://api.honeybadger.io/v1/source_maps',
      ignoreErrors: false,
      retries: 3,
      workerCount: 5,
      deploy: {
          environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV,
          repository: 'https://github.com/NurbekLDM/nurbek-codes.git',
          localUsername: 'NurbekLDM'
      }
  }
}

module.exports = {nextConfig, ...honeybadgerNextJsConfig}