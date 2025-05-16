'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { invoiceStore } from '@/store/invoice-store'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Customer } from '@/store/invoice-store'

// Dummy customer data
import { store } from '@/store/invoice-store'

type InvoiceCustomerSelectionProps = {
	onSelection?: () => void
  onCancel?: () => void
}

export function InvoiceCustomerSelection({ onSelection, onCancel }: InvoiceCustomerSelectionProps) {
  const [open, setOpen] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    invoiceStore.send({
      type: 'changeBillToInfo',
      ctx: customer
    })
    setOpen(false)
		onSelection && onSelection()
  }

  return (
    <Dialog open={open} onOpenChange={(status) => {
      if (!status) {
        setOpen(false)
        onCancel && onCancel()
      }

    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedCustomer ? (
            <>
              <span>{selectedCustomer.customerName}</span>
							<ChevronsUpDown className="text-muted-foreground ml-auto h-4 w-4" />
            </>
          ) : (
						<>
            <span>Select a customer...</span>
						<ChevronsUpDown className="text-muted-foreground ml-auto h-4 w-4" />
						</>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>Select Customer</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search customers..." />
          <CommandEmpty>No customer found.</CommandEmpty>
          <CommandGroup>
            {store.customers.map((customer) => (
              <CommandItem
                key={customer.email}
                onSelect={() => handleSelectCustomer(customer)}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    selectedCustomer?.email === customer.email
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />
                <div>
                  <div className="font-medium">{customer.customerName}</div>
                  <div className="text-sm text-muted-foreground group-data-[selected=true]:text-white">
                    {customer.businessName}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export default InvoiceCustomerSelection