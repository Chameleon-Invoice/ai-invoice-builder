'use client'

import React, { useState } from 'react'
import { Download, Mail, Share2 } from 'lucide-react'
import '@copilotkit/react-ui/styles.css'
import './globals.css'
import { CopilotKit, useCopilotAction } from '@copilotkit/react-core'
import { CopilotChat } from '@copilotkit/react-ui'
import { InvoicePreview } from '@/components/invoice-preview'
import { InvoiceIntro } from '@/components/invoice-intro'
import { useSelector } from '@xstate/store/react'
import { invoiceStore } from '@/store/invoice-store'
import { Button } from '@/components/ui/button'

const ChameleonInvoice: React.FC = () => {
  const { getStarted } = useSelector(invoiceStore, (state) => state.context)

  return (
    <>
      {getStarted ? (
        <InvoiceIntro />
      ) : (
        <div className='grid grid-cols-12 w-full'>
          <div className='col-span-8'>
            <InvoicePreview />
          </div>
          <div className='col-span-4'>
            <div className='flex flex-col gap-4 mx-auto w-8/10 items-stretch'>
            <Button variant='outline'>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant='secondary'>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button variant='default'>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            </div>
            <CopilotKit
              runtimeUrl='/api/copilotkit'
              showDevConsole={true}
              agent='mastraAgent'
            >
              <Chat />
            </CopilotKit>
          </div>
        </div>
      )}
    </>
  )
}

const Chat = () => {
  const [background, setBackground] = useState<string>(
    '--copilot-kit-background-color'
  )

  useCopilotAction({
    name: 'change_background',
    description:
      'Change the background color of the chat. Can be anything that the CSS background attribute accepts. Regular colors, linear of radial gradients etc.',
    parameters: [
      {
        name: 'background',
        type: 'string',
        description: 'The background. Prefer gradients.'
      }
    ],
    handler: ({ background }) => {
      setBackground(background)
    }
  })

  return (
    <div
      className='flex justify-center items-center h-[750px] w-full'
      style={{ background }}
    >
      <div className='w-8/10 h-8/10 rounded-lg '>
        <CopilotChat
          className='h-full w-full rounded-2xl py-6'
          labels={{ initial: 'Hello, how can I help you today?' }}
        />
      </div>
    </div>
  )
}

export default ChameleonInvoice
