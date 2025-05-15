import { createStore } from '@xstate/store'

export const store = {
  hasStarted: true,
  fromCompany: {
    name: 'Company name',
    streetAddress: '123 Main St',
    city: 'City',
    state: 'State',
    zip: 'Zip Code',
    phone: '+1 (555) 555-5555',
    email: 'hello@company.com',
    website: 'www.company.com',
    logo: {
      url: 'https://placehold.co/150x150?text=logo',
      alt: 'Company Logo'
    }
  },
  billTo: {
    customerName: 'Customer name',
    businessName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: ''
  },
  number: '001',
  date: new Date().toLocaleDateString(),
  dueDate: new Date(
    new Date().setDate(new Date().getDate() + 30)
  ).toLocaleDateString(),
  availableTerms: [
    { id: 1, name: 'Net 30', value: 30 },
    { id: 2, name: 'Net 60', value: 60 },
    { id: 3, name: 'Net 90', value: 90 }
  ],
  termId: 1,
  currency: 'USD',
  items: [] as Array<{
    id: number
    name: string
    description: string
    qty: number
    amount: number
    total: number
  }>,
  total: 0.0,
  taxAmount: 0.0,
  taxRate: 0.1, // 10%
  paidAmount: 0.0,
  dueAmount: 0.0,
  paidInFull: false,
  supportedPayments: ['Cash', 'Credit card', 'Bank Transfer'],
  note: 'Add a visible customer note here',
  customization: {
    isCustomizating: false,
    theme: 'default',
    primaryColor: 'oklch(0.72 0.19 149.58)',
    backgroundColor: 'oklch(0.967 0.003 264.542)'
  }
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
        number: event.ctx.number
      }
    },
    changeDates: (
      context,
      event: { ctx: { date?: string; dueDate?: string } }
    ) => {
      return {
        ...context,
        ...(event.ctx.date && { date: event.ctx.date }),
        ...(event.ctx.dueDate && { dueDate: event.ctx.dueDate })
      }
    },
    updatePaidStatus: (context, event: { ctx: { paidInFull: boolean } }) => {
      return {
        ...context,
        paidInFull: event.ctx.paidInFull
      }
    },
    updateTerms: (context, event: { ctx: { terms: number } }) => {
      return {
        ...context,
        terms: event.ctx.terms
      }
    },
    updateNote: (context, event: { ctx: { note: string } }) => {
      return {
        ...context,
        note: event.ctx.note
      }
    },
    appendItem: (
      context,
      event: {
        ctx: {
          name: string
          description: string
          qty: number
          amount: number
        }
      }
    ) => {
      const newItem = {
        id: context.items.length + 1,
        name: event.ctx.name,
        description: event.ctx.description,
        qty: event.ctx.qty,
        amount: event.ctx.amount,
        total: event.ctx.qty * event.ctx.amount
      }
      const updatedItems = [...context.items, newItem]
      const itemsTotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
      const tax = itemsTotal * context.taxRate
      const totalWithTax = itemsTotal + tax
      return {
        ...context,
        items: updatedItems,
        total: totalWithTax,
        taxAmount: tax,
        dueAmount: totalWithTax - context.paidAmount
      }
    },
    removeItemByName: (context, event: { name: string }) => {
      const updatedItems = context.items.filter(
        (item) => item.name.toLowerCase() !== event.name.toLowerCase()
      )
      const itemsTotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
      const tax = itemsTotal * context.taxRate
      const itemsTotalWithTax = itemsTotal + tax
      return {
        ...context,
        items: updatedItems,
        total: itemsTotalWithTax,
        taxAmount: tax,
        dueAmount: itemsTotalWithTax - context.paidAmount
      }
    },
    removeItem: (context, event: { id: number }) => {
      const updatedItems = context.items.filter((item) => item.id !== event.id)
      const itemsTotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
      const tax = itemsTotal * context.taxRate
      const itemsTotalWithTax = itemsTotal + tax
      return {
        ...context,
        items: updatedItems,
        total: itemsTotalWithTax,
        taxAmount: tax,
        dueAmount: itemsTotalWithTax - context.paidAmount
      }
    },
    updateItem: (
      context,
      event: {
        ctx: {
          id: number
          name?: string
          description?: string
          qty?: number
          amount?: number
        }
      }
    ) => {
      const updatedItems = context.items.map((item) => {
        if (item.id === event.ctx.id) {
          const updatedItem = {
            ...item,
            ...event.ctx,
            total:
              (event.ctx.qty ?? item.qty) * (event.ctx.amount ?? item.amount)
          }
          return updatedItem
        }
        return item
      })

      const itemsTotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
      const tax = itemsTotal * context.taxRate
      const itemsTotalWithTax = itemsTotal + tax
      return {
        ...context,
        items: updatedItems,
        total: itemsTotalWithTax,
        taxAmount: tax,
        dueAmount: itemsTotalWithTax - context.paidAmount
      }
    },
    updatePaidAmount: (context, event: { ctx: { paidAmount: number } }) => {
      const newPaidAmount = event.ctx.paidAmount
      const newDueAmount = context.total - newPaidAmount

      return {
        ...context,
        paidAmount: newPaidAmount,
        dueAmount: newDueAmount,
        paidInFull: newDueAmount <= 0
      }
    },
    updateTaxRate: (context, event: { ctx: { rate: number } }) => {
      const itemsTotal = context.items.reduce(
        (sum, item) => sum + item.total,
        0
      )
      const newTax = itemsTotal * event.ctx.rate
      const totalWithTax = itemsTotal + newTax
      return {
        ...context,
        taxRate: event.ctx.rate,
        taxAmount: newTax,
        total: totalWithTax,
        dueAmount: itemsTotal - context.paidAmount
      }
    },
    uploadLogo: (context, event: { ctx: { url: string; alt: string } }) => {
      return {
        ...context,
        fromCompany: {
          ...context.fromCompany,
          logo: {
            url: event.ctx.url,
            alt: event.ctx.alt || context.fromCompany.logo.alt
          }
        }
      }
    },
    reset: () => {
      return {
        ...store,
        hasStarted: false
      }
    },
    changeBackground: (
      context,
      event: { ctx: { backgroundColor: string } }
    ) => {
      return {
        ...context,
        customization: {
          ...context.customization,
          backgroundColor: event.ctx.backgroundColor
        }
      }
    }
  }
})
