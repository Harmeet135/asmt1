"use client"

import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface CreateInvoiceCardProps {
  onCreateClick: () => void
}

export function CreateInvoiceCard({ onCreateClick }: CreateInvoiceCardProps) {
  return (
    <Card
      className="border-0 cursor-pointer hover:shadow-lg transition-shadow bg-[#F2F2F2] p-6 rounded-4xl"
      onClick={onCreateClick}
    >
      <CardContent className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full ">
          <Image src="/AddIcon.svg" alt="Plus" width={56} height={56} />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-primary-gradient">Create New Invoice</h2>

        <p className=" text-sm text-muted-foreground">Start by creating and sending new invoice</p>

      </CardContent>
    </Card>
  )
}
