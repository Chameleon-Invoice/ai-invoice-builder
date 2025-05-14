'use client'

import React from 'react'
import { Download, Mail, Infinity } from 'lucide-react'
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
  return (
    <>
      {context.hasStarted ? (
        <InvoiceIntro />
      ) : (
        <div className='grid grid-cols-12 w-full'>
          <div className='col-span-8'>
            <InvoicePreview />
          </div>
          <div className='col-span-4'>
            <div className='flex flex-col gap-4 mx-auto w-8/10 items-stretch'>
              <Button variant='outline'>
                <Download className="mr-1 size-5" />
                Download
              </Button>
              <Button variant='secondary'>
                <Mail className="mr-1 size-5" />
                Send
              </Button>
              <Button variant='default'>
                <Infinity className="mr-1 size-5" />
                Random
              </Button>
            </div>
            <CopilotKit
              runtimeUrl='/api/copilotkit'
              showDevConsole={true}
              agent='mastraAgent'
            >
              <InvoiceChat />
            </CopilotKit>
          </div>
        </div>
      )}
    </>
  )
}

export default ChameleonInvoice
