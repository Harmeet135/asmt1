"use client"

import { BarChart } from "./ui/barChart"

const data = [
  {
    month: "Jan",
    income: 3500,
    momGrowth: 0,
  },
  {
    month: "Feb",
    income: 4800,
    momGrowth: 43,
  },
  {
    month: "Mar",
    income: 6800,
    momGrowth: 46,
  },
  {
    month: "Apr",
    income: 3000,
    momGrowth: -50,
  },
  {
    month: "May",
    income: 4400,
    momGrowth: 54,
  },
  {
    month: "Jun",
    income: 0,
    momGrowth: -110,
  },
  
]


export function IncomeChart() {
  return (
          <div className="bg-white rounded-lg shadow-sm border py-4 h-fit">
            <h2 className="text-md font-semibold text-secondary px-4">Income & Growth Overview</h2>
            <p className="text-sm text-secondary px-4  my-4">Your monthly income and growth for the last 6 months.</p>
            <BarChart data={data} />
          </div>
  )
}
