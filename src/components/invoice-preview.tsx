'use client'

import { invoiceStore } from "@/store/invoice-store"
import { useSelector } from "@xstate/store/react"
import { InvoiceTotalSummary } from "./invoice-total-summary"

export function InvoicePreview() {
  const invoice = useSelector(invoiceStore, (state) => state.context)

  return (
    <div className="bg-white p-8 min-h-[90svh] rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">INVOICE #{invoice.number}</h1>
          <div className="text-lg font-semibold mt-1">{invoice.fromCompany.name}</div>
          <div className="text-sm text-gray-600 mt-1">
            {invoice.fromCompany.streetAddress}
            <br />
            {invoice.fromCompany.city}, {invoice.fromCompany.state} {invoice.fromCompany.zip}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            {invoice.fromCompany.email}
            <br />
            {invoice.fromCompany.phone}
            <br />
            {invoice.fromCompany.website}
          </div>
          <div className="mt-4 w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-xs">Logo</span>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="p-4 flex flex-col gap-1 rounded-md">
        <div className="text-sm text-gray-600 mb-1">Bill to:</div>
        <h2 className="font-semibold">{invoice.billTo.businessName}</h2>
        <h2>{invoice.billTo.customerName}</h2>
      </div>

      {/* Invoice Details */}
      <div className="bg-blue-50 p-4 rounded-md mb-8">
        <div className="font-semibold mb-2">Invoice details</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Invoice Date: {invoice.date}</div>
          <div>Due Date: {invoice.dueDate}</div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">#</th>
              <th className="py-2 text-left">Product or service</th>
              <th className="py-2 text-left">Description</th>
              <th className="py-2 text-right">Qty</th>
              <th className="py-2 text-right">Amount</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3">{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td className="text-right">{item.qty}</td>
                <td className="text-right">${item.amount.toFixed(2)}</td>
                <td className="text-right">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex justify-between mb-8">
        <div className="w-1/2">
          <div className="mb-4">
            <div className="font-semibold mb-2">Ways to pay</div>
            <div className="flex space-x-2">
              {invoice.supportedPayments.map((payment, index) => (
                <div key={index} className="h-6 px-3 bg-gray-200 rounded flex items-center justify-center text-xs">
                  {payment}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Note to customer</div>
            <div className="text-sm text-gray-600">{invoice.note}</div>
          </div>
        </div>
        <div className="w-1/3">
          <InvoiceTotalSummary />
        </div>
      </div>
    </div>
  )
}
