export default async (request, context) => {
  const res = await context.next()
  const headers = new Headers(res.headers)
  headers.set('X-Ef', 'yes')
  headers.set('Netlify-Vary', 'query=efv')
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  })
}

export const config = { path: ['/ext/*', '/efonly/*'] }
