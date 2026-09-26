/** @type {import('next').NextConfig} */
const nextConfig = {
  // Restore the standalone custom design at the public homepage. Keep the
  // previous React implementation in source so this change is easy to undo.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/index.html' },
        { source: '/community', destination: '/community.html' },
        { source: '/courses', destination: '/courses.html' },
        { source: '/course', destination: '/course.html' },
      ],
    }
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/community.html', destination: '/community', permanent: true },
      { source: '/courses.html', destination: '/courses', permanent: true },
      { source: '/course.html', destination: '/course', permanent: true },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
