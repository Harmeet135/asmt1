"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Bell, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const invoices = [
  {
    id: 1,
    clientName: "Client Name",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "update",
  },
  {
    id: 2,
    clientName: "Client Name",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "unpaid",
  },
  {
    id: 3,
    clientName: "Income Trend",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "disputed",
  },
  {
    id: 4,
    clientName: "Income Trend",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "paid",
  },
  {
    id: 5,
    clientName: "Income Trend",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "paid",
  },
  {
    id: 6,
    clientName: "Income Trend",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "partially-paid",
  },
  {
    id: 7,
    clientName: "Income Trend",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "paid",
  },
  {
    id: 8,
    clientName: "Income Trend",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "overdue",
  },
  {
    id: 9,
    clientName: "Income Trend",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "awaited",
  },
  {
    id: 10,
    clientName: "Income Trend",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "draft",
  },
  {
    id: 11,
    clientName: "Income Trend",
    amount: "₹1,25,000",
    dueDate: "2024-06-15",
    status: "paid",
  },
]

const getStatusBadge = (status: string, invoiceId: number, onStatusChange: (id: number, newStatus: string) => void) => {
  switch (status) {
    case "update":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              Update Status
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onStatusChange(invoiceId, "paid")}>Mark as Paid</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(invoiceId, "partially-paid")}>
              Mark as Partially Paid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(invoiceId, "overdue")}>Mark as Overdue</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(invoiceId, "disputed")}>Mark as Disputed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(invoiceId, "awaited")}>Mark as Awaited</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    case "unpaid":
      return <span className="rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600">Unpaid</span>
    case "disputed":
      return <span className="rounded-full bg-red-100 px-3 py-2 text-xs font-medium text-red-600">Disputed</span>
    case "paid":
      return <span className="rounded-full bg-green-100 px-3 py-2 text-xs font-medium text-green-600">Paid</span>
    case "partially-paid":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-2 text-xs font-medium text-yellow-600">Partially Paid</span>
      )
    case "overdue":
      return (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-red-100 px-3 py-2 text-xs font-medium text-red-600">Overdue</span>
          <Bell className="h-4 w-4 text-red-500" />
        </div>
      )
    case "awaited":
      return (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-yellow-100 px-3 py-2 text-xs font-medium text-yellow-600">Awaited</span>
          <Bell className="h-4 w-4 text-yellow-500" />
        </div>
      )
    case "draft":
      return (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600">Draft</span>
          <Edit3 className="h-4 w-4 text-gray-500" />
        </div>
      )
    default:
      return null
  }
}

export function InvoiceList() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [invoiceList, setInvoiceList] = useState(invoices)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [invoiceList])

  const handleStatusChange = (id: number, newStatus: string) => {
    setInvoiceList((prev) => prev.map((invoice) => (invoice.id === id ? { ...invoice, status: newStatus } : invoice)))
  }

  return (
    <Card className="border-0 shadow-none lg:h-fit lg:sticky lg:top-4">
      <div className="">
        <div
          className="mb-4 flex items-center justify-between cursor-pointer group"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <h3 className="text-base font-semibold text-secondary  group-hover:text-purple-600 transition-colors duration-200">
            Your Invoices
          </h3>
          <div
            className={`transform transition-transform duration-300 ease-in-out ${isCollapsed ? "rotate-0" : "rotate-180"}`}
          >
            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-purple-500 transition-colors duration-200" />
          </div>
        </div>

        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            height: isCollapsed ? 0 : contentHeight,
            opacity: isCollapsed ? 0 : 1,
          }}
        >
          <div ref={contentRef} className="space-y-3  lg:pr-2">
            {invoiceList.map((invoice, index) => (
              <div
                key={invoice.id}
                className={`flex items-center justify-between rounded-lg p-3 border-2 lg:p-4 transform transition-all duration-300 ease-in-out hover:shadow-md  ${
                  isCollapsed ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
                }`}
                style={{
                  transitionDelay: isCollapsed ? "0ms" : `${index * 50}ms`,
                }}
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 lg:text-base">{invoice.clientName}</h4>
                  <p className="text-sm text-gray-500 lg:text-sm">
                    {invoice.amount}, Due: {invoice.dueDate}
                  </p>
                </div>

                <div className="flex items-center">
                  {getStatusBadge(invoice.status, invoice.id, handleStatusChange)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
