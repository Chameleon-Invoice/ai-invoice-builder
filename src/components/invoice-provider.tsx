'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from '@xstate/store/react'
import { invoiceStore, store } from '@/store/invoice-store'
// import { MastraClient } from '@mastra/client-js'

const InvoiceContext = createContext(store)

const initializeStore = async () => {
      // const mastra = new MastraClient({
      //   baseUrl: process.env.MASTRA_BASE_URl ?? 'http://localhost:4111',
      // })

      // const workflowInstance = mastra.getVNextWorkflow('companyUrlWorkflow')
      // const run = await workflowInstance.createRun()

      // const result = await workflowInstance.startAsync({
      //   runId: run.runId,
      //   inputData: {
      //     companyUrl: 'https://www.mastra.ai',
      //   }
      // })

      // console.log('Workflow result:', result)

  try {
    const localStorageData = localStorage.getItem('invoiceStore')
    if (localStorageData) {
      invoiceStore.send({ type: 'init', context: JSON.parse(localStorageData)})
    }
  } catch (error) {
    console.error('Failed to initialize from localStorage:', error)
  }
}

export const InvoiceProvider = ({ children }: {children: React.ReactNode}) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const context = useSelector(invoiceStore, (state) => state.context)

  useEffect(() => {
    // Initialize store on mount
    initializeStore()

    // Setup localStorage subscription
    const subscription = invoiceStore.subscribe((snapshot) => {
      localStorage.setItem('invoiceStore', JSON.stringify(snapshot.context))
    })

    setIsInitialized(true)

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (!isInitialized) {
    return null // or a loading spinner if preferred
  }

  return (
    <InvoiceContext.Provider value={context}>
      {children}
    </InvoiceContext.Provider>
  )
}
const useInvoiceContext = () => {
	const context = useContext(InvoiceContext)
	if (!context) {
		throw new Error('useInvoiceContext must be used within an InvoiceProvider')
	}
	return context
}

export default InvoiceProvider

export { InvoiceContext, useInvoiceContext }