import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GeneralProvider from './GeneralProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js, Prisma and TRPC',
  description: 'A next in Line is a Prismatic Trpc Indaboski',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GeneralProvider>
          {children}
        </GeneralProvider>
      </body>
    </html>
  )
}
