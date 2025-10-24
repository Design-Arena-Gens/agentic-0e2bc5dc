import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YT Script Assistant - AI Scriptwriting Tool',
  description: 'AI-powered scriptwriting assistant for YouTube videos',
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
