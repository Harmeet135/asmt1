"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { CreateInvoiceCard } from "@/components/create-invoice-card"
import { TimePeriodSelector } from "@/components/time-period-selector"
import { EarningsCard } from "@/components/earnings-card"
import { PaymentCards } from "@/components/payment-cards"
import { IncomeChart } from "@/components/income-chart"
import { InvoiceList } from "@/components/invoice-list"
import { CreateInvoiceModal } from "@/components/create-invoice-modal"

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile and Desktop Container */}
      <div className="mx-auto max-w-md lg:max-w-full">
        <DashboardHeader />
        
        {/* Mobile Layout (default) */}
        {/* <div className=" space-y-6 p-6 bg-white">
          <CreateInvoiceCard onCreateClick={() => setIsCreateModalOpen(true)} />
          <p className="text-xs text-primary text-center">Or Upload an existing invoice and set payment reminder</p>
          <TimePeriodSelector />
          <EarningsCard />
          <PaymentCards />
          <IncomeChart />
          <InvoiceList />
        </div> */}

        {/* Desktop Layout */}
        <div className="lg:block bg-white rounded-t-4xl">
          <div className="max-w-6xl mx-auto p-8 space-y-8">
            {/* Top Row - Create Invoice and Time Period */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <CreateInvoiceCard onCreateClick={() => setIsCreateModalOpen(true)} />
                <p className="text-sm text-primary text-center lg:mt-4 mt-8">Or Upload an existing invoice and set payment reminder</p>
              </div>
              <TimePeriodSelector />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <EarningsCard />
              <div className="lg:col-span-2">
                <PaymentCards />
              </div>
            </div>

            {/* Bottom Row - Chart and Invoices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <IncomeChart />
              <InvoiceList />
            </div>
          </div>
        </div>
      </div>

      <CreateInvoiceModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
}
