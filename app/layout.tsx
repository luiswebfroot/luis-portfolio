import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luis Fu — Software Developer',
  description: 'Software developer based in Auckland, New Zealand. Specialising in React, Node.js, Python, PostgreSQL and AWS.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="//code.tidio.co/jpyw08dqxqsiwzx83bm8t4fqqqgssaiw.js" strategy="afterInteractive" />
    </html>
  )
}
