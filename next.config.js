/**
 * Adding a Netlify-Vary response header from next.config.js.
 *
 * The Netlify Next runtime MERGES a user-supplied Netlify-Vary into the values
 * it generates itself. It does not overwrite it.
 * See: opennextjs-netlify/src/run/headers.ts -> setVaryHeaders()
 *   - the runtime's own defaults are pushed first
 *   - the response's `Vary` header is folded in
 *   - then the user's `Netlify-Vary` directives are appended
 *
 * `source` is matched with path-to-regexp, so the wildcard is `:path*`.
 */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/vary-ok/:path*',
        headers: [{ key: 'Netlify-Vary', value: 'query=v' }],
      },
    ]
  },
}

module.exports = nextConfig
