const box = { background: '#f4f4f5', padding: '1rem', overflowX: 'auto' }

export default function Home() {
  return (
    <main>
      <h1>Next.js headers() on Netlify</h1>
      <p>Verified on Next.js 16.4.0 and 15.5.27.</p>

      <h2>1. The runtime merges your Netlify-Vary</h2>
      <p>
        The Netlify Next runtime appends a user-supplied <code>Netlify-Vary</code> to the
        values it generates. It does not overwrite it.
      </p>
      <pre style={box}>
{`curl -sI "$SITE/vary-ok/demo" | grep -i netlify-vary
query=__nextDataReq|_rsc|v

curl -sI "$SITE/" | grep -i netlify-vary
query=__nextDataReq|_rsc`}
      </pre>
      <p>
        See <a href="/vary-ok/demo">/vary-ok/demo</a>. Add{' '}
        <code>-H &apos;x-nf-debug-logging: 1&apos;</code> and read{' '}
        <code>debug-x-nf-raw-cache-variation</code> to confirm the value reached the cache key.
      </p>

      <h2>2. headers() is dropped on external rewrites</h2>
      <p>
        Three paths carry an identical <code>headers()</code> rule. The only difference
        between them is the rewrite. This is Next.js behaviour, not Netlify behaviour. It
        reproduces locally with <code>next build &amp;&amp; next start</code>.
      </p>
      <pre style={box}>
{`curl -sI "$SITE/ext/foo"   | grep -i x-probe   # nothing
curl -sI "$SITE/int/foo"   | grep -i x-probe   # X-Probe: int
curl -sI "$SITE/none/demo" | grep -i x-probe   # X-Probe: none`}
      </pre>
      <table cellPadding="6" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Path</th>
            <th align="left">Rewrite</th>
            <th align="left">X-Probe</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>/ext/foo</code></td><td>external, to example.com</td><td>missing, on a 200</td></tr>
          <tr><td><code>/int/foo</code></td><td>internal, to a local page</td><td>present</td></tr>
          <tr><td><code>/none/demo</code></td><td>none</td><td>present</td></tr>
        </tbody>
      </table>
      <p>
        A header rule whose path is also an external rewrite target never applies. Next
        streams the upstream response through and drops the configured headers.
      </p>
      <p>
        The Next.js docs do not describe this. Their routing order lists{' '}
        <code>headers</code> as step 1, before rewrites, which suggests the opposite.
      </p>
      <ul>
        <li><a href="/int/foo">/int/foo</a> — internal rewrite, header applies</li>
        <li><a href="/none/demo">/none/demo</a> — no rewrite, header applies</li>
      </ul>

      <h2>3. Can an edge function set it instead?</h2>
      <p>
        A Netlify edge function on <code>/ext/*</code> and <code>/efonly/*</code> calls{' '}
        <code>context.next()</code>, then sets <code>X-Ef</code> and{' '}
        <code>Netlify-Vary: query=efv</code> on the response.
      </p>
      <p>
        The question is not only whether the header appears. It is whether the value reaches
        the cache key. Read <code>debug-x-nf-raw-cache-variation</code> and look for{' '}
        <code>efv</code>.
      </p>
      <pre style={box}>
{`curl -sI -H 'x-nf-debug-logging: 1' "$SITE/ext/foo" \\
  | grep -i 'x-ef\\|netlify-vary\\|raw-cache-variation'

curl -sI -H 'x-nf-debug-logging: 1' "$SITE/efonly/demo" \\
  | grep -i 'x-ef\\|netlify-vary\\|raw-cache-variation'`}
      </pre>
      <ul>
        <li><a href="/efonly/demo">/efonly/demo</a> — edge function, no rewrite</li>
      </ul>
    </main>
  )
}
