export default function Home() {
  return (
    <main>
      <h1>Netlify-Vary from next.config.js</h1>

      <p>
        The Netlify Next runtime merges a user-supplied <code>Netlify-Vary</code> into the
        values it generates. It does not overwrite it.
      </p>

      <h2>The config</h2>
      <pre style={{ background: '#f4f4f5', padding: '1rem', overflowX: 'auto' }}>
{`// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/vary-ok/:path*',
        headers: [{ key: 'Netlify-Vary', value: 'query=v' }],
      },
    ]
  },
}`}
      </pre>

      <h2>Check it</h2>
      <pre style={{ background: '#f4f4f5', padding: '1rem', overflowX: 'auto' }}>
{`# rule applies -> query list ends with |v
curl -sI "$SITE/vary-ok/demo" | grep -i netlify-vary

# control, no rule -> no v
curl -sI "$SITE/"             | grep -i netlify-vary`}
      </pre>

      <p>
        On <a href="/vary-ok/demo">/vary-ok/demo</a> the response header reads{' '}
        <code>query=__nextDataReq|_rsc|v</code>. The runtime defaults are still there, with{' '}
        <code>v</code> appended.
      </p>
    </main>
  )
}
