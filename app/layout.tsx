import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luis Fu — Software Developer',
  description: 'Software developer based in Auckland, New Zealand. Specialising in React, Node.js, Python, PostgreSQL and AWS.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
