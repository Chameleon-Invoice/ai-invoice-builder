'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import InvoiceProvider from '@/components/invoice-provider'
import { useSelector } from '@xstate/store/react'
import { invoiceStore } from '@/store/invoice-store'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const invoice = useSelector(invoiceStore, (state) => state.context)

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InvoiceProvider>
          <ThemeProvider
            defaultTheme='default'
            forcedTheme='default'
            themes={['default', 'light', 'dark']}
          >
            <main className='bg-gray-100 h-full flex flex-col md:justify-center [data-theme=dark]:bg-gray-900 items-center' style={{
              backgroundColor: invoice.customization.backgroundColor,
            }}>
              {children}
            </main>
          </ThemeProvider>
        </InvoiceProvider>
      </body>
    </html>
  )
}
