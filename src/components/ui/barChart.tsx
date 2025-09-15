"use client"

import { Bar, CartesianGrid, Line, ComposedChart, ResponsiveContainer, XAxis, YAxis, Legend , Tooltip} from "recharts"

interface BarChartProps {
  data: any[]
}


export function BarChart({ data }: BarChartProps) {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
         <CartesianGrid 
           strokeDasharray="3 3" 
           stroke="#e5e7eb" 
           vertical={false} 
           horizontal={true}
         />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 14 }} />
          <YAxis
            yAxisId="left"
            domain={[0, 8000]}
            tickFormatter={(value) => `$${value / 1000}k`}
            tickCount={5}
            axisLine={{ stroke: "#8134AF", strokeWidth: 2  }}
            tickLine={{ stroke: "#8134AF", strokeWidth: 2  }}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[-100, 100]}
            ticks={[-100, -50, 0, 50, 100]}
            tickFormatter={(value) => `${value}%`}
            tickCount={5}
            axisLine={{ stroke: "#7f1e1d", strokeWidth: 2  }}
            tickLine={{ stroke: "#7f1e1d", strokeWidth: 2  }}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
           <Tooltip />
          <Bar yAxisId="left" dataKey="income" fill="#a855f7" radius={[4, 4, 0, 0]} name="income" />
          <Line
            dot={false}
            yAxisId="right"
            type="monotone"
            dataKey="momGrowth"
            stroke="#7f1d1d"
            strokeWidth={3}
            name="momGrowth"
          />
          <Legend
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
