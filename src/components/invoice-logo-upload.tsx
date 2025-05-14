'use client'

import { useCallback, useState } from 'react'
import { invoiceStore } from '@/store/invoice-store'

type InvoiceLogoUploadProps = {
  onUpload?: () => void
}

export const InvoiceLogoUpload = ({ onUpload }: InvoiceLogoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  // wrap handle file in a useCallback to prevent re-creation on every render
  const handleFile = useCallback(
    async (file: File) => {
      try {
        if (!file.type.startsWith('image/')) {
          alert('Please upload an image file')
          return
        }

        const base64 = await convertToBase64(file)

        // Update store
        invoiceStore.send({
          type: 'uploadLogo',
          ctx: {
            url: base64,
            alt: 'Company Logo'
          }
        })

        setIsDragging(false)
        onUpload?.()
      } catch (error) {
        console.error('Error processing file:', error)
        alert('Error uploading file')
      }
    },
    [onUpload]
  )

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  return (
    <div
      className={`flex flex-col my-4 items-center justify-center w-full h-[300px] border-2 border-dashed rounded-lg p-6 transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        id="logo-upload"
      />
      <label
        htmlFor="logo-upload"
        className="flex flex-col items-center cursor-pointer"
      >
        <div className="text-muted-foreground text-center">
          <p className="mb-2">Drag and drop your logo here</p>
          <p className="text-sm">or</p>
          <p className="text-blue-500 hover:text-blue-600 mt-2">
            Click to select a file
          </p>
        </div>
      </label>
    </div>
  )
}

export default InvoiceLogoUpload