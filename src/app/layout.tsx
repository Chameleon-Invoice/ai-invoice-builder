import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import InvoiceProvider from '@/components/invoice-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Chameleon Invoice',
  description: 'Invoicing for the people who hate quickbooks invoicing'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className='flex flex-col items-center h-full justify-center bg-gray-100'>
          <InvoiceProvider>
            <ThemeProvider
              defaultTheme='default'
              forcedTheme='default'
              themes={['default', 'nike', 'chick-fil-a']}
            >
              {children}
            </ThemeProvider>
          </InvoiceProvider>
        </main>
      </body>
    </html>
  )
}
