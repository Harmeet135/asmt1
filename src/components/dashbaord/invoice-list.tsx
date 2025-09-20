"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, ChevronDown, Edit3, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"

interface Invoice {
  id: number
  client_name: string
  due_amount: string
  due_date: string
  status: string
}


// const invoices = [
//   {
//     id: 1,
//     clientName: "Client Name",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "update",
//   },
//   {
//     id: 2,
//     clientName: "Client Name",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "unpaid",
//   },
//   {
//     id: 3,
//     clientName: "Income Trend",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "disputed",
//   },
//   {
//     id: 4,
//     clientName: "Income Trend",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "paid",
//   },
//   {
//     id: 5,
//     clientName: "Income Trend",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "paid",
//   },
//   {
//     id: 6,
//     clientName: "Income Trend",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "partially-paid",
//   },
//   {
//     id: 7,
//     clientName: "Income Trend",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "paid",
//   },
//   {
//     id: 8,
//     clientName: "Income Trend",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "overdue",
//   },
//   {
//     id: 9,
//     clientName: "Income Trend",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "awaited",
//   },
//   {
//     id: 10,
//     clientName: "Income Trend",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "draft",
//   },
//   {
//     id: 11,
//     clientName: "Income Trend",
//     amount: "₹1,25,000",
//     dueDate: "2024-06-15",
//     status: "paid",
//   },
// ]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "update":
      return (
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-2xl">
          Update
        </span>
      )
    case "unpaid":
      return (
        <span className="rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600">
          Unpaid
        </span>
      )
    case "disputed":
      return (
        <span className="rounded-full bg-red-100 px-3 py-2 text-xs font-medium text-red-600">
          Disputed
        </span>
      )
    case "paid":
      return (
        <span className="rounded-full bg-green-100 px-3 py-2 text-xs font-medium text-green-600">
          Paid
        </span>
      )
    case "partially-paid":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-2 text-xs font-medium text-yellow-600">
          Partially Paid
        </span>
      )
    case "overdue":
      return (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-red-100 px-3 py-2 text-xs font-medium text-red-600">
            Overdue
          </span>
          <Bell className="h-4 w-4 text-red-500" />
        </div>
      )
    case "awaited":
      return (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-yellow-100 px-3 py-2 text-xs font-medium text-yellow-600">
            Awaited
          </span>
          <Bell className="h-4 w-4 text-yellow-500" />
        </div>
      )
    case "draft":
      return (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600">
            Draft
          </span>
          <Edit3 className="h-4 w-4 text-gray-500" />
        </div>
      )
    default:
      return (
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-2xl">
          Update
        </span>
      )
  }
}

export function InvoiceList() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | undefined>(0)

  // Fetch invoices from API
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true)
      try {
        const res = await axios.get("https://68ca7f27430c4476c349b61c.mockapi.io/api/v1/invoices")
        setInvoiceList(res.data)
      } catch (error) {
        console.error("Error fetching invoices:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchInvoices()
  }, [])

  // Update contentHeight for smooth collapse animation
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [invoiceList, isCollapsed])

  // Handle status change locally (and optionally save to backend)
  const handleStatusChange = async (id: number, newStatus: string) => {
    setInvoiceList(prev =>
      prev.map(invoice => (invoice.id === id ? { ...invoice, status: newStatus } : invoice))
    )

    try {
      await axios.patch(
        `https://68ca7f27430c4476c349b61c.mockapi.io/api/v1/invoices/${id}`,
        { status: newStatus }
      )
    } catch (error) {
      console.error("Failed to update invoice status:", error)
    }
  }

  return (
    <Card className="border-0 shadow-none lg:h-fit lg:sticky lg:top-4 pb-4">
      <div>
        {/* Header */}
        <div
          className="mb-4 flex items-center justify-between cursor-pointer group"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <h3 className="text-base font-semibold text-secondary group-hover:text-purple-600 transition-colors duration-200">
            Your Invoices
          </h3>
          <div
            className={`transform transition-transform duration-300 ease-in-out ${
              isCollapsed ? "rotate-0" : "rotate-180"
            }`}
          >
            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-purple-500 transition-colors duration-200" />
          </div>
        </div>

        {/* Collapsible Content */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            height: isCollapsed ? 0 : contentHeight,
            opacity: isCollapsed ? 0 : 1,
          }}
        >
          <div ref={contentRef} className="space-y-3 lg:pr-2">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              </div>
            ) : (
              invoiceList.map((invoice, index) => (
                <div
                  key={invoice.id}
                  className={`flex items-center justify-between rounded-lg p-3 border-2 lg:p-4 transform transition-all duration-300 ease-in-out hover:shadow-md ${
                    isCollapsed ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
                  }`}
                  style={{
                    transitionDelay: isCollapsed ? "0ms" : `${index * 50}ms`,
                  }}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 lg:text-base">{invoice.client_name}</h4>
                    <p className="text-sm text-gray-500 lg:text-sm">
                      {invoice.due_amount}, Due: {invoice.due_date}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        size="sm"
                        className="border-0 shadow-none hover:bg-transparent hover:text-primary outline-none"
                      >
                        {getStatusBadge(invoice.status)}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStatusChange(invoice.id, "paid")}>
                        Mark as Paid
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(invoice.id, "partially-paid")}>
                        Mark as Partially Paid
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(invoice.id, "overdue")}>
                        Mark as Overdue
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(invoice.id, "disputed")}>
                        Mark as Disputed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(invoice.id, "awaited")}>
                        Mark as Awaited
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
