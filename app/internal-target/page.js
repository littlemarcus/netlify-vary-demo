export default function Page() {
  return (
    <main>
      <h1>/internal-target</h1>
      <p>
        Destination of the internal rewrite from <code>/int/:slug*</code>. Responses here
        carry <code>X-Probe: int</code>.
      </p>
      <p><a href="/">back</a></p>
    </main>
  )
}
