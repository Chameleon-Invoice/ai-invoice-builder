import { createStore } from '@xstate/store'

export const store = {
  hasStarted: true,
  fromCompany: {
    name: 'Company Name',
    address: '123 Main St',
    city: 'City',
    state: 'State',
    zip: '123456',
    phone: '+1 (555) 555-5555',
    email: 'hero@company.com',
    website: 'www.company.com'
  },
  billTo: {
    name: 'Customer Name',
    address: 'Address',
    city: 'City',
    state: 'State',
    zip: 'Zip Code',
    phone: 'Phone Number',
    email: 'Email Address'
  },
  invoiceNumber: 1,
  invoiceDate: new Date().toLocaleDateString(),
  dueDate: new Date(
    new Date().setDate(new Date().getDate() + 30)
  ).toLocaleDateString(),
  terms: 'Net 30',
  currency: 'USD',
  items: [
    {
      id: 1,
      service: 'Service Name',
      description: 'Service Description',
      qty: 1,
      rate: 0.0,
      amount: 0.0
    }
  ],
  total: 0.0,
  tax: 0.0,
  paidAmount: 0.0,
  dueAmount: 0.0,
  note: '',
  paid: false,
  supportedPayments: ['Cash', 'Credit Card', 'Bank Transfer'],
  lineItems: [],
  name: 'David'
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
    }
  }
})
