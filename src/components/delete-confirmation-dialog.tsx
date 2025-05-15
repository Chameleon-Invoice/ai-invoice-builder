'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type ConfirmationDialogProps = {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  isOpen: boolean
}

export function ConfirmationDialog({
  title,
  description,
  onConfirm,
  onCancel,
  isOpen = false
}: ConfirmationDialogProps) {
	const [isDialogOpen, setIsDialogOpen] = React.useState(isOpen)

	const handleOnConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		onConfirm()
		setIsDialogOpen(false)
	}

	const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		onCancel()
		setIsDialogOpen(false)
	}

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={(e) => {
						handleOnCancel(e)
					}}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={(e) => {
						handleOnConfirm(e)
					}}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}