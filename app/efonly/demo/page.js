export default function Page() {
  return (
    <main>
      <h1>/efonly/demo</h1>
      <p>
        No rewrite applies here. An edge function sets <code>X-Ef</code> and{' '}
        <code>Netlify-Vary</code> on the response. This is the control for the edge function
        test.
      </p>
      <p><a href="/">back</a></p>
    </main>
  )
}
