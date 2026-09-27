/** @type {import('next').NextConfig} */
const nextConfig = {
  // React routes replace the HTML export; old bookmarks still redirect below.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/community.html', destination: '/community', permanent: true },
      { source: '/courses.html', destination: '/courses', permanent: true },
      { source: '/course.html', destination: '/course', permanent: true },
    ]
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
