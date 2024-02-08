import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layouts/Header'
import { ThemeProvider } from "@/components/themes/theme-provider"
import Footer from '@/components/layouts/Footer'
import { Toaster } from "@/components/ui/toaster"
import { ShopingCartProvider } from '@/context/ShopingCartProvider'
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShopingCartProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            >
            <Header />
            {children}
            <Toaster />
            <Footer />
            <Analytics />
          </ThemeProvider>
        </ShopingCartProvider>
      </body>
    </html>
  )
}
