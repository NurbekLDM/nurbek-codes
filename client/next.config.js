/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'gixfxmpgzvlchdemfpsg.supabase.co', // Supabase host nomini qo'shamiz
      // Agar boshqa domenlar bo'lsa, ularni ham qo'shing
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

module.exports = nextConfig;