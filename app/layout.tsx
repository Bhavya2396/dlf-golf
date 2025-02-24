import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from './components/common/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DLF Golf App',
  description: 'Your personal golf companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0A4B3A] text-white min-h-screen pb-24`}>
        <main className="max-w-lg mx-auto px-4">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  )
} 