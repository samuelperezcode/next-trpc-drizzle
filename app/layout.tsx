import type { Metadata } from 'next'
import './globals.css'
import Provider from './_trpc/provider'

export const metadata: Metadata = {
  title: 'rRPC + Next.js + React Query',
  description: 'Demo app for trpc + Next.js + React Query',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
