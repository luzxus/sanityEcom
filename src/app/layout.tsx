import { Footer, Navbar } from '@/components'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { StateContext } from '../../context/StateContext'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })
/* className={inter.className} */
export const metadata: Metadata = {
  title: 'WarningChiliZone.se',
  description: 'Chili produkter på svenska marknaden',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StateContext>
          <div className="layout">
            <Toaster/>
            <header>
              <Navbar />
            </header>
            <main className="main-container">{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
          <Analytics />
        </StateContext>
      </body>
    </html>
  )
}
