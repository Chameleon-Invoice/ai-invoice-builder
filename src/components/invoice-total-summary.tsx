'use client'

import { useEffect } from 'react'
import { invoiceStore } from '@/store/invoice-store'
import { useSelector } from '@xstate/store/react'

export const InvoiceTotalSummary = () => {
  const invoice = useSelector(invoiceStore, (state) => state.context)

  return (
    <>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <span>Tax ({invoice.taxRate * 100}%)</span>
          <span className='font-semibold'>${invoice.taxAmount.toFixed(2)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Total</span>
          <span className='font-semibold'>${invoice.total.toFixed(2)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Payment</span>
          <span className='font-semibold'>
            ${invoice.paidAmount.toFixed(2)}
          </span>
        </div>
        <div className='pt-2 mt-2 border-t border-gray-200'>
          <div className='flex justify-between'>
            <span>Due Amount</span>
            <span className='font-semibold'>${invoice.dueAmount.toFixed(2)}</span>
          </div>
          {invoice.paidInFull && (
            <div className='text-right text-green-600 font-semibold'>
              Paid in Full
            </div>
          )}
        </div>
      </div>
    </>
  )
}
