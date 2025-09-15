"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import Image from "next/image"

const periods = [
  { id: "1month", label: "1Month" },
  { id: "3months", label: "3Months" },
  { id: "1year", label: "1Year" },
]

export function TimePeriodSelector() {
  const [selectedPeriod, setSelectedPeriod] = useState("3months")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  return (
    <div className="space-y-4 border-2 border-app-secondary p-4 rounded-2xl h-[11.8rem]">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Time Period</span>
        <span>dd:mm:yyyy - dd:mm:yyyy</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {periods.map((period, index) => (
          <div key={index} className={`${selectedPeriod === period.id ? " bg-background" : ""} rounded-2xl`}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPeriod(period.id)}
              className={`${selectedPeriod === period.id ? " text-primary-gradient" : "text-secondary"} rounded-2xl`}
            >
              {period.label}
              {period.id === "1year" && <Image src="/crown.svg" alt="Star" width={16} height={16} />}
            </Button>
          </div>
        ))}

        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Calendar className="h-3 w-3" />
              Custom
              <ChevronDown className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date)
                setSelectedPeriod("custom")
                setIsCalendarOpen(false)
              }}
              initialFocus
            />
            {selectedDate && (
              <div className="p-3 border-t">
                <p className="text-sm text-muted-foreground">Selected: {format(selectedDate, "PPP")}</p>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
