import 'modern-normalize/modern-normalize.css'
import './globals.scss'
import config from '@/../config'
import { ViewTransitions } from 'next-view-transitions'

import { Noto_Serif } from 'next/font/google'
const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
})

export const metadata = config.metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={notoSerif.className}>{children}</body>
      </html>
    </ViewTransitions>
  )
}
