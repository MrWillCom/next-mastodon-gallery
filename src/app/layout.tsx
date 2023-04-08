import 'modern-normalize/modern-normalize.css'
import './globals.css'

export const metadata = {
  title: 'Gallery - Mr. Will',
  description: 'Gallery of my photographs posted on Mastodon.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
