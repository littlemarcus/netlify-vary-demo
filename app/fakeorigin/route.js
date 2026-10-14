export const dynamic = 'force-dynamic'

export async function GET() {
  return new Response('fake origin body', {
    headers: {
      'content-type': 'text/plain',
      'netlify-vary': 'query=ov',
      'x-fake-origin': 'yes',
      'cache-control': 'public, max-age=300',
    },
  })
}
