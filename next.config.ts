import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://placehold.co/150x150?text=logo')],
    dangerouslyAllowSVG: true
  }
}

export default nextConfig
