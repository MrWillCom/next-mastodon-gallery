import 'modern-normalize/modern-normalize.css'
import './globals.scss'
import config from '../../config'

export const metadata = config.metadata

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
