'use client'

import React from 'react'
import { InvoiceLogoUpload } from './invoice-logo-upload'
import { CopilotChat } from '@copilotkit/react-ui'
import { useCopilotAction } from '@copilotkit/react-core'
import { invoiceStore } from '@/store/invoice-store'

export const InvoiceChat = () => {

  useCopilotAction({
    name: 'change_company_address',
    description:
      'Change the company address information for the invoice',
    parameters: [
      {
        name: 'streetAddress',
        type: 'string',
        description: 'Company street address'
      }, {
        name: 'city',
        type: 'string',
        description: 'Company city'
      }, {
        name: 'state',
        type: 'string',
        description: 'Company state'
      }, {
        name: 'zip',
        type: 'string',
        description: 'Company zip code'
      },
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'changeCompanyInfo', ctx })
    }
  })

  useCopilotAction({
    name: 'change_company_name',
    description:
      'Change the company name for the invoice',
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: 'Company name'
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'changeCompanyInfo', ctx })
    }
  })

  useCopilotAction({
    name: 'change_bill_to_address',
    description:
      'Change the bill to customer address information for the invoice',
    parameters: [
      {
        name: 'streetAddress',
        type: 'string',
        description: 'Customer street address'
      }, {
        name: 'city',
        type: 'string',
        description: 'Customer city'
      }, {
        name: 'state',
        type: 'string',
        description: 'Customer state'
      }, {
        name: 'zip',
        type: 'string',
        description: 'Customer zip code'
      },
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'changeBillToInfo', ctx })
    }
  })

  useCopilotAction({
    name: 'change_bill_to_name',
    description:
      'Change the bill to information for customer business name and customer name for the invoice',
    parameters: [
      {
        name: 'businessName',
        type: 'string',
        optional: true,
        description: 'Business name'
      },
      {
        name: 'customerName',
        type: 'string',
        optional: true,
        description: 'Customer name'
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'changeBillToInfo', ctx })
    }
  })

  useCopilotAction({
    name: 'change_background',
    description:
      'Change the background color of the chat and invoice. Can be anything that the CSS background attribute accepts. Regular colors, linear or radial gradients etc.',
    parameters: [
      {
        name: 'backgroundColor',
        type: 'string',
        description: 'The background color or gradient.'
      }
    ],
    handler: ({ backgroundColor }) => {
      invoiceStore.send({
        type: 'changeBackground',
        ctx: { backgroundColor }
      })
    }
  })

  useCopilotAction({
    name: 'change_date',
    description: 'Change the invoice date. Defaults to current date if not specified.',
    parameters: [
      {
        name: 'date',
        type: 'string',
        description: 'Invoice date (MM/DD/YYYY)',
      }
    ],
    handler: (ctx) => {
      const formattedDate = new Date(ctx.date).toLocaleDateString()
      invoiceStore.send({
        type: 'changeDates',
        ctx: {
          date: formattedDate
        }
      })
    }
  })

  useCopilotAction({
    name: 'change_due_date',
    description: 'Change the invoice due date.',
    parameters: [
      {
        name: 'dueDate',
        type: 'string',
        description: 'Due date (MM/DD/YYYY)',
      }
    ],
    handler: (ctx) => {
      const formattedDueDate = new Date(ctx.dueDate).toLocaleDateString()
      invoiceStore.send({
        type: 'changeDates',
        ctx: {
          dueDate: formattedDueDate
        }
      })
    }
  })

  useCopilotAction({
    name: 'update_paid_status',
    description: 'Update whether the invoice has been paid in full',
    parameters: [
      {
        name: 'paidInFull',
        type: 'boolean',
        description: 'Whether the invoice has been paid in full'
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'updatePaidStatus', ctx })
    }
  })

  useCopilotAction({
    name: 'update_terms',
    description: 'Update the payment terms (in days) for the invoice',
    parameters: [
      {
        name: 'terms',
        type: 'number',
        description: 'Number of days for payment terms'
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'updateTerms', ctx })
    }
  })

  useCopilotAction({
    name: 'update_note',
    description: 'Update the customer note on the invoice',
    parameters: [
      {
        name: 'note',
        type: 'string',
        description: 'Customer note to display on the invoice'
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'updateNote', ctx })
    }
  })

  useCopilotAction({
    name: 'add_invoice_item',
    description: 'Add a new item or line item to the invoice with name, description, quantity and amount',
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: 'Name, Product name, or service name of the item',
        required: true
      },
      {
        name: 'description',
        type: 'string',
        description: 'Description of the item',
      },
      {
        name: 'qty',
        type: 'number',
        description: 'Quantity or number of the item',
        required: true
      },
      {
        name: 'amount',
        type: 'number',
        description: 'Price, Cost, Rate, or Amount for the item',
        required: true
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'appendItem', ctx })
    }
  })

  useCopilotAction({
    name: 'remove_invoice_item',
    description: 'Remove an item from the invoice by its ID',
    parameters: [
      {
        name: 'id',
        type: 'number',
        description: 'ID of the item to remove'
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'removeItem', id: ctx.id })
    }
  })

  useCopilotAction({
    name: 'update_invoice_item',
    description: 'Update an existing invoice item by ID. All parameters except id are optional.',
    parameters: [
      {
        name: 'id',
        type: 'number',
        description: 'ID of the item to update'
      },
      {
        name: 'name',
        type: 'string',
        description: 'New name for the item',
      },
      {
        name: 'description',
        type: 'string',
        description: 'New description for the item',
      },
      {
        name: 'qty',
        type: 'number',
        description: 'New quantity for the item',
      },
      {
        name: 'amount',
        type: 'number',
        description: 'New price per unit for the item',
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'updateItem', ctx })
    }
  })

  useCopilotAction({
    name: 'update_tax_rate',
    description: 'Update the tax rate, amount, or percentage for the invoice. It cannot be below 0.0',
    parameters: [
      {
        name: 'rate',
        type: 'number',
        description: 'Tax rate percentage as decimal (e.g., 0.1 for 10%)'
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'updateTaxRate', ctx })
    }
  })

  useCopilotAction({
    name: 'update_paid_amount',
    description: 'Update the amount paid for the invoice. The paid amount cannot exceed the total due amount.',
    parameters: [
      {
        name: 'paidAmount',
        type: 'number',
        description: 'Amount paid on the invoice'
      }
    ],
    handler: (ctx) => {
      invoiceStore.send({ type: 'updatePaidAmount', ctx })
    }
  })

  useCopilotAction({
    name: 'change_invoice_number',
    description: 'Change the invoice number. The number will be automatically padded to 3 digits (e.g., 1 becomes 001, 45 becomes 045)',
    parameters: [
      {
        name: 'number',
        type: 'string',
        description: 'Invoice number to set (will be padded to 3 digits)'
      }
    ],
    handler: (ctx) => {
      // Pad the number to 3 digits
      const paddedNumber = ctx.number.padStart(3, '0')
      invoiceStore.send({
        type: 'changeInvoiceNumber',
        ctx: { number: paddedNumber }
      })
    }
  })

  useCopilotAction({
    name: 'upload_logo',
    description: 'Upload a company logo for the invoice through a drag and drop interface or file selection',
    renderAndWaitForResponse: ({ respond  }) => {
      return <InvoiceLogoUpload onUpload={() => {
        respond && respond('complete')
      }} />
    }
  })

  return (
    <div
      className='flex justify-center items-center h-[750px] w-full bg-transparent'
    >
      <div className='w-8/10 h-8/10 rounded-lg'>
        <CopilotChat
          className='h-full w-full rounded-2xl py-6'
          labels={{ initial: 'Hello, how can I help you today?' }}
          // onReloadMessages={() => {
          //   console.log('Reloading messages...')
          // }}
          // onStopGeneration={() => {
          //   console.log('Stopping generation...')
          // }}
          // onRegenerate={() => {
          //   console.log('Regenerating...')
          // }}
          // onInProgress={() => {
          //   console.log('In progress...')
          // }}
          // onSubmitMessage={(message => {
          //   console.log('Message submitted:', message)
          // })}
        />
      </div>
    </div>
  )
}

export default InvoiceChat