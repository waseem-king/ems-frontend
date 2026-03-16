"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// temporary data (later will come from API)
const data = [
  { month: "Jan", expense: 12000 },
  { month: "Feb", expense: 18000 },
  { month: "Mar", expense: 9000 },
  { month: "Apr", expense: 14000 },
  { month: "May", expense: 22000 }
]

export default function ExpenseChart() {
  return (
    <Card>

      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#4f46e5"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </CardContent>

    </Card>
  )
}