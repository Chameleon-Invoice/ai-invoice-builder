'use client'

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type CustomerContactCardProps = {
  customer: {
    customerName: string
    businessName: string
    address: string
    city: string
    state: string
    zip: string
    phone: string
    email: string
  }
  onCancel: () => void
  onConfirm: () => void
}

export function CustomerContactCard({ customer, onCancel, onConfirm }: CustomerContactCardProps) {
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
            <span className="font-semibold">Address: </span>
            {customer.address}
          </div>
          <div>
            <span className="font-semibold">City/State/Zip: </span>
            {customer.city}, {customer.state} {customer.zip}
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
            <Button onClick={onConfirm}>
              Looks Good
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomerContactCard