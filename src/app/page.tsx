'use client'

import React, { useEffect } from 'react'
import { Undo2 } from 'lucide-react'
import '@copilotkit/react-ui/styles.css'
import './globals.css'
import { CopilotKit } from '@copilotkit/react-core'
import { InvoicePreview } from '@/components/invoice-preview'
import { InvoiceIntro } from '@/components/invoice-intro'
import { InvoiceChat } from '@/components/invoice-chat'
import { useSelector } from '@xstate/store/react'
import { invoiceStore } from '@/store/invoice-store'
import { Button } from '@/components/ui/button'

const ChameleonInvoice: React.FC = () => {
  const context = useSelector(invoiceStore, (state) => state.context)

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', context.customization.primaryColor)
  }, [context.customization.primaryColor])
  return (
    <>
      {context.hasStarted ? (
        <InvoiceIntro />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-12 w-full gap-6 p-4 md:p-0'>
          <div className='col-span-1 md:col-span-8'>
            <InvoicePreview />
          </div>
          <div className='col-span-1 md:col-span-4'>
            <CopilotKit
              runtimeUrl='/api/copilotkit'
              agent='mastraAgent'
            >
              <InvoiceChat />
            </CopilotKit>
            <div className='flex flex-col gap-4 mx-auto w-full md:w-8/10 items-stretch px-4 md:px-0'>
              <Button
                onClick={() => invoiceStore.send({ type: 'reset' })}
                variant='link' className='text-red-600'>
                <Undo2 className="mr-1 size-5" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChameleonInvoice
