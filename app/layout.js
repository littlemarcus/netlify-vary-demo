export const metadata = {
  title: 'Netlify-Vary demo',
  description: 'Shows next.config.js headers() adding a Netlify-Vary response header',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '44rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {children}
      </body>
    </html>
  )
}
