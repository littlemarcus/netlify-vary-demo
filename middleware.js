import { NextResponse } from 'next/server'

export function middleware() {
  const res = NextResponse.rewrite(new URL('https://example.com/'))
  res.headers.set('X-Mw', 'yes')
  res.headers.set('Netlify-Vary', 'query=mwv')
  return res
}

export const config = { matcher: ['/mwext/:path*'] }
