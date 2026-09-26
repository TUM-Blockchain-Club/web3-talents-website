/** @type {import('next').NextConfig} */
const nextConfig = {
  // Restore the standalone custom design at the public homepage. Keep the
  // previous React implementation in source so this change is easy to undo.
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/index.html' }],
    }
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
