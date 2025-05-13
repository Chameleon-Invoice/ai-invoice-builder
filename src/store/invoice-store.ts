import { createStore } from '@xstate/store'

export const store = {
  hasStarted: true,
  fromCompany: {
    name: 'Company or name',
    streetAddress: '123 Main St',
    city: 'City',
    state: 'State',
    zip: 'Zip code',
    phone: '+1 (555) 555-5555',
    email: 'hello@company.com',
    website: 'www.company.com'
  },
  billTo: {
    businessName: 'Business name',
    customerName: 'Customer name',
    address: 'Address',
    city: 'City',
    state: 'State',
    zip: 'Zip code',
    phone: 'Phone number',
    email: 'Email address'
  },
  invoiceNumber: '001',
  invoiceDate: new Date().toLocaleDateString(),
  dueDate: new Date(
    new Date().setDate(new Date().getDate() + 30)
  ).toLocaleDateString(),
  terms: 30,
  currency: 'USD',
  items: [
    {
      id: 1,
      service: 'Name',
      description: 'Description',
      qty: 1,
      rate: 0.0,
      amount: 0.0
    }
  ],
  total: 0.0,
  tax: 0.0,
  paidAmount: 0.0,
  dueAmount: 0.0,
  paidInFull: false,
  supportedPayments: ['Cash', 'Credit card', 'Bank Transfer'],
  note: 'Add a visible customer note here'
}

type InvoiceStore = typeof store

export const invoiceStore = createStore({
  // Initial context
  context: store as InvoiceStore,
  // Transitions
  on: {
    init: (context, event: { context: InvoiceStore }) => {
      console.log('init context', context)
      console.log('init event', event.context)
      // Initialize the context with the event context
      // spread out the event conext to merge with the current context
      return {
        ...context,
        ...event.context
      }
    },
    hasStarted: (context) => {
      return {
        ...context,
        hasStarted: false
      }
    },
    changeCompanyInfo: (context, event: { ctx: any }) => {
      return {
        ...context,
        fromCompany: {
          ...context.fromCompany,
          ...event.ctx
        }
      }
    },
    changeBillToInfo: (context, event: { ctx: any }) => {
      return {
        ...context,
        billTo: {
          ...context.billTo,
          ...event.ctx
        }
      }
    },
    changeInvoiceNumber: (context, event: { ctx: any }) => {
      return {
        ...context,
        invoiceNumber: event.ctx.invoiceNumber
      }
    }
  }
})
