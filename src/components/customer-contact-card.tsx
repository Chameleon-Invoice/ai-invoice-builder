'use client'

import { invoiceStore } from "@/store/invoice-store"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type CustomerContactCardProps = {
  customer: {
    customerName: string
    businessName: string
    phone: string
    email: string
  }
  onCancel: () => void
  onAssign: () => void
}

export function CustomerContactCard({ customer, onCancel, onAssign }: CustomerContactCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{customer.customerName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Business: </span>
            {customer.businessName}
          </div>
          <div>
            <span className="font-semibold">Phone: </span>
            {customer.phone}
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            {customer.email}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={() => {
              invoiceStore.send({ type: 'changeBillToInfo', ctx: { ...customer } })
              onAssign()
            }}>
              Assign
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomerContactCard