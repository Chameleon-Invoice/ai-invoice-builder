'use client'

import Image from 'next/image'
import { Card } from './ui/card'
import { invoiceStore } from '@/store/invoice-store'
import { Button } from './ui/button'

export function InvoiceIntro() {
  return (
    <Card className='bg-white border-gray-100 shadow-2xl shadow-green-500/15 flex items-center flex-col gap-2 p-12'>
      <Image src='/logo.png' alt='Logo' width={400} height={400} />
      <Button
				onClick={() => invoiceStore.send({ type: 'hasStarted' })}
        className='bg-green-600 hover:bg-green-700 text-white px-12 py-2 rounded-lg shadow-lg w-auto'
      >
        Get Started
      </Button>
    </Card>
  )
}