'use client'

export function InvoicePreview() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">INVOICE</h1>
          <div className="text-lg font-semibold mt-1">BICYCLE COLLECTIVE</div>
          <div className="text-sm text-gray-600 mt-1">
            325 West 900 South
            <br />
            Salt Lake City, UT 84101
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            slc@bicyclecollective.org
            <br />
            +1 (801) 328-2453
            <br />
            www.bicyclecollective.org
          </div>
          <div className="mt-4 w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-xs">Logo</span>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="bg-blue-50 p-4 rounded-md mb-8">
        <div className="text-sm text-gray-600 mb-1">Bill to</div>
        <div className="font-semibold">Kirkwood Donavin</div>
      </div>

      {/* Invoice Details */}
      <div className="bg-blue-50 p-4 rounded-md mb-8">
        <div className="font-semibold mb-2">Invoice details</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Invoice no.: 3580</div>
          <div>Invoice date: 03/05/2025</div>
          <div>Terms: Due on receipt</div>
          <div>Due date: 03/05/2025</div>
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
              <th className="py-2 text-right">Rate</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">1.</td>
              <td>Keylist Distributor Order</td>
              <td>BE0001 Timber MTB Model Yew! MTB Bell - Bolt-On, Black</td>
              <td className="text-right">1</td>
              <td className="text-right">$21.18</td>
              <td className="text-right">$21.18</td>
            </tr>
            <tr className="border-b">
              <td className="py-3">2.</td>
              <td>Keylist Distributor Order</td>
              <td>TL5346 Park Tool MWR-10 Metric Wrench Ratcheting 10mm</td>
              <td className="text-right">1</td>
              <td className="text-right">$7.68</td>
              <td className="text-right">$7.68</td>
            </tr>
            <tr className="border-b">
              <td className="py-3">3.</td>
              <td>Keylist Distributor Order</td>
              <td>TL5344 Park Tool MWR-8 Metric Wrench Ratcheting 8mm</td>
              <td className="text-right">1</td>
              <td className="text-right">$7.06</td>
              <td className="text-right">$7.06</td>
            </tr>
            <tr className="border-b">
              <td className="py-3">4.</td>
              <td>Keylist Distributor Order</td>
              <td>ST0610 MSW Seatpost Clamp - 29.8mm, Bolt-On, Black</td>
              <td className="text-right">1</td>
              <td className="text-right">$4.40</td>
              <td className="text-right">$4.40</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex justify-between mb-8">
        <div className="w-1/2">
          <div className="mb-4">
            <div className="font-semibold mb-2">Ways to pay</div>
            <div className="flex space-x-2">
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">CC</div>
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">Visa</div>
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">MC</div>
              <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">Amex</div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Note to customer</div>
            <div className="text-sm text-gray-600">Please see attached file for line item description.</div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">$40.32</span>
            </div>
            <div className="flex justify-between">
              <span>Payment</span>
              <span className="font-semibold">-$40.32</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span>Balance due</span>
              <span className="font-semibold">$0.00</span>
            </div>
            <div className="text-right text-green-600 font-semibold">Paid in Full</div>
          </div>
        </div>
      </div>
    </div>
  )
}
