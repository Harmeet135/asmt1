"use client"

import { useEffect, useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { addMonths, addYears, format } from "date-fns"
import Image from "next/image"
import type { DateRange } from "react-day-picker"

const periods = [
  { id: "1month", label: "1Month" },
  { id: "3months", label: "3Months" },
  { id: "1year", label: "1Year" },
]

export function TimePeriodSelector() {
  const [selectedPeriod, setSelectedPeriod] = useState("3months")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  useEffect(() => {
    if (selectedPeriod === "1month") {
      setStartDate(new Date())
      setEndDate(addMonths(new Date(), 1))
      setDateRange(undefined)
    } else if (selectedPeriod === "3months") {
      setStartDate(new Date())
      setEndDate(addMonths(new Date(), 3))
      setDateRange(undefined)
    } else if (selectedPeriod === "1year") {
      setStartDate(new Date())
      setEndDate(addYears(new Date(), 1))
      setDateRange(undefined)
    }
  }, [selectedPeriod])

  // // Update start and end dates when custom date range is selected
  // useEffect(() => {
  //   if (dateRange?.from && dateRange?.to) {
  //     setStartDate(dateRange.from)
  //     setEndDate(dateRange.to)
  //   } else if (dateRange?.from && !dateRange?.to) {
  //     setStartDate(dateRange.from)
  //     setEndDate(undefined)
  //   }
  // }, [dateRange])

  const handleApplyCustomRange = () => {
    if (dateRange?.from && dateRange?.to) {
      setStartDate(dateRange.from)
      setEndDate(dateRange.to)
      setSelectedPeriod("custom")
      setIsCalendarOpen(false)
    }
  }

  return (
    <div className="space-y-4 border-2 border-app-secondary p-4 rounded-2xl h-[11.8rem]">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Time Period</span>
        <span>
          {startDate ? format(startDate, "LLL dd, y") : "select start date"} -{" "}
          {endDate ? format(endDate, "LLL dd, y") : "select end date"}
        </span>
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
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range)
              }}
              modifiers={{
                today: () => false,
              }}
              initialFocus
            />
            {dateRange?.from && (
              <div className="p-3 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  {dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    <>Start: {format(dateRange.from, "LLL dd, y")} - Select end date</>
                  )}
                </p>
                {dateRange.to && (
                  <Button onClick={handleApplyCustomRange} size="sm" className="bg-black w-full">
                    Apply Date Range
                  </Button>
                )}
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
