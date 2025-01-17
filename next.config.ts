import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Додай тут свій домен
  },
};

export default withNextIntl(nextConfig);
