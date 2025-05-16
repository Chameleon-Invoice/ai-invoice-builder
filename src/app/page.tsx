
import { ChameleonInvoice } from '@/components/chameleon-invoice'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chameleon Invoice',
  description: 'Invoicing made simple. Done before you notice.',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function Page() {

  return (
    <ChameleonInvoice />
  )
}
