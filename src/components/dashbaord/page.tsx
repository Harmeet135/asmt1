"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashbaord/dashboard-header"
import { CreateInvoiceCard } from "@/components/dashbaord/create-invoice-card"
import { TimePeriodSelector } from "@/components/dashbaord/time-period-selector"
import { EarningsCard } from "@/components/dashbaord/earnings-card"
import { PaymentCards } from "@/components/dashbaord/payment-cards"
import { IncomeChart } from "@/components/dashbaord/income-chart"
import { InvoiceList } from "@/components/dashbaord/invoice-list"
import { CreateInvoiceModal } from "@/components/dashbaord/create-invoice-modal"

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md lg:max-w-full">
        <DashboardHeader />

        <div className="lg:block bg-white rounded-t-4xl">
          <div className="max-w-6xl mx-auto p-8 space-y-8">
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
