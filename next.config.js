const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/ext/:slug*',
        destination: 'https://example.com/',
      },
      {
        source: '/int/:slug*',
        destination: '/internal-target',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/vary-ok/:path*',
        headers: [{ key: 'Netlify-Vary', value: 'query=v' }],
      },
      {
        source: '/ext/:path*',
        headers: [{ key: 'X-Probe', value: 'ext' }],
      },
      {
        source: '/int/:path*',
        headers: [{ key: 'X-Probe', value: 'int' }],
      },
      {
        source: '/none/:path*',
        headers: [{ key: 'X-Probe', value: 'none' }],
      },
    ]
  },
}

module.exports = nextConfig
